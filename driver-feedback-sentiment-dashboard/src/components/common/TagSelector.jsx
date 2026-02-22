import { XMarkIcon } from "@heroicons/react/24/outline";

export const TagSelector = ({
  tags,
  selectedTags,
  onChange,
  label,
  disabled = false,
  maxSelection,
}) => {
  const toggleTag = (tagId) => {
    if (disabled) return;

    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId));
    } else {
      if (maxSelection && selectedTags.length >= maxSelection) {
        return; // Don't allow more than max selections
      }
      onChange([...selectedTags, tagId]);
    }
  };

  const handleKeyDown = (event, tagId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTag(tagId);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={label || "Tag selection"}
      >
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          const isDisabled =
            disabled ||
            (maxSelection
              ? selectedTags.length >= maxSelection && !isSelected
              : false);

          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              onKeyDown={(e) => handleKeyDown(e, tag.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              aria-label={tag.label}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${
                  isSelected
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <span className="flex items-center gap-1.5">
                {tag.label}
                {isSelected && (
                  <XMarkIcon className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </span>
            </button>
          );
        })}
      </div>
      {maxSelection && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {selectedTags.length} / {maxSelection} selected
        </p>
      )}
    </div>
  );
};
