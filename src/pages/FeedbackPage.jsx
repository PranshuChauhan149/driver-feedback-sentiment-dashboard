import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { useSubmitFeedback, useConfig } from '../api/queries';
import { FeedbackSection } from '../components/feedback/FeedbackSection';
import { ProgressIndicator } from '../components/feedback/ProgressIndicator';
import { EmptyState } from '../components/common/EmptyState';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const ENTITY_LABELS = {
  driver: 'Driver',
  trip: 'Trip',
  app: 'Mobile App',
  marshal: 'Marshal',
};

export const FeedbackPage = () => {
  const { data: config, isLoading: configLoading } = useConfig();
  const featureFlags = useAppStore((state) => state.featureFlags);
  const submitMutation = useSubmitFeedback();

  const [currentStep, setCurrentStep] = useState(0);
  const [feedbackData, setFeedbackData] = useState({
    driver: null,
    trip: null,
    app: null,
    marshal: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Update feature flags from config
  useEffect(() => {
    if (config) {
      useAppStore.getState().setFeatureFlags(config);
    }
  }, [config]);

  const enabledEntities = Object.entries(featureFlags)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key.replace('Feedback', ''));

  const steps = enabledEntities.map((entity) => ENTITY_LABELS[entity]);

  const handleFeedbackChange = (entity, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [entity]: value,
    }));
  };

  const canProceed = () => {
    const currentEntity = enabledEntities[currentStep];
    const currentFeedback = feedbackData[currentEntity];
    return currentFeedback?.rating && currentFeedback.rating > 0;
  };

  const handleNext = () => {
    if (currentStep < enabledEntities.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (hasSubmitted) return;

    const feedbackItems = enabledEntities
      .map((entity) => feedbackData[entity])
      .filter((item) => item !== null && item.rating > 0);

    if (feedbackItems.length === 0) return;

    try {
      await submitMutation.mutateAsync({
        feedbackItems,
        tripId: `TRIP${Date.now()}`,
        driverId: feedbackItems.find((f) => f.entityType === 'driver') ? 'DRV0001' : undefined,
        timestamp: new Date().toISOString(),
      });
      setIsSubmitted(true);
      setHasSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (enabledEntities.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <EmptyState
          title="No feedback options available"
          description="All feedback forms are currently disabled. Please check back later."
        />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for your feedback!
          </h2>
          <p className="text-gray-600 mb-6">
            Your responses have been submitted successfully and will help us improve our services.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFeedbackData({
                driver: null,
                trip: null,
                app: null,
                marshal: null,
              });
              setHasSubmitted(false);
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     transition-colors duration-150"
            disabled={hasSubmitted}
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  const currentEntity = enabledEntities[currentStep];
  const isLastStep = currentStep === enabledEntities.length - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Post-Trip Feedback
        </h1>
        <p className="text-gray-600">
          Help us improve by sharing your experience
        </p>
      </div>

      {steps.length > 1 && (
        <ProgressIndicator steps={steps} currentStep={currentStep} />
      )}

      <FeedbackSection
        entityType={currentEntity}
        entityLabel={ENTITY_LABELS[currentEntity]}
        value={feedbackData[currentEntity]}
        onChange={(value) => handleFeedbackChange(currentEntity, value)}
      />

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                   transition-colors duration-150"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || submitMutation.isPending || hasSubmitted}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     transition-colors duration-150 flex items-center gap-2"
          >
            {submitMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     transition-colors duration-150"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
