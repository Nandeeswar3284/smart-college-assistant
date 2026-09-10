import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  SubjectAttendance,
  InternalMark,
  Assignment,
  CollegeNotice,
  LeaveRequest,
  StudyPlan,
  ParentFeeInfo,
  AchievementBadge,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_ATTENDANCE,
  INITIAL_INTERNAL_MARKS,
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTICES,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_STUDY_PLAN,
  PARENT_FEE_DATA,
  FACULTY_CLASS_STUDENTS,
  ACHIEVEMENT_BADGES,
} from '../mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  
  // Data models
  studentProfile: StudentProfile;
  attendance: SubjectAttendance[];
  updateAttendance: (subjectId: string, attendedDelta: number, totalDelta: number) => void;
  internalMarks: InternalMark[];
  updateInternalMark: (markId: string, updated: Partial<InternalMark>) => void;
  assignments: Assignment[];
  toggleAssignmentStatus: (assignmentId: string) => void;
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  notices: CollegeNotice[];
  markNoticeAsRead: (noticeId: string) => void;
  addNotice: (notice: Omit<CollegeNotice, 'id'>) => void;
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate' | 'studentId' | 'studentName' | 'rollNumber'>) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected', remarks?: string) => void;
  studyPlan: StudyPlan;
  toggleStudyTask: (taskId: string) => void;
  updateStudyPlan: (plan: StudyPlan) => void;
  badges: AchievementBadge[];
  
  // Modals & Assistant
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isDigitalIdOpen: boolean;
  setIsDigitalIdOpen: (open: boolean) => void;
  isFocusModeOpen: boolean;
  setIsFocusModeOpen: (open: boolean) => void;
  focusTask: { subject: string; topic: string } | null;
  setFocusTask: (task: { subject: string; topic: string } | null) => void;
  
  // Aliases for compatibility
  leaveApplications: LeaveRequest[];
  submitLeaveApplication: (request: any) => void;
  approveParentLeave: (id: string, approved: boolean) => void;
  studentList: { id: string; name: string; rollNumber: string; attendancePercentage: number; riskStatus: string; presentToday: boolean }[];
  toggleStudentAttendance: (studentId: string) => void;

  // Theme & Faculty State
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  facultyStudents: typeof FACULTY_CLASS_STUDENTS;
  toggleFacultyStudentAttendance: (studentId: string) => void;
  parentFee: ParentFeeInfo;
  recordFeePayment: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Logged in by default for immediate preview; users can also logout to see landing page
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  const [studentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [attendance, setAttendance] = useState<SubjectAttendance[]>(INITIAL_ATTENDANCE);
  const [internalMarks, setInternalMarks] = useState<InternalMark[]>(INITIAL_INTERNAL_MARKS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [notices, setNotices] = useState<CollegeNotice[]>(INITIAL_NOTICES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [studyPlan, setStudyPlan] = useState<StudyPlan>(INITIAL_STUDY_PLAN);
  const [badges] = useState<AchievementBadge[]>(ACHIEVEMENT_BADGES);
  
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDigitalIdOpen, setIsDigitalIdOpen] = useState<boolean>(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState<boolean>(false);
  const [focusTask, setFocusTask] = useState<{ subject: string; topic: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  const [facultyStudents, setFacultyStudents] = useState(FACULTY_CLASS_STUDENTS);
  const [parentFee, setParentFee] = useState<ParentFeeInfo>(PARENT_FEE_DATA);

  // Sync dark mode class with root html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const updateAttendance = (subjectId: string, attendedDelta: number, totalDelta: number) => {
    setAttendance(prev =>
      prev.map(item => {
        if (item.id === subjectId) {
          const newAttended = Math.max(0, item.attended + attendedDelta);
          const newTotal = Math.max(newAttended, item.total + totalDelta);
          const newPercentage = newTotal > 0 ? Number(((newAttended / newTotal) * 100).toFixed(1)) : 0;
          let status: 'safe' | 'warning' | 'critical' = 'safe';
          if (newPercentage < 65) status = 'critical';
          else if (newPercentage < item.minimumRequired) status = 'warning';
          return {
            ...item,
            attended: newAttended,
            total: newTotal,
            percentage: newPercentage,
            status,
          };
        }
        return item;
      })
    );
  };

  const updateInternalMark = (markId: string, updated: Partial<InternalMark>) => {
    setInternalMarks(prev =>
      prev.map(item => {
        if (item.id === markId) {
          const merged = { ...item, ...updated };
          merged.total = merged.assessment1 + merged.assessment2 + merged.assignmentMarks;
          if (merged.total >= 45) merged.grade = 'O (Outstanding)';
          else if (merged.total >= 40) merged.grade = 'A+';
          else if (merged.total >= 35) merged.grade = 'A';
          else if (merged.total >= 30) merged.grade = 'B+';
          else merged.grade = 'B';
          return merged;
        }
        return item;
      })
    );
  };

  const toggleAssignmentStatus = (assignmentId: string) => {
    setAssignments(prev =>
      prev.map(asg => {
        if (asg.id === assignmentId) {
          const nextStatus = asg.status === 'Submitted' ? 'Upcoming' : 'Submitted';
          return {
            ...asg,
            status: nextStatus,
            submittedAt: nextStatus === 'Submitted' ? 'Just now' : undefined,
          };
        }
        return asg;
      })
    );
  };

  const addAssignment = (newAsg: Omit<Assignment, 'id'>) => {
    const created: Assignment = {
      ...newAsg,
      id: `asg_${Date.now()}`,
    };
    setAssignments(prev => [created, ...prev]);
  };

  const markNoticeAsRead = (noticeId: string) => {
    setNotices(prev =>
      prev.map(n => (n.id === noticeId ? { ...n, read: true } : n))
    );
  };

  const addNotice = (newNotice: Omit<CollegeNotice, 'id'>) => {
    const created: CollegeNotice = {
      ...newNotice,
      id: `not_${Date.now()}`,
    };
    setNotices(prev => [created, ...prev]);
  };

  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate' | 'studentId' | 'studentName' | 'rollNumber'>) => {
    const newReq: LeaveRequest = {
      ...request,
      id: `lr_${Date.now()}`,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      rollNumber: studentProfile.rollNumber,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      facultyReviewer: studentProfile.advisor,
    };
    setLeaveRequests(prev => [newReq, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected', remarks?: string) => {
    setLeaveRequests(prev =>
      prev.map(item => (item.id === id ? { ...item, status, remarks: remarks || item.remarks } : item))
    );
  };

  const toggleStudyTask = (taskId: string) => {
    setStudyPlan(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
    }));
  };

  const updateStudyPlan = (newPlan: StudyPlan) => {
    setStudyPlan(newPlan);
  };

  const toggleFacultyStudentAttendance = (studentId: string) => {
    setFacultyStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const nextAtt = s.attendance >= 75 ? s.attendance - 2 : s.attendance + 4;
          return {
            ...s,
            attendance: nextAtt,
            status: nextAtt < 65 ? 'critical' : nextAtt < 75 ? 'warning' : 'safe',
          };
        }
        return s;
      })
    );
  };

  const recordFeePayment = (amount: number) => {
    setParentFee(prev => {
      const newPaid = Math.min(prev.totalFee, prev.paidAmount + amount);
      const newRemaining = Math.max(0, prev.totalFee - newPaid);
      return {
        ...prev,
        paidAmount: newPaid,
        remainingAmount: newRemaining,
        paymentHistory: [
          {
            id: `pay_${Date.now()}`,
            term: 'Installment Settlement via Portal',
            amount,
            date: 'Today',
            status: 'Paid',
            method: 'Instant Payment Gateway',
          },
          ...prev.paymentHistory,
        ],
      };
    });
  };

  // State for faculty student list
  const [facultyClassList, setFacultyClassList] = useState([
    { id: 'std_1', name: 'Alex Rivera', rollNumber: 'CS2024-089', attendancePercentage: 84.4, riskStatus: 'Normal', presentToday: true },
    { id: 'std_2', name: 'Maya Lin', rollNumber: 'CS2024-091', attendancePercentage: 96.0, riskStatus: 'Normal', presentToday: true },
    { id: 'std_3', name: 'Jordan Hayes', rollNumber: 'CS2024-090', attendancePercentage: 68.5, riskStatus: 'At Risk', presentToday: false },
    { id: 'std_4', name: 'Carlos Mendez', rollNumber: 'CS2024-092', attendancePercentage: 64.0, riskStatus: 'At Risk', presentToday: false },
    { id: 'std_5', name: 'Priya Sharma', rollNumber: 'CS2024-093', attendancePercentage: 92.0, riskStatus: 'Normal', presentToday: true },
    { id: 'std_6', name: 'Liam O’Connor', rollNumber: 'CS2024-094', attendancePercentage: 74.2, riskStatus: 'At Risk', presentToday: true },
  ]);

  const toggleStudentAttendance = (studentId: string) => {
    setFacultyClassList(prev =>
      prev.map(s => (s.id === studentId ? { ...s, presentToday: !s.presentToday } : s))
    );
  };

  const submitLeaveApplication = (request: any) => {
    const newReq: LeaveRequest = {
      id: `lr_${Date.now()}`,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      rollNumber: studentProfile.rollNumber,
      leaveType: request.leaveType,
      startDate: request.fromDate || request.startDate || '2026-09-14',
      endDate: request.toDate || request.endDate || '2026-09-15',
      fromDate: request.fromDate || '2026-09-14',
      toDate: request.toDate || '2026-09-15',
      totalDays: request.totalDays || 1,
      reason: request.reason,
      attachmentName: request.attachmentName,
      status: 'Pending',
      appliedDate: 'Sep 10, 2026',
      parentApproval: 'Pending',
      advisorApproval: 'Pending',
      hodApproval: 'Pending',
    };
    setLeaveRequests(prev => [newReq, ...prev]);
  };

  const approveParentLeave = (id: string, approved: boolean) => {
    setLeaveRequests(prev =>
      prev.map(lr =>
        lr.id === id
          ? {
              ...lr,
              parentApproval: approved ? 'Approved' : 'Declined',
              status: approved ? 'Approved' : 'Rejected',
            }
          : lr
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isLoggedIn,
        setIsLoggedIn,
        currentView,
        setCurrentView,
        studentProfile,
        attendance,
        updateAttendance,
        internalMarks,
        updateInternalMark,
        assignments,
        toggleAssignmentStatus,
        addAssignment,
        notices,
        markNoticeAsRead,
        addNotice,
        leaveRequests,
        addLeaveRequest,
        updateLeaveStatus,
        studyPlan,
        toggleStudyTask,
        updateStudyPlan,
        badges,
        isCopilotOpen,
        setIsCopilotOpen,
        isSearchOpen,
        setIsSearchOpen,
        isDigitalIdOpen,
        setIsDigitalIdOpen,
        isFocusModeOpen,
        setIsFocusModeOpen,
        focusTask,
        setFocusTask,
        isDarkMode,
        toggleDarkMode,
        facultyStudents,
        toggleFacultyStudentAttendance,
        parentFee,
        recordFeePayment,
        leaveApplications: leaveRequests,
        submitLeaveApplication,
        approveParentLeave,
        studentList: facultyClassList,
        toggleStudentAttendance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
