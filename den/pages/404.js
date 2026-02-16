// pages/404.js
import Link from 'next/link';
import Head from 'next/head';
import { FaHome, FaCalendarCheck } from 'react-icons/fa';
import Header from '@/components/Header'
export default function Custom404() {
  return (
    <>
    <Header />
      <Head>
        <title>404 - Page Not Found | Dental Clinic</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Image with 70% Opacity */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          {/* 70% Opacity Overlay */}
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* 404 Text */}
            <h1 className="text-8xl md:text-9xl font-bold text-[#0194d0] mb-4">404</h1>
            
            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
              Page Not Found
            </h2>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Please navigate to our home page or schedule an appointment.
            </p>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#0194d0] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#017ab0] transition-colors shadow-md"
              >
                <FaHome className="text-lg" />
                Return Home
              </Link>
              
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0194d0] text-[#0194d0] px-6 py-3 rounded-lg font-medium hover:bg-[#0194d0] hover:text-white transition-colors"
              >
                <FaCalendarCheck className="text-lg" />
                Request Appointment
              </Link>
            </div>

            {/* Contact */}
            <p className="text-sm text-gray-500 mt-8">
              Need help? Call us at{' '}
              <a href="tel:+15592444277" className="text-[#0194d0] hover:underline font-medium">
                +1 559-244-4277
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}