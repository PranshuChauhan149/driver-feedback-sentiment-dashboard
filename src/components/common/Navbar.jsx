import { Link, useLocation } from 'react-router-dom';
import { AlertBell } from './AlertBell';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg hidden sm:block">
                Driver Sentiment
              </span>
            </Link>

            <div className="flex gap-1">
              <Link
                to="/dashboard"
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${
                    isActive('/dashboard')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                aria-current={isActive('/dashboard') ? 'page' : undefined}
              >
                <HomeIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/feedback"
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${
                    isActive('/feedback')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                aria-current={isActive('/feedback') ? 'page' : undefined}
              >
                <ClipboardDocumentListIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Feedback</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AlertBell />
          </div>
        </div>
      </div>
    </nav>
  );
};
