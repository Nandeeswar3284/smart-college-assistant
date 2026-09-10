import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  FileText,
  Calendar,
  AlertCircle,
  Tag,
  CheckCircle2,
  Bookmark,
  Download,
  Filter,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NoticeItem } from '../../types';

export const NoticeCenterView: React.FC = () => {
  const { notices, markNoticeAsRead } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoticeId, setActiveNoticeId] = useState<string>(notices[0].id);

  const filteredNotices = notices.filter(n => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeNotice = notices.find(n => n.id === activeNoticeId) || notices[0];

  const handleSelectNotice = (id: string) => {
    setActiveNoticeId(id);
    markNoticeAsRead(id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>AI Bulletin Synthesizer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Official Notices & AI Digest Summaries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Transforms bureaucratic 10-page circulars into instantaneous actionable bullets, deadlines, and requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Unread Notices:</span>
          <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono font-bold text-xs">
            {notices.filter(n => !n.isRead).length}
          </span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Examination', 'Placement', 'Academic', 'Fee & Finance', 'Events'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search circulars..."
            className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Main Split-Screen Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Notices Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredNotices.map(notice => {
            const isSelected = notice.id === activeNoticeId;
            return (
              <div
                key={notice.id}
                onClick={() => handleSelectNotice(notice.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : notice.isRead
                    ? 'bg-white/70 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                    : 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900 font-medium'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        notice.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : notice.priority === 'High'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {notice.priority}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{notice.category}</span>
                  </div>

                  <span className="text-[11px] text-slate-400">{notice.date}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {notice.content}
                </p>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                  <span>{notice.department}</span>
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    AI Summary Available
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: AI Notice Detail & Digest View (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            {/* Notice Metadata Header */}
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Ref #{activeNotice.id.toUpperCase()} • {activeNotice.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">Issued: {activeNotice.date}</span>
              </div>

              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {activeNotice.title}
              </h2>
              <div className="text-xs text-slate-500">
                Authorized By: <strong className="text-slate-700 dark:text-slate-300">{activeNotice.department}</strong>
              </div>
            </div>

            {/* AI Summarizer Digest Box */}
            <div className="my-5 p-4 rounded-2xl bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>AI Notice Synthesizer (Instant 3-Point Digest)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  Gemini Flash 2.5
                </span>
              </div>

              {/* 3 Key Takeaways */}
              <div className="space-y-2 pt-1">
                {activeNotice.summaryBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-indigo-100">
                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Required Actions Callout */}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-indigo-200">
                  Action Deadline: <strong className="text-amber-300 font-bold">{activeNotice.date}</strong>
                </div>
                <div className="text-slate-300">
                  Target Audience: <strong className="text-white">All Active Students</strong>
                </div>
              </div>
            </div>

            {/* Full Original Circular Content */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Circular Text
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 whitespace-pre-line">
                {activeNotice.content}
              </p>
            </div>
          </div>

          {/* Attachments & Download */}
          {activeNotice.attachmentName && (
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeNotice.attachmentName}
                </span>
              </div>
              <button
                onClick={() => alert(`Downloading verified circular document: ${activeNotice.attachmentName}`)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
