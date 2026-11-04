import React from 'react';
import { Flame, Coffee, Sparkles } from 'lucide-react';
import { formatTimerSeconds } from '../../utils/dates';

export default function TimerDisplay({
  mode = 'focus',
  remainingSeconds = 1500,
  durationSeconds = 1500,
  cyclesCompleted = 0,
  announcement = '',
}) {
  const percent = durationSeconds > 0
    ? Math.max(0, Math.min(100, Math.round(((durationSeconds - remainingSeconds) / durationSeconds) * 100)))
    : 0;

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const modeConfig = {
    focus: {
      label: 'Focus Session',
      color: 'text-indigo-500',
      strokeColor: '#6366f1',
      bgGlow: 'from-indigo-600/10 to-purple-600/10',
      icon: Flame,
    },
    short_break: {
      label: 'Short Break',
      color: 'text-emerald-500',
      strokeColor: '#10b981',
      bgGlow: 'from-emerald-600/10 to-teal-600/10',
      icon: Coffee,
    },
    long_break: {
      label: 'Long Break',
      color: 'text-sky-500',
      strokeColor: '#0ea5e9',
      bgGlow: 'from-sky-600/10 to-indigo-600/10',
      icon: Sparkles,
    },
  }[mode] || {
    label: 'Focus Session',
    color: 'text-indigo-500',
    strokeColor: '#6366f1',
    bgGlow: 'from-indigo-600/10 to-purple-600/10',
    icon: Flame,
  };

  const Icon = modeConfig.icon;
  const timeFormatted = formatTimerSeconds(remainingSeconds);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Polite Screen Reader Announcement only for key state transitions */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Mode Tag */}
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 shadow-sm text-slate-200">
          <Icon className={`w-3.5 h-3.5 ${modeConfig.color}`} aria-hidden="true" />
          <span>{modeConfig.label}</span>
        </span>

        {/* 4-Cycle Pomodoro Counter Dots */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400"
          title={`Cycle ${(cyclesCompleted % 4) + 1} of 4 before long break`}
        >
          <span className="text-[11px] font-semibold text-slate-300">
            Cycle {(cyclesCompleted % 4) + 1}/4
          </span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx < (cyclesCompleted % 4)
                    ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50'
                    : 'bg-slate-800'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* SVG Circular Progress Ring */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90 transform drop-shadow-lg"
          viewBox="0 0 280 280"
          role="img"
          aria-label={`${modeConfig.label}: ${timeFormatted} remaining`}
        >
          {/* Track */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            className="text-slate-800/80"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            stroke={modeConfig.strokeColor}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Big Monospace Digits */}
        <div className="absolute flex flex-col items-center justify-center select-none text-center">
          <span
            className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md"
            aria-hidden="true"
          >
            {timeFormatted}
          </span>
          <span className="text-xs font-semibold text-slate-400 mt-2 tracking-wide uppercase">
            {percent}% elapsed
          </span>
        </div>
      </div>
    </div>
  );
}

