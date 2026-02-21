import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorStateProps {
  title?;
  message?;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading data. Please try again.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-150"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
