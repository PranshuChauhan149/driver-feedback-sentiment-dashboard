import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const TimelineItem = ({ feedback }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-200 dark:border-green-800";
      case "neutral":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700";
      case "negative":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700";
    }
  };

  const getEntityIcon = (entityType) => {
    const icons = {
      driver: "🚗",
      trip: "🛣️",
      app: "📱",
      marshal: "👮",
    };
    return icons[entityType] || "📝";
  };

  return (
    <div className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center text-lg">
        {getEntityIcon(feedback.entityType)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                {feedback.entityType}
              </span>
              <span
                className={`
                  px-2 py-0.5 text-xs font-medium rounded-full border
                  ${getSentimentColor(feedback.sentiment)}
                `}
              >
                {feedback.sentiment}
              </span>
            </div>
            {feedback.driverName && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Driver: {feedback.driverName}
              </p>
            )}
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < feedback.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                {feedback.rating}/5
              </span>
            </div>
            {feedback.text && (
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                {feedback.text}
              </p>
            )}
            {feedback.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {feedback.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {feedback.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{feedback.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {new Date(feedback.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export const FeedbackTimeline = ({ feedback }) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: feedback.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Feedback
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {feedback.length} total entries
        </p>
      </div>
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: "600px" }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <TimelineItem feedback={feedback[virtualItem.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
