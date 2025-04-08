<template>
  <div class="login-page">
    <!-- 1) Navbar -->
    <NavbarComponent />

    <!-- 2) Principal component content -->
    <div class="login-view">
      <div class="login-card">
        <div class="login-image">
          <div class="image-overlay">
            <h2>Bienvenido de vuelta</h2>
            <p>Descubre el auténtico sabor de las burgers artesanales</p>
          </div>
        </div>

        <!-- 3) Login form content -->
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/landing/NavbarComponent.vue';
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    NavbarComponent
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e63946 0%, #ff686a 100%);
  padding-top: 5rem;
}

.login-card {
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

.login-card:hover {
  transform: translateY(-5px);
}

.login-image {
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4');
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
  .login-view {
    padding: 1rem;
  }
  
  .login-card {
    flex-direction: column;
    width: 100%;
    min-height: auto;
  }
  
  .login-image {
    height: 200px;
    border-radius: 20px 20px 0 0;
  }
  
  .image-overlay {
    justify-content: center;
    text-align: center;
  }
  
  .image-overlay h2 {
    font-size: 2rem;
  }
}
</style>