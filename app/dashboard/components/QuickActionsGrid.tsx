import { Shield, Settings, HelpCircle, FileText } from 'lucide-react';
import QuickActionCard from './QuickActionCard';
import { QuickAction } from './types';

export default function QuickActionsGrid() {
  const quickActions: QuickAction[] = [
    {
      title: 'Security',
      description: 'Enhance your account security',
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      color: 'text-blue-600',
      iconBgColor: 'bg-blue-100'
    },
    {
      title: 'Settings',
      description: 'Manage your preferences',
      icon: <Settings className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
      iconBgColor: 'bg-green-100'
    },
    {
      title: 'Support',
      description: 'Contact our support team',
      icon: <HelpCircle className="h-6 w-6 text-purple-600" />,
      color: 'text-purple-600',
      iconBgColor: 'bg-purple-100'
    },
    {
      title: 'Documents',
      description: 'Download monthly reports',
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      color: 'text-orange-600',
      iconBgColor: 'bg-orange-100'
    },
  ];

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
    // Add your quick action logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickActions.map((action, index) => (
        <QuickActionCard 
          key={index}
          action={action}
          onClick={() => handleQuickAction(action.title)}
        />
      ))}
    </div>
  );
}