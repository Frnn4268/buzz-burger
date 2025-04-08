<template>
  <div class="landing-page">
    <!-- 1) Navbar -->
    <NavbarComponent />
    
    <!-- 2) Hero section -->
    <HeroSection
      title="La Burger más suculenta del país"
      description="Disfruta de auténticas hamburguesas artesanales hechas con ingredientes premium"
      :buttons="[
        { text: 'Ver Menú', to: '/menu' },
        { text: 'Iniciar Sesión', to: '/login', outline: true }
      ]"
    />

    <!-- 3) Features section -->
    <FeaturesSection
      title="¿Por Qué Elegirnos?"
      :features="[
        {
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
          altText: 'Ingredientes premium',
          title: 'Ingredientes Premium',
          description: 'Carnes 100% argentinas, cuidadosamente seleccionadas por su sabor y calidad suprema, combinadas con vegetales frescos que realzan una experiencia gastronómica inigualable.',
          reverse: false,
          contentPosition: 'content-right'
        },
        {
          image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          altText: 'Chefs expertos',
          title: 'Recetas Únicas',
          description: 'Nuestros chefs expertos fusionan ingredientes selectos con técnicas culinarias innovadoras, creando combinaciones secretas que sorprenden y deleitan tu paladar.',
          reverse: true,
          contentPosition: 'content-left'
        },
        {
          image: 'https://images.unsplash.com/photo-1581873372796-635b67ca2008',
          altText: 'Delivery rápido',
          title: 'Delivery Express',
          description: 'Disfruta de tus hamburguesas en menos de 30 minutos, garantizando frescura y calidad en cada entrega. Si nos demoramos, ¡tu burger es gratis!',
          reverse: false,
          contentPosition: 'content-right'
        }
      ]"
    />
    
    <!-- 4) Footer -->
    <FooterComponent
      brand="Buzz Burger"
      copyright="Buzz Burguer © copyright 2025. All Rights Reserved."
      :links="[
        { text: 'Menú', to: '/menu' },
        { text: 'Términos', to: '/terms' }
      ]"
    />
  </div>
</template>

<script>
import NavbarComponent from '../components/landing/NavbarComponent.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import FooterComponent from '../components/landing/FooterComponent.vue'

export default {
  components: {
    NavbarComponent,
    HeroSection,
    FeaturesSection,
    FooterComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #fff;
  color: #333;
  line-height: 1.6;
}

.landing-page {
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}
</style>