<template>


    <div class="flex items-center justify-between px-5 py-2 lg:hidden w-full fixed z-50">
        <OffcanvasMenu />

        <!-- <span class="font-bold capitalize">{{title}}</span> -->

        <!-- <router-link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </router-link> -->

        
    </div>
  
</template>

<script>
import OffcanvasMenu from '../components/OffcanvasMenu.vue'
export default {

    props: {
        title: String,
    },
    setup(){

    },

    components:{
        OffcanvasMenu,
    }

}
</script>

<style>

</style>