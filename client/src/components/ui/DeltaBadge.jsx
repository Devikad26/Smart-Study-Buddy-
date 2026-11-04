import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DeltaBadge({
  value = '+0%',
  isPositive = true,
  className = '',
}) {
  const displayVal = String(value);
  const positive = isPositive;

  return (
    <span
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight ${
        positive
          ? 'bg-[#ebf7f0] text-[#2e7d52] dark:bg-[#4caf7a]/20 dark:text-[#6fcf97]'
          : 'bg-[#fdeeee] text-[#c53030] dark:bg-[#eb5757]/20 dark:text-[#fca5a5]'
      } ${className}`}
    >
      {positive ? (
        <ArrowUpRight className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
      ) : (
        <ArrowDownRight className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
      )}
      <span>{displayVal}</span>
    </span>
  );
}
