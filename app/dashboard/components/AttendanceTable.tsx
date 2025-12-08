import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase.config';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { useEffect, useState } from 'react';

interface AttendanceRecord {
    id: string;
    dateString: string;
    punchIn: string;
    punchOut: string;
    lateTime: string;
    overTime: string;
    underTime: string;
    status: string;
}

export default function AttendanceTable() {
    const [user] = useAuthState(auth);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            if (!user) return;
            
            setLoading(true);
            try {
                const q = query(
                    collection(db, 'attendance'),
                    where('userId', '==', user.uid),
                    orderBy('date', 'desc'),
                    // Limit to last 30 days
                );
                
                const querySnapshot = await getDocs(q);
                const attendanceData: AttendanceRecord[] = [];
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    attendanceData.push({
                        id: doc.id,
                        dateString: data.dateString || new Date(data.date).toLocaleDateString(),
                        punchIn: data.punchIn || '-',
                        punchOut: data.punchOut || '-',
                        lateTime: data.lateTime || '-',
                        overTime: data.overTime || '-',
                        underTime: data.underTime || '-',
                        status: data.status || 'pending'
                    });
                });
                
                setRecords(attendanceData);
            } catch (error) {
                console.error('Error fetching attendance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
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
            <div className="text-center py-8">
                <p className="text-gray-500">No attendance records found</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Attendance History</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punch In</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punch Out</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Undertime</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.dateString}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.punchIn}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.punchOut}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        record.lateTime.includes('late') 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {record.lateTime}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {record.overTime && record.overTime !== '-' ? (
                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                            {record.overTime}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {record.underTime && record.underTime !== '-' ? (
                                        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                                            {record.underTime}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        record.status === 'present' 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'bg-gray-100 text-gray-800'
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