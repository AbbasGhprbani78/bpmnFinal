<template>
  <div class="lg:flex">
    <SliderPage v-if="route.path !== '/signin' && route.path !== '/signUp'" />
    <router-view class="router" />
  </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router";
import SliderPage from "./components/SliderPage.vue";
import { onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const checkUser = async () => {
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const body = { refresh };
          const apiUrl = "https://operapi.ariisco.com/token/refresh/";
          const response = await axios.post(apiUrl, body);

          if (response.status === 200) {
            localStorage.setItem("access", response.data.access);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            router.push("/signin");
          }
          router.push("/signin");
        }
      } else {
        router.push("/signin");
      }
    };

    onMounted(() => {
      checkUser();
    });

    return { route };
  },

  components: {
    SliderPage,
  },
};
</script>

<style>
#app {
  width: 100%;
}

:root {
  --color1: #f7f7f7;
  --color2: #ff4f4f;
}

body {
  background-color: #f7f7f7;
}

.icon {
  color: var(--color2);
}

.iconbg {
  background-color: var(--color2);
}
</style>
