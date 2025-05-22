<template>
  <div class="upload-panel card shadow p-5 mb-5">
    <h2 class="card-title mb-4 text-primary text-center">{{ title }}</h2>
    <div class="card info-section p-4 mb-4 shadow-sm">
      <h5 class="mb-3">Thông tin chuyến công tác</h5>

      <div class="mb-3">
        <label class="form-label">Chuyến công tác</label>
        <input type="text" class="form-control" v-model="trip" placeholder="Nhập chuyến công tác" />
      </div>

      <div class="row">
        <div class="col">
          <label class="form-label">Ngày bắt đầu</label>
          <input type="date" class="form-control" v-model="startDate" />
        </div>
        <div class="col">
          <label class="form-label">Ngày kết thúc</label>
          <input type="date" class="form-control" v-model="endDate" />
        </div>
      </div>
    </div>
    <div
  class="card image-section p-4 mb-4 shadow-sm"
  v-for="(bct, index) in documents"
  :key="index"
  >
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Bộ chứng từ {{ index + 1 }}</h5>
        <button
          class="btn btn-sm btn-danger"
          @click="removeDocument(index)"
          v-if="documents.length > 1"
        >
          Xóa BCT
        </button>
      </div>

      <div class="mb-3">
        <label class="form-label">Ảnh hóa đơn</label>
        <input
          type="file"
          accept="image/*"
          class="form-control"
          @change="handleFile($event, index, 'meal')"
          multiple
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Ảnh biên lai</label>
        <input
          type="file"
          accept="image/*"
          class="form-control"
          @change="handleFile($event, index, 'hotel')"
          multiple
        />
      </div>
    </div>
    <button class="btn btn-outline-secondary w-100 mb-3" @click="addDocument">
      + Thêm BCT
    </button>
    <button class="btn btn-primary w-100" @click="submit" :disabled="!canSubmit">
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
      trip: '',
      startDate: '',
      endDate: '',
      documents: [
        {
          mealFiles: [],
          hotelFiles: [],
        },
      ],
    };
  },
  computed: {
    canSubmit() {
      return (
        this.trip &&
        this.startDate &&
        this.endDate &&
        this.documents.some(doc => doc.mealFiles.length || doc.hotelFiles.length)
      );
    },
  },
  methods: {
    addDocument() {
      this.documents.push({ mealFiles: [], hotelFiles: [] });
    },
    removeDocument(index) {
      if (this.documents.length > 1) {
        this.documents.splice(index, 1);
      }
    },
    handleFile(event, index, type) {
      const files = Array.from(event.target.files);
      if (type === 'meal') {
        this.documents[index].mealFiles = files;
      } else if (type === 'hotel') {
        this.documents[index].hotelFiles = files;
      }
    },
    async submit() {
      const formData = new FormData();

      formData.append('trip', this.trip);
      formData.append('start_date', this.startDate);
      formData.append('end_date', this.endDate);

      this.documents.forEach((doc, i) => {
        doc.mealFiles.forEach((file) => {
          formData.append(`documents[${i}][meal_invoices][]`, file);
        });
        doc.hotelFiles.forEach((file) => {
          formData.append(`documents[${i}][hotel_invoices][]`, file);
        });
      });

      try {
        await axios.post(this.endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(`${this.title} upload thành công!`);
        this.resetForm();
      } catch (err) {
        console.error(err);
        alert(`${this.title} upload thất bại.`);
      }
    },
    resetForm() {
      this.trip = '';
      this.startDate = '';
      this.endDate = '';
      this.documents = [{ mealFiles: [], hotelFiles: [] }];
      const inputs = this.$el.querySelectorAll('input[type="file"]');
      inputs.forEach((input) => (input.value = ''));
    },
  }
};
</script>
<style scoped>
  .upload-panel {
    max-width: 1000px;
    margin: auto;
    background-color: #ffffff;
    border-radius: 20px;
    font-size: 18px;
  }

  .card {
    border-radius: 20px;
    background-color: #f9f9f9;
  }

  .info-section {
    background-color: #eef6ff;
    padding: 30px;
  }

  .image-section {
    background-color: #f3f3f3;
    padding: 30px;
  }

  .upload-panel h2 {
    font-size: 28px;
    font-weight: bold;
  }

  .upload-panel h5 {
    font-size: 22px;
    font-weight: 600;
  }

  .upload-panel .form-label {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .upload-panel .form-control {
    font-size: 18px;
    height: 50px;
    padding: 10px 14px;
    border-radius: 10px;
  }

  .upload-panel .btn {
    font-size: 20px;
    height: 55px;
    border-radius: 12px;
    margin-top: 20px;
  }

  .row .col {
    padding-left: 12px;
    padding-right: 12px;
  }
</style>
