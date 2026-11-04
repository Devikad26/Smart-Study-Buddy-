import React, { useState } from 'react';
import PillSelect from '../ui/PillSelect';
import ThemeToggle from '../ui/ThemeToggle';

export default function PageHeader({
  title = 'Dashboard',
  dateRange = '7d',
  onDateRangeChange,
  subjectFilter = 'all',
  onSubjectFilterChange,
  subjects = [],
  children,
}) {
  const [internalRange, setInternalRange] = useState(dateRange);
  const [internalSubject, setInternalSubject] = useState(subjectFilter);

  const handleRangeChange = (val) => {
    setInternalRange(val);
    onDateRangeChange?.(val);
  };

  const handleSubjectChange = (val) => {
    setInternalSubject(val);
    onSubjectFilterChange?.(val);
  };

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'semester', label: 'This Semester' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All subjects' },
    ...subjects.map((s) => ({
      value: s._id || s.id,
      label: s.name,
    })),
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 pt-1">
      {/* Page Title: Large, light, muted geometric sans */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-slate-800 dark:text-slate-100">
          {title}
        </h1>
      </div>

      {/* Right Controls: Filter Pills & Theme Switcher */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <PillSelect
          value={onDateRangeChange ? dateRange : internalRange}
          onChange={handleRangeChange}
          options={dateOptions}
          aria-label="Filter date range"
        />

        <PillSelect
          value={onSubjectFilterChange ? subjectFilter : internalSubject}
          onChange={handleSubjectChange}
          options={subjectOptions}
          aria-label="Filter by subject"
        />

        <ThemeToggle />

        {children}
      </div>
    </div>
  );
}

