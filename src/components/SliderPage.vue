<template>
  <div class="sidebar z-50 w-1/6 h-screen bg-white" style="color: black;">
    <!-- logo and description -->
    <div class="px-3 py-3 xl:px-8">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <img src="../assets/logo.svg" alt="" class=" w-4/5 xl:w-5/6" />
      </div>
    </div>
    <div class="flex flex-col">
      <router-link to="/" class="py-3 px-3 xl:px-8 mt-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="xl:size-6 size-5 icon">
          <path
            d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path
            d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>

        <span class="ml-3 xl:text-base">HomePage</span>
      </router-link>
      <div class="py-3 px-3 xl:px-8" style="cursor: pointer;" @click="!loading && newChat()">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 xl:size-6 icon">
              <path fill-rule="evenodd"
                d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                clip-rule="evenodd" />
            </svg>

            <span class="capitalize text-nowrap ml-3 xl:text-base">ai chat helper</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
            <path fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <router-link to="/testspage" class="py-3 px-3 xl:px-8 mt-3"
        :class="{ 'history-li': $route.path === '/testspage' }">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="size-5 xl:size-6 icon">
              <path fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd" />
            </svg>
            <span class="capitalize ml-3 xl:text-base">maturity test</span>
          </div>
        </div>
      </router-link>

      <hr class="mt-3" />
      <router-link to="/menuflowchart" class="py-3 px-3 xl:px-8 mt-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-5 h-5 xl:size-6 icon">
              <path fill-rule="evenodd"
                d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
                clip-rule="evenodd" />
            </svg>
            <span class="capitalize ml-3 xl:text-base">flow chart</span>
          </div>
        </div>
      </router-link>

      <div class="flex px-3 xl:px-8 mt-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-5 h-5 xl:size-6 icon justify-start">
          <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
            clip-rule="evenodd" />
        </svg>
        <span class="ml-3 xl:text-base">History</span>
      </div>
      <div class="history mt-5">
        <ul class="w-full listchat" style="text-align: start; ">
          <div v-for="(sessions, date) in groupedSessions" :key="date">
            <p class="date">{{ formatDisplayDate(date) }}</p>
            <div v-for="(item, index) in sessions" :key="index" style="position: relative;">
              <li class="history-li mb-3 py-3">
                <input v-if="isEditingTitle === item.session_id" v-model="editedTitle" @keyup.enter="saveTitle"
                  @blur="saveTitle" type="text" class="form-control"
                  style="width: auto; display: inline-block; width: 150px;" ref="inputRef" />
                <div @click="goToChat(item.session_id,item.title_chat)" style="margin-left: 3px;width: 100%;cursor: pointer;" v-else>
                  <span>{{ item.title_chat.length > 10 ? item.title_chat.slice(0, 10) + '...' : item.title_chat
                    }}</span>
                </div>
                <div style="display: flex; align-items: center;">

                  <div style="cursor: pointer;" @click="startEditingTitle(item.session_id, item.title_chat)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>

                  <div style="margin: 0 10px; cursor: pointer;" @click="openDeleteModal(item.session_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </ul>
      </div>
      <div class="flex mr-3 mt-5 items-center justify-between px-3 xl:px-8">
        <button @click="showModal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
        </button>
        <PopupPage />
      </div>
    </div>
    <EditInfo :show="showForm" @close="showForm = false" />
    <div v-if="exit" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white px-10 py-5 rounded-lg">
        <h3 class="text-lg font-semibold mb-4 capitalize">do you want to exit?</h3>
        <div class="flex justify-between">
          <button @click="closeModal" class="mt-4 px-4 py-2 text-red-500 underline capitalize rounded">no</button>
          <button @click="logout" class="mt-4 px-8 bg-gray-400 capitalize text-white rounded">yes</button>
        </div>
      </div>
    </div>
  </div>
  <div :class="['modal-wrapper-delete', isshowmodal ? 'showmodal' : '']">
    <div class="modal-close"></div>
    <div class="modal-delete">
      <div class="modal-delete-header">
        <div @click="toggleShowModal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ff7272" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6" style="cursor: pointer;color: #ff7272;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="modal-content">
        <p>Are you sure you want to delete the chat?</p>
      </div>
      <div class="actions-delete">
        <button class="btn-modal delete-yes" @click="deleteChat">Yes</button>
        <button class="btn-modal delete-no" @click="toggleShowModal">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed, watch, nextTick, isReactive } from 'vue';
import PopupPage from './PopupPage.vue';
import EditInfo from './EditInfo.vue';

