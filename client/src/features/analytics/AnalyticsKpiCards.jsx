import React from 'react';
import { Clock, CheckCircle2, Flame, Award, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function AnalyticsKpiCards({
  totalHours = 33.0,
  completionRate = 82,
  currentStreak = 7,
  longestStreak = 12,
}) {
  const cards = [
    {
      id: 'total-hours',
      title: 'Total Study Time',
      value: `${totalHours} hrs`,
      subtitle: '+2.5 hrs vs last week',
      icon: Clock,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: `${completionRate}%`,
      subtitle: 'Based on scheduled targets',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      id: 'current-streak',
      title: 'Current Streak',
      value: `${currentStreak} days`,
      subtitle: 'Keep studying today to maintain!',
      icon: Flame,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      id: 'longest-streak',
      title: 'Best Streak',
      value: `${longestStreak} days`,
      subtitle: 'Personal record to beat',
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.id}
            hover
            className="p-5 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div
                className={`p-2 rounded-xl ${card.bgColor} ${card.color} border ${card.borderColor}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                {card.id === 'total-hours' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                <span>{card.subtitle}</span>
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

