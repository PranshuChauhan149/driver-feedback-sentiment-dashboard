import { create } from "zustand";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
};

const defaultFilters = {
  entityType: "all",
  sentiment: "all",
  driverId: "",
  dateRange: "30d",
  searchText: "",
  scoreRange: [0, 5],
};

export const useAppStore = create((set) => ({
  // Feature Flags
  featureFlags: {
    driverFeedback: true,
    tripFeedback: true,
    appFeedback: false,
    marshalFeedback: true,
  },
  setFeatureFlags: (flags) => set({ featureFlags: flags }),

  // Alerts
  alerts: [],
  setAlerts: (alerts) =>
    set({
      alerts,
      unreadAlertsCount: alerts.filter((a) => !a.read).length,
    }),
  markAlertAsRead: (alertId) =>
    set((state) => {
      const newAlerts = state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert,
      );
      return {
        alerts: newAlerts,
        unreadAlertsCount: newAlerts.filter((a) => !a.read).length,
      };
    }),
  unreadAlertsCount: 0,

  // Date Range
  selectedDateRange: "30d",
  setDateRange: (range) => set({ selectedDateRange: range }),

  // Sentiment Summary
  sentimentSummary: null,
  setSentimentSummary: (summary) => set({ sentimentSummary: summary }),

  // Filters
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),

  // Theme (Dark/Light Mode)
  theme: getInitialTheme(),
  setTheme: (newTheme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    set({ theme: newTheme });
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return { theme: newTheme };
    }),

  // Toast
  toasts: [],
  addToast: (message, type) => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
