import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CampusAICopilot } from './components/common/CampusAICopilot';
import { UniversalSearchModal } from './components/common/UniversalSearchModal';
import { DigitalIdModal } from './components/common/DigitalIdModal';
import { FocusModeModal } from './components/student/FocusModeModal';
import { LandingPage } from './components/common/LandingPage';

// Student views
import { StudentDashboard } from './components/student/StudentDashboard';
import { AttendancePredictorView } from './components/student/AttendancePredictorView';
import { CgpaPredictorView } from './components/student/CgpaPredictorView';
import { StudyPlannerView } from './components/student/StudyPlannerView';
import { AssignmentTrackerView } from './components/student/AssignmentTrackerView';
import { CampusMapView } from './components/student/CampusMapView';
import { LeaveApplicationView } from './components/student/LeaveApplicationView';
import { GamificationView } from './components/student/GamificationView';
import { NoticeCenterView } from './components/student/NoticeCenterView';
import { StudentTimetableMarksView } from './components/student/StudentTimetableMarksView';

// Role dashboards
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const { isLoggedIn, userRole, currentView, isDarkMode } = useApp();

  // Handle dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // If not logged in, render public Landing Page
  if (!isLoggedIn) {
    return <LandingPage />;
  }

  // Render role-specific & navigation-specific views
  const renderMainContent = () => {
    // 1. Role overrides for non-student roles
    if (userRole === 'faculty') {
      return <FacultyDashboard />;
    }
    if (userRole === 'parent') {
      return <ParentDashboard />;
    }
    if (userRole === 'admin') {
      return <AdminDashboard />;
    }

    // 2. Student Role Views
    switch (currentView) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'attendance-predictor':
        return <AttendancePredictorView />;
      case 'cgpa-predictor':
        return <CgpaPredictorView />;
      case 'study-planner':
        return <StudyPlannerView />;
      case 'assignments':
        return <AssignmentTrackerView />;
      case 'map':
        return <CampusMapView />;
      case 'leave':
        return <LeaveApplicationView />;
      case 'gamification':
        return <GamificationView />;
      case 'notifications':
        return <NoticeCenterView />;
      case 'timetable':
        return <StudentTimetableMarksView initialTab="timetable" />;
      case 'marks':
        return <StudentTimetableMarksView initialTab="marks" />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main App Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>

      {/* Global Modals & Floating Tools */}
      <CampusAICopilot />
      <UniversalSearchModal />
      <DigitalIdModal />
      <FocusModeModal />
    </div>
  );
}
