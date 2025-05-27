<template>
  <form @submit.prevent="submitForm" class="form-container">

    <div class="form-group">
      <label for="jobName">Tên công việc</label>
      <input id="jobName" v-model="jobName" type="text" placeholder="Tên công việc" />
    </div>

    <div class="form-group">
      <label for="jobDescription">Mô tả công việc</label>
      <input id="jobDescription" v-model="jobDescription" type="text" placeholder="Mô tả công việc" />
    </div>

    <div class="form-row">
      <div class="form-group half-width">
        <label for="startDate">Thời gian bắt đầu</label>
        <input id="startDate" v-model="startDate" type="date" />
      </div>

      <div class="form-group half-width">
        <label for="endDate">Thời gian kết thúc</label>
        <input id="endDate" v-model="endDate" type="date" />
      </div>
    </div>

    <div class="documents">
      <DocumentUpload v-for="(panel, index) in panels" 
        :key="panel.id" 
        :panel="panel"
        :status="results[index]?.status"
        :message="results[index]?.message" 
        @delete="removePanel(index)"
        @update-files="updatePanelFiles(index, $event)" />
    </div>

    <div class="form-row buttons-row">
      <button type="button" class="btn secondary" @click="addPanel">Thêm</button>
      <button type="submit" class="btn primary">Kiểm tra</button>
      
    </div>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import DocumentUpload from './DocumentUpload.vue'

const jobName = ref('')
const jobDescription = ref('')
const startDate = ref('')
const endDate = ref('')
const panels = ref([])
const results = ref([])
// const isSubmitting = ref(false)

const addPanel = () => {
  panels.value.push({
    id: panels.value.length + 1,
    invoice: null,
    receipt: null,
    invoiceImage: null,
    receiptImage: null
  })
}

const removePanel = (index) => {
  panels.value.splice(index, 1)
  results.value.splice(index, 1)
}

function updatePanelFiles(index, files) {
  panels.value[index].invoiceImage = files.invoice
  panels.value[index].receiptImage = files.receipt
}

async function submitForm() {
  // isSubmitting.value = true
  results.value = [] 

  const formData = new FormData()
  formData.append('job_name', jobName.value)
  //   formData.append('jobDescription', jobDescription.value)
  formData.append('start_date', startDate.value)
  formData.append('end_date', endDate.value)

  panels.value.forEach((panel, index) => {
    if (panel.invoiceImage instanceof File) {
      formData.append(`documents[${index}][invoice]`, panel.invoiceImage)
    }
    if (panel.receiptImage instanceof File) {
      formData.append(`documents[${index}][receipt]`, panel.receiptImage)
    }
  });

  try {
    const endpoint = 'http://localhost:3000/api/jobs/check-documents'
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json();

    if (Array.isArray(result.data)) {
      results.value = result.data
    } else {
      console.error('Unexpected response format:', result);
    }


  } catch (error) {
    console.error('Error sending to n8n:', error)
  } 
  // finally {
  //   isSubmitting.value = false
  // }
}
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: auto;
  margin-top: 2%;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 6px;
  font-weight: 600;
}

.custom-date-input {
  width: 100%;
  padding: 8px 36px 8px 8px;
  font-size: 1.1rem;
  border-radius: 6px;
  border: 1px solid #aaa;
}

.custom-calendar {
  border-radius: 14px;
  font-size: 1.1rem;
  min-width: 320px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.half-width {
  flex: 1;
}

.documents {
  margin-bottom: 24px;
}

.buttons-row {
  justify-content: space-between;
  display: flex;
  gap: 16px;
}

.btn {
  padding: 12px 32px;
  font-size: 1.08rem;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;
  font-weight: 600;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.15s;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.06);
}

.btn.primary {
  background-color: #1976d2;
  color: #fff;
  border-color: #1976d2;
}

.btn.primary:hover {
  background-color: #1251a3;
  color: #fff;
  border-color: #1251a3;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);
}

.btn.secondary {
  background-color: #fff;
  color: #1976d2;
  border-color: #1976d2;
}

.btn.secondary:hover {
  background-color: #e3f0fd;
  color: #1251a3;
  border-color: #1251a3;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.10);
}
</style>