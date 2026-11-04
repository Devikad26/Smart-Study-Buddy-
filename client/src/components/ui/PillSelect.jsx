import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function PillSelect({
  label,
  value,
  onChange,
  options = [],
  className = '',
  'aria-label': ariaLabel,
}) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || label}
        className="appearance-none cursor-pointer pl-3.5 pr-8 py-1.5 rounded-full bg-slate-100/90 dark:bg-white/[0.08] hover:bg-slate-200/70 dark:hover:bg-white/[0.12] border border-black/[0.04] dark:border-white/[0.06] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf7a]"
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const name = typeof opt === 'string' ? opt : opt.label;
          return (
            <option
              key={val}
              value={val}
              className="bg-white dark:bg-[#191d24] text-slate-800 dark:text-slate-200 py-1"
            >
              {name}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400">
        <ChevronDown className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
      </div>
    </div>
  );
}

