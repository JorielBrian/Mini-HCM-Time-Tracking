"use client";

import WelcomeBanner from './components/WelcomeBanner';
// import StatsGrid from './components/StatsGrid';
// import RevenueChart from './components/RevenueChart';
// import ProjectsSection from './components/ProjectsSection';
// import RecentActivityTable from './components/RecentActivityTable';
// import QuickActionsGrid from './components/QuickActionsGrid';
import PunchAttendance from './components/PunchAttendance';
import AttendanceTable from './components/AttendanceTable';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <WelcomeBanner />
      
      <PunchAttendance />
      
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ProjectsSection />
      </div> */}

      <AttendanceTable />
      
      {/* <QuickActionsGrid /> */}
    </div>
  );
}