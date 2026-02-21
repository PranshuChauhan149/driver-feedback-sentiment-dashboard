export const KpiCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "primary",
}) => {
  const colorClasses = {
    primary:
      "bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300",
    green:
      "bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-300",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300",
    red: "bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-200/70 to-gray-100/20 dark:from-gray-800/80 dark:to-gray-900/30 p-[1px] shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="bg-white dark:bg-gray-900/70 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs last period
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div
              className={`p-3 rounded-xl ring-1 ring-black/5 dark:ring-white/10 ${colorClasses[color]}`}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const DateRangeSelector = ({ value, onChange }) => {
  const options = [
    { value: "today", label: "Today" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
  ];

  return (
    <div
      className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-1"
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            ${
              value === option.value
                ? "bg-primary-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
