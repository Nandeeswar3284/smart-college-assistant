import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  GraduationCap,
  Building,
  Bell,
  Send,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  Server,
  Activity,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { addNotice } = useApp();

  // Notice broadcast state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Examination' | 'Academic' | 'Placement' | 'Events' | 'Fee & Finance'>('Examination');
  const [noticePriority, setNoticePriority] = useState<'Normal' | 'High' | 'Critical'>('High');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePublished, setNoticePublished] = useState(false);

  const deptData = [
    { dept: 'CSE', students: 720, attendance: 86.4 },
    { dept: 'ECE', students: 540, attendance: 82.1 },
    { dept: 'Mech', students: 430, attendance: 79.5 },
    { dept: 'Civil', students: 380, attendance: 81.2 },
    { dept: 'AI & DS', students: 380, attendance: 89.0 },
  ];

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    addNotice({
      title: noticeTitle,
      category: noticeCategory,
      priority: noticePriority,
      date: 'Sep 10, 2026',
      content: noticeContent,
      department: 'Office of the Principal & Dean',
      summaryBullets: [
        `Executive notice for all departments regarding ${noticeTitle}.`,
        'Mandatory compliance required before announced deadline.',
        'Review official circular in student/faculty portal.',
      ],
    });

    setNoticeTitle('');
    setNoticeContent('');
    setNoticePublished(true);
    setTimeout(() => setNoticePublished(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Central Administration Command</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Institutional Campus Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time analytics for 2,450 students, 180 faculty members, and 5 engineering departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="font-bold text-emerald-800 dark:text-emerald-300">All ERP Systems Operational</span>
          </div>
        </div>
      </div>

      {/* High-Level Institutional Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">
            2,450
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">99.2% Active on Portal</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Faculty & Staff</div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">
            180
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">1:14 Faculty-Student Ratio</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Campus Attendance</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            84.2%
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+2.4% vs Previous Term</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Classroom Occupancy</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1">
            78%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">42 Active Lecture Halls</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Analytics Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Departmental Attendance & Enrollment Benchmarks
              </h3>
              <p className="text-xs text-slate-400">Comparing student headcount and term attendance across faculties</p>
            </div>
          </div>

          <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Attendance Rate']}
                  contentStyle={{ borderRadius: '12px', backgroundColor: '#0f172a', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="attendance" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Broadcast Official Circular (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Campus-Wide Circular Broadcast
            </h3>
            <p className="text-xs text-slate-400">Instantly pushes AI-summarized alerts to all portals</p>
          </div>

          {noticePublished && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Broadcast dispatched to 2,630 registered accounts!</span>
            </div>
          )}

          <form onSubmit={handlePublishNotice} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Notice Headline:
              </label>
              <input
                type="text"
                required
                value={noticeTitle}
                onChange={e => setNoticeTitle(e.target.value)}
                placeholder="e.g. Schedule for Annual Autonomous Campus Audit"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category:
                </label>
                <select
                  value={noticeCategory}
                  onChange={e => setNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="Examination">Examination</option>
                  <option value="Academic">Academic</option>
                  <option value="Placement">Placement</option>
                  <option value="Events">Events</option>
                  <option value="Fee & Finance">Fee & Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Priority:
                </label>
                <select
                  value={noticePriority}
                  onChange={e => setNoticePriority(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Circular Content:
              </label>
              <textarea
                rows={3}
                required
                value={noticeContent}
                onChange={e => setNoticeContent(e.target.value)}
                placeholder="Details of the circular..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Notice Instantly</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
