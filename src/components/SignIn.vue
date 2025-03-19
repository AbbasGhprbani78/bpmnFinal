<template>
  <div class="flex justify-center">

    <div class="mobilesignin lg:hidden">
      <img src="../assets/logo.svg" alt="logo" class="mx-auto my-8 w-32" />
      <div
      class="bg-white bgwhite rounded-lg px-3 py-8 lg:px-10 capitalize"
      style="height: 500px"
    >
    <h2 class="txtcolor font-semibold text-xl">Welcome Back!!!</h2>

    <div v-if="forgetFieldVisible === 1">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">UserName</label>
        <input type="text" id="inputField" v-model="emailAddress" spellcheck="false" autocomplete="off" />
      </div>
      <div class="text-red-500">{{ errors.emailAddress }}</div>

      <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md">Password</label>
        <input type="password" id="inputField" v-model="password" spellcheck="false" autocomplete="off" />
      </div>
      <div class="text-red-500">{{ errors.password }}</div>
      <div class="flex">
        <button @click="forgetPass" to="/signUp" class="capitalize text-blue-500 text-sm mx-3">forget password?</button>
      </div>
      </div>

      <div v-else-if="forgetFieldVisible === 2">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">email</label>
        <input type="text" id="inputField" class="lg: w-80" v-model="emailAddress" spellcheck="false" autocomplete="off" />
      </div>
      <div class="text-red-500">{{ errors.emailAddress }}</div>
      </div>

      <div v-else-if="forgetFieldVisible === 3">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">code</label>
        <input type="text" id="inputField" class="lg: w-80" v-model="code" spellcheck="false" autocomplete="off" />
        <div class="text-red-500">{{ errors.code }}</div>
      </div>

      <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">new password</label>
        <input type="password" id="inputField" class="lg: w-80" v-model="newpassword" spellcheck="false" autocomplete="off" />
        <div class="text-red-500">{{ errors.newpassword }}</div>
      </div>
      </div>

      

      <div class="flex mt-5 mx-3">
        <div class="capitalize font-thin text-sm">not registered yet?</div>
        <router-link to="./signUp" class="capitalize text-sm txtcolor ml-2 hover:underline decoration-1">create account</router-link> 
      </div>

      <button
      v-if="forgetFieldVisible === 1"
        @click="createAccount"
        class="container bgcolor px-20 py-3 text-nowrap text-white bgcolor text-m mt-20 hover:bg-white hover:text-white hover:border-red-500">
        Sign In
      </button>

      <button
       v-else-if="forgetFieldVisible === 2"
        @click="sendEmail"
        class="container bgcolor capitalize px-20 py-3 text-nowrap text-white bg-red-500 text-m mt-20 hover:bg-white hover:border-red-500"
      >
       send1
      </button>

      <button
       v-else-if="forgetFieldVisible === 3"
        @click="resetPass"
        class="container bgcolor capitalize px-20 py-3 text-nowrap text-white bg-red-500 text-m mt-20 hover:bg-white hover:border-red-500">
        send2
      </button>
    </div>
    </div>

    
    <div class="desktopsignin hidden lg:flex" style="height: 100vh;">
      <div
      class=" bg-white flex-col rounded-lg mr-16 px-0 lg:px-16 py-10 xl:px-18 lg:w-2/4 xl:w-2/6"
    >
    <img src="../assets/logo.svg" alt="logo" class="mb-10" />
      <h2 class="txtcolor font-semibold text-lg lg:text-xl">Welcome Back!!!</h2>

      <div style="color: black;" v-if="forgetFieldVisible === 1">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">UserName</label>
        <input type="text" id="inputField" class="lg: w-80" v-model="emailAddress" spellcheck="false" autocomplete="off" />
      </div>
      <div class="text-red-500">{{ errors.emailAddress }}</div>

      <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md">Password</label>
        <input type="password" id="inputField" class="lg: w-80" v-model="password" spellcheck="false" autocomplete="off" />
        <div class="text-red-500">{{ errors.password }}</div>
        
      </div>
      <div class="flex">
        <button @click="forgetPass" to="/signUp" class="capitalize text-blue-500 text-sm">forget password?</button>
      </div>
      </div>

      <div v-else-if="forgetFieldVisible === 2">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">email</label>
        <input type="text" id="inputField" class="lg: w-80" v-model="emailAddress" spellcheck="false" autocomplete="off" />
      </div>
      <div class="text-red-500">{{ errors.emailAddress }}</div>
      </div>

      <div v-else-if="forgetFieldVisible === 3">
        <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">code</label>
        <input type="text" id="inputField" class="lg: w-80" v-model="code" spellcheck="false" autocomplete="off" />
        <div class="text-red-500">{{ errors.code }}</div>
      </div>

      <div class="container1" :style="{ borderColor: hasError ? 'red' : '' }">
        <label for="inputField" class="lg: text-md capitalize">new password</label>
        <input type="password" id="inputField" class="lg: w-80" v-model="newpassword" spellcheck="false" autocomplete="off" />
        <div class="text-red-500">{{ errors.newpassword }}</div>
      </div>
      </div>

      <div class="flex mt-5">
        <div class="capitalize font-thin text-sm text-nowrap lg:text-md">not registered yet?</div>
        <router-link to="./signUp" class="capitalize text-nowrap txtcolor text-sm ml-2 lg:text-md hover:underline decoration-1">create account</router-link>
      </div>

      <button
      v-if="forgetFieldVisible === 1"
        @click="createAccount"
        class="px-20 py-3 w-full text-nowrap text-white bg-red-500 text-m mt-20 hover:bg-white hover:text-red-500 hover:border-red-500"
      >
        Sign In
      </button>

      <button
       v-else-if="forgetFieldVisible === 2"
        @click="sendEmail"
        class="capitalize px-20 py-3 text-nowrap text-white bg-red-500 text-m mt-20 hover:bg-white hover:text-red-500 hover:border-red-500" style="width: 320px;"
      >
       send1
      </button>

      <button
       v-else-if="forgetFieldVisible === 3"
        @click="resetPass"
        class="capitalize px-20 py-3 text-nowrap text-white bg-red-500 text-m mt-20 hover:bg-white hover:text-red-500 hover:border-red-500" style="width: 320px;"
      >
        send2
      </button>
    </div>
    

    <div class="flex justify-around align-middle items-center">
      <img src="../assets/signin.svg" alt="img" class="hidden lg:block" />
    </div>
    </div>

    <div v-if="hasError" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Error</h3>
        <p>{{ errorText }}</p>
        <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>

  
      <div v-if="sendEmailPass" class="bg-white px-20 py-3 rounded-lg absolute sendPassEmail bottom-5 right-5 shadow-lg border border-gray-300">
        <p class=" text-nowrap w-full">Email has been sent</p>
      </div>
    </div>

