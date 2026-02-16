import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock,
  FaChevronRight,
  FaTooth,
  FaSmile,
  FaGem,
  FaMagic,
  FaEye,
  FaHeartbeat,
  FaTimes,
  FaBars,
  FaCalendarAlt,
  FaUserMd,
  FaStar,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaUserPlus,
  FaCommentAlt
} from 'react-icons/fa'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOverlayOpen, setServicesOverlayOpen] = useState(false)

  const services = [
    { id: 'general', name: 'General Dentistry', icon: FaTooth, description: 'Preventive care & routine exams', path: '/services/general' },
    { id: 'cosmetic', name: 'Cosmetic Dentistry', icon: FaSmile, description: 'Veneers, bonding & smile makeovers', path: '/services/cosmetic' },
    { id: 'implants', name: 'Dental Implants', icon: FaGem, description: 'Permanent tooth replacement', path: '/services/implants' },
    { id: 'whitening', name: 'Teeth Whitening', icon: FaMagic, description: 'Professional whitening', path: '/services/whitening' },
    { id: 'invisalign', name: 'Invisalign', icon: FaEye, description: 'Clear aligners', path: '/services/invisalign' },
    { id: 'emergency', name: 'Emergency Care', icon: FaHeartbeat, description: '24/7 urgent dental care', path: '/services/emergency' }
  ]

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (servicesOverlayOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [servicesOverlayOpen, mobileMenuOpen])

  return (
    <>
      {/* Top Bar - Responsive for mobile */}
      <div className="bg-[#0194d0] text-white py-2 sticky top-0 z-50">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between">
            {/* Left - Request Appointment Button */}
            <Link 
              href="/appointment" 
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1"
            >
              <FaCalendarAlt className="text-xs md:text-sm" />
              <span className="hidden xs:inline">Request Appointment</span>
            </Link>

            {/* Center/Right - Contact Info - Now with location always visible */}
            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
              <a href="tel:+15592444277" className="flex items-center gap-1 text-sm whitespace-nowrap hover:text-blue-200 transition-colors">
                <FaPhone className="text-[#01d09e] text-xs" />
                <span className="text-xs md:text-sm">+1 559-244-4277</span>
              </a>
              
              <span className="text-white/30 hidden sm:inline">|</span>
              
              {/* Location - Now visible on all devices */}
              <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                <FaMapMarkerAlt className="text-[#01d09e] text-xs flex-shrink-0" />
                <span className="text-xs md:text-sm truncate max-w-[120px] xs:max-w-[200px] sm:max-w-none">
                  1761 W Shaw Ave, Fresno, CA 93711
                </span>
              </div>
              
              <span className="text-white/30 hidden lg:inline">|</span>
              
              <div className="hidden lg:flex items-center gap-1 text-sm whitespace-nowrap">
                <FaClock className="text-[#01d09e] text-xs" />
                <span>Mon-Fri: 8am - 6pm</span>
              </div>
            </div>

            {/* Removed separate mobile address icon as it's now integrated above */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-10 z-40" style={{ top: '40px' }}>
        <div className="container-custom px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="relative w-32 xs:w-36 sm:w-40 h-12 flex-shrink-0">
              <Image
                src="/logoden.png"
                alt="Dental Clinic Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation - Now in same line as logo */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/" className="flex items-center gap-1 text-[#0194d0] hover:text-[#01d09e] transition-colors font-medium whitespace-nowrap">
                <FaHome className="text-sm" />
                <span>Home</span>
              </Link>
              <Link href="/about" className="flex items-center gap-1 text-[#0194d0] hover:text-[#01d09e] transition-colors font-medium whitespace-nowrap">
                <FaInfoCircle className="text-sm" />
                <span>About</span>
              </Link>
              <Link href="/new-patients" className="flex items-center gap-1 text-[#0194d0] hover:text-[#01d09e] transition-colors font-medium whitespace-nowrap">
                <FaUserPlus className="text-sm" />
                <span>New Patients</span>
              </Link>
              <Link href="/testimonials" className="flex items-center gap-1 text-[#0194d0] hover:text-[#01d09e] transition-colors font-medium whitespace-nowrap">
                <FaStar className="text-sm" />
                <span>Testimonials</span>
              </Link>
              <Link href="/contact" className="flex items-center gap-1 text-[#0194d0] hover:text-[#01d09e] transition-colors font-medium whitespace-nowrap">
                <FaEnvelope className="text-sm" />
                <span>Contact</span>
              </Link>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-1 xs:gap-2 md:gap-4">
              <button
  onClick={() => setServicesOverlayOpen(true)}
  className="bg-[#0194d0] text-white px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm md:text-base transition-all shadow-md hover:shadow-lg flex items-center gap-1 xs:gap-2 cursor-pointer"
>
  <FaTooth className="text-xs xs:text-sm md:text-base" />
  <span className="hidden xs:inline">Services</span>
  <FaChevronRight className="text-[10px] xs:text-xs md:text-sm" />
</button>


              {/* Mobile Menu Button - Responsive sizing */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0194d0] to-[#01d09e] rounded-lg xs:rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <FaBars className="text-sm xs:text-base sm:text-lg" />
              </button>

              {/* Desktop Book Now Button */}
              <Link 
                href="/book" 
                className="hidden lg:inline-flex bg-[#0194d0] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 items-center gap-2 whitespace-nowrap"
              >
                <FaCalendarAlt />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Services Overlay - Desktop (Right Side) */}
      {servicesOverlayOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={() => setServicesOverlayOpen(false)}
        >
          <div 
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Header - Removed gradient, kept solid color */}
            <div className="sticky top-0 bg-[#0194d0] p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Our Services</h2>
                <p className="text-white/80 text-sm mt-1">Comprehensive dental care</p>
              </div>
              <button 
                onClick={() => setServicesOverlayOpen(false)}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Services List */}
            <div className="p-6">
              <div className="space-y-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={service.path}
                    onClick={() => setServicesOverlayOpen(false)}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group border border-gray-100 hover:border-[#0194d0]/30"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0194d0]/10 to-[#01d09e]/10 rounded-xl flex items-center justify-center group-hover:from-[#0194d0] group-hover:to-[#01d09e] transition-all">
                      <service.icon className="text-xl text-[#0194d0] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#0194d0] transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                    <FaChevronRight className="text-gray-400 group-hover:text-[#0194d0] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Book Appointment CTA */}
              <div className="mt-8 p-6 bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Need help choosing?</h3>
                <p className="text-sm text-gray-600 mb-4">Our team can help you find the right service for your needs.</p>
                <Link
                  href="/appointment"
                  onClick={() => setServicesOverlayOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#0194d0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#017ab0] transition-colors"
                >
                  <FaCalendarAlt />
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay (Bottom Sheet Style) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>

            {/* Menu Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Menu</h3>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <FaTimes className="text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <nav className="space-y-3">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                    <FaHome className="text-[#0194d0]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Home</span>
                    <p className="text-xs text-gray-500">Back to homepage</p>
                  </div>
                </Link>

                <Link 
                  href="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                    <FaInfoCircle className="text-[#0194d0]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">About Us</span>
                    <p className="text-xs text-gray-500">Meet our team</p>
                  </div>
                </Link>

                <Link 
                  href="/new-patients" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                    <FaUserPlus className="text-[#0194d0]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">New Patients</span>
                    <p className="text-xs text-gray-500">First visit guide</p>
                  </div>
                </Link>

                <Link 
                  href="/testimonials" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                    <FaStar className="text-[#0194d0]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Testimonials</span>
                    <p className="text-xs text-gray-500">Patient stories</p>
                  </div>
                </Link>

                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-[#0194d0]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Contact</span>
                    <p className="text-xs text-gray-500">Get in touch</p>
                  </div>
                </Link>
              </nav>

              {/* Book Now Button */}
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 block w-full bg-gradient-to-r from-[#0194d0] to-[#01d09e] text-white px-6 py-4 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @media (min-width: 480px) {
          .xs\:inline {
            display: inline;
          }
        }
      `}</style>
    </>
  )
}