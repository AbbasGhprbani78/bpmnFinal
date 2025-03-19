<!-- CustomModal.vue -->
<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <input type="text" v-model="inputValue" placeholder="Enter diagram name" class="mx-auto my-2 py-1 pl-3 w-full border border-slate-600 rounded-lg" />
      <div style="color: black;" class="modal-buttons">
        <button @click="cancel">Cancel</button>
        <button class="bg-red-500 px-8 py-1 text-white" @click="confirm">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    confirm() {
      this.$emit('confirm', this.inputValue);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
