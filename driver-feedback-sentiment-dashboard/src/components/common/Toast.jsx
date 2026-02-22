import { useAppStore } from "../../stores/appStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const ToastContainer = () => {
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 space-y-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 min-w-80 max-w-md p-4 rounded-lg shadow-lg
            bg-white dark:bg-gray-900 border-l-4 animate-slide-in
            ${toast.type === "success" ? "border-green-500" : ""}
            ${toast.type === "error" ? "border-red-500" : ""}
            ${toast.type === "info" ? "border-blue-500" : ""}
          `}
          role="alert"
        >
          {toast.type === "success" && (
            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
          )}
          {toast.type === "error" && (
            <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
          {toast.type === "info" && (
            <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
          )}
          <p className="flex-1 text-sm text-gray-800 dark:text-gray-100">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label="Close notification"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
