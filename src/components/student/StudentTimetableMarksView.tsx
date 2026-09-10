import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Award,
  Download,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TODAY_TIMETABLE } from '../../mockData';

export const StudentTimetableMarksView: React.FC<{ initialTab?: 'timetable' | 'marks' }> = ({ initialTab = 'timetable' }) => {
  const { internalMarks } = useApp();
  const [activeTab, setActiveTab] = useState<'timetable' | 'marks'>(initialTab);
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Thursday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

  const weeklySchedule: Record<string, typeof TODAY_TIMETABLE> = {
    Monday: [
      { id: 'm1', day: 'Monday', type: 'Lecture', subjectCode: 'CS301', subjectName: 'DBMS Lecture', startTime: '08:45 AM', endTime: '09:45 AM', roomNumber: 'LH-201', facultyName: 'Dr. Sarah Jenkins' },
      { id: 'm2', day: 'Monday', type: 'Lecture', subjectCode: 'CS302', subjectName: 'OS Architecture', startTime: '09:45 AM', endTime: '10:45 AM', roomNumber: 'LH-201', facultyName: 'Prof. David Chen' },
      { id: 'm3', day: 'Monday', type: 'Lecture', subjectCode: 'CS305', subjectName: 'Cloud Systems', startTime: '11:00 AM', endTime: '12:00 PM', roomNumber: 'Tech-304', facultyName: 'Dr. Michael Chang' },
    ],
    Tuesday: [
      { id: 't1', day: 'Tuesday', type: 'Lab', subjectCode: 'CS304', subjectName: 'Machine Learning Lab', startTime: '08:45 AM', endTime: '11:45 AM', roomNumber: 'AI Lab 3', facultyName: 'Dr. Anita Desai' },
      { id: 't2', day: 'Tuesday', type: 'Tutorial', subjectCode: 'CS303', subjectName: 'Algorithms Tutorial', startTime: '01:30 PM', endTime: '02:30 PM', roomNumber: 'LH-201', facultyName: 'Prof. Vikram Malhotra' },
    ],
    Wednesday: [
      { id: 'w1', day: 'Wednesday', type: 'Lab', subjectCode: 'CS302', subjectName: 'Operating Systems Lab', startTime: '09:45 AM', endTime: '12:45 PM', roomNumber: 'Systems Lab 1', facultyName: 'Prof. David Chen' },
      { id: 'w2', day: 'Wednesday', type: 'Lecture', subjectCode: 'CS301', subjectName: 'DBMS SQL Workshop', startTime: '02:00 PM', endTime: '03:30 PM', roomNumber: 'LH-201', facultyName: 'Dr. Sarah Jenkins' },
    ],
    Thursday: TODAY_TIMETABLE,
    Friday: [
      { id: 'f1', day: 'Friday', type: 'Lecture', subjectCode: 'CS304', subjectName: 'AI Seminar & Colloquium', startTime: '09:00 AM', endTime: '10:30 AM', roomNumber: 'Auditorium B', facultyName: 'Dr. Anita Desai' },
      { id: 'f2', day: 'Friday', type: 'Lab', subjectCode: 'CS303', subjectName: 'Algorithms Lab Examination', startTime: '11:00 AM', endTime: '01:00 PM', roomNumber: 'Comp Lab 2', facultyName: 'Prof. Vikram Malhotra' },
      { id: 'f3', day: 'Friday', type: 'Tutorial', subjectCode: 'LIB', subjectName: 'Library & Mentorship Hour', startTime: '02:00 PM', endTime: '03:30 PM', roomNumber: 'Central Library', facultyName: 'Dr. Sarah Jenkins' },
    ],
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Academic Curriculum</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Schedule & Evaluation Records
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Semester 6 schedule, classroom allocations, and internal test scorecards.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'timetable'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Weekly Timetable
          </button>
          <button
            onClick={() => setActiveTab('marks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'marks'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Internal Scorecard
          </button>
        </div>
      </div>

      {activeTab === 'timetable' && (
        <div className="space-y-5">
          {/* Day Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {day}
                {day === 'Thursday' && (
                  <span className="ml-1.5 text-[9px] bg-white/20 px-1 py-0.2 rounded font-mono">Today</span>
                )}
              </button>
            ))}
          </div>

          {/* Slots List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(weeklySchedule[selectedDay] || []).map(slot => (
              <div
                key={slot.id}
                className={`p-5 rounded-3xl border transition-all ${
                  slot.isCurrent
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {slot.subjectCode}
                  </span>
                  {slot.isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-600 text-white">
                      Live Now
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {slot.subjectName}
                </h3>

                <div className="space-y-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{slot.startTime} - {slot.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{slot.roomNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Instructor: {slot.facultyName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Continuous Assessment Breakdown (CIE)
              </h3>
              <p className="text-xs text-slate-400">Semester 6 Internal Marks distribution across all enrolled courses</p>
            </div>
            <button
              onClick={() => alert('Transcript and CIE scorecard downloaded as authenticated PDF.')}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Transcript</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Subject Code</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3">Assessment 1 (20)</th>
                  <th className="py-2.5 px-3">Assessment 2 (20)</th>
                  <th className="py-2.5 px-3">Assignment (10)</th>
                  <th className="py-2.5 px-3">Total (50)</th>
                  <th className="py-2.5 px-3">Projected Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {internalMarks.map(im => (
                  <tr key={im.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{im.subjectCode}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{im.subjectName}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assessment1}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assessment2}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">{im.assignmentMarks}</td>
                    <td className="py-3 px-3 font-mono font-black text-slate-900 dark:text-white">{im.total}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
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
