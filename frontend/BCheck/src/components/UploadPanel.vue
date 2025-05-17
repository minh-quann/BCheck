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
      />
    </div>

    <button 
      class="btn btn-primary" 
      @click="submit" 
      :disabled="!file"
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
      file: null,
    };
  },
  methods: {
  handleFile(event) {
    this.file = event.target.files[0];
  },
  async submit() {
    const formData = new FormData();
    formData.append('image', this.file);
    try {
      await axios.post(this.endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`${this.title} upload thành công!`);
      this.file = null;
    } catch (err) {
      console.error(err);
      alert(`${this.title} upload thất bại.`);
    }
  },
  async analyze() {
    try {
      await axios.post('http://localhost:3000/analyze-hdtt');
      alert('Gửi ảnh hdtt lên n8n thành công!');
      } catch (err) {
      console.error(err);
      alert('Gửi ảnh hdtt thất bại.');
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
