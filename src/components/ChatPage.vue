<template>
 
    <MobileHeader title="ai chat helper" />
    <!-- <SliderPage class="sidebar"/> -->

    <div class="flex justify-start w-2/3 ml-20">
      <div class="chat h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4">
        <div class="chat-messages capitalize" ref="chatMessages">
          <div v-for="message in chatData" :key="message.id" :class="{
              'user-message': message.user === 'user',
              'ai-message': message.user === 'ai',
            }">
            <p>{{ message.message }}</p>
            <small>{{ message.timestamp }}</small>
          </div>

          <div v-if="loading" class="typing-indicator">
            <p class="ml-5">Typing </p>
          </div>
        </div>

        <div class="chatinput px-3 w-11/12 fixed bottom-5 rounded-full flex items-center justify-around bg-white">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Start Typing . . ." type="text" class="rounded-full mt-0 w-11/12 py-2 px-3" />
          <button @click="sendMessage" class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 icon"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>

      <span class="hidden lg:ml-16 xl:ml-5 capitalize font-bold text-lg lg:mt-8 left-2/4 transform -translate-x-1/2 lg:translate-x-0 lg:right-8 lg:left-auto">ai chat helper</span>
    </div>
</template>

<script>
import SliderPage from './SliderPage.vue';
import MobileHeader from './MobileHeader.vue';
import { ref} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    MobileHeader,
    SliderPage,
  },
  
  setup() {

   const route = useRoute();
   const router = useRouter();


    const chatData = ref([
      {
        id: 1,
        user: 'ai',
        message: 'Hello! How can I assist you today?',
        timestamp: '2024-02-01T12:30:00Z',
      },
      {
        id: 2,
        user: 'user',
        message: 'I have a question about...',
        timestamp: '2024-02-01T12:40:00Z',
      },
    ]);

    const newMessage = ref('');
    const chatMessages = ref(null);
    const loading = ref(false);
    const sessionID = ref(route.params.id || '');


    const sendMessage = async () => {
      
      if (newMessage.value.trim() !== '') {
        const timestamp = new Date().toLocaleString();
        const user = 'user';
        const aiUser = 'ai';

        chatData.value.push({
          id: chatData.value.length + 1,
          user,
          message: newMessage.value,
          timestamp,
        });

       

         const body = { session_id: sessionID.value ,
                        getquestion:newMessage.value
       };

        loading.value = true;
         

        try {
          newMessage.value = '';
          const accessToken = localStorage.getItem('access');
          const apiUrl = 'https://operapi.ariisco.com/sendquestion/';
          const response = await axios.post(apiUrl, body, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.status==200) {
            const aiResponse = response.data.answer;
        
            chatData.value.push({
              id: chatData.value.length + 1,
              user: aiUser,
              message: aiResponse,
              timestamp: new Date().toLocaleString(),
            });
             router.push(`/historychat/${sessionID.value}`);
          }
        } catch (error) {
          console.error('Axios error:', error);
        } finally {
          loading.value = false;
        }
      
      }
    };

    return {
      chatData,
      newMessage,
      sendMessage,
      chatMessages,
      loading,
      sessionID,
    };
  },
};
</script>

<style scoped>
.chat {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 5px 15px lightgray;
}

.sidebar {
  position: fixed;
  bottom: 0;
}

.chat-messages {
  overflow-y: scroll;
  max-height: 70vh;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  display: none;
}

.chat-messages {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Firefox */
.chat-messages::-moz-scrollbar {
  display: none;
}

/* Optional: Ensure Safari compatibility with a workaround */
.chat-messages {
  overflow: -moz-scrollbars-none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.chat-messages {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

.chatinput {
  /* width: 90%; */
  left: 5%;
  box-shadow: 0px 3px 7px lightgray;
}

/* Style for user messages */
.user-message {
  padding: 2px 5px;
  border-radius: 10px;
  color: lightslategray;
  margin-left: auto;
  margin-right: 20px;
  margin-top: 20px;
  text-align: right;
  font-size: 15px;
  overflow-wrap: break-word;
}

/* Style for AI messages */
.ai-message {
  padding: 2px 20px;
  border-radius: 10px;
  font-size: 15px;
  color: #091a37;
  margin-top: 20px;
  text-align: left;
  overflow-wrap: break-word;
}

@media(min-width: 1024px) {
.user-message{
  max-width: 70%;
}

.ai-message{
  max-width: 70%;
}
}

/* Typing indicator styles */
.typing-indicator {
  text-align: left;
  margin-top: 10px;
  padding: 5px;
  animation: typingAnimation 1.5s infinite;
}

.typing-indicator p::after {
  content: '';
  animation: typingAnimation 1.5s infinite;
}

@keyframes typingAnimation {
  0% { content: " "; }
  25% { content: "."; }
  50% { content: ". ."; }
  75% { content: ". . ."; }
}
</style>










refresh