import { useState, useMemo } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const DriverTable = ({ drivers, isLoading }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("averageScore");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedDrivers = useMemo(() => {
    let filtered = drivers;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchText.toLowerCase()) ||
          driver.id.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Score filter
    if (scoreFilter !== "all") {
      filtered = filtered.filter((driver) => {
        if (scoreFilter === "high") return driver.averageScore >= 4.0;
        if (scoreFilter === "medium")
          return driver.averageScore >= 2.5 && driver.averageScore < 4.0;
        if (scoreFilter === "low") return driver.averageScore < 2.5;
        return true;
      });
    }

    // Sort
    return [...filtered].sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      if (sortField === "name") {
        return multiplier * a.name.localeCompare(b.name);
      }
      return multiplier * (a[sortField] - b[sortField]);
    });
  }, [drivers, searchText, scoreFilter, sortField, sortDirection]);

  const toggleRow = (driverId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(driverId)) {
      newExpanded.delete(driverId);
    } else {
      newExpanded.add(driverId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800";
      case "good":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800";
      case "warning":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800";
      case "alert":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800";
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <ChevronUpDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
      );
    }
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-primary-600" />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredAndSortedDrivers.length} total entries
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                aria-label="Search drivers"
              />
            </div>
            <div className="flex gap-2">
              {["all", "high", "medium", "low"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setScoreFilter(filter)}
                  className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    scoreFilter === filter
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
                >
                  {filter === "all"
                    ? "All"
                    : filter === "high"
                      ? "≥ 4.0"
                      : filter === "medium"
                        ? "2.5-3.9"
                        : "< 2.5"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white"
                >
                  Driver
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Driver ID
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("totalTrips")}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white"
                >
                  Total Trips
                  <SortIcon field="totalTrips" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("averageScore")}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white"
                >
                  Avg Score
                  <SortIcon field="averageScore" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort("trend")}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white"
                >
                  Trend
                  <SortIcon field="trend" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedDrivers.map((driver) => {
              const isExpanded = expandedRows.has(driver.id);
              return (
                <tr
                  key={driver.id}
                  className={`
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer
                    ${getStatusColor(driver.status)}
                  `}
                  onClick={() => navigate(`/driver/${driver.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {driver.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {driver.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {driver.totalTrips}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {driver.averageScore.toFixed(2)}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < Math.round(driver.averageScore)
                                ? "bg-yellow-400"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-sm font-medium ${
                        driver.trend >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {driver.trend >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(driver.trend).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/driver/${driver.id}`);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-800 dark:hover:text-primary-400 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredAndSortedDrivers.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No drivers found matching your criteria
        </div>
      )}
    </div>
  );
};
