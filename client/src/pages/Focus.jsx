import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Settings,
  Bell,
  CheckCircle2,
  Coffee,
  Flame,
  Sparkles,
  Keyboard,
} from 'lucide-react';
import { useTimerStore } from '../store/timerStore';
import { useTodayTasks } from '../features/dashboard/useTodayTasks';
import TimerDisplay from '../features/focus/TimerDisplay';
import TimerControls from '../features/focus/TimerControls';
import TaskLinkSelector from '../features/focus/TaskLinkSelector';
import TimerSettingsModal from '../features/focus/TimerSettingsModal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Focus() {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    mode,
    status,
    durationSeconds,
    remainingSeconds,
    cyclesCompleted,
    durations,
    linkedTaskId,
    soundEnabled,
    announcement,
    start,
    pause,
    resume,
    reset,
    skip,
    tick,
    setMode,
    setDurations,
    setLinkedTask,
    toggleSound,
  } = useTimerStore();

  const { tasks, subjects } = useTodayTasks();

  // If navigated with task state from Dashboard
  useEffect(() => {
    if (location.state?.taskId) {
      setLinkedTask({
        id: location.state.taskId,
        subjectId: location.state.subjectId,
        title: location.state.taskTitle,
      });
    }
  }, [location.state, setLinkedTask]);

  // Accurate timestamp tick interval (every 500ms)
  useEffect(() => {
    let intervalId = null;
    if (status === 'running') {
      intervalId = setInterval(() => {
        tick();
      }, 500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, tick]);

  // Keyboard shortcut listener (Space to play/pause, R to reset, S to skip)
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't trigger if user is in an input or select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (status === 'running') {
          pause();
        } else {
          start();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        reset();
      } else if (e.key === 's' || e.key === 'S') {
        skip();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, start, pause, reset, skip]);

  return (
    <div className="max-w-3xl mx-auto py-2 sm:py-6 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header Controls: Title, Mode Tabs, Audio Toggle, Settings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-indigo-400" aria-hidden="true" />
            Focus Pomodoro
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Timestamp-synchronized study intervals that never drift in background tabs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Disable notification sound' : 'Enable notification sound'}
            title={soundEnabled ? 'Sound is Enabled' : 'Sound is Muted'}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
            )}
          </button>

          {/* Preferences button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open timer settings"
            title="Configure Durations"
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
          >
            <Settings className="w-4 h-4" aria-hidden="true" />
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Main Focus Card */}
      <Card className="p-6 sm:p-10 relative overflow-hidden bg-slate-900/80 border-slate-800 backdrop-blur-md shadow-2xl">
        {/* Mode Selector Pill Buttons */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Pomodoro timer modes"
            className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs shadow-inner"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'focus'}
              onClick={() => setMode('focus')}
              className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                mode === 'focus'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Focus ({durations.focus}m)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'short_break'}
              onClick={() => setMode('short_break')}
              className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                mode === 'short_break'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Short Break ({durations.short_break}m)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'long_break'}
              onClick={() => setMode('long_break')}
              className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                mode === 'long_break'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Long Break ({durations.long_break}m)
            </button>
          </div>
        </div>

        {/* Big Circular Timer Display */}
        <TimerDisplay
          mode={mode}
          remainingSeconds={remainingSeconds}
          durationSeconds={durationSeconds}
          cyclesCompleted={cyclesCompleted}
          announcement={announcement}
        />

        {/* Primary Timer Controls */}
        <TimerControls
          status={status}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />

        {/* Task Linker Section */}
        <div className="mt-8 pt-8 border-t border-slate-800/80">
          <TaskLinkSelector
            tasks={tasks}
            subjects={subjects}
            selectedTaskId={linkedTaskId}
            onSelectTask={setLinkedTask}
          />
        </div>
      </Card>

      {/* Helpful keyboard hints */}
      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
            Space
          </kbd>{' '}
          Start/Pause
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
            R
          </kbd>{' '}
          Reset
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
            S
          </kbd>{' '}
          Skip
        </span>
      </div>

      {/* Settings Modal */}
      <TimerSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        durations={durations}
        onSave={setDurations}
      />
    </div>
  );
}

