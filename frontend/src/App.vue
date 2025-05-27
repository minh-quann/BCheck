<template>
  <div id="app">
    <Header />
    <div class="main-content">
      <router-view /> 
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
export default {
  components: { Header, Footer },
};
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
