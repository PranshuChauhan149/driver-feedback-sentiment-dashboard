import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  required?: boolean;
}

export const StarRating = ({
  value,
  onChange,
  max = 5,
  disabled = false,
  size = 'md',
  label,
  required = false,
}: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(index + 1);
    } else if (event.key === 'ArrowRight' && index < max - 1) {
      event.preventDefault();
      onChange(index + 2);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      onChange(index);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className="flex gap-1"
        role="radiogroup"
        aria-label={label || 'Rating'}
        aria-required={required}
      >
        {Array.from({ length: max }, (_, index) => {
          const isActive = (hoverValue ?? value) > index;
          const Icon = isActive ? StarIcon : StarOutlineIcon;

          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={value === index + 1}
              aria-label={`${index + 1} star${index + 1 !== 1 ? 's' : ''}`}
              disabled={disabled}
              className={`
                ${sizeClasses[size]}
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${isActive ? 'text-yellow-400' : 'text-gray-300'}
                transition-all duration-150 hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded
              `}
              onClick={() => !disabled && onChange(index + 1)}
              onMouseEnter={() => !disabled && setHoverValue(index + 1)}
              onMouseLeave={() => !disabled && setHoverValue(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={disabled ? -1 : 0}
            >
              <Icon className="w-full h-full" />
            </button>
          );
        })}
      </div>
      {value > 0 && (
        <p className="text-sm text-gray-600" aria-live="polite">
          {value} out of {max} stars
        </p>
      )}
    </div>
  );
};
