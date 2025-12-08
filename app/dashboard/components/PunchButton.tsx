interface PunchButtonProps {
  name: string;
};

export default function PunchButton({name}: PunchButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <button onClick={() => alert(`Punched ${name}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {name}
      </button>
    </div>
  );
}