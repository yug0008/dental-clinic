import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import { FaQuestionCircle, FaPlus, FaTrash } from 'react-icons/fa'

export default function QuestionsManagement() {
  const [questions, setQuestions] = useState([])
  const [subjects, setSubjects] = useState([])
  const [chapters, setChapters] = useState([])
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [formData, setFormData] = useState({
    question_text: '',
    question_type: 'mcq',
    difficulty: 'medium',
    marks: 1,
    negative_marks: 0.25,
    explanation: '',
    solution: '',
    is_active: true,
    subject_id: '',
    chapter_id: '',
    topic_id: '',
    options: [
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false }
    ]
  })

  useEffect(() => {
    fetchQuestions()
    fetchSubjects()
  }, [])

  useEffect(() => {
    if (formData.subject_id) {
      fetchChapters(formData.subject_id)
    }
  }, [formData.subject_id])

  useEffect(() => {
    if (formData.chapter_id) {
      fetchTopics(formData.chapter_id)
    }
  }, [formData.chapter_id])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          subjects (id, name),
          chapters (id, name),
          topics (id, name),
          options (*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuestions(data || [])
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('id, name')
        .order('name')

      if (error) throw error
      setSubjects(data || [])
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const fetchChapters = async (subjectId) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('id, name')
        .eq('subject_id', subjectId)
        .order('name')

      if (error) throw error
      setChapters(data || [])
    } catch (error) {
      console.error('Error fetching chapters:', error)
    }
  }

  const fetchTopics = async (chapterId) => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('id, name')
        .eq('chapter_id', chapterId)
        .order('name')

      if (error) throw error
      setTopics(data || [])
    } catch (error) {
      console.error('Error fetching topics:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Validate at least one correct option
      if (!formData.options.some(opt => opt.is_correct)) {
        alert('Please select at least one correct option')
        return
      }

      let questionId

      if (editingQuestion) {
        // Update question
        const { error: questionError } = await supabase
          .from('questions')
          .update({
            question_text: formData.question_text,
            question_type: formData.question_type,
            difficulty: formData.difficulty,
            marks: formData.marks,
            negative_marks: formData.negative_marks,
            explanation: formData.explanation,
            solution: formData.solution,
            is_active: formData.is_active,
            subject_id: formData.subject_id,
            chapter_id: formData.chapter_id,
            topic_id: formData.topic_id || null
          })
          .eq('id', editingQuestion.id)

        if (questionError) throw questionError
        questionId = editingQuestion.id

        // Delete existing options
        await supabase
          .from('options')
          .delete()
          .eq('question_id', editingQuestion.id)

      } else {
        // Create question
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .insert([{
            question_text: formData.question_text,
            question_type: formData.question_type,
            difficulty: formData.difficulty,
            marks: formData.marks,
            negative_marks: formData.negative_marks,
            explanation: formData.explanation,
            solution: formData.solution,
            is_active: formData.is_active,
            subject_id: formData.subject_id,
            chapter_id: formData.chapter_id,
            topic_id: formData.topic_id || null
          }])
          .select()

        if (questionError) throw questionError
        questionId = questionData[0].id
      }

      // Insert options
      const optionsToInsert = formData.options.map(opt => ({
        question_id: questionId,
        option_text: opt.option_text,
        is_correct: opt.is_correct
      }))

      const { error: optionsError } = await supabase
        .from('options')
        .insert(optionsToInsert)

      if (optionsError) throw optionsError

      fetchQuestions()
      closeModal()
    } catch (error) {
      console.error('Error saving question:', error)
      alert('Error saving question')
    }
  }

  const handleDelete = async (question) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', question.id)

      if (error) throw error
      fetchQuestions()
    } catch (error) {
      console.error('Error deleting question:', error)
      alert('Error deleting question')
    }
  }

  const openEditModal = (question) => {
    setEditingQuestion(question)
    setFormData({
      question_text: question.question_text,
      question_type: question.question_type,
      difficulty: question.difficulty,
      marks: question.marks,
      negative_marks: question.negative_marks,
      explanation: question.explanation || '',
      solution: question.solution || '',
      is_active: question.is_active,
      subject_id: question.subject_id,
      chapter_id: question.chapter_id,
      topic_id: question.topic_id || '',
      options: question.options?.length === 4 ? question.options : [
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false }
      ]
    })

    if (question.subject_id) {
      fetchChapters(question.subject_id)
    }
    if (question.chapter_id) {
      fetchTopics(question.chapter_id)
    }

    setModalOpen(true)
  }

  const openAddModal = () => {
    setEditingQuestion(null)
    setFormData({
      question_text: '',
      question_type: 'mcq',
      difficulty: 'medium',
      marks: 1,
      negative_marks: 0.25,
      explanation: '',
      solution: '',
      is_active: true,
      subject_id: '',
      chapter_id: '',
      topic_id: '',
      options: [
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false }
      ]
    })
    setChapters([])
    setTopics([])
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingQuestion(null)
    setChapters([])
    setTopics([])
  }

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options]
    newOptions[index][field] = value
    setFormData({ ...formData, options: newOptions })
  }

  const columns = [
    { 
      key: 'question_text', 
      label: 'Question', 
      sortable: true,
      render: (text) => <div className="line-clamp-2 max-w-md">{text}</div>
    },
    { 
      key: 'subjects', 
      label: 'Subject', 
      sortable: true,
      render: (subj) => subj?.name || '-'
    },
    { 
      key: 'chapters', 
      label: 'Chapter', 
      sortable: true,
      render: (chap) => chap?.name || '-'
    },
    { 
      key: 'topics', 
      label: 'Topic', 
      sortable: true,
      render: (topic) => topic?.name || '-'
    },
    { 
      key: 'difficulty', 
      label: 'Difficulty', 
      sortable: true,
      render: (difficulty) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          difficulty === 'easy' ? 'text-green-600 bg-green-100 dark:bg-green-900/30' :
          difficulty === 'medium' ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' :
          'text-red-600 bg-red-100 dark:bg-red-900/30'
        }`}>
          {difficulty}
        </span>
      )
    },
    { 
      key: 'is_active', 
      label: 'Status', 
      sortable: true,
      render: (active) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          active ? 'text-green-600 bg-green-100 dark:bg-green-900/30' : 'text-gray-600 bg-gray-100 dark:bg-gray-700'
        }`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Created', 
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    }
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FaQuestionCircle className="text-yellow-600" />
          Questions Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage questions with options</p>
      </div>

      <DataTable
        columns={columns}
        data={questions}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onAdd={openAddModal}
        loading={loading}
        searchPlaceholder="Search questions..."
      />

      {/* Question Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingQuestion ? 'Edit Question' : 'Add New Question'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Question Text *
            </label>
            <textarea
              required
              rows="3"
              value={formData.question_text}
              onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter the question..."
            />
          </div>

          {/* Subject, Chapter, Topic */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject *
              </label>
              <select
                required
                value={formData.subject_id}
                onChange={(e) => setFormData({ ...formData, subject_id: e.target.value, chapter_id: '', topic_id: '' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Chapter *
              </label>
              <select
                required
                value={formData.chapter_id}
                onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value, topic_id: '' })}
                disabled={!formData.subject_id}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select chapter</option>
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Topic (Optional)
              </label>
              <select
                value={formData.topic_id}
                onChange={(e) => setFormData({ ...formData, topic_id: e.target.value })}
                disabled={!formData.chapter_id}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Settings */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={formData.question_type}
                onChange={(e) => setFormData({ ...formData, question_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="mcq">MCQ</option>
                <option value="statement">Statement</option>
                <option value="match">Match</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Marks
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Negative Marks
              </label>
              <input
                type="number"
                min="0"
                step="0.25"
                value={formData.negative_marks}
                onChange={(e) => setFormData({ ...formData, negative_marks: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Options *
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {String.fromCharCode(65 + index)}
                </span>
                <input
                  type="text"
                  required
                  value={option.option_text}
                  onChange={(e) => handleOptionChange(index, 'option_text', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={(e) => handleOptionChange(index, 'is_correct', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Correct</span>
                </label>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Explanation
            </label>
            <textarea
              rows="3"
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Explain the answer..."
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Solution
            </label>
            <textarea
              rows="3"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Provide detailed solution..."
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">
              Active (visible to users)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              {editingQuestion ? 'Update' : 'Create'} Question
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}