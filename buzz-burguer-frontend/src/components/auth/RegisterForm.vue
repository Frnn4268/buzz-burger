<template>
  <div class="register-content">
    <div class="form-header">
      <h2>Crear Cuenta</h2>
      <p>Regístrate para acceder a beneficios exclusivos</p>
    </div>
    
    <form @submit.prevent="handleRegister">
      <div class="input-group">
        <input type="text" v-model="name" required />
        <label>Nombre completo</label>
        <span class="input-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </span>
      </div>
      
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

      <div class="role-selection">
        <div class="role-option" 
             :class="{ active: role === 'user' }" 
             @click="role = 'user'">
          <svg class="role-icon" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>Cliente</span>
        </div>
        
        <div class="role-option" 
             :class="{ active: role === 'admin' }" 
             @click="role = 'admin'">
          <svg class="role-icon" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <span>Administrador</span>
        </div>
      </div>
      
      <button type="submit" class="register-button">
        <span>Crear Cuenta</span>
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
        <p class="login-text">
          ¿Ya tienes cuenta?
          <router-link to="/login">Inicia sesión</router-link>
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
      name: '',
      email: '',
      password: '',
      role: 'user',
      errorMessage: '',
      showPassword: false
    };
  },
  methods: {
    async handleRegister() {
      try {
        // Basic validation
        if (!this.name || !this.email || !this.password) {
          this.errorMessage = 'Todos los campos son obligatorios';
          return;
        }

        const response = await authService.register(
          this.name,
          this.email,
          this.password,
          this.role 
        );

        // Verify response structure
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = 'Error en el registro: Respuesta inesperada';
        }
        
      } catch (error) {
        // Detailed error handling
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Error en el registro';
        } else if (error.request) {
          this.errorMessage = 'No se pudo conectar al servidor';
        } else {
          this.errorMessage = 'Error inesperado';
        }
      }
    }
  }
};
</script>
  
<style scoped>
.register-content {
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

.role-selection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

.role-option {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.role-option:hover {
  border-color: #ff6600;
}

.role-option.active {
  border-color: #ff6600;
  background: rgba(0, 242, 254, 0.05);
}

.role-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.register-button {
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

.register-button:hover {
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

.login-text {
  margin-top: 2rem;
  color: #636e72;
  text-align: center;
}

.login-text a {
  color: #ff6600;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-text a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-content {
    min-width: unset;
    padding: 2rem 1.5rem;
  }
  
  .role-selection {
    grid-template-columns: 1fr;
  }
  
  .input-group input {
    padding: 12px 2.5rem;
  }
}
</style>