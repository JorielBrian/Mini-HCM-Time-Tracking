"use client";

import WelcomeBanner from './components/WelcomeBanner';
import PunchAttendance from './components/PunchAttendance';
import AttendanceTable from './components/AttendanceTable';
import { auth } from '../../firebase/firebase.config';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <WelcomeBanner />
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <PunchAttendance />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Attendance</h2>
        <AttendanceTable />
      </div>
    </div>
  );
}