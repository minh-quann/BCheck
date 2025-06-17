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

    <div v-if="panels.length" class="documents">
      <DocumentUpload v-for="(panel, index) in panels" :key="panel.id" :panel="panel" :status="results[index]?.status"
        :message="results[index]?.message" @delete="removePanel(index)"
        @update-files="updatePanelFiles(index, $event)" />
    </div>

    <div class="form-row buttons-row">
      <button type="button" class="button" @click="addPanel">
        <div class="outline"></div>
        <div class="state state--default">
          <div class="icon">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <p>
            <span style="--i:0">T</span>
            <span style="--i:1">h</span>
            <span style="--i:2">ê</span>
            <span style="--i:3">m</span>
          </p>
        </div>
        <div class="state state--sent">
          <div class="icon">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <p>
            <span style="--i:0">Đ</span>
            <span style="--i:1">ã</span>
            <span style="--i:2">&nbsp;</span>
            <span style="--i:3">t</span>
            <span style="--i:4">h</span>
            <span style="--i:5">ê</span>
            <span style="--i:6">m</span>
          </p>
        </div>
      </button>
      <button type="submit" class="button" :disabled="buttonState === 'loading'" value="check-documents">
        <div class="outline"></div>

        <div v-if="buttonState === 'default'" class="state state--default">
          <div class="icon">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g style="filter: url(#shadow)">
                <path
                  d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63Z"
                  fill="currentColor" />
              </g>
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="0.6" flood-opacity="0.5" />
                </filter>
              </defs>
            </svg>
          </div>
          <p>
            <span style="--i:0">K</span>
            <span style="--i:1">i</span>
            <span style="--i:2">ể</span>
            <span style="--i:3">m</span>
            <span style="--i:4">&nbsp;</span>
            <span style="--i:5">t</span>
            <span style="--i:6">r</span>
            <span style="--i:7">a</span>
          </p>
        </div>

        <div v-if="buttonState === 'sent'" class="state state--sent">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em"
              stroke-width="0.5px" stroke="black">
              <g style="filter: url(#shadow)">
                <path fill="currentColor"
                  d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z" />
                <path fill="currentColor"
                  d="M10.5795 15.5801L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601" />
              </g>
            </svg>
          </div>
          <p>
            <span style="--i:0">Đ</span>
            <span style="--i:1">ã</span>
            <span style="--i:2">&nbsp;</span>
            <span style="--i:3">g</span>
            <span style="--i:4">ử</span>
            <span style="--i:5">i</span>
          </p>
        </div>

        <div v-if="buttonState === 'loading'" class="state state--loading">
          <p>
            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>
          </p>
        </div>

        <div v-if="buttonState === 'received'" class="state state--received">
          <div class="icon">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <p>
            <span>Đã nhận</span>
          </p>
        </div>
      </button>

      <button type="submit" class="button" value="save-documents">
        <div class="outline"></div>
      </button>


    </div>

  </form>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import DocumentUpload from './DocumentUpload.vue'

const jobName = ref('')
const jobDescription = ref('')
const startDate = ref('')
const endDate = ref('')
const panels = ref([])
const results = ref([])


const buttonState = ref('default')

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

async function submitForm(event) {
  const clickedButton = event.submitter;
  const action = clickedButton?.value;

  const formData = new FormData()
  formData.append('job_name', jobName.value)
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

  if (action === 'check-documents') {
    results.value = []
    buttonState.value = 'sent'
    await nextTick()
    setTimeout(() => {
      buttonState.value = 'loading'
    }, 2000)
    
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
        buttonState.value = 'received'
        setTimeout(() => {
          buttonState.value = 'default'
        }, 2000)
      } else {
        console.error('Unexpected response format:', result);
        buttonState.value = 'default'
      }
    } catch (error) {
      console.error('Error sending to n8n:', error)
      buttonState.value = 'default'
    }
    return;
  } else if (action === 'save-documents') {
    formData.append('job_description', jobDescription.value)
    results.value.forEach((result, index) => {
      formData.append(`documents[${index}][result]`, result.message)
    });

    try {
      const endpoint = 'http://localhost:3000/api/jobs/save-documents'
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json();

  
    } catch (error) {
      console.error('Error sending to n8n:', error)
      buttonState.value = 'default'
    }
    return;

  }
  
}
</script>

<style scoped>
.state--loading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.state--loading .icon {
  margin-right: 8px;
}

.state--loading .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 3px;
  border-radius: 50%;
  background: #2563eb;
  animation: bounce 1s infinite;
}

.state--loading .dot1 {
  animation-delay: 0s;
}

.state--loading .dot2 {
  animation-delay: 0.2s;
}

.state--loading .dot3 {
  animation-delay: 0.4s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }
}

.form-container {
  max-width: 1200px;
  margin: auto;
  margin-top: 2%;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  color: #374151;
  transition: all 0.2s;
}

input[type="text"],
input[type="date"] {
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  transition: all 0.3s ease;
  color: #1f2937;
}

input[type="text"]::placeholder {
  color: #9ca3af;
}

input[type="text"]:hover,
input[type="date"]:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

input[type="text"]:focus,
input[type="date"]:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group:focus-within label {
  color: #2563eb;
  transform: translateY(-1px);
}


.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.half-width {
  flex: 1;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  padding: 6px;
  opacity: 0.6;
  filter: invert(40%) sepia(8%) saturate(1042%) hue-rotate(182deg) brightness(95%) contrast(88%);
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}


