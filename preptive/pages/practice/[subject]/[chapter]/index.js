import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../../../lib/supabaseClient'
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
  FaExclamationTriangle
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

const TopicCardSkeleton = () => {
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
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  )
}

export default function ChapterTopics() {
  const router = useRouter()
  const { subject, chapter } = router.query
  
  const [loading, setLoading] = useState(true)
  const [subjectData, setSubjectData] = useState(null)
  const [chapterData, setChapterData] = useState(null)
  const [topics, setTopics] = useState([])
  const [filteredTopics, setFilteredTopics] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [progress, setProgress] = useState({})
  const [stats, setStats] = useState({
    totalTopics: 0,
    completedTopics: 0,
    totalQuestions: 0,
    attemptedQuestions: 0,
    easy: 0,
    medium: 0,
    hard: 0
  })
  const [showFilters, setShowFilters] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState('all')

  // Fetch data
  useEffect(() => {
    if (subject && chapter) {
      fetchData()
      fetchProgress()
    }
  }, [subject, chapter])

  // Filter topics based on search and difficulty
  useEffect(() => {
    let filtered = topics

    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(topic =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(topic => 
        topic.difficultyCounts?.[filterDifficulty] > 0
      )
    }

    setFilteredTopics(filtered)
  }, [searchTerm, filterDifficulty, topics])

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

      // Get all topics for this chapter
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .eq('chapter_id', chapterData.id)
        .order('name')

      if (topicsError) throw topicsError

      // Get question counts and difficulty distribution for each topic
      const topicsWithStats = await Promise.all(
        topicsData.map(async (topic) => {
          // Get total questions count
          const { count: totalQuestions } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('topic_id', topic.id)
            .eq('is_active', true)

          // Get difficulty distribution
          const { data: difficultyData } = await supabase
            .from('questions')
            .select('difficulty')
            .eq('topic_id', topic.id)
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
            ...topic,
            totalQuestions: totalQuestions || 0,
            difficultyCounts
          }
        })
      )

      setTopics(topicsWithStats)
      setFilteredTopics(topicsWithStats)

      // Update stats
      const totalQuestions = topicsWithStats.reduce((acc, t) => acc + t.totalQuestions, 0)
      const easyCount = topicsWithStats.reduce((acc, t) => acc + (t.difficultyCounts?.easy || 0), 0)
      const mediumCount = topicsWithStats.reduce((acc, t) => acc + (t.difficultyCounts?.medium || 0), 0)
      const hardCount = topicsWithStats.reduce((acc, t) => acc + (t.difficultyCounts?.hard || 0), 0)

      setStats(prev => ({
        ...prev,
        totalTopics: topicsWithStats.length,
        totalQuestions,
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount
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
      if (!user) return

      if (!chapterData) return

      // Get all topics for this chapter
      const { data: topicsData } = await supabase
        .from('topics')
        .select('id')
        .eq('chapter_id', chapterData.id)

      if (!topicsData) return

      const topicIds = topicsData.map(t => t.id)

      // Get user attempts for questions in these topics
      const { data: attempts } = await supabase
        .from('user_attempts')
        .select(`
          question_id,
          is_correct,
          questions!inner (
            topic_id
          )
        `)
        .eq('user_id', user.id)
        .in('questions.topic_id', topicIds)

      // Calculate progress per topic
      const progressMap = {}
      let completedTopics = 0
      let attemptedQuestions = 0

      topicsData.forEach(topic => {
        const topicAttempts = attempts?.filter(a => a.questions.topic_id === topic.id) || []
        const uniqueQuestions = new Set(topicAttempts.map(a => a.question_id))
        const correctAttempts = topicAttempts.filter(a => a.is_correct).length
        
        progressMap[topic.id] = {
          attempted: uniqueQuestions.size,
          correct: correctAttempts,
          percentage: uniqueQuestions.size > 0 
            ? Math.round((correctAttempts / uniqueQuestions.size) * 100) 
            : 0
        }

        if (uniqueQuestions.size > 0) {
          attemptedQuestions += uniqueQuestions.size
          // Consider topic completed if at least 70% accuracy with min 3 attempts
          if (uniqueQuestions.size >= 3 && (correctAttempts / uniqueQuestions.size) >= 0.7) {
            completedTopics++
          }
        }
      })

      setProgress(progressMap)
      setStats(prev => ({
        ...prev,
        completedTopics,
        attemptedQuestions
      }))

    } catch (error) {
      console.error('Error fetching progress:', error)
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <HeaderSkeleton />
        
        {/* Search and Filter Bar Skeleton */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-pulse">
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Topics Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <TopicCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chapter Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The chapter you're looking for doesn't exist.</p>
          <Link
            href={`/practice/${subject}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Subject
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
            onClick={() => router.push(`/practice/${subject}`)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {chapterData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {subjectData?.name} • Master this chapter topic by topic
            </p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Topics</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTopics}</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedTopics}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FaChartBar className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Ques</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.attemptedQuestions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search topics..."
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
                {difficulty} ({difficulty === 'all' ? stats.totalQuestions : stats[difficulty]})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty Summary Chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
          Easy: {stats.easy}
        </span>
        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium">
          Medium: {stats.medium}
        </span>
        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
          Hard: {stats.hard}
        </span>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const topicProgress = progress[topic.id] || { attempted: 0, correct: 0, percentage: 0 }
            
            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Topic Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                        <FaLayerGroup className="text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {topic.name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      {topic.totalQuestions} Qs
                    </span>
                  </div>

                  {/* Difficulty Distribution */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.difficultyCounts?.easy > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('easy')}`}>
                        Easy: {topic.difficultyCounts.easy}
                      </span>
                    )}
                    {topic.difficultyCounts?.medium > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('medium')}`}>
                        Med: {topic.difficultyCounts.medium}
                      </span>
                    )}
                    {topic.difficultyCounts?.hard > 0 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor('hard')}`}>
                        Hard: {topic.difficultyCounts.hard}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {topicProgress.attempted > 0 ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {topicProgress.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${topicProgress.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {topicProgress.correct} correct • {topicProgress.attempted} attempted
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {topic.totalQuestions} questions available
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/practice/${subject}/${chapter}/${topic.slug || topic.id}/start`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium text-center flex items-center justify-center gap-2"
                    >
                      <FaPlay className="text-xs" />
                      Practice
                    </Link>
                    
                    <Link
                      href={`/practice/${subject}/${chapter}/${topic.slug || topic.id}`}
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaGraduationCap className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No topics found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterDifficulty !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'No topics available for this chapter yet'}
          </p>
          {(searchTerm || filterDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterDifficulty('all')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href={`/practice/${subject}/${chapter}/start`}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FaPlay />
          Practice Full Chapter
        </Link>
        <Link
          href={`/practice/${subject}`}
          className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
        >
          Back to Chapters
        </Link>
      </div>
    </div>
  )
}