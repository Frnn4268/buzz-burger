<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <div class="cta-buttons">
          <router-link v-for="(btn, index) in buttons" 
                      :key="index"
                      :to="btn.to" 
                      :class="['cta-btn', btn.outline ? 'outline' : '']">
            {{ btn.text }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
  export default {
    props: {
      title: String,
      description: String,
      buttons: Array
    }
  }
</script>
  
<style scoped>
.hero {
  padding: 8rem 0 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.cta-btn {
  padding: 1.2rem 2.5rem;
  background: #e63946;
  color: white;
  border: none;
  border-radius: 35px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
}

.cta-btn.outline {
  background: transparent;
  border: 2px solid white;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.cta-btn.outline:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>