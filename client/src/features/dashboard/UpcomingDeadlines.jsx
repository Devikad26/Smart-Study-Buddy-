import React from 'react';
import { CalendarDays, GraduationCap, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import { getCountdownBadge, formatReadableDate } from '../../utils/dates';

export default function UpcomingDeadlines({ deadlines = [] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-400" aria-hidden="true" />
          <h2 className="text-base font-bold text-slate-100">Upcoming Deadlines</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Next 14 Days</span>
      </div>

      {deadlines.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          <CalendarDays className="w-8 h-8 text-slate-600 mx-auto mb-2" aria-hidden="true" />
          <p>No upcoming exams or deadlines in the immediate queue.</p>
        </div>
      ) : (
        <ul className="space-y-3" aria-label="Upcoming deadlines and exams list">
          {deadlines.map((item) => {
            const badge = getCountdownBadge(item.targetDate);

            const badgeColorMap = {
              rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-bold animate-pulse',
              amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold',
              indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 font-medium',
              slate: 'bg-slate-800 text-slate-400 border-slate-700 font-medium',
            };

            return (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Subject Color Indicator */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.subjectColor }}
                    aria-hidden="true"
                    title={`Subject: ${item.subjectName}`}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="truncate">{item.subjectName}</span>
                      <span>•</span>
                      <span>{formatReadableDate(item.targetDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Chip */}
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border ${
                      badgeColorMap[badge.color] || badgeColorMap.indigo
                    }`}
                  >
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{badge.text}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
