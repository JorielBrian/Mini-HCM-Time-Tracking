import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function Navigation() {
  return (
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
  )
}
