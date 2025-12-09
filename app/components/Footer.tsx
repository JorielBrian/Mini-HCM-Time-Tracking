import { Clock } from 'lucide-react';

export default function Footer() {
  return (
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
  )
}
