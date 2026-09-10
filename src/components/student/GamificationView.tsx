import React, { useState } from 'react';
import {
  Award,
  Flame,
  Zap,
  Star,
  Trophy,
  CheckCircle2,
  Gift,
  Sparkles,
  TrendingUp,
  Shield,
  Medal,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACHIEVEMENTS, LEADERBOARD } from '../../mockData';

export const GamificationView: React.FC = () => {
  const { studentProfile } = useApp();
  const [claimedPerks, setClaimedPerks] = useState<string[]>([]);

  const perks = [
    {
      id: 'p1',
      title: 'Library 48-Hr Extended Reserve Pass',
      cost: 500,
      description: 'Keep competitive reference textbooks for 48 additional hours without late fines.',
      icon: '📚',
    },
    {
      id: 'p2',
      title: 'Campus Food Court Brew Coffee Voucher',
      cost: 750,
      description: 'Enjoy a free espresso or cappuccino at Central Student Cafeteria.',
      icon: '☕',
    },
    {
      id: 'p3',
      title: 'Priority Seating: AI Tech Fest Hackathon',
      cost: 1200,
      description: 'Guaranteed front-row work table with dedicated gigabit LAN port.',
      icon: '⚡',
    },
    {
      id: 'p4',
      title: 'Campus Innovation Lab VIP 24h Pass',
      cost: 2000,
      description: 'Access 3D printers and high-performance GPU workstations overnight.',
      icon: '🚀',
    },
  ];

  const handleClaimPerk = (id: string, cost: number) => {
    if (studentProfile.xpPoints >= cost) {
      setClaimedPerks([...claimedPerks, id]);
      alert('Perk successfully unlocked! Show the generated QR code at the service desk.');
    } else {
      alert('Insufficient XP! Complete more study sessions and submit assignments early to earn XP.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span>Academic Recognition & Gamification</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Student Achievements & Campus Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Earn XP for punctual attendance, early assignment submissions, and consistent study streaks.
          </p>
        </div>

        {/* Level & XP Capsule */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black font-mono shadow-sm">
              L{studentProfile.level}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Level {studentProfile.level} Scholar
              </div>
              <div className="text-sm font-black font-mono text-amber-600 dark:text-amber-400">
                {studentProfile.xpPoints} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Row: Streak & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-linear-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-100">
              <Flame className="w-4 h-4 text-white fill-current animate-bounce" />
              <span>Punctuality Streak</span>
            </div>
            <div className="text-3xl font-black font-mono">15 Days</div>
            <p className="text-xs text-amber-100">Zero missed lectures across 2 full weeks!</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            🔥
          </div>
        </div>

        <div className="bg-linear-to-br from-indigo-600 to-violet-700 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-200">
              <Star className="w-4 h-4 text-amber-300 fill-current" />
              <span>Assignments On Time</span>
            </div>
            <div className="text-3xl font-black font-mono">100% Rate</div>
            <p className="text-xs text-indigo-100">3 deliverables submitted ahead of clock</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            ⚡
          </div>
        </div>

        <div className="bg-linear-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <Trophy className="w-4 h-4 text-amber-300 fill-current" />
              <span>Department Standing</span>
            </div>
            <div className="text-3xl font-black font-mono">Rank #3</div>
            <p className="text-xs text-emerald-100">Top 5% of 3rd Year CSE cohort</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
            🏆
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Earned Badges & Medals (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Honorary Badges</h3>
              <p className="text-xs text-slate-400">Unlock credentials by demonstrating scholastic discipline</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ACHIEVEMENTS.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                  badge.unlocked
                    ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700'
                    : 'bg-slate-50/40 dark:bg-slate-900/30 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="text-3xl shrink-0">{badge.icon}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {badge.title}
                    </h4>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {badge.description}
                  </p>
                  <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                    {badge.unlocked ? `Awarded: ${badge.unlockedDate}` : 'Locked milestone'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cohort Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Department Leaderboard</h3>
              <p className="text-xs text-slate-400">Calculated on Attendance + CGPA + Punctuality</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              Week 4
            </span>
          </div>

          <div className="space-y-2.5">
            {LEADERBOARD.map(entry => {
              const isCurrentUser = entry.name === studentProfile.name;
              return (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    isCurrentUser
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : entry.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {entry.rank}
                    </div>

                    <div>
                      <div className="text-slate-800 dark:text-slate-200">
                        {entry.name} {isCurrentUser && <span className="text-indigo-600">(You)</span>}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {entry.rollNumber} • {entry.badge}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="font-bold text-slate-800 dark:text-slate-100">{entry.points} pts</div>
                    <div className="text-[10px] text-emerald-600">{entry.attendance}% Att.</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Redeemable Campus Perks Shop */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Redeemable Campus Perks & Privileges
              </h3>
              <p className="text-xs text-slate-400">Spend earned academic XP on tangible university rewards</p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Available Balance: <strong className="text-amber-500 font-mono font-bold text-sm">{studentProfile.xpPoints} XP</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map(perk => {
            const isClaimed = claimedPerks.includes(perk.id);
            const canAfford = studentProfile.xpPoints >= perk.cost;

            return (
              <div
                key={perk.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-2xl mb-2">{perk.icon}</div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{perk.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {perk.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">
                    {perk.cost} XP
                  </span>

                  <button
                    onClick={() => handleClaimPerk(perk.id, perk.cost)}
                    disabled={isClaimed}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isClaimed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : canAfford
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isClaimed ? 'Unlocked ✓' : 'Redeem'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
