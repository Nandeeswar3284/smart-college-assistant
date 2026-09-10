import React from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Sun,
  Moon,
  IdCard,
  LogOut,
  UserCheck,
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    userRole,
    setUserRole,
    studentProfile,
    notices,
    setIsSearchOpen,
    setIsCopilotOpen,
    setIsDigitalIdOpen,
    isDarkMode,
    toggleDarkMode,
    setIsLoggedIn,
    setCurrentView,
  } = useApp();

  const unreadCount = notices.filter(n => !n.read).length;

  const roleOptions: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />, desc: 'Alex Rivera (CS2024-089)' },
    { role: 'faculty', label: 'Faculty Portal', icon: <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, desc: 'Dr. Sarah Mitchell (Dept Head)' },
    { role: 'parent', label: 'Parent Portal', icon: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />, desc: 'Robert Rivera (Ward: Alex)' },
    { role: 'admin', label: 'Admin Console', icon: <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />, desc: 'Dean K. Thompson (Central Admin)' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Left: Mobile Title or Search Trigger */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            SC
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">SmartCampus</span>
        </div>

        {/* Universal Search Bar */}
        <button
          id="btn-header-search"
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60 transition-all group"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          <span>Search classrooms, faculty, notices, courses...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] uppercase font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400 shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/70 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 cursor-pointer shadow-xs hover:border-indigo-300 transition-all">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline capitalize">{userRole} View</span>
            <span className="sm:hidden capitalize text-[11px]">{userRole}</span>
            <Layers className="w-3 h-3 opacity-60 ml-0.5" />
          </div>

          {/* Role selection dropdown */}
          <div className="absolute right-0 mt-1 w-64 p-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 hidden group-hover:block transition-all z-50">
            <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Switch User Role
            </div>
            {roleOptions.map(opt => (
              <button
                key={opt.role}
                onClick={() => {
                  setUserRole(opt.role);
                  setCurrentView('dashboard');
                }}
                className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                  userRole === opt.role
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="mt-0.5 p-1 rounded-md bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700">
                  {opt.icon}
                </div>
                <div>
                  <div className="text-slate-800 dark:text-slate-100">{opt.label}</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Copilot Trigger */}
        <button
          id="btn-header-copilot"
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold shadow-xs shadow-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/30 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden md:inline">CampusAI Copilot</span>
          <span className="md:hidden">AI</span>
        </button>

        {/* Digital ID Button (for student role) */}
        {userRole === 'student' && (
          <button
            id="btn-header-digital-id"
            onClick={() => setIsDigitalIdOpen(true)}
            className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            title="View Digital Student ID"
          >
            <IdCard className="w-4 h-4 text-indigo-500" />
            <span className="hidden lg:inline">Digital ID</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          id="btn-header-notifications"
          onClick={() => setCurrentView('notifications')}
          className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          )}
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          id="btn-header-darkmode"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Mini Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
          />
          <button
            onClick={() => setIsLoggedIn(false)}
            className="hidden sm:flex p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Log Out (Back to Landing Page)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
