<template>
  <header class="header">
    <div class="container">
      <nav class="nav-left">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>

      <nav class="nav-right">
        <a href="#" class="nav-link login">Đăng nhập</a>
        <a href="#" class="nav-link signup">Đăng ký</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  width: auto;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100vw; 
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}
.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  margin: 0 15px;
  position: relative;
  transition: color 0.3s ease;
  padding: 6px 0;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link.login {
  color: #007bff;
  font-weight: 600;
  border: 1.5px solid #007bff;
  padding: 6px 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link.login:hover {
  background-color: #007bff;
  color: white;
}

.nav-link.signup {
  color: white;
  background-color: #28a745;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 5px;
  margin-left: 12px;
  transition: background-color 0.3s ease;
}

.nav-link.signup:hover {
  background-color: #218838;
}
</style>
