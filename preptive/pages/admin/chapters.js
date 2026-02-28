import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import { FaLayerGroup } from 'react-icons/fa'

export default function ChaptersManagement() {
  const [chapters, setChapters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingChapter, setEditingChapter] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    subject_id: ''
  })

  useEffect(() => {
    fetchChapters()
    fetchSubjects()
  }, [])

  const fetchChapters = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('chapters')
        .select(`
          *,
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

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const slug = formData.slug || generateSlug(formData.name)
      
      if (editingChapter) {
        // Update
        const { error } = await supabase
          .from('chapters')
          .update({ 
            name: formData.name, 
            slug,
            subject_id: formData.subject_id 
          })
          .eq('id', editingChapter.id)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('chapters')
          .insert([{ 
            name: formData.name, 
            slug,
            subject_id: formData.subject_id 
          }])

        if (error) throw error
      }

      fetchChapters()
      closeModal()
    } catch (error) {
      console.error('Error saving chapter:', error)
      alert('Error saving chapter')
    }
  }

  const handleDelete = async (chapter) => {
    if (!confirm(`Are you sure you want to delete "${chapter.name}"? This will also delete all topics and questions under this chapter.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('chapters')
        .delete()
        .eq('id', chapter.id)

      if (error) throw error
      fetchChapters()
    } catch (error) {
      console.error('Error deleting chapter:', error)
      alert('Error deleting chapter')
    }
  }

  const openEditModal = (chapter) => {
    setEditingChapter(chapter)
    setFormData({
      name: chapter.name,
      slug: chapter.slug || '',
      subject_id: chapter.subject_id
    })
    setModalOpen(true)
  }

  const openAddModal = () => {
    setEditingChapter(null)
    setFormData({ name: '', slug: '', subject_id: '' })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingChapter(null)
    setFormData({ name: '', slug: '', subject_id: '' })
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'subjects', 
      label: 'Subject', 
      sortable: true,
      render: (subj) => subj?.name || <span className="text-gray-400">None</span>
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
          <FaLayerGroup className="text-green-600" />
          Chapters Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage chapters</p>
      </div>

      <DataTable
        columns={columns}
        data={chapters}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onAdd={openAddModal}
        loading={loading}
        searchPlaceholder="Search chapters..."
      />

      {/* Chapter Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject *
            </label>
            <select
              required
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Chapter Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Indian Polity"
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
              placeholder="e.g., indian-polity"
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
              {editingChapter ? 'Update' : 'Create'} Chapter
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}