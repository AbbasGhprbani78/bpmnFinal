<template>
  <div>
    <MobileHeader />

    <div class="chat h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4 lg:h-5/6">
<div class="scrolll" ref="chatMessages">
  <div class="flex flex-col px-4 mt-5 items-start scroll">
<div class="flex justify-between items-start w-full">
  <div class="title text-start capitalize font-bold xl:text-xl icon">{{ responseTitle }}</div>
  <router-link to="/flowchart2" class="icon capitalize text-nowrap underline">flow chart</router-link>
</div>

<p class="capitalize text-sm mt-2 lg:w-3/4 text-gray-400 text-start">{{ responseDescription }}</p>

</div>



<div class="" >
<div
  v-for="message in chatData"
  :key="message.id"
  :class="{
    'user-message': message.user === 'user',
    'ai-message': message.user === 'ai',
  }"
>
  <p>{{ message.message }}</p>
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
</template>

<script>
import axios from 'axios';
import MobileHeader from './MobileHeader.vue';
import SliderPage from './SliderPage.vue';
import { ref, onMounted,watch,nextTick  } from 'vue';
import { useRoute } from 'vue-router';
import chatbot from './chatbot.vue'

export default {
  setup() {
    const route = useRoute();
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
    const responseTitle = ref('');
    const responseDescription = ref('');
    const answer = ref('');

    const sendMessage = async () => {
    
      if (newMessage.value.trim() !== '') {
        const timestamp = new Date().toLocaleString();
        const user = 'user';
        const aiUser = 'ai';
        const sessionId = localStorage.getItem("idconversition");
        const accessToken = localStorage.getItem('access');

        chatData.value.push({
          id: chatData.value.length + 1,
          user,
          message: newMessage.value,
          timestamp,
        });


        const body = { session_id: sessionId, getquestion: newMessage.value };

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

   const fetchConversations = async () => {
     const title=localStorage.getItem("titlechat")
     if(title){
      responseTitle.value=title
     }
      const sessionId = localStorage.getItem("idconversition");
      try {
        const accessToken = localStorage.getItem('access');
        const response = await axios.get(`https://operapi.ariisco.com/conversations/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const conversations = response.data.conversations;
          
          if (conversations.length > 0) {
            const firstConversation = conversations[0]
            responseDescription.value = firstConversation.answer;
           
          }
          
          chatData.value = [];
          conversations.splice(0,1)
          conversations.forEach((conversation, index) => {
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

    const fetchData = async () => {
      const accessToken = localStorage.getItem('access');
      const processId = route.params.id;
      const body = { process_id: processId };
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {

        const response = await axios.post("https://operapi.ariisco.com/sendprocessid/", body, { headers });
        if (response.status === 201) {
          responseTitle.value = response.data.process_name;
          responseDescription.value = response.data.process_description;
          localStorage.setItem("idconversition", response.data.session_id);
          localStorage.setItem("titlechat",response.data.process_name)
          localStorage.setItem("diagram",response.data.process_diagram)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
      if (localStorage.getItem("idconversition")) {
        fetchConversations();
      }else{
        fetchData()
      }
    });
 
    watch(scrollToBottom, { deep: true });

    return {
      chatData,
      newMessage,
      sendMessage,
      chatMessages,
      responseTitle,
      responseDescription,
    };
  },
  components: {
    SliderPage,
    MobileHeader,
  },
};
</script>


<style scoped>


.scrolll {
  overflow-y: scroll;
  height: 60vh;
  scroll-behavior: smooth;
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
  
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 15px;
  color: #091a37;
  margin-left: 20px;
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





    
