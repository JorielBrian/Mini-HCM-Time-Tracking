"use client";

import { useEffect, useState, useCallback } from 'react';
import { auth, db } from '../../../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  dateString: string;
  punchIn: string;
  punchOut: string;
  regularHours: string;
  overtimeHours: string;
  nightDiffHours: string;
  lateTime: string;
  status: string;
  scheduleStart: string;
  scheduleEnd: string;
}

interface AttendanceTableProps {
  refreshTrigger?: number; // Add this prop
}

export default function AttendanceTable({ refreshTrigger = 0 }: AttendanceTableProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = auth.currentUser;

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchAttendance = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setRefreshing(true);
      
      console.log('Fetching attendance for user:', user.uid);
      
      const q = query(
        collection(db, 'attendance'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Query result:', querySnapshot.size, 'documents');
      
      const attendanceData: AttendanceRecord[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Handle Firestore timestamp conversion
        let dateString = '-';
        if (data.dateString) {
          dateString = data.dateString;
        } else if (data.date) {
          // Check if date is a Firestore timestamp
          if (data.date.toDate) {
            dateString = data.date.toDate().toLocaleDateString();
          } else if (data.date.seconds) {
            dateString = new Date(data.date.seconds * 1000).toLocaleDateString();
          } else {
            dateString = new Date(data.date).toLocaleDateString();
          }
        }
        
        attendanceData.push({
          id: doc.id,
          dateString: dateString,
          punchIn: data.punchIn || '-',
          punchOut: data.punchOut || '-',
          regularHours: data.regularHours || '0.00',
          overtimeHours: data.overtimeHours || '0.00',
          nightDiffHours: data.nightDiffHours || '0.00',
          lateTime: data.lateTime || 'On time',
          status: data.status || 'pending',
          scheduleStart: data.scheduleUsed?.start || '09:00',
          scheduleEnd: data.scheduleUsed?.end || '18:00'
        });
      });
      
      // Sort manually by date in descending order (newest first)
      attendanceData.sort((a, b) => {
        try {
          const dateA = new Date(a.dateString);
          const dateB = new Date(b.dateString);
          return dateB.getTime() - dateA.getTime(); // Descending
        } catch (error) {
          return 0;
        }
      });
      
      console.log('Processed attendance data:', attendanceData);
      setRecords(attendanceData);
      
    } catch (error: any) {
      console.error('Error fetching attendance:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // Fetch when refreshTrigger changes (when punch in/out happens)
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchAttendance();
    }
  }, [refreshTrigger, fetchAttendance]);

  // Manual refresh function
  const handleRefresh = () => {
    fetchAttendance();
  };

  if (loading && !refreshing) {
    return (
      <div className="flex flex-col justify-center items-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading attendance records...</p>
        <p className="text-sm text-gray-400">User: {user?.email || 'Not logged in'}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Not logged in</p>
        <p className="text-gray-400 text-sm">Please log in to view attendance</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No attendance records found</p>
        <p className="text-gray-400 text-sm mb-4">Start by punching in today!</p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Attendance History</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {records.length} record{records.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md disabled:opacity-50 transition"
              title="Refresh attendance data"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time In/Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Regular
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                OT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ND
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Late
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr 
                key={record.id || index} 
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{record.dateString}</div>
                  <div className="text-xs text-gray-500">
                    Schedule: {record.scheduleStart} - {record.scheduleEnd}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      <span className="font-medium text-gray-700">In:</span>
                      <span className="ml-2 text-gray-900">{record.punchIn}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      {record.punchOut && record.punchOut !== '-' ? (
                        <>
                          <XCircle className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                          <span className="font-medium text-gray-700">Out:</span>
                          <span className="ml-2 text-gray-900">{record.punchOut}</span>
                        </>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <AlertCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-sm">Not punched out</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {record.regularHours !== '-' ? `${record.regularHours}h` : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.overtimeHours !== '-' && record.overtimeHours !== '0.00' && parseFloat(record.overtimeHours) > 0 ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                      {record.overtimeHours}h
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.nightDiffHours !== '-' && record.nightDiffHours !== '0.00' && parseFloat(record.nightDiffHours) > 0 ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-medium">
                      {record.nightDiffHours}h
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.lateTime !== 'On time' && record.lateTime !== '-' && record.lateTime !== '0m' ? (
                    <span className="flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                      {record.lateTime}
                    </span>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">On time</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    record.status === 'present' 
                      ? 'bg-green-100 text-green-800' 
                      : record.status === 'absent'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status || 'pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {records.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Showing {records.length} record{records.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 transition"
                disabled
              >
                ← Previous
              </button>
              <button 
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 transition"
                disabled
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}