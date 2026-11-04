import React from 'react';
import Card from '../../components/ui/Card';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="Loading dashboard content">
      {/* Greeting Banner Skeleton */}
      <div className="h-44 rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="w-32 h-6 bg-slate-800 rounded-full" />
          <div className="w-64 h-8 bg-slate-800 rounded-xl" />
          <div className="w-96 max-w-full h-4 bg-slate-800/60 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-32 h-12 bg-slate-800 rounded-2xl" />
          <div className="w-32 h-12 bg-slate-800 rounded-2xl" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Focus List Skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <div className="w-40 h-6 bg-slate-800 rounded" />
              <div className="w-24 h-4 bg-slate-800 rounded" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center px-4 gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-slate-800 rounded" />
                  <div className="w-1/3 h-3 bg-slate-800/60 rounded" />
                </div>
                <div className="w-16 h-8 bg-slate-800 rounded-xl" />
              </div>
            ))}
          </Card>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <Card className="p-6 h-64 flex flex-col items-center justify-center space-y-4">
            <div className="w-32 h-32 rounded-full border-8 border-slate-800" />
            <div className="w-24 h-4 bg-slate-800 rounded" />
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-36 h-5 bg-slate-800 rounded mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-slate-950/60 border border-slate-800 p-3" />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

