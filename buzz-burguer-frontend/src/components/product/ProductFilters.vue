<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Filtros de Productos</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>Nombre del producto:</label>
          <input
            type="text"
            v-model="filters.name"
            placeholder="Buscar por nombre..."
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Tipo de producto:</label>
          <select v-model="filters.type" class="form-input">
            <option value="">Todos los tipos</option>
            <option value="burger">Burger</option>
            <option value="condiments">Condiments</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div class="form-group">
          <label>Rango de precios:</label>
          <div class="price-range">
            <input
              type="number"
              v-model.number="filters.priceFrom"
              placeholder="Mínimo"
              class="form-input"
            />
            <span class="range-separator">-</span>
            <input
              type="number"
              v-model.number="filters.priceTo"
              placeholder="Máximo"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="filters.isPromotion"
              true-value="1"
              false-value="0"
              class="checkbox-input"
            />
            <span class="checkmark"></span>
            Mostrar solo en promoción
          </label>
        </div>

        <div class="form-group">
          <label>Ordenar por:</label>
          <div class="sort-group">
            <select v-model="filters.orderBy" class="form-input">
              <option value="">Seleccionar campo</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="type">Tipo</option>
              <option value="discount">Descuento</option>
            </select>
            <select v-model="filters.orderDirection" class="form-input">
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>

        <div class="button-group">
          <button @click="applyFilters" class="btn-save">Aplicar Filtros</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        name: '',
        type: '',
        priceFrom: null,
        priceTo: null,
        isPromotion: '0',
        orderBy: '',
        orderDirection: 'asc',
      },
    };
  },
  methods: {
    applyFilters() {
      const finalFilters = { ...this.filters };
      finalFilters.isPromotion = finalFilters.isPromotion === '1' ? 1 : 0;

      Object.keys(finalFilters).forEach((key) => {
        if (finalFilters[key] === '' || finalFilters[key] === null) {
          delete finalFilters[key];
        }
      });

      this.$emit('apply-filters', finalFilters);
    },
  },
};
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.modal-header h2 {
  color: #333;
  font-size: 1.5rem;
  margin: 0;
}

.modal-body {
  padding: 2rem 0rem 0rem 0rem; 
}

.form-group {
  margin-bottom: 2rem; 
}

@media (max-width: 480px) {
  .modal-header {
    padding: 1.25rem 1.5rem 0.75rem 1.5rem;
  }
  
  .modal-body {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.75rem;
  }
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

.form-group label {
  display: block;
  font-weight: 600;
  color: #444;
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #ff6600;
  box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
}

.price-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.range-separator {
  color: #666;
  padding: 0 0.5rem;
}

.sort-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.checkbox-group {
  margin: 1.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: 600;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 0.8rem;
  transition: all 0.3s ease;
}

.checkbox-input:checked ~ .checkmark {
  background-color: #ff6600;
  border-color: #ff6600;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked ~ .checkmark:after {
  display: block;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save {
  width: 100%;
  background-color: #ff5e62;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save:hover {
  background-color: #e25759;
}

@media (max-width: 480px) {
  .modal-card {
    padding: 1.5rem;
  }
  
  .sort-group {
    grid-template-columns: 1fr;
  }
  
  .price-range {
    flex-direction: column;
  }
  
  .range-separator {
    display: none;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>