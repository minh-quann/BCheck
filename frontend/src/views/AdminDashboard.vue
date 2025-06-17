<template>
  <div class="admin-dashboard">
    <div class="sidebar">
      <div class="logo">
        <h2>Admin Panel</h2>
      </div>
      <nav class="nav-menu">
        <a href="#" class="nav-item" :class="{ active: currentView === 'dashboard' }" @click="currentView = 'dashboard'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Dashboard
        </a>
        <a href="#" class="nav-item" :class="{ active: currentView === 'users' }" @click="currentView = 'users'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Users
        </a>
        <a href="#" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Documents
        </a>
        <a href="#" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Settings
        </a>
      </nav>
    </div>

    <div class="main-content">
      <header class="top-bar">
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="text" placeholder="Search...">
        </div>
        <div class="user-menu">
          <span class="notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="notification-badge">3</span>
          </span>
          <div class="user-profile" @click="toggleUserMenu">
            <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Admin User">
           
            <div class="user-menu-popup" v-if="showUserMenu">
              <div class="menu-header">
                <img src="https://ui-avatars.com/api/?name=Admin+User" alt="Admin User">
                <div class="user-info">
                  <h4>Admin User</h4>
                  <p>admin@example.com</p>
                </div>
              </div>
              <div class="menu-divider"></div>
              <a href="#" class="menu-item" @click="showChangePasswordModal = true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 7h3a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Đổi mật khẩu
              </a>
              <a href="#" class="menu-item" @click="handleLogout">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="dashboard-content">
        <UserManagement v-if="currentView === 'users'" />
        <div v-else>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon" style="background: #e3f2fd;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-info">
                <h3>Total Users</h3>
                <p class="stat-number">1,234</p>
                <p class="stat-change positive">+12% from last month</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: #e8f5e9;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 10l5 5 5-5" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 15V3" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-info">
                <h3>Documents</h3>
                <p class="stat-number">856</p>
                <p class="stat-change positive">+8% from last month</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: #fff3e0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v4l3 3" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-info">
                <h3>Pending Tasks</h3>
                <p class="stat-number">23</p>
                <p class="stat-change negative">-5% from last month</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: #fce4ec;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-info">
                <h3>Revenue</h3>
                <p class="stat-number">$12,345</p>
                <p class="stat-change positive">+15% from last month</p>
              </div>
            </div>
          </div>

          <div class="recent-activity">
            <h2>Recent Activity</h2>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon" style="background: #e3f2fd;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <p class="activity-text">New user registered</p>
                  <p class="activity-time">2 minutes ago</p>
                </div>
              </div>

              <div class="activity-item">
                <div class="activity-icon" style="background: #e8f5e9;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 10l5 5 5-5" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 15V3" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <p class="activity-text">New document uploaded</p>
                  <p class="activity-time">15 minutes ago</p>
                </div>
              </div>

              <div class="activity-item">
                <div class="activity-icon" style="background: #fff3e0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 3" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="activity-details">
                  <p class="activity-text">Task completed</p>
                  <p class="activity-time">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePasswordModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Đổi mật khẩu</h3>
          <button class="close-btn" @click="showChangePasswordModal = false">&times;</button>
        </div>
        
        <div class="modal-body">
          <div v-if="passwordError" class="error-message">
            {{ passwordError }}
          </div>
          <div v-if="passwordSuccess" class="success-message">
            {{ passwordSuccess }}
          </div>

          <div class="form-group">
            <label>Mật khẩu hiện tại</label>
            <input 
              type="password" 
              v-model="currentPassword"
              placeholder="Nhập mật khẩu hiện tại"
            >
          </div>

          <div class="form-group">
            <label>Mật khẩu mới</label>
            <input 
              type="password" 
              v-model="newPassword"
              placeholder="Nhập mật khẩu mới"
            >
          </div>

          <div class="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
            >
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="showChangePasswordModal = false">Hủy</button>
          <button class="submit-btn" @click="handleChangePassword">Đổi mật khẩu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import UserManagement from './UserManagement.vue'
import { logout } from '../services/authService'
import axios from '../plugins/axios'

const router = useRouter()
const currentView = ref('dashboard')
const showUserMenu = ref(false)
const showChangePasswordModal = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const passwordSuccess = ref('')

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  logout()
  router.push('/login')
}

const handleChangePassword = async () => {
  try {
    passwordError.value = ''
    passwordSuccess.value = ''

    // Validate passwords
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
      passwordError.value = 'Vui lòng điền đầy đủ thông tin'
      return
    }

    if (newPassword.value !== confirmPassword.value) {
      passwordError.value = 'Mật khẩu mới không khớp'
      return
    }

    if (newPassword.value.length < 6) {
      passwordError.value = 'Mật khẩu mới phải có ít nhất 6 ký tự'
      return
    }

    // Call API to change password
    const response = await axios.post('/users/change-password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    })

    if (response.data.message === 'Change password successful') {
      passwordSuccess.value = 'Đổi mật khẩu thành công'
      
      // Clear form and close modal after 2 seconds
      setTimeout(() => {
        showChangePasswordModal.value = false
        currentPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
        passwordSuccess.value = ''
      }, 2000)
    }
  } catch (error) {
    console.error('Change password error:', error)
    passwordError.value = error.response?.data?.message || 'Đổi mật khẩu thất bại'
  }
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  const userProfile = document.querySelector('.user-profile')
  if (userProfile && !userProfile.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 280px;
  background: white;
  padding: 24px;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}

.logo h2 {
  color: #1a1a1a;
  margin: 0 0 32px 0;
  font-size: 24px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f5f7fa;
  color: #1a1a1a;
}

.nav-item.active {
  background: #e3f2fd;
  color: #2196f3;
}

.main-content {
  flex: 1;
  padding: 24px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 300px;
}

.search-bar input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notifications {
  position: relative;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
}

.user-profile {
  position: relative;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-menu-popup {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  z-index: 1000;
  overflow: hidden;
}

.menu-header {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
}

.menu-header img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.user-info h4 {
  margin: 0;
  font-size: 16px;
  color: #1a1a1a;
}

.user-info p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
}

.menu-divider {
  height: 1px;
  background: #eee;
  margin: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #1a1a1a;
  text-decoration: none;
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f5f7fa;
}

.menu-item svg {
  color: #666;
}

.menu-item:last-child {
  color: #f44336;
}

.menu-item:last-child svg {
  color: #f44336;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.stat-number {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.stat-change {
  margin: 0;
  font-size: 14px;
}

.stat-change.positive {
  color: #4caf50;
}

.stat-change.negative {
  color: #f44336;
}

.recent-activity {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.recent-activity h2 {
  margin: 0 0 24px 0;
  font-size: 18px;
  color: #1a1a1a;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #f5f7fa;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-details {
  flex: 1;
}

.activity-text {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #1a1a1a;
}

.activity-time {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 0;
  line-height: 1;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1a1a1a;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus {
  border-color: #2196f3;
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.cancel-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:hover {
  background: #1976d2;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}

.success-message {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}
</style> 