import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Lazy-load routes for high performance and lightweight initial bundles
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));
const PlannerPage = lazy(() => import('./pages/PlannerPage'));
const SubjectsPage = lazy(() => import('./pages/SubjectsPage'));
const TimerPage = lazy(() => import('./pages/TimerPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Route loading fallback component
function RouteLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-8" aria-label="Loading page">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-slate-400">Loading module...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Member C — Public Landing Page */}
          <Route path="/landing" element={<LandingPage />} />

          {/* Dedicated Auth Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Main Application Shell */}
          <Route path="/" element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="flashcards" element={<FlashcardsPage />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="timer" element={<TimerPage />} />
            <Route path="focus" element={<TimerPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
