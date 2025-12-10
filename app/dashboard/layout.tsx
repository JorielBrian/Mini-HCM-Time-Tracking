"use client";

import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase.config';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  User,
  Menu,
  X,
  Home,
  Shield,
  Clock
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import Footer from './components/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'employee' | 'admin'>('employee');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role || 'employee');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              
              <div className="shrink-0 flex items-center ml-4 lg:ml-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900">Mini HCM Time Tracking</h1>
              </div>

              <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                {userRole === 'admin' && (
                  <button 
                    onClick={() => router.push('/admin')}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div className="ml-4 relative flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3 hidden lg:block">
                    <p className="text-sm font-medium text-gray-700">
                      {user.email?.split('@')[0] || 'User'}
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">
                        {userRole === 'admin' ? 'Admin' : 'Employee'}
                      </span>
                    </div>
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

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }}
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            
            {userRole === 'admin' && (
              <button 
                onClick={() => { router.push('/admin'); setIsMobileMenuOpen(false); }}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full"
              >
                <Shield className="h-5 w-5 mr-3" />
                Admin
              </button>
            )}
          </div>
        </div>
      )}

      <main className="py-6">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}