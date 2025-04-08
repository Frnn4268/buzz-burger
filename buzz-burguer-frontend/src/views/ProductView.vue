<template>
  <div class="dashboard-container">
    <!-- 1) Sidebar -->
    <DashboardSidebar @logout="logout" />
  
    <!-- 2) Principal content -->
    <div class="dashboard-content">
      <div class="dashboard-card">
  
        <!-- 3) Controls (button and filters modal) -->
        <ProductControls
          :showFiltersModal="showFiltersModal"
          @toggle-filters="toggleFilters"
          @open-create-form="openCreateForm"
          @apply-filters="applyFilters"
        />
  
        <!-- 4) Form to create/edit products -->
        <div v-if="showCreateForm" class="form-container">
          <ProductForm
            :product="selectedProduct"
            @save="handleSaveProduct"
            @cancel="handleCancel"
          />
        </div>
  
        <!-- 5) Products table -->
        <ProductsTable
          :products="products"
          :paginatedProducts="paginatedProducts"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @view-product="viewProduct"
          @edit-product="editProduct"
          @delete-product="deleteProduct"
          @prev-page="currentPage--"
          @next-page="currentPage++"
        />
  
        <!-- 7) Product detail modal -->
        <ProductDetailModal
          :visible="showProductDetails"
          :product="selectedProductDetails"
          @close="showProductDetails = false"
        />
  
        <!-- 8) Delete confirmation modal -->
        <div v-if="showDeleteConfirmation" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-header">
              <h2>Confirmar Eliminación</h2>
              <button class="close-button" @click="cancelDelete">&times;</button>
            </div>
            <div class="modal-body">
              <p>¿Estás seguro que deseas eliminar este producto?</p>
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
import ProductControls from '@/components/product/ProductControls.vue';
import ProductsTable from '@/components/product/ProductsTable.vue';
import ProductDetailModal from '@/components/product/ProductDetailModal.vue';
import ProductForm from '@/components/product/ProductForm.vue';

import productService from '@/services/product.service';
  
export default {
  name: 'ProductView',
  components: {
    DashboardSidebar,
    ProductControls,
    ProductsTable,
    ProductForm,
    ProductDetailModal,
  },
  data() {
    return {
      products: [],
      showCreateForm: false,
      selectedProduct: null,
      selectedProductDetails: null,
      showProductDetails: false,
      showFiltersModal: false,
      filters: {},
      currentPage: 1,
      itemsPerPage: 5,
      showDeleteConfirmation: false,
      maybeDeleteId: null
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    } else {
      this.loadProducts();
    }
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    }
  },
  watch: {
    products() {
      this.currentPage = 1;
    }
  },
  methods: {
    async loadProducts(filters = {}) {
      try {
        const response = await productService.getProducts(filters);
        this.products = response.data;
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    toggleFilters() {
      this.showFiltersModal = !this.showFiltersModal;
    },
    openCreateForm() {
      this.selectedProduct = null;
      this.showCreateForm = true;
    },
    editProduct(prod) {
      this.selectedProduct = { ...prod };
      this.showCreateForm = true;
    },
    deleteProduct(id) {
      this.maybeDeleteId = id;
      this.showDeleteConfirmation = true;
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
      this.maybeDeleteId = null;
    },
    async confirmDelete() {
      try {
        await productService.deleteProduct(this.maybeDeleteId);
        this.loadProducts(this.filters);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      } finally {
        this.cancelDelete();
      }
    },
    async viewProduct(id) {
      try {
        const response = await productService.getProduct(id);
        this.selectedProductDetails = response.data;
        this.showProductDetails = true;
      } catch (error) {
        console.error('Error al obtener producto:', error);
      }
    },
    handleSaveProduct() {
      this.selectedProduct = null;
      this.showCreateForm = false;
      this.loadProducts(this.filters);
    },
    handleCancel() {
      this.selectedProduct = null;
      this.showCreateForm = false;
    },
    applyFilters(newFilters) {
      this.filters = newFilters;
      this.currentPage = 1;
      this.loadProducts(newFilters);
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

.dashboard-h2 {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
  font-size: 26px;
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