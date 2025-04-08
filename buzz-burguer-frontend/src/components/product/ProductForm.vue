<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h2>{{ product && product._id ? 'Editar Producto' : 'Crear Producto' }}</h2>
        <button class="close-button" @click="$emit('cancel')">&times;</button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="localProduct.name" required 
                 class="form-input" placeholder="Ej: Hamburguesa Clásica" />
        </div>

        <div class="form-group">
          <label>Tipo:</label>
          <select v-model="localProduct.type" required class="form-input">
            <option disabled value="">Seleccione...</option>
            <option value="burger">Burger</option>
            <option value="condiments">Condiments</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div class="form-group">
          <label>Precio:</label>
          <input type="number" v-model.number="localProduct.price" required 
                 class="form-input" placeholder="Ej: 30.00" />
        </div>

        <div class="form-group">
          <label>Imagen (opcional):</label>
          <input type="text" v-model="localProduct.image" 
                 class="form-input" placeholder="URL de la imagen" />
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="localProduct.isPromotion" 
                   class="checkbox-input" />
            <span class="checkmark"></span>
            En Promoción
          </label>
        </div>

        <div class="form-group" v-if="localProduct.isPromotion">
          <label>Descuento:</label>
          <input type="number" v-model.number="localProduct.discount" 
                 class="form-input" placeholder="Porcentaje de descuento" />
        </div>

        <div class="form-group">
          <label>Ingredientes (separados por coma):</label>
          <input type="text" v-model="ingredientsInput" 
                 class="form-input" placeholder="Ej: Carne, Queso, Lechuga" />
        </div>

        <div class="button-group">
          <button type="submit" class="btn-save">Guardar</button>
          <button type="button" class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import productService from '@/services/product.service';

export default {
  name: 'ProductForm',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localProduct: {
        name: '',
        type: '',
        price: null,
        image: '',
        isPromotion: false,
        discount: null,
        ingredients: []
      },
      ingredientsInput: ''
    };
  },
  mounted() {
    if (this.product) {
      this.localProduct = { ...this.product };
      this.ingredientsInput = this.localProduct.ingredients.join(', ');
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const ingredientsArray = this.ingredientsInput
          .split(',')
          .map(item => item.trim())
          .filter((item, index, self) => item && self.indexOf(item) === index);

        const payload = {
          ...this.localProduct,
          ingredients: ingredientsArray,
          discount: this.localProduct.isPromotion ? 
            Number(this.localProduct.discount) || 0 : 
            null
        };

        if (!payload.isPromotion) {
          delete payload.discount;
        }

        const isEditing = !!payload._id;
        let response;

        if (isEditing) {
          // Call to editProduct with ID and payload
          response = await productService.editProduct(payload._id, payload);
        } else {
          // Call to createProduct only with payload
          response = await productService.createProduct(payload);
        }

        if (isEditing) {
          this.localProduct = { ...this.localProduct, ...response.data };
        }

        this.$emit('save');
        
      } catch (error) {
        console.error('Error guardando producto:', error);
        alert(`Error: ${error.response?.data?.message || 'Verifica los datos'}`);
      }
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
  z-index: 1000;
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

.modal-body {
  padding: 0.5rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
  margin-top: 1.4rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
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

.checkbox-group {
  margin: 1.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
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

.btn-save, .btn-cancel {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save {
  background-color: #ff5e62;
  color: white;
}

.btn-save:hover {
  background-color: #e25759;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background-color: #5a6268;
}

@media (max-width: 480px) {
  .button-group {
    flex-direction: column;
  }
  
  .btn-save, .btn-cancel {
    width: 100%;
  }
}
</style>