<template>
  <div>
    <div>money：{{ moneyUSD }}</div>
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
  setup：是组合API的入口函数，他有两个参数 props 和 context(emit、slots、attrs)
  reactive：将传入的数据包装成一个 Proxy 对象。
  ref：定义一个响应式且可改变的 ref 对象，ref 对象拥有一个指向内部值的单一属性 .value。
  readonly：返回一个只读代理，即使是对象里面的对象，也是 readonly 的。
  toRaw：返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。

  注意项：
    1. 在 vue2.x 中响应式是通过 defineProperty 来实现的，而在 vue3.0 中响应式数据是通过 ES6 的 Proxy 来实现的。
    2. 无论是 Object.defineProperty 还是 proxy，只能对 对象数据 保持响应式。所以在 ref 中，基本类型数据变成了对象，使用 value 来获取值。
    3. ref 只能监听简单类型的变化，不能监听复杂数据类型（object/array）的变化. 
    4. reactive 的参数必须是对象（json/arr），如果传递了其他类型，界面数据则不会自动更新，无法实现响应式。
    5. 使用 ES6 解构会消除 props 和 reactive 的响应性。如果需要解构 props 或 reactive，可以使用 toRefs 或 toRef。
    6. 当 reactive 内部的值仍然是一个对象的话，那么解构或者展开后依旧保持响应，这是内部处理了深度响应的结果。
    7. 如果 props 中的属性没有使用，则无法获取到该属性，需要通过 toRef 创建一个 ref。
    8. toRaw 是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。
    9. 在组合 API 中定义的变量/方法，要想在外界使用，必须通过 return 暴露出去。
    10. 从 setup 暴露出去的数据在模板中访问时是被自动浅解包的，因此不需要在模板中使用 .value。

    1. computed 返回的值就和 ref 一样，都是需要使用 .value 获取。
    2. watch 可以监听一个值，也可以同时监听多个值。

    当使用组合式 API 时，reactive refs 和 template refs 的概念已经是统一的。
  */
import {
  reactive,
  toRef,
  toRefs,
  toRaw,
  computed,
  // onMounted,
} from "vue";
import useStuFunc from "./useStuFunc";

export default {
  props: {
    money: {
      type: Number,
      default: 15,
    },
    title: {
      type: String,
      default: "zhangsan",
    },
  },
  setup(props, { emit }) {
    console.log(props);
    console.log(emit); // 触发事件 (方法，等同于 $emit)

    const title = toRef(props, "title");
    // const { money } = toRefs(props);
    // console.log(money.value);
    console.log(title.value);

    const moneyUSD = computed(() => {
      // return '$' + money.value
      return "$" + props.money;
    });
    // 或者
    // const moneyFilters = (money) => {
    //   return '$' + money
    // }

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

    const { demo2Data } = useStuFunc();

    const refData = toRefs(demo2Data);

    return {
      moneyUSD,
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
