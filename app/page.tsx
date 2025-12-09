import Link from 'next/link';
import { Clock, Users, BarChart3, Shield, CheckCircle } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Mini HCM Time Tracking</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md" >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="lg:w-full max-w-2xl text-center lg:text-cenber">
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Time Tracking
              <span className="text-blue-600 block">For Modern Teams</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automate attendance tracking, calculate overtime and night differentials, 
              and get detailed insights—all in one simple platform. Perfect for teams 
              that value accuracy and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <Link 
                href="/login" 
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl text-center"
              >
                Start Tracking Time
              </Link>
              <Link 
                href="#features" 
                className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 transition text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">99%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">Cloud Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">0</div>
                <div className="text-gray-600">Setup Cost</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete time tracking solution with advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-black">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Punch System</h3>
            <p className="text-gray-600 mb-4">
              One-click time tracking with automatic overtime and night differential calculations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Automatic overtime detection
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Night shift differential
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 bg-indigo-100 rounded-lg w-fit mb-6">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Instant insights into attendance, late arrivals, and productivity metrics.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Live statistics
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Detailed breakdowns
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-3 bg-green-100 rounded-lg w-fit mb-6">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Admin Controls</h3>
            <p className="text-gray-600 mb-4">
              Advanced tools for managers to monitor and manage team attendance.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Edit time entries
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Generate reports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Mini HCM Time Tracking</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mini HCM System. Built for Cornerstone Assessment using Next.js.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}