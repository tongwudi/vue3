<template>
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
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const title = ref("欢迎光临红浪漫，请选择一位美女为您服务");
    const overText = ref("");

    const data = reactive({
      title,
      selectGirl: "",
      overText,
      girls: ["英子", "大脚", "晓红"],
      selectGirlFunc: (index) => {
        data.selectGirl = data.girls[index];
      },
      overClick: () => {
        if (!data.selectGirl) return;
        data.overText = "点餐完成-" + data.selectGirl;
      },
    });

    return data
  },
};
</script>
