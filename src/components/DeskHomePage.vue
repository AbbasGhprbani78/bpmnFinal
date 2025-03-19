<template>
    <!-- <PopupPage /> -->
    <!-- <MobileHeader /> -->
    <div class="flex justify-start ml-5 py-2 lg:hidden">
        <OffcanvasMenu />
    </div>
    <HomePage />
    
    <SliderPage />
</template>

<script>
import OffcanvasMenu from './OffcanvasMenu.vue';
import PopupPage from './PopupPage.vue';
import ChatPage from './ChatPage.vue';
import HomePage from './HomePage.vue';
import MobileHeader from './MobileHeader.vue';
import SliderPage from './SliderPage.vue';
export default {
    components:{
        HomePage,
        SliderPage,
        ChatPage,
        MobileHeader,
        PopupPage,
        OffcanvasMenu,
    }

}
</script>

<style>

</style>