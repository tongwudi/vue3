<template>
  <button ref="elmRefs" @click="modalOpen = true">
    Open full screen modal!
  </button>

  <teleport to="#app">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a modal!
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const modalOpen = ref(false);

    const elmRefs = ref(null);

    onMounted(() => {
      console.log(elmRefs.value); // 得到一个 RefImpl 的对象, 通过 .value 访问到数据
    });

    return {
      modalOpen,
      elmRefs,
    };
  },
};
</script>

<style scoped>
.modal {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  overflow: auto;
  z-index: 99;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>