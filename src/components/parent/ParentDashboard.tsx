import React, { useState } from 'react';
import {
  Heart,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileText,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentDashboard: React.FC = () => {
  const { studentProfile, attendance, leaveApplications, approveParentLeave } = useApp();
  const [parentMessage, setParentMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Fee state
  const [tuitionFeePaid, setTuitionFeePaid] = useState(false);

  const totalAttended = attendance.reduce((s, a) => s + a.attended, 0);
  const totalConducted = attendance.reduce((s, a) => s + a.total, 0);
  const overallAttendance = Number(((totalAttended / totalConducted) * 100).toFixed(1));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentMessage.trim()) return;
    setMessageSent(true);
    setParentMessage('');
    setTimeout(() => setMessageSent(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Parent & Guardian Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Verified Parent Account
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Monitoring Ward: <strong className="text-slate-800 dark:text-slate-200">{studentProfile.name}</strong> ({studentProfile.rollNumber}) • {studentProfile.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-xs">
            <span className="text-slate-400">Class Advisor:</span>{' '}
            <strong className="text-indigo-700 dark:text-indigo-300">{studentProfile.advisor}</strong>
          </div>
        </div>
      </div>

      {/* Ward Academic Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Standing</div>
            <div className={`text-3xl font-black font-mono ${overallAttendance >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {overallAttendance}%
            </div>
            <p className="text-xs text-slate-500">
              {overallAttendance >= 75 ? 'Meets university minimum criteria' : 'Requires immediate attention'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative CGPA</div>
            <div className="text-3xl font-black font-mono text-violet-600 dark:text-violet-400">
              8.42
            </div>
            <p className="text-xs text-slate-500">Ranked Top 5% in CSE cohort</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Semester Fee Balance</div>
            <div className={`text-3xl font-black font-mono ${tuitionFeePaid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {tuitionFeePaid ? '$0' : '$850'}
            </div>
            <p className="text-xs text-slate-500">
              {tuitionFeePaid ? 'All Term Dues Cleared ✓' : 'Due by September 30, 2026'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Leave Approval Action Box (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Ward Leave & Absence Authorizations
              </h3>
              <p className="text-xs text-slate-400">Review student-submitted leaves requiring parent verification</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              Parent Consent Required
            </span>
          </div>

          <div className="space-y-3">
            {leaveApplications.map(app => (
              <div
                key={app.id}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {app.leaveType}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {app.fromDate} to {app.toDate} ({app.totalDays} Days)
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      app.parentApproval === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Parent Consent: {app.parentApproval}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {app.reason}
                </p>

                {app.parentApproval === 'Pending' ? (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => approveParentLeave(app.id, true)}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Grant Parent Approval ✓
                    </button>
                    <button
                      onClick={() => approveParentLeave(app.id, false)}
                      className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Decline Leave
                    </button>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>You approved this leave request on Sep 09.</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fee Payment Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Semester 6 Tuition & Exam Fees</h4>
                <p className="text-xs text-slate-400">Direct university payment gateway</p>
              </div>
              {!tuitionFeePaid ? (
                <button
                  onClick={() => {
                    setTuitionFeePaid(true);
                    alert('Fee receipt generated and emailed to registered guardian ID.');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Pay Outstanding $850
                </button>
              ) : (
                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                  Receipt #RCP-90214 Paid ✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Direct Advisor Message Channel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Direct Faculty Advisor Channel
              </h3>
              <p className="text-xs text-slate-400">Connect directly with {studentProfile.advisor}</p>
            </div>

            {messageSent && (
              <div className="my-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Message dispatched to Dr. Sarah Jenkins. Average response time: 4 hours.</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-3 mt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Query / Concern:
                </label>
                <textarea
                  rows={4}
                  required
                  value={parentMessage}
                  onChange={e => setParentMessage(e.target.value)}
                  placeholder="Inquire regarding academic performance, exam preparation, or campus well-being..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Advisor</span>
              </button>
            </form>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 space-y-1 mt-4">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Institutional Transparency Pledge</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Parents receive weekly synthesized attendance logs and urgent alerts whenever unexcused absences occur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
