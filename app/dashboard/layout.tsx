// app/dashboard/layout.tsx
"use client";

import { useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  User,
  TrendingUp, 
  Users, 
  Bell,
  Search,
  Menu,
  X,
  Home,
  FileText,
  BarChart3,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Handle logout
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      router.push('/login');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in middleware or parent component
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
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
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
  );
}