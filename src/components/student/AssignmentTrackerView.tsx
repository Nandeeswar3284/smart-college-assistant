import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  FileText,
  Upload,
  Filter,
  User,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../types';

export const AssignmentTrackerView: React.FC = () => {
  const { assignments, toggleAssignmentStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);

  const filteredAssignments = assignments.filter(asg => {
    const matchesFilter = filterStatus === 'All' || asg.status === filterStatus;
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const submittedCount = assignments.filter(a => a.status === 'Submitted').length;
  const dueSoonCount = assignments.filter(a => a.status === 'Due Soon').length;
  const overdueCount = assignments.filter(a => a.status === 'Overdue').length;
  const upcomingCount = assignments.filter(a => a.status === 'Upcoming').length;

  const handleSimulateSubmit = (id: string) => {
    toggleAssignmentStatus(id);
    setActiveSubmissionId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Course Deliverables</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Assignment Management & Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track coursework deadlines, upload project deliverables, and review faculty evaluations.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'calendar'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Calendar Schedule
          </button>
        </div>
      </div>

      {/* KPI Status Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterStatus('Submitted')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'Submitted'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">🟢 Submitted</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{submittedCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Graded or completed</div>
        </button>

        <button
          onClick={() => setFilterStatus('Due Soon')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'Due Soon'
              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">🟡 Due Soon</span>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">{dueSoonCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Within 48 hours</div>
        </button>

        <button
          onClick={() => setFilterStatus('Overdue')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'Overdue'
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">🔴 Overdue</span>
            <span className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono">{overdueCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Urgent submission needed</div>
        </button>

        <button
          onClick={() => setFilterStatus('Upcoming')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            filterStatus === 'Upcoming'
              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">🔵 Upcoming</span>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">{upcomingCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Next week onwards</div>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['All', 'Due Soon', 'Overdue', 'Upcoming', 'Submitted'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filterStatus === tab
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter assignments..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden"
          />
        </div>
      </div>

      {/* List Mode */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredAssignments.map(asg => {
            const isSubmitted = asg.status === 'Submitted';
            return (
              <div
                key={asg.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isSubmitted
                    ? 'bg-slate-50/60 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                        {asg.subjectCode}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {asg.subjectName}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          asg.priority === 'High'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : asg.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {asg.priority} Priority
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {asg.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {asg.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        Faculty: <strong className="text-slate-700 dark:text-slate-300">{asg.facultyName}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Due: <strong className="text-slate-700 dark:text-slate-300">{asg.dueDate}</strong>
                      </span>
                      {asg.attachmentName && (
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                          <FileText className="w-3.5 h-3.5" />
                          {asg.attachmentName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submission Status & Action */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-5 shrink-0">
                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                          asg.status === 'Submitted'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : asg.status === 'Due Soon'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : asg.status === 'Overdue'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {asg.status}
                      </span>
                      {asg.marksAwarded && (
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                          Score: {asg.marksAwarded}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSimulateSubmit(asg.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSubmitted
                          ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Mark Incomplete</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Submit Work</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Calendar Schedule View */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">September 2026 Deliverables Schedule</h3>
            <span className="text-xs text-slate-400">Term Weeks 4 & 5</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(28)].map((_, i) => {
              const day = i + 1;
              const hasDueSoon = day === 11;
              const hasOverdue = day === 9;
              const hasUpcoming = day === 13 || day === 18;

              return (
                <div
                  key={i}
                  className={`min-h-24 p-2 rounded-2xl border text-left flex flex-col justify-between ${
                    day === 10
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800'
                      : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${day === 10 ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}>
                      {day}
                    </span>
                    {day === 10 && (
                      <span className="text-[9px] font-bold px-1 rounded bg-indigo-600 text-white">TODAY</span>
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {hasDueSoon && (
                      <div className="p-1 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-semibold truncate">
                        DBMS B-Tree Due
                      </div>
                    )}
                    {hasOverdue && (
                      <div className="p-1 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-[10px] font-semibold truncate">
                        OS Kernel Sim
                      </div>
                    )}
                    {hasUpcoming && (
                      <div className="p-1 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[10px] font-semibold truncate">
                        Algorithms DP
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
