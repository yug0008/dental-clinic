import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../../../../lib/supabaseClient'
import {
  FaBook,
  FaLayerGroup,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaPlay,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaGraduationCap,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaHistory,
  FaStar
} from 'react-icons/fa'

// Skeleton Loader Components
const HeaderSkeleton = () => {
  return (
    <div className="mb-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div>
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

const OverviewCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="text-center">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
      </div>
    </div>
  )
}

const QuestionCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10/12"></div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}

export default function TopicDetails() {
  const router = useRouter()
  const { subject, chapter, topic } = router.query
  
  const [loading, setLoading] = useState(true)
  const [subjectData, setSubjectData] = useState(null)
  const [chapterData, setChapterData] = useState(null)
  const [topicData, setTopicData] = useState(null)
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [progress, setProgress] = useState(null)
  const [stats, setStats] = useState({
    totalQuestions: 0,
    attempted: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    averageTime: 0
  })
  const [showFilters, setShowFilters] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all') // all, attempted, correct, incorrect
  const [recentAttempts, setRecentAttempts] = useState([])

  // Fetch data
  useEffect(() => {
    if (subject && chapter && topic) {
      fetchData()
      fetchProgress()
      fetchRecentAttempts()
    }
  }, [subject, chapter, topic])

  // Filter questions based on search and filters
  useEffect(() => {
    let filtered = questions

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(q =>
        q.question_text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === filterDifficulty)
    }

    // Apply status filter
    if (filterStatus !== 'all' && progress?.attempts) {
      filtered = filtered.filter(q => {
        const questionAttempts = progress.attempts.filter(a => a.question_id === q.id)
        if (filterStatus === 'attempted') return questionAttempts.length > 0
        if (filterStatus === 'correct') return questionAttempts.some(a => a.is_correct)
        if (filterStatus === 'incorrect') {
          return questionAttempts.length > 0 && !questionAttempts.some(a => a.is_correct)
        }
        return true
      })
    }

    setFilteredQuestions(filtered)
  }, [searchTerm, filterDifficulty, filterStatus, questions, progress])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Get subject id from slug
      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id, name')
        .eq('slug', subject)
        .single()

      if (!subjectData) throw new Error('Subject not found')
      setSubjectData(subjectData)

      // Get chapter details
      const { data: chapterData } = await supabase
        .from('chapters')
        .select('*')
        .eq('subject_id', subjectData.id)
        .eq('slug', chapter)
        .single()

      if (!chapterData) throw new Error('Chapter not found')
      setChapterData(chapterData)

      // Get topic details
      const { data: topicData } = await supabase
        .from('topics')
        .select('*')
        .eq('chapter_id', chapterData.id)
        .eq('slug', topic)
        .single()

      if (!topicData) throw new Error('Topic not found')
      setTopicData(topicData)

      // Get all questions for this topic
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select(`
          *,
          options (*)
        `)
        .eq('topic_id', topicData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (questionsError) throw questionsError

      setQuestions(questionsData)
      setFilteredQuestions(questionsData)

      // Calculate stats
      const difficultyCounts = {
        easy: questionsData.filter(q => q.difficulty === 'easy').length,
        medium: questionsData.filter(q => q.difficulty === 'medium').length,
        hard: questionsData.filter(q => q.difficulty === 'hard').length
      }

      setStats(prev => ({
        ...prev,
        totalQuestions: questionsData.length,
        ...difficultyCounts
      }))

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !topicData) return

      // Get all questions for this topic
      const { data: questionsData } = await supabase
        .from('questions')
        .select('id')
        .eq('topic_id', topicData.id)

      if (!questionsData) return

      const questionIds = questionsData.map(q => q.id)

      // Get user attempts for these questions
      const { data: attempts } = await supabase
        .from('user_attempts')
        .select(`
          *,
          options (
            option_text,
            is_correct
          )
        `)
        .eq('user_id', user.id)
        .in('question_id', questionIds)
        .order('attempted_at', { ascending: false })

      // Calculate progress
      const uniqueQuestions = new Set(attempts?.map(a => a.question_id) || [])
      const correctAttempts = attempts?.filter(a => a.is_correct).length || 0
      const incorrectAttempts = attempts?.filter(a => !a.is_correct).length || 0
      const totalAttempts = attempts?.length || 0

      // Calculate average time (if you store time per question)
      const avgTime = 0 // You can add time tracking later

      setProgress({
        attempts: attempts || [],
        uniqueAttempted: uniqueQuestions.size,
        correctCount: correctAttempts,
        incorrectCount: incorrectAttempts,
        totalAttempts,
        accuracy: uniqueQuestions.size > 0 
          ? Math.round((correctAttempts / uniqueQuestions.size) * 100) 
          : 0
      })

      setStats(prev => ({
        ...prev,
        attempted: uniqueQuestions.size,
        correct: correctAttempts,
        incorrect: incorrectAttempts,
        accuracy: uniqueQuestions.size > 0 
          ? Math.round((correctAttempts / uniqueQuestions.size) * 100) 
          : 0,
        averageTime: avgTime
      }))

    } catch (error) {
      console.error('Error fetching progress:', error)
    }
  }

  const fetchRecentAttempts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || !topicData) return

      const { data: attempts } = await supabase
        .from('user_attempts')
        .select(`
          *,
          questions (
            id,
            question_text,
            difficulty,
            marks
          ),
          options (
            option_text,
            is_correct
          )
        `)
        .eq('user_id', user.id)
        .eq('questions.topic_id', topicData.id)
        .order('attempted_at', { ascending: false })
        .limit(5)

      setRecentAttempts(attempts || [])
    } catch (error) {
      console.error('Error fetching recent attempts:', error)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusColor = (questionId) => {
    if (!progress?.attempts) return 'bg-gray-100 dark:bg-gray-800'
    
    const questionAttempts = progress.attempts.filter(a => a.question_id === questionId)
    if (questionAttempts.length === 0) return 'bg-gray-100 dark:bg-gray-800'
    
    const hasCorrect = questionAttempts.some(a => a.is_correct)
    return hasCorrect 
      ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800'
      : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800'
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <HeaderSkeleton />
        
        {/* Overview Section Skeleton */}
        <div className="mb-8">
          <OverviewCardSkeleton />
        </div>

        {/* Search and Filter Bar Skeleton */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-pulse">
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Questions List Skeleton */}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <QuestionCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!topicData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Topic Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The topic you're looking for doesn't exist.</p>
          <Link
            href={`/practice/${subject}/${chapter}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Chapter
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
            onClick={() => router.push(`/practice/${subject}/${chapter}`)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {topicData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {subjectData?.name} • {chapterData?.name} • Master this topic
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaQuestionCircle className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Ques</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.correct}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaChartBar className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.accuracy}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <FaClock className="text-amber-600 dark:text-amber-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attempted</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.attempted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Overview Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
            <FaLayerGroup className="text-xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Topic Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Difficulty Distribution</p>
            <div className="flex justify-center gap-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                Easy: {stats.easy}
              </span>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm">
                Med: {stats.medium}
              </span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm">
                Hard: {stats.hard}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Progress</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.attempted}</span>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">questions</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Performance</p>
            <div className="flex items-center justify-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.accuracy}%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">accuracy</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {stats.totalQuestions > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {Math.round((stats.attempted / stats.totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-3 transition-all duration-300"
                style={{ width: `${(stats.attempted / stats.totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search questions..."
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setFilterDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize
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

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'attempted', 'correct', 'incorrect'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize
                      ${filterStatus === status
                        ? status === 'all'
                          ? 'bg-blue-600 text-white'
                          : status === 'correct'
                            ? 'bg-green-600 text-white'
                            : status === 'incorrect'
                              ? 'bg-red-600 text-white'
                              : 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterDifficulty('all')
                  setFilterStatus('all')
                  setSearchTerm('')
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${getStatusColor(question.id)}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                      {index + 1}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty || 'Medium'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      {question.marks || 1} Mark
                    </span>
                    {question.negative_marks > 0 && (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                        -{question.negative_marks}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg text-gray-900 dark:text-white mb-4 leading-relaxed">
                  {question.question_text}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {progress?.attempts?.some(a => a.question_id === question.id && a.is_correct) && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                        <FaCheckCircle /> Previously Correct
                      </span>
                    )}
                    {progress?.attempts?.some(a => a.question_id === question.id && !a.is_correct) && 
                     !progress?.attempts?.some(a => a.question_id === question.id && a.is_correct) && (
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                        <FaTimesCircle /> Previously Incorrect
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/practice/${subject}/${chapter}/${topic}/start?question=${question.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium flex items-center gap-2"
                  >
                    <FaPlay className="text-xs" />
                    Practice This Question
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaGraduationCap className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No questions found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterDifficulty !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters' 
              : 'No questions available for this topic yet'}
          </p>
          {(searchTerm || filterDifficulty !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterDifficulty('all')
                setFilterStatus('all')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Recent Attempts */}
      {recentAttempts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaHistory className="text-gray-500" />
            Recent Attempts
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white line-clamp-1">
                    {attempt.questions?.question_text}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      attempt.is_correct
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                        : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {attempt.is_correct ? 'Correct' : 'Incorrect'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(attempt.attempted_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link
                    href={`/practice/${subject}/${chapter}/${topic}/start?question=${attempt.question_id}`}
                  className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm"
                >
                  Practice Again
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href={`/practice/${subject}/${chapter}/${topic}/start`}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FaPlay />
          Start Topic Practice
        </Link>
        <Link
          href={`/practice/${subject}/${chapter}`}
          className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
        >
          Back to Topics
        </Link>
      </div>
    </div>
  )
}