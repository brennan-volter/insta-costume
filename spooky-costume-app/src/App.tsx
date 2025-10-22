import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SubscribeDevProvider, useSubscribeDev } from '@subscribe.dev/react';
import { DataProvider } from './contexts/DataContext';
import Header from './components/shared/Header';
import LandingPage from './pages/LandingPage';
import WorkflowPage from './pages/WorkflowPage';
import GroupSelfiePage from './pages/GroupSelfiePage';
import GalleryPage from './pages/GalleryPage';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, signIn } = useSubscribeDev();

  React.useEffect(() => {
    if (!isSignedIn) {
      signIn();
    }
  }, [isSignedIn, signIn]);

  if (!isSignedIn) {
    return null; // signIn() will redirect
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <WorkflowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/group-selfie"
            element={
              <ProtectedRoute>
                <GroupSelfiePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <SubscribeDevProvider projectToken={import.meta.env.VITE_SUBSCRIBEDEV_PROJECT_TOKEN}>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </SubscribeDevProvider>
  );
};

export default App;
