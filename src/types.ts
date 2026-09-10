export type UserRole = 'student' | 'faculty' | 'parent' | 'admin';

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  department: string;
  year: string;
  semester: number;
  rollNumber: string;
  section: string;
  bloodGroup: string;
  advisor: string;
  parentName: string;
  parentPhone: string;
}

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  faculty: string;
  attended: number;
  total: number;
  percentage: number;
  minimumRequired: number;
  status: 'safe' | 'warning' | 'critical';
}

export interface InternalMark {
  id: string;
  subjectCode: string;
  subjectName: string;
  assessment1: number; // out of 20
  assessment2: number; // out of 20
  assignmentMarks: number; // out of 10
  total: number; // out of 50
  maxTotal: number;
  classAverage: number;
  grade: string;
}

export interface SemesterResult {
  semester: number;
  gpa: number;
  creditsEarned: number;
  totalCredits: number;
  status: 'Passed' | 'Distinction' | 'Pending';
  subjects: {
    code: string;
    name: string;
    grade: string;
    gradePoint: number;
    credits: number;
  }[];
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  isCurrent?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Submitted' | 'Due Soon' | 'Overdue' | 'Upcoming';
  submittedAt?: string;
  marksAwarded?: string;
  description: string;
  attachmentName?: string;
}

export interface CollegeNotice {
  id: string;
  title: string;
  category: 'Exam' | 'Academic' | 'Department' | 'Event' | 'Administrative' | 'Examination' | 'Placement' | 'Events' | 'Fee & Finance';
  priority: 'Critical' | 'Important' | 'General' | 'High' | 'Normal';
  date: string;
  author: string;
  department?: string;
  content: string;
  read: boolean;
  summaryBullets?: string[];
  aiSummary?: {
    what: string;
    when: string;
    where: string;
    who: string;
    action: string;
  };
}

export type NoticeItem = CollegeNotice;

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  leaveType: 'Medical' | 'On Duty (OD)' | 'Personal' | 'Academic Event' | 'OD (On-Duty)' | 'Emergency';
  startDate: string;
  endDate: string;
  fromDate?: string;
  toDate?: string;
  totalDays: number;
  reason: string;
  attachmentName?: string;
  documentName?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  remarks?: string;
  facultyReviewer?: string;
  parentApproval?: 'Pending' | 'Approved' | 'Declined';
  advisorApproval?: 'Pending' | 'Approved' | 'Declined';
  hodApproval?: 'Pending' | 'Approved' | 'Declined';
}

export type LeaveApplication = LeaveRequest;


export interface StudyTask {
  id: string;
  timeSlot: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  generatedDate: string;
  targetExam: string;
  examCountdownDays: number;
  availableHours: number;
  tasks: StudyTask[];
}

export interface CampusBuilding {
  id: string;
  name: string;
  code: string;
  description: string;
  floors: number;
  facilities: string[];
  coordinates: { x: number; y: number }; // Percentage for visual floor plan
}

export interface CampusRoom {
  id: string;
  roomNumber: string;
  building: string;
  floor: number;
  type: 'Classroom' | 'Lab' | 'Seminar Hall' | 'Faculty Room' | 'Admin';
  capacity: number;
  isAvailable: boolean;
  currentActivity?: string;
  nextAvailableTime: string;
}

export interface CampusLab {
  id: string;
  name: string;
  code: string;
  building: string;
  floor: number;
  totalSystems: number;
  availableSystems: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  inCharge: string;
  nextSlot: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progressPercentage: number;
  category: 'Attendance' | 'Assignments' | 'Study' | 'Exams';
}

export interface ParentFeeInfo {
  totalFee: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  receiptNumber: string;
  paymentHistory: {
    id: string;
    term: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Pending';
    method: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  contextData?: Record<string, unknown>;
}
