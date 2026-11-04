import React from 'react';
import Card from '../../components/ui/Card';

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse" aria-label="Loading analytics data">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="w-48 h-8 bg-slate-800 rounded-xl" />
          <div className="w-72 h-4 bg-slate-800/60 rounded" />
        </div>
        <div className="w-28 h-9 bg-slate-800 rounded-xl" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-5 h-28 flex flex-col justify-between">
            <div className="w-24 h-4 bg-slate-800 rounded" />
            <div className="w-32 h-7 bg-slate-800 rounded-lg" />
          </Card>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 h-80 flex flex-col justify-between">
          <div className="w-36 h-5 bg-slate-800 rounded" />
          <div className="w-full h-48 bg-slate-800/50 rounded-xl" />
          <div className="w-48 h-4 bg-slate-800/60 rounded mx-auto" />
        </Card>
        <Card className="p-6 h-80 flex flex-col justify-between">
          <div className="w-36 h-5 bg-slate-800 rounded" />
          <div className="w-full h-48 bg-slate-800/50 rounded-xl" />
          <div className="w-48 h-4 bg-slate-800/60 rounded" />
        </Card>
      </div>

      {/* Syllabus Progress Skeleton */}
      <Card className="p-6 space-y-4">
        <div className="w-40 h-5 bg-slate-800 rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="w-32 h-4 bg-slate-800 rounded" />
              <div className="w-12 h-4 bg-slate-800 rounded" />
            </div>
            <div className="w-full h-3 bg-slate-800/60 rounded-full" />
          </div>
        ))}
      </Card>
    </div>
  );
}

