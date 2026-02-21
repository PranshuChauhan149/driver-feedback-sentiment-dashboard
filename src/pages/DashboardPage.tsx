import { useDrivers, useFeedback, useSentimentSummary } from '../api/queries';
import { KpiCard, DateRangeSelector } from '../components/dashboard/KpiCard';
import { DonutChart } from '../components/dashboard/DonutChart';
import { DriverTable } from '../components/dashboard/DriverTable';
import { FeedbackTimeline } from '../components/dashboard/FeedbackTimeline';
import { CardSkeleton, ChartSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { useAppStore } from '../stores/appStore';
import {
  ChartBarIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

export const DashboardPage = () => {
  const { data: drivers = [], isLoading: driversLoading, error: driversError, refetch: refetchDrivers } = useDrivers();
  const { data: feedback = [], isLoading: feedbackLoading, error: feedbackError, refetch: refetchFeedback } = useFeedback();
  const { data: summary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useSentimentSummary();
  
  const selectedDateRange = useAppStore((state) => state.selectedDateRange);
  const setDateRange = useAppStore((state) => state.setDateRange);

  const isLoading = driversLoading || feedbackLoading || summaryLoading;
  const hasError = driversError || feedbackError || summaryError;

  if (hasError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState
          title="Failed to load dashboard"
          message="Unable to fetch dashboard data. Please try again."
          onRetry={() => {
            refetchDrivers();
            refetchFeedback();
            refetchSummary();
          }}
        />
      </div>
    );
  }

  const sentimentData = summary
    ? [
        { name: 'Positive', value: summary.positive, color: '#10b981' },
        { name: 'Neutral', value: summary.neutral, color: '#6b7280' },
        { name: 'Negative', value: summary.negative, color: '#ef4444' },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sentiment Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time driver feedback analytics
          </p>
        </div>
        <DateRangeSelector value={selectedDateRange} onChange={setDateRange} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <KpiCard
              title="Total Feedback"
              value={summary?.total || 0}
              subtitle={`in last ${selectedDateRange === 'today' ? 'day' : selectedDateRange}`}
              icon={<ChartBarIcon className="w-6 h-6" />}
              color="primary"
            />
            <KpiCard
              title="Average Score"
              value={summary?.averageScore.toFixed(2) || '0.00'}
              subtitle="out of 5.0"
              icon={<StarIcon className="w-6 h-6" />}
              color="green"
            />
            <KpiCard
              title="Drivers Above Threshold"
              value={summary?.driversAboveThreshold || 0}
              subtitle="≥ 4.0 rating"
              icon={<CheckCircleIcon className="w-6 h-6" />}
              color="green"
            />
            <KpiCard
              title="Drivers Needing Attention"
              value={summary?.driversBelowThreshold || 0}
              subtitle="< 2.5 rating"
              icon={<ExclamationTriangleIcon className="w-6 h-6" />}
              color="red"
            />
          </>
        )}
      </div>

      {/* Sentiment Distribution Chart */}
      <div className="mb-8">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <DonutChart
            data={sentimentData}
            title="Overall Sentiment Distribution"
          />
        )}
      </div>

      {/* Driver Leaderboard */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Driver Leaderboard
        </h2>
        <DriverTable drivers={drivers} isLoading={driversLoading} />
      </div>

      {/* Feedback Timeline */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Feedback Timeline
        </h2>
        {feedbackLoading ? (
          <ChartSkeleton />
        ) : (
          <FeedbackTimeline feedback={feedback} />
        )}
      </div>
    </div>
  );
};
