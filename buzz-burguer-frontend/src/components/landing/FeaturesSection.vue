<template>
  <section class="features">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      <div class="feature-rows">
        
        <!-- 1) FeatureRow component -->
        <FeatureRow v-for="(feature, index) in features" 
                    :key="index"
                    v-bind="feature" />
      </div>
    </div>
  </section>
</template>
  
<script>
import FeatureRow from './FeatureRow.vue'
  
  export default {
    components: { FeatureRow },
    props: {
      title: String,
      features: Array
    }
  }
</script>
  
<style scoped>
.features {
  padding: 6rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 4rem;
  color: #2d3436;
}

.feature-rows {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
</style>