<template>
  <div class="document-card">
    <h3>Bộ chứng từ:</h3>

    <div class="form-group">
      <label>Ảnh hoá đơn:</label>
      <input type="file" @change="handleInvoiceChange" />
    </div>

    <div class="form-group">
      <label>Ảnh biên lai:</label>
      <input type="file" @change="handleReceiptChange" />
    </div>

    <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </div>

    <button @click="$emit('delete')">Delete</button>
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

    function handleInvoiceChange(event) {
        invoice.value = event.target.files[0]
        emitUpdate()
    }

    function handleReceiptChange(event) {
        receipt.value = event.target.files[0]
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
  padding: 16px;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 12px;
}
</style>
