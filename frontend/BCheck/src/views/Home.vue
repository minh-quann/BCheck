<template>
  <div class="container mt-5">
    <UploadPanel 
      title="Bộ chứng từ thanh toán" 
      endpoint="https://nhomvungtrom2.app.n8n.cloud/webhook-test/upload1" 
    />
  </div>
</template>

<script>
import UploadPanel from '@/components/UploadPanel.vue';

export default {
  components: {
    UploadPanel,
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
