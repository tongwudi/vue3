<template>
  <img alt="Vue logo" src="@/assets/logo.png" />

  <div>{{ nowTime }}</div>
  <button @click="showTime">显示时间</button>
  <button @click="resetTime">重置时间</button>
</template>

<script>
import { nowTime, showTime, resetTime } from "../utils";
export default {
  setup() {
    return {
      nowTime,
      showTime,
      resetTime,
    };
  },
};
</script>
