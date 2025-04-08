<template>
  <div class="register-page">
    <!-- 1) Navbar -->
    <NavbarComponent />

    <!-- 2) Principal component content -->
    <div class="register-view">
      <div class="register-card">
        <div class="register-image">
          <div class="image-overlay">
            <h2>Únete a nuestra comunidad</h2>
            <p>Comienza a disfrutar de las mejores burgers artesanales</p>
          </div>
        </div>

        <!-- 3) Register form content -->
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';
import NavbarComponent from '@/components/landing/NavbarComponent.vue';

export default {
  name: 'RegisterView',
  components: {
    RegisterForm,
    NavbarComponent
  }
};
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e63946 0%, #ff686a 100%);
  padding-top: 5rem;
}

.register-card {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 1000px;
  height: 700px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.register-card:hover {
  transform: translateY(-5px);
}

.register-image {
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1550547660-d9450f859349');
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.image-overlay h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.image-overlay p {
  font-size: 1.2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .register-view {
    padding: 1rem;
  }
  
  .register-card {
    flex-direction: column;
    width: 100%;
    min-height: auto;
  }
  
  .register-image {
    height: 200px;
    border-radius: 20px 20px 0 0;
  }
  
  .image-overlay {
    justify-content: center;
    text-align: center;
    padding: 1rem;
  }
  
  .image-overlay h2 {
    font-size: 2rem;
  }
  
  .image-overlay p {
    font-size: 1rem;
  }
}
</style>