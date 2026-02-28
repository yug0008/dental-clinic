import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'
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
  FaPlay,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaLayerGroup,
  FaStar
} from 'react-icons/fa'

// Subject icons mapping
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

// Skeleton Loader Components
const HeaderSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div>
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ChapterCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Topics Preview Skeleton */}
      <div className="mb-4">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  )
}

const SearchBarSkeleton = () => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
    </div>
  )
}

export default function SubjectChapters() {
  const router = useRouter()
  const { subject } = router.query
  
  const [loading, setLoading] = useState(true)
  const [subjectData, setSubjectData] = useState(null)
  const [chapters, setChapters] = useState([])
  const [filteredChapters, setFilteredChapters] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [progress, setProgress] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [filterProgress, setFilterProgress] = useState('all') // all, started, completed, not-started
  const [stats, setStats] = useState({
    totalChapters: 0,
    completedChapters: 0,
    inProgressChapters: 0,
    notStartedChapters: 0,
    totalQuestions: 0,
    attemptedQuestions: 0,
    totalTopics: 0
  })

  // Fetch subject details and chapters
  useEffect(() => {
    if (subject) {
      fetchSubjectData()
      fetchChapters()
      fetchProgress()
    }
  }, [subject])

  // Filter chapters based on search and progress filter
  useEffect(() => {
    let filtered = chapters

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(chapter =>
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply progress filter
    if (filterProgress !== 'all') {
      filtered = filtered.filter(chapter => {
        const chapterProgress = progress[chapter.id] || { attempted: 0, percentage: 0 }
        
        if (filterProgress === 'started') {
          return chapterProgress.attempted > 0 && chapterProgress.percentage < 100
        }
        if (filterProgress === 'completed') {
          return chapterProgress.percentage >= 100
        }
        if (filterProgress === 'not-started') {
          return chapterProgress.attempted === 0
        }
        return true
      })
    }

    setFilteredChapters(filtered)
  }, [searchTerm, filterProgress, chapters, progress])

  const fetchSubjectData = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('slug', subject)
        .single()

      if (error) throw error
      setSubjectData(data)
    } catch (error) {
      console.error('Error fetching subject:', error)
    }
  }

  const fetchChapters = async () => {
    try {
      setLoading(true)
      
      // First get the subject id from slug
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('id')
        .eq('slug', subject)
        .single()

      if (subjectError) throw subjectError

      // Fetch chapters for this subject with topics
      const { data: chaptersData, error: chaptersError } = await supabase
        .from('chapters')
        .select(`
          *,
          topics:topics (
            id,
            name,
            slug
          )
        `)
        .eq('subject_id', subjectData.id)
        .order('name')

      if (chaptersError) throw chaptersError

      // Get question counts for each chapter
      const chaptersWithStats = await Promise.all(
        chaptersData.map(async (chapter) => {
          const { count: totalQuestions } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('chapter_id', chapter.id)
            .eq('is_active', true)

          // Get difficulty distribution
          const { data: difficultyData } = await supabase
            .from('questions')
            .select('difficulty')
            .eq('chapter_id', chapter.id)
            .eq('is_active', true)

          const difficultyCounts = {
            easy: 0,
            medium: 0,
            hard: 0
          }

          difficultyData?.forEach(q => {
            if (difficultyCounts.hasOwnProperty(q.difficulty)) {
              difficultyCounts[q.difficulty]++
            }
          })

          return {
            ...chapter,
            totalQuestions: totalQuestions || 0,
            topicsCount: chapter.topics?.length || 0,
            difficultyCounts
          }
        })
      )

      setChapters(chaptersWithStats)
      setFilteredChapters(chaptersWithStats)
      
      // Update total stats
      const totalQuestions = chaptersWithStats.reduce((acc, ch) => acc + ch.totalQuestions, 0)
      const totalTopics = chaptersWithStats.reduce((acc, ch) => acc + ch.topicsCount, 0)
      
      setStats(prev => ({
        ...prev,
        totalChapters: chaptersWithStats.length,
        totalQuestions,
        totalTopics
      }))

    } catch (error) {
      console.error('Error fetching chapters:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get subject id
      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id')
        .eq('slug', subject)
        .single()

      if (!subjectData) return

      // Get all chapters for this subject
      const { data: chaptersData } = await supabase
        .from('chapters')
        .select('id, name')
        .eq('subject_id', subjectData.id)

      if (!chaptersData) return

      // Get user attempts for questions in these chapters
      const chapterIds = chaptersData.map(ch => ch.id)
      
      const { data: attempts } = await supabase
        .from('user_attempts')
        .select(`
          question_id,
          is_correct,
          questions!inner (
            chapter_id
          )
        `)
        .eq('user_id', user.id)
        .in('questions.chapter_id', chapterIds)

      // Calculate progress per chapter using for...of loop instead of forEach
      const progressMap = {}
      let completedChapters = 0
      let inProgressChapters = 0
      let notStartedChapters = 0
      let attemptedQuestions = 0

      // Use for...of loop with await instead of forEach
      for (const chapter of chaptersData) {
        const chapterAttempts = attempts?.filter(a => a.questions.chapter_id === chapter.id) || []
        const uniqueQuestions = new Set(chapterAttempts.map(a => a.question_id))
        const correctAttempts = chapterAttempts.filter(a => a.is_correct).length
        
        const chapterProgress = {
          attempted: uniqueQuestions.size,
          correct: correctAttempts,
          percentage: 0
        }

        // Get total questions for this chapter to calculate percentage
        const { count: totalQuestions } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .eq('chapter_id', chapter.id)
          .eq('is_active', true)

        if (totalQuestions > 0) {
          chapterProgress.percentage = Math.round((uniqueQuestions.size / totalQuestions) * 100)
        }

        progressMap[chapter.id] = chapterProgress

        if (uniqueQuestions.size > 0) {
          attemptedQuestions += uniqueQuestions.size
          
          if (chapterProgress.percentage >= 100) {
            completedChapters++
          } else {
            inProgressChapters++
          }
        } else {
          notStartedChapters++
        }
      }

      setProgress(progressMap)
      setStats(prev => ({
        ...prev,
        completedChapters,
        inProgressChapters,
        notStartedChapters,
        attemptedQuestions
      }))

    } catch (error) {
      console.error('Error fetching progress:', error)
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <HeaderSkeleton />
        <SearchBarSkeleton />
        
        {/* Filter Options Skeleton */}
        <div className="mb-6 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

        {/* Chapters Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ChapterCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!subjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subject Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The subject you're looking for doesn't exist.</p>
          <Link
            href="/practice"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Subjects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header with Back Button */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.push('/practice')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${getSubjectColor(subjectData.name)} text-white`}>
              {getSubjectIcon(subjectData.name)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {subjectData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Master {subjectData.name} chapter by chapter
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaBook className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chapters</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalChapters}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedChapters}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaLayerGroup className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Topics</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTopics}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <FaClock className="text-amber-600 dark:text-amber-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      {stats.attemptedQuestions > 0 && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white">Your Progress</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {stats.attemptedQuestions}/{stats.totalQuestions} questions
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2.5 transition-all duration-300"
              style={{ width: `${(stats.attemptedQuestions / stats.totalQuestions) * 100}%` }}
            />
          </div>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Completed: {stats.completedChapters}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              In Progress: {stats.inProgressChapters}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              Not Started: {stats.notStartedChapters}
            </span>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <FaFilter className="text-gray-400" />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by Progress</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'started', 'completed', 'not-started'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterProgress(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                  ${filterProgress === filter
                    ? filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : filter === 'started'
                        ? 'bg-yellow-600 text-white'
                        : filter === 'completed'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {filter.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chapters Grid */}
      {filteredChapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chapter) => {
            const chapterProgress = progress[chapter.id] || { attempted: 0, correct: 0, percentage: 0 }
            const isCompleted = chapterProgress.percentage >= 100
            const isInProgress = chapterProgress.attempted > 0 && !isCompleted
            
            return (
              <div
                key={chapter.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all hover:shadow-md overflow-hidden group
                  ${isCompleted ? 'border-green-200 dark:border-green-900' : 
                    isInProgress ? 'border-yellow-200 dark:border-yellow-900' : 
                    'border-gray-200 dark:border-gray-700'}`}
              >
                {/* Chapter Header */}
                <div className={`p-6 ${
                  isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' : ''
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        isCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        <FaBook className={`text-xl ${
                          isCompleted ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {chapter.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {chapter.topicsCount} topics • {chapter.totalQuestions} questions
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    {isCompleted && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-xs" />
                        Completed
                      </span>
                    )}
                    {isInProgress && (
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <FaClock className="text-xs" />
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Difficulty Distribution */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {chapter.difficultyCounts?.easy > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('easy')}`}>
                        Easy: {chapter.difficultyCounts.easy}
                      </span>
                    )}
                    {chapter.difficultyCounts?.medium > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('medium')}`}>
                        Med: {chapter.difficultyCounts.medium}
                      </span>
                    )}
                    {chapter.difficultyCounts?.hard > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('hard')}`}>
                        Hard: {chapter.difficultyCounts.hard}
                      </span>
                    )}
                  </div>

                  {/* Topics Preview */}
                  {chapter.topics && chapter.topics.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {chapter.topics.slice(0, 3).map((topic) => (
                          <Link
                            key={topic.id}
                            href={`/practice/${subject}/${chapter.slug || chapter.id}/${topic.slug || topic.id}`}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {topic.name}
                          </Link>
                        ))}
                        {chapter.topics.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            +{chapter.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {chapterProgress.attempted > 0 ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {chapterProgress.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`rounded-full h-2 transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                          }`}
                          style={{ width: `${chapterProgress.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span className="text-green-600 dark:text-green-400">
                          ✓ {chapterProgress.correct} correct
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {chapterProgress.attempted} attempted
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {chapter.totalQuestions} questions ready
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/practice/${subject}/${chapter.slug || chapter.id}/start`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium text-center flex items-center justify-center gap-2"
                    >
                      <FaPlay className="text-xs" />
                      Practice
                    </Link>
                    
                    <Link
                      href={`/practice/${subject}/${chapter.slug || chapter.id}`}
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium text-center"
                    >
                      Details
                    </Link>

                    {chapterProgress.attempted > 0 && (
                      <button 
                        onClick={() => router.push(`/practice/${subject}/${chapter.slug || chapter.id}/analysis`)}
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        title="View Analysis"
                      >
                        <FaChartBar className="text-gray-600 dark:text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No chapters found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterProgress !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No chapters available for this subject yet'}
          </p>
          {(searchTerm || filterProgress !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterProgress('all')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href={`/practice/${subject}/start`}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FaPlay />
          Start Full Subject Practice
        </Link>
        
        {stats.completedChapters === stats.totalChapters && stats.totalChapters > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
            <FaStar />
            <span className="font-medium">Subject Mastered! 🎉</span>
          </div>
        )}
      </div>
    </div>
  )
}