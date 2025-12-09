import Link from 'next/link';
import Feature from './components/Feature';
import Navigation from './components/Navigation';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      <Navigation />
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
      <Feature />
    </div>
  );
}