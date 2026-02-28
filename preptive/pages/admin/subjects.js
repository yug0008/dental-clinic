import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import { FaBook } from 'react-icons/fa'

export default function SubjectsManagement() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  })

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name')

      if (error) throw error
      setSubjects(data || [])
    } catch (error) {
      console.error('Error fetching subjects:', error)
    } finally {
      setLoading(false)
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
      
      if (editingSubject) {
        // Update
        const { error } = await supabase
          .from('subjects')
          .update({ name: formData.name, slug })
          .eq('id', editingSubject.id)

        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('subjects')
          .insert([{ name: formData.name, slug }])

        if (error) throw error
      }

      fetchSubjects()
      closeModal()
    } catch (error) {
      console.error('Error saving subject:', error)
      alert('Error saving subject')
    }
  }

  const handleDelete = async (subject) => {
    if (!confirm(`Are you sure you want to delete "${subject.name}"? This will also delete all chapters, topics, and questions under this subject.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', subject.id)

      if (error) throw error
      fetchSubjects()
    } catch (error) {
      console.error('Error deleting subject:', error)
      alert('Error deleting subject')
    }
  }

  const openEditModal = (subject) => {
    setEditingSubject(subject)
    setFormData({
      name: subject.name,
      slug: subject.slug || ''
    })
    setModalOpen(true)
  }

  const openAddModal = () => {
    setEditingSubject(null)
    setFormData({ name: '', slug: '' })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingSubject(null)
    setFormData({ name: '', slug: '' })
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
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
          <FaBook className="text-blue-600" />
          Subjects Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage subjects</p>
      </div>

      <DataTable
        columns={columns}
        data={subjects}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onAdd={openAddModal}
        loading={loading}
        searchPlaceholder="Search subjects..."
      />

      {/* Subject Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingSubject ? 'Edit Subject' : 'Add New Subject'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Static GK"
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
              placeholder="e.g., static-gk"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to auto-generate from name
            </p>
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
              {editingSubject ? 'Update' : 'Create'} Subject
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}