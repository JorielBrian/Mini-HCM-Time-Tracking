import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase.config';
import { addDoc, collection, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import { useState } from 'react';

interface PunchButtonProps {
    name: string;
    action: string;
};

export default function PunchButton({ name, action }: PunchButtonProps) {
    const [user] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(false);

    // Duty time configuration (8 AM to 5 PM)
    const DUTY_START_HOUR = 8; // 8:00 AM
    const DUTY_START_MINUTE = 0;
    const DUTY_END_HOUR = 17; // 5:00 PM
    const DUTY_END_MINUTE = 0;
    const REQUIRED_WORK_HOURS = 9; // Total duty hours

    // Function to calculate late time
    const calculateLateTime = (currentTime: Date): string => {
        const dutyStart = new Date(currentTime);
        dutyStart.setHours(DUTY_START_HOUR, DUTY_START_MINUTE, 0, 0);
        
        if (currentTime > dutyStart) {
            const lateMs = currentTime.getTime() - dutyStart.getTime();
            const lateMinutes = Math.floor(lateMs / (1000 * 60));
            
            if (lateMinutes >= 60) {
                const hours = Math.floor(lateMinutes / 60);
                const minutes = lateMinutes % 60;
                return `${hours}h ${minutes}m late`;
            }
            return `${lateMinutes}m late`;
        }
        return 'On time';
    };

    // Function to calculate overtime/undertime
    const calculateOvertimeUndertime = (punchInTime: Date, punchOutTime: Date) => {
        // Calculate total worked minutes
        const totalWorkedMs = punchOutTime.getTime() - punchInTime.getTime();
        const totalWorkedMinutes = Math.floor(totalWorkedMs / (1000 * 60));
        
        // Calculate required minutes (9 hours = 540 minutes)
        const requiredMinutes = REQUIRED_WORK_HOURS * 60;
        
        let overTime = '';
        let underTime = '';
        
        if (totalWorkedMinutes > requiredMinutes) {
            // Overtime
            const overtimeMinutes = totalWorkedMinutes - requiredMinutes;
            if (overtimeMinutes >= 60) {
                const hours = Math.floor(overtimeMinutes / 60);
                const minutes = overtimeMinutes % 60;
                overTime = `${hours}h ${minutes}m`;
            } else {
                overTime = `${overtimeMinutes}m`;
            }
        } else if (totalWorkedMinutes < requiredMinutes) {
            // Undertime
            const undertimeMinutes = requiredMinutes - totalWorkedMinutes;
            if (undertimeMinutes >= 60) {
                const hours = Math.floor(undertimeMinutes / 60);
                const minutes = undertimeMinutes % 60;
                underTime = `${hours}h ${minutes}m`;
            } else {
                underTime = `${undertimeMinutes}m`;
            }
        }
        
        return { overTime, underTime };
    };

    // Function to find today's attendance record
    const findTodayAttendance = async () => {
        if (!user) return null;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const q = query(
            collection(db, 'attendance'),
            where('userId', '==', user.uid),
            where('date', '>=', today),
            where('date', '<', tomorrow)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            return {
                id: querySnapshot.docs[0].id,
                data: querySnapshot.docs[0].data()
            };
        }
        
        return null;
    };

    const punchInHandler = async () => {
        if (!user || isLoading) return;
        
        setIsLoading(true);
        try {
            // Check if already punched in today
            const existingRecord = await findTodayAttendance();
            if (existingRecord) {
                alert('You have already punched in today!');
                return;
            }
            
            const now = new Date();
            const lateTime = calculateLateTime(now);
            
            await addDoc(collection(db, 'attendance'), {
                userId: user.uid,
                email: user.email,
                name: user.displayName || 'User',
                date: now,
                dateString: now.toLocaleDateString(),
                punchIn: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                punchInTimestamp: now,
                lateTime: lateTime,
                punchOut: '',
                punchOutTimestamp: null,
                overTime: '',
                underTime: '',
                status: 'present',
                createdAt: new Date()
            });
            
            console.log('Punch In successful');
            alert('Punch In recorded successfully!');
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
            // Find today's attendance record
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
            
            // Get punch in time (handle Firestore timestamp)
            let punchInTime: Date;
            if (attendanceRecord.data.punchInTimestamp?.toDate) {
                punchInTime = attendanceRecord.data.punchInTimestamp.toDate();
            } else if (attendanceRecord.data.punchInTimestamp) {
                punchInTime = new Date(attendanceRecord.data.punchInTimestamp);
            } else {
                // Fallback to date field
                punchInTime = new Date(attendanceRecord.data.date);
            }
            
            // Calculate overtime/undertime
            const { overTime, underTime } = calculateOvertimeUndertime(punchInTime, now);
            
            // Update the document
            const docRef = doc(db, 'attendance', attendanceRecord.id);
            await updateDoc(docRef, {
                punchOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                punchOutTimestamp: now,
                overTime: overTime,
                underTime: underTime,
                updatedAt: new Date()
            });
            
            console.log('Punch Out successful');
            alert('Punch Out recorded successfully!');
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
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } 
                    text-white font-bold py-3 px-6 rounded-lg 
                    transition-colors duration-200
                    ${(isLoading || !user) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                {isLoading ? 'Processing...' : name}
            </button>
        </div>
    );
}