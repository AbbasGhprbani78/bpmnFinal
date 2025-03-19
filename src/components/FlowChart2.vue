<template>
  <div class="parent">
    <MobileHeader class="" title="AI Chat Helper" />
    

    <div class="chat h-5/6 left-2/4 transform -translate-x-1/2 bg-white rounded-t-3xl w-full lg:w-3/4 lg:translate-x-0 lg:right-8 lg:ml-10 lg:left-auto xl:w-3/4">
      <div class="sst" ref="canvas"></div>
    </div>

    <div class="w-full flex">
      <div class="hidden flex-col lg:flex-row lg:flex lg:ml-16 xl:ml-28 mt-10 capitalize font-bold text-lg left-2/4 transform -translate-x-1/2 lg:translate-x-0 lg:right-8 lg:left-auto float-end">

<div class="flex">
   <router-link to="menuflowchart" class="flex" style="align-items: center; color: #ff4f4f; margin-right: 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </router-link>
  <button class=" text-red-400 lg:bg-red-400 lg:hover:bg-red-500 lg:text-white px-5 py-1 flex justify-center items-center " @click="saveDiagram">
    <span>Save</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 ml-3">
<path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
</svg>

  </button>
</div>

<div class="flex items-center mx-3">
  
  <div class="flex">
    <button class="btn-download" @click="downloadDiagram">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 icon">
<path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
  </svg>
</button>
  </div>
  <label for="inputs" class="ml-3">
  <input type="file" ref="fileInput" class="hidden" id="inputs" @change="handleFileSelect"  />
  <div class="flex items-center justify-start">
    <span class=" capitalize text-red-400">choose file</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 icon">
<path fill-rule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
</svg>
  </div>
</label>
</div>

</div>
    </div>
    
    <div class="flex justify-between items-center lg:mt-8">
    <div class="lg:hidden" style="margin-top: 62px;">
      <button @click="openOptions">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
</svg>

    </button>

    <div :class="[baseClass, toggleClass]">
      
      <button class="my-5 text-red-400 lg:bg-red-400 lg:hover:bg-red-500 lg:text-white flex justify-between items-center " @click="saveDiagram">
          <span>Save</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
    </svg>
      </button>

      <button class="my-5 btn-download flex justify-between items-center" @click="downloadDiagram">
        <span class=" capitalize text-red-400">download</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 icon">
  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>
      </button>

      <label for="inputs">
        <input type="file" ref="fileInput" class="hidden " id="inputs" @change="handleFileSelect"  />
        <div class="flex items-center justify-between">
          <span class=" capitalize text-red-400 my-5">choose file</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 icon">
  <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
</svg>
        </div>

      </label>

    </div>
    </div>
    </div>
  </div>

  <FlowChartModal
      :visible="isModalVisible"
      title="Save Diagram"
      @confirm="handleSave"
      @cancel="handleCancel"
    />

    <div v-if="success" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-lg font-semibold p-5 text-green-600">
          Chart saved successfully</h3>
        <button @click="closeModal" class="mt-4 px-4 py-2 text-gray-500">Close</button>
      </div>
    </div>
    
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import FlowChartModal from './FlowChartModal.vue';
import MobileHeader from './MobileHeader.vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import axios from 'axios';
import { useRouter } from 'vue-router';
import chatbot from './chatbot.vue';
const canvas = ref(null);
const fileInput = ref(null);
let modeler = null;
const isToggled = ref(false);
const baseClass = 'base-styles';
let diagramName = '';
const isModalVisible = ref(false);
const success = ref(false);
const router=useRouter()
const maindata=ref("")


const closeModal = () => {
  router.push('menuflowchart')
    };

const saveDiagram = () => {
  isModalVisible.value = true;
  isToggled.value = false;
};

const handleCancel = () => {
  isModalVisible.value = false;
};

const handleSave = async (name) => {
  try {
      diagramName = name;

    if (!diagramName) {
      alert('Save cancelled: No name provided');
      return;
    }
    const { xml } = await modeler.saveXML({ format: true });
    const accessToken = localStorage.getItem('access');
    const process_id=localStorage.getItem("process_id")
    const blob = new Blob([xml], { type: 'application/xml' });

    const canvasInstance = modeler.get('canvas');
    const svgElement = canvasInstance._svg; 
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const base64Svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;

    const formData = new FormData();
    formData.append("name", diagramName);
    formData.append("diagram", blob, `${diagramName}.bpmn`);
    formData.append("process_id",process_id)
    formData.append("img", base64Svg)
    
    const response = await axios.post("https://operapi.ariisco.com/add-diagram/", formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (response.status === 201) {
      isModalVisible.value = false;
      success.value = true;
      maindata.value=response.data
    }
  } catch (error) {
    console.error('Error saving BPMN diagram:', error);
  }
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const diagramXML = e.target.result;
      try {
        await modeler.importXML(diagramXML);
        const canvasInstance = modeler.get('canvas');
        canvasInstance.zoom('fit-viewport');
        alert('Diagram loaded from file');
      } catch (error) {
        console.error('Error importing BPMN diagram from file:', error);
      }
    };
    reader.readAsText(file);
  }
};

const downloadDiagram = async () => {
  try {
    const { xml } = await modeler.saveXML({ format: true });
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.bpmn';
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading BPMN diagram:', error);
  }
};


onMounted(async () => {
  try {
    modeler = new BpmnModeler({
      container: canvas.value
    });

    let storedDiagramXML = localStorage.getItem('diagram');
  
    if (storedDiagramXML) {
      await modeler.importXML(storedDiagramXML);
    } else {
      const initialDiagramXML = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                          xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                          xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                          xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                          xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                          targetNamespace="http://bpmn.io/schema/bpmn">
          <bpmn:process id="Process_1" isExecutable="false">
            <bpmn:startEvent id="StartEvent_1"/>
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
              <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
                <dc:Bounds x="173" y="102" width="36" height="36"/>
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>`;
      await modeler.importXML(initialDiagramXML);
    }

    const canvasInstance = modeler.get('canvas');
    canvasInstance.zoom('fit-viewport');
    fileInput.value.addEventListener('change', handleFileSelect);
  } catch (error) {
    console.error('Error importing BPMN diagram:', error);
  }
});


onBeforeUnmount(() => {
  if (modeler) {
    modeler.destroy();
  }
  if (fileInput.value) {
    fileInput.value.removeEventListener('change', handleFileSelect);
  }
});

const openOptions = () => {
  isToggled.value = !isToggled.value;
};

const toggleClass = computed(() => {
  return isToggled.value ? 'active' : 'inactive';
});

</script>


<style scoped>
.sst {
  height: 100vh;
}

.chat {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 5px 15px lightgray;
  z-index: 0;
}

.base-styles {
  display: none;
}

.active {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  float: left;
  padding: 10px 20px;
  width: 100%;
}


.inactive {
  background-color: red;
  color: black;
}

@media (min-width: 1024px) {

.parent{
  margin-left: 16%;
  width: 100%;
}

}

</style>
