<template>
  <div class="home-container text-center">
    <div class="welcome-box shadow p-5 rounded">
      <h1 class="display-4 text-primary mb-4">Chào mừng đến với Hệ thống Quản lý Công tác</h1>
      <p class="lead mb-4">
        Đây là nơi bạn có thể gửi và kiểm tra các bộ chứng từ thanh toán cho các chuyến công tác một cách nhanh chóng và tiện lợi.
      </p>
      <router-link to="/upload" class="btn btn-primary btn-lg">
        Bắt đầu sử dụng
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.welcome-box {
  background-color: #ffffff;
  max-width: 700px;
}
</style>
