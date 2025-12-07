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
            <span className="text-2xl font-bold text-gray-800">TimeTrack Pro</span>
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Text */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-1" />
              Streamlined Time Tracking
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Time Tracking
              <span className="text-blue-600 block">For Modern Teams</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automate attendance tracking, calculate overtime and night differentials, 
              and get detailed insights—all in one simple platform. Perfect for teams 
              that value accuracy and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
            <div className="flex flex-wrap gap-8">
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

          {/* Right Column - Illustration */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                {/* Dashboard Preview */}
                <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <div className="flex justify-between items-center text-white mb-4">
                    <h3 className="text-xl font-bold">Today's Summary</h3>
                    <div className="text-sm">Dec 7, 2024</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <div className="text-sm opacity-90">Regular Hours</div>
                      <div className="text-2xl font-bold">8.5</div>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                      <div className="text-sm opacity-90">Overtime</div>
                      <div className="text-2xl font-bold">1.5</div>
                    </div>
                  </div>
                </div>

                {/* Features Icons */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Team Tracking</div>
                      <div className="text-sm text-gray-500">Multiple users</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Real-time Stats</div>
                      <div className="text-sm text-gray-500">Live updates</div>
                    </div>
                  </div>
                </div>

                {/* Punch In Button Preview */}
                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-green-100 text-green-800 rounded-full font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Ready to Punch In</span>
                    </div>
                  </div>
                </div>
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

        <div className="grid md:grid-cols-3 gap-8">
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Time Tracking?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join teams that have automated their attendance tracking and saved hours every week.
          </p>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/login" 
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No credit card required • Free forever for up to 10 users
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">TimeTrack Pro</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mini HCM System. Built for demonstration purposes.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}