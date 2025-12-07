// app/dashboard/components/types.ts
export interface DashboardData {
  revenue: number;
  users: number;
  conversion: number;
  profit: number;
  monthlyGrowth: number;
  weeklyGrowth: number;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  amount: number | null;
  time: string;
  type: string;
}

export interface Project {
  id: number;
  name: string;
  progress: number;
  deadline: string;
  team: number;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
}

export interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  iconBgColor: string;
}