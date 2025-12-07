// app/dashboard/components/RevenueChart.tsx
export default function RevenueChart() {
  return (
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
  );
}