<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeOKZARPDYtQKvi1FTS5E2juGqIuubkGI0CwKhx2ZJSbsY448" 
                alt="Buzz Burger Logo" />
          Buzz Burger
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/login" class="login-btn">Iniciar Sesión</router-link>
      </div>
    </div>
  </nav>
</template>
  
<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
}

.logo a {
  font-size: 1.8rem;
  font-weight: 800;
  color: #e63946;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo a:hover {
  color: #d62828;
}

.logo img {
  width: 20px;
  height: auto;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-links a {
  color: #2d3436;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:not(.login-btn):hover {
  color: #e63946;
}

.nav-links a:not(.login-btn)::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #e63946;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.login-btn {
  background: #e63946;
  color: white !important;
  padding: 0.7rem 2rem;
  border-radius: 30px;
  transition: transform 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
}
</style>