import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import { FaDatabase } from 'react-icons/fa'

export default function TopicsManagement() {
  const [topics, setTopics] = useState([])
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTopic, setEditingTopic] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    chapter_id: ''
  })

  useEffect(() => {
    fetchTopics()
    fetchChapters()
  }, [])

  const fetchTopics = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('topics')
        .select(`
          *,
          chapters (
            id,
            name,
            subjects (
              id,
              name
            )
          )
        `)
        .order('name')

      if (error) throw error
      setTopics(data || [])
    } catch (error) {
      console.error('Error fetching topics:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChapters = async () => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select(`
          id,
          name,
          subjects (
            id,
            name
          )
        `)
        .order('name')

      if (error) throw error
      setChapters(data || [])
    } catch (error) {
      console.error('Error fetching chapters:', error)
    }
  }

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const slug = formData.slug || generateSlug(formData.name)
      
      if (editingTopic) {
        // Update
        const { error } = await supabase
          .from('topics')
          .update({ 
            name: formData.name, 
            slug,
            chapter_id: formData.chapter_id 
          })
          .eq('id', editingTopic.id)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('topics')
          .insert([{ 
            name: formData.name, 
            slug,
            chapter_id: formData.chapter_id 
          }])

        if (error) throw error
      }

      fetchTopics()
      closeModal()
    } catch (error) {
      console.error('Error saving topic:', error)
      alert('Error saving topic')
    }
  }

  const handleDelete = async (topic) => {
    if (!confirm(`Are you sure you want to delete "${topic.name}"? This will also delete all questions under this topic.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', topic.id)

      if (error) throw error
      fetchTopics()
    } catch (error) {
      console.error('Error deleting topic:', error)
      alert('Error deleting topic')
    }
  }

  const openEditModal = (topic) => {
    setEditingTopic(topic)
    setFormData({
      name: topic.name,
      slug: topic.slug || '',
      chapter_id: topic.chapter_id
    })
    setModalOpen(true)
  }

  const openAddModal = () => {
    setEditingTopic(null)
    setFormData({ name: '', slug: '', chapter_id: '' })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTopic(null)
    setFormData({ name: '', slug: '', chapter_id: '' })
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'chapters', 
      label: 'Chapter', 
      sortable: true,
      render: (chap) => (
        <div>
          <div className="font-medium">{chap?.name}</div>
          <div className="text-xs text-gray-500">{chap?.subjects?.name}</div>
        </div>
      )
    },
    { 
      key: 'slug', 
      label: 'Slug', 
      sortable: true,
      render: (slug) => slug || <span className="text-gray-400">Auto-generated</span>
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
          <FaDatabase className="text-purple-600" />
          Topics Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage topics</p>
      </div>

      <DataTable
        columns={columns}
        data={topics}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onAdd={openAddModal}
        loading={loading}
        searchPlaceholder="Search topics..."
      />

      {/* Topic Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingTopic ? 'Edit Topic' : 'Add New Topic'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chapter *
            </label>
            <select
              required
              value={formData.chapter_id}
              onChange={(e) => setFormData({ ...formData, chapter_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name} ({chapter.subjects?.name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Fundamental Rights"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Slug (optional)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., fundamental-rights"
            />
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
              {editingTopic ? 'Update' : 'Create'} Topic
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}