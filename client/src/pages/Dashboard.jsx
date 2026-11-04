import React from 'react';
import { AlertCircle, RotateCcw, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GreetingBanner from '../features/dashboard/GreetingBanner';
import TodayFocusList from '../features/dashboard/TodayFocusList';
import TodayProgressRing from '../features/dashboard/TodayProgressRing';
import UpcomingDeadlines from '../features/dashboard/UpcomingDeadlines';
import DashboardSkeleton from '../features/dashboard/DashboardSkeleton';
import { useTodayTasks } from '../features/dashboard/useTodayTasks';
import { useUpcomingDeadlines } from '../features/dashboard/useUpcomingDeadlines';
import { useAnalyticsSummary } from '../features/analytics/useAnalyticsSummary';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    tasks,
    subjects,
    loading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
    toggleComplete,
  } = useTodayTasks();

  const {
    deadlines,
    loading: deadlinesLoading,
    error: deadlinesError,
    refetch: refetchDeadlines,
  } = useUpcomingDeadlines();

  const {
    data: analytics,
    loading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useAnalyticsSummary();

  const isLoading = tasksLoading || deadlinesLoading;
  const hasError = tasksError || deadlinesError;

  const handleRetryAll = () => {
    refetchTasks();
    refetchDeadlines();
    refetchAnalytics();
  };

  if (isLoading && !tasks.length && !deadlines.length) {
    return <DashboardSkeleton />;
  }

  if (hasError && !tasks.length && !deadlines.length) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 inline-block mb-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Unable to load Dashboard</h2>
        <p className="text-sm text-slate-400 mb-6">
          {tasksError || deadlinesError || 'There was an error communicating with the server.'}
        </p>
        <Button variant="primary" onClick={handleRetryAll} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Retry Connection
        </Button>
      </div>
    );
  }

  const completedToday = tasks.filter((t) => t.completed).length;
  const totalToday = tasks.length;
  const currentStreak = analytics?.streak?.current ?? 7;
  const hoursThisWeek = analytics?.hoursPerSubject?.reduce((acc, cur) => acc + (cur.hours || 0), 0) ?? 14.5;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Greeting, Date, Streak Badge */}
      <GreetingBanner streak={currentStreak} totalHours={hoursThisWeek} />

      {/* Main Grid: Responsive layout (1 col mobile, 3 col desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Column (2 spans on desktop): Today's Focus List */}
        <div className="lg:col-span-2 space-y-6">
          <TodayFocusList
            tasks={tasks}
            subjects={subjects}
            onToggleComplete={toggleComplete}
            isLoading={tasksLoading}
          />

          {/* Member A Floating Chat Widget Promo / Callout Card */}
          <Card className="p-5 border-dashed border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    Need help with today's study topics?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ask your AI tutor questions or review tough concepts anytime.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/chat')}
                className="shrink-0"
              >
                Open Tutor Chat
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column (1 span on desktop): Today's Progress Ring & Upcoming Deadlines */}
        <div className="space-y-6 sm:space-y-8">
          {/* Circular Progress Ring */}
          <TodayProgressRing completed={completedToday} total={totalToday} />

          {/* Upcoming Deadlines with Subject Colors & Countdown Chips */}
          <UpcomingDeadlines deadlines={deadlines} isLoading={deadlinesLoading} />
        </div>
      </div>
    </div>
  );
}

