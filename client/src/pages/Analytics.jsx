import React from 'react';
import { BarChart3, RotateCcw, AlertCircle } from 'lucide-react';
import AnalyticsKpiCards from '../features/analytics/AnalyticsKpiCards';
import SubjectHoursChart from '../features/analytics/SubjectHoursChart';
import WeeklyConsistencyChart from '../features/analytics/WeeklyConsistencyChart';
import SyllabusProgressBar from '../features/analytics/SyllabusProgressBar';
import AnalyticsSkeleton from '../features/analytics/AnalyticsSkeleton';
import { useAnalyticsSummary } from '../features/analytics/useAnalyticsSummary';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Analytics() {
  const { data, loading, error, refetch } = useAnalyticsSummary();

  if (loading && !data) {
    return <AnalyticsSkeleton />;
  }

  if (error && !data) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 inline-block mb-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Unable to load Analytics</h2>
        <p className="text-sm text-slate-400 mb-6">
          {error || 'An error occurred while fetching study metrics.'}
        </p>
        <Button variant="primary" onClick={refetch} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Retry
        </Button>
      </div>
    );
  }

  const hoursPerSubject = data?.hoursPerSubject || [];
  const weeklyConsistency = data?.weeklyConsistency || [];
  const syllabusCompletion = data?.syllabusCompletion || [];
  const completionRate = data?.completionRate ?? 82;
  const streak = data?.streak || { current: 7, longest: 12 };

  const totalHours = hoursPerSubject.reduce(
    (acc, curr) => acc + (Number(curr.hours) || 0),
    0
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-indigo-400" aria-hidden="true" />
            Study Analytics & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time tracking of study consistency, subject distribution, and exam readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={refetch}
            aria-label="Refresh study analytics"
            className="gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* KPI Cards */}
      <AnalyticsKpiCards
        totalHours={totalHours}
        completionRate={completionRate}
        currentStreak={streak.current}
        longestStreak={streak.longest}
      />

      {/* Charts Grid: Responsive 1 col on mobile, 2 col on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Weekly Consistency Chart */}
        <WeeklyConsistencyChart data={weeklyConsistency} />

        {/* Hours Per Subject Donut / Bar Chart */}
        <SubjectHoursChart data={hoursPerSubject} />
      </div>

      {/* Syllabus Completion Horizontal Progress Bars */}
      <SyllabusProgressBar subjects={syllabusCompletion} />
    </div>
  );
}
