<template>
  <div class="dashboard-controls">
    <div class="controls-container">
      <button @click="newProduct" class="icon-button new-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <span>Nuevo</span>
      </button>
      
      <button @click="toggleFilters" class="icon-button filter-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
        <span>Filtrar</span>
      </button>
    </div>

    <!-- 1) Filters modal component -->
    <div v-if="showFiltersModal" class="filters-modal-container">
      <div class="filters-modal">
        <ProductFilters 
          @apply-filters="$emit('apply-filters', $event)"
          @close="toggleFilters" 
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import ProductFilters from '@/components/product/ProductFilters.vue';

export default {
  name: 'ProductControls',
  components: { ProductFilters },
  props: {
    showFiltersModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    newProduct() {
      this.$emit('open-create-form');
    },
    toggleFilters() {
      this.$emit('toggle-filters');
    }
  }
};
</script>
  
<style scoped>
.dashboard-controls {
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 100;
}

.controls-container {
  display: flex;
  gap: 0.8rem;
  background: #fff;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.new-button {
  background: #ff5e62;
  color: white;
  box-shadow: 0 2px 4px rgba(255, 107, 53, 0.2);
}

.new-button:hover {
  background: #e25759;
  box-shadow: 0 4px 8px rgba(255, 87, 34, 0.3);
}

.filter-button {
  background: #3F88C5;
  color: white;
  box-shadow: 0 2px 4px rgba(63, 136, 197, 0.2);
}

.filter-button:hover {
  background: #2A6BA5;
  box-shadow: 0 4px 8px rgba(42, 107, 165, 0.3);
}

.icon {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}

.icon-button:hover .icon {
  transform: scale(1.1);
}

.filters-modal {
  position: absolute;
  right: 0;
  top: calc(100% + 1rem);
  width: 320px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  padding: 1.5rem;
  animation: slideDown 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  padding: 0.3rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #FF6B35;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .dashboard-controls {
    right: 1rem;
    top: 1rem;
  }
  
  .icon-button span {
    display: none;
  }
  
  .icon-button {
    padding: 0.6rem;
  }
  
  .filters-modal {
    width: 280px;
    right: -1rem;
  }
}
</style>