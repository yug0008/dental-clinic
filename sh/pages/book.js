// pages/book.js
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaCalendarAlt, 
  FaArrowRight,
  FaTools,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaHeartbeat
} from 'react-icons/fa'

export default function BookPage() {
  return (
    <>
      <Head>
        <title>Online Booking - Coming Soon | Sand Hill Dental Care</title>
        <meta name="description" content="Our online booking system is currently under development. Please call or request an appointment through our appointment page." />
      </Head>

      <Header />
      
      <main className="bg-white min-h-screen">
        {/* Hero Section - Minimal & Clean */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-[#0194d0]/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#0194d0] rounded-full animate-pulse"></div>
                <span className="text-[#0194d0] font-medium text-sm uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>

              {/* Main Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0194d0] rounded-full blur-xl opacity-20"></div>
                  <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-200">
                    <FaCalendarAlt className="text-4xl text-[#0194d0]" />
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Online Booking
              </h1>
              
              {/* Under Development Message */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaTools className="text-[#0194d0] text-xl" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Under Development
                    </h2>
                    <p className="text-gray-600">
                      Our online booking system is currently being built to serve you better. 
                      We apologize for the inconvenience and appreciate your patience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternative Options */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {/* Option 1: Appointment Page */}
                <Link
                  href="/appointment"
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                      <FaCalendarAlt className="text-[#0194d0] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Request Appointment</h3>
                      <p className="text-sm text-gray-500 mb-2">Fill out our appointment request form</p>
                      <span className="inline-flex items-center gap-1 text-[#0194d0] text-sm font-medium group-hover:gap-2 transition-all">
                        Go to Form
                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Option 2: Call Us */}
                <a
                  href="tel:+17193542900"
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                      <FaPhone className="text-[#0194d0] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us Directly</h3>
                      <p className="text-sm text-gray-500 mb-2">Speak with our team right away</p>
                      <span className="inline-flex items-center gap-1 text-[#0194d0] text-sm font-medium">
                        (719) 354-2900
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Email Option */}
              <a
                href="mailto:Info@JAMIM.Dental"
                className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-[#0194d0] transition-colors mb-8"
              >
                <FaEnvelope className="text-sm" />
                <span>Info@JAMIM.Dental</span>
              </a>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  ← Back to Home
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Clean Grid */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container-custom px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
                While You Wait, You Can Still
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaClock className="text-[#0194d0] text-xl" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">24/7 Service</h4>
                  <p className="text-xs text-gray-500">Emergency care always available</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaHeartbeat className="text-[#0194d0] text-xl" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Same-Day Appointments</h4>
                  <p className="text-xs text-gray-500">Call for urgent needs</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCheckCircle className="text-[#0194d0] text-xl" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Insurance Accepted</h4>
                  <p className="text-xs text-gray-500">All major PPO plans</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-gray-600 mb-4">
                Prefer to speak with someone? Our team is happy to help.
              </p>
              <a
                href="tel:+17193542900"
                className="inline-flex items-center gap-2 bg-[#0194d0] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#017ab0] transition-all shadow-md hover:shadow-lg"
              >
                <FaPhone />
                Call Us: (719) 354-2900
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}