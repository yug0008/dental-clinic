import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '../../../../lib/supabaseClient'
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaFlag,
  FaBookmark,
  FaLightbulb,
  FaChartBar,
  FaRedoAlt,
  FaPause,
  FaPlay,
  FaStop,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaLayerGroup
} from 'react-icons/fa'

// Skeleton Loader Components
const HeaderSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div>
            <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-16 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

const QuestionSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6 animate-pulse">
      {/* Question Meta Skeleton */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="w-28 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Question Text Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>

      {/* Options Skeleton */}
      <div className="space-y-3 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-28 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

const StatsBarSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ChapterPractice() {
  const router = useRouter()
  const { subject, chapter } = router.query
  
  // State management
  const [loading, setLoading] = useState(true)
  const [subjectData, setSubjectData] = useState(null)
  const [chapterData, setChapterData] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0) // in seconds
  const [isPaused, setIsPaused] = useState(false)
  const [stats, setStats] = useState({
    totalAttempted: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    accuracy: 0
  })
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)
  const [questionHistory, setQuestionHistory] = useState([])
  
  // Refs
  const timerRef = useRef(null)
  const questionStartTime = useRef(Date.now())

  // Initialize practice session
  useEffect(() => {
    if (subject && chapter) {
      fetchData()
      loadQuestions()
    }
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [subject, chapter])

  // Timer effect
  useEffect(() => {
    if (!loading && !isPaused && currentQuestion) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [loading, isPaused, currentQuestion])

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const fetchData = async () => {
    try {
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

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const loadQuestions = async () => {
    try {
      setLoading(true)
      
      // Get subject id
      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id')
        .eq('slug', subject)
        .single()

      if (!subjectData) throw new Error('Subject not found')

      // Get chapter id
      const { data: chapterData } = await supabase
        .from('chapters')
        .select('id')
        .eq('subject_id', subjectData.id)
        .eq('slug', chapter)
        .single()

      if (!chapterData) throw new Error('Chapter not found')

      // Fetch all active questions for this chapter with their options
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select(`
          *,
          options (*),
          topics (
            id,
            name
          ),
          chapters!inner (
            name,
            subjects!inner (name)
          )
        `)
        .eq('chapter_id', chapterData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (questionsError) throw questionsError

      // Shuffle questions for random distribution
      const shuffledQuestions = shuffleArray(questionsData)
      setQuestions(shuffledQuestions)
      
      // Set first question
      if (shuffledQuestions.length > 0) {
        setCurrentQuestion(shuffledQuestions[0])
      }
      
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Load next question
  const loadNextQuestion = () => {
    if (questions.length === 0) return

    // Filter out current question and already attempted questions
    const attemptedQuestionIds = new Set(questionHistory.map(q => q.questionId))
    const availableQuestions = questions.filter(q => !attemptedQuestionIds.has(q.id))
    
    let nextQuestion
    
    if (availableQuestions.length > 0) {
      // Pick random from available questions
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      nextQuestion = availableQuestions[randomIndex]
    } else {
      // All questions attempted, reshuffle and start over
      nextQuestion = questions[Math.floor(Math.random() * questions.length)]
    }
    
    setCurrentQuestion(nextQuestion)
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)
    setBookmarked(false)
    questionStartTime.current = Date.now()
  }

  const handleOptionSelect = (optionId) => {
    if (isAnswered) return
    setSelectedOption(optionId)
  }

  const handleSubmit = async () => {
    if (!selectedOption || isAnswered) return

    const selectedOpt = currentQuestion.options.find(opt => opt.id === selectedOption)
    const isCorrect = selectedOpt?.is_correct || false
    
    // Calculate time taken for this question
    const timeTaken = Math.floor((Date.now() - questionStartTime.current) / 1000)
    
    // Update stats
    setStats(prev => {
      const newCorrect = isCorrect ? prev.correct + 1 : prev.correct
      const newIncorrect = !isCorrect ? prev.incorrect + 1 : prev.incorrect
      const newAttempted = prev.totalAttempted + 1
      
      return {
        totalAttempted: newAttempted,
        correct: newCorrect,
        incorrect: newIncorrect,
        skipped: prev.skipped,
        accuracy: newAttempted > 0 ? Math.round((newCorrect / newAttempted) * 100) : 0
      }
    })

    // Add to history
    setQuestionHistory(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        timeTaken,
        timestamp: new Date().toISOString()
      }
    ])

    // Save attempt to database
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('user_attempts')
          .insert([{
            user_id: user.id,
            question_id: currentQuestion.id,
            selected_option_id: selectedOption,
            is_correct: isCorrect
          }])
      }
    } catch (error) {
      console.error('Error saving attempt:', error)
    }

    setIsAnswered(true)
    setShowExplanation(true)
  }

  const handleSkip = () => {
    if (isAnswered) return
    
    setStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }))
    
    loadNextQuestion()
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleEndPractice = () => {
    setShowQuitConfirm(true)
  }

  const confirmEndPractice = () => {
    setShowResult(true)
    setIsPaused(true)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleRestart = () => {
    // Reset all states
    setQuestions([])
    setQuestionHistory([])
    setStats({
      totalAttempted: 0,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      accuracy: 0
    })
    setTimeElapsed(0)
    setShowResult(false)
    setIsPaused(false)
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)
    
    // Reload questions
    loadQuestions()
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  // Show skeleton loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <HeaderSkeleton />
        {showStats && <StatsBarSkeleton />}
        <QuestionSkeleton />
      </div>
    )
  }

  // Show result screen
  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Result Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Chapter Practice Complete!</h2>
            <p className="text-blue-100">{chapterData?.name} - Great effort!</p>
          </div>

          {/* Stats Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.totalAttempted}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Attempted</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.correct}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{stats.incorrect}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
            </div>

            {/* Time and Additional Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Time</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{formatTime(timeElapsed)}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaExclamationTriangle className="text-gray-400 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Skipped</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.skipped}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Performance (if available) */}
            {questionHistory.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topic-wise Performance</h3>
                <div className="space-y-3">
                  {Object.entries(
                    questionHistory.reduce((acc, q) => {
                      const topic = questions.find(qu => qu.id === q.questionId)?.topics?.name || 'General'
                      if (!acc[topic]) acc[topic] = { total: 0, correct: 0 }
                      acc[topic].total++
                      if (q.isCorrect) acc[topic].correct++
                      return acc
                    }, {})
                  ).map(([topic, data]) => (
                    <div key={topic} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-32 truncate">{topic}:</span>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="bg-green-600 rounded-full h-2"
                          style={{ width: `${(data.correct / data.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
              >
                <FaRedoAlt />
                Practice Again
              </button>
              <Link
                href={`/practice/${subject}/${chapter}`}
                className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium text-center"
              >
                Back to Topics
              </Link>
              <Link
                href={`/practice/${subject}`}
                className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium text-center"
              >
                All Chapters
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show no questions message
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Questions Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">This chapter doesn't have any questions yet.</p>
          <Link
            href={`/practice/${subject}/${chapter}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  // Main practice interface
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {chapterData?.name} Practice
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <FaLayerGroup className="text-xs" />
                  {subjectData?.name} • Question {stats.totalAttempted + 1} of {questions.length}
                </span>
              </p>
            </div>
          </div>

          {/* Timer and Stats */}
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FaClock className="text-blue-600 dark:text-blue-400" />
              <span className="font-mono font-bold text-gray-900 dark:text-white">
                {formatTime(timeElapsed)}
              </span>
            </div>

            {/* Pause/Resume Button */}
            <button
              onClick={handlePauseResume}
              className={`p-2 rounded-lg transition-colors ${
                isPaused 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>

            {/* Stats Toggle */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaChartBar />
            </button>

            {/* End Practice */}
            <button
              onClick={handleEndPractice}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaStop className="text-sm" />
              <span className="hidden sm:inline">End</span>
            </button>
          </div>
        </div>

        {/* Stats Bar - Collapsible */}
        {showStats && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Attempted</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.totalAttempted}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Correct</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.correct}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Incorrect</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.incorrect}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Skipped</p>
                <p className="text-lg font-bold text-gray-600 dark:text-gray-400">{stats.skipped}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.accuracy}%</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        {/* Question Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty || 'Medium'}
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
            {currentQuestion.marks || 1} Mark
          </span>
          {currentQuestion.negative_marks > 0 && (
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
              -{currentQuestion.negative_marks} for wrong
            </span>
          )}
          {currentQuestion.topics?.name && (
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
              {currentQuestion.topics.name}
            </span>
          )}
        </div>

        {/* Question Text */}
        <h2 className="text-xl text-gray-900 dark:text-white mb-6 leading-relaxed">
          {currentQuestion.question_text}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedOption === option.id
            const isCorrect = option.is_correct
            const showCorrect = isAnswered && isCorrect
            const showWrong = isAnswered && isSelected && !isCorrect
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isAnswered}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all
                  ${isAnswered ? 'cursor-default' : 'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                  ${isSelected && !isAnswered ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}
                  ${showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                  ${showWrong ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium
                    ${isSelected && !isAnswered ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                    ${showCorrect ? 'bg-green-600 text-white' : ''}
                    ${showWrong ? 'bg-red-600 text-white' : ''}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {option.option_text}
                  </span>
                  {showCorrect && (
                    <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  )}
                  {showWrong && (
                    <FaTimesCircle className="text-red-600 text-xl flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <FaLightbulb className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation:</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Solution (if any) */}
        {showExplanation && currentQuestion.solution && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution:</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {currentQuestion.solution}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-3 rounded-lg transition-colors ${
              bookmarked 
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FaBookmark />
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FaLightbulb />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {!isAnswered ? (
            <>
              <button
                onClick={handleSkip}
                className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  selectedOption
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </>
          ) : (
            <button
              onClick={loadNextQuestion}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2"
            >
              Next Question
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">End Chapter Practice?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You've attempted {stats.totalAttempted} questions with {stats.accuracy}% accuracy. 
                Are you sure you want to end?
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Continue Practice
              </button>
              <button
                onClick={confirmEndPractice}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                End Practice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {isPaused && !showQuitConfirm && !showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-8 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaPause className="text-blue-600 dark:text-blue-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Practice Paused</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Take a break! Your progress is saved.</p>
            <div className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-8">
              {formatTime(timeElapsed)}
            </div>
            <button
              onClick={handlePauseResume}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              <FaPlay />
              Resume Practice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}