<template>
  <div class="flex justify-start ml-5 py-2 lg:hidden">
    <OffcanvasMenu />
  </div>

  <div
    class="m lg:flex lg:justify-between w-full lg:py-4 lg:px-20 px-6"
    v-if="exist_maturity_level"
  >
    <div v-if="loading" class="loading">
      <span class="loader"></span>
    </div>
    <div
      v-else
      class="flex flex-col justify-between lg:flex-row lg:items-stretch w-full"
    >
      <div class="lg:w-1/2 flex flex-grow justify-between flex-col">
        <div>
          <div class="flex items-center">
            <span class="capitalize font-bold text-lg">maturity level</span>
            <span class="icon font-bold ml-5 text-lg">{{
              maturity_level
            }}</span>
          </div>
          <div class="w-full text-justify text-gray-500 text-sm mt-3">
            {{ level_description }}
          </div>
        </div>

        <div
          class="cart bg-white px-5 py-8 rounded-lg mt-10 xl:mt-32 space-y-5 w-full border-2"
        >
          <div class="flex justify-between">
            <span class="font-bold capitalize">personal info :</span>
            <div>
              <svg
                @click="openForm"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 icon"
                style="cursor: pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <!-- EditInfo Component -->
              <EditInfo
                v-if="showEditInfo"
                :show="showEditInfo"
                @close="closeForm"
              />
            </div>
          </div>

          <div class="flex justify-between">
            <span class="capitalize text-gray-500">firstname</span>
            <span class="capitalize">{{ firstName }}</span>
          </div>

          <div class="flex justify-between">
            <span class="capitalize text-gray-500">lastname</span>
            <span class="capitalize">{{ lastName }}</span>
          </div>

          <div class="flex justify-between">
            <span class="capitalize text-gray-500">company name</span>
            <span class="capitalize">{{ companyName }}</span>
          </div>
        </div>
      </div>

      <div class="second-col lg:w-1/2 lg:ml-20 flex-grow">
        <div class="text-start capitalize font-bold text-lg mt-10 lg:mt-0">
          processes
        </div>
        <div class="scrollbar">
          <div
            v-for="(process, index) in processesdata?.filter(
              (process) => process.level <= maturity_level
            )"
            :key="index"
          >
            <h3>Level {{ process.level }}</h3>
            <ul>
              <Dropdown
                v-for="(item, idx) in process.processes_level"
                :key="idx"
                :process="item"
                :level="process.level"
                :statusprocess="statusprocess"
                class="mb-8"
                :disabled="process.level > maturity_level"
              />
            </ul>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 2rem 0;
              font-weight: bold;
            "
          >
            <p>
              To Unlock The Next Level, Please Retake The
              <router-link :to="`/testspage`" style="color: #ff7272"
                >Maturity Test</router-link
              >
              .
            </p>
          </div>
          <div
            v-for="(process, index) in processesdata?.filter(
              (process) => process.level > maturity_level
            )"
            :key="index"
          >
            <h3>Level {{ process.level }}</h3>
            <ul>
              <Dropdown
                v-for="(item, idx) in process.processes_level"
                :key="idx"
                :process="item"
                :level="process.level"
                :statusprocess="statusprocess"
                class="mb-8"
                :disabled="process.level > maturity_level"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="!exist_maturity_level"
    class="m w-full flex justify-center items-center"
  >
    <div
      class="h hidden lg:flex w-full lg:justify-center min-h-screen items-center"
    >
      <div class="m flex w-full">
        <div class="items-center justify-end flex flex-col w-2/3">
          <img src="../assets/mobile logo.svg" alt="" />
          <span class="w-3/4 pt-5 mb-20 text-sm text-gray-500">
            Opemate assesses your company's maturity level based on the People
            CMM framework and identifies key processes for improvement. Begin
            the assessment to discover your company's maturity level and
            targeted improvement processes.
          </span>
          <div class="flex items-center">
            <router-link to="./testspage" class="underline capitalize icon"
              >start the test</router-link
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 icon ml-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showEditInfo">
    <EditInfo />
  </div>
</template>

<script>
import HomePage from "./HomePage.vue";
import OffcanvasMenu from "./OffcanvasMenu.vue";
import PopupPage from "./PopupPage.vue";
import ChatPage from "./ChatPage.vue";
import MobileHeader from "./MobileHeader.vue";
import SliderPage from "./SliderPage.vue";
import Dropdown from "./Dropdown.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import EditInfo from "./EditInfo.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    HomePage,
    SliderPage,
    ChatPage,
    MobileHeader,
    PopupPage,
    OffcanvasMenu,
    Dropdown,
    EditInfo,
  },

  setup() {
    const exist_maturity_level = ref(true);
    const maturity_level = ref("");
    const level_description = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const companyName = ref("");
    const processesdata = ref([]);
    const showEditInfo = ref(false);
    const statusprocess = ref("");
    const loading = ref(true);
    const router = useRouter();

    async function getData() {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://operapi.ariisco.com/check-maturitylevel/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          exist_maturity_level.value = response.data.exist_maturity_level;
          maturity_level.value = response.data.maturity_level;
          level_description.value = response.data.level_description;
          processesdata.value = response.data.processes;
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          router.push("/signin");
        }
      }
    }

    async function personalInfo() {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://operapi.ariisco.com/get-profile/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          firstName.value = response.data.first_name;
          lastName.value = response.data.last_name;
          companyName.value = response.data.company;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const closeForm = () => {
      showEditInfo.value = false;
    };

    const openForm = () => {
      showEditInfo.value = true;
    };

    const getprocesstrue = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://operapi.ariisco.com/get-processes-status/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          statusprocess.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getprocesstrue();

    onMounted(async () => {
      try {
        await Promise.all([getData(), personalInfo(), getprocesstrue()]);
      } finally {
        loading.value = false;
      }

      localStorage.removeItem("idconversition");
      localStorage.removeItem("titlechat");
    });

    return {
      exist_maturity_level,
      maturity_level,
      level_description,
      firstName,
      lastName,
      companyName,
      showEditInfo,
      openForm,
      closeForm,
      processesdata,
      statusprocess,
      loading,
    };
  },
};
</script>

<style>
.scrollbar {
  -webkit-overflow-scrolling: touch;
}

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #ff7272;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 1024px) {
  .scrollbar {
    overflow-y: scroll;
    max-height: 50vh;
    padding: 0 10px;
  }

  .test-again {
    width: 100%;
    display: flex;
  }

  .second-col {
    height: max-content;
  }
}

@media (min-width: 1024px) {
  .scrollbar {
    overflow-y: scroll;
    height: 85vh;
    padding: 0 10px;
  }

  .m {
    margin-left: 16%;
  }
}

.lg\\:items-stretch {
  align-items: stretch;
}

.scrollbar {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

/* Custom scrollbar for WebKit browsers (Chrome, Safari) */
.scrollbar::-webkit-scrollbar {
  width: 3px; /* Width of the vertical scrollbar */
  height: 12px; /* Height of the horizontal scrollbar */
}

/* Track of the scrollbar */
.scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background color of the track */
  border-radius: 10px; /* Optional: Rounded corners */
}

/* Thumb (handle) of the scrollbar */
.scrollbar::-webkit-scrollbar-thumb {
  background: #888; /* Color of the thumb */
  border-radius: 10px; /* Optional: Rounded corners */
}

/* Thumb (handle) hover effect */
.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color when hovered */
}
</style>
