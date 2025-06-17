<template>
  <div id="app">
    <Header v-if="!isAdminRoute" />
    <div class="main-content">
      <router-view /> 
    </div>
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAdminRoute = computed(() => {
  return route.path.includes('/admin');
});
</script>

<style>
html,body,#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
