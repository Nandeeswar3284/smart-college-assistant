import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Volume2,
  VolumeX,
  Zap,
  Coffee,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FocusModeModal: React.FC = () => {
  const { isFocusModeOpen, setIsFocusModeOpen, focusTask, studyPlan, toggleStudyTask } = useApp();

  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min default
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Mode switch
      if (mode === 'study') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('study');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  if (!isFocusModeOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalModeDuration = mode === 'study' ? 25 * 60 : 5 * 60;
  const progressPercent = Math.round(((totalModeDuration - timeLeft) / totalModeDuration) * 100);

  const resetTimer = (newMode: 'study' | 'break' = mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'study' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-6 sm:p-10 text-slate-100 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Distraction-Free Focus
            </div>
            <div className="text-sm font-semibold text-slate-200">
              {focusTask ? `${focusTask.subject} — ${focusTask.topic}` : 'Deep Study Session'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title={soundEnabled ? 'Mute ambient white noise' : 'Enable ambient focus tone'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setIsFocusModeOpen(false);
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Focus Clock */}
      <div className="max-w-md w-full mx-auto flex flex-col items-center my-auto text-center">
        {/* Mode Selector */}
        <div className="flex items-center p-1 rounded-full bg-slate-900 border border-slate-800 mb-8">
          <button
            onClick={() => resetTimer('study')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              mode === 'study' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => resetTimer('break')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              mode === 'break' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Break (5m)</span>
          </button>
        </div>

        {/* Circular Display or Big Monospace Counter */}
        <div className="relative mb-8 flex flex-col items-center justify-center">
          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight text-white drop-shadow-sm select-none">
            {formattedTime}
          </div>
          <div className="text-xs uppercase tracking-widest text-slate-400 mt-2 font-mono">
            {mode === 'study' ? 'Deep Work Interval' : 'Restorative Break'}
          </div>

          {/* Progress ring indicator */}
          <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                mode === 'study' ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-slate-950 font-bold transition-all shadow-lg active:scale-95 cursor-pointer ${
              isRunning ? 'bg-slate-200 hover:bg-white' : 'bg-amber-400 hover:bg-amber-300'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => resetTimer()}
            className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom: Study Tasks Checklist */}
      <div className="max-w-2xl w-full mx-auto bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Active Study Tasks for this Session</span>
          <span className="text-[11px] font-mono text-amber-400">
            {studyPlan.tasks.filter(t => t.completed).length}/{studyPlan.tasks.length} Done
          </span>
        </div>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {studyPlan.tasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleStudyTask(task.id)}
              className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-colors text-xs ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through'
                  : 'bg-slate-850 border-slate-800 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className={`w-4 h-4 ${task.completed ? 'text-emerald-400' : 'text-slate-600'}`}
                />
                <span>
                  <strong className="text-white">{task.subject}:</strong> {task.topic}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{task.timeSlot}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
