<template>
  <div class="dashboard-container">
    <!-- 1) Sidebar -->
    <DashboardSidebar @logout="logout" />

    <!-- 2) Principal content -->
    <div class="dashboard-content">
      <div class="logo-container">
        <img class="burger-icon" src="../assets/logo.png" alt="Buzz Burguer">
        <h1 class="brand-title">Buzz Burguer</h1>
      </div>
    </div>

    <!-- 3) Banner -->
    <div class="banner-container">
      <p class="banner-text">
        ¡Bienvenido a Buzz Burguer! Disfruta de una experiencia deliciosa y única. ¡Gracias por visitarnos!
      </p>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';

export default {
  name: 'DashboardView',
  components: {
    DashboardSidebar
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.dashboard-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  text-align: center;
  animation: fadeIn 0.8s ease-out, bounce 1s ease-out;
}

.burger-icon {
  width: 350px;
  height: 350px;
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.7));
}

.brand-title {
  font-family: 'Arial Rounded MT Bold', sans-serif;
  font-size: 5rem;
  color: #2D3436;
  margin-top: 1.5rem;
  letter-spacing: 2px;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.banner-container {
  position: fixed;
  bottom: 0;
  left: 280px; 
  width: calc(100% - 250px);
  background: #f2f2f2;
  padding: 10px 0;
  overflow: hidden;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.banner-text {
  white-space: nowrap;
  display: inline-block;
  padding-left: 100%;
  animation: marquee 15s linear infinite;
  font-size: 1.2rem;
  color: #2D3436;
  font-weight: bold;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
