import { useState, useEffect } from 'react'
import AdminLayout from './layout'
import { supabase } from '../../lib/supabaseClient'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'
import { FaUsers, FaUserShield, FaUser } from 'react-icons/fa'

export default function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAdmin = async (user) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !user.is_admin })
        .eq('id', user.id)

      if (error) throw error
      fetchUsers()
    } catch (error) {
      console.error('Error toggling admin:', error)
      alert('Error updating user')
    }
  }

  const columns = [
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true 
    },
    { 
      key: 'full_name', 
      label: 'Name', 
      sortable: true,
      render: (name) => name || <span className="text-gray-400">Not set</span>
    },
    { 
      key: 'is_admin', 
      label: 'Role', 
      sortable: true,
      render: (isAdmin) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
          isAdmin 
            ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' 
            : 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
        }`}>
          {isAdmin ? <FaUserShield /> : <FaUser />}
          {isAdmin ? 'Admin' : 'User'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Joined', 
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    }
  ]

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FaUsers className="text-pink-600" />
          Users Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage user accounts</p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        onEdit={(user) => {
          setSelectedUser(user)
          setModalOpen(true)
        }}
        loading={loading}
        searchPlaceholder="Search users by email or name..."
      />

      {/* User Details Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedUser(null)
        }}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                {selectedUser.email?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                <p className="font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedUser.full_name || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">User ID</label>
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {selectedUser.id}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Joined</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(selectedUser.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Last Updated</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : 'Never'}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Admin Access</span>
                  <button
                    onClick={() => {
                      toggleAdmin(selectedUser)
                      setModalOpen(false)
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedUser.is_admin
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedUser.is_admin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}