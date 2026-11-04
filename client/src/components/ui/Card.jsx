import React from 'react';

export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`rounded-[20px] bg-white dark:bg-[#191d24] border border-black/[0.05] dark:border-white/[0.06] p-5 sm:p-6 skymetrics-card-shadow transition-all duration-200 ${
        hover
          ? 'hover:border-black/[0.1] dark:hover:border-white/[0.12] hover:shadow-md hover:-translate-y-0.5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
