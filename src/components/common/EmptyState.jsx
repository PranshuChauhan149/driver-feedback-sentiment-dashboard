import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  icon?;
  title;
  description?;
  action?: {
    label;
    onClick: () => void;
  };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-gray-400 mb-4">
        {icon || <InformationCircleIcon className="w-16 h-16" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                   transition-colors duration-150"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
