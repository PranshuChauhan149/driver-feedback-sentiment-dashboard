import { StarRating } from '../common/StarRating';
import { TagSelector } from '../common/TagSelector';
import { FEEDBACK_TAGS } from '../../api/mockApi';
import { useState, useEffect } from 'react';

const MAX_CHARS = 500;

export const FeedbackSection = ({
  entityType,
  entityLabel,
  value,
  onChange,
}) => {
  const [rating, setRating] = useState(value?.rating || 0);
  const [selectedTags, setSelectedTags] = useState<string[]>(value?.tags || []);
  const [text, setText] = useState(value?.text || '');
  const [touched, setTouched] = useState(false);

  const tags = FEEDBACK_TAGS[entityType] || [];

  useEffect(() => {
    onChange({
      entityType,
      rating,
      tags: selectedTags,
      text,
    });
  }, [rating, selectedTags, text, entityType, onChange]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setTouched(true);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setText(newText);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isValid = rating > 0;
  const showError = touched && !isValid;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">{entityLabel} Feedback</h3>
        <p className="text-sm text-gray-500 mt-1">
          Please rate your experience and select relevant tags
        </p>
      </div>

      <div>
        <StarRating
          value={rating}
          onChange={handleRatingChange}
          label="Overall Rating"
          required
          size="md"
        />
        {showError && (
          <p className="text-sm text-red-600 mt-1" role="alert">
            Please provide a rating
          </p>
        )}
      </div>

      {rating > 0 && (
        <>
          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
            label="Select Tags (Optional)"
          />

          <div>
            <label
              htmlFor={`${entityType}-feedback-text`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Comments (Optional)
            </label>
            <textarea
              id={`${entityType}-feedback-text`}
              value={text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                       resize-none text-sm"
              placeholder="Share more details about your experience..."
              aria-describedby={`${entityType}-char-count`}
            />
            <div
              id={`${entityType}-char-count`}
              className="flex justify-between items-center mt-1"
            >
              <span className="text-xs text-gray-500">
                {text.length} / {MAX_CHARS} characters
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
