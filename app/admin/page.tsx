"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AttendanceRecord {
  id: string;
  name: string;
  email: string;
  dateString: string;
  punchIn: string;
  punchOut: string;
  regularHours: string;
  overtimeHours: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAttendance();
  }, []);

  const fetchAllAttendance = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'attendance'));
      const records: AttendanceRecord[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        records.push({
          id: doc.id,
          name: data.name || 'Unknown',
          email: data.email,
          dateString: data.dateString || '-',
          punchIn: data.punchIn || '-',
          punchOut: data.punchOut || '-',
          regularHours: data.regularHours || '-',
          overtimeHours: data.overtimeHours || '-',
        });
      });
      
      setAttendanceRecords(records.slice(0, 10)); // Show only 10
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Employee attendance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-2xl font-bold mt-2">{attendanceRecords.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Records</p>
              <p className="text-2xl font-bold mt-2">
                {attendanceRecords.filter(r => r.dateString === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">With Overtime</p>
              <p className="text-2xl font-bold mt-2">
                {attendanceRecords.filter(r => r.overtimeHours !== '-' && r.overtimeHours !== '0.00').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Hours</p>
              <p className="text-2xl font-bold mt-2">8.5</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Recent Attendance</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Time In/Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Regular</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">OT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.name}</div>
                      <div className="text-xs text-gray-500">{record.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.dateString}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">In: {record.punchIn}</div>
                      <div className="text-gray-500">Out: {record.punchOut || '-'}</div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            Showing {attendanceRecords.length} records
          </div>
        </div>
      </div>
    </div>
  );
}