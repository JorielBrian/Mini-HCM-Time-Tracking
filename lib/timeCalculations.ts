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
  scheduleStart: string,
  scheduleEnd: string
): TimeCalculations {
  const [startHour, startMinute] = scheduleStart.split(':').map(Number);
  const [endHour, endMinute] = scheduleEnd.split(':').map(Number);
  
  const scheduleStartTime = new Date(punchIn);
  scheduleStartTime.setHours(startHour, startMinute, 0, 0);
  
  const scheduleEndTime = new Date(punchIn);
  scheduleEndTime.setHours(endHour, endMinute, 0, 0);
  
  if (scheduleEndTime < scheduleStartTime) {
    scheduleEndTime.setDate(scheduleEndTime.getDate() + 1);
  }
  
  const totalWorkedMs = punchOut.getTime() - punchIn.getTime();
  const totalWorkedMinutes = Math.max(0, Math.floor(totalWorkedMs / (1000 * 60)));
  
  const lateMs = Math.max(0, punchIn.getTime() - scheduleStartTime.getTime());
  const lateMinutes = Math.floor(lateMs / (1000 * 60));
  
  let regularStart = punchIn < scheduleStartTime ? scheduleStartTime : punchIn;
  let regularEnd = punchOut > scheduleEndTime ? scheduleEndTime : punchOut;
  
  let regularMinutes = 0;
  if (regularStart < regularEnd) {
    regularMinutes = Math.floor((regularEnd.getTime() - regularStart.getTime()) / (1000 * 60));
  }
  
  let overtimeMinutes = 0;
  
  if (punchIn < scheduleStartTime) {
    const earlyOvertimeMs = scheduleStartTime.getTime() - punchIn.getTime();
    overtimeMinutes += Math.floor(earlyOvertimeMs / (1000 * 60));
  }
  
  if (punchOut > scheduleEndTime) {
    const lateOvertimeMs = punchOut.getTime() - scheduleEndTime.getTime();
    overtimeMinutes += Math.floor(lateOvertimeMs / (1000 * 60));
  }
  
  const nightDiffMinutes = calculateNightDifferential(punchIn, punchOut);
  
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
  const NIGHT_START = 22;
  const NIGHT_END = 6;
  
  let nightMinutes = 0;
  let current = new Date(start);
  
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