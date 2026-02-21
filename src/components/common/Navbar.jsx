import { Link, useLocation } from "react-router-dom";
import { AlertBell } from "./AlertBell";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useAppStore } from "../../stores/appStore";

export const Navbar = () => {
  const location = useLocation();
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg hidden sm:block">
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
                    isActive("/dashboard")
                      ? "bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                aria-current={isActive("/dashboard") ? "page" : undefined}
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
                    isActive("/feedback")
                      ? "bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                aria-current={isActive("/feedback") ? "page" : undefined}
              >
                <ClipboardDocumentListIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Feedback</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800
                         text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <MoonIcon className="w-4 h-4 text-gray-100" />
              ) : (
                <SunIcon className="w-4 h-4 text-yellow-500" />
              )}
            </button>
            <AlertBell />
          </div>
        </div>
      </div>
    </nav>
  );
};
