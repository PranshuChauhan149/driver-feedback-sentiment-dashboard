import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useAlerts } from '../../api/queries';
import { useNavigate } from 'react-router-dom';

export const AlertBell = () => {
  const navigate = useNavigate();
  const { data: alerts = [] } = useAlerts();
  const { unreadAlertsCount, markAlertAsRead, setAlerts } = useAppStore();

  // Sync alerts with store
  if (alerts.length > 0 && useAppStore.getState().alerts.length === 0) {
    setAlerts(alerts);
  }

  const handleAlertClick = (driverId: string, alertId: string) => {
    markAlertAsRead(alertId);
    navigate(`/driver/${driverId}`);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none 
                 focus:ring-2 focus:ring-primary-500 rounded-lg transition-colors"
        aria-label={`Notifications ${unreadAlertsCount > 0 ? `(${unreadAlertsCount} unread)` : ''}`}
      >
        {unreadAlertsCount > 0 ? (
          <BellAlertIcon className="w-6 h-6 text-red-500" />
        ) : (
          <BellIcon className="w-6 h-6" />
        )}
        {unreadAlertsCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">
              Alerts ({unreadAlertsCount} unread)
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No alerts
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <Menu.Item key={alert.id}>
                    {({ active }) => (
                      <button
                        onClick={() => handleAlertClick(alert.driverId, alert.id)}
                        className={`
                          w-full text-left p-4 transition-colors
                          ${active ? 'bg-gray-50' : ''}
                          ${!alert.read ? 'bg-red-50' : ''}
                        `}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {alert.driverName}
                            </p>
                            <p className="text-sm text-red-600 mt-1">
                              Score dropped to {alert.averageScore.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!alert.read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1.5" />
                          )}
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
