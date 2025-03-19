<template>
  <div class="mx-2 px-3 flex flex-col h-full lg:hidden">
    <div class="items-center justify-center flex flex-col mt-20">
      <img src="../assets/mobile logo.svg" alt="" class="">
    <span class="w-67 pt-5 mb-20 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>

    <div class="flex flex-col justify-center w-full mt-10">
      <button @click="goToH" class=" bottom-40 shadow-md py-3 sm:py-5 px-3 bg-white w-full mt-3">
      <div class="flex items-center justify-between px-3">
        <p class="capitalize text-sm font-medium">ai chat helper</p>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon">
<path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clip-rule="evenodd" />
        </svg>
      </div>

      <p class="text-xs text-left px-3 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      
      </button>

      <button @click="goToH" class=" bottom-8 shadow-md py-3 sm:py-5 px-3 bg-white w-full mt-3">
      <div class="flex items-center justify-between px-3">
        <p class="capitalize text-sm font-medium">ai chat helper</p>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon">
<path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
        </svg>

      </div>

      <p class="text-xs text-left px-3 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      
      </button>
    </div>
  </div>
</template>

<script>
import SliderPage from './SliderPage.vue'
import ChatPage from './ChatPage.vue'
import { useRouter } from 'vue-router'
export default{
  components:{
    ChatPage,
    SliderPage
  },
  setup(){
    const router1 = useRouter()
    function goToH(){
      router1.push("./chatpage")
    }

    return{ goToH}
  },
}
</script>

<style>
</style>

