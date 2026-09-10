import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Clock,
  ArrowRight,
  Lightbulb,
  Maximize2,
  Minimize2,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';

export const CampusAICopilot: React.FC = () => {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    studentProfile,
    attendance,
    assignments,
    internalMarks,
    setCurrentView,
  } = useApp();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${studentProfile.name}! 👋 I'm **CampusAI**, your real-time digital academic companion. I monitor your live attendance, assignments, and test scores to keep you ahead. How can I help you excel today?`,
      timestamp: 'Just now',
      suggestions: [
        'How is my attendance?',
        'What should I study today?',
        'What assignments are due?',
        'How can I improve my CGPA?',
        'Show my upcoming exams',
        'Find an empty classroom',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isCopilotOpen) {
      scrollToBottom();
    }
  }, [messages, isCopilotOpen]);

  // Context-aware AI responder using real student data
  const generateContextualResponse = (query: string): { reply: string; suggestions?: string[]; navigateTo?: string } => {
    const q = query.toLowerCase();

    // Attendance query
    if (q.includes('attendance') || q.includes('miss class') || q.includes('safe zone')) {
      const warningSubjects = attendance.filter(s => s.status === 'warning' || s.status === 'critical');
      const lowest = [...attendance].sort((a, b) => a.percentage - b.percentage)[0];
      const overallAvg = (attendance.reduce((sum, s) => sum + s.percentage, 0) / attendance.length).toFixed(1);

      let text = `📊 **Attendance Health Check:**\nYour average attendance is **${overallAvg}%** across 5 courses.\n\n`;
      if (warningSubjects.length > 0) {
        text += `⚠️ **Attention Needed:** Your attendance in **${lowest.name} (${lowest.code})** is currently **${lowest.percentage}%** (Minimum required: ${lowest.minimumRequired}%).\n`;
        text += `💡 **Recovery Recommendation:** Attend the next **3 consecutive classes** in ${lowest.code} to safely surpass the 75% threshold!`;
      } else {
        text += `✅ All your subjects are safely above the 75% college threshold. Great job!`;
      }

      return {
        reply: text,
        suggestions: ['Simulate "What If I Miss Class"', 'Open Attendance Predictor', 'View Timetable'],
        navigateTo: 'attendance-predictor',
      };
    }

    // Study plan or What should I study
    if (q.includes('study') || q.includes('prepare') || q.includes('plan')) {
      return {
        reply: `🧠 **Personalized AI Study Recommendation for Today:**\n\n1. **High Priority (05:00 PM - 06:00 PM):** Focus on **Algorithms (CS303)**. You have internal test questions on Dynamic Programming and your attendance needs attention.\n2. **Medium Priority (06:15 PM - 07:15 PM):** Review **Database Management Systems (CS301)** B-Tree indexing for tomorrow's assignment deadline.\n3. **Quick Drill (08:00 PM):** 30 minutes on **Machine Learning** backpropagation formulas.\n\nWould you like to open the interactive Study Planner or launch Focus Mode?`,
        suggestions: ['Open Smart Study Planner', 'Start 25-Min Focus Mode', 'What assignments are due?'],
        navigateTo: 'study-planner',
      };
    }

    // Assignments
    if (q.includes('assignment') || q.includes('due') || q.includes('homework') || q.includes('deadline')) {
      const pending = assignments.filter(a => a.status !== 'Submitted');
      const dueSoon = assignments.find(a => a.status === 'Due Soon');
      const overdue = assignments.find(a => a.status === 'Overdue');

      let reply = `📝 **Your Assignment Status:** You have **${pending.length} pending assignments**.\n\n`;
      if (dueSoon) {
        reply += `🚨 **Due Soon:** **${dueSoon.title}** (${dueSoon.subjectCode}) is due **${dueSoon.dueDate}**.\n`;
      }
      if (overdue) {
        reply += `⚠️ **Overdue Alert:** **${overdue.title}** (${overdue.subjectCode}) was due yesterday. Faculty: ${overdue.facultyName}.\n`;
      }
      reply += `\nTip: You can submit your files or mark them completed directly in the Assignment Tracker!`;

      return {
        reply,
        suggestions: ['Open Assignment Tracker', 'Smart Deadline Predictor', 'Enter Focus Mode'],
        navigateTo: 'assignments',
      };
    }

    // CGPA or Marks
    if (q.includes('cgpa') || q.includes('grade') || q.includes('mark') || q.includes('gpa')) {
      const target = 8.8;
      const currentCgpa = 8.42;
      return {
        reply: `📈 **Academic Performance & CGPA Trajectory:**\n\n• **Current Cumulative CGPA:** **${currentCgpa}**\n• **Target CGPA:** **${target}**\n• **Current Internal Average:** 84.4%\n\n🎯 **How to achieve ${target} this semester:**\nScore an average of **18.5/20** in Assessment 2 across CS301, CS303, and CS305, plus submit remaining assignments on time. Scoring an 'O' or 'A+' in the 4-credit Algorithms exam will add +0.14 to your semester GPA!`,
        suggestions: ['Open CGPA Predictor', 'View Internal Marks', 'Generate Study Plan'],
        navigateTo: 'cgpa-predictor',
      };
    }

    // Exams
    if (q.includes('exam') || q.includes('mid') || q.includes('hall ticket') || q.includes('schedule')) {
      return {
        reply: `🗓️ **Upcoming Examination Alert:**\n\n• **Mid-Semester Examinations** begin on **September 22, 2026** (12 days remaining).\n• **Hall Tickets:** Downloadable from the portal starting **September 15**.\n• **Important Check:** Maintain ≥ 75% attendance in all courses to ensure unconditional exam clearance.`,
        suggestions: ['View Exam Notices', 'Check Attendance Status', 'Open Study Planner'],
        navigateTo: 'notifications',
      };
    }

    // Classroom or Labs
    if (q.includes('classroom') || q.includes('empty') || q.includes('room') || q.includes('lab') || q.includes('library')) {
      return {
        reply: `📍 **Empty Classrooms & Labs Right Now:**\n\n• **LH-101 (Tech Block A, Floor 1):** Empty & available until 02:00 PM (Capacity 65)\n• **LH-202 (Tech Block A, Floor 2):** Empty all day\n• **AI Lab 3 (Computing Complex):** 14/45 workstations open for walk-ins\n• **Study Pod 04 (Central Library):** Silent reservation available\n\nWould you like to open the interactive Campus Map?`,
        suggestions: ['Open Campus Map & Labs', 'Find Empty Classroom', 'View Today\'s Timetable'],
        navigateTo: 'campus-map',
      };
    }

    // Default tutoring / academic answer
    return {
      reply: `🤖 **CampusAI Response:**\nI analyzed your query regarding "${query}".\n\nAs your smart college assistant, I'm tuned to your semester curriculum (${studentProfile.department}, Semester ${studentProfile.semester}). I can break down core CS algorithms, assist with database query optimization, calculate your grade impact, or help you locate available study spaces across campus!`,
      suggestions: ['How is my attendance?', 'What should I study today?', 'Find an empty classroom', 'Open Study Planner'],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateContextualResponse(text);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: 'Just now',
        suggestions: response.suggestions,
        contextData: response.navigateTo ? { navigateTo: response.navigateTo } : undefined,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Bottom-Right Trigger Button */}
      {!isCopilotOpen && (
        <button
          id="btn-floating-copilot"
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-linear-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-xl shadow-indigo-500/35 hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-indigo-600 animate-pulse" />
          </div>
          <span className="tracking-wide">AI Campus Copilot</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
            ⌘J
          </span>
        </button>
      )}

      {/* Copilot Drawer / Modal */}
      {isCopilotOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-4 md:inset-10 lg:inset-20'
              : 'bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh]'
          } bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-2">
                  CampusAI Copilot
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-200 font-bold border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <div className="text-[11px] text-indigo-100 font-medium">
                  Contextual Assistant for {studentProfile.name}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Bar */}
          <div className="px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200 font-medium">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Synced with Student ID: {studentProfile.rollNumber}</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Sem {studentProfile.semester}</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Contextual navigation link */}
                  {msg.contextData?.navigateTo && (
                    <button
                      onClick={() => {
                        setCurrentView(msg.contextData!.navigateTo as string);
                        setIsCopilotOpen(false);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 transition-colors"
                    >
                      <span>Jump to {String(msg.contextData.navigateTo).replace('-', ' ')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {/* Quick suggestion pills */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:text-indigo-700 text-[11px] font-medium transition-colors border border-slate-200/60 dark:border-slate-600"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-1.5 text-right font-mono ${
                      msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none p-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-200/70 dark:border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
            {[
              'How is my attendance?',
              'What should I study today?',
              'What assignments are due?',
              'How can I improve my CGPA?',
              'Find an empty classroom',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 transition-colors shrink-0 border border-slate-200/50 dark:border-slate-700/50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask CampusAI anything (grades, classes, study help)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 border border-slate-200 dark:border-slate-700"
            />
            <button
              id="btn-copilot-send"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
