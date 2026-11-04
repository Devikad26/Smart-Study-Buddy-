import React from 'react';
import { Sparkles, Flame, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getGreetingTime, formatReadableDate } from '../../utils/dates';
import { useStore } from '../../store/useStore';
import ThemeToggle from '../../components/ui/ThemeToggle';

export default function GreetingBanner({ streak = 7, totalHours = 14.5 }) {
  const { user } = useStore();
  const userName = user?.name || 'Monika';
  const greeting = getGreetingTime();
  const todayFormatted = formatReadableDate(new Date());

  return (
    <section
      aria-label="Welcome banner"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/90 via-indigo-950/80 to-slate-900 border border-indigo-800/40 p-6 sm:p-8 shadow-xl"
    >
      {/* Decorative ambient glowing orbs */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 left-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{todayFormatted}</span>
            </span>
            <ThemeToggle />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-indigo-300 via-white to-purple-200 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
            Stay consistent today! You're making continuous progress toward your upcoming exam milestones.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Daily Streak Pill */}
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-amber-300 shadow-md backdrop-blur-md"
            title={`${streak} day daily study streak!`}
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Flame className="w-5 h-5 animate-pulse" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-medium text-amber-200/80 uppercase tracking-wider">
                Daily Streak
              </div>
              <div className="text-lg font-black text-amber-300">
                {streak} <span className="text-xs font-semibold">Days</span>
              </div>
            </div>
          </div>

          {/* Weekly Hours Pill */}
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-emerald-300 shadow-md backdrop-blur-md"
            title={`${totalHours} study hours logged`}
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-medium text-emerald-200/80 uppercase tracking-wider">
                Study Time
              </div>
              <div className="text-lg font-black text-emerald-300">
                {totalHours} <span className="text-xs font-semibold">Hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

