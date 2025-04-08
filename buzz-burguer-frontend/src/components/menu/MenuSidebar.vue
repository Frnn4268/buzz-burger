<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="brand">
        <img src="../../assets/logo.png" alt="Logo Buzz Burguer" class="brand-icon">
        Buzz Burguer
      </h1>
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
  name: 'MenuSidebar',
  methods: {
    handleLogout() {
      this.$emit('logout');
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