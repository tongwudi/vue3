<template>
  <div>
    <div>{{ count }}</div>
    <button @click="addCount">增加</button>
    <hr />

    <form @submit="addStu">
      <label>
        <span>id</span>
        <input type="text" v-model="stu.id" />
      </label>
      <label>
        <span>name</span>
        <input type="text" v-model="stu.name" />
      </label>
      <label>
        <span>age</span>
        <input type="text" v-model="stu.age" />
      </label>
      <button>添加</button>
    </form>
    <ul>
      <li v-for="(stu, index) in stus" :key="stu.id">
        {{ stu.name }} - {{ stu.age }}
        <button @click="delStu(index)">删除</button>
      </li>
    </ul>
    <hr />

    <!-- <p>{{ str }}</p> -->
    <p>{{ arr }}</p>
    <button @click="demo1">示例1</button>
    <hr />

    <p>{{ obj2 }}</p>
    <button @click="demo2">示例2</button>
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
    1. 在 vue2.x 中响应式是通过 defineProperty 来实现的，而在 vue3.0中响应式数据是通过 ES6 的 Proxy 来实现的。
    2. ref 只能监听简单类型的变化，不能监听复杂数据类型（object/array）的变化. 
    3. reactive 的参数必须是对象（json/arr），如果传递了其他对象，界面数据则不会自动更新，无法实现响应式。
    4. toRaw 是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。
    5. 在组合 API 中定义的变量/方法，要想在外界使用，必须通过 return 暴露出去。
  */
import { ref, reactive, toRaw, onMounted, toRefs } from "vue";
import { demo2Data } from "./demo2";

export default {
  setup() {
    /* ref(0) 相当于 reactive({ value: 0 }) */
    const count = ref(0);
    function addCount() {
      count.value += 1;
    }

    /* 示例1 */
    // let str = reactive("123"); // 不能响应式
    // let str = reactive(456); // 不能响应式
    const arr = reactive([1, 2, 3]);

    function demo1() {
      // const flag = str
      // const num = flag - 5;
      // str = num
      // console.log(str);
      if (arr.includes(4)) return;
      arr.push(4);
      console.log(arr);
    }

    /* 示例2 */
    const obj1 = { a: 111, b: 222 };
    const obj2 = reactive(obj1);
    const obj3 = toRaw(obj2);

    console.log(obj1 === obj2); // false
    /* obj1 和 obj2 不是同一个数组，他们是引用关系，obj2 的本质是一个 proxy 对象，在这个 proxy 对象中引用了 obj2  */
    console.log(obj1 === obj3); // true

    function demo2() {
      // obj1.a = 333; // 如果直接修改obj1，无法触发界面更新
      obj2.a = 333; // 只有通过包装之后的对象来修改，才会触发界面更新
      // obj3.a = 333;
      console.log(obj1);
      console.log(obj2);
      console.log(obj3);
    }

    onMounted(() => {
      console.log("子组件挂载");
      demo2Data.stus.push({
        id: 5,
        name: "zl",
        age: 36,
      });
    });

    const refData = toRefs(demo2Data);

    return {
      count,
      addCount,
      // str,
      arr,
      obj2,
      demo1,
      demo2,
      ...refData,
    };
  },
};
</script>
