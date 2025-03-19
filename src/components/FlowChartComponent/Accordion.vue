<template>
    <div class="accordion">
        <div v-for="(item, index) in chartLevel?.filter(item => item.maturity_level <= userDiagram)"
            :key="item.maturity_level" :class="{ 
                'accordion-item': true,
                'disabled': item.maturity_level > userDiagram 
    }">
            <div class="accordion-header" @click="toggle(item.maturity_level)">
                <div style="display: flex; align-items: center;">
                    <div :class="{'circle-level':true,'dis-cir':item.maturity_level > userDiagram}">{{
                        item.maturity_level }}</div>
                    <p style="margin-left: 1rem;" :class="{'dis-text':item.maturity_level > userDiagram}">Level {{
                        item.maturity_level }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            <div class="accordion-body" :class="{ showbody: isOpen(item.maturity_level) }">
                <div v-for="(diagram, index) in item.diagrams" :key="index">
                    <div class="top-wrap">
                        <p class="process-name">
                        <div class="dot"></div>
                        {{ diagram?.default?.name}}
                        </p>
                        <div class="add-wrap"
                            @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                    <div class="default-coustom-wrapper">
                        <div class="default_wrap">
                            <p class="proccess-text">Default</p>
                            <div class="default-wrapper">
                                <div class="wrap-box-flow-chart">
                                    <div style="cursor: pointer;">
                                        <boxflowchart :isHighlighted="isHighlighted" :imgsrc="diagram.default.image" />
                                        <svg @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6 edit-icon-1">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="coustom-wrap">
                            <p class="proccess-text">Customs</p>
                            <div class="custom custom_right" v-if="diagram.costumes.length>0">
                                <div v-for="(coustomDiagram, index) in diagram.costumes" :key="index">
                                    <div class="wrap-box-flow-chart">
                                        <boxflowchart :imgsrc="coustomDiagram.image" />
                                        <div class="edit-icon"
                                            @click="goToFlowChartCoustom(coustomDiagram.id,coustomDiagram.diagram)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6 ">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </div>
                                        <div @click="openModal(coustomDiagram.id)" class="delete-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6 ">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                        <p class="name-diagram">{{ coustomDiagram.name }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="no-diagram-contnent" v-else>
                                <p class="no-diagram">No Added Custom Diagram</p>
                                <button @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)"
                                    class="add-diagram-btn">
                                    Add
                                    <svg style="margin-left: 10px;" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex;align-items: center;justify-content:center;margin-top: 2rem;font-weight: bold;">
            <p style="padding: 0 10px;">To Unlock The Next Level, Please Retake The
                <router-link :to="`/testspage`" style="color: #ff7272;">Maturity Test</router-link>.
            </p>
        </div>
        <div v-for="(item, index) in chartLevel?.filter(item => item.maturity_level > userDiagram)"
            :key="item.maturity_level" :class="{ 
        'accordion-item': true,
        'disabled': item.maturity_level > userDiagram 
    }">
            <div class="accordion-header" @click="toggle(item.maturity_level)">
                <div style="display: flex; align-items: center;">
                    <div :class="{'circle-level':true,'dis-cir':item.maturity_level > userDiagram}">{{
                        item.maturity_level }}</div>
                    <p style="margin-left: 1rem;" :class="{'dis-text':item.maturity_level > userDiagram}">Level {{
                        item.maturity_level }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            <div class="accordion-body" :class="{ showbody: isOpen(item.maturity_level) }">
                <div v-for="(diagram, index) in item.diagrams" :key="index">
                    <div class="top-wrap">
                        <p class="process-name">
                        <div class="dot"></div>
                        {{ diagram?.default?.name}}
                        </p>
                        <div class="add-wrap"
                            @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                    <div class="default-coustom-wrapper">
                        <div class="default_wrap">
                            <p class="proccess-text">Default</p>
                            <div class="default-wrapper">
                                <div class="wrap-box-flow-chart">
                                    <boxflowchart :isHighlighted="isHighlighted" :imgsrc="diagram.default.image" />
                                    <svg @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6 edit-icon-1">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="default_wrap">
                            <p class="proccess-text custom-text">Customs</p>
                            <div class="custom" v-if="diagram.costumes.length>0">
                                <div v-for="(coustomDiagram, index) in diagram.costumes" :key="index">
                                    <div class="wrap-box-flow-chart">
                                        <boxflowchart :imgsrc="coustomDiagram.image" />
                                        <div class="edit-icon"
                                            @click="goToFlowChartCoustom(coustomDiagram.id,coustomDiagram.diagram)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6 ">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </div>
                                        <div @click="openModal(coustomDiagram.id)" class="delete-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-6 ">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                        <p class="name-diagram"> {{ coustomDiagram.name }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="no-diagram-contnent" v-else>
                                <p class="no-diagram">No Added Custom Diagram</p>
                                <button @click="goToFlowChart( diagram?.default.process_id,diagram?.default.diagram)"
                                    class="add-diagram-btn">
                                    Add
                                    <svg style="margin-left: 10px;" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
    <div v-if="success" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg">
            <h3 class="text-lg font-semibold p-5 text-green-600">
                Chart deleted successfully</h3>
            <button @click="closeModal" class="mt-4 px-4 py-2 text-gray-500">Close</button>
        </div>
    </div>
</template>


<script setup>
import { ref, defineProps, onMounted, watch, computed } from 'vue';
import boxflowchart from './boxflowchart.vue';
import { useRouter } from 'vue-router';
import '../../style.css'
import axios from 'axios'; 
const router = useRouter();
const props = defineProps({
    chartData: {
        type: Array,
        default: () => []
    },
      getAllDiagram: {
        type: Function,
        required: true
  },
   userDiagram: {
        type: Number,
        required: true
    }
});


const openIndex = ref(null);
const chartLevel = ref([]);
const isshowmodal = ref(false);
const idDiagram=ref("")
const success = ref(false);
const isHighlighted = ref(true);

const toggleShowModal = () => {
  isshowmodal.value = !isshowmodal.value;
};

const openModal = (id) => {
    toggleShowModal();
    idDiagram.value=id
};

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
      props.getAllDiagram();
    }
  } catch (error) {
    console.log(error);
  }
};

