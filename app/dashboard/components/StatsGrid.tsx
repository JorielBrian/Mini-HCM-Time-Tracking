// app/dashboard/components/StatsGrid.tsx
import { DollarSign, Users, CreditCard, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';
import { dashboardData, formatCurrency } from './utils';

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Revenue"
        value={formatCurrency(dashboardData.revenue)}
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        change={`+${dashboardData.monthlyGrowth}%`}
        changeText="from last month"
        borderColor="border-blue-500"
        iconBgColor="bg-blue-100"
      />

      <StatCard
        title="Total Users"
        value={dashboardData.users.toLocaleString()}
        icon={<Users className="h-6 w-6 text-green-600" />}
        change={`+${dashboardData.weeklyGrowth}%`}
        changeText="from last week"
        borderColor="border-green-500"
        iconBgColor="bg-green-100"
      />

      <StatCard
        title="Conversion Rate"
        value={`${dashboardData.conversion}%`}
        icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
        change="+0.4%"
        changeText="from last month"
        borderColor="border-purple-500"
        iconBgColor="bg-purple-100"
      />

      <StatCard
        title="Total Profit"
        value={formatCurrency(dashboardData.profit)}
        icon={<CreditCard className="h-6 w-6 text-orange-600" />}
        change="+8.2%"
        changeText="from last quarter"
        borderColor="border-orange-500"
        iconBgColor="bg-orange-100"
      />
    </div>
  );
}