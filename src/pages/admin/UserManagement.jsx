import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Edit, Trash2, Mail, Shield, UserCheck, UserX, Eye, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const UserManagement = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@doj.gov",
      role: "Instructor",
      department: "Law Enforcement Training",
      status: "Active",
      lastLogin: "2024-01-15 14:30",
      joinDate: "2023-06-15",
      coursesCompleted: 12,
      totalHours: 180,
      avatar: null
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@doj.gov",
      role: "Instructor",
      department: "Education Training",
      status: "Active",
      lastLogin: "2024-01-15 12:15",
      joinDate: "2023-08-20",
      coursesCompleted: 8,
      totalHours: 120,
      avatar: null
    },
    {
      id: 3,
      name: "Capt. David Wilson",
      email: "david.wilson@police.gov",
      role: "Student",
      department: "Metro Police Department",
      status: "Active",
      lastLogin: "2024-01-15 10:45",
      joinDate: "2024-01-10",
      coursesCompleted: 3,
      totalHours: 45,
      avatar: null
    },
    {
      id: 4,
      name: "Dr. Lisa Rodriguez",
      email: "lisa.rodriguez@doj.gov",
      role: "Instructor",
      department: "Youth Advocacy Training",
      status: "Inactive",
      lastLogin: "2024-01-10 16:20",
      joinDate: "2023-09-15",
      coursesCompleted: 15,
      totalHours: 225,
      avatar: null
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@school.edu",
      role: "Student",
      department: "Education",
      status: "Active",
      lastLogin: "2024-01-14 09:30",
      joinDate: "2024-01-05",
      coursesCompleted: 2,
      totalHours: 30,
      avatar: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Student',
    department: '',
    status: 'Active'
  });

  const roles = ['All', 'Student', 'Instructor', 'Admin'];
  const statuses = ['All', 'Active', 'Inactive', 'Suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Instructor': return 'bg-blue-100 text-blue-700';
      case 'Student': return 'bg-green-100 text-green-700';
      case 'Admin': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-yellow-100 text-yellow-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateUser = () => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              ...newUser,
              lastLogin: user.lastLogin, // Preserve existing timestamps
              joinDate: user.joinDate,
              coursesCompleted: user.coursesCompleted,
              totalHours: user.totalHours
            }
          : user
      ));
      setEditingUser(null);
    } else {
      // Create new user
      const user = {
        ...newUser,
        id: users.length + 1,
        lastLogin: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        joinDate: new Date().toISOString().split('T')[0],
        coursesCompleted: 0,
        totalHours: 0,
        avatar: null
      };
      setUsers([user, ...users]);
    }

    // Reset form
    setNewUser({
      name: '',
      email: '',
      role: 'Student',
      department: '',
      status: 'Active'
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { 
        ...u, 
        status: u.status === 'Active' ? 'Inactive' : 'Active' 
      } : u
    ));
  };

  // Effect to populate form when editing
  React.useEffect(() => {
    if (editingUser) {
      setNewUser({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        department: editingUser.department,
        status: editingUser.status
      });
    }
  }, [editingUser]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('userManagement')}</h1>
              <p className="text-gray-600">{t('manageUsersRolesPermissions')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('addUser')}
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('userStatistics')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('totalUsers')}</p>
            <p className="text-2xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('activeUsers')}</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'Active').length}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('instructors')}</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'Instructor').length}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserX className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{t('inactiveUsers')}</p>
            <p className="text-2xl font-bold text-orange-600">
              {users.filter(u => u.status === 'Inactive').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchUsersByNameEmail')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('user')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('department')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('lastLogin')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('progress')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.coursesCompleted} {t('courses')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.totalHours} {t('hours')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title={t('viewDetails')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`transition-colors ${
                          user.status === 'Active' 
                            ? 'text-green-600 hover:text-red-600' 
                            : 'text-red-600 hover:text-green-600'
                        }`}
                        title={user.status === 'Active' ? t('deactivate') : t('activate')}
                      >
                        {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                      setEditingUser(user);
                      setIsCreateModalOpen(true);
                    }}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title={t('editUser')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title={t('deleteUser')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('userDetails')}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-blue-600">
                    {getInitials(selectedUser.name)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('role')}</label>
                  <span className={`px-3 py-1 text-sm rounded-full ${getRoleStyle(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('status')}</label>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('department')}</label>
                  <p className="text-gray-900">{selectedUser.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('joinDate')}</label>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('lastLogin')}</label>
                  <p className="text-gray-900">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('coursesCompleted')}</label>
                  <p className="text-gray-900">{selectedUser.coursesCompleted}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-3">{t('learningProgress')}</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">{t('coursesCompleted')}</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedUser.coursesCompleted}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">{t('totalHours')}</p>
                    <p className="text-2xl font-bold text-green-900">{selectedUser.totalHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    {editingUser ? t('editUser') : t('addNewUser')}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {editingUser ? t('updateUserInformation') : t('createNewUserAccount')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingUser(null);
                  setNewUser({
                    name: '',
                    email: '',
                    role: 'Student',
                    department: '',
                    status: 'Active'
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')}</label>
                <input 
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('enterFullName')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')}</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('enterEmailAddress')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('role')}</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Student">{t('student')}</option>
                    <option value="Instructor">{t('instructor')}</option>
                    <option value="Admin">{t('admin')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('status')}</label>
                  <select 
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Active">{t('active')}</option>
                    <option value="Inactive">{t('inactive')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('department')}</label>
                <input 
                  type="text" 
                  value={newUser.department}
                  onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t('enterDepartment')}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleCreateUser}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingUser ? t('updateUser') : t('createUser')}
              </button>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
