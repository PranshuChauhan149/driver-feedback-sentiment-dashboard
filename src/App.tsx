import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { lazy, Suspense } from 'react';

// Lazy load pages for code splitting
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
);
const FeedbackPage = lazy(() =>
  import('./pages/FeedbackPage').then((module) => ({ default: module.FeedbackPage }))
);
const DriverDetailPage = lazy(() =>
  import('./pages/DriverDetailPage').then((module) => ({ default: module.DriverDetailPage }))
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pb-12">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/driver/:id" element={<DriverDetailPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
