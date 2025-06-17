<template>
  <div class="user-management">
    <div class="page-header">
      <h2>Quản lý người dùng</h2>
      <button class="add-user-btn" @click="showAddUserModal = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Thêm người dùng
      </button>
    </div>

    <div class="filters">
      <div class="search-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Tìm kiếm người dùng..."
          @input="handleSearch"
        >
      </div>
      <div class="filter-options">
        <select v-model="roleFilter" @change="handleFilter">
          <option value="">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select v-model="statusFilter" @change="handleFilter">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>
    </div>

    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>Người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="user-info">
              <img :src="user.avatar" :alt="user.name">
              <span>{{ user.name }}</span>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="user.role">
                {{ user.role === 'admin' ? 'Admin' : 'User' }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="user.status">
                {{ user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động' }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td class="actions">
              <button class="action-btn edit" @click="editUser(user)" title="Chỉnh sửa">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="action-btn delete" @click="deleteUser(user)" title="Xóa">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit User Modal -->
    <div class="modal" v-if="showAddUserModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới' }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveUser">
            <div class="form-group">
              <label>Tên người dùng</label>
              <input type="text" v-model="userForm.name" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="userForm.email" required>
            </div>
            <div class="form-group">
              <label>Vai trò</label>
              <select v-model="userForm.role" required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label>Trạng thái</label>
              <select v-model="userForm.status" required>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="cancel-btn" @click="closeModal">Hủy</button>
              <button type="submit" class="save-btn">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample data - Replace with actual API calls
const users = ref([
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  // Add more sample users as needed
])

const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const showAddUserModal = ref(false)
const editingUser = ref(null)
const userForm = ref({
  name: '',
  email: '',
  role: 'user',
  status: 'active'
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

const handleSearch = () => {
  // Implement search logic if needed
}

const handleFilter = () => {
  // Implement filter logic if needed
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const editUser = (user) => {
  editingUser.value = user
  userForm.value = { ...user }
  showAddUserModal.value = true
}

const deleteUser = async (user) => {
  if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
    // Implement delete logic
    users.value = users.value.filter(u => u.id !== user.id)
  }
}

const saveUser = async () => {
  if (editingUser.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    users.value[index] = { ...editingUser.value, ...userForm.value }
  } else {
    // Add new user
    const newUser = {
      id: users.value.length + 1,
      ...userForm.value,
      createdAt: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userForm.value.name)}`
    }
    users.value.push(newUser)
  }
  closeModal()
}

const closeModal = () => {
  showAddUserModal.value = false
  editingUser.value = null
  userForm.value = {
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  }
}
</script>

<style scoped>
.user-management {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: #1a1a1a;
}

.add-user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.add-user-btn:hover {
  background: #1976d2;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.search-box input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.filter-options {
  display: flex;
  gap: 12px;
}

.filter-options select {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.users-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 500;
  color: #666;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.role-badge, .status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.admin {
  background: #e3f2fd;
  color: #1976d2;
}

.role-badge.user {
  background: #f5f5f5;
  color: #666;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.inactive {
  background: #ffebee;
  color: #c62828;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.edit:hover {
  background: #bbdefb;
}

.action-btn.delete {
  background: #ffebee;
  color: #c62828;
}

.action-btn.delete:hover {
  background: #ffcdd2;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  border: none;
}

.cancel-btn:hover {
  background: #eee;
}

.save-btn {
  background: #2196f3;
  color: white;
  border: none;
}

.save-btn:hover {
  background: #1976d2;
}
</style> 