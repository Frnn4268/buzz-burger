<template>
  <div class="products-section">
    <div v-if="products.length === 0" class="empty-state">
      🍔 No hay productos disponibles
    </div>
    
    <div v-else class="table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="prod in paginatedProducts"
            :key="prod._id"
            @click="viewProduct(prod._id)"
            class="table-row"
          >
            <td>{{ prod.name }}</td>
            <td>{{ prod.type }}</td>
            <td>{{ formatCurrency(prod.price) }}</td>
            <td>
              <img v-if="prod.image" :src="prod.image" class="product-image" alt="Imagen del producto" />
              <span v-else>-</span>
            </td>
            <td>
              <span class="promo-badge" :class="{ 'active': prod.isPromotion }">
                {{ prod.isPromotion ? 'Activa' : 'Inactiva' }}
              </span>
            </td>
            <td>{{ formatCurrency(prod.discount) }}</td>
            <td class="actions-cell">
              <button class="icon-button edit" @click.stop="editProduct(prod)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
              <button class="icon-button delete" @click.stop="deleteProduct(prod._id)">
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
  name: 'ProductsTable',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    paginatedProducts: {
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
      headers: ['Nombre', 'Tipo', 'Precio', 'Imagen', 'Promoción', 'Descuento', 'Acciones']
    }
  },
  methods: {
    viewProduct(id) {
      this.$emit('view-product', id);
    },
    editProduct(prod) {
      this.$emit('edit-product', prod);
    },
    deleteProduct(id) {
      this.$emit('delete-product', id);
    },
    formatCurrency(value) {
      return 'Q' + parseFloat(value).toFixed(2);
    }
  }
};
</script>

<style scoped>
.products-section {
  margin-top: 2rem;
  padding: 0 1.5rem;
}

.section-title {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.table-container {
  overflow-x: auto;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.product-table th {
  background:  rgba(255, 94, 98, 0.9);
  color: white;
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.product-table td {
  padding: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 152, 102, 0.08);
  box-shadow: 3px 0 8px rgba(255, 94, 98, 0.1);
  cursor: pointer;
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
  color: #4CAF50;
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
  box-shadow: 0 5px 15px rgba(255, 94, 98, 0.3);
}

.page-indicator {
  color: #666;
  font-weight: 500;
  min-width: 140px;
  text-align: center;
  font-size: 0.95rem;
}

.product-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.product-image:hover {
  transform: scale(1.8);
  margin-top: 8px;
}

.promo-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
}

.promo-badge.active {
  background: rgba(76, 175, 80, 0.15);
  color: #4CAF50;
}

@media (max-width: 768px) {
  .products-section {
    padding: 0 1rem;
  }

  .product-table th,
  .product-table td {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .headers {
    display: none;
  }

  .product-table tr {
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
</style>