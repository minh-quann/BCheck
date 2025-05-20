<template>
  <div class="upload-panel card shadow-sm p-4 mb-4">
    <h2 class="card-title mb-3 text-primary">{{ title }}</h2>

    <div class="mb-3">
      <label class="form-label">Chọn ảnh hóa đơn</label>
      <input 
        type="file" 
        accept="image/*" 
        class="form-control" 
        @change="handleFile"
        multiple
      />
    </div>

    <button 
  class="btn btn-primary" 
  @click="submit" 
  :disabled="!files.length"
>
  Gửi
</button>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadPanel',
  props: {
    title: String,
    endpoint: String,
  },
  data() {
    return {
      files: [], 
    };
  },
  methods: {
    handleFile(event) {
      this.files = Array.from(event.target.files);
    },
    async submit() {
      if (!this.files.length) return;

      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('image', file);
      });

      try {
        await axios.post(this.endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(`${this.title} upload thành công!`);
        this.files = [];
      } catch (err) {
        console.error(err);
        alert(`${this.title} upload thất bại.`);
      }
    },
  },
};
</script>

<style scoped>
.upload-panel {
  width: 480px; 
  height: auto; 
  max-width: 480px; 
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box; 
}

.upload-panel .form-label,
.upload-panel .form-control,
.upload-panel .btn {
  width: 100%; 
}

</style>
