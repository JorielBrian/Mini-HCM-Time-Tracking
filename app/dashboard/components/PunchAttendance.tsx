"use client";

import PunchButton from "./PunchButton";

interface PunchAttendanceProps {
  onAttendanceUpdate: () => void;
}

export default function PunchAttendance({ onAttendanceUpdate }: PunchAttendanceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PunchButton name="Punch In" action="in" onAttendanceUpdate={onAttendanceUpdate} />
        <PunchButton name="Punch Out" action="out" onAttendanceUpdate={onAttendanceUpdate} />
    </div>
  )
}