export default {
  components: {
    PopupPage,
    EditInfo,
  },

  setup() {
    const isEditingTitle = ref(null); 
    const editedTitle = ref('');
    const currentChatId = ref(null);
    const responseArray = ref([]);
    const showForm = ref(false);
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const exit = ref(false);
    const inputRef = ref(null);
    const chatId=ref(false)
    const isshowmodal = ref(false);


       const startEditingTitle = (chatId, currentTitle) => {
      isEditingTitle.value = chatId;
      editedTitle.value = currentTitle; 
      currentChatId.value = chatId;

      nextTick(() => {
        console.log('inputRef.value:', inputRef.value);
        if (inputRef.value && inputRef.value.focus) {
          inputRef.value.focus(); 
        }
});
    };
    
       const saveTitle = async () => { 
        if (!isEditingTitle.value) return;  
        try {
          const accessToken = localStorage.getItem('access'); 
          const body = { 
            session_id: isEditingTitle.value, 
            new_title: editedTitle.value  
          };

          const response = await axios.put(
            `https://operapi.ariisco.com/update_sessiontitlechat/`,
            body,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          if (response.status === 200) {
            fetchSessionData(); 
          }
        } catch (error) {
          console.error("Error saving the title:", error);  
        } finally {
          isEditingTitle.value = false; 
        }
    };

    const goToChat=(id,name)=>{
      router.push(`/historychat/${id}`)
      localStorage.setItem("nameChat",name)
    }

    const logout = () => {
      localStorage.removeItem('access');
      router.push('/signin');
    };

    const openForm = () => {
      showForm.value = true;
    };

    const closeModal = () => {
      exit.value = false;
    };

    const newChat = async () => {
      if (loading.value) return;
      loading.value = true;
      const accessToken = localStorage.getItem('access');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await axios.post("https://operapi.ariisco.com/newsession/", {}, { headers });
        if (response.status === 201) {
          router.push({
            path: `/chatpage/${response.data.session_id}`
          });
          loading.value = false;
        }
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const fetchSessionData = async () => {
      const accessToken = localStorage.getItem('access');
      try {
        const response = await axios.get(
          "https://operapi.ariisco.com/sessionid/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data)
          responseArray.value = response.data;
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    const storeDiagramAndNavigate = (item) => {
      localStorage.setItem("diagram-main", JSON.stringify(item));
      router.push(`/flowchart3/${item.id}`);
    };


    const openDeleteModal=(id)=>{
      toggleShowModal()
      chatId.value=id
    }


    const deleteChat=async()=>{
        try {
        const body = {
          session_id: chatId.value
        };
        const accessToken = localStorage.getItem('access');
        const response = await axios.delete(`https://operapi.ariisco.com/delete_sessionchat/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: body,
        });
          if (response.status === 200) {
            isshowmodal.value = false;
            fetchSessionData()
          }
      } catch (error) {
        console.log(error);
      }
    }

    const groupedSessions = computed(() => {
  return responseArray.value.reduce((acc, session) => {
    const date = new Date(session.date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(session);
    return acc;
  }, {});
});



    const formatDisplayDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  return date.toDateString();
    };

    function showModal(){
      exit.value = true;
    }

    const toggleShowModal = () => {
        isshowmodal.value = !isshowmodal.value;
};

    onMounted(() => {
      fetchSessionData();
    });

    watch(
      () => route.path,
      () => {
        fetchSessionData();
      }
    );

    return {
      responseArray,
      showForm,
      loading,
      logout,
      openForm,
      groupedSessions,
      formatDisplayDate,
      newChat,
      route,
      storeDiagramAndNavigate,
      exit,
      showModal,
      closeModal,
       chatId,
       isshowmodal,
      toggleShowModal,
      openDeleteModal,
      deleteChat,
      isEditingTitle,
      editedTitle,
      startEditingTitle,
      saveTitle,
      inputRef,
      goToChat
    };
  },
};
</script>


  <style scoped>
  .history {
    overflow-y: scroll;
    max-height: 30vh;
  }

  .history::-webkit-scrollbar {
    width: 3px;
    /* Width of the vertical scrollbar */
    height: 12px;
    /* Height of the horizontal scrollbar */
  }

  /* Track of the scrollbar */
  .history::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* Background color of the track */
    border-radius: 10px;
    /* Optional: Rounded corners */
  }

  /* Thumb (handle) of the scrollbar */
  .history::-webkit-scrollbar-thumb {
    background: #888;
    /* Color of the thumb */
    border-radius: 10px;
    /* Optional: Rounded corners */
  }

  /* Thumb (handle) hover effect */
  .history::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* Color when hovered */
  }



  .history::-webkit-scrollbar {
    width: 3px;
    height: 12px;
  }

  .history {
    -webkit-overflow-scrolling: touch;
    /* Smooth scrolling for Safari */
  }

  .history-li {
    background-color: #f7f7f7;
    color: black !important;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pointer {
    cursor: pointer;
  }

  .icon-info {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
  }

  .menu-actions {
    position: absolute;
    right: 30px;
    top: 0px;
    background: #ffff;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    z-index: 99999999;
    width: max-content;
    margin-bottom: 40px;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in;
  }

  .showInfo {
    visibility: visible;
    opacity: 1;
  }

  .edit,
  .delete {
    display: flex;
    align-items: center;
  }

  .edit {
    margin-bottom: 1rem;
  }

  .modal-wrapper-delete {
    position: fixed;
    min-height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000011;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in;
  }

  .showmodal {
    opacity: 1;
    visibility: visible;
  }

  .modal-close {
    position: fixed;
    min-height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }

  .modal-delete-header {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .modal-content {
    margin: 2rem 0;
  }

  .actions-delete {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btn-modal {
    border: none;
    outline: none;
    width: 130px;
    padding: 7px 0;
    border-radius: 10px;
  }

  .delete-yes {
    background: #ff7272;
    color: #fff;
  }

  .delete-no {
    border: 1px solid;
  }

  .listchat {
    padding-left: 2rem;
  }


  @media (max-width:1280px) {
    .listchat{
      padding-left: 1rem;
    }
  }

  @media (min-width: 1024px) {
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      font-size: 14px;
    }
  }

  @media (max-width: 1024px) {
    .sidebar {
      display: none;
    }
  }

  .router-link-active {
    background-color: rgb(244, 244, 244);
  }


</style>

