import { useDrivers, useFeedback, useSentimentSummary } from "../api/queries";
import { KpiCard, DateRangeSelector } from "../components/dashboard/KpiCard";
import { DonutChart } from "../components/dashboard/DonutChart";
import { DriverTable } from "../components/dashboard/DriverTable";
import { FeedbackTimeline } from "../components/dashboard/FeedbackTimeline";
import { CardSkeleton, ChartSkeleton } from "../components/common/Skeleton";
import { ErrorState } from "../components/common/ErrorState";
import { useAppStore } from "../stores/appStore";
import {
  ChartBarIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export const DashboardPage = () => {
  const selectedDateRange = useAppStore((state) => state.selectedDateRange);
  const setDateRange = useAppStore((state) => state.setDateRange);

  const {
    data: drivers = [],
    isLoading: driversLoading,
    error: driversError,
    refetch: refetchDrivers,
  } = useDrivers();
  const {
    data: feedback = [],
    isLoading: feedbackLoading,
    error: feedbackError,
    refetch: refetchFeedback,
  } = useFeedback();
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useSentimentSummary(selectedDateRange);

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
        { name: "Positive", value: summary.positive, color: "#10b981" },
        { name: "Neutral", value: summary.neutral, color: "#6b7280" },
        { name: "Negative", value: summary.negative, color: "#ef4444" },
      ]
    : [];

  const SectionHeader = ({ title, subtitle, right }) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {right && (
        <div className="text-sm text-gray-500 dark:text-gray-400">{right}</div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 p-6 mb-8 shadow-sm">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-50/70 via-transparent to-transparent dark:from-primary-900/30"
          aria-hidden="true"
        />
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <ChartBarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200 px-2.5 py-1 text-xs font-semibold">
                  Live Analytics
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 px-2.5 py-1 text-xs font-medium">
                  {selectedDateRange === "today"
                    ? "Today"
                    : selectedDateRange.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                Sentiment Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                Real-time driver feedback analytics with trends, outliers, and
                actionable insights.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {summary?.total || 0} total feedback entries
            </div>
            <DateRangeSelector
              value={selectedDateRange}
              onChange={setDateRange}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="space-y-4">
        <SectionHeader
          title="Performance Snapshot"
          subtitle="A quick read on how the fleet is doing"
          right={
            summary
              ? `Window: ${selectedDateRange === "today" ? "Today" : selectedDateRange.toUpperCase()}`
              : ""
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                subtitle={`in last ${selectedDateRange === "today" ? "day" : selectedDateRange}`}
                icon={<ChartBarIcon className="w-6 h-6" />}
                color="primary"
              />
              <KpiCard
                title="Average Score"
                value={summary?.averageScore.toFixed(2) || "0.00"}
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
      </div>

      {/* Sentiment Distribution Chart */}
      <div className="space-y-4">
        <SectionHeader
          title="Sentiment Distribution"
          subtitle="Overall split of positive, neutral, and negative feedback"
        />
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
      <div className="space-y-4">
        <SectionHeader
          title="Driver Leaderboard"
          subtitle="Ranked by performance with filters and quick actions"
        />
        <DriverTable drivers={drivers} isLoading={driversLoading} />
      </div>

      {/* Feedback Timeline */}
      <div className="space-y-4">
        <SectionHeader
          title="Feedback Timeline"
          subtitle="Latest feedback across drivers, trips, and app experience"
        />
        {feedbackLoading ? (
          <ChartSkeleton />
        ) : (
          <FeedbackTimeline feedback={feedback} />
        )}
      </div>
    </div>
  );
};
