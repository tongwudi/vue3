<template>
  <div>
    <div>{{ count }}</div>
    <button @click="addCount">增加</button>

    <form action="">
      <input type="text" v-model="stu.id" />
      <input type="text" v-model="stu.name" />
      <input type="text" v-model="stu.age" />
      <button @click="addStu">添加</button>
    </form>
    <ul>
      <li v-for="(stu, index) in stus" :key="stu.id" @click="delStu(index)">
        {{ stu.name }} - {{ stu.age }}
      </li>
    </ul>
  </div>
</template>

<script>
/* 
    setup：是组合API的入口函数
    ref：定义一个响应式且可改变的 ref 对象，ref 对象拥有一个指向内部值的单一属性 .value。
    reactive：是 vue3.0 中提供的实现响应式数据的方法。本质是将传入的数据包装成一个 Proxy 对象。
    toRefs：
    toRaw：返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。

    注意项：
        1. ref 函数只能监听简单类型的变化，不能监听复杂数据类型（object/array）的变化. 
        2. 在组合 API 中定义的变量/方法，要想在外界使用，必须通过 return 暴露出去。
        3. 在 vue2.x 中响应式是通过 defineProperty 来实现的，而在 vue3.0中响应式数据是通过 ES6 的 Proxy 来实现的。
        4. reactive 的参数必须是对象（json/arr），如果传递了其他对象，界面数据则不会自动更新，无法实现响应式。
        5. toRaw 是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。
    */

import { ref, reactive, toRefs } from "vue";

export default {
  setup() {
    const count = ref(0);
    /* ref(0) 相当于 reactive({ value: 0 }) */
    function addCount() {
      count.value += 1;
    }

    const data = reactive({
      stus: [
        { id: 1, name: "zs", age: 18 },
        { id: 2, name: "ls", age: 20 },
        { id: 3, name: "ww", age: 24 },
      ],
      stu: {
        id: "",
        name: "",
        age: "",
      },
      delStu(index) {
        data.stus = data.stus.filter((stu, idx) => index != idx);
      },
      addStu(e) {
        e.preventDefault();
        const stu = Object.assign({}, data.stu);
        data.stus.push(stu);
        data.stu.id = "";
        data.stu.name = "";
        data.stu.age = "";
      },
    });
    const refData = toRefs(data);
    return {
      count,
      addCount,
      ...refData,
    };
  },
};
</script>
