import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  BookOpen,
  User,
  MapPin,
  FileText,
  CheckSquare,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAMPUS_ROOMS, CAMPUS_LABS } from '../../mockData';

export const UniversalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    attendance,
    assignments,
    notices,
    setCurrentView,
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search across categories
  const filteredSubjects = attendance.filter(
    s => !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.faculty.toLowerCase().includes(q)
  );

  const filteredAssignments = assignments.filter(
    a => !q || a.title.toLowerCase().includes(q) || a.subjectName.toLowerCase().includes(q) || a.subjectCode.toLowerCase().includes(q)
  );

  const filteredNotices = notices.filter(
    n => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
  );

  const filteredRooms = CAMPUS_ROOMS.filter(
    r => !q || r.roomNumber.toLowerCase().includes(q) || r.building.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
  );

  const filteredLabs = CAMPUS_LABS.filter(
    l => !q || l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q) || l.inCharge.toLowerCase().includes(q)
  );

  const totalResults =
    filteredSubjects.length + filteredAssignments.length + filteredNotices.length + filteredRooms.length + filteredLabs.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search subjects, faculty, rooms, labs, notices, assignments..."
            className="flex-1 text-sm sm:text-base bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching "Algorithms", "AI Lab", "Exam", or "LH-101"</p>
            </div>
          ) : (
            <>
              {/* Subjects & Faculty */}
              {filteredSubjects.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Subjects & Faculty</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredSubjects.slice(0, 4).map(sub => (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setCurrentView('attendance');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                          <span>{sub.code}: {sub.name}</span>
                          <span className="text-[11px] text-indigo-600 dark:text-indigo-400">{sub.percentage}%</span>
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{sub.faculty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Classrooms & Labs */}
              {(filteredRooms.length > 0 || filteredLabs.length > 0) && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Campus Classrooms & Labs</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredRooms.slice(0, 2).map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setCurrentView('campus-map');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                          <span>{r.roomNumber} ({r.type})</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            r.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {r.isAvailable ? 'Available' : 'Occupied'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{r.building}</div>
                      </div>
                    ))}
                    {filteredLabs.slice(0, 2).map(l => (
                      <div
                        key={l.id}
                        onClick={() => {
                          setCurrentView('campus-map');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                          <span>{l.name}</span>
                          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                            {l.availableSystems}/{l.totalSystems} Free
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">In-Charge: {l.inCharge}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {filteredAssignments.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Assignments & Projects</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredAssignments.slice(0, 3).map(asg => (
                      <div
                        key={asg.id}
                        onClick={() => {
                          setCurrentView('assignments');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{asg.title}</div>
                          <div className="text-[11px] text-slate-400">{asg.subjectCode} • Due: {asg.dueDate}</div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {asg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {filteredNotices.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-rose-500" />
                    <span>Notices & Announcements</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredNotices.slice(0, 2).map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentView('notifications');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="pr-3">
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</div>
                          <div className="text-[11px] text-slate-400">{n.author} • {n.date}</div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-rose-100 text-rose-700 shrink-0">
                          {n.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with ⌘K or mouse</span>
          <span className="font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
