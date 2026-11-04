import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 focus-visible:ring-indigo-500',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700/80 light:bg-slate-100 light:text-slate-800 light:border-slate-300 light:hover:bg-slate-200 focus-visible:ring-slate-400',
    outline:
      'bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800/60 hover:text-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 light:border-slate-300 light:text-slate-700 light:hover:bg-slate-100 focus-visible:ring-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 dark:hover:bg-slate-800 light:text-slate-600 light:hover:bg-slate-100 focus-visible:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-sm focus-visible:ring-rose-500',
    success:
      'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-sm focus-visible:ring-emerald-500',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