</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
export default {

  setup() {
    const router = useRouter();
    const emailAddress = ref('');
    const password = ref('');
    const errorText = ref('');
    const code=ref("")
    const newpassword=ref("")
    const hasError = ref(false);
    let sendEmailPass = ref(false);;
    const errors = ref({
      emailAddress: '',
      password: '',
      code:"",
      newpassword:""
    });

    let forgetFieldVisible = ref(1);


    async function sendEmail() {
       if (!validateEmail()) {
        return;
      }
      sendEmailPass.value = true
      try {
        const response = await axios.post('https://operapi.ariisco.com/forgotpassword/',{
           email: emailAddress.value,
        })
        if(response.status===200){
           forgetFieldVisible.value =3
           sendEmailPass.value = false
        }
      } catch(error){
        if(response.status ===400){
          errorText.value = error.response.data.detail;
          hasError.value = true;
        }
        
        console.log(error);
      }
    }

    async function resetPass() {
        if (!validateReset()) {
        return;
      }
     
      const formData = new FormData()

      formData.append("token" , code.value)
      formData.append("new_password" , newpassword.value)

      try {
        const response = await axios.post('https://operapi.ariisco.com/resetpassword/',formData)
        
      if(response.status===200){
        forgetFieldVisible.value =1
      }
      } catch(error){
        if(response.status === 400){
          errorText.value = error.response.data.detail;
          hasError.value = true;
        }
        
        console.log(error);
      }
    }

    function forgetPass() {
      forgetFieldVisible.value = 2;
      if(response.status === 400){
        
      }
    }

    const createAccount = async () => {
      if (!validateFields()) {
        return;
      }
      try {
        const response = await axios.post('https://operapi.ariisco.com/login/', {
          username: emailAddress.value,
          password: password.value,
        });

        if (response.status === 200) {;
          const accessToken = response.data.access;
          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', response.data.refresh);

          router.push('/');
        } else {
   
          console.error('Unexpected response status:', response.status);
          hasError.value = true;
        }
      } catch (error) {

          errorText.value = error.response.data.detail;
          hasError.value = true;
          console.log(error);
      }
    };

    const validateEmail=()=>{
       let isValid = true;
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!emailAddress.value) {
        errors.value.emailAddress = 'Email Address is required';
        isValid = false;
      } else if (!emailRegex.test(emailAddress.value)) {
        errors.value.emailAddress = 'Invalid Email Address';
        isValid = false;
      } else {
        errors.value.emailAddress = '';
      }
      return isValid;
     
    }

    const validateReset=()=>{
      let isValid = true;
      if(!code.value){
      errors.value.code="Invalid Code"
        isValid = false;
 }

 if(!newpassword.value){
      errors.value.newpassword=" Invalid New Password"
 }
   return isValid;
    }

    const validateFields = () => {
      let isValid = true;
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    
      if (!emailAddress.value) {
        errors.value.emailAddress = 'Email Address is required';
        isValid = false;
      } else if (!emailRegex.test(emailAddress.value)) {
        errors.value.emailAddress = 'Invalid Email Address';
        isValid = false;
      } else {
        errors.value.emailAddress = '';
      }

      if (!password.value) {
        errors.value.password = 'Password is required';
        isValid = false;
      } else {
        errors.value.password = '';
      }
      return isValid;
    };

 

    const closeModal = () => {
      hasError.value = false;
    };

    return {
      emailAddress,
      password,
      errorText,
      createAccount,
      hasError,
      forgetFieldVisible,
      forgetPass,
      sendEmail,
      resetPass,
      router,
      validateFields,
      errors,
      closeModal,
      code,
      newpassword,
      sendEmailPass
    };
  },
};
</script>

<style scoped>
.bgcolor {
  background-color: var(--color2);
}

.txtcolor {
  color: var(--color2);
}

.container {
  position: relative;
  /* width: 350px; */
  /* margin: 30px auto; */
  border: 1px solid #ccc;
  border-radius: 6px;
}

.container1 {
  position: relative;
  /* width: 350px; */
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* .bgwhite {
  overflow-y: scroll;
  height: 90vh;
}

.bgwhite::-webkit-scrollbar {
  display: none;
} */

label {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  font-size: 14px;
  color: #777;
  z-index: 1;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