.documents {
  margin: 32px 0;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #e5e7eb;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }

  .form-container {
    padding: 16px;
    margin-top: 1%;
  }
}

.buttons-row {
  justify-content: space-between;
  display: flex;
  gap: 16px;
}

.button {
  --primary: #000000;
  --neutral-1: #f7f8f7;
  --neutral-2: #e7e7e7;
  --radius: 14px;

  cursor: pointer;
  border-radius: var(--radius);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  min-width: 200px;
  padding: 20px;
  height: 68px;
  font-family: "Galano Grotesque", Poppins, Montserrat, sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
}

.button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
    0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
}

.button:active {
  transform: scale(1);
  box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
    0 10px 3px -3px rgba(0, 0, 0, 0.2);
}

.button:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  border: 2.5px solid transparent;
  background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45)) border-box;
  z-index: 0;
  transition: all 0.4s ease;
}

.button:hover::after {
  transform: scale(1.05, 1.1);
  box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
}

.button::before {
  content: "";
  inset: 7px 6px 6px 6px;
  position: absolute;
  background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
  border-radius: 30px;
  filter: blur(0.5px);
  z-index: 2;
}

.state {
  padding-left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  gap: 10px;
}

.state p {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.state .icon {
  position: static;
  margin-right: 8px;
  transform: scale(1.25);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state .icon svg {
  overflow: visible;
  fill: none !important;
  stroke: var(--primary);
  stroke-width: 2.2;
}

.state--default .icon svg path {
  fill: none !important;
  stroke: var(--primary);
  stroke-width: 2.2;
}

.state--sent .icon svg path {
  fill: none !important;
  stroke: var(--primary);
  stroke-width: 2.2;
}

/* Outline */
.outline {
  position: absolute;
  border-radius: inherit;
  overflow: hidden;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
  inset: -2px -3.5px;
}

.outline::before {
  content: "";
  position: absolute;
  inset: -100%;
  background: conic-gradient(from 180deg,
      transparent 60%,
      white 80%,
      transparent 100%);
  animation: spin 2s linear infinite;
  animation-play-state: paused;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.button:hover .outline {
  opacity: 1;
}

.button:hover .outline::before {
  animation-play-state: running;
}

/* Letters */
button[type="button"] .state p span {
  display: block;
  opacity: 0;
  animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
}

button[type="button"]:hover p span {
  opacity: 1;
  animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
}

button[type="button"]:focus p span {
  opacity: 1;
  animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
}
button[type="submit"] .state--default p span {
  display: block;
  opacity: 0;
  animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
}
button[type="submit"]:hover .state--default p span {
  opacity: 1;
  animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
}
button[type="submit"]:focus .state--default p span {
  opacity: 1;
  animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
}
@keyframes wave {
  30% {
    opacity: 1;
    transform: translateY(4px) translateX(0) rotate(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-3px) translateX(0) rotate(0);
    color: var(--primary);
  }

  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px) translateX(5px) rotate(-90deg);
    color: var(--primary);
    filter: blur(5px);
  }

  30% {
    opacity: 1;
    transform: translateY(4px) translateX(0) rotate(0);
    filter: blur(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-3px) translateX(0) rotate(0);
  }

  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0);
  }
}

@keyframes disapear {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateX(5px) translateY(20px);
    color: var(--primary);
    filter: blur(5px);
  }
}

/* Plane */
.state--default .icon svg {
  animation: land 0.6s ease forwards;
}

.button:hover .state--default .icon {
  transform: rotate(45deg) scale(1.25);
}

.button:focus .state--default svg {
  animation: takeOff 0.8s linear forwards;
}

.button:focus .state--default .icon {
  transform: rotate(0) scale(1.25);
}
.state--received span {
  display: inline-block;
  opacity: 0;
  animation: receivedFadeIn 0.8s ease forwards;
}

@keyframes receivedFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes takeOff {
  0% {
    opacity: 1;
  }

  60% {
    opacity: 1;
    transform: translateX(70px) rotate(45deg) scale(2);
  }

  100% {
    opacity: 0;
    transform: translateX(160px) rotate(45deg) scale(0);
  }
}

@keyframes land {
  0% {
    transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
    opacity: 0;
    filter: blur(3px);
  }

  100% {
    transform: translateX(0) translateY(0) rotate(0);
    opacity: 1;
    filter: blur(0);
  }
}

/* Contrail */
.state--default .icon:before {
  content: "";
  position: absolute;
  top: 50%;
  height: 2px;
  width: 0;
  left: -5px;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
}

.button:focus .state--default .icon:before {
  animation: contrail 0.8s linear forwards;
}

@keyframes contrail {
  0% {
    width: 0;
    opacity: 1;
  }

  8% {
    width: 15px;
  }

  60% {
    opacity: 0.7;
    width: 80px;
  }

  100% {
    opacity: 0;
    width: 160px;
  }
}

/* States */
.state--default span:nth-child(4) {
  margin-right: 5px;
}

.state--sent {
  display: none;
}

.state--sent svg {
  transform: scale(1.25);
  margin-right: 8px;
}

.button:focus .state--default {
  position: absolute;
}

.button:focus .state--sent {
  display: flex;
}

.button:focus .state--sent span {
  opacity: 0;
  animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
}

.button:focus .state--sent .icon svg {
  opacity: 0;
  animation: appear 1.2s ease forwards 0.8s;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(4) rotate(-40deg);
    color: var(--primary);
    filter: blur(4px);
  }

  30% {
    opacity: 1;
    transform: scale(0.6);
    filter: blur(1px);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: blur(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>