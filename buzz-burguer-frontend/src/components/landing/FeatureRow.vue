<template>
  <div class="feature-row" :class="{ reverse: reverse }">
    <div class="feature-image">
      <img :src="image" :alt="altText">
    </div>
    <div class="feature-content" :class="contentPosition">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
  
<script>
  export default {
    props: {
      image: String,
      altText: String,
      title: String,
      description: String,
      reverse: Boolean,
      contentPosition: String
    }
  }
</script>
  
<style scoped>
  .feature-row {
  display: flex;
  align-items: center;
  gap: 4rem;
  min-height: 400px;
}

.feature-row.reverse {
  flex-direction: row-reverse;
}

.feature-image {
  flex: 1;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-image:hover {
  transform: scale(1.02);
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-content {
  flex: 1;
  padding: 2rem;
}

.feature-content h3 {
  font-size: 2.5rem;
  color: #e63946;
  margin-bottom: 1.5rem;
}

.feature-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  max-width: 500px;
}

.content-right { 
  margin-left: auto; 
}

.content-left { 
  margin-right: auto; 
}
</style>