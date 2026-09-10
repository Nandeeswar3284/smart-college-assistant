import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  Target,
  Info,
  CheckCircle2,
  Sliders,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const CgpaPredictorView: React.FC = () => {
  const { internalMarks } = useApp();

  const previousCgpa = 8.42;
  const previousCompletedCredits = 114;
  const [targetCgpa, setTargetCgpa] = useState<number>(8.8);

  // 5 courses in current semester with credit weights
  const [courses, setCourses] = useState([
    { code: 'CS301', name: 'Database Management Systems', credits: 4, expectedGradePoint: 9 }, // Grade A+
    { code: 'CS302', name: 'Operating Systems & Networks', credits: 4, expectedGradePoint: 8 }, // Grade A
    { code: 'CS303', name: 'Design & Analysis of Algorithms', credits: 4, expectedGradePoint: 8 }, // Grade A
    { code: 'CS304', name: 'Machine Learning & AI Systems', credits: 4, expectedGradePoint: 10 }, // Grade O
    { code: 'CS305', name: 'Cloud & Full-Stack Web Eng.', credits: 3, expectedGradePoint: 9 }, // Grade A+
  ]);

  const updateCourseGrade = (index: number, gp: number) => {
    setCourses(prev => {
      const next = [...prev];
      next[index].expectedGradePoint = gp;
      return next;
    });
  };

  // Calculations
  const currentSemCredits = courses.reduce((sum, c) => sum + c.credits, 0); // 19 credits
  const currentSemTotalPoints = courses.reduce((sum, c) => sum + (c.credits * c.expectedGradePoint), 0);
  const predictedSemGpa = Number((currentSemTotalPoints / currentSemCredits).toFixed(2));

  // Overall predicted CGPA
  // ((previousCgpa * previousCredits) + (predictedSemGpa * currentSemCredits)) / (previousCredits + currentSemCredits)
  const totalCreditsAll = previousCompletedCredits + currentSemCredits;
  const totalPointsAll = (previousCgpa * previousCompletedCredits) + (predictedSemGpa * currentSemCredits);
  const predictedOverallCgpa = Number((totalPointsAll / totalCreditsAll).toFixed(2));

  // Required semester GPA to achieve target CGPA:
  // (previousCgpa * previousCredits + reqSemGpa * currentSemCredits) / totalCreditsAll = targetCgpa
  // reqSemGpa = (targetCgpa * totalCreditsAll - previousCgpa * previousCredits) / currentSemCredits
  const requiredSemGpa = Number(
    (((targetCgpa * totalCreditsAll) - (previousCgpa * previousCompletedCredits)) / currentSemCredits).toFixed(2)
  );

  const meetsTarget = predictedOverallCgpa >= targetCgpa;

  // Chart data showing Current → Predicted → Target progression
  const trajectoryData = [
    { stage: 'Semester 4', gpa: 8.35, label: 'Historical' },
    { stage: 'Semester 5', gpa: 8.52, label: 'Historical' },
    { stage: 'Current CGPA', gpa: previousCgpa, label: 'Current Base' },
    { stage: 'Predicted Sem 6', gpa: predictedSemGpa, label: 'Simulated' },
    { stage: 'Projected CGPA', gpa: predictedOverallCgpa, label: 'Result' },
    { stage: 'Target Goal', gpa: targetCgpa, label: 'Goal' },
  ];

  const gradeLabels: Record<number, string> = {
    10: 'O (90-100%)',
    9: 'A+ (80-89%)',
    8: 'A (70-79%)',
    7: 'B+ (60-69%)',
    6: 'B (50-59%)',
    5: 'C (40-49%)',
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI CGPA Projection Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Academic Performance & CGPA Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Simulate expected end-semester grades across subject credit weights to forecast graduation honors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-900 text-xs">
            <span className="text-slate-400">Current CGPA:</span>{' '}
            <strong className="text-violet-700 dark:text-violet-300 font-bold text-sm">{previousCgpa}</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Expected Grade Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Semester 6 Subject Credits</h3>
              <p className="text-xs text-slate-400">Adjust expected final grade for each course</p>
            </div>
            <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
              {currentSemCredits} Credits Total
            </span>
          </div>

          <div className="space-y-3.5">
            {courses.map((course, idx) => (
              <div
                key={course.code}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{course.code}: </span>
                    <span className="text-slate-600 dark:text-slate-300">{course.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {course.credits} Credits
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <input
                    type="range"
                    min={5}
                    max={10}
                    step={1}
                    value={course.expectedGradePoint}
                    onChange={e => updateCourseGrade(idx, Number(e.target.value))}
                    className="flex-1 accent-violet-600 cursor-pointer"
                  />
                  <div className="w-24 text-right">
                    <span className="text-xs font-bold text-violet-700 dark:text-violet-300 font-mono px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60">
                      {gradeLabels[course.expectedGradePoint] || `${course.expectedGradePoint} GP`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Target CGPA Setting */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-500" />
                <span>Your Target Cumulative CGPA:</span>
              </span>
              <span className="font-mono text-base font-black text-rose-600 dark:text-rose-400">
                {targetCgpa.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={8.0}
              max={9.5}
              step={0.05}
              value={targetCgpa}
              onChange={e => setTargetCgpa(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Predicted Results & Interactive Trajectory Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Forecast Summary & Target Analysis
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50">
                <div className="text-[11px] font-semibold text-violet-800 dark:text-violet-300 uppercase">
                  Predicted Sem 6 GPA
                </div>
                <div className="text-3xl font-black text-violet-600 dark:text-violet-400 font-mono mt-1">
                  {predictedSemGpa}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Based on credit-weighted marks</div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  meetsTarget
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                }`}
              >
                <div
                  className={`text-[11px] font-semibold uppercase ${
                    meetsTarget ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'
                  }`}
                >
                  Projected Cumulative CGPA
                </div>
                <div
                  className={`text-3xl font-black font-mono mt-1 ${
                    meetsTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {predictedOverallCgpa}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Target: {targetCgpa.toFixed(2)} ({meetsTarget ? 'Goal Achieved! 🎯' : `Need +${(targetCgpa - predictedOverallCgpa).toFixed(2)}`})
                </div>
              </div>
            </div>

            {/* Interactive Trajectory Chart */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center justify-between">
                <span>CGPA Progression (Current → Predicted → Target)</span>
                <span className="text-[11px] text-violet-500 font-medium">Trajectory Curve</span>
              </div>
              <div className="h-44 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trajectoryData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="cgpaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="stage" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis domain={[7.5, 10]} stroke="#94a3b8" fontSize={10} />
                    <Tooltip
                      formatter={(val: number) => [`${val} GPA`, 'Metric']}
                      contentStyle={{
                        borderRadius: '12px',
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: '11px',
                      }}
                    />
                    <Area type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#cgpaGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Actionable Strategy Advice */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>AI Target Roadmap Analysis</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To hit your target of <strong className="text-violet-600 dark:text-violet-400">{targetCgpa}</strong>, 
              you need a Semester 6 GPA of at least{' '}
              <strong className="text-slate-900 dark:text-white font-mono">{requiredSemGpa > 10 ? '10.0 (Maxed)' : requiredSemGpa}</strong>.
              {requiredSemGpa > 10 ? (
                <span className="text-rose-500 font-medium block mt-1">
                  Note: A target above 10.0 required GPA is mathematically out of reach in a single semester. Consider setting 8.65 as an intermediate stepping stone.
                </span>
              ) : (
                <span className="block mt-1">
                  Focus high study effort on the 4-credit courses (<strong>CS301, CS303, CS304</strong>) where securing an 'O' or 'A+' provides maximum mathematical leverage.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
