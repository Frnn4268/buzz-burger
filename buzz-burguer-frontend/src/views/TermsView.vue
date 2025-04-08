<template>
  <div class="terms-view">
    <NavbarComponent />
      
    <main class="terms-container">
      <h1 class="terms-title">Términos y Condiciones de Uso</h1>
      <div class="last-updated">Última actualización: {{ lastUpdated }}</div>
  
      <section class="terms-section glass-panel">
        <h2 class="section-title">1. Aceptación de los Términos</h2>
        <p class="section-content">
          Al acceder y utilizar los servicios de Buzz Burguer, usted acepta cumplir con estos términos y condiciones.
          Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
        </p>

        <h2 class="section-title">2. Uso del Servicio</h2>
        <p class="section-content">
          Nuestros servicios están disponibles únicamente para mayores de 18 años. Usted se compromete a:
        </p>
        <ul class="terms-list">
          <li>No utilizar nuestro servicio para fines ilegales o no autorizados</li>
          <li>No realizar pedidos fraudulentos</li>
          <li>Proporcionar información veraz y actualizada</li>
        </ul>

        <h2 class="section-title">3. Propiedad Intelectual</h2>
        <p class="section-content">
          Todos los contenidos de nuestro sitio web, incluyendo logos, imágenes y textos, son propiedad exclusiva
          de Buzz Burguer y están protegidos por leyes de derechos de autor.
        </p>

        <h2 class="section-title">4. Limitación de Responsabilidad</h2>
        <p class="section-content">
          Buzz Burguer no se hace responsable por:
        </p>
        <ul class="terms-list">
          <li>Daños derivados del uso incorrecto del servicio</li>
          <li>Interrupciones temporales del servicio por mantenimiento</li>
          <li>Eventos de fuerza mayor que impidan la entrega</li>
        </ul>

        <h2 class="section-title">5. Modificaciones</h2>
        <p class="section-content">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
          inmediatamente después de su publicación en esta página.
        </p>
      </section>
    </main>
  
    <footer class="terms-footer">
      <p>Buzz Burguer © copyright 2025. All Rights Reserved.</p>
    </footer>
  </div>
</template>
  
<script>
import NavbarComponent from '@/components/landing/NavbarComponent.vue';
  
export default {
  components: {
    NavbarComponent
  },
  data() {
    return {
      lastUpdated: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>
  
<style scoped>
.terms-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}
  
.terms-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  flex: 1;
}
  
.terms-title {
  text-align: center;
  color: #2D3436;
  margin-bottom: 1rem;
}
  
.last-updated {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}
  
.terms-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #FF5E62;
  margin-bottom: 1rem;
  margin-top: 2rem;
  font-size: 1.3rem;
}
  
.section-content {
  color: #555;
  line-height: 1.6;
}
  
.terms-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}
  
.terms-list li {
  margin-bottom: 0.5rem;
}
  
.contact-link {
  color: #FF5E62;
  text-decoration: none;
}
  
.contact-link:hover {
  text-decoration: underline;
}
  
.terms-footer {
  background: #2D3436;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
  
@media (max-width: 768px) {
  .terms-container {
    padding: 0 1rem;
  }
    
  .terms-title {
    font-size: 1.5rem;
  }
}
</style>