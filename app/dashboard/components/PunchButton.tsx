"use client";

import { useState } from 'react';
import { auth, db } from '../../../firebase/firebase.config';
import { 
  addDoc, 
  collection, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  getDoc,
  setDoc 
} from 'firebase/firestore';
import { calculateTimeMetrics, formatTime, formatDecimalHours } from '@/lib/timeCalculations';

interface PunchButtonProps {
  name: string;
  action: string;
}

export default function PunchButton({ name, action }: PunchButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const getUserSchedule = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().schedule;
      }
      return { start: '09:00', end: '18:00' };
    } catch (error) {
      console.error('Error fetching user schedule:', error);
      return { start: '09:00', end: '18:00' };
    }
  };

  const getUserProfile = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const findTodayAttendance = async () => {
    if (!user) return null;
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    try {
      // Use dateString for query to avoid index issues
      const q = query(
        collection(db, 'attendance'),
        where('userId', '==', user.uid),
        where('dateString', '==', todayString)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return {
          id: querySnapshot.docs[0].id,
          data: querySnapshot.docs[0].data()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error finding today attendance:', error);
      return null;
    }
  };

  const updateDailySummary = async (userId: string, date: Date, metrics: any, userData: any) => {
    try {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      
      const summaryId = `${userId}_${dayStart.toISOString().split('T')[0]}`;
      
      const summaryRef = doc(db, 'dailySummaries', summaryId);
      
      await setDoc(summaryRef, {
        id: summaryId,
        userId,
        userEmail: userData.email,
        userName: userData.name,
        date: dayStart,
        dateString: dayStart.toISOString().split('T')[0],
        regularHours: parseFloat(metrics.regularHours.toFixed(2)),
        overtimeHours: parseFloat(metrics.overtimeHours.toFixed(2)),
        nightDiffHours: parseFloat(metrics.nightDifferentialHours.toFixed(2)),
        lateMinutes: metrics.lateMinutes,
        undertimeMinutes: metrics.undertimeMinutes,
        totalHours: parseFloat((metrics.regularHours + metrics.overtimeHours).toFixed(2)),
        lastUpdated: new Date()
      }, { merge: true });
      
    } catch (error) {
      console.error('Error updating daily summary:', error);
    }
  };

  const punchInHandler = async () => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      const existingRecord = await findTodayAttendance();
      if (existingRecord) {
        alert('You have already punched in today!');
        return;
      }
      
      const now = new Date();
      const userProfile = await getUserProfile(user.uid);
      const schedule = await getUserSchedule(user.uid);
      
      const scheduleStart = schedule.start;
      const [startHour, startMinute] = scheduleStart.split(':').map(Number);
      const scheduleStartTime = new Date(now);
      scheduleStartTime.setHours(startHour, startMinute, 0, 0);
      
      let lateTime = 'On time';
      if (now > scheduleStartTime) {
        const lateMs = now.getTime() - scheduleStartTime.getTime();
        const lateMinutes = Math.floor(lateMs / (1000 * 60));
        lateTime = formatTime(lateMinutes);
      }
      
      await addDoc(collection(db, 'attendance'), {
        userId: user.uid,
        email: user.email,
        name: userProfile?.name || user.email?.split('@')[0] || 'User',
        date: now,
        dateString: now.toISOString().split('T')[0],
        punchIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        punchInTimestamp: now,
        lateTime: lateTime,
        scheduleUsed: schedule,
        status: 'present',
        createdAt: new Date()
      });
      
      alert('✓ Punch In recorded!');
      window.location.reload();
      
    } catch (error) {
      console.error('Error punching in:', error);
      alert('Error recording punch in');
    } finally {
      setIsLoading(false);
    }
  };

  const punchOutHandler = async () => {
    if (!user || isLoading) return;
    
    setIsLoading(true);
    try {
      const attendanceRecord = await findTodayAttendance();
      
      if (!attendanceRecord) {
        alert('Please punch in first!');
        return;
      }
      
      if (attendanceRecord.data.punchOut) {
        alert('You have already punched out today!');
        return;
      }
      
      const now = new Date();
      
      let punchInTime: Date;
      if (attendanceRecord.data.punchInTimestamp?.toDate) {
        punchInTime = attendanceRecord.data.punchInTimestamp.toDate();
      } else if (attendanceRecord.data.punchInTimestamp) {
        punchInTime = new Date(attendanceRecord.data.punchInTimestamp);
      } else {
        punchInTime = new Date(attendanceRecord.data.date);
      }
      
      const schedule = attendanceRecord.data.scheduleUsed || { start: '09:00', end: '18:00' };
      
      const metrics = calculateTimeMetrics(punchInTime, now, schedule.start, schedule.end);
      
      const userProfile = await getUserProfile(user.uid);
      
      const docRef = doc(db, 'attendance', attendanceRecord.id);
      await updateDoc(docRef, {
        punchOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        punchOutTimestamp: now,
        regularHours: metrics.regularHours.toFixed(2),
        overtimeHours: metrics.overtimeHours.toFixed(2),
        nightDiffHours: metrics.nightDifferentialHours.toFixed(2),
        lateTime: metrics.isLate ? formatTime(metrics.lateMinutes) : 'On time',
        underTime: metrics.hasUndertime ? formatTime(metrics.undertimeMinutes) : '-',
        updatedAt: new Date()
      });
      
      await updateDailySummary(user.uid, now, metrics, userProfile || { 
        email: user.email, 
        name: user.email?.split('@')[0] 
      });
      
      alert('✓ Punch Out recorded!\n\n' +
            `Regular: ${formatDecimalHours(metrics.regularHours)}\n` +
            `Overtime: ${formatDecimalHours(metrics.overtimeHours)}\n` +
            `Night Diff: ${formatDecimalHours(metrics.nightDifferentialHours)}`);
            
      window.location.reload();
      
    } catch (error) {
      console.error('Error punching out:', error);
      alert('Error recording punch out');
    } finally {
      setIsLoading(false);
    }
  };

  const punchHandler = action === "out" ? punchOutHandler : punchInHandler;

  return (
    <div className="flex justify-center items-center">
      <button 
        onClick={punchHandler}
        disabled={isLoading || !user}
        className={`
          ${action === "in" 
            ? 'bg-green-500 hover:bg-green-600 border-green-600' 
            : 'bg-blue-500 hover:bg-blue-600 border-blue-600'
          } 
          text-white font-bold py-4 px-8 rounded-lg 
          transition-all duration-200 border-b-4
          ${(isLoading || !user) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          text-lg shadow-lg w-48
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className={`h-3 w-3 rounded-full mr-3 ${action === "in" ? 'bg-green-300' : 'bg-blue-300'}`}></div>
            {name}
          </div>
        )}
      </button>
    </div>
  );
}