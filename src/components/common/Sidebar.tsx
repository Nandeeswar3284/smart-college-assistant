import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  TrendingUp,
  BrainCircuit,
  Calendar,
  CheckSquare,
  Award,
  MapPin,
  Bell,
  FileText,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Zap,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    currentView,
    setCurrentView,
    notices,
    assignments,
    leaveRequests,
    setIsFocusModeOpen,
    setIsCopilotOpen,
  } = useApp();

  const unreadNotices = notices.filter(n => !n.read).length;
  const pendingAssignments = assignments.filter(a => a.status !== 'Submitted').length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'attendance-predictor', label: 'Attendance Predictor', icon: <Sparkles className="w-4 h-4 text-indigo-500" />, badge: 'AI' },
    { id: 'cgpa-predictor', label: 'CGPA Predictor', icon: <TrendingUp className="w-4 h-4 text-violet-500" />, badge: 'AI' },
    { id: 'study-planner', label: 'Smart Study Planner', icon: <BrainCircuit className="w-4 h-4 text-emerald-500" />, badge: 'AI' },
    { id: 'timetable', label: "Today's Timetable", icon: <Calendar className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignment Tracker', icon: <CheckSquare className="w-4 h-4" />, count: pendingAssignments },
    { id: 'marks', label: 'Marks & Results', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'campus-map', label: 'Campus Map & Labs', icon: <MapPin className="w-4 h-4 text-amber-500" /> },
    { id: 'notifications', label: 'Notice Center', icon: <Bell className="w-4 h-4" />, count: unreadNotices },
    { id: 'leave', label: 'Leave Application', icon: <FileText className="w-4 h-4" /> },
    { id: 'badges', label: 'Achievements', icon: <Award className="w-4 h-4 text-amber-500" /> },
  ];

  const facultyNavItems = [
    { id: 'dashboard', label: 'Faculty Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'attendance-marking', label: 'Mark Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'marks-upload', label: 'Upload Internal Marks', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'manage-assignments', label: 'Manage Assignments', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'leave-approvals', label: 'Leave Requests', icon: <FileText className="w-4 h-4" />, count: pendingLeaves },
    { id: 'campus-analytics', label: 'Class Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notifications', label: 'Broadcast Notices', icon: <Bell className="w-4 h-4" /> },
  ];

  const parentNavItems = [
    { id: 'dashboard', label: 'Ward Academic Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'fee-details', label: 'Fee Payment Center', icon: <FileText className="w-4 h-4 text-emerald-500" />, badge: 'Pay' },
    { id: 'attendance', label: 'Attendance Record', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'marks', label: 'Semester Grades & Marks', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'leave', label: 'Leave History', icon: <FileText className="w-4 h-4" /> },
    { id: 'notifications', label: 'College Notices', icon: <Bell className="w-4 h-4" />, count: unreadNotices },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Executive Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'dept-management', label: 'Departments & Courses', icon: <Layers className="w-4 h-4" /> },
    { id: 'campus-facilities', label: 'Rooms & Lab Allocation', icon: <MapPin className="w-4 h-4" /> },
    { id: 'students-faculty', label: 'Directory & Rosters', icon: <Users className="w-4 h-4" /> },
    { id: 'campus-analytics', label: 'University Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notifications', label: 'Global Announcements', icon: <Bell className="w-4 h-4" /> },
  ];

  const currentNavItems =
    userRole === 'student'
      ? studentNavItems
      : userRole === 'faculty'
      ? facultyNavItems
      : userRole === 'parent'
      ? parentNavItems
      : adminNavItems;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-57px)] transition-colors">
      <div className="p-4 space-y-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-base shadow-sm shadow-indigo-500/30">
            SC
          </div>
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight flex items-center gap-1.5">
              SmartCampus
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded">
                AI v2
              </span>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Digital Campus Companion
            </div>
          </div>
        </div>

        {/* Hackathon Quick Role Ribbon */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 px-1">
            <span>ACTIVE ROLE</span>
            <span className="text-[10px] text-indigo-500 font-normal">Click to switch</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => {
                setUserRole('student');
                setCurrentView('dashboard');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                userRole === 'student'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Student</span>
            </button>
            <button
              onClick={() => {
                setUserRole('faculty');
                setCurrentView('dashboard');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                userRole === 'faculty'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>Faculty</span>
            </button>
            <button
              onClick={() => {
                setUserRole('parent');
                setCurrentView('dashboard');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                userRole === 'parent'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Parent</span>
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setCurrentView('dashboard');
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                userRole === 'admin'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation
          </div>
          {currentNavItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {'badge' in item && item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                  {'count' in item && typeof item.count === 'number' && item.count > 0 && (
                    <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white min-w-4 text-center">
                      {item.count}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3 h-3 text-indigo-500" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Focus & AI Callouts */}
      <div className="p-4 space-y-2 border-t border-slate-200/80 dark:border-slate-800">
        {userRole === 'student' && (
          <button
            onClick={() => setIsFocusModeOpen(true)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 text-amber-900 dark:text-amber-200 transition-all text-xs font-semibold group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>Enter Focus Mode</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono">
              25m
            </span>
          </button>
        )}

        <button
          onClick={() => setIsCopilotOpen(true)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-linear-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-900 dark:text-indigo-200 transition-all text-xs font-semibold group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 group-hover:rotate-12 transition-transform" />
            <span>CampusAI Copilot</span>
          </div>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Ask now</span>
        </button>
      </div>
    </aside>
  );
};
