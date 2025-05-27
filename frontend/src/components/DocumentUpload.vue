<template>
  <div class="document-card">
    <button class="delete-btn" @click="$emit('delete')" title="Xóa">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M6 7V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 4H15.5L14.79 3.29C14.42 2.92 13.89 2.92 13.52 3.29L12.5 4.29C12.22 4.57 11.78 4.57 11.5 4.29L10.48 3.29C10.11 2.92 9.58 2.92 9.21 3.29L8.5 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6H19C19.55 6 20 5.55 20 5C20 4.45 19.55 4 19 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h3>Bộ chứng từ:</h3>
    <div class="image-cards">
      <div class="image-card">
        <div class="image-label">Ảnh hoá đơn</div>
        <label class="image-upload">
          <input type="file" accept="image/*" @change="handleInvoiceChange" hidden>
          <div v-if="!invoicePreview" class="plus-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#bbb" stroke-width="2" fill="#fafafa"/>
              <path d="M12 8v8M8 12h8" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div v-else class="preview-wrapper">
            <img :src="invoicePreview" class="preview-img" alt="Xem trước hóa đơn" />
            <button class="remove-img-btn" @click.stop="removeInvoice" title="Xóa ảnh">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="#fff" stroke="#ff4444" stroke-width="2"/>
                <path d="M7 7l6 6M13 7l-6 6" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </label>
      </div>
      <div class="image-card">
        <div class="image-label">Ảnh biên lai</div>
        <label class="image-upload">
          <input type="file" accept="image/*" @change="handleReceiptChange" hidden>
          <div v-if="!receiptPreview" class="plus-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="#bbb" stroke-width="2" fill="#fafafa"/>
              <path d="M12 8v8M8 12h8" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div v-else class="preview-wrapper">
            <img :src="receiptPreview" class="preview-img" alt="Xem trước biên lai" />
            <button class="remove-img-btn" @click.stop="removeReceipt" title="Xóa ảnh">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="#fff" stroke="#ff4444" stroke-width="2"/>
                <path d="M7 7l6 6M13 7l-6 6" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </label>
      </div>
    </div>
    <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['delete', 'update-files'])

const props = defineProps({
  status: Boolean, 
  message: String,
})

const invoice = ref(null)
const receipt = ref(null)
const invoicePreview = ref(null)
const receiptPreview = ref(null)

function handleInvoiceChange(event) {
  const file = event.target.files[0]
  invoice.value = file
  if (file) {
    invoicePreview.value = URL.createObjectURL(file)
  } else {
    invoicePreview.value = null
  }
  emitUpdate()
}

function handleReceiptChange(event) {
  const file = event.target.files[0]
  receipt.value = file
  if (file) {
    receiptPreview.value = URL.createObjectURL(file)
  } else {
    receiptPreview.value = null
  }
  emitUpdate()
}

function removeInvoice() {
  invoice.value = null
  invoicePreview.value = null
  emitUpdate()
}

function removeReceipt() {
  receipt.value = null
  receiptPreview.value = null
  emitUpdate()
}

function emitUpdate() {
  emit('update-files', {
      invoice: invoice.value,
      receipt: receipt.value
  })
}

const isSuccess = computed(() => props.status)
</script>

<style scoped>
.document-card {
  border: 1px solid #ccc;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  max-width: 1200px;
  margin: 24px auto;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: 2px solid #ff4444;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  z-index: 2;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-btn svg {
  width: 28px;
  height: 28px;
  transition: fill 0.2s, transform 0.2s;
}

.delete-btn:hover {
  color: #fff;
  background: #ff4444;
  border-color: #cc0000;
  box-shadow: 0 4px 16px rgba(255,68,68,0.15);
  transform: scale(1.08) rotate(-8deg);
}

.delete-btn:hover svg {
  fill: #fff;
  transform: scale(1.15) rotate(-8deg);
}

.image-cards {
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
  justify-content: center;
}
.image-card {
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 18px;
  padding: 20px 16px 24px 16px;
  width: 500px;
  min-width: 500px;
  max-width: 500px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  position: relative;
}

.image-label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 14px;
  color: #444;
}
.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 320px;
  justify-content: center;
  position: relative;
}

.plus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  transition: transform 0.2s;
}

.preview-wrapper {
  position: relative;
  width: 95%;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 94px auto 0 auto;
  padding: 8px;
  box-sizing: border-box;
}
.preview-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  object-fit: contain; 
  background: #fff;
}
.remove-img-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.2s;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-img-btn:hover {
  background: #ffeaea;
  transform: scale(1.1) rotate(-10deg);
}

.remove-img-btn svg {
  display: block;
}
.message {
  margin: 18px auto 0 auto;
  padding: 14px 24px 14px 48px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
  max-width: 500px;
  position: relative;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-left: 6px solid #bbb;
  color: #444;
  min-height: 48px;
}

.message.success {
  border-left-color: #4caf50;
  background: #eafbe7;
  color: #256029;
}

.message.error {
  border-left-color: #ff4444;
  background: #fff0f0;
  color: #b71c1c;
}

.message::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-size: 24px 24px;
}

.message.success::before {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%234caf50" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="%234caf50" fill="%23eafbe7"/><path d="M7 13l3 3 7-7" stroke="%234caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
}

.message.error::before {
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%23ff4444" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" stroke="%23ff4444" fill="%23fff0f0"/><path d="M8 8l8 8M16 8l-8 8" stroke="%23ff4444" stroke-width="2" stroke-linecap="round"/></svg>');
}
</style>