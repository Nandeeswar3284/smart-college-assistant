import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Send,
  Upload,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Building,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeaveApplication } from '../../types';

export const LeaveApplicationView: React.FC = () => {
  const { leaveApplications, submitLeaveApplication } = useApp();

  // Form State
  const [leaveType, setLeaveType] = useState<LeaveApplication['leaveType']>('OD (On-Duty)');
  const [fromDate, setFromDate] = useState('2026-09-14');
  const [toDate, setToDate] = useState('2026-09-15');
  const [totalDays, setTotalDays] = useState(2);
  const [reason, setReason] = useState('');
  const [attachmentName, setAttachmentName] = useState<string>('hackathon_invitation_ticket.pdf');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeaveApplication({
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
      attachmentName: attachmentName || undefined,
    });

    setReason('');
    setIsSuccessMessage(true);
    setTimeout(() => setIsSuccessMessage(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <FileText className="w-4 h-4" />
            <span>Official Requests Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Leave & On-Duty (OD) Application System
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Submit duty leaves, medical exemptions, and personal leaves with live multi-tier approval tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-xs">
            <span className="text-slate-400">Leaves Left This Term:</span>{' '}
            <strong className="text-indigo-700 dark:text-indigo-300 font-bold">4 Days OD / 6 Medical</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Apply for Leave Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Submit New Application</h3>
            <p className="text-xs text-slate-400">Routes directly to Faculty Advisor & Department HOD</p>
          </div>

          {isSuccessMessage && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Leave request submitted! Mentor notification dispatched.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Leave Category:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['OD (On-Duty)', 'Medical Leave', 'Personal Leave'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLeaveType(type)}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-medium border transition-all ${
                      leaveType === type
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {type.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  From Date:
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  To Date:
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Reason / Event Description:
              </label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="e.g. Representing college at National Smart Campus Hackathon at MIT campus..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 resize-none focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Supporting Certificate / Document:
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <Upload className="w-4 h-4 text-indigo-500 shrink-0" />
                <input
                  type="text"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  placeholder="Document file name..."
                  className="flex-1 text-xs bg-transparent border-none text-slate-700 dark:text-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Leave Request</span>
            </button>
          </form>
        </div>

        {/* Right: Live Approval Status Tracker (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Submitted Applications & Workflow Progress
            </h3>
            <span className="text-xs text-slate-400">
              {leaveApplications.length} Total Requests
            </span>
          </div>

          <div className="space-y-3">
            {leaveApplications.map(app => {
              // Stepper stages
              // Submitted -> Mentor Review -> HOD Approval -> Approved
              const isApproved = app.status === 'Approved';
              const isRejected = app.status === 'Rejected';
              const isUnderReview = app.status === 'Under Review' || app.status === 'Pending';

              return (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {app.leaveType}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {app.fromDate} to {app.toDate} ({app.totalDays} Days)
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : app.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {app.reason}
                  </p>

                  {/* 4-Step Approval Workflow Indicator */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                      Live Approval Pipeline:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {/* Step 1: Submission */}
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        <Check className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-600" />
                        <div className="font-bold text-[10px]">1. Submitted</div>
                      </div>

                      {/* Step 2: Parent/Guardian Confirmation */}
                      <div
                        className={`p-2 rounded-xl border ${
                          app.parentApproval === 'Approved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 mx-auto mb-1" />
                        <div className="font-bold text-[10px]">2. Parent: {app.parentApproval}</div>
                      </div>

                      {/* Step 3: Mentor / Advisor */}
                      <div
                        className={`p-2 rounded-xl border ${
                          app.mentorApproval === 'Approved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mx-auto mb-1" />
                        <div className="font-bold text-[10px]">3. Mentor: {app.mentorApproval}</div>
                      </div>

                      {/* Step 4: Department HOD */}
                      <div
                        className={`p-2 rounded-xl border ${
                          app.hodApproval === 'Approved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <Building className="w-3.5 h-3.5 mx-auto mb-1" />
                        <div className="font-bold text-[10px]">4. HOD: {app.hodApproval}</div>
                      </div>
                    </div>
                  </div>

                  {app.attachmentName && (
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Attached: <strong>{app.attachmentName}</strong></span>
                      {app.status === 'Approved' && (
                        <button
                          onClick={() => alert(`Official OD Gate Pass downloaded for Request #${app.id}`)}
                          className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          Download Gate Pass Slip
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
