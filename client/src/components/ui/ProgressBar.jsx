import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = '#6366f1',
  height = 'h-2.5',
  className = '',
  label = '',
  showLabel = false,
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-medium text-slate-300 dark:text-slate-300">{label}</span>
          <span className="font-semibold text-slate-400 dark:text-slate-400">{percent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        className={`w-full overflow-hidden rounded-full bg-slate-800 dark:bg-slate-800 ${height}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

