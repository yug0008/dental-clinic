// pages/insurance.js
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaCreditCard, 
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaStar,
  FaSmile
} from 'react-icons/fa'

export default function InsurancePage() {
  const insuranceProviders = [
    { id: 1, name: 'Delta Dental', logo: '/insurance-1.jpg', alt: 'Delta Dental Insurance' },
    { id: 2, name: 'Met Life', logo: '/insurance-2.jpg', alt: 'Met Life Dental Insurance' },
    { id: 3, name: 'Cigna', logo: '/insurance-3.jpg', alt: 'Cigna Dental Insurance' },
    { id: 4, name: 'Aetna', logo: '/insurance-4.jpg', alt: 'Aetna Dental Insurance' },
    { id: 5, name: 'UnitedHealthCare', logo: '/insurance-5.jpg', alt: 'UnitedHealthCare Dental Insurance' },
    { id: 6, name: 'Humana', logo: '/insurance-6.jpg', alt: 'Humana Dental Insurance' }
  ];

  return (
    <>
      <Head>
        <title>Insurance & Payment Options | Sand Hill Dental Care</title>
        <meta name="description" content="We accept most PPO dental insurance plans including Delta Dental, Met Life, Cigna, Aetna, UnitedHealthCare, and Humana. Flexible payment options available." />
      </Head>

      <Header />
      
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0194d0] to-[#017ab0] py-16 md:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="container-custom px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Insurance & Payment Options
              </h1>
              <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Quality dental care should be accessible to everyone. We work with most major insurance providers and offer flexible payment solutions.
              </p>
            </div>
          </div>

          
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20">
          <div className="container-custom px-4">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left Column - Insurance Info (3/5) */}
              <div className="lg:col-span-3 space-y-8">
                {/* Insurance Accepted Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#0194d0]/10 rounded-full flex items-center justify-center">
                      <FaShieldAlt className="text-2xl text-[#0194d0]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Most PPO Dental Insurance Plans Accepted
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 text-lg mb-6">
                    We work with most major dental insurance providers to ensure you get the care you need.
                  </p>
                  
                  {/* Insurance Providers Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                    {insuranceProviders.map((provider) => (
                      <div 
                        key={provider.id} 
                        className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-[#0194d0] hover:shadow-lg transition-all group"
                      >
                        <div className="relative h-16 w-full mb-2">
                          <img
                            src={provider.logo}
                            alt={provider.alt}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <p className="text-center text-sm font-medium text-gray-700 group-hover:text-[#0194d0] transition-colors">
                          {provider.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Always Accepting More */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <FaStar className="text-[#0194d0] text-xl mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          & always accepting more insurances.
                        </h3>
                        <p className="text-gray-600">
                          Don't see your provider? Give us a call — we're constantly adding new insurance plans.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Options Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#0194d0]/10 rounded-full flex items-center justify-center">
                      <FaCreditCard className="text-2xl text-[#0194d0]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Flexible Payment Options
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {/* CareCredit */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">CC</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">CareCredit</h3>
                        <p className="text-gray-600 text-sm">
                          Healthcare credit card with special financing options for dental care.
                        </p>
                      </div>
                    </div>
                    
                    {/* In-Office Financing */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaSmile className="text-[#0194d0] text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">In-Office Financing</h3>
                        <p className="text-gray-600 text-sm">
                          Other in-office financing options available. Ask our team about payment plans.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Maximize Benefits Message */}
                  <div className="mt-6 p-5 bg-gradient-to-r from-[#0194d0]/5 to-[#01d09e]/5 rounded-xl border border-dashed border-[#0194d0]/30">
                    <div className="flex items-center gap-3">
                      <FaHeart className="text-[#0194d0] text-2xl" />
                      <p className="text-lg font-medium text-gray-900">
                        We are happy to help you maximize your benefits!
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Our team will verify your insurance and help you understand your coverage before treatment.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Sidebar (2/5) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Contact Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100  top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-[#0194d0] rounded-full"></div>
                    Have Questions?
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    Our insurance coordinators are here to help you understand your coverage.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Call Us */}
                    <a 
                      href="tel:+17193542900" 
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                        <FaPhone className="text-[#0194d0] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Call us</p>
                        <p className="font-semibold text-gray-900">(719) 354-2900</p>
                      </div>
                    </a>
                    
                    {/* Email Us */}
                    <a 
                      href="mailto:Info@JAMIM.Dental" 
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0194d0] transition-colors">
                        <FaEnvelope className="text-[#0194d0] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email us</p>
                        <p className="font-semibold text-gray-900 text-sm">Info@JAMIM.Dental</p>
                      </div>
                    </a>
                  </div>
                  
                  {/* Verify Insurance Button */}
                  <Link
                    href="/contact"
                    className="mt-6 block w-full bg-[#0194d0] text-white text-center py-4 rounded-xl font-semibold hover:bg-[#017ab0] transition-all shadow-md hover:shadow-lg"
                  >
                    Verify Your Insurance
                  </Link>
                </div>
                
                {/* Benefits Card */}
                <div className="bg-gradient-to-br from-[#0194d0] to-[#017ab0] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-white text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Most PPO plans accepted</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-white text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Flexible financing options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-white text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm">We file claims for you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-white text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Transparent cost estimates</span>
                    </li>
                  </ul>
                </div>
                
                {/* Appointment CTA */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Ready to book?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Let's check your insurance benefits and get you scheduled.
                  </p>
                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 text-[#0194d0] font-medium hover:gap-3 transition-all group"
                  >
                    Request Appointment
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                How Insurance Works With Us
              </h2>
              <div className="w-16 h-0.5 bg-[#0194d0] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0194d0]">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Provide Insurance Info</h3>
                <p className="text-sm text-gray-500">Share your insurance details when booking</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0194d0]">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">We Verify Benefits</h3>
                <p className="text-sm text-gray-500">Our team checks your coverage and explains benefits</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-[#0194d0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#0194d0]">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">We File Claims</h3>
                <p className="text-sm text-gray-500">We handle the paperwork so you don't have to</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-12 bg-white">
          <div className="container-custom px-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions about insurance?</h3>
            <p className="text-gray-500 mb-4">We're here to help you understand your coverage.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-[#0194d0] font-medium hover:gap-3 transition-all"
            >
              Contact Our Insurance Team
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}