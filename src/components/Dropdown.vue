<template>
  <div style="position: relative;">
    <div :class="{'disabled-cover': disabled }"></div>
    <div class="droppdown">
      <div class="mt-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div :class="{'iconbg lg:w-10 lg:h-10 p-4 h-7 w-7 rounded-full text-white lg:text-xl flex justify-center items-center': true, 'backdis': disabled}">
              {{ level }}
            </div>
            <span :class="{'ml-3 text-start font-bold': true, 'distext': disabled}">{{ process.process_name }}</span>
          </div>
          <div class="flex items-center">
            <button @click="open">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="{'rotate-180': isOpen, 'rotate-0': !isOpen}" class="size-6 text-gray-500 transition-transform duration-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <input type="checkbox" class="ml-5" @change="handleCheckboxChange($event, process.process_id)" :checked="statusprocess?.process_ids?.includes(process.process_id)">
          </div>
        </div>
        <div :class="isOpen ? 'yes' : 'no'">
          <div class="flex items-center justify-between">
            <div @click="storeDiagramAndNavigate(process.process_diagram)" class="pointer hover:underline icon capitalize text-sm xl:text-base">open diagram</div>
            <router-link :to="`/chatpage2/${process.process_id}`" class="hover:underline icon capitalize text-sm xl:text-base">chat with Ai</router-link>
          </div>
          <div class="bg-white px-5 py-3 mt-3 rounded-lg text-gray-400 text-sm text-start">{{ process.process_description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const ischeck=ref(false)
export default {
  props: ['process',"level","statusprocess","disabled"],
  setup(props) {

  const isOpen = ref(false);
   const route = useRouter();
    function open() {
      isOpen.value = !isOpen.value;
    }

    async function handleCheckboxChange(event,id) {
      try {
        
        const accessToken = localStorage.getItem('access');
        const response = await axios.post('https://operapi.ariisco.com/check-user-process/' , {
          process_id: id
        },
          {
            headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          }
        );
        if(response.status === 201||response.status===200){
        }

      } catch(error) {
        console.log(error);
      }
      
    }

    const storeDiagramAndNavigate = (processDiagram) => {
      localStorage.setItem("diagram", processDiagram);
      route.push("/flowchart2");
    };

 

    return {
      isOpen,
      open,
      handleCheckboxChange,
      storeDiagramAndNavigate,
      ischeck
    };
  },
};
</script>

<style scoped>
.yes {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.no {
  display: none;
}

.rotate-180 {
  transform: rotate(180deg);
}

.rotate-0 {
  transform: rotate(0deg);
}

.transition-transform {
  transition: transform 0.3s;
}

.pointer {
  cursor: pointer;
}

/* .disabled-cover {
  width: 100%;
  height: 100%;
  cursor: not-allowed;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
} */

.backdis{
  background: #c7c7c7;
}
.distext{
  color: #c7c7c7;
}
</style>
