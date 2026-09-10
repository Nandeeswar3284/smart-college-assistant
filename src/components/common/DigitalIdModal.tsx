import React, { useState } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  RotateCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigitalIdModal: React.FC = () => {
  const { isDigitalIdOpen, setIsDigitalIdOpen, studentProfile } = useApp();
  const [isVerified, setIsVerified] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [verifying, setVerifying] = useState(false);

  if (!isDigitalIdOpen) return null;

  const handleSimulateScan = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setIsVerified(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Official Digital Student Credential
            </h3>
          </div>
          <button
            onClick={() => {
              setIsDigitalIdOpen(false);
              setIsVerified(false);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Physical ID Card Mockup */}
        <div className="p-6 flex flex-col items-center">
          <div
            className={`w-full aspect-[1.58/1] rounded-2xl p-5 text-white shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${
              isFlipped
                ? 'bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900'
                : 'bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-800'
            }`}
          >
            {/* Holographic watermark decorative overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)] pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

            {!isFlipped ? (
              // Front of Card
              <>
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white text-indigo-700 font-black flex items-center justify-center text-xs shadow-xs">
                      SC
                    </div>
                    <div>
                      <div className="font-bold text-xs tracking-wider uppercase">Apex Institute of Tech</div>
                      <div className="text-[9px] text-indigo-200">Smart Campus Digital ID</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-semibold">
                    VALID: 2024 - 2027
                  </span>
                </div>

                <div className="flex items-center gap-4 my-auto z-10">
                  <img
                    src={studentProfile.avatar}
                    alt={studentProfile.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white/80 shadow-md"
                  />
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-base sm:text-lg tracking-tight">{studentProfile.name}</div>
                    <div className="text-xs text-indigo-100 font-medium">{studentProfile.department}</div>
                    <div className="text-[11px] text-indigo-200 font-mono">
                      ID: <span className="font-bold text-white">{studentProfile.rollNumber}</span> • Sem {studentProfile.semester}
                    </div>
                    <div className="text-[10px] text-indigo-200">Sec: {studentProfile.section} | Blood: {studentProfile.bloodGroup}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] text-indigo-100 z-10">
                  <span>RFID: 08849-A190</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Cryptographically Signed</span>
                  </div>
                </div>
              </>
            ) : (
              // Back of Card with QR & Verification
              <div className="flex flex-col items-center justify-center text-center my-auto z-10 space-y-3">
                <div className="bg-white p-3 rounded-xl shadow-inner inline-block">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <div>
                  <div className="text-xs font-bold font-mono">TOKEN: SC-AUTH-2026-X89</div>
                  <div className="text-[10px] text-slate-300">Scan at campus library, turnstiles, and exam halls</div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons below card */}
          <div className="flex items-center gap-3 mt-5 w-full">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Show Front' : 'Show QR Code'}</span>
            </button>

            <button
              id="btn-simulate-verify"
              onClick={handleSimulateScan}
              disabled={verifying}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{verifying ? 'Scanning...' : 'Test Turnstile Scan'}</span>
            </button>
          </div>

          {/* Verification Status Banner */}
          {isVerified && (
            <div className="mt-4 w-full p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-200 text-xs animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold">Credential Verified & Gate Unlocked</div>
                <div className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
                  Student status: Active • Library clearance: Approved
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Advisor: {studentProfile.advisor}</span>
          <button
            onClick={() => alert('Digital ID Card wallet pass exported successfully!')}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            <Download className="w-3 h-3" />
            <span>Save to Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
