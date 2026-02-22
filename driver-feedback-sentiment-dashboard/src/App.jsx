import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Navbar } from "./components/common/Navbar";

import { ToastContainer } from "./components/common/Toast";
import { lazy, Suspense, useEffect } from "react";
import { useAppStore } from "./stores/appStore";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/common/Footer";

// Lazy load pages for code splitting
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const FeedbackPage = lazy(() =>
  import("./pages/FeedbackPage").then((module) => ({
    default: module.FeedbackPage,
  })),
);
const DriverDetailPage = lazy(() =>
  import("./pages/DriverDetailPage").then((module) => ({
    default: module.DriverDetailPage,
  })),
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />
        <Route
          path="/feedback"
          element={
            <PageTransition>
              <FeedbackPage />
            </PageTransition>
          }
        />
        <Route
          path="/driver/:id"
          element={
            <PageTransition>
              <DriverDetailPage />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="pb-12">
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
