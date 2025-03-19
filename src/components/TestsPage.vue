<template>
  <div>
    <MobileHeader title="maturity test" />

    <div class="flex justify-start w-2/3 ml-20">
      <div class="chat scrolling h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4 lg:h-5/6 lg:p-10 p-5"> 
        
        <div class=" ">
          <div class="flex flex-col text-start">
          <div class="flex items-center justify-between">
            <span class="capitalize font-bold text-md">answer the questions</span>
            <span style="color: red;" class="font-bold">{{ currentPage }}/{{ totalPages }}</span>
          </div>
          
        </div>
        <div ref="chatMessages" class=" mt-5 pb-5">
          <ul>
            <li v-for="(question, index) in paginatedQuestions" :key="index" class="mt-5">
              <div class="lg:flex items-baseline justify-between">
                <div class="text-start lg:w-3/4 text-black text-sm">
                  {{ question.text }}
                </div>
                <div class="flex justify-around mt-5">
                  <div class="flex items-center lg:mr-10">
                    <input
                      type="radio"
                      :name="`question_${index}`"
                      class="w-5 h-5 text-red-600"
                      :value="true"
                      v-model="responses[currentPageStartIndex + index + 1]"
                      @change="handleResponseChange(currentPageStartIndex + index + 1)"
                    />
                    <span class="font-bold capitalize mt-2 ml-2">yes</span>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      :name="`question_${index}`"
                      class="w-5 h-5"
                      :value="false"
                      v-model="responses[currentPageStartIndex + index + 1]"
                      @change="handleResponseChange(currentPageStartIndex + index + 1)"
                    />
                    <span class="font-bold capitalize mt-2 ml-2">no</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div class="flex justify-between mt-5">
          <button style="color: black;" @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <button style="color: red;" @click="nextPage">{{ currentPage === totalPages ? 'Submit' : 'Next' }}</button>
        </div>
        </div>
        </div>
        
      </div>
      <div class="hidden lg:ml-16 xl:ml-5 capitalize font-bold text-lg lg:mt-8 left-2/4 transform -translate-x-1/2 lg:translate-x-0 lg:right-8 lg:left-auto">
        <span class="text-nowrap">maturity test</span>
      </div>
    </div>
  </div>

  <div v-if="success" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 mx-4 rounded-lg">
      <h3 class="text-lg font-semibold p-5 text-gray-600">
        Please answer all questions on this page before proceeding.
      </h3>
      <button @click="closeModal" class="mt-4 px-4 py-2 text-gray-500">Close</button>
    </div>
  </div>
</template>


<script>

import { useRouter } from 'vue-router';
import SliderPage from "./SliderPage.vue";
import MobileHeader from "./MobileHeader.vue";
import { ref, computed } from "vue";
import { useStore } from 'vuex';
import axios from "axios";

