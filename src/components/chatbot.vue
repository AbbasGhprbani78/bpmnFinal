<template>
  <div :class="['chatbot-container', isChatbotActive ? 'active-chatbot' : '']">
    <div class="chatbot-header">
      <div class="logo-wrapper">
        <img class="logo-chat" src="../assets/logop.png" alt="logo" />
        <p class="logo-title">Opermate Ai</p>
      </div>
      <div @click="toggleChatbot">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ff7272"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
          style="cursor: pointer; color: #ff7272"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <div class="chatbot-body">
      <div class="chat-content" ref="chatMessages">
        <div
          v-for="message in chatData"
          :key="message.id"
          :class="{
            'user-message': message.user === 'user',
            'ai-message': message.user === 'ai',
          }"
        >
          <p style="line-height: 27px">{{ message.message }}</p>
          <small>{{ message.timestamp }}</small>
        </div>
        <div v-if="errorchat" class="ai-message">
          <p style="line-height: 27px">
            An Issue Has Occurred, We Will Be Back Soon.
          </p>
        </div>
        <div v-if="loading" class="typing-indicator">
          <p class="ml-5">Typing</p>
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <div class="chatbot-actions">
        <input
          type="text"
          class="input-chat"
          placeholder="Message"
          maxLength="80"
          v-model="newMessage"
          @keyup.enter="sendMessage"
        />

        <svg
          style="color: #ff7272"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ff7272"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
          @click="sendMessage"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  </div>

  <div class="chat-icon-wrapper" @click="toggleChatbot">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import axios from "axios";

const sessionIdChatbot = ref(null);
const isChatbotActive = ref(false);
const newMessage = ref("");
const loading = ref(false);
const chatData = ref([]);
const chatMessages = ref(null);
const errorchat = ref(false);

const props = defineProps({
  hide: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:hide"]);

const toggleChatbot = () => {
  isChatbotActive.value = !isChatbotActive.value;
  if (isChatbotActive.value) {
    emit("update:hide", true);
  } else {
    emit("update:hide", false);
  }
};

console.log(props.hide);

watch(isChatbotActive, (newVal) => {
  if (newVal === true) {
    getsessionid();
  }
});

const getsessionid = async () => {
  const accessToken = localStorage.getItem("access");
  const body = {
    session_type: "temporal",
  };

  try {
    const response = await axios.post(
      `https://operapi.ariisco.com/newsession/`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 201) {
      console.log(response.data);
      sessionIdChatbot.value = response.data.session_id;
    }
  } catch (error) {
    console.error("Error fetching session ID:", error);
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    const timestamp = new Date().toLocaleString();
    const user = "user";
    const aiUser = "ai";

    chatData.value.push({
      id: chatData.value.length + 1,
      user,
      message: newMessage.value,
      timestamp,
    });

    const body = {
      session_id: sessionIdChatbot.value,
      getquestion: newMessage.value,
    };

    loading.value = true;

    try {
      newMessage.value = "";
      const accessToken = localStorage.getItem("access");
      const apiUrl = "https://operapi.ariisco.com/sendquestion/";
      const response = await axios.post(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status == 200) {
        const aiResponse = response.data.answer;

        chatData.value.push({
          id: chatData.value.length + 1,
          user: aiUser,
          message: aiResponse,
          timestamp: new Date().toLocaleString(),
        });
        scrollToBottom();
      }
    } catch (error) {
      console.error("Axios error:", error);
      errorchat.value = true;
    } finally {
      loading.value = false;
    }
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.style.scrollBehavior = "smooth";
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
};

watch(chatData, scrollToBottom, { deep: true });
</script>
<style scoped>
.chat-icon-wrapper {
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  color: #fff;
  width: 50px;
  height: 50px;
  z-index: 100;
}

.chatbot-container {
  position: fixed;
  width: 0;
  height: 0;
  bottom: 12%;
  right: 7%;
  z-index: 3;
  background: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999999999999999999;
  box-shadow: 0px 4px 4px 0px #00000040;
  min-width: 455px;
  max-height: 608px;
}

.active-chatbot {
  opacity: 1;
  visibility: visible;
  width: calc(24.5vw + 1vw);
  height: 77vh;
}

.chatbot-body {
  position: relative;
  height: 100vh;
  overflow-y: auto;
}

.chat-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 60px;
}

.chat-content::-webkit-scrollbar {
  display: none;
}

.chat-content {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chat-content::-webkit-scrollbar {
  display: none;
}

.chat-bottom {
  width: 100%;
  background: transparent;
}

.chatbot-actions {
  background-color: #fff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 9px 10px;
  box-shadow: 0px 0px 4px 0px #00000040;
  width: 92%;
  margin: 0 auto;
  border: 1px solid #ff7272;
}

.input-chat {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
}

.user-message {
  padding: 10px;
  border-radius: 20px 20px 0 20px;
  color: #79747e;
  margin-left: auto;
  margin-right: 20px;
  margin-top: 20px;
  text-align: right;
  font-size: 15px;
  overflow-wrap: break-word;
  border: 1px solid #c7c7c7;
  max-width: 75%;
}

/* Style for AI messages */
.ai-message {
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  color: #091a37;
  margin-top: 20px;
  text-align: left;
  overflow-wrap: break-word;
  background: #ff7272;
  color: #fff;
  border-radius: 20px 20px 20px 0;
  max-width: 75%;
  margin-left: 20px;
  margin-right: auto;
}
.chatbot-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ededed;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-chat {
  width: 30px;
  height: auto;
}
.logo-title {
  color: #ff7272;
  margin-left: 20px;
}

.logo-title {
  font-weight: bold;
}
.ariis-title {
  color: #ff7272;
  font-weight: bold;
  margin: 10px 0;
}
.typing-indicator {
  text-align: left;
  margin-top: 10px;
  padding: 5px;
  animation: typingAnimation 1.5s infinite;
}

.typing-indicator p::after {
  content: "";
  animation: typingAnimation 1.5s infinite;
}

.chat-bottom {
  padding: 0 0 15px 0;
}
@media (max-width: 1464px) {
  .active-chatbot {
    width: 30vw;
  }
}

@media (max-width: 1248px) {
  .active-chatbot {
    width: 34vw;
  }
}

@media (max-width: 1124px) {
  .active-chatbot {
    width: 40vw;
  }
}

@media (max-width: 1005px) {
  .active-chatbot {
    width: 45vw;
  }
}

@media (max-width: 992px) {
  .active-chatbot {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    min-height: 100dvh;
    z-index: 999999999999999999999999999999999;
    min-width: 100%;
  }
  .chatbot-container {
    border-radius: 0;
  }
}

@keyframes typingAnimation {
  0% {
    content: " ";
  }

  25% {
    content: ".";
  }

  50% {
    content: ". .";
  }

  75% {
    content: ". . .";
  }
}
</style>
