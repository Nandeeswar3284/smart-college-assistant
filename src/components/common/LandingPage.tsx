import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  Compass,
  Heart,
  Users,
  BrainCircuit,
  Lock,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { setUserRole, setIsLoggedIn, setCurrentView } = useApp();
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('student');

  const handleQuickLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const demoRoles: { role: UserRole; name: string; desc: string; icon: any; color: string }[] = [
    {
      role: 'student',
      name: 'Student Demo',
      desc: 'Alex Mercer (CSE 3rd Yr) • Attendance, CGPA Predictor, AI Study Planner & Gamification',
      icon: GraduationCap,
      color: 'from-indigo-600 to-blue-600',
    },
    {
      role: 'faculty',
      name: 'Faculty Demo',
      desc: 'Dr. Sarah Jenkins (Assoc. Prof) • One-Click Attendance, Coursework Publishing & Analytics',
      icon: Users,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      role: 'parent',
      name: 'Parent Demo',
      desc: 'Guardian of Alex • Real-time Attendance Alerts, Leave Approvals & Fee Payments',
      icon: Heart,
      color: 'from-rose-600 to-pink-600',
    },
    {
      role: 'admin',
      name: 'Admin Demo',
      desc: 'Campus Dean Office • Institutional Analytics, Resource Utilization & Circular Broadcasts',
      icon: ShieldCheck,
      color: 'from-violet-600 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Smart College Assistant</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                AI Platform
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Apex Institute of Technology & Engineering
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuickLogin('student')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Live Campus Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 py-12 sm:py-16 flex flex-col items-center text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Next-Generation College Hackathon Winner Concept</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.1]">
          Unified <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-violet-300 to-amber-300">AI-Powered Digital Campus</span> Companion
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Solving fragmented college management. Seamlessly connects <strong className="text-white">Students</strong>, <strong className="text-white">Faculty</strong>, <strong className="text-white">Parents</strong>, and <strong className="text-white">Administrators</strong> into one real-time predictive campus operating system.
        </p>

        {/* Demo Credentials Quick Switcher Banner */}
        <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl text-left space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                1-Click Instant Demo Access
              </div>
              <h3 className="text-lg font-bold text-white">Select Any Institutional Persona</h3>
            </div>
            <div className="text-xs text-slate-400">
              Zero passwords required for judges & evaluators
            </div>
          </div>

          {/* 4 Demo Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {demoRoles.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  onClick={() => handleQuickLogin(item.role)}
                  className="p-4 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${item.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Highlights Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl w-full text-left pt-4">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <CalendarCheck className="w-4 h-4 text-indigo-400 mb-1.5" />
            <div className="text-xs font-bold text-slate-200">What-If Predictor</div>
            <div className="text-[10px] text-slate-500">Attendance forecasting</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <TrendingUp className="w-4 h-4 text-violet-400 mb-1.5" />
            <div className="text-xs font-bold text-slate-200">CGPA Target Engine</div>
            <div className="text-[10px] text-slate-500">Credit weighted math</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <BrainCircuit className="w-4 h-4 text-emerald-400 mb-1.5" />
            <div className="text-xs font-bold text-slate-200">AI Study Planner</div>
            <div className="text-[10px] text-slate-500">Pomodoro focus mode</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <Compass className="w-4 h-4 text-amber-400 mb-1.5" />
            <div className="text-xs font-bold text-slate-200">Campus Navigator</div>
            <div className="text-[10px] text-slate-500">Empty rooms & lab finder</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 col-span-2 sm:col-span-1">
            <Sparkles className="w-4 h-4 text-rose-400 mb-1.5" />
            <div className="text-xs font-bold text-slate-200">CampusAI Copilot</div>
            <div className="text-[10px] text-slate-500">Contextual assistant</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          © 2026 Smart College Assistant. Engineered for Institutional Excellence.
        </div>
        <div className="flex items-center gap-4">
          <span>React 18 + Vite</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Institutional ERP Ready</span>
        </div>
      </footer>
    </div>
  );
};
