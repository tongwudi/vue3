<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>{{ nowTime }}</div>
  <button @click="showTime">显示时间</button>
  <button @click="resetTime">重置时间</button>

  <h2>{{ title }}</h2>
  <button
    v-for="(item, index) in girls"
    :key="index"
    @click="selectGirlFunc(index)"
  >
    {{ index }}：{{ item }}
  </button>
  <div>您选择了【{{ selectGirl }}】为您服务</div>
  <button @click="overClick">点餐完毕</button>
  <p>{{ overText }}</p>

  <hr>
  <demo2 />
</template>

<script lang="ts">
import {
  defineComponent,
  // onUpdated,
  onMounted,
  // onRenderTracked,
  // onRenderTriggered,
  // onUnmounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { nowTime, showTime, resetTime } from "./utils";
import demo2 from "./demo/demo2.vue";

export default defineComponent({
  name: "App",
  components: {
    demo2
  },
  setup() {
    console.log("父组件初始化");

    const data = reactive({
      title: "欢迎光临红浪漫，请选择一位美女为您服务",
      selectGirl: "",
      overText: "",
      girls: ["英子", "大脚", "晓红"],
      selectGirlFunc: (index: number) => {
        data.selectGirl = data.girls[index]
      },
      overClick: () => {
        if (!data.selectGirl) return
        data.overText = "点餐完成-" + data.selectGirl
      }
    })

    // onRenderTracked((e) => {
    //     console.log("渲染跟踪", e)
    // })

    // onRenderTriggered((e) => {
    //     console.log("渲染触发", e)
    // })

    onMounted(() => {
      console.log("父组件挂载")
    })

    // onUpdated(() => {
    //   console.log("父组件更新时")
    // })

    // onUnmounted(() => {
    //   console.log("父组件卸载时")
    // })

    watch(
      () => {
        return [data.overText, data.selectGirl]
      },
      (newVal) => {
        document.title = newVal[0]
      }
    )

    const refData = toRefs(data)

    return {
      nowTime,
      showTime,
      resetTime,
      ...refData,
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
