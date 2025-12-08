"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase/firebase.config';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { AttendanceRecord } from '@/types/user';

export default function AttendanceTable() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const q = query(
          collection(db, 'attendance'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const attendanceData: AttendanceRecord[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          attendanceData.push({
            id: doc.id,
            userId: data.userId,
            email: data.email,
            name: data.name,
            date: data.date?.toDate() || new Date(),
            dateString: data.dateString || new Date(data.date).toLocaleDateString(),
            punchIn: data.punchIn || '-',
            punchInTimestamp: data.punchInTimestamp?.toDate() || new Date(),
            punchOut: data.punchOut || '-',
            punchOutTimestamp: data.punchOutTimestamp?.toDate(),
            lateTime: data.lateTime || '-',
            regularHours: data.regularHours || '-',
            overtimeHours: data.overtimeHours || '-',
            nightDiffHours: data.nightDiffHours || '-',
            underTime: data.underTime || '-',
            status: data.status || 'pending',
            scheduleUsed: data.scheduleUsed || { start: '09:00', end: '18:00' },
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate()
          });
        });
        
        setRecords(attendanceData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAttendance();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No attendance records</p>
        <p className="text-gray-400 text-sm">Start by punching in!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Attendance History</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Time In/Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Regular</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">OT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ND</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Late</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{record.dateString}</div>
                  <div className="text-xs text-gray-500">{record.scheduleUsed.start} - {record.scheduleUsed.end}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span className="font-medium">In:</span>
                      <span className="ml-2">{record.punchIn}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {record.punchOut ? (
                        <>
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />
                          <span className="font-medium">Out:</span>
                          <span className="ml-2">{record.punchOut}</span>
                        </>
                      ) : (
                        <span className="text-yellow-600 text-sm">Not punched out</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    {record.regularHours === '-' ? '-' : `${record.regularHours}h`}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {record.overtimeHours !== '-' && record.overtimeHours !== '0.00' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      {record.overtimeHours}h
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {record.nightDiffHours !== '-' && record.nightDiffHours !== '0.00' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      {record.nightDiffHours}h
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {record.lateTime !== 'On time' && record.lateTime !== '-' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      {record.lateTime}
                    </span>
                  ) : (
                    <span className="text-green-600 text-sm">On time</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'present' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}