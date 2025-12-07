import { TrendingUp } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Welcome back!
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
  );
}