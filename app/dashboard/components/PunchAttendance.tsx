import PunchButton from "./PunchButton";

export default function PunchAttendance() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PunchButton name="Punch In" action="in" />
        <PunchButton name="Punch Out" action="out" />
    </div>
  )
}
