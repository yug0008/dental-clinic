import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaEdit,
  FaBook,
  FaLayerGroup,
  FaFire,
  FaMoon,
  FaSun
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      setUser(user)
      
      // Get profile from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setProfile(profile || {
        name: user.user_metadata?.name || '',
        email: user.email,
        phone: '',
        profile_url: '',
      })
    } else {
      router.push('/login')
    }
    
    setLoading(false)
  }

  // Skeleton Loader Component
  const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
          {/* Cover Photo Skeleton */}
          <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"></div>
          
          <div className="px-6 py-4">
            <div className="flex flex-col items-center -mt-20">
              {/* Profile Picture Skeleton */}
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600"></div>
              
              {/* Name and Edit Button Skeleton */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              
              <div className="mt-2 h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Contact Information Skeleton */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-20 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500 text-xl" />
        ) : (
          <FaMoon className="text-gray-700 text-xl" />
        )}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Cover Photo with Gradient */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 relative">
            {/* Optional: Add pattern overlay */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center -mt-24 sm:-mt-28 lg:-mt-32">
              {/* Profile Picture with Edit Overlay */}
              <div className="relative group">
                {profile?.profile_url ? (
                  <div className="relative">
                    <Image
                      src={profile.profile_url}
                      alt={profile.name}
                      width={128}
                      height={128}
                      className="rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FaCamera className="text-white text-2xl" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center text-white text-4xl font-bold">
                    {profile?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              
              {/* Name and Edit Button */}
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
                  {profile?.name || 'User'}
                </h1>
                <Link
                  href="/settings"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <FaEdit />
                  Edit Profile
                </Link>
              </div>
              
              <p className="mt-2 text-gray-600 dark:text-gray-400">{profile?.email}</p>
              
              {/* Quick Stats Row */}
              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaBook className="text-blue-500" />
                  <span className="text-sm">Joined {new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaPhone className="text-green-500" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{profile?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg md:col-span-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FaUser className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-gray-900 dark:text-white">{profile?.name || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Progress
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <FaBook className="text-white text-3xl mb-3" />
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-white/80">Practice Tests</div>
                  </div>
                </div>
                
                <div className="relative p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <FaLayerGroup className="text-white text-3xl mb-3" />
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-white/80">Flash Cards</div>
                  </div>
                </div>
                
                <div className="relative p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <FaFire className="text-white text-3xl mb-3" />
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-sm text-white/80">Days Streak</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity to show. Start practicing to see your progress!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}