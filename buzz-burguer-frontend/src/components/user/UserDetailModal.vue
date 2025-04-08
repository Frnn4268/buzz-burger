<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Detalles del Usuario</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body" v-if="user">
        <div class="detail-grid">
          <div class="detail-item glass-panel">
            <span class="detail-label">Nombre:</span>
            <span class="detail-value highlight">{{ user.name }}</span>
          </div>
          <div class="detail-item glass-panel">
            <span class="detail-label">Email:</span>
            <span class="detail-value email">{{ user.email }}</span>
          </div>
          <div class="detail-item glass-panel">
             <span class="detail-label">Rol:</span>
            <span class="detail-value role-badge">{{ user.role }}</span>
          </div>
          <div class="detail-item glass-panel">
            <span class="detail-label">Estatus:</span>
            <span class="detail-value status-badge" :class="'status-' + user.status.toLowerCase()">
              {{ user.status === 'active' ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="detail-item glass-panel">
            <span class="detail-label">Fecha de Creación:</span>
            <span class="detail-value">{{ formatDate(user.createdAt) }}</span>
          </div>
        </div>
      </div>
      <div class="modal-body" v-else>
        <p class="loading-text">Cargando detalles...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetailModal',
  props: {
    user: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  }
};
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  padding: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

.modal-header h2 {
  color: #333;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.close-button {
  background: none;
  border: none;
  font-size: 2.2rem;
  cursor: pointer;
  color: #ff5e62;
  line-height: 1;
  padding: 0 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.close-button:hover {
  color: #ff2d55;
  transform: rotate(90deg) scale(1.1);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.glass-panel {
  background: transparent;
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.detail-label {
  display: block;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.highlight {
  color: #3f51b5;
  font-size: 1.3rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.detail-value {
  font-size: 1.1rem;
  color: #444;
}

.email {
  color: #3f51b5;
  font-size: 1.1rem;
  font-weight: 600;
  word-break: break-all;
}
  
.role-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.15) 0%, rgba(101, 116, 205, 0.15) 100%);
  color: #3f51b5;
  font-weight: 600;
  text-transform: capitalize;
}
  
.status-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}
  
.status-badge.status-active {
  background: rgba(76, 175, 80, 0.15);
  color: #4CAF50;
}
  
.status-badge.status-inactive {
  background: rgba(255, 94, 98, 0.15);
  color: #ff5e62;
}

@media (max-width: 768px) {
  .modal-card {
    width: 95%;
    padding: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.4rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .glass-panel {
    padding: 1.2rem;
  }

  .highlight {
    font-size: 1.1rem;
  }

  .ingredient-tag {
    font-size: 0.8rem;
  }
}
</style>