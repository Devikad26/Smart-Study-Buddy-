import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function TodayProgressRing({ completed = 0, total = 0 }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Card className="flex flex-col items-center justify-between p-6 h-full text-center">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" aria-hidden="true" />
          <h2 className="text-base font-bold text-slate-100">Today's Progress</h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {completed}/{total} Completed
        </span>
      </div>

      {/* Circular Progress Ring */}
      <div className="relative my-2 flex items-center justify-center">
        <svg
          className="w-36 h-36 -rotate-90 transform"
          viewBox="0 0 120 120"
          role="img"
          aria-label={`Daily progress: ${percent}% complete`}
        >
          {/* Background Track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="text-slate-800"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Foreground Progress */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="text-indigo-500 transition-all duration-700 ease-out"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {percent}%
          </span>
          <span className="text-[11px] font-medium text-slate-400 mt-0.5">
            Daily Goal
          </span>
        </div>
      </div>

      <div className="mt-4 w-full pt-4 border-t border-slate-800/80 flex items-center justify-around text-xs text-slate-400">
        <div>
          <span className="block text-slate-200 font-bold text-sm">{completed}</span>
          <span>Done</span>
        </div>
        <div className="w-px h-6 bg-slate-800" />
        <div>
          <span className="block text-slate-200 font-bold text-sm">
            {Math.max(0, total - completed)}
          </span>
          <span>Remaining</span>
        </div>
        <div className="w-px h-6 bg-slate-800" />
        <div>
          <span className="block text-slate-200 font-bold text-sm">{total}</span>
          <span>Total</span>
        </div>
      </div>
    </Card>
  );
}

