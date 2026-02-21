interface ProgressIndicatorProps {
  steps[];
  currentStep;
}

export const ProgressIndicator = ({ steps, currentStep }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-semibold text-sm transition-colors duration-200
                    ${
                      isCompleted
                        ? 'bg-primary-600 text-white'
                        : isCurrent
                        ? 'bg-primary-100 text-primary-700 ring-4 ring-primary-50'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {index + 1}
                </div>
                <span
                  className={`
                    text-xs mt-2 text-center font-medium
                    ${isCurrent ? 'text-primary-700' : 'text-gray-500'}
                  `}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-1 flex-1 mx-2 rounded transition-colors duration-200
                    ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                  `}
                  style={{ marginTop: '-2rem' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
