import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Bot,
  BrainCircuit,
  Timer,
  BarChart3,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

export default function Sidebar({ mobileOpen = false, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/planner', label: 'Planner', icon: CalendarDays },
    { to: '/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/chat', label: 'AI Chatbot', icon: Bot },
    { to: '/timer', label: 'Focus Timer', icon: Timer },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/flashcards', label: 'Flashcards', icon: BrainCircuit },
  ];

  const bottomNavItems = [
    { to: '/chat', label: 'Help & Support', icon: HelpCircle },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        aria-label="Application navigation"
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 flex flex-col justify-between bg-white dark:bg-[#13161c] border-r border-black/[0.05] dark:border-white/[0.06] transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[220px]'
        } w-64 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between pb-6 pt-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#4caf7a] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-base tracking-tight text-slate-800 dark:text-slate-100 truncate">
                  StudyBuddy
                </span>
              )}
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Navigation List */}
          <nav className="space-y-1" aria-label="Main navigation">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-colors group ${
                      isActive
                        ? 'bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`
                  }
                >
                  <Icon className="w-4 h-4 stroke-[1.8] shrink-0" aria-hidden="true" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="my-auto" />

          {/* Pinned Bottom Navigation: Help & Settings */}
          <div className="pt-4 mt-4 border-t border-black/[0.04] dark:border-white/[0.05] space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors ${
                      isActive
                        ? 'bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`
                  }
                >
                  <Icon className="w-4 h-4 stroke-[1.8] shrink-0" aria-hidden="true" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}

            {/* Desktop Collapse / Expand Toggle */}
            <div className="hidden lg:flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf7a]"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
