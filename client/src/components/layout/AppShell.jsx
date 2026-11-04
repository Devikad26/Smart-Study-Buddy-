import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Sparkles } from 'lucide-react';
import Sidebar from './Sidebar';
import FloatingChatWidget from '../chat/FloatingChatWidget';
import ThemeToggle from '../ui/ThemeToggle';

export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#eceef2] dark:bg-[#0b0d11] p-2 sm:p-3.5 lg:p-5 flex flex-col font-sans transition-colors duration-250">
      {/* Skymetrics Main App Container: 28-32px rounded white card with soft shadow */}
      <div className="max-w-[1600px] w-full mx-auto flex-1 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white dark:bg-[#13161c] border border-black/[0.05] dark:border-white/[0.06] app-container-shadow overflow-hidden flex flex-col lg:flex-row min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.75rem)] lg:min-h-[calc(100vh-2.5rem)]">
        
        {/* Mobile Top Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-[#13161c]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#4caf7a] flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                StudyBuddy
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 bg-slate-50/50 dark:bg-[#151820]/40">
          <Outlet />
        </main>
      </div>

      {/* Global Floating Chatbot Widget */}
      <FloatingChatWidget />
    </div>
  );
}
