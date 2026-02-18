// pages/contact.js
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const officeHours = [
    { day: 'Monday', hours: '10:00 am – 03:00 pm' },
    { day: 'Tuesday', hours: '07:00 am – 07:00 pm' },
    { day: 'Wednesday', hours: '07:00 am – 07:00 pm' },
    { day: 'Thursday', hours: '07:00 am – 07:00 pm' },
    { day: 'Friday', hours: '10:00 am – 03:00 pm' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - Sand Hill Dental Care</title>
        <meta name="description" content="Get in touch with Sand Hill Dental Care. Call, email, or visit us for exceptional dental care in Colorado Springs." />
      </Head>

      <Header />
      
      <main className="bg-white min-h-screen">
        {/* Hero Section - 200px with Background Image */}
        <section className="relative h-[200px] bg-[#0194d0] pb- overflow-hidden">
          {/* Background Image with Opacity 70% */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/shdc.jpg"
              alt="Sand Hill Dental Care Clinic"
              fill
              className="object-cover"
              priority
            />
            {/* Blue Overlay with 70% Opacity */}
            <div className="absolute inset-0 bg-[#0194d0] opacity-70"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container-custom px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-12 md:py-16 bg-white mt-5">
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-20">
              {/* Phone Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-[#0194d0]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0194d0] transition-colors">
                  <FaPhone className="text-2xl text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-500 text-sm mb-3">Speak with our team directly</p>
                <a href="tel:+17193542900" className="text-[#0194d0] font-semibold hover:underline">
                  (719) 354-2900
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-[#0194d0]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0194d0] transition-colors">
                  <FaEnvelope className="text-2xl text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-500 text-sm mb-3">Send us a message anytime</p>
                <a href="mailto:Info@JAMIM.Dental" className="text-[#0194d0] font-semibold hover:underline break-all">
                  Info@JAMIM.Dental
                </a>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-[#0194d0]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0194d0] transition-colors">
                  <FaMapMarkerAlt className="text-2xl text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-500 text-sm mb-3">Come see our clinic</p>
                <address className="not-italic text-[#0194d0] font-semibold">
                  Sand Hill Dental Care<br />
                  Colorado Springs, CO
                </address>
              </div>

              {/* Social Card */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="w-14 h-14 bg-[#0194d0]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0194d0] transition-colors">
                  <FaInstagram className="text-2xl text-[#0194d0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Follow Us</h3>
                <p className="text-gray-500 text-sm mb-3">Stay connected</p>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0194d0] hover:text-white transition-colors">
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0194d0] hover:text-white transition-colors">
                    <FaTwitter className="text-sm" />
                  </a>
                  <a href="https://www.instagram.com/sandhilldentalcare/" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0194d0] hover:text-white transition-colors">
                    <FaInstagram className="text-sm" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0194d0] hover:text-white transition-colors">
                    <FaLinkedinIn className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Section - Form & Hours */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-custom px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-gray-500 mb-6">We'll get back to you within 24 hours</p>
                  
                  {/* Success Message */}
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <FaCheckCircle className="text-green-500 text-xl" />
                      <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    {/* Email & Phone Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                            placeholder="(719) 354-2900"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaComment className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0194d0] text-white py-4 rounded-lg font-semibold hover:bg-[#017ab0] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane className="text-sm" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Right Column - Hours & Info */}
              <div className="lg:col-span-1">
                {/* Office Hours Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#0194d0]/10 rounded-lg flex items-center justify-center">
                      <FaClock className="text-[#0194d0] text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {officeHours.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 font-medium">{item.day}</span>
                        <span className={`font-semibold ${item.hours === 'Closed' ? 'text-red-500' : 'text-gray-900'}`}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Emergency Notice */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-[#0194d0]">Emergency?</span> We're here for you 24/7.
                    </p>
                    <a href="tel:+17193542900" className="inline-flex items-center gap-1 text-[#0194d0] font-medium text-sm mt-2 hover:gap-2 transition-all">
                      Call Emergency Line
                      <FaArrowRight className="text-xs" />
                    </a>
                  </div>
                </div>
                
                {/* Quick Contact Card */}
                <div className="bg-gradient-to-br from-[#0194d0] to-[#017ab0] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Prefer to call?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Our friendly team is ready to assist you during business hours.
                  </p>
                  <a 
                    href="tel:+17193542900" 
                    className="inline-flex items-center gap-2 bg-white text-[#0194d0] px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full justify-center"
                  >
                    <FaPhone />
                    (719) 354-2900
                  </a>
                  <p className="text-white/70 text-xs mt-4 text-center">
                    We typically respond within 1 hour during business hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map - Full Width */}
        <section className="w-full h-[450px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12425.674928307048!2d-104.6812234!3d38.8686606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x871347df3246f707%3A0xdd76d1ec04f8ce4e!2sSand%20Hill%20Dental%20Care!5e0!3m2!1sen!2sin!4v1771425992442!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sand Hill Dental Care Location"
            className="w-full h-full"
          ></iframe>
          
          {/* Map Overlay with Address */}
          <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#0194d0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-[#0194d0]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sand Hill Dental Care</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Colorado Springs, CO<br />
                  (719) 354-2900
                </p>
                <a 
                  href="https://maps.google.com/?q=Sand+Hill+Dental+Care+Colorado+Springs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0194d0] text-sm font-medium mt-2 hover:gap-2 transition-all"
                >
                  Get Directions
                  <FaArrowRight className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-12 bg-white">
          <div className="container-custom px-4 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Have Questions?</h3>
            <p className="text-gray-500 mb-4">Check our FAQ page for quick answers</p>
            <Link 
              href="/faq" 
              className="inline-flex items-center gap-2 text-[#0194d0] font-medium hover:gap-3 transition-all"
            >
              Visit FAQ
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}