export default {
  components: {
    MobileHeader,
    SliderPage,
  },
  setup() {
    
    const questions = [
      { text: 'Is there a clear mission statement for your company?' },
      { text: 'Are basic processes documented and followed consistently?' },
      { text: 'Does the company have a basic organizational structure in place?' },
      { text: 'Are there defined roles and responsibilities for employees?' },
      { text: 'Is there a basic financial reporting system in place?' },
      { text: "Are employees aware of the company's goals and objectives?" },
      { text: 'Is there a strategic plan in place for the next 1-3 years?' },
      { text: 'Do you regularly conduct employee performance reviews?' },
      { text: 'Are there established communication channels for feedback?' },
      { text: 'Does your company actively seek customer feedback?' },
      { text: 'Is there a risk management plan in place?' },
      { text: 'Are employees provided with training opportunities?' },
      { text: 'Is there a well-defined innovation strategy in place?' },
      { text: 'Does your company regularly update and improve its processes?' },
      { text: 'Are there cross-functional teams for problem-solving?' },
      { text: 'Is there a documented succession plan for key roles?' },
      { text: 'Is technology actively used to improve efficiency?' },
      { text: 'Are there performance metrics for key business areas?' },
      { text: 'Is there a comprehensive talent development program?' },
      { text: 'Does your company actively pursue partnerships and collaborations?' },
      { text: 'Is there a culture of continuous improvement?' },
      { text: 'Are there advanced analytics used for decision-making?' },
      { text: 'Is there a formalized knowledge management system?' },
      { text: 'Is sustainability considered in business practices?' },
      { text: 'Is there a culture of innovation throughout the organization?' },
      { text: 'Is there a strong emphasis on employee well-being and work-life balance?' },
      { text: 'Does your company actively contribute to industry thought leadership?' },
      { text: 'Is there a comprehensive digital transformation strategy?' },
      { text: 'Are there mechanisms for real-time data monitoring and response?' },
      { text: 'Does your company actively participate in corporate social responsibility initiatives?' }
    ];

    const responses = ref({});
    const router = useRouter();
    const store = useStore();

    const success = ref(false);

    const closeModal = () => {
     success.value = false;
    };

    function handleResponseChange(x) {
      responses.value[x] = responses.value[x];;
    }

    const itemsPerPage = 6;
    const currentPage = ref(1);

    const paginatedQuestions = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return questions.slice(startIndex, startIndex + itemsPerPage);
    });

    const totalPages = computed(() => Math.ceil(questions.length / itemsPerPage));

    const allQuestionsAnswered = () => {
      for (let i = 1; i <= questions.length; i++) {
        if (responses.value[i] === undefined) {
          return false;
        }
      }
      return true;
    };

    const submitAnswers = async () => {
      if (!allQuestionsAnswered()) {
        success.value = true;
        return;
      }

      try {
        const accessToken = localStorage.getItem('access');
        localStorage.setItem("answers", JSON.stringify(responses.value));
        const response = await axios.post(
          'https://operapi.ariisco.com/maturitylevel/',
          responses.value,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          store.dispatch('updateResponseData', response.data);
          router.push("/");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const validateCurrentPage = () => {
      const startIndex = currentPageStartIndex.value;
      const endIndex = startIndex + itemsPerPage;
      for (let i = startIndex + 1; i <= endIndex; i++) {
        if (responses.value[i] === undefined) {
          return false;
        }
      }
      return true;
    };

    const nextPage = () => {
      if (validateCurrentPage()) {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        } else {
          submitAnswers();
        }
        scrollToTop();
      } else {
        success.value = true;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
      scrollToTop();
    };

    const scrollToTop = () => {
      const chatMessages = document.querySelector('.scrolling');
      if (chatMessages) {
        chatMessages.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };

    const currentPageStartIndex = computed(() => (currentPage.value - 1) * itemsPerPage);

    return {
      questions,
      responses,
      handleResponseChange,
      paginatedQuestions,
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      allQuestionsAnswered,
      submitAnswers,
      currentPageStartIndex,
      scrollToTop,
      success,
      closeModal
    };
  },
};
</script>


<style>

@media(max-width:1024px) {
  .scrolling {
  overflow-y: scroll;
  height: 85vh;
}

/* .scrolling::-webkit-scrollbar {
  display: none;
} */

/* .scrolling {
  -ms-overflow-style: none; 
} */

/* Hide scrollbar for Firefox */
/* .scrolling::-moz-scrollbar {
  display: none;
} */

/* Optional: Ensure Safari compatibility with a workaround */


.scrolling {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

}

@media(min-width:1024px) {
  .scrolling {
  overflow-y: scroll;
  height: 85vh;
}





.scrolling {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}
  
}


.chat {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 5px 15px lightgray;

}

.scrolling {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

/* Custom scrollbar for WebKit browsers (Chrome, Safari) */
.scrolling::-webkit-scrollbar {
  width: 3px; /* Width of the vertical scrollbar */
  height: 12px; /* Height of the horizontal scrollbar */
}

/* Track of the scrollbar */
.scrolling::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background color of the track */
  border-radius: 10px; /* Optional: Rounded corners */
}

/* Thumb (handle) of the scrollbar */
.scrolling::-webkit-scrollbar-thumb {
  background: #888; /* Color of the thumb */
  border-radius: 10px; /* Optional: Rounded corners */
}

/* Thumb (handle) hover effect */
.scrolling::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color when hovered */
}



</style>
