<template>
  <button @click="addCount">增加</button>
  <div>sum：{{ sum }}</div>

  <demo2 :counter="counter" @add="add" />
</template>

<script>
import { onMounted, ref, computed } from "vue";
import demo2 from "../demo/demo2.vue";

export default {
  components: {
    demo2,
  },
  setup() {
    console.log("父组件初始化");

    const counter = ref(3);
    function addCount() {
      counter.value++;
    }

    const sum = computed(() => counter.value * 3);

    const add = (stu) => {
      console.log("stu=>", stu);
    };

    // onRenderTracked((e) => {
    //     console.log("渲染跟踪", e)
    // })

    // onRenderTriggered((e) => {
    //     console.log("渲染触发", e)
    // })

    onMounted(() => {
      console.log("父组件挂载后");
    });

    // onUpdated(() => {
    //   console.log("父组件更新时")
    // })

    // onUnmounted(() => {
    //   console.log("父组件卸载时")
    // })

    return {
      addCount,
      sum,
      counter,
      add,
    };
  },
};
</script>
