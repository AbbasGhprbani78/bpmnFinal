<template>
  <div>
 <div>
  <MobileHeader />
 </div>

    <router-link to="/deskhomePage" class="lg:hidden">
    </router-link>
   <div>
    <div>
      <p class="title-chat3">{{ titleChat }}</p>
      <div class="chat py-5 h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4 lg:h-5/6">
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(message, index) in chatData"
          :key="index"
          :class="{
            'user-message': message.user === 'user',
            'ai-message': message.user === 'ai',
          }"
          class="message-container"
        >
          <p :class="{'text-right': message.user === 'user', 'text-left': message.user === 'ai'}">{{ message.message }}</p>
          <small>{{ message.timestamp }}</small>
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
    </div>
   </div>
  </div>
</template>

<script>
import MobileHeader from './MobileHeader.vue';
import SliderPage from './SliderPage.vue';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const chatData = ref([]);
    const newMessage = ref('');
    const chatMessages = ref(null);
    const route = useRoute();
    const answer = ref('');
    const titleChat=ref("")

    const fetchConversations = async (uuid) => {
      try {
        const accessToken = localStorage.getItem('access');
        const response = await axios.get(`https://operapi.ariisco.com/conversations/${uuid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const conversations = response.data.conversations;
          chatData.value = [];
          conversations.forEach((conversation) => {
            chatData.value.push({
              id: chatData.value.length + 1,
              user: 'user',
              message: conversation.question,
              timestamp: conversation.date,
            });
            chatData.value.push({
              id: chatData.value.length + 1,
              user: 'ai',
              message: conversation.answer,
              timestamp: conversation.date,
            });
          });
          scrollToBottom();
        }
      } catch (error) {
        console.error(error);
      }
    };

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

        


        const accessToken = localStorage.getItem('access');

        const body = { session_id: route.params.uuid, getquestion: newMessage.value };

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        try {
          newMessage.value = '';
          const response = await axios.post("https://operapi.ariisco.com/sendquestion/", body, { headers });

          if (response.status === 200) {
            answer.value = response.data.answer;
            chatData.value.push({
              id: chatData.value.length + 1,
              user: aiUser,
              message: answer.value,
              timestamp: new Date().toLocaleString(),
            });

            
            scrollToBottom();
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    const scrollToBottom = () => {
      nextTick(() => {
        if (chatMessages.value) {
          chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
        }
      });
    };

    onMounted(() => {
      fetchConversations(route.params.uuid);
     
    });

    const updateTitleChatFromLocalStorage = () => {
      titleChat.value = localStorage.getItem("nameChat") || "";
    };

    onMounted(() => {
      fetchConversations(route.params.uuid);
      updateTitleChatFromLocalStorage();

      window.addEventListener('storage', updateTitleChatFromLocalStorage);

      const intervalId = setInterval(updateTitleChatFromLocalStorage, 1000); 

      onBeforeUnmount(() => {
        clearInterval(intervalId);
        window.removeEventListener('storage', updateTitleChatFromLocalStorage);
      });
    });
    

    watch(
      () => route.params.uuid,
      (newUuid) => {
        fetchConversations(newUuid);
      }
    );

    
    watch(chatData, scrollToBottom, { deep: true });

    return {
      chatData,
      newMessage,
      sendMessage,
      chatMessages,
      titleChat
    };
  },
  components: {
    SliderPage,
    MobileHeader,
  },
};
</script>

<style scoped>
.message-container {
  margin-bottom: 1rem;
}
.user-message {
  text-align: right;
}
.ai-message {
  text-align: left;
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

.chat-messages {
  overflow-y: scroll;
  max-height: 70vh;
  scroll-behavior: smooth;
}

.ai-message{
  max-width: 70%;
}
}

@media(max-width:1024px) {
  .chat-messages {
  overflow-y: scroll;
  max-height: 60vh;
  scroll-behavior: smooth;
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

.title-chat3{
position: fixed;
left: 23%;
top:20px
}


@media (max-width:1024px) {
  .title-chat3{
    left: 20px;
    top: 60px;
  }
}
</style>
