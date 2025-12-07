// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { 
  LogOut, 
  User,
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Home,
  FileText,
  BarChart3,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const [dashboardData] = useState({
    revenue: 45231.89,
    users: 1248,
    conversion: 4.7,
    profit: 32456.78,
    monthlyGrowth: 12.5,
    weeklyGrowth: 3.2,
  });

  // Recent activity data
  const [recentActivity] = useState([
    { id: 1, user: 'John Doe', action: 'Made a purchase', amount: 249.99, time: '2 min ago', type: 'sale' },
    { id: 2, user: 'Sarah Smith', action: 'Signed up', amount: null, time: '15 min ago', type: 'signup' },
    { id: 3, user: 'Mike Johnson', action: 'Submitted support ticket', amount: null, time: '1 hour ago', type: 'support' },
    { id: 4, user: 'Emma Wilson', action: 'Upgraded plan', amount: 99.99, time: '2 hours ago', type: 'upgrade' },
    { id: 5, user: 'Alex Brown', action: 'Canceled subscription', amount: 49.99, time: '5 hours ago', type: 'cancellation' },
  ]);

  // Projects data
  const [projects] = useState([
    { id: 1, name: 'Website Redesign', progress: 85, deadline: '2024-12-15', team: 5, status: 'active' },
    { id: 2, name: 'Mobile App Launch', progress: 45, deadline: '2024-11-30', team: 8, status: 'active' },
    { id: 3, name: 'Marketing Campaign', progress: 100, deadline: '2024-10-25', team: 4, status: 'completed' },
    { id: 4, name: 'Database Migration', progress: 30, deadline: '2024-12-10', team: 6, status: 'active' },
  ]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle logout
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      router.push('/login');
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">Error loading dashboard</div>
          <button 
            onClick={() => router.push('/login')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900">Dashboard</h1>
              </div>

              <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'overview' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'analytics' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'reports' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </button>
              </div>
            </div>

            <div className="flex items-center">
              {/* Search */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>

              {/* Notifications */}
              <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Bell size={20} />
                <span className="sr-only">Notifications</span>
              </button>

              {/* User Menu */}
              <div className="ml-4 relative flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3 hidden lg:block">
                    <p className="text-sm font-medium text-gray-700">
                      {user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
            >
              <Home className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button 
              onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              Analytics
            </button>
            <button 
              onClick={() => { setActiveTab('reports'); setIsMobileMenuOpen(false); }}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
            >
              <FileText className="h-5 w-5 mr-3" />
              Reports
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8 md:px-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Welcome back, {user.email?.split('@')[0] || 'User'}!
                  </h2>
                  <p className="mt-2 text-blue-100">
                    Here&apos;s what&apos;s happening with your business today.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="inline-flex rounded-md shadow">
                    <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      View Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.revenue)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{dashboardData.monthlyGrowth}%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            {/* Users Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.users.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{dashboardData.weeklyGrowth}%
                </span>
                <span className="text-gray-500 ml-2">from last week</span>
              </div>
            </div>

            {/* Conversion Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.conversion}%
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">+0.4%</span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>

            {/* Profit Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Profit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData.profit)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">+8.2%</span>
                <span className="text-gray-500 ml-2">from last quarter</span>
              </div>
            </div>
          </div>

          {/* Charts and Projects Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                      Monthly
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
                      Quarterly
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg">
                      Yearly
                    </button>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="h-64 flex items-end space-x-2">
                  {[40, 60, 80, 70, 90, 85, 95, 75, 65, 85, 95, 100].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="mt-2 text-xs text-gray-500">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Active Projects</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Due {formatDate(project.deadline)} • Team: {project.team}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Progress: {project.progress}%
                        </span>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {activity.user}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{activity.action}</div>
                        <div className="text-xs text-gray-500 capitalize">{activity.type}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {activity.amount ? formatCurrency(activity.amount) : '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Security</span>
              </div>
              <h4 className="mt-4 font-bold text-gray-900">Update Password</h4>
              <p className="mt-2 text-sm text-gray-500">Enhance your account security</p>
            </button>

            <button className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <Settings className="h-8 w-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">Settings</span>
              </div>
              <h4 className="mt-4 font-bold text-gray-900">Account Settings</h4>
              <p className="mt-2 text-sm text-gray-500">Manage your preferences</p>
            </button>

            <button className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <HelpCircle className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Support</span>
              </div>
              <h4 className="mt-4 font-bold text-gray-900">Get Help</h4>
              <p className="mt-2 text-sm text-gray-500">Contact our support team</p>
            </button>

            <button className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <FileText className="h-8 w-8 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Documents</span>
              </div>
              <h4 className="mt-4 font-bold text-gray-900">View Reports</h4>
              <p className="mt-2 text-sm text-gray-500">Download monthly reports</p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2024 NextAuth Dashboard. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}