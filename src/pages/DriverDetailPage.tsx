import { useParams, useNavigate } from 'react-router-dom';
import { useDriverDetail } from '../api/queries';
import { LineChart } from '../components/dashboard/LineChart';
import { BarChart } from '../components/dashboard/BarChart';
import { ChartSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

export const DriverDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: driver, isLoading, error, refetch } = useDriverDetail(id!);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ChartSkeleton />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState
          title="Driver not found"
          message="Unable to load driver details. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const getStatusBadge = () => {
    if (driver.averageScore >= 4.0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircleIcon className="w-4 h-4" />
          Excellent Performance
        </span>
      );
    } else if (driver.averageScore < 2.5) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          <ExclamationTriangleIcon className="w-4 h-4" />
          Needs Attention
        </span>
      );
    } else if (driver.averageScore < 3.0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
          <ExclamationTriangleIcon className="w-4 h-4" />
          Below Average
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
        <CheckCircleIcon className="w-4 h-4" />
        Good Performance
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6
                 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* Driver Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{driver.name}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-gray-600">Driver ID: {driver.id}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <StarIcon className="w-8 h-8 text-yellow-400" />
              <span className="text-4xl font-bold text-gray-900">
                {driver.averageScore.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600">{driver.totalTrips} total trips</p>
            <p
              className={`text-sm font-medium ${
                driver.trend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {driver.trend >= 0 ? '↑' : '↓'} {Math.abs(driver.trend).toFixed(1)}% vs last week
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <LineChart
          data={driver.sentimentTrend}
          title="30-Day Sentiment Trend"
        />
        <BarChart
          data={driver.tagFrequency}
          title="Most Common Feedback Tags"
        />
      </div>

      {/* Feedback History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Feedback History
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {driver.feedbackHistory.length} total feedback entries
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {driver.feedbackHistory.slice(0, 20).map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(feedback.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${
                          feedback.sentiment === 'positive'
                            ? 'bg-green-100 text-green-800'
                            : feedback.sentiment === 'negative'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      `}
                    >
                      {feedback.sentiment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {feedback.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {feedback.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{feedback.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                    <p className="line-clamp-2">{feedback.text || '-'}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {driver.feedbackHistory.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No feedback available for this driver
          </div>
        )}
      </div>
    </div>
  );
};
