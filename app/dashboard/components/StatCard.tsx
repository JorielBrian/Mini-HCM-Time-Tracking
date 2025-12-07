import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeText: string;
  borderColor: string;
  iconBgColor: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  change, 
  changeText, 
  borderColor, 
  iconBgColor 
}: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${iconBgColor} p-3 rounded-lg`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-600 font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          {change}
        </span>
        <span className="text-gray-500 ml-2">{changeText}</span>
      </div>
    </div>
  );
}