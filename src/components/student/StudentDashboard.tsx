import React from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  CalendarCheck,
  CheckSquare,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronRight,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TODAY_TIMETABLE } from '../../mockData';

export const StudentDashboard: React.FC = () => {
  const {
    studentProfile,
    attendance,
    internalMarks,
    assignments,
    notices,
    setCurrentView,
    setIsCopilotOpen,
    setIsFocusModeOpen,
    setIsDigitalIdOpen,
  } = useApp();

  // Metrics
  const totalAttended = attendance.reduce((sum, s) => sum + s.attended, 0);
  const totalConducted = attendance.reduce((sum, s) => sum + s.total, 0);
  const overallAttendance = Number(((totalAttended / totalConducted) * 100).toFixed(1));
  const warningSubjects = attendance.filter(s => s.status === 'warning' || s.status === 'critical');

  const pendingAssignments = assignments.filter(a => a.status !== 'Submitted');
  const dueSoonAssignments = assignments.filter(a => a.status === 'Due Soon');
  const overdueAssignments = assignments.filter(a => a.status === 'Overdue');

  const internalAvg = (internalMarks.reduce((sum, m) => sum + m.total, 0) / internalMarks.length).toFixed(1);

  // Risk Score calculation (Feature 13.A)
  // Factors: overallAttendance (75 threshold), internal avg, overdue assignments
  const isAtRisk = overallAttendance < 75 || overdueAssignments.length >= 2;
  const needsAttention = warningSubjects.length > 0 || overdueAssignments.length > 0;
  const healthStatus: 'Excellent' | 'Needs Attention' | 'At Risk' = isAtRisk
    ? 'At Risk'
    : needsAttention
    ? 'Needs Attention'
    : 'Excellent';

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Section - Student Profile Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative">
            <img
              src={studentProfile.avatar}
              alt={studentProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-50 dark:ring-indigo-950/60 shadow-md"
            />
            <button
              onClick={() => setIsDigitalIdOpen(true)}
              className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-transform hover:scale-110"
              title="Open Digital ID"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {studentProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                {studentProfile.rollNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {studentProfile.section}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {studentProfile.department} • {studentProfile.year} • Semester {studentProfile.semester}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-slate-400 dark:text-slate-500">
              <span>Advisor: <strong className="text-slate-700 dark:text-slate-300">{studentProfile.advisor}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong className="text-slate-700 dark:text-slate-300">{studentProfile.bloodGroup}</strong></span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setIsFocusModeOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Focus Mode</span>
          </button>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold shadow-xs shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask CampusAI</span>
          </button>
        </div>
      </div>

      {/* 2. Hackathon Standout AI Highlights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* A. "My College Today" AI Morning Summary */}
        <div className="lg:col-span-2 bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>My College Today AI Summary</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                Thursday, Sep 10
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Good Morning, Alex 👋
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed max-w-xl">
              Here is what matters today: you have <strong className="text-white">3 lecture sessions</strong>, 
              <strong className="text-amber-300"> 1 high-priority assignment</strong> due tomorrow in DBMS, and 
              <strong className="text-white"> Mid-Semester Exams begin in 12 days</strong>.
            </p>

            {/* Quick Stat Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-indigo-200 uppercase font-medium">Classes Today</div>
                <div className="text-lg font-bold text-white">3 Sessions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-indigo-200 uppercase font-medium">Assignments Due</div>
                <div className="text-lg font-bold text-amber-300">{pendingAssignments.length} Pending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-indigo-200 uppercase font-medium">Exam Countdown</div>
                <div className="text-lg font-bold text-white">12 Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-indigo-200 uppercase font-medium">Algorithms Att.</div>
                <div className="text-lg font-bold text-rose-300">71.0% ⚠</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-indigo-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Next Class: <strong>Machine Learning Lab</strong> at 09:45 AM (AI Lab 3)</span>
            </div>
            <button
              onClick={() => setCurrentView('study-planner')}
              className="text-white hover:text-indigo-200 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View Today's AI Study Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* B. AI Academic Risk Detector & Smart Workload */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                AI Academic Health
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  healthStatus === 'Excellent'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : healthStatus === 'Needs Attention'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {healthStatus}
              </span>
            </div>

            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
              84.2 <span className="text-xs font-normal text-slate-400">/ 100 Index</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Early-warning indicator synthesized from attendance (84.4%), internal test average (41/50), and submission speed.
            </p>

            {warningSubjects.length > 0 && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Attention:</strong> Algorithms (CS303) is at 71.0%. Missing 1 more class will drop it into the critical exam-bar zone.
                </div>
              </div>
            )}
          </div>

          {/* C. Workload Classifier */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Upcoming Workload:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded text-[11px]">
                Heavy Workload
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              High density of deliverables this week. Recommend starting the Database assignment today.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Core Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Attendance Snapshot */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Overall Attendance</h3>
                  <p className="text-[11px] text-slate-400">Threshold: 75% required</p>
                </div>
              </div>
              <span className={`text-sm font-black ${overallAttendance >= 75 ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600'}`}>
                {overallAttendance}%
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overallAttendance >= 75 ? 'bg-indigo-600' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, overallAttendance)}%` }}
              />
            </div>

            {/* Subject breakdown list */}
            <div className="space-y-2">
              {attendance.slice(0, 4).map(sub => (
                <div key={sub.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 truncate max-w-[170px]">
                    {sub.code}: {sub.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {sub.attended}/{sub.total}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.2 rounded font-mono ${
                        sub.percentage >= 75
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {sub.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('attendance-predictor')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>Launch "What If I Miss Class" Predictor</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Internal Marks & Academic Performance */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Internal Marks</h3>
                  <p className="text-[11px] text-slate-400">Class Average: 37.8 / 50</p>
                </div>
              </div>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                {internalAvg} <span className="text-xs font-normal text-slate-400">/ 50</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {internalMarks.slice(0, 4).map(im => (
                <div key={im.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                  <div className="flex items-center justify-between font-medium text-slate-800 dark:text-slate-200">
                    <span className="truncate max-w-[180px]">{im.subjectCode}: {im.subjectName}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{im.total} / 50</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>T1: {im.assessment1} • T2: {im.assessment2} • Asg: {im.assignmentMarks}</span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{im.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('marks')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>View Full Grade Sheet & Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 3: CGPA & Target Trajectory */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Cumulative CGPA</h3>
                  <p className="text-[11px] text-slate-400">Total Credits Earned: 114</p>
                </div>
              </div>
              <span className="text-lg font-black text-violet-600 dark:text-violet-400">
                8.42
              </span>
            </div>

            {/* Target comparison progress */}
            <div className="p-3.5 rounded-2xl bg-violet-50/60 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50 mb-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Semester 6 Target:</span>
                <strong className="text-violet-700 dark:text-violet-300 font-bold">8.80 CGPA</strong>
              </div>
              <div className="w-full bg-violet-200/70 dark:bg-violet-900/60 h-2 rounded-full overflow-hidden">
                <div className="bg-violet-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Requires scoring ≥ 8.75 semester GPA across current 5 courses.
              </p>
            </div>

            {/* Past Semesters mini badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">Sem 3</div>
                <div className="font-bold text-slate-700 dark:text-slate-200">8.40</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">Sem 4</div>
                <div className="font-bold text-slate-700 dark:text-slate-200">8.35</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">Sem 5</div>
                <div className="font-bold text-slate-700 dark:text-slate-200">8.52</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('cgpa-predictor')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>Open Interactive CGPA Predictor</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 4: Today's Timetable */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Today's Timetable</h3>
                  <p className="text-[11px] text-slate-400">Thursday Schedule</p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                Class in session
              </span>
            </div>

            <div className="space-y-2">
              {TODAY_TIMETABLE.slice(0, 3).map(slot => (
                <div
                  key={slot.id}
                  className={`p-2.5 rounded-xl border text-xs transition-colors ${
                    slot.isCurrent
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-100">
                    <span>{slot.subjectCode}: {slot.subjectName}</span>
                    {slot.isCurrent && (
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-600 text-white font-bold">
                        NOW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {slot.roomNumber.split('(')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('timetable')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>View Full Weekly Timetable</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 5: Assignments Tracker Snapshot */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Assignments</h3>
                  <p className="text-[11px] text-slate-400">{pendingAssignments.length} Pending Actions</p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
                {dueSoonAssignments.length} Due Soon
              </span>
            </div>

            <div className="space-y-2">
              {assignments.slice(0, 3).map(asg => (
                <div
                  key={asg.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {asg.title}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        asg.status === 'Submitted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : asg.status === 'Due Soon'
                          ? 'bg-amber-100 text-amber-800'
                          : asg.status === 'Overdue'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{asg.subjectCode}</span>
                    <span>Due: {asg.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('assignments')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>Manage All Assignments & Calendar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 6: Smart Notice Center Snapshot */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Notice Bulletin</h3>
                  <p className="text-[11px] text-slate-400">Campus Announcements</p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-medium">
                AI Summaries
              </span>
            </div>

            <div className="space-y-2.5">
              {notices.slice(0, 2).map(notice => (
                <div
                  key={notice.id}
                  onClick={() => setCurrentView('notifications')}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                        notice.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {notice.priority}
                    </span>
                    <span className="text-[10px] text-slate-400">{notice.date}</span>
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                    {notice.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentView('notifications')}
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center justify-between group cursor-pointer"
          >
            <span>Open Notice Center & AI Summarizer</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
