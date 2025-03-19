<template>
  <div class="flex justify-start ml-5 py-2 lg:hidden">
    <OffcanvasMenu />
  </div>
  <div class="wrap-menu-flow-chart">
    <p class="text-flowchart title">Flow Chart</p>
    <div v-if="loading" class="loading">
      <span class="loader"></span>
    </div>
    <div v-else class="flow-chart-box">
      <p class="text-flowchart box-title"> Maturity Level :</p>
      <Accordion :chartData="chartData" :getAllDiagram="getAllDiagram" :userDiagram="userDiagram" />
      <div class="coustom-create">
        <div style="display: flex; justify-content: space-between; align-items: center;padding-right: 25px;">
          <p class="coustom_title">Custom Flow Chart</p>
          <router-link class="add-wrap" to="/flowchart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </router-link>
        </div>
        <div v-if="chartData && chartData[5] && chartData[5].user_diagrams.length" class="all-creatediagram">
          <div v-for="(item, index) in chartData[5].user_diagrams" :key="index">
            <div class="wrap-box-flow-chart">
              <boxflowchart :imgsrc="item.image" />
              <div class="edit-icon" @click="goToFlowChart( item?.id,item?.diagram)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 ">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <div class="delete-icon" @click="openModal(item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6 ">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
              <p style="margin-top: 1rem;">{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div v-else class="no-diagram-create">
          <p class="no-title">No Added Custom Diagram</p>
          <button class="create-btn" @click="creatediagram">
            Add New Flow Chart
            <svg style="margin-left: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <chatbot :hide="hide" />
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
        <p>Are you sure you want to delete the diagram?</p>
      </div>
      <div class="actions-delete">
        <button class="btn-modal delete-yes" @click="deleteDiagram">Yes</button>
        <button class="btn-modal delete-no" @click="toggleShowModal">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import chatbot from './chatbot.vue';
import Accordion from './FlowChartComponent/Accordion.vue'
import axios from 'axios';
import boxflowchart from './FlowChartComponent/boxflowchart.vue';
import { useRouter } from 'vue-router';
import OffcanvasMenu from './OffcanvasMenu.vue'
const idDiagram=ref("")
const chartData = ref(null);
const router = useRouter();
const isshowmodal = ref(false);
const userDiagram=ref(false)
const success = ref(false);
const loading = ref(true);

const hide=ref(false)


const creatediagram=()=>{
  router.push('flowchart')
}
const getAllDiagram=async()=>{
  const accessToken = localStorage.getItem('access');
  try {
    const response = await axios.get("https://operapi.ariisco.com/display_alldiagrams", {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    if(response.status==200) {
      chartData.value = response.data.charts;
      userDiagram.value=response.data.user_level
      loading.value=false
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteDiagram = async () => {
  try {
    const body = {
      id: idDiagram.value,
    };
    const accessToken = localStorage.getItem('access');
    const response = await axios.delete(`https://operapi.ariisco.com/delete_diagram/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    if (response.status === 200) {
      isshowmodal.value = false;
      success.value=true
      getAllDiagram();
    }
  } catch (error) {
    console.log(error);
  }
};

const goToFlowChart=(id,diagram)=>{
    localStorage.setItem("process_id",id)
    localStorage.setItem("diagram",diagram)
  router.push('flowchart3')
}


const toggleShowModal = () => {
  isshowmodal.value = !isshowmodal.value;
};

const openModal = (id) => {
    toggleShowModal();
    idDiagram.value=id
};


onMounted(()=>{
  getAllDiagram()
})

</script>

<style scoped>
.wrap-menu-flow-chart{
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80%;
  margin-left: 18.5%;
}

.title{
padding-bottom: 15px;
font-weight: bold;
font-size: 1.1rem;
}
.box-title{
  padding: 30px 25px 0px 25px;
  margin-bottom: 2rem;
}
.text-flowchart{
font-weight: bold;
width: max-content;
}

.flow-chart-box{
box-shadow: 5px 0px 30px 0px #0000001A;
border-radius: 20px 20px 0 0;
background: #fff;
display: flex;
flex-direction: column;
flex-grow: 1;
overflow-y: auto;
height: 100%;
 }

 .flow-chart-box::-webkit-scrollbar{
  display: none;
 }

.coustom_title{
width: max-content;
font-weight: bold;
margin-top: 1.5rem;
padding-left: 25px;
margin-bottom: 1rem;
}
.no-diagram-create{
margin-top: 2rem;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
}
.no-title{
color: #79747e;
font-weight: bold;
}
.create-btn{
display: flex;
background: #ff7272;
color: #fff;
border-radius: 10px;
padding: 9px;
margin-top: 1.5rem;
}

.all-creatediagram{
display: flex;
align-items: center;
overflow-x: auto;
gap:1rem ;
padding:10px 25px
}
 .wrap-box-flow-chart{
    position: relative;
    cursor: pointer;
}
.edit-icon{
    position: absolute;
    left: 50px;
    bottom: 60px;
    cursor: pointer;
    z-index: 9999;
}

.delete-icon{
    position: absolute;
    bottom: 60px;
    left:20px;
    cursor: pointer;
    z-index: 9999;
}
.modal-wrapper-delete{
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
    visibility:hidden;
    transition: all .3s ease-in;
}

.modal-wrapper-delete{
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
    visibility:hidden;
    transition: all .3s ease-in;
}

.showmodal{
    opacity: 1;
    visibility: visible;
}

.modal-close{
    position: fixed;
    min-height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.modal-delete-header{
    width: 100%;
    display: flex;
    justify-content: end;
}

.modal-content{
    margin: 2rem 0;
}

.actions-delete{
    width: 100%;
    display: flex;
    justify-content:center;
    gap: 1rem;
}
.btn-modal{
    border: none;
    outline: none;
    width:130px;
    padding:7px 0;
    border-radius: 10px;
}
.delete-yes{
background: #ff7272;
color: #fff;
}
.delete-no{
border: 1px solid;
}

.add-wrap {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ff4f4f;
  color: #fff;
}

@media (max-width:1024px) {
  .wrap-menu-flow-chart{
    width: 95%;
     margin: 0 auto;
  }
}

@media (max-width:992px) {
  .no-diagram-create{
    padding-bottom: 20px;
  }
}

@media (max-width:600px) {
}

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #ff7272;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}


@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>