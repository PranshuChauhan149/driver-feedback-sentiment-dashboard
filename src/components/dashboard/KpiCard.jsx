import { DateRange } from '../../types';

interface KpiCardProps {
  title;
  value | number;
  subtitle?;
  icon?;
  trend?: {
    value;
    isPositive;
  };
  color?: 'primary' | 'green' | 'amber' | 'red';
}

export const KpiCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
}: KpiCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
  const options: { value: DateRange; label }[] = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
  ];

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1" role="group">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            ${
              value === option.value
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
