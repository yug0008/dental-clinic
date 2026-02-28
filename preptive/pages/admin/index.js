import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'
import {
  FaBook,
  FaLayerGroup,
  FaQuestionCircle,
  FaUsers,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    subjects: 0,
    chapters: 0,
    topics: 0,
    questions: 0,
    users: 0,
    attempts: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentActivity()
  }, [])

  const fetchStats = async () => {
    try {
      const [
        { count: subjects },
        { count: chapters },
        { count: topics },
        { count: questions },
        { count: users },
        { count: attempts }
      ] = await Promise.all([
        supabase.from('subjects').select('*', { count: 'exact', head: true }),
        supabase.from('chapters').select('*', { count: 'exact', head: true }),
        supabase.from('topics').select('*', { count: 'exact', head: true }),
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('user_attempts').select('*', { count: 'exact', head: true })
      ])

      setStats({
        subjects: subjects || 0,
        chapters: chapters || 0,
        topics: topics || 0,
        questions: questions || 0,
        users: users || 0,
        attempts: attempts || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRecentActivity = async () => {
    try {
      const { data } = await supabase
        .from('user_attempts')
        .select(`
          *,
          questions (question_text),
          profiles (email)
        `)
        .order('attempted_at', { ascending: false })
        .limit(5)

      setRecentActivity(data || [])
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Subjects', value: stats.subjects, icon: FaBook, color: 'blue', href: '/admin/subjects' },
    { title: 'Chapters', value: stats.chapters, icon: FaLayerGroup, color: 'green', href: '/admin/chapters' },
    { title: 'Topics', value: stats.topics, icon: FaLayerGroup, color: 'purple', href: '/admin/topics' },
    { title: 'Questions', value: stats.questions, icon: FaQuestionCircle, color: 'yellow', href: '/admin/questions' },
    { title: 'Users', value: stats.users, icon: FaUsers, color: 'pink', href: '/admin/users' },
    { title: 'Total Attempts', value: stats.attempts, icon: FaChartBar, color: 'indigo', href: '#' },
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to the admin panel. Manage your content here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-4 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                  <Icon className={`text-${stat.color}-600 dark:text-${stat.color}-400 text-2xl`} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))
          ) : recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.is_correct 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    {activity.is_correct 
                      ? <FaCheckCircle className="text-green-600 dark:text-green-400" />
                      : <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white line-clamp-1">
                      {activity.profiles?.email} attempted a question
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.attempted_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.is_correct
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {activity.is_correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}