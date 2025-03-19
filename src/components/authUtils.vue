

<script>
// src/authUtils.js
import axios from 'axios';


export const checkUser = async (router) => {
const refresh = localStorage.getItem("refresh");
  try {
    const body = {
        refresh
    }
    const apiUrl = 'https://operapi.ariisco.com/token/refresh/'; // Replace with your actual API URL
    const response = await axios.post(apiUrl, body );

    if (response.status === 200) {
    } else {
      router.push('/signin');
    }
  } catch (error) {
    console.error('Axios error:', error);
    router.push('/signin');
  }
};

</script>

<style>

</style>