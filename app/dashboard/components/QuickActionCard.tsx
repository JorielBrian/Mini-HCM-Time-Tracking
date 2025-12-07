// app/dashboard/components/QuickActionCard.tsx
import { QuickAction } from './types';

interface QuickActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

export default function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200 w-full"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${action.iconBgColor}`}>
          {action.icon}
        </div>
        <span className={`text-sm font-medium ${action.color}`}>
          {action.title}
        </span>
      </div>
      <h4 className="mt-4 font-bold text-gray-900">{action.title}</h4>
      <p className="mt-2 text-sm text-gray-500">{action.description}</p>
    </button>
  );
}