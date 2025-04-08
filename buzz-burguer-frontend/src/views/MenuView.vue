<template>
  <div class="dashboard-container">
    <!-- 1) Menu Sidebar -->
    <MenuSidebar @logout="logout" />
    
    <div class="dashboard-content">
      <div class="menu-card">
        <div class="menu-header">
          <h2 class="menu-title">🍔 Nuestro Menú Delicioso</h2>
          <p class="menu-subtitle">Selecciona tu favorito</p>
        </div>

        <div class="products-grid">
          <div 
            v-for="product in products" 
            :key="product._id" 
            class="product-card"
            @click="viewProduct(product._id)"
          >
            <div class="product-image-container">
              <div class="image-overlay"></div>
              <img 
                :src="product.image || '/placeholder-food.jpg'" 
                :alt="product.name" 
                class="product-image"
              />
              <span class="product-type">{{ product.type }}</span>
            </div>
            
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <div class="price-container">
                <span class="product-price">Q{{ product.price.toFixed(2) }}</span>
                <span class="promo-badge" v-if="product.isPromotion">
                  <span class="fire-icon">🔥</span> Promo!
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2) Product detail modal -->
        <ProductDetailModal
          :visible="showProductDetails"
          :product="selectedProductDetails"
          @close="showProductDetails = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import MenuSidebar from '@/components/menu/MenuSidebar.vue';
  import ProductDetailModal from '@/components/product/ProductDetailModal.vue';

  import productService from '@/services/product.service';
  
  export default {
    name: 'MenuView',
    components: {
      MenuSidebar,
      ProductDetailModal
    },
    data() {
      return {
        products: [],
        selectedProductDetails: null,
        showProductDetails: false
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
    methods: {
      async loadProducts() {
        try {
          const response = await productService.getProducts();
          this.products = response.data;
        } catch (error) {
          console.error("Error al cargar productos:", error);
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      async viewProduct(id) {
        try {
          const response = await productService.getProduct(id);
          this.selectedProductDetails = response.data;
          this.showProductDetails = true;
        } catch (error) {
          console.error('Error al obtener producto:', error);
        }
      }
    }
  };
</script>
  
<style scoped>
.dashboard-container {
  display: flex;
  background: #f8f9fa;
}

.dashboard-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f8f9fa, #ffffff);
}

.menu-card {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.menu-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  border-radius: 15px;
  color: white;
}

.menu-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 1rem;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid #f0f0f0;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.product-image-container {
  height: 250px;
  overflow: hidden;
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%);
  z-index: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-type {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ff6b6b;
  z-index: 2;
  backdrop-filter: blur(4px);
  text-transform: capitalize;
}

.product-info {
  padding: 1.5rem;
}

.product-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  color: #2d3436;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.6rem;
  color: #2ecc71;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.promo-badge {
  position: relative;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  animation: flameAnimation 1.2s infinite alternate;
  overflow: hidden;
  transform: translateZ(0);
}

.promo-badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(255,255,255,0.1) 25%,
    transparent 50%,
    rgba(255,255,255,0.1) 75%
  );
  transform: rotate(45deg);
  animation: flameGlow 2s infinite linear;
}

@keyframes flameAnimation {
  0% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 5px rgba(255,107,107,0.5);
  }
  50% {
    transform: translateY(-2px) scale(1.05);
    text-shadow: 0 0 15px rgba(255,107,107,0.8);
  }
  100% {
    transform: translateY(0) scale(1);
    text-shadow: 0 0 5px rgba(255,107,107,0.5);
  }
}

@keyframes flameGlow {
  0% {
    transform: rotate(45deg) translateX(-50%);
  }
  100% {
    transform: rotate(45deg) translateX(50%);
  }
}

.promo-badge::after {
  content: '🔥';
  display: inline-block;
  margin-right: 0.3rem;
  animation: fireFlicker 0.1s infinite alternate;
}

.fire-icon {
  display: inline-block;
  animation: fireFlicker 0.1s infinite alternate;
  transform-origin: center bottom;
}

.promo-badge {
  box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
}

.promo-badge:hover {
  animation: flameAnimation 0.5s infinite alternate;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);
}

@keyframes fireFlicker {
  0% {
    transform: rotate(-5deg) scale(1.2);
  }
  25% {
    transform: rotate(5deg) scale(1.3);
  }
  50% {
    transform: rotate(-3deg) scale(1.25);
  }
  75% {
    transform: rotate(3deg) scale(1.3);
  }
  100% {
    transform: rotate(0deg) scale(1.2);
  }
}

@media (max-width: 1200px) {
  .menu-card {
    padding: 1.5rem;
  }
  
  .products-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
  }

  .menu-title {
    font-size: 2.2rem;
  }

  .product-image-container {
    height: 200px;
  }

  .product-type {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
  }
}

@media (max-width: 480px) {
  .menu-header {
    padding: 1.5rem 0;
  }

  .menu-title {
    font-size: 1.8rem;
  }

  .menu-subtitle {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>