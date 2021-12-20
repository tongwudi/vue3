<template>
  <div>
    <h1>我是demo2</h1>

    <div>count 【{{ usdFn(counter) }}】</div>
    <div>money 【{{ moneyUSD }}】</div>
    <br />

    <div>basicStr 【{{ basicStr }}】</div>
    <div>basicNum 【{{ basicNum }}】</div>
    <div>basicArr 【{{ basicArr }}】</div>
    <button @click="addFn">增加</button>

    <div>basicObj 【{{ basicObj }}】</div>
    <div>refObj 【{{ refObj }}】</div>
    <div>rawObj 【{{ rawObj }}】</div>
    <button @click="modFn">修改</button>

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
  </div>
</template>

<script>
/* 
  ref：定义一个响应式且可改变的 ref 对象，ref 对象拥有一个指向内部值的单一属性 .value。
  readonly：返回一个只读代理，即使是对象里面的对象，也是 readonly 的。

  1. 在 vue2.x 中响应式是通过 defineProperty 来实现的，而在 vue3.0 中响应式数据是通过 ES6 的 Proxy 来实现的。
  2. 无论是 Object.defineProperty 还是 Proxy，只能对 对象数据 保持响应式。所以在 ref 中，基本类型数据变成了对象，使用 .value 来获取值。
  3. 当 reactive 内部的值仍然是一个对象的话，那么解构或者展开后依旧保持响应，这是内部处理了深度响应的结果。
  */
import {
  reactive,
  toRef,
  toRefs,
  toRaw,
  watch,
  computed,
  onMounted,
} from "vue";
import useStuFn from "./useStuFn";

export default {
  props: {
    counter: {
      type: Number,
      default: 10,
    },
    money: {
      type: Number,
      default: 15,
    },
  },

  /*
    setup函数 是组合API的入口函数，他有两个参数 props 和 context(emit、slots、attrs 等)
    在 setup函数 中无法访问到 this
    */
  setup(props, context) {
    /* 
      解构会消除 props 和 reactive 的响应性。如果需要解构 props 或 reactive，可以使用 toRefs 或 toRef。
      转换后的每个属性节点都是单独的 ref 对象
      */
    const counter = toRef(props, "counter");
    const { money } = toRefs(props);
    console.log("counter=>", counter.value); // 父页面重新赋过值
    console.log("money=>", money.value); // 父页面未重新赋值

    /* 
      vue3.0 移除了 filters 过滤器，可以使用 方法调用 或 计算属性 替代实现。
      computed 的返回值是一个 ref 对象
      */
    const usdFn = (count) => {
      return "$" + count;
    };
    // 或者
    const moneyUSD = computed(() => {
      return "$" + money.value;
    });

    /*
      reactive 接收一个普通对象，返回一个响应式的数据对象
      reactive 的参数必须是对象（json/arr），如果传递了其他类型，界面数据则不会自动更新，无法实现响应式。 
      */
    let basicStr = reactive("abc");
    let basicNum = reactive(200);
    const basicArr = reactive([1, 2, 3]);

    const addFn = () => {
      if (basicArr.includes(4)) return;
      basicStr += "d";
      basicNum += 100;
      basicArr.push(4);
      console.log("basicStr=>", basicStr); // 界面没有更新
      console.log("basicNum=>", basicNum); // 界面没有更新
      console.log("basicArr=>", basicArr); // 界面更新
    };

    /* 
      直接修改原生对象无法触发界面更新，只有通过 响应式包装 之后的对象来修改，才会触发界面更新。
      toRaw 将响应式对象还原成 普通对象。
      */
    const basicObj = { a: 111 };
    const refObj = reactive(basicObj);
    const rawObj = toRaw(refObj);

    // basicObj 和 refObj 不是同一个数组，他们是引用关系。
    console.log(basicObj === refObj); // false
    console.log(basicObj === rawObj); // true

    const modFn = () => {
      // basicObj.a = 333; // 界面没有更新
      // refObj.a = 333; // 界面更新
      rawObj.a = 333; // 界面没有更新
      console.log(basicObj);
      console.log(refObj);
      console.log(rawObj);
    };

    /* 
      watch 可以监听一个值，也可以同时监听多个值。
    */
    // 监听用 ref 声明的数据源
    watch(moneyUSD, (newVal, oldVal) => {
      console.log("The new moneyUSD value is: " + newVal);
      console.log("The old moneyUSD value is: " + oldVal);
      document.title = newVal;
    });
    // 或者
    // 监听用 reactive 声明的数据源
    // watch(
    //   () => moneyUSD.value,
    //   (newVal) => (document.title = newVal)
    // );

    onMounted(() => {
      console.log("子组件挂载");
    });

    const useStuData = useStuFn(context);

    // 删除方法
    useStuData.delStu = (index) => {
      useStuData.stus = useStuData.stus.filter((stu, idx) => index != idx);
    };

    /* 
      在组合 API 中定义的变量/方法，要想在外界使用，必须通过 return 暴露出去。
      从 setup 暴露出去的数据在模板中访问时是被自动浅解包的，因此不应在模板中使用 .value。
      */
    return {
      usdFn,
      moneyUSD,
      basicStr,
      basicNum,
      basicArr,
      addFn,
      basicObj,
      refObj,
      rawObj,
      modFn,
      ...toRefs(useStuData),
    };
  },
};
</script>
