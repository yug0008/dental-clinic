import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'
import {
  FaBook,
  FaGraduationCap,
  FaLandmark,
  FaGlobe,
  FaHistory,
  FaDollarSign,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaSearch,
  FaFilter
} from 'react-icons/fa'

// Subject icons mapping for visual variety
const subjectIcons = {
  'static gk': FaBook,
  'vocab': FaGraduationCap,
  'polity': FaLandmark,
  'history': FaHistory,
  'geography': FaGlobe,
  'economics': FaDollarSign,
  'default': FaBook
}

// Subject colors mapping
const subjectColors = {
  'static gk': 'from-blue-500 to-blue-600',
  'vocab': 'from-green-500 to-green-600',
  'polity': 'from-purple-500 to-purple-600',
  'history': 'from-amber-500 to-amber-600',
  'geography': 'from-emerald-500 to-emerald-600',
  'economics': 'from-indigo-500 to-indigo-600',
  'default': 'from-blue-500 to-purple-600'
}

// Skeleton Loader Component
const SubjectSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icon skeleton */}
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div>
            {/* Title skeleton */}
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            {/* Description skeleton */}
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        {/* Badge skeleton */}
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Progress bar skeleton */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
    </div>
  )
}

export default function PracticeIndex() {
  const [loading, setLoading] = useState(true)
  const [subjects, setSubjects] = useState([])
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [subjectStats, setSubjectStats] = useState({})
  const [userProgress, setUserProgress] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState('all')

  // Fetch subjects and their stats
  useEffect(() => {
    fetchSubjects()
  }, [])

  // Filter subjects based on search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubjects(subjects)
    } else {
      const filtered = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSubjects(filtered)
    }
  }, [searchTerm, subjects])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      
      // Fetch all subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')
        .order('name')

      if (subjectsError) throw subjectsError

      // For each subject, get stats
      const subjectsWithStats = await Promise.all(
        subjectsData.map(async (subject) => {
          // Get total questions count
          const { count: totalQuestions } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('subject_id', subject.id)
            .eq('is_active', true)

          // Get chapters count
          const { count: chaptersCount } = await supabase
            .from('chapters')
            .select('*', { count: 'exact', head: true })
            .eq('subject_id', subject.id)

          // Get topics count
          const { count: topicsCount } = await supabase
            .from('topics')
            .select('*, chapters!inner(subject_id)', { count: 'exact', head: true })
            .eq('chapters.subject_id', subject.id)

          // Get difficulty distribution
          const { data: difficultyData } = await supabase
            .from('questions')
            .select('difficulty, count')
            .eq('subject_id', subject.id)
            .eq('is_active', true)

          // Calculate difficulty counts
          const difficultyCounts = {
            easy: 0,
            medium: 0,
            hard: 0
          }
          
          difficultyData?.forEach(item => {
            if (difficultyCounts.hasOwnProperty(item.difficulty)) {
              difficultyCounts[item.difficulty] = item.count
            }
          })

          return {
            ...subject,
            totalQuestions: totalQuestions || 0,
            chaptersCount: chaptersCount || 0,
            topicsCount: topicsCount || 0,
            difficultyCounts
          }
        })
      )

      setSubjects(subjectsWithStats)
      setFilteredSubjects(subjectsWithStats)
      
      // Fetch user progress if logged in
      await fetchUserProgress(subjectsData.map(s => s.id))

    } catch (error) {
      console.error('Error fetching subjects:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProgress = async (subjectIds) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user attempts for questions in these subjects
      const { data: attempts } = await supabase
        .from('user_attempts')
        .select(`
          question_id,
          is_correct,
          questions!inner (
            subject_id
          )
        `)
        .eq('user_id', user.id)
        .in('questions.subject_id', subjectIds)

      // Calculate progress per subject
      const progress = {}
      subjectIds.forEach(subjectId => {
        const subjectAttempts = attempts?.filter(a => a.questions.subject_id === subjectId) || []
        const uniqueQuestions = new Set(subjectAttempts.map(a => a.question_id))
        const correctAttempts = subjectAttempts.filter(a => a.is_correct).length
        
        progress[subjectId] = {
          attempted: uniqueQuestions.size,
          correct: correctAttempts,
          accuracy: uniqueQuestions.size > 0 
            ? Math.round((correctAttempts / uniqueQuestions.size) * 100) 
            : 0
        }
      })

      setUserProgress(progress)

    } catch (error) {
      console.error('Error fetching user progress:', error)
    }
  }

  const getSubjectIcon = (subjectName) => {
    const key = subjectName?.toLowerCase() || 'default'
    const IconComponent = subjectIcons[key] || subjectIcons.default
    return <IconComponent className="text-2xl" />
  }

  const getSubjectColor = (subjectName) => {
    const key = subjectName?.toLowerCase() || 'default'
    return subjectColors[key] || subjectColors.default
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Practice by Subject
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Choose a subject to start practicing. Track your progress and improve with each attempt.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <FaFilter className="text-gray-400" />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setFilterDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                  ${filterDifficulty === difficulty
                    ? difficulty === 'all' 
                      ? 'bg-blue-600 text-white'
                      : difficulty === 'easy'
                        ? 'bg-green-600 text-white'
                        : difficulty === 'medium'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SubjectSkeleton key={index} />
          ))}
        </div>
      ) : filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            const progress = userProgress[subject.id] || { attempted: 0, correct: 0, accuracy: 0 }
            const progressPercentage = subject.totalQuestions > 0 
              ? Math.round((progress.attempted / subject.totalQuestions) * 100)
              : 0
            
            // Filter by difficulty if selected
            if (filterDifficulty !== 'all' && subject.difficultyCounts[filterDifficulty] === 0) {
              return null
            }

            return (
              <div
                key={subject.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Subject Header with Gradient */}
                <div className={`bg-gradient-to-r ${getSubjectColor(subject.name)} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        {getSubjectIcon(subject.name)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{subject.name}</h3>
                        <p className="text-white/80 text-sm mt-1">
                          {subject.chaptersCount} Chapters • {subject.topicsCount} Topics
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                      {subject.totalQuestions} Qs
                    </span>
                  </div>
                </div>

                {/* Subject Stats */}
                <div className="p-6">
                  {/* Difficulty Distribution */}
                  <div className="flex gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('easy')}`}>
                      Easy: {subject.difficultyCounts?.easy || 0}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('medium')}`}>
                      Med: {subject.difficultyCounts?.medium || 0}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('hard')}`}>
                      Hard: {subject.difficultyCounts?.hard || 0}
                    </span>
                  </div>

                  {/* Progress Section */}
                  {progress.attempted > 0 ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {progress.attempted}/{subject.totalQuestions}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-600 dark:text-green-400">
                          ✓ {progress.correct} correct
                        </span>
                        <span className="text-purple-600 dark:text-purple-400">
                          {progress.accuracy}% accuracy
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No attempts yet. Start practicing!
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/practice/${subject.slug || subject.id}`}
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-center"
                    >
                      View Chapters
                    </Link>
                    <Link
                      href={`/practice/${subject.slug || subject.id}/start`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium text-center flex items-center justify-center gap-2 group"
                    >
                      Practice
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Chapters</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {subject.chaptersCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Topics</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {subject.topicsCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {subject.totalQuestions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-gray-400 dark:text-gray-500 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No subjects found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? 'Try adjusting your search term' : 'No subjects available yet'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Featured Practice Sets */}
      {!loading && subjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Popular Practice Sets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* You can fetch practice_sets from database here */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Mixed Practice</h3>
              <p className="text-white/80 text-sm mb-4">Random questions from all subjects</p>
              <Link
                href="/practice/mixed/start"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all"
              >
                Start Now <FaArrowRight />
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Daily Challenge</h3>
              <p className="text-white/80 text-sm mb-4">New questions every day</p>
              <Link
                href="/practice/daily"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all"
              >
                Start Now <FaArrowRight />
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Weak Areas</h3>
              <p className="text-white/80 text-sm mb-4">Practice questions you got wrong</p>
              <Link
                href="/practice/weak-areas"
                className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all"
              >
                Start Now <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 Practice Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FaClock className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Timed Practice</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Improve speed with timer</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FaCheckCircle className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Track Progress</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your improvement</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FaChartBar className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Detailed Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Review your answers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <FaBook className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Unlimited Practice</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Practice as much as you want</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}