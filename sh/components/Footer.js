import Link from 'next/link'
import Image from 'next/image'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTooth,
  FaArrowRight,
  FaShieldAlt,
  FaAward,
  FaCheckCircle
} from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white relative overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0194d0]"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0194d0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#01d09e] rounded-full blur-3xl"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0194d0 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Newspaper Texture Background - ADDED HERE */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 12px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Main Footer */}
      <div className="relative container-custom py-16">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-2xl p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0194d0] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FaShieldAlt className="text-2xl text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-1">Sterilization Certified</h4>
              <p className="text-gray-600 text-sm">Hospital-grade protocols for your safety</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-2xl p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#01d09e] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FaAward className="text-2xl text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-1">Top Rated 2024</h4>
              <p className="text-gray-600 text-sm">4.9 stars from 250+ Google reviews</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-2xl p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0194d0] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <FaCheckCircle className="text-2xl text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold mb-1">Insurance Friendly</h4>
              <p className="text-gray-600 text-sm">We accept all major PPO plans</p>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info - 4 columns */}
          <div className="lg:col-span-4">
            <div className="relative w-48 h-12 mb-6">
              <Image
                src="/shlogo.png"
                alt="Dental Clinic Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Providing exceptional dental care with a gentle, patient-first approach. 
              Your smile is our priority, and your comfort is our promise.
            </p>
            
            {/* Social Links with Modern Design */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#0194d0]/10 rounded-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all transform hover:scale-110">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0194d0]/10 rounded-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all transform hover:scale-110">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0194d0]/10 rounded-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all transform hover:scale-110">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0194d0]/10 rounded-xl flex items-center justify-center text-[#0194d0] hover:bg-[#0194d0] hover:text-white transition-all transform hover:scale-110">
                <FaLinkedinIn />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 flex items-center gap-4">
              <div>
                <div className="text-2xl font-bold text-[#0194d0]">20+</div>
                <div className="text-xs text-gray-500">Years Experience</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-[#0194d0]">10k+</div>
                <div className="text-xs text-gray-500">Happy Patients</div>
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#0194d0]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'New Patients', path: '/new-patients' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Insurance', path: '/insurance' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="text-gray-600 hover:text-[#0194d0] transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#0194d0] rounded-full group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#0194d0]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'General Dentistry', path: '/services/general' },
                { name: 'Cosmetic Dentistry', path: '/services/cosmetic' },
                { name: 'Dental Implants', path: '/services/implants' },
                { name: 'Teeth Whitening', path: '/services/whitening' },
                { name: 'Invisalign', path: '/services/invisalign' },
                { name: 'Emergency Care', path: '/services/emergency' }
              ].map((service) => (
                <li key={service.path}>
                  <Link 
                    href={service.path} 
                    className="text-gray-600 hover:text-[#0194d0] transition-all flex items-center gap-2 group"
                  >
                    <FaTooth className="text-xs text-[#0194d0] group-hover:rotate-12 transition-transform" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Contact Information
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#0194d0]"></span>
            </h3>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group">
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0194d0] transition-colors">
                  <FaMapMarkerAlt className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Visit Us</h4>
                  <p className="text-gray-600 text-sm">7903 Silicon Heights,<br />Colorado Springs, CO, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group">
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0194d0] transition-colors">
                  <FaPhone className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Call Us</h4>
                  <a href="tel:7193542900" className="text-gray-600 hover:text-[#0194d0] text-sm block">
                   (719) 354-2900
                  </a>
                  <span className="text-xs text-gray-500">24/7 Emergency Available</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group">
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0194d0] transition-colors">
                  <FaEnvelope className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Email Us</h4>
                  <a href="mailto:Info@JAMIM.Dental" className="text-gray-600 hover:text-[#0194d0] text-sm block">
                   Info@JAMIM.Dental
                  </a>
                  <span className="text-xs text-gray-500">We reply within 24 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#0194d0]/5 transition-all group">
                <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0194d0] transition-colors">
                  <FaClock className="text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Office Hours</h4>
                  <div className="grid grid-cols-2 gap-x-4 text-sm">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">8am - 6pm</span>
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900 font-medium">9am - 2pm</span>
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Payment Methods */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Sand Hill Dental Care. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">VISA</div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">MC</div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">AMEX</div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">DISC</div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-[#0194d0] transition">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#0194d0] transition">Terms of Use</Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-[#0194d0] transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Button */}
      <a 
        href="tel:7193542900" 
        className="fixed bottom-6 right-6 bg-[#0194d0] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#017ab0] transition-all transform hover:scale-110 z-50 flex items-center gap-2 group"
      >
        <FaPhone className="text-sm animate-pulse" />
        <span className="text-sm font-semibold">Emergency? Call Now</span>
        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute -top-1 -right-1"></span>
      </a>
    </footer>
  )
}