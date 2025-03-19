<template>
    <div :class="['box-preview', { 'highlighted': isHighlighted }]">
        <div v-if="svgContent" v-html="svgContent" style="width:100%;height: 100%;"></div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
    isHighlighted: Boolean,
    imgsrc: String 
});

const svgContent = ref('');
const baseUrl = 'https://operapi.ariisco.com';
onMounted(async () => {
    if (props.imgsrc) {
        const fullUrl = `${baseUrl}${props.imgsrc}`;
        try {
            const response = await axios.get(fullUrl);
            svgContent.value = response.data
                .replace(/<svg(.*?)>/, '<svg$1 viewBox="0 0 700 700" style="width: 100%; height: 100%;">');
        } catch (error) {
            console.error('Error fetching SVG:', error);
        }
    }
});

</script>

<style scoped>
.box-preview {
    border-radius: 7px;
    box-shadow: 0px 2px 4px 0px #00000040;
    width: 20vw;
    height: 25vh;
    background: #fff;
    min-width: 341px;
    max-height: 202.67px;
}


@media (max-width: 600px) {
.box-preview{
     min-width: 300px;
}

    .highlighted {
        min-width: 98%;
    }
}
</style>