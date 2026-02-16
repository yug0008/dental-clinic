// pages/appointment.js
"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaCalendarCheck, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaTooth,
  FaClock,
  FaCalendarAlt,
  FaComment,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSmile,
  FaHeartbeat,
  FaCreditCard,
  FaWhatsapp,
  FaPhoneAlt,
  FaVideo,
  FaMapMarkerAlt,
  FaStar,
  FaClock as FaClockRegular
} from 'react-icons/fa'

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    dentist: '',
    message: '',
    isNewPatient: true,
    agreeToTerms: false
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Show success message or redirect
    alert('Appointment request submitted successfully!')
  }

  const services = [
    { id: 'general', name: 'General Dentistry', icon: FaTooth, duration: '30-60 min' },
    { id: 'cosmetic', name: 'Cosmetic Dentistry', icon: FaSmile, duration: '60-90 min' },
    { id: 'implants', name: 'Dental Implants', icon: FaTooth, duration: '90-120 min' },
    { id: 'whitening', name: 'Teeth Whitening', icon: FaSmile, duration: '45-60 min' },
    { id: 'invisalign', name: 'Invisalign', icon: FaSmile, duration: '30-45 min' },
    { id: 'emergency', name: 'Emergency Care', icon: FaHeartbeat, duration: 'Immediate' }
  ]

  const dentists = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'Lead Dentist', image: '/dentist1.jpg' },
    { id: 'dr-johnson', name: 'Dr. Michael Johnson', specialty: 'Cosmetic Specialist', image: '/dentist2.jpg' },
    { id: 'dr-williams', name: 'Dr. Emily Williams', specialty: 'Pediatric Dentist', image: '/dentist3.jpg' }
  ]

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ]

  return (
    <>
      <Header />
      
      <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen overflow-x-hidden">
       <section className="relative py-16 md:py-20 overflow-hidden">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/appointment-hero.jpeg" // <-- apni image path daalo
      alt="Dental appointment background"
      className="w-full h-full object-cover"
    />
    
    {/* Dark Overlay 70% */}
    <div className="absolute inset-0 bg-black/70"></div>
  </div>

  <div className="container-custom relative z-10 px-4 md:px-6">
    <div className="max-w-3xl mx-auto text-center text-white">
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 text-xs md:text-sm mb-4 text-white/80">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-white">Request Appointment</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Schedule Your{" "}
        <span className="text-[#01d09e]">
          Visit
        </span>
      </h1>

      <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
        Take the first step towards your dream smile.
        Fill out the form below and we'll contact you within 24 hours.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <FaCheckCircle className="text-[#01d09e]" />
          <span className="text-sm">Free Consultation</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <FaCheckCircle className="text-[#01d09e]" />
          <span className="text-sm">No Hidden Fees</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <FaCheckCircle className="text-[#01d09e]" />
          <span className="text-sm">24/7 Support</span>
        </div>
      </div>

    </div>
  </div>

</section>


        {/* Main Appointment Form Section */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Info Cards (Hidden on mobile/tablet, shown in different order) */}
              <div className="hidden lg:block lg:col-span-1 space-y-6">
                {/* Quick Contact Card */}
                <QuickContactCard />
              </div>

              {/* Right Column - Main Form */}
              <div className="lg:col-span-2 w-full">
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 md:p-8 lg:p-10 border border-gray-100">
                  {/* Progress Steps - Responsive */}
                  <div className="mb-6 md:mb-10">
                    <div className="flex items-center justify-between">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm md:text-base transition-all ${
                            currentStep >= step 
                              ? 'bg-[#0194d0] text-white shadow-lg shadow-[#0194d0]/30' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            {currentStep > step ? <FaCheckCircle className="text-sm md:text-base" /> : step}
                          </div>
                          {step < 3 && (
                            <div className={`w-12 sm:w-16 md:w-20 lg:w-32 h-1 mx-1 md:mx-2 rounded ${
                              currentStep > step ? 'bg-[#0194d0]' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs md:text-sm">
                      <span className="text-gray-600">Personal</span>
                      <span className="text-gray-600">Details</span>
                      <span className="text-gray-600">Confirm</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4 md:space-y-6 animate-fadeIn">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Personal Information</h2>
                        
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaUser className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                                placeholder="John"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaUser className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                                placeholder="Doe"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaPhone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                                placeholder="(555) 555-5555"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Patient Type */}
                        <div className="space-y-2 md:space-y-3">
                          <label className="block text-xs md:text-sm font-semibold text-gray-700">
                            Are you a new patient? <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-wrap gap-4 md:gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="isNewPatient"
                                checked={formData.isNewPatient === true}
                                onChange={() => setFormData(prev => ({ ...prev, isNewPatient: true }))}
                                className="w-4 h-4 md:w-5 md:h-5 text-[#0194d0]"
                              />
                              <span className="text-sm md:text-base text-gray-700">Yes, I'm new</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="isNewPatient"
                                checked={formData.isNewPatient === false}
                                onChange={() => setFormData(prev => ({ ...prev, isNewPatient: false }))}
                                className="w-4 h-4 md:w-5 md:h-5 text-[#0194d0]"
                              />
                              <span className="text-sm md:text-base text-gray-700">Existing patient</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Appointment Details */}
                    {currentStep === 2 && (
                      <div className="space-y-4 md:space-y-6 animate-fadeIn">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Appointment Details</h2>

                        {/* Service Selection */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-4">
                            Select Service <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {services.map((service) => (
                              <label
                                key={service.id}
                                className={`relative p-3 md:p-5 border-2 rounded-lg md:rounded-xl cursor-pointer transition-all ${
                                  formData.service === service.id
                                    ? 'border-[#0194d0] bg-[#0194d0]/5'
                                    : 'border-gray-200 hover:border-[#0194d0]/30'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="service"
                                  value={service.id}
                                  checked={formData.service === service.id}
                                  onChange={handleChange}
                                  className="absolute opacity-0"
                                />
                                <div className="flex items-center gap-2 md:gap-3">
                                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    formData.service === service.id
                                      ? 'bg-[#0194d0] text-white'
                                      : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    <service.icon className="text-sm md:text-base" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">{service.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5 md:mt-1">{service.duration}</p>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Dentist Selection */}
                        <div>
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-4">
                            Preferred Dentist (Optional)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                            {dentists.map((dentist) => (
                              <label
                                key={dentist.id}
                                className={`relative p-3 md:p-4 border-2 rounded-lg md:rounded-xl cursor-pointer transition-all text-center ${
                                  formData.dentist === dentist.id
                                    ? 'border-[#0194d0] bg-[#0194d0]/5'
                                    : 'border-gray-200 hover:border-[#0194d0]/30'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="dentist"
                                  value={dentist.id}
                                  checked={formData.dentist === dentist.id}
                                  onChange={handleChange}
                                  className="absolute opacity-0"
                                />
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-br from-[#0194d0] to-[#01d09e] flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                  {dentist.name.split(' ')[1][0]}
                                </div>
                                <h4 className="font-semibold text-gray-900 text-xs md:text-sm">{dentist.name}</h4>
                                <p className="text-xs text-gray-500">{dentist.specialty}</p>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              Preferred Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaCalendarAlt className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all"
                              />
                            </div>
                          </div>

                          <div className="group">
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              Preferred Time <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <FaClock className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                              <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all appearance-none"
                              >
                                <option value="">Select time</option>
                                {timeSlots.map(time => (
                                  <option key={time} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Additional Message */}
                        <div className="group">
                          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                            Additional Notes (Optional)
                          </label>
                          <div className="relative">
                            <FaComment className="absolute left-3 md:left-4 top-4 text-gray-400 group-focus-within:text-[#0194d0] transition-colors text-sm md:text-base" />
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows="3"
                              className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base focus:outline-none focus:border-[#0194d0] focus:ring-2 focus:ring-[#0194d0]/20 transition-all resize-none"
                              placeholder="Any specific concerns? Let us know..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                      <div className="space-y-4 md:space-y-6 animate-fadeIn">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Review & Confirm</h2>

                        {/* Summary Cards */}
                        <div className="bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Personal Information</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Name</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.firstName} {formData.lastName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Patient Type</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.isNewPatient ? 'New Patient' : 'Existing Patient'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Appointment Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Service</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">
                                {services.find(s => s.id === formData.service)?.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Dentist</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">
                                {dentists.find(d => d.id === formData.dentist)?.name || 'No preference'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.date}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="font-medium text-gray-900 text-sm md:text-base">{formData.time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Terms Agreement */}
                        <label className="flex items-start gap-2 md:gap-3 cursor-pointer p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                            className="w-4 h-4 md:w-5 md:h-5 mt-1 text-[#0194d0] rounded flex-shrink-0"
                          />
                          <span className="text-xs md:text-sm text-gray-600">
                            I agree to the <Link href="/terms" className="text-[#0194d0] font-semibold">Terms</Link> and 
                            <Link href="/privacy" className="text-[#0194d0] font-semibold"> Privacy</Link>. 
                            I consent to receive reminders.
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Form Navigation Buttons - Responsive */}
                    <div className="flex justify-between mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-200">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(prev => prev - 1)}
                          className="px-4 md:px-8 py-2.5 md:py-4 border-2 border-gray-200 text-gray-700 rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:border-[#0194d0] hover:text-[#0194d0] transition-all"
                        >
                          Previous
                        </button>
                      )}
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(prev => prev + 1)}
                          className="ml-auto px-4 md:px-8 py-2.5 md:py-4 bg-[#0194d0] text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:bg-[#017ab0] transition-all shadow-lg hover:shadow-xl flex items-center gap-1 md:gap-2"
                        >
                          Continue
                          <FaArrowRight className="text-xs md:text-sm" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!formData.agreeToTerms || isSubmitting}
                          className="ml-auto px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-[#0194d0] to-[#01d09e] text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-xs md:text-sm">Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs md:text-sm">Confirm</span>
                              <FaCheckCircle className="text-xs md:text-sm" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Quick Contact Cards - Mobile/Tablet Version (Below Form) */}
                <div className="block lg:hidden mt-6 md:mt-8">
                  <QuickContactCard mobile={true} />
                </div>

                {/* Additional Info */}
                <div className="mt-4 md:mt-6 lg:mt-8 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                    <FaShieldAlt className="text-[#0194d0] text-lg md:text-xl flex-shrink-0" />
                    <span>Your information is secure and encrypted. We respect your privacy.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Book With Us Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container-custom px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                Why Book With Us?
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Experience the difference of patient-centered care
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  icon: FaClock,
                  title: 'Same-Day Appointments',
                  desc: 'Emergency appointments available within 24 hours'
                },
                {
                  icon: FaCreditCard,
                  title: 'Flexible Payments',
                  desc: '0% financing and all major insurance accepted'
                },
                {
                  icon: FaVideo,
                  title: 'Virtual Consultations',
                  desc: 'Connect with dentists from home'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0194d0]/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <feature.icon className="text-xl md:text-2xl text-[#0194d0]" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Quick Contact Card Component
function QuickContactCard({ mobile = false }) {
  const address = "761 W Shaw Ave # 101, Fresno, CA 93711, US";
  const phone = "+1 559-244-4277";
  
  return (
    <div className={`bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 border border-gray-100 ${!mobile && 'sticky top-24'}`}>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
        <div className="w-1 h-6 md:h-8 bg-[#0194d0] rounded-full"></div>
        Quick Contact
      </h3>

      <div className="space-y-3 md:space-y-4">
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl hover:bg-[#0194d0]/5 transition-all group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-[#0194d0] transition-colors flex-shrink-0">
            <FaPhoneAlt className="text-[#0194d0] group-hover:text-white transition-colors text-sm md:text-base" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-gray-500">Call Us Now</p>
            <p className="font-bold text-gray-900 text-sm md:text-base truncate">{phone}</p>
          </div>
        </a>

        <a href="https://wa.me/15592444277" className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl hover:bg-[#0194d0]/5 transition-all group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-[#0194d0] transition-colors flex-shrink-0">
            <FaWhatsapp className="text-[#0194d0] group-hover:text-white transition-colors text-sm md:text-base" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">WhatsApp</p>
            <p className="font-bold text-gray-900 text-sm md:text-base">Chat with us</p>
          </div>
        </a>

        <a href="mailto:appointments@dentalclinic.com" className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl hover:bg-[#0194d0]/5 transition-all group">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/10 rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-[#0194d0] transition-colors flex-shrink-0">
            <FaEnvelope className="text-[#0194d0] group-hover:text-white transition-colors text-sm md:text-base" />
          </div>
          <div className="min-w-0">
            <p className="text-xs md:text-sm text-gray-500">Email Us</p>
            <p className="font-bold text-gray-900 text-sm md:text-base truncate">appointments@dental.com</p>
          </div>
        </a>

        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0194d0]/10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
            <FaMapMarkerAlt className="text-[#0194d0] text-sm md:text-base" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-900 text-xs md:text-sm">{address}</p>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-br from-[#0194d0]/5 to-[#01d09e]/5 rounded-xl md:rounded-2xl">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm md:text-base">
          <FaClockRegular className="text-[#0194d0]" />
          Office Hours
        </h4>
        <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium text-gray-900">9:00 AM - 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium text-gray-900">Closed</span>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 rounded-xl md:rounded-2xl border border-red-100">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FaHeartbeat className="text-red-500 text-xs md:text-sm" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-0.5 md:mb-1 text-sm md:text-base">Dental Emergency?</h4>
            <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">24/7 urgent care available</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1 md:gap-2 text-red-500 font-semibold text-xs md:text-sm">
              Call Emergency Line
              <FaArrowRight className="text-[10px] md:text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* Testimonial Mini */}
      <div className="mt-4 md:mt-6 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs md:text-sm" />
          ))}
        </div>
        <p className="text-gray-600 text-xs md:text-sm italic mb-3 md:mb-4">
          "The online booking was so easy! They called me back within minutes."
        </p>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#0194d0] to-[#01d09e] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
            JD
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm md:text-base">John D.</p>
            <p className="text-xs text-gray-500">Verified Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}