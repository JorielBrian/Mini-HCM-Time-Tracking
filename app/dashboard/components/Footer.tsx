import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Mini HCM Time Tracking
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>
  )
}
