<template>
  <div class="page-wrapper">
    <main class="content">
      <!-- Nếu không có nội dung, đây sẽ là khoảng trống -->
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-column">
          <h3>Về chúng tôi</h3>
          <p>Công ty TNHH Mủ Cao Su chuyên thu mua và phân phối mủ cao su từ nông dân trên toàn quốc.</p>
        </div>

        <div class="footer-column">
          <h3>Liên hệ</h3>
          <p>123 Đường Cao Su, TP HCM</p>
          <p>0901 234 567</p>
          <p>info@mu-cao-su.vn</p>
        </div>

        <div class="footer-column">
          <h3>Chính sách</h3>
          <ul>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Hướng dẫn người dùng</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        &copy; 2025 Công ty TNHH Mủ Cao Su. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow-x: hidden; 
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  padding: 1rem; 
}

.footer {
  width: 100%;
  background-color: #1a1a1a;
  color: white;
  padding: 2rem 1rem;
  border-radius: 45px 45px 0 0;
  box-sizing: border-box;
}
.footer-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 24px;
  justify-content: space-between;
}

.footer-column {
  flex: 1 1 250px;
  min-width: 200px;
}

.footer-column h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #ffc107;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
}

.footer-column a {
  color: #ffffff;
  text-decoration: none;
}

.footer-column a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid #555;
  padding-top: 16px;
  font-size: 13px;
  color: #cccccc;
}
</style>