const closeModal = () => {
 success.value=false
    };

watch(
    () => props.chartData,
    (newVal) => {
        chartLevel.value = newVal?.slice(0, 5);
    },
    { immediate: true } 
);

const toggle = (id) => {

    openIndex.value = openIndex.value === id ? null : id;
};

const isOpen = (id) => {
    return openIndex.value === id;
}
const goToFlowChart=(id,diagram)=>{
    localStorage.setItem("process_id",id)
    localStorage.setItem("diagram",diagram)
  router.push('flowchart2')
}

const goToFlowChartCoustom=(id,diagram)=>{
localStorage.setItem("process_id",id)
 localStorage.setItem("diagram",diagram)
 router.push("flowchart3")
}


</script>


<style scoped>


.default_wrap{
    width: 30%;
}
.coustom-wrap{
    width: 70%;
}
.accordion-item{
    border-bottom: 1px solid #c7c7c7;
}
.accordion-header {
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px 8px 25px;
    margin-top: 20px;
}

.circle-level {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff7272;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.accordion-body {
    background-color: #fff;
    overflow: hidden;
    height: 0;
    transition: all 0.1s ease-in;
    padding: 0 25px
}

.showbody {
    height: auto;
    padding: 25px;
}

.default-coustom-wrapper{
    display: flex;
}
.default-wrapper{
width: 23vw;
padding: 10px 0;
position: relative;
}

.default-wrapper::after{
    content: "";
    position: absolute;
    right: 20px;
    height: 80%;
    top:50%;
    transform: translateY(-50%);
    width: 1px;
    background:#ededed;
}

.custom{
        width:100%;
        display: flex;
        align-items: center;
        gap: 20px;
        padding:10px;
        overflow-x: auto; 
        white-space: nowrap;
}


.proccess-text{
    text-align: start;
    color:#79747e;
}

.process-name{
    width: max-content;
    margin: 10px 0;
    font-weight: bold;
    display: flex;
    align-items: center;
}


.dot{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff7272;
    margin-right: 10px;
}

.no-diagram-contnent{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.no-diagram{
    color: #79747e;
}

.add-diagram-btn{
    border: none;
    outline: none;
    border-radius: 10px;
    color: #fff;
    background: #ff7272;
    padding: 7px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    width: max-content;
}

.wrap-box-flow-chart{
    position: relative;
    cursor: pointer;
}


.edit-icon-1{
    position: absolute;
     left: 20px;
    bottom: 20px;
    z-index: 99;
}
.edit-icon{
    position: absolute;
    left: 50px;
    bottom: 60px;
    cursor: pointer;
    z-index: 99;
}

.delete-icon{
    position: absolute;
    bottom: 60px;
    left:20px;
    cursor: pointer;
    z-index: 99;
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

.add-wrap{
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

.top-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.dis-cir{
    background: #c7c7c7;
}

.dis-text{
    color: #c7c7c7;
}
.name-diagram{
    margin-top: 1rem;
}

@media (max-width:1540px) {
    .default_wrap{
    width: 35%;
}
.coustom-wrap{
    width: 65%;
}
}

@media (max-width:1301px) {
    .default_wrap{
    width: 40%;
}

.coustom-wrap{
    width: 60%;
}
}


@media (max-width:1144px) {
    .default_wrap{
    width: 45%;
}
.coustom-wrap{
    width: 55%;
}
}

@media (max-width:992px) {
     .default_wrap{
    width: 100%;
}
  .coustom-wrap{
    width: 100%;
}

    .default-coustom-wrapper{
        flex-direction: column;
    }
         .default-wrapper {
             width:100%;
         }
    
         .custom-text{
            margin-top: 1.5rem !important;
         }
         .custom {
             width: 100%
         } 
}

@media (max-width:600px) {
    .highlighted {
        min-width: 98%;
    }
    .showbody {
        padding: 25px 2px 25px 10px;
    }
}

</style>
