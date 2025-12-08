export interface TimeCalculations {
  regularHours: number;
  overtimeHours: number;
  nightDifferentialHours: number;
  lateMinutes: number;
  undertimeMinutes: number;
  isLate: boolean;
  hasUndertime: boolean;
}

export function calculateTimeMetrics(
  punchIn: Date,
  punchOut: Date,
  scheduleStart: string, // '09:00'
  scheduleEnd: string   // '18:00'
): TimeCalculations {
  // Parse schedule times
  const [startHour, startMinute] = scheduleStart.split(':').map(Number);
  const [endHour, endMinute] = scheduleEnd.split(':').map(Number);
  
  // Create schedule times for the same day as punch in
  const scheduleStartTime = new Date(punchIn);
  scheduleStartTime.setHours(startHour, startMinute, 0, 0);
  
  const scheduleEndTime = new Date(punchIn);
  scheduleEndTime.setHours(endHour, endMinute, 0, 0);
  
  // If schedule end is before schedule start (overnight shift), add a day
  if (scheduleEndTime < scheduleStartTime) {
    scheduleEndTime.setDate(scheduleEndTime.getDate() + 1);
  }
  
  // Calculate total worked minutes
  const totalWorkedMs = punchOut.getTime() - punchIn.getTime();
  const totalWorkedMinutes = Math.max(0, Math.floor(totalWorkedMs / (1000 * 60)));
  
  // Calculate late minutes
  const lateMs = Math.max(0, punchIn.getTime() - scheduleStartTime.getTime());
  const lateMinutes = Math.floor(lateMs / (1000 * 60));
  
  // Calculate regular hours (within schedule)
  let regularStart = punchIn < scheduleStartTime ? scheduleStartTime : punchIn;
  let regularEnd = punchOut > scheduleEndTime ? scheduleEndTime : punchOut;
  
  let regularMinutes = 0;
  if (regularStart < regularEnd) {
    regularMinutes = Math.floor((regularEnd.getTime() - regularStart.getTime()) / (1000 * 60));
  }
  
  // Calculate overtime (work after schedule end or before schedule start)
  let overtimeMinutes = 0;
  
  // Overtime before schedule start
  if (punchIn < scheduleStartTime) {
    const earlyOvertimeMs = scheduleStartTime.getTime() - punchIn.getTime();
    overtimeMinutes += Math.floor(earlyOvertimeMs / (1000 * 60));
  }
  
  // Overtime after schedule end
  if (punchOut > scheduleEndTime) {
    const lateOvertimeMs = punchOut.getTime() - scheduleEndTime.getTime();
    overtimeMinutes += Math.floor(lateOvertimeMs / (1000 * 60));
  }
  
  // Calculate night differential (22:00-06:00)
  const nightDiffMinutes = calculateNightDifferential(punchIn, punchOut);
  
  // Calculate undertime (leaving before schedule end, arriving on time)
  let undertimeMinutes = 0;
  if (punchIn <= scheduleStartTime && punchOut < scheduleEndTime) {
    const undertimeMs = scheduleEndTime.getTime() - punchOut.getTime();
    undertimeMinutes = Math.floor(undertimeMs / (1000 * 60));
  }
  
  return {
    regularHours: regularMinutes / 60,
    overtimeHours: overtimeMinutes / 60,
    nightDifferentialHours: nightDiffMinutes / 60,
    lateMinutes,
    undertimeMinutes,
    isLate: lateMinutes > 0,
    hasUndertime: undertimeMinutes > 0
  };
}

function calculateNightDifferential(start: Date, end: Date): number {
  const NIGHT_START = 22; // 10 PM
  const NIGHT_END = 6;    // 6 AM
  
  let nightMinutes = 0;
  let current = new Date(start);
  
  // Limit to max 24 hours
  const maxMinutes = 24 * 60;
  let minutesProcessed = 0;
  
  while (current < end && minutesProcessed < maxMinutes) {
    const hour = current.getHours();
    if (hour >= NIGHT_START || hour < NIGHT_END) {
      nightMinutes++;
    }
    current.setMinutes(current.getMinutes() + 1);
    minutesProcessed++;
  }
  
  return nightMinutes;
}

export function formatTime(minutes: number): string {
  if (minutes <= 0) return '-';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatDecimalHours(hours: number): string {
  if (hours <= 0) return '-';
  return `${hours.toFixed(2)}h`;
}