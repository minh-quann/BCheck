<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <UploadPanel title="Hóa đơn yêu cầu thanh toán" endpoint="https://nhomvungtrom2.app.n8n.cloud/webhook-test/upload1" />
      </div>
      <div class="col-md-6">
        <UploadPanel title="Hóa đơn chuyển khoản" endpoint="http://localhost:3000/upload-origin" />
      </div>
    </div>
    
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  margin-top: 60px;
  padding: 20px;
}
</style>
