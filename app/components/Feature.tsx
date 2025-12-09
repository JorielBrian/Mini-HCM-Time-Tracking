import { Clock, Users, BarChart3, Shield, CheckCircle } from 'lucide-react';

export default function Feature() {
  return (
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
  )
}
