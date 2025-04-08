<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="brand">
        <img src="../../assets/logo.png" alt="Logo Buzz Burguer" class="brand-icon">
          Buzz Burguer
      </h1>
    </div>

    <div class="sidebar-nav">
      <button class="nav-button" @click="goToDashboard">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10 0h6v6h-6v-6zm0-10h6v6h-6V4z"/>
        </svg>
        <span class="button-text">Dashboard</span>
      </button>

      <button class="nav-button" @click="goToProducts">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 8h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm1 2v9h12v-9H6zm6 2a2 2 0 0 1 1.001 3.732L13 16h-2v-2.268A2 2 0 0 1 12 12z"/>
        </svg>
        <span class="button-text">Productos</span>
      </button>

      <button class="nav-button" @click="goToUsers">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 3a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3h-1zm-7 0h-1a3 3 0 0 0-3 3v2h8v-2a3 3 0 0 0-3-3zM5 14a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h1z"/>
        </svg>
        <span class="button-text">Usuarios</span>
      </button>
    </div>

    <div class="sidebar-content">
      <button class="logout-button" @click="handleLogout">
        <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span class="logout-text">Cerrar sesión</span>
      </button>
    </div>
  </aside>
</template>
  
<script>
export default {
  name: 'DashboardSidebar',
  methods: {
    handleLogout() {
      this.$emit('logout');
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goToProducts() {
      this.$router.push('/products');
    },
    goToUsers() {
      this.$router.push('/users');
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  background: linear-gradient(135deg, #e63946 0%, #ff686a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 0 0 0 0;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 2rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  margin: 0 1.5rem;
}

.sidebar-nav {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .nav-button {
    padding: 1rem;
    justify-content: center;
  }

  .button-text {
    display: none;
  }

  .nav-button:first-child:after {
    content: "🍔";
    font-size: 1.4rem;
  }

  .nav-button:last-child:after {
    content: "👤";
    font-size: 1.4rem;
  }
  
  .nav-icon {
    display: none;
  }
}

.brand {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.brand-icon {
  width: 32px;
  height: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand:hover .brand-icon {
  transform: rotate(15deg) scale(1.1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.logout-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.logout-button:hover .logout-icon {
  transform: translateX(3px);
}

.logout-text {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
    border-radius: 0 15px 15px 0;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
  
  .brand {
    font-size: 0;
    justify-content: center;
  }
  
  .brand:after {
    content: "FB";
    font-size: 1.4rem;
    letter-spacing: 1px;
  }
  
  .brand-icon {
    display: none;
  }
  
  .logout-button {
    padding: 1rem;
    justify-content: center;
  }
  
  .logout-text {
    display: none;
  }
  
  .logout-button:after {
    content: "🚪";
    font-size: 1.4rem;
    line-height: 1;
  }
}
</style>