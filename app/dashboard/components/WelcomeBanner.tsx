"use client";

import { Clock, Calendar, User } from 'lucide-react';
import { auth, db } from '../../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function WelcomeBanner() {
  const [userData, setUserData] = useState<any>(null);
  const [todaySummary, setTodaySummary] = useState<any>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const summaryId = `${user.uid}_${todayString}`;
        const summaryDoc = await getDoc(doc(db, 'dailySummaries', summaryId));
        
        if (summaryDoc.exists()) {
          setTodaySummary(summaryDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 text-white mr-2" />
              <h2 className="text-2xl font-bold text-white">
                {getGreeting()}, {userData?.name || user?.email?.split('@')[0] || 'User'}!
              </h2>
            </div>
            
            {userData?.schedule && (
              <div className="flex items-center mt-2 text-blue-100">
                <Clock className="h-4 w-4 mr-2" />
                <span>Today's schedule: {userData.schedule.start} - {userData.schedule.end}</span>
              </div>
            )}
            
            {todaySummary && (
              <div className="mt-4 grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-sm opacity-90">Regular Hours</div>
                  <div className="text-xl font-bold">{todaySummary.regularHours || '0.00'}</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-sm opacity-90">Overtime</div>
                  <div className="text-xl font-bold">{todaySummary.overtimeHours || '0.00'}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}