import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export const DonutChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-200/70 to-gray-100/20 dark:from-gray-800/80 dark:to-gray-900/30 p-[1px] shadow-sm">
      <div className="bg-white dark:bg-gray-900/70 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Overall sentiment mix for this period
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Total
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {total}
            </p>
          </div>
        </div>

        <div className="no-chart-focus">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={105}
                paddingAngle={2}
                dataKey="value"
                label={(entry) =>
                  `${((entry.value / total) * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Count"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.name}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {item.value} •{" "}
                {total ? ((item.value / total) * 100).toFixed(0) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
