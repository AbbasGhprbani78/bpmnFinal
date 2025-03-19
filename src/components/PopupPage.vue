<template>
    <div>
      <button @click="togglePopup" class=" mt-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
</svg>
</button>
  
      <div v-if="isPopupVisible" class="popup-container w-full">
        <div class="popup w-96 rounded-lg py-5 px-5 mx-5">
          <div class="flex justify-between items-center">
            <h2>{{ popupTitle }}</h2>
          <button @click="togglePopup" class=" text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

          </button>
          </div>
          <p class="mt-5 text-sm text-justify text-gray-400">Opemate assesses your company's maturity level based on the People CMM framework and identifies key processes for improvement. Begin the assessment to discover your company's maturity level and targeted improvement processes.
          </p>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const isPopupVisible = ref(false);
      const popupTitle = ref('About Opemate');
  
      const togglePopup = () => {
        isPopupVisible.value = !isPopupVisible.value;
      };
  
      return {
        isPopupVisible,
        popupTitle,
        togglePopup,
      };
    },
  };
  </script>
  
  <style>
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  z-index: 999;
}

.popup {
  background-color: white;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
}
  </style>
  