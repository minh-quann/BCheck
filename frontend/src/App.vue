<template>
  <Header />
  <Home />
  <Footer />
</template>

<script>
import Home from './views/Home.vue';
import Footer from './components/Footer.vue';
import Header  from './components/Header.vue';

export default {
  components: { Home, Header , Footer },
};
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>