<template>
  <div class="users-section">
    <div v-if="users.length === 0" class="empty-state">
      👤 No hay usuarios registrados
    </div>
    
    <div v-else class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers" 
            :key="user._id"
            class="table-row"
            @click="$emit('view-user', user._id)"
          >
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="user.role === 'admin' ? 'admin-badge' : 'user-badge'">
                {{ user.role }}
              </span>
            </td>
            <td @click.stop>
              <label class="status-switch" @click.stop>
                <input 
                  type="checkbox" 
                  :checked="user.status === 'active'"
                  @change.stop="toggleStatus(user)"
                >
                <span class="slider round"></span>
              </label>
            </td>
            <td class="actions-cell">
              <button class="icon-button delete" @click.stop="deleteUser(user._id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-controls">
        <button
          @click="$emit('prev-page')"
          :disabled="currentPage === 1"
          class="pagination-button"
        >
          Anterior
        </button>
        
        <span class="page-indicator">
          Página {{ currentPage }} de {{ totalPages }}
        </span>
        
        <button
          @click="$emit('next-page')"
          :disabled="currentPage >= totalPages"
          class="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: {
    users: {
      type: Array,
      default: () => []
    },
    paginatedUsers: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      headers: ['Nombre', 'Email', 'Rol', 'Estado', 'Acciones'],
      itemsPerPage: 6 
    }
  },
  methods: {
    toggleStatus(user) {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      this.$emit('edit-user-status', { ...user, status: newStatus });
    },
    deleteUser(id) {
      this.$emit('delete-user', id);
    }
  }
};
</script>
  
<style scoped>
.users-section {
  margin-top: 2rem;
  padding: 0 1.5rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.user-table th {
  background: rgba(255, 94, 98, 0.9);
  color: white;
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.user-table td {
  padding: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.table-row {
  cursor: pointer;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 152, 102, 0.08);
  box-shadow: 3px 0 8px rgba(63, 81, 181, 0.1);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  margin: 1rem 0;
}

.icon-button {
  border: none;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  margin: 0 0.3rem;
}

.icon-button svg {
  width: 20px;
  height: 20px;
}

.icon-button.edit {
  color: #3f51b5;
}

.icon-button.delete {
  color: #ff5e62;
}

.icon-button:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.pagination-button {
  background: #ff5e62;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.pagination-button:disabled {
  opacity: 0.6;
  background: linear-gradient(135deg, rgba(204, 204, 204, 0.9) 0%, rgba(170, 170, 170, 0.9) 100%);
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(63, 81, 181, 0.3);
}

.page-indicator {
  color: #666;
  font-weight: 500;
  min-width: 140px;
  text-align: center;
  font-size: 0.95rem;
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  text-transform: capitalize;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.admin-badge {
  background: rgba(76, 175, 80, 0.15);
  color: #4CAF50;
}

.user-badge {
  background: rgba(76, 102, 175, 0.15);
  color: #4c5baf;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.status-badge.active {
  background: rgba(76, 175, 80, 0.15);
  color: #4CAF50;
}

.status-badge.inactive {
  background: rgba(255, 94, 98, 0.15);
  color: #ff5e62;
}

@media (max-width: 768px) {
  .users-section {
    padding: 0 1rem;
  }

  .user-table th,
  .user-table td {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .user-table tr {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  .actions-cell {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }
}

.status-switch {
  position: relative;
  display: inline-block;
  cursor: default;
  width: 50px;
  height: 24px;
}

.status-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff5e62;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

@media (max-width: 768px) {
  .status-switch {
    width: 40px;
    height: 20px;
  }

  .slider:before {
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
}
</style>