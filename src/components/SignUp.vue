<template>
  <div class="flex justify-center">
    <div class="mobilesignin lg:hidden">
      <img src="../assets/logo.svg" alt="logo" class="mx-auto my-8 w-32" />
      <div class="bg-white bgwhite rounded-lg px-3 py-8 lg:px-10" style="height: 500px">
        <h2 class="txtcolor font-semibold text-lg capitalize">create account</h2>

        <div class="container1" :style="{ borderColor: errors.firstName ? 'red' : '' }">
          <label for="firstName">FirstName</label>
          <input type="text" id="firstName" v-model="firstName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.firstName }}</div>

        <div class="container1 mb-5" :style="{ borderColor: errors.lastName ? 'red' : '' }">
          <label for="lastName">LastName</label>
          <input type="text" id="lastName" v-model="lastName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.lastName }}</div>

        <div class="container1 mb-5" :style="{ borderColor: errors.companyName ? 'red' : '' }">
          <label for="companyName">CompanyName</label>
          <input type="text" id="companyName" v-model="companyName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.companyName }}</div>

        <div class="container1 mb-5" :style="{ borderColor: errors.emailAddress ? 'red' : '' }">
          <label for="emailAddress">Email Address</label>
          <input type="email" id="emailAddress" v-model="emailAddress" spellcheck="false" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.emailAddress }}</div>

        <div class="container1 mb-5" :style="{ borderColor: errors.password ? 'red' : '' }">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" spellcheck="false" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.password }}</div>

        <div class="flex mt-5">
          <div class="capitalize font-thin text-sm">already have an account?</div>
          <router-link to="./signin" class="capitalize txtcolor ml-2 text-sm hover:underline decoration-1">sign in</router-link>
        </div>

        <button @click="createAccount" class="container capitalize bgcolor px-20 py-3 text-nowrap text-white text-m mt-5 sm:bg-slate-400">
          create account
        </button>
      </div>
    </div>

    <div class="desktopsignin hidden lg:flex" style="height: 100vh;">
      
      <div class="bg-white scroll flex-col rounded-lg mr-16 px-0 lg:px-10 xl:w-2/6 lg:w-2/4 xl:px-16 pt-10">
        <img src="../assets/logo.svg" alt="logo" class="mb-5 lg:w-2/4" />
        <h2 class="txtcolor font-semibold text-lg capitalize">create account</h2>

        <div class="container1" :style="{ borderColor: errors.firstName ? 'red' : '' }">
          <label for="firstName">FirstName</label>
          <input type="text" id="firstName" v-model="firstName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.firstName }}</div>

        <div class="container1" :style="{ borderColor: errors.lastName ? 'red' : '' }">
          <label for="lastName">LastName</label>
          <input type="text" id="lastName" v-model="lastName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.lastName }}</div>

        <div class="container1" :style="{ borderColor: errors.companyName ? 'red' : '' }">
          <label for="companyName">CompanyName</label>
          <input type="text" id="companyName" v-model="companyName" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.companyName }}</div>

        <div class="container1" :style="{ borderColor: errors.emailAddress ? 'red' : '' }">
          <label for="emailAddress">Email Address</label>
          <input type="email" id="emailAddress" v-model="emailAddress" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.emailAddress }}</div>

        <div class="container1" :style="{ borderColor: errors.password ? 'red' : '' }">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" autocomplete="off" />
        </div>
        <div class="text-red-500">{{ errors.password }}</div>

        <div class="flex flex-col xl:flex-row">
          <div class="capitalize font-thin text-sm text-nowrap lg:text-md">already have an account?</div>
          <router-link to="./signin" class="capitalize text-nowrap txtcolor text-sm ml-2 lg:text-md hover:underline decoration-1">sign in</router-link>
        </div>

        <button @click="createAccount" class=" w-full py-2 text-nowrap text-white bg-red-500 text-m mt-5 hover:bg-white hover:text-red-500 hover:border-red-500">
          create account
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
  </div>
</template>


<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const firstName = ref('');
    const lastName = ref('');
    const companyName = ref('');
    const emailAddress = ref('');
    const password = ref('');
    const errorText = ref('');
    const hasError = ref(false);
    const errors = ref({
      firstName: '',
      lastName: '',
      companyName: '',
      emailAddress: '',
      password: ''
    });

    const validateFields = () => {
      let isValid = true;
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!firstName.value) {
        errors.value.firstName = 'First Name is required';
        isValid = false;
      } else {
        errors.value.firstName = '';
      }
      if (!lastName.value) {
        errors.value.lastName = 'Last Name is required';
        isValid = false;
      } else {
        errors.value.lastName = '';
      }
      if (!companyName.value) {
        errors.value.companyName = 'Company Name is required';
        isValid = false;
      } else {
        errors.value.companyName = '';
      }
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

    const createAccount = async () => {
      if (!validateFields()) {
        return;
      }

      try {
        const response = await axios.post('https://operapi.ariisco.com/signup/', {
          first_name: firstName.value,
          last_name: lastName.value,
          company: companyName.value,
          username: emailAddress.value,
          password: password.value,
          confirm_password: password.value
        });

        if (response.status === 201) {
          router.push('/signin');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorText.value = "email address already exists!";
          console.error('Error:', errorText.value);
          hasError.value = true;
        } else {
          console.error('Error:', error);
        }
      }
    };

    const closeModal = () => {
      hasError.value = false;
    };

    return {
      firstName,
      lastName,
      companyName,
      emailAddress,
      password,
      errorText,
      createAccount,
      hasError,
      errors,
      closeModal
    };
  },
};
</script>


<style scoped>

.scroll {
  overflow-y: scroll;
  height: 100vh;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Firefox */
.scroll::-moz-scrollbar {
  display: none;
}

/* Optional: Ensure Safari compatibility with a workaround */
.scroll {
  overflow: -moz-scrollbars-none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scroll {
  -webkit-overflow-scrolling: touch; /* Smooth scrolling for Safari */
}

.bgcolor {
  background-color: var(--color2);
}

.bgwhite {
  overflow-y: scroll;
  height: 90vh;
}

.bgwhite::-webkit-scrollbar {
  display: none;
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
  margin: 30px auto;
  border: 1px solid #ccc;
  border-radius: 6px;
}

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