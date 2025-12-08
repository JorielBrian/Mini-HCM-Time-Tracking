"use client";

import WelcomeBanner from './components/WelcomeBanner';
import PunchAttendance from './components/PunchAttendance';
import AttendanceTable from './components/AttendanceTable';
import { auth } from '../../firebase/firebase.config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const user = auth.currentUser;
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Function to trigger attendance data refresh
  const handleAttendanceUpdate = () => {
    setRefreshCounter(prev => prev + 1);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <WelcomeBanner />
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <PunchAttendance onAttendanceUpdate={handleAttendanceUpdate} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Attendance</h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <AttendanceTable refreshTrigger={refreshCounter} />
      </div>
    </div>
  );
}