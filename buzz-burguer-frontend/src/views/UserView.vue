<template>
    <div class="dashboard-container">
      <!-- 1) Sidebar -->
      <DashboardSidebar @logout="logout" />
    
      <!-- 2) Principal Content -->
      <div class="dashboard-content">
        <div class="dashboard-card">
    
          <!-- 3) Controls (buttons and filter modals) -->
          <UserControls
            :showFiltersModal="showFiltersModal"
            @toggle-filters="toggleFilters"
            @open-create-form="openCreateForm"
            @apply-filters="applyFilters"
          />
    
          <!-- 5) Users Table -->
          <UsersTable
            :users="users"
            :paginatedUsers="paginatedUsers"
            :currentPage="currentPage"
            :totalPages="totalPages"
            @edit-user-status="editUserStatus"
            @delete-user="deleteUser"
            @prev-page="currentPage--"
            @next-page="currentPage++"
            @view-user="viewUser"
          />

          <!-- User detail modals -->
          <UserDetailModal
            :visible="showUserDetails"
            :user="selectedUserDetails"
            @close="showUserDetails = false"
          />
    
          <!-- 7) Delete confirmation modal -->
          <div v-if="showDeleteConfirmation" class="modal-overlay">
            <div class="modal-card">
              <div class="modal-header">
                <h2>Confirmar Eliminación</h2>
                <button class="close-button" @click="cancelDelete">&times;</button>
              </div>
              <div class="modal-body">
                <p>¿Estás seguro que deseas eliminar este usuario?</p>
                <div class="modal-actions">
                  <button @click="cancelDelete" class="cancel-button">Cancelar</button>
                  <button @click="confirmDelete" class="confirm-delete-button">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
  import UserControls from '@/components/user/UserControls.vue';
  import UsersTable from '@/components/user/UsersTable.vue';
  import UserDetailModal from '@/components/user/UserDetailModal.vue';

  import userService from '@/services/user.service';
  
  export default {
    name: 'UserView',
    components: {
      DashboardSidebar,
      UserControls,
      UsersTable,
      UserDetailModal
    },
    data() {
      return {
        users: [],
        showFiltersModal: false,
        filters: {},
        currentPage: 1,
        itemsPerPage: 6, 
        showDeleteConfirmation: false,
        maybeDeleteId: null,
        showUserDetails: false,
        selectedUserDetails: null
      };
    },
    created() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
      } else {
        this.loadUsers();
      }
    },
    computed: {
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.users.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.users.length / this.itemsPerPage);
      }
    },
    watch: {
      users() {
        this.currentPage = 1;
      }
    },
    methods: {
      async loadUsers(filters = {}) {
        try {
          const response = await userService.getUsers(filters);
          this.users = response.data;
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
        }
      },
      async viewUser(id) {
        try {
          this.showUserDetails = true; // Show modal inmediately
          const response = await userService.getUser(id);
          this.selectedUserDetails = response.data;
        } catch (error) {
          console.error('Error:', error);
          this.showUserDetails = false; // Hide modal if error occurs
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      toggleFilters() {
        this.showFiltersModal = !this.showFiltersModal;
      },
      async editUserStatus(user) {
        try {
          await userService.editUserStatus(user._id, { status: user.status });
          this.loadUsers(this.filters);
          this.showUserDetails = false; // Close modal after editing status
        } catch (error) {
          console.error('Error al actualizar estado:', error);
        }
      },
      deleteUser(id) {
        this.maybeDeleteId = id;
        this.showDeleteConfirmation = true;
      },
      cancelDelete() {
        this.showDeleteConfirmation = false;
        this.maybeDeleteId = null;
      },
      async confirmDelete() {
        try {
          await userService.deleteUser(this.maybeDeleteId);
          this.loadUsers(this.filters);
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
        } finally {
          this.cancelDelete();
        }
      },
      applyFilters(newFilters) {
        this.filters = newFilters;
        this.currentPage = 1;
        this.loadUsers(newFilters);
        this.showFiltersModal = false;
      }
    }
  };
</script>
  
<style scoped>
.dashboard-container {
  display: flex;
}
  
.dashboard-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  overflow-x: hidden;
  padding: 4rem;
}
  
.dashboard-card {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
}
  
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
  z-index: 1000;
}

.modal-card {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  padding: 2rem;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0 0.5rem;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.confirm-delete-button {
  background-color: #dc3545;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-delete-button:hover {
  background-color: #bb2d3b;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>