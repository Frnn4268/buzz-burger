<template>
  <div class="login-content">
    <div class="form-header">
      <h2>Iniciar Sesión</h2>
      <p>Accede a tu cuenta para continuar</p>
    </div>
    
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input type="email" v-model="email" required />
        <label>Correo electrónico</label>
        <span class="input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
          </svg>
        </span>
      </div>
      
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" required />
        <label>Contraseña</label>
        <span class="input-icon" @click="showPassword = !showPassword">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </span>
      </div>
      
      <button type="submit" class="login-button">
        <span>Entrar</span>
        <svg class="arrow-icon" viewBox="0 0 24 24">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
      </button>
      
      <p v-if="errorMessage" class="error">
        <svg class="error-icon" viewBox="0 0 24 24">
          <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
        {{ errorMessage }}
      </p>
      
      <div class="auth-options">
        <router-link to="/forgot-password" class="forgot-password">
          ¿Olvidaste tu contraseña?
        </router-link>
        
        <p class="register-text">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate aquí</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authService from '@/services/auth.service';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showPassword: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await authService.login(this.email, this.password);
        
        // Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect
        this.$router.push('/dashboard');
        
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      }
    }
  }
};
</script>

<style scoped>
.login-content {
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 400px; 
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h2 {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #636e72;
  font-size: 0.95rem;
}

form {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-group label {
  position: absolute;
  left: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #636e72;
  pointer-events: none;
  transition: all 0.3s ease;
  background: white;
  padding: 0 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 15px 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus,
.input-group input:valid {
  border-color: #ff6600;
  outline: none;
}

.input-group input:focus ~ label,
.input-group input:valid ~ label {
  top: 0;
  font-size: 0.8rem;
  color: #ff6600;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #636e72;
  cursor: pointer;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.login-button {
  width: 100%;
  background: #f55260;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #e63946;
  box-shadow: 0 5px 15px rgba(255, 102, 0, 0.3);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.error {
  color: #dc3545;
  font-size: 0.9rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: #fee;
  border-radius: 6px;
}

.error-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.auth-options {
  margin-top: 2rem;
  text-align: center;
}

.forgot-password {
  color: #636e72;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #ff6600;
}

.register-text {
  margin-top: 1rem;
  color: #636e72;
}

.register-text a {
  color: #ff6600;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.register-text a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-content {
    min-width: unset;
    width: 100%;
    padding: 2rem 1.5rem;
  }
  
  .input-group input {
    padding: 12px 2.5rem;
  }
}
</style>