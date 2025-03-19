<template>
  <div v-if="show" style="z-index: 99;" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" @click.self="closeForm">
    <div class="bg-white px-10 py-8 rounded-lg lg:w-2/6 w-11/12 sm:w-1/2">

      <div class="flex flex-col">
        <span class="capitalize text-start">personal info</span>
      <hr>
      </div>

      <form @submit.prevent="submitForm">
        <div class="mb-5 mt-5">
          <label for="input1" class="block text-start text-xs font-medium text-gray-500">Username</label>
          <input type="text" id="input1" v-model="form.input1" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 focus:ring-red-200 sm:text-sm px-3"/>
          <span v-if="errors.input1" class="text-red-500 text-sm">{{ errors.input1 }}</span>
        </div>
        <div class="mb-4">
          <label for="input2" class="block text-start  text-xs font-medium text-gray-500">First Name</label>
          <input type="text" id="input2" v-model="form.input2" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-3"/>
          <span v-if="errors.input2" class="text-red-500 text-sm">{{ errors.input2 }}</span>
        </div>
        <div class="mb-4">
          <label for="input3" class="block text-start  text-xs font-medium text-gray-500">Last Name</label>
          <input type="text" id="input3" v-model="form.input3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-3"/>
          <span v-if="errors.input3" class="text-red-500 text-sm">{{ errors.input3 }}</span>
        </div>
        <div class="mb-4">
          <label for="input4" class="block text-start  text-xs font-medium text-gray-500">Company Name</label>
          <input type="text" id="input4" v-model="form.input4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-3"/>
          <span v-if="errors.input4" class="text-red-500 text-sm">{{ errors.input4 }}</span>
        </div>

        <div class="mb-4">
          <label for="input4" class="block text-start  text-xs font-medium text-gray-500">Model Name</label>
          <!-- <input type="text" id="input4" v-model="form.input4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-3"/> -->
           <select   @change="(e)=>chooseitems(e.target.value)" v-model="items" class=" bg-white mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-2">
            <option :value="0" :selected="items == 0">ChatGPT</option>
            <option :value="1" :selected="items == 1">Llama</option>
           </select>
          <span v-if="errors.input4" class="text-red-500 text-sm">{{ errors.input4 }}</span>
        </div>

        <div class="flex justify-start items-center mb-5">
          <input type="checkbox" v-model="showPassField">
          <label class="capitalize text-sm ml-2">show password</label>
        </div>

        <div class="mb-4" v-if="showPassField">
          <label for="input5" class="block text-start  text-xs font-medium text-gray-500">Password</label>
          <input type="text" id="input5" v-model="form.input5" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border py-2 focus:border-gray-500 sm:text-sm px-3"/>
        <span v-if="errors.input5" class="text-red-500 text-sm">{{ errors.input5 }}</span>
        </div>

        <div class="flex justify-center w-full mt-10">
          <button  type="submit" class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200">
            Edit
          </button>
        </div>
      </form>

      <!-- <div v-if="success" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Error</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quaerat!</p>
        <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
    });

    const errors = ref({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
       input5: '',
    });

    const showPassField = ref(false);

    const items = ref('');



   
  
    const closeForm = () => {
      emit('close');
      getUserInfo();
    };

    const submitForm = async () => {
      const accessToken = localStorage.getItem('access');
      const { input1, input2, input3, input4, input5 } = form.value;
      const emailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
      Object.keys(errors.value).forEach(key => {
        errors.value[key] = '';
      });

      let isValid = true;
      if (input1 === '') {
        errors.value.input1 = 'Username is required';
        isValid = false;
      }
      if(!emailRegex.test(input1)){
         errors.value.input1 = 'Username is invalid';
         isValid = false;
      }
      if (input2 === '') {
        errors.value.input2 = 'First Name is required';
        isValid = false;
      }
      if (input3 === '') {
        errors.value.input3 = 'Last Name is required';
        isValid = false;
      }
      if (input4 === '') {
        errors.value.input4 = 'Company Name is required';
        isValid = false;
      }

  if (showPassField.value && input5 === '') {
    errors.value.input5 = 'Password is required';
    isValid = false;
  }

      if (!isValid) {
        return;
      }

      const body={
          username: input1,
          first_name: input2,
          last_name: input3,
          companny: input4,
          type_chat:items.value
      }
      if (input5 !== '') body.password = input5;

      try {
        const response = await axios.put('https://operapi.ariisco.com/edit-profile/', 
         body
        , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          closeForm();
         window.location.reload()
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getUserInfo = async () => {
      const accessToken = localStorage.getItem('access');
      try {
        const response = await axios.get('https://operapi.ariisco.com/get-profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    if(response.status===200){
        form.value.input1 = response.data.username;
        form.value.input2 = response.data.first_name;
        form.value.input3 = response.data.last_name;
        form.value.input4 = response.data.company;
        items.value = response.data.type_chat;

}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const validateFields = () => {
      let isValid = true;
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      if (!input1.value) {
        errors.value.input1 = 'Email Address is required';
        isValid = false;
      } else if (!emailRegex.test(input1.value)) {
        errors.value.input1 = 'Invalid Email Address';
        isValid = false;
      } else {
        errors.value.input1 = '';
      }

      return isValid;
    }

    onMounted(() => {
      getUserInfo();
    });

    function chooseitems(item) {
      items.value = item
    }

    return {
      form,
      errors,
      closeForm,
      submitForm,
      showPassField,
      validateFields,
      items,
      chooseitems,
 
    };
  },
};
</script>

<style scoped>

</style>
