<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>{{ brand }}</h4>
          <p>{{ copyright }}</p>
        </div>
        <div class="footer-section">
          <h4>Enlaces</h4>
          <router-link v-for="(link, index) in links" 
                      :key="index"
                      :to="link.to">
            {{ link.text }}
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    props: {
      brand: String,
      copyright: String,
      links: Array
    }
  }
</script>
  
<style scoped>
.footer {
  background: #2d3436;
  color: white;
  padding: 4rem 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.footer-section {
  text-align: center;
  padding: 0 2rem;
}

.footer-section h4 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e63946;
  display: inline-block;
}

.footer-section a {
  color: #dfe6e9;
  text-decoration: none;
  display: block;
  margin: 0.8rem 0;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #e63946;
}
</style>