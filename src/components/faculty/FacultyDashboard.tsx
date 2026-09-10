import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  AlertTriangle,
  TrendingUp,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  BarChart3,
  FileCheck,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const FacultyDashboard: React.FC = () => {
  const { studentList, toggleStudentAttendance, addAssignment, internalMarks } = useApp();

  const [activeTab, setActiveTab] = useState<'attendance' | 'assignments' | 'analytics' | 'marks'>('attendance');
  const [selectedBatch, setSelectedBatch] = useState('CSE 3rd Year - Section A');
  const [subject, setSubject] = useState('CS303: Design & Analysis of Algorithms');

  // Quick Assignment State
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDueDate, setAsgDueDate] = useState('2026-09-18');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgSuccess, setAsgSuccess] = useState(false);

  // Attendance batch submit feedback
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  const presentCount = studentList.filter(s => s.presentToday).length;
  const absentCount = studentList.length - presentCount;
  const attendanceRate = Math.round((presentCount / studentList.length) * 100);

  const handleMarkAll = (status: boolean) => {
    studentList.forEach(s => {
      if (s.presentToday !== status) {
        toggleStudentAttendance(s.id);
      }
    });
  };

  const handlePostAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle.trim()) return;

    addAssignment({
      title: asgTitle,
      subjectCode: 'CS303',
      subjectName: 'Design & Analysis of Algorithms',
      facultyName: 'Dr. Sarah Jenkins',
      dueDate: asgDueDate,
      status: 'Upcoming',
      priority: 'Medium',
      description: asgDesc,
    });

    setAsgTitle('');
    setAsgDesc('');
    setAsgSuccess(true);
    setTimeout(() => setAsgSuccess(false), 3500);
  };

  const analyticsData = [
    { range: '< 50%', count: 1, label: 'At Risk' },
    { range: '50-65%', count: 2, label: 'Warning' },
    { range: '65-75%', count: 4, label: 'Borderline' },
    { range: '75-85%', count: 12, label: 'Satisfactory' },
    { range: '85-100%', count: 17, label: 'Exemplary' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Faculty Profile Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Dr. Sarah Jenkins"
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-50 dark:ring-indigo-950 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Dr. Sarah Jenkins
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Senior Associate Professor
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Dept. of Computer Science & Engineering • Faculty ID: <strong className="text-slate-700 dark:text-slate-300">FAC-CS-104</strong>
            </p>
            <div className="text-xs text-slate-400 mt-1">
              Active Courses: <strong>CS303 (Algorithms)</strong>, <strong>CS304 (AI Systems)</strong>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {(['attendance', 'assignments', 'analytics', 'marks'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'attendance' ? 'Take Attendance' : tab === 'assignments' ? 'Post Assignment' : tab === 'analytics' ? 'Class Analytics' : 'Grade Book'}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: One-Click Attendance Marking */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {/* Class controls & Batch Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-0.5">
                Active Lecture Session
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {subject} — {selectedBatch}
              </h3>
              <p className="text-xs text-slate-400">
                Date: Thursday, Sep 10, 2026 • Slot: 10:45 AM - 11:45 AM (LH-201)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-emerald-600">{presentCount} Present</span>
                <span>•</span>
                <span className="font-bold text-rose-600">{absentCount} Absent</span>
                <span>•</span>
                <span className="font-mono font-bold text-indigo-600">({attendanceRate}%)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkAll(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold cursor-pointer"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => handleMarkAll(false)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold cursor-pointer"
                >
                  Reset All
                </button>
                <button
                  onClick={() => {
                    setAttendanceSubmitted(true);
                    setTimeout(() => setAttendanceSubmitted(false), 3000);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {attendanceSubmitted ? 'Saved to ERP ✓' : 'Submit Attendance'}
                </button>
              </div>
            </div>
          </div>

          {attendanceSubmitted && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Attendance finalized! Automatic SMS & in-app alerts dispatched for {absentCount} absent students.</span>
            </div>
          )}

          {/* Student attendance grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {studentList.map(student => (
              <div
                key={student.id}
                onClick={() => toggleStudentAttendance(student.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  student.presentToday
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/50'
                    : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 hover:bg-rose-100/50'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                      {student.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                      {student.rollNumber}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Term Attendance: <strong className={student.attendancePercentage < 75 ? 'text-rose-600 font-bold' : 'text-slate-700 dark:text-slate-300'}>
                      {student.attendancePercentage}%
                    </strong>
                    {student.riskStatus === 'At Risk' && (
                      <span className="text-[10px] text-rose-600 font-bold ml-1.5">⚠ At Risk</span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                    student.presentToday
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {student.presentToday ? 'P' : 'A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Post Assignment */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Create New Coursework</h3>
              <p className="text-xs text-slate-400">Instantly publishes to student dashboards with deadline push notifications</p>
            </div>

            {asgSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Assignment published to 36 enrolled students!</span>
              </div>
            )}

            <form onSubmit={handlePostAssignment} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title:
                </label>
                <input
                  type="text"
                  required
                  value={asgTitle}
                  onChange={e => setAsgTitle(e.target.value)}
                  placeholder="e.g. Dynamic Programming Memoization Matrix"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Course Target:
                  </label>
                  <select className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium">
                    <option>CS303: Algorithms</option>
                    <option>CS304: AI Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    value={asgDueDate}
                    onChange={e => setAsgDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Instructions & Problem Statement:
                </label>
                <textarea
                  rows={4}
                  value={asgDesc}
                  onChange={e => setAsgDesc(e.target.value)}
                  placeholder="Write clear expectations, evaluation rubrics, and submission format..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish Assignment to Students</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Submission Turn-in Tracker</h3>
              <p className="text-xs text-slate-400 mb-4">Real-time status of current active assignments</p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100">B-Tree Indexing Implementation</span>
                    <span className="text-emerald-600 font-bold">29 / 36 Submitted</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Due: Sep 11</span>
                    <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      Grade Submissions →
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100">Graph Theory & Dijkstra Shortest Path</span>
                    <span className="text-amber-600 font-bold">14 / 36 Submitted</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Due: Sep 18</span>
                    <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      Send Reminder Broadcast →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between mt-4">
              <span>Automatic Plagiarism & AI-detection enabled via Turnitin API</span>
              <span className="font-bold">Active ✓</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Class Performance Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Attendance Distribution Curve</h3>
                <p className="text-xs text-slate-400">Cohort threshold analysis (36 Enrolled Students)</p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                Class Avg: 81.4%
              </span>
            </div>

            <div className="h-60 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    formatter={(val: number) => [`${val} Students`, 'Headcount']}
                    contentStyle={{ borderRadius: '12px', backgroundColor: '#0f172a', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Early Intervention Watchlist</span>
                </h3>
                <p className="text-xs text-slate-400">Students flagged below 75% or with failing internals</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {studentList.filter(s => s.attendancePercentage < 75).map(s => (
                <div
                  key={s.id}
                  className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 dark:text-slate-100">{s.name} ({s.rollNumber})</span>
                    <span className="text-rose-600 dark:text-rose-400 font-mono">{s.attendancePercentage}% Att.</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-[11px] flex items-center justify-between">
                    <span>Missed 8 of 28 classes conducted</span>
                    <button
                      onClick={() => alert(`Counseling meeting scheduled with ${s.name} and Advisor.`)}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      Schedule Counseling
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Grade Book */}
      {activeTab === 'marks' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Continuous Internal Evaluation (CIE) Master Sheet
              </h3>
              <p className="text-xs text-slate-400">Assessment 1 (20) + Assessment 2 (20) + Assignment (10) = 50 Marks</p>
            </div>
            <button
              onClick={() => alert('Continuous assessment grades synced to University Controller of Exams.')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs cursor-pointer"
            >
              Export & Lock CIE Sheet
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Subject Code</th>
                  <th className="py-2.5 px-3">Course Name</th>
                  <th className="py-2.5 px-3">Test 1 (20)</th>
                  <th className="py-2.5 px-3">Test 2 (20)</th>
                  <th className="py-2.5 px-3">Assignment (10)</th>
                  <th className="py-2.5 px-3">Total (50)</th>
                  <th className="py-2.5 px-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {internalMarks.map(im => (
                  <tr key={im.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{im.subjectCode}</td>
                    <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">{im.subjectName}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assessment1}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assessment2}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assignmentMarks}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{im.total}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {im.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
