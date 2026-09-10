import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  CalendarCheck,
  TrendingDown,
  TrendingUp,
  Info,
  RefreshCw,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, Cell } from 'recharts';

export const AttendancePredictorView: React.FC = () => {
  const { attendance, updateAttendance } = useApp();

  // Selected subject or overall mode
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(attendance[2].id); // Defaults to CS303 which is at 71%
  const currentSubject = attendance.find(s => s.id === selectedSubjectId) || attendance[0];

  // Interactive simulation state
  const [conducted, setConducted] = useState<number>(currentSubject.total);
  const [attended, setAttended] = useState<number>(currentSubject.attended);
  const [upcomingClasses, setUpcomingClasses] = useState<number>(12);
  const [classesToMiss, setClassesToMiss] = useState<number>(2);
  const [classesToAttend, setClassesToAttend] = useState<number>(10);

  // Sync when subject switches
  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
    const sub = attendance.find(s => s.id === id);
    if (sub) {
      setConducted(sub.total);
      setAttended(sub.attended);
      setUpcomingClasses(12);
      setClassesToMiss(2);
      setClassesToAttend(10);
    }
  };

  // Calculations
  const currentPercentage = conducted > 0 ? Number(((attended / conducted) * 100).toFixed(1)) : 0;
  
  // Future projection: total conducted becomes (conducted + upcomingClasses)
  // Classes attended in future = attended + (upcomingClasses - classesToMiss)
  const actualClassesAttendedInFuture = Math.max(0, attended + (upcomingClasses - classesToMiss));
  const newTotalConducted = conducted + upcomingClasses;
  const predictedPercentage = newTotalConducted > 0
    ? Number(((actualClassesAttendedInFuture / newTotalConducted) * 100).toFixed(1))
    : 0;

  const threshold = currentSubject.minimumRequired || 75;
  const isSafe = predictedPercentage >= threshold;
  const percentageDelta = Number((predictedPercentage - currentPercentage).toFixed(1));

  // Recovery calculator:
  // How many consecutive classes needed from now to reach threshold T (e.g. 75%)?
  // (attended + R) / (conducted + R) >= T / 100
  // 100 * attended + 100 * R >= T * conducted + T * R
  // R * (100 - T) >= T * conducted - 100 * attended
  // R = ceil( (T * conducted - 100 * attended) / (100 - T) )
  let recoveryClassesNeeded = 0;
  if (predictedPercentage < threshold) {
    const numerator = (threshold * newTotalConducted) - (100 * actualClassesAttendedInFuture);
    const denominator = 100 - threshold;
    recoveryClassesNeeded = Math.max(0, Math.ceil(numerator / denominator));
  } else if (currentPercentage < threshold) {
    const numerator = (threshold * conducted) - (100 * attended);
    const denominator = 100 - threshold;
    recoveryClassesNeeded = Math.max(0, Math.ceil(numerator / denominator));
  }

  // Chart data
  const chartData = [
    { name: 'Current', value: currentPercentage, fill: '#6366f1' },
    {
      name: 'Simulated',
      value: predictedPercentage,
      fill: predictedPercentage >= threshold ? '#10b981' : '#f43f5e',
    },
    { name: 'Safe Threshold', value: threshold, fill: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Predictive Modeling</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            “What If I Miss Class?” Attendance Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Test hypothetical scenarios before taking leaves and discover precise recovery paths.
          </p>
        </div>

        {/* Subject dropdown filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Select Subject:</span>
          <select
            value={selectedSubjectId}
            onChange={e => handleSubjectChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            {attendance.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.code}: {sub.name} ({sub.percentage}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Simulation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Simulation Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {currentSubject.code}: {currentSubject.name}
              </div>
              <div className="text-xs text-slate-400">Faculty: {currentSubject.faculty}</div>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                currentPercentage >= threshold
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
              }`}
            >
              Current: {currentPercentage}%
            </span>
          </div>

          {/* Sliders & Inputs */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Total Classes Conducted So Far:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{conducted} classes</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                value={conducted}
                onChange={e => {
                  const val = Number(e.target.value);
                  setConducted(val);
                  if (attended > val) setAttended(val);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Classes You Attended:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{attended} classes</span>
              </div>
              <input
                type="range"
                min={0}
                max={conducted}
                value={attended}
                onChange={e => setAttended(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Number of Upcoming Classes in Term:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{upcomingClasses} classes</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={upcomingClasses}
                onChange={e => {
                  const val = Number(e.target.value);
                  setUpcomingClasses(val);
                  if (classesToMiss > val) setClassesToMiss(val);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
              <div className="flex justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200 mb-1.5">
                <span>“What If I Miss...” (Classes Skipped):</span>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-black text-sm">
                  {classesToMiss} Classes
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={upcomingClasses}
                value={classesToMiss}
                onChange={e => setClassesToMiss(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 (Attend all)</span>
                <span>{upcomingClasses} (Miss all upcoming)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Minimum required attendance for semester examination clearance is {threshold}%.</span>
          </div>
        </div>

        {/* Right Output: Simulation Results & Visual Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Predicted Outcome Analysis
            </div>

            {/* Main Result Banner */}
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                isSafe
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {isSafe ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  )}
                  <span
                    className={`font-bold text-sm ${
                      isSafe ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    {isSafe ? 'Safe Zone Maintained' : '⚠ Attendance May Fall Below Safe Zone'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  If you miss <strong>{classesToMiss}</strong> of the next {upcomingClasses} classes, your attendance will become{' '}
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">{predictedPercentage}%</strong>{' '}
                  ({percentageDelta >= 0 ? `+${percentageDelta}%` : `${percentageDelta}%`}).
                </p>
              </div>

              <div className="text-right sm:border-l sm:pl-4 border-slate-200 dark:border-slate-700 shrink-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">Predicted</div>
                <div
                  className={`text-3xl font-black font-mono ${
                    isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {predictedPercentage}%
                </div>
              </div>
            </div>

            {/* Visual Recharts Bar Graph */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center justify-between">
                <span>Comparison Graph (Current vs Simulated vs 75% Rule)</span>
                <span className="text-[11px] text-slate-400">Target Line: 75%</span>
              </div>
              <div className="h-48 w-full bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                    <Tooltip
                      formatter={(val: number) => [`${val}%`, 'Attendance']}
                      contentStyle={{
                        borderRadius: '12px',
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        color: '#f8fafc',
                        fontSize: '12px',
                      }}
                    />
                    <ReferenceLine y={threshold} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: '75% Required', fill: '#f59e0b', fontSize: 10 }} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Positive Recovery Recommendation Callout */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-indigo-950 dark:text-indigo-100">
                AI Recovery Recommendation
              </div>
              {recoveryClassesNeeded > 0 ? (
                <p className="leading-relaxed text-indigo-800 dark:text-indigo-300">
                  You can restore your standing to safe zone by attending the next{' '}
                  <strong className="text-indigo-950 dark:text-white underline font-mono text-sm">
                    {recoveryClassesNeeded} consecutive classes
                  </strong>{' '}
                  without missing any.
                </p>
              ) : (
                <p className="leading-relaxed text-indigo-800 dark:text-indigo-300">
                  You have a comfortable attendance buffer! Even with {classesToMiss} missed classes, your attendance remains safely above the 75% requirement.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
