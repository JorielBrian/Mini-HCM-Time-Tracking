// app/dashboard/components/utils.ts
export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const dashboardData = {
  revenue: 45231.89,
  users: 1248,
  conversion: 4.7,
  profit: 32456.78,
  monthlyGrowth: 12.5,
  weeklyGrowth: 3.2,
};

export const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Made a purchase', amount: 249.99, time: '2 min ago', type: 'sale' },
  { id: 2, user: 'Sarah Smith', action: 'Signed up', amount: null, time: '15 min ago', type: 'signup' },
  { id: 3, user: 'Mike Johnson', action: 'Submitted support ticket', amount: null, time: '1 hour ago', type: 'support' },
  { id: 4, user: 'Emma Wilson', action: 'Upgraded plan', amount: 99.99, time: '2 hours ago', type: 'upgrade' },
  { id: 5, user: 'Alex Brown', action: 'Canceled subscription', amount: 49.99, time: '5 hours ago', type: 'cancellation' },
];

export const projects = [
  { id: 1, name: 'Website Redesign', progress: 85, deadline: '2024-12-15', team: 5, status: 'active' as const },
  { id: 2, name: 'Mobile App Launch', progress: 45, deadline: '2024-11-30', team: 8, status: 'active' as const },
  { id: 3, name: 'Marketing Campaign', progress: 100, deadline: '2024-10-25', team: 4, status: 'completed' as const },
  { id: 4, name: 'Database Migration', progress: 30, deadline: '2024-12-10', team: 6, status: 'active' as const },
];