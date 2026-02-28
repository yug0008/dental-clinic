import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import {
  FaBook,
  FaGraduationCap,
  FaLandmark,
  FaUser,
  FaGlobe,
  FaHistory,
  FaDollarSign,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaPlay,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaTrophy,
  FaBolt,
  FaLayerGroup,
  FaNewspaper,
  FaQuestionCircle
} from 'react-icons/fa'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [featuredSubjects, setFeaturedSubjects] = useState([])
  const [stats, setStats] = useState({
    totalQuestions: 0,
    activeUsers: 0,
    practiceSets: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    fetchStats()
    fetchFeaturedSubjects()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchStats = async () => {
    try {
      const [
        { count: questions },
        { count: users },
        { count: practiceSets }
      ] = await Promise.all([
        supabase.from('questions').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('practice_sets').select('*', { count: 'exact', head: true })
      ])

      setStats({
        totalQuestions: questions || 0,
        activeUsers: users || 0,
        practiceSets: practiceSets || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchFeaturedSubjects = async () => {
    try {
      const { data } = await supabase
        .from('subjects')
        .select('*')
        .limit(6)
        .order('name')

      setFeaturedSubjects(data || [])
    } catch (error) {
      console.error('Error fetching subjects:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSubjectIcon = (subjectName) => {
    const icons = {
      'static gk': FaBook,
      'vocab': FaGraduationCap,
      'polity': FaLandmark,
      'history': FaHistory,
      'geography': FaGlobe,
      'economics': FaDollarSign
    }
    const Icon = icons[subjectName?.toLowerCase()] || FaBook
    return <Icon className="text-2xl" />
  }

  const getSubjectColor = (subjectName) => {
    const colors = {
      'static gk': 'from-blue-500 to-blue-600',
      'vocab': 'from-green-500 to-green-600',
      'polity': 'from-purple-500 to-purple-600',
      'history': 'from-amber-500 to-amber-600',
      'geography': 'from-emerald-500 to-emerald-600',
      'economics': 'from-indigo-500 to-indigo-600'
    }
    return colors[subjectName?.toLowerCase()] || 'from-blue-500 to-purple-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Master Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SSC Exams
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Practice with thousands of questions, track your progress, and ace your SSC exams with PrepTive.
              Your journey to success starts here.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  href="/practice"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaPlay />
                  Continue Practice
                </Link>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="/login"
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-lg border border-gray-200 dark:border-gray-700"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.totalQuestions.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.activeUsers.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stats.practiceSets.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Practice Sets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PrepTive?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to prepare for SSC exams in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaBolt className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Practice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start practicing immediately with our intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaChartBar className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Track Progress
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor your improvement with detailed analytics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLayerGroup className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Topic-wise Tests
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Practice specific topics or full-length tests
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Timed Practice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Improve speed with timer-based practice sessions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Subjects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Popular Subjects
            </h2>
            <Link
              href="/practice"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2"
            >
              View All
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/practice/${subject.slug || subject.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-r ${getSubjectColor(subject.name)} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {getSubjectIcon(subject.name)}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{subject.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start your preparation in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 pl-12">
                <FaUser className="text-3xl text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign up for free and get instant access to all features
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 pl-12">
                <FaBook className="text-3xl text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Choose Subject
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select from various subjects and topics to practice
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 pl-12">
                <FaPlay className="text-3xl text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Start Practicing
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Begin your practice and track your progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Join thousands of successful students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "PrepTive helped me improve my accuracy from 60% to 85%. The topic-wise practice is really effective!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Rahul Sharma</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SSC CGL Aspirant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The detailed explanations and solutions helped me understand my mistakes. Best platform for SSC prep!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Priya Patel</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SSC CHSL Aspirant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The timer feature helped me improve my speed. I could practice like real exam conditions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Amit Kumar</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">SSC MTS Aspirant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Is PrepTive really free?
                </h3>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Yes! PrepTive is completely free for all students. We believe in making quality education accessible to everyone.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  How many questions are available?
                </h3>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                We have {stats.totalQuestions.toLocaleString()}+ questions covering all major SSC exam topics. New questions are added regularly.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Can I track my progress?
                </h3>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Absolutely! Your dashboard shows detailed analytics including accuracy, time taken, and topic-wise performance.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Do I need to install any app?
                </h3>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                No installation needed! PrepTive works directly in your browser on desktop, tablet, and mobile devices.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students preparing for SSC exams
            </p>
            {user ? (
              <Link
                href="/practice"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}