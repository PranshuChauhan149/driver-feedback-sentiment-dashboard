import { useState, useMemo } from 'react';
import { Driver } from '../../types';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface DriverTableProps {
  drivers: Driver[];
  isLoading?: boolean;
}

type SortField = 'name' | 'totalTrips' | 'averageScore' | 'trend';
type SortDirection = 'asc' | 'desc';

export const DriverTable = ({ drivers, isLoading }: DriverTableProps) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('averageScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchText, setSearchText] = useState('');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedDrivers = useMemo(() => {
    let filtered = drivers;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchText.toLowerCase()) ||
          driver.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Score filter
    if (scoreFilter !== 'all') {
      filtered = filtered.filter((driver) => {
        if (scoreFilter === 'high') return driver.averageScore >= 4.0;
        if (scoreFilter === 'medium') return driver.averageScore >= 2.5 && driver.averageScore < 4.0;
        if (scoreFilter === 'low') return driver.averageScore < 2.5;
        return true;
      });
    }

    // Sort
    return [...filtered].sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return multiplier * a.name.localeCompare(b.name);
      }
      return multiplier * (a[sortField] - b[sortField]);
    });
  }, [drivers, searchText, scoreFilter, sortField, sortDirection]);

  const toggleRow = (driverId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(driverId)) {
      newExpanded.delete(driverId);
    } else {
      newExpanded.add(driverId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: Driver['status']) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'alert':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-primary-600" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Search drivers"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'high', 'medium', 'low'].map((filter) => (
              <button
                key={filter}
                onClick={() => setScoreFilter(filter as typeof scoreFilter)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    scoreFilter === filter
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {filter === 'all' ? 'All' : filter === 'high' ? '≥ 4.0' : filter === 'medium' ? '2.5-3.9' : '< 2.5'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900"
                >
                  Driver
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Driver ID
                </span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('totalTrips')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900"
                >
                  Total Trips
                  <SortIcon field="totalTrips" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('averageScore')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900"
                >
                  Avg Score
                  <SortIcon field="averageScore" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('trend')}
                  className="flex items-center gap-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900"
                >
                  Trend
                  <SortIcon field="trend" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedDrivers.map((driver) => {
              const isExpanded = expandedRows.has(driver.id);
              return (
                <tr
                  key={driver.id}
                  className={`
                    hover:bg-gray-50 transition-colors cursor-pointer
                    ${getStatusColor(driver.status)}
                  `}
                  onClick={() => navigate(`/driver/${driver.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{driver.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{driver.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{driver.totalTrips}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {driver.averageScore.toFixed(2)}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < Math.round(driver.averageScore)
                                ? 'bg-yellow-400'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-sm font-medium ${
                        driver.trend >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {driver.trend >= 0 ? '↑' : '↓'} {Math.abs(driver.trend).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/driver/${driver.id}`);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-800 font-medium"
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
        <div className="p-8 text-center text-gray-500">
          No drivers found matching your criteria
        </div>
      )}
    </div>
  );
};
