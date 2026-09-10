import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  Zap,
  RefreshCw,
  Plus,
  Sliders,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyTask } from '../../types';

export const StudyPlannerView: React.FC = () => {
  const {
    studyPlan,
    toggleStudyTask,
    updateStudyPlan,
    setIsFocusModeOpen,
    setFocusTask,
  } = useApp();

  // Generator inputs
  const [availableHours, setAvailableHours] = useState<number>(studyPlan.availableHours || 4);
  const [weakSubject, setWeakSubject] = useState<string>('CS303 (Algorithms)');
  const [strongSubject, setStrongSubject] = useState<string>('CS304 (Machine Learning)');
  const [targetExam, setTargetExam] = useState<string>('Mid-Semester Examinations (Sep 22)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const completedCount = studyPlan.tasks.filter(t => t.completed).length;
  const totalCount = studyPlan.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedTasks: StudyTask[] = [
        {
          id: `st_${Date.now()}_1`,
          timeSlot: '08:00 AM - 09:15 AM',
          subject: weakSubject.split(' ')[0],
          topic: 'High-Priority Drill: Dynamic Programming & Amortized Complexity',
          durationMinutes: 75,
          priority: 'High',
          completed: false,
        },
        {
          id: `st_${Date.now()}_2`,
          timeSlot: '11:30 AM - 12:30 PM',
          subject: 'CS301 (DBMS)',
          topic: 'ACID Transactions & Query Execution Profiling for Assignment',
          durationMinutes: 60,
          priority: 'High',
          completed: false,
        },
        {
          id: `st_${Date.now()}_3`,
          timeSlot: '05:00 PM - 06:00 PM',
          subject: 'CS302 (OS)',
          topic: 'Process Synchronization, Semaphores & Deadlock Detection',
          durationMinutes: 60,
          priority: 'Medium',
          completed: false,
        },
        {
          id: `st_${Date.now()}_4`,
          timeSlot: '07:00 PM - 07:45 PM',
          subject: strongSubject.split(' ')[0],
          topic: 'Rapid Review: Neural Network Backprop Math',
          durationMinutes: 45,
          priority: 'Low',
          completed: false,
        },
        {
          id: `st_${Date.now()}_5`,
          timeSlot: '08:30 PM - 09:00 PM',
          subject: 'Daily Synthesis',
          topic: 'Flashcard revision & past year exam problem review',
          durationMinutes: 30,
          priority: 'Medium',
          completed: false,
        },
      ];

      updateStudyPlan({
        id: `sp_${Date.now()}`,
        generatedDate: 'Generated Just Now',
        targetExam,
        examCountdownDays: 12,
        availableHours,
        tasks: generatedTasks,
      });

      setIsGenerating(false);
    }, 600);
  };

  const handleStartFocus = (task: StudyTask) => {
    setFocusTask({ subject: task.subject, topic: task.topic });
    setIsFocusModeOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            <BrainCircuit className="w-4 h-4 animate-pulse" />
            <span>Personalized AI Study Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Smart AI Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Generates high-yield study blocks calibrated around exam dates, weak topics, and assignment deadlines.
          </p>
        </div>

        {/* Countdown Badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs">
            <span className="text-slate-400">Next Major Exam:</span>{' '}
            <strong className="text-emerald-700 dark:text-emerald-300 font-black text-sm">12 Days</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Generator Parameters (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Study Plan Parameters</h3>
            <p className="text-xs text-slate-400">Configure parameters to customize AI schedule</p>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Examination / Milestone:
              </label>
              <input
                type="text"
                value={targetExam}
                onChange={e => setTargetExam(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Available Study Hours Today:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{availableHours} hrs</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={availableHours}
                onChange={e => setAvailableHours(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject Needing Most Attention (Weak Area):
              </label>
              <select
                value={weakSubject}
                onChange={e => setWeakSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="CS303 (Algorithms)">CS303: Design & Analysis of Algorithms (Attendance 71%, Test 13/20)</option>
                <option value="CS301 (DBMS)">CS301: Database Management Systems (Assignment due)</option>
                <option value="CS302 (OS)">CS302: Operating Systems & Networks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Strong Subject (Fast Revision Only):
              </label>
              <select
                value={strongSubject}
                onChange={e => setStrongSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="CS304 (Machine Learning)">CS304: Machine Learning & AI Systems (Test 20/20)</option>
                <option value="CS305 (Cloud Computing)">CS305: Cloud & Full-Stack Web Eng.</option>
              </select>
            </div>

            <button
              id="btn-generate-study-plan"
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Optimal Schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate New AI Study Plan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Today's AI Plan Schedule & Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Today's AI Schedule & Tasks
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {studyPlan.generatedDate} • Goal: {studyPlan.targetExam}
                </div>
              </div>

              {/* Progress metric */}
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {completedCount} / {totalCount} Done ({progressPercent}%)
                </span>
                <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Task Item Cards */}
            <div className="space-y-2.5">
              {studyPlan.tasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800 opacity-70'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700/80 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleStudyTask(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {task.subject}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                            task.priority === 'High'
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                              : task.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {task.topic}
                      </p>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{task.timeSlot}</span>
                        <span>•</span>
                        <span>{task.durationMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  {!task.completed && (
                    <button
                      onClick={() => handleStartFocus(task)}
                      className="self-end sm:self-center shrink-0 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Focus 25m</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Motivation Callout */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <span>🔥 7-Day Study Streak Active! Completing today's plan awards +50 XP.</span>
            <span className="font-bold">Day 7/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
