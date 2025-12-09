import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini HCM Time Tracking",
  description: "Employee time tracking system",
  icons: '/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-linear-to-br from-blue-50 to-indigo-50">
          <Navigation />
        </div>
        {children}
      </body>
      <Footer />
    </html>
  );
}