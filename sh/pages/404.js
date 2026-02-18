// pages/404.js
import Link from 'next/link';
import Head from 'next/head';
import { 
  FaHome, 
  FaCalendarCheck, 
  FaInfoCircle, 
  FaEnvelope,
  FaPhone,
  FaTools,
  FaArrowRight
} from 'react-icons/fa';
import Header from '@/components/Header'

export default function Custom404() {
  return (
    <>
      <Header />
      <Head>
        <title>404 - Page Under Development | Sand Hill Dental Care</title>
        <meta name="description" content="This page is currently under Development. Please check back later or navigate to our other pages." />
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
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-3xl w-full text-center">
            {/* Development Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0194d0] rounded-full blur-xl opacity-30"></div>
                <div className="relative w-20 h-20 bg-[#0194d0]/10 rounded-full flex items-center justify-center">
                  <FaTools className="text-4xl text-[#0194d0]" />
                </div>
              </div>
            </div>

            {/* 404 Text */}
            <h1 className="text-7xl md:text-8xl font-bold text-[#0194d0] mb-2">404</h1>
            
            {/* Message */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                Page Under Development
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-amber-700 text-sm md:text-base">
                  ⚠️ This page is currently being worked on. We're building something great for you!
                </p>
              </div>
              
              <p className="text-gray-600 mt-4 max-w-md mx-auto">
                In the meantime, feel free to explore our other pages or contact us directly.
              </p>
            </div>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
              <Link
                href="/"
                className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                  <FaHome className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Home</h3>
                  <p className="text-xs text-gray-500">Back to homepage</p>
                </div>
              </Link>

              <Link
                href="/appointment"
                className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                  <FaCalendarCheck className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Appointment</h3>
                  <p className="text-xs text-gray-500">Request a visit</p>
                </div>
              </Link>

              <Link
                href="/about"
                className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                  <FaInfoCircle className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">About Us</h3>
                  <p className="text-xs text-gray-500">Meet our team</p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="group bg-white p-4 rounded-lg border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left flex items-center gap-3 sm:col-span-2 lg:col-span-1"
              >
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                  <FaEnvelope className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Contact</h3>
                  <p className="text-xs text-gray-500">Get in touch</p>
                </div>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 max-w-lg mx-auto border border-gray-200">
              <p className="text-gray-700 mb-3 flex items-center justify-center gap-2">
                <FaPhone className="text-[#0194d0] text-sm" />
                <span>Need immediate assistance? Call us:</span>
              </p>
              <a 
                href="tel:+17193542900" 
                className="inline-flex items-center gap-2 bg-[#0194d0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#017ab0] transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <FaPhone />
                (719) 354-2900
              </a>
              
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                <a href="mailto:Info@JAMIM.Dental" className="text-gray-500 hover:text-[#0194d0] transition-colors flex items-center gap-1">
                  <FaEnvelope className="text-xs" />
                  Info@JAMIM.Dental
                </a>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0194d0] transition-colors text-sm group"
              >
                <span>←</span>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}