<template>
  <div>
    <MobileHeader title="maturity level" />
    <div class="flex justify-center w-2/3">
      <div class="chatmobile h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4 lg:h-5/6 lg:p-10 p-5">

<div class="scrolll">
  
  <div class="a flex flex-col text-start">
          <div class="flex items-center">
            <span class="capitalize font-bold text-lg">maturity level :</span>
            <span class="capitalize font-bold text-xl ml-2 icon">{{ responseData['maturity_level'] }}</span>
          </div>
          <span class="capitalize text-sm mt-2 lg:w-3/4 text-gray-400">{{ responseData['level_description'] }}</span>
        </div>


        <div class="chat-messages lg:h-3/5 h-1/2 mt-10 lg:mt-5">
          <div class="lg:flex lg:justify-between">
            <div class="flex items-baseline w-full">
              <ul class="w-full">
                <li v-for="(process, index) in responseData['processes']" :key="index" class="flex justify-between">
                  <div class="flex justify-end text-left items-baseline mb-8">
                    <div class="flex">
                      <div>
                        <div class="iconbg lg:w-10 lg:h-10 px-3 h-7 w-7 rounded-full text-white lg:text-xl flex justify-center items-center">{{index + 1}}</div>
                      </div>
                    </div>
                    <div class="flex flex-col ms-8">
                      <div v-for="(item, idx) in process['processes_level']" :key="idx">
                        <div class="lg:flex mb-10">
                          <div class="flex flex-col">
                            <span class="capitalize text-lg mt-2 lg:w-2/4 text-darkgray-400 font-bold">{{ item['process_name'] }}</span>
                            <span class="capitalize mt-2 lg:w-4/5 text-gray-500">{{ item['process_description'] }}</span>
                          </div>
                          <div class="flex flex-col">
                            <router-link :to="`/chatpage2/${item['process_id']}`" class="icon underline text-nowrap text-sm capitalize mt-5">Chat with AI</router-link>
                          <div @click="storeDiagramAndNavigate(item['process_diagram'])" class="pointer icon underline text-nowrap text-sm capitalize mt-5">show diagram</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
</div>
      </div>
      <div class="hidden lg:ml-16 xl:ml-5 lg:block capitalize font-bold text-lg lg:mt-8 left-2/4 transform -translate-x-1/2 lg:translate-x-0 lg:right-8 lg:left-auto">
        <span class="text-nowrap">maturity level</span>
      </div>
    </div>
  </div>
</template>
<script>
import SliderPage from "./SliderPage.vue";
import MobileHeader from "./MobileHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  components: {
    MobileHeader,
    SliderPage,
  },

  setup() {

    const store = useStore();
    const responseData = computed(() => store.getters.getResponseData);
    const chatData = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const route = useRouter();

    const paginatedMessages = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return chatData.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => Math.ceil(chatData.value.length / itemsPerPage));

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const storeDiagramAndNavigate = (processDiagram) => {
      localStorage.setItem("diagram", processDiagram);
      route.push("/flowchart2");
    };

    const submitAnswers = async () => {
      const answers = JSON.parse(localStorage.getItem("answers"));
      if (answers) {
        try {
          const accessToken = localStorage.getItem('access');
          const response = await axios.post(
            'https://operapi.ariisco.com/maturitylevel/',
            answers,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            store.dispatch('updateResponseData', response.data);
          }

        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

 
 submitAnswers();
    return {
      chatData,
      paginatedMessages,
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      responseData,
      storeDiagramAndNavigate,
      submitAnswers
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.submitAnswers(); 
    });
  }
};
</script>

<style scoped>

.scrolll {
  overflow-y: scroll;
  height: 80vh;
}

.scrolll::-webkit-scrollbar {
  display: none;
}

.scrolll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Firefox */
.scrolll::-moz-scrollbar {
  display: none;
}

/* Optional: Ensure Safari compatibility with a workaround */
.scrolll {
  overflow: -moz-scrollbars-none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrolll {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

.p {
  cursor: pointer;
}


.chat {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 5px 15px lightgray;
}

.chatmobile {
  height: 85vh;
  position: fixed;
  bottom: 0;
}

</style>
