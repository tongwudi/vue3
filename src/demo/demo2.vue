<template>
    <div>
        <form>
            <input type="text" v-model="stu.id" />
            <input type="text" v-model="stu.name" />
            <input type="text" v-model="stu.age" />
            <button @click="addStu">添加</button>
        </form>
        <ul>
            <li
                v-for="(stu, index) in stus"
                :key="stu.id"
                @click="delStu(index)"
            >
                {{ stu.name }} - {{ stu.age }}
            </li>
        </ul>
        <hr />

        <!-- <p>{{ str }}</p> -->
        <p>{{ arr }}</p>
        <button @click="demo1">示例1</button>
        <hr />

        <p>{{ obj2 }}</p>
        <button @click="demo2">示例2</button>
        <hr />

        <div ref="box">hello word!</div>
    </div>
</template>

<script>
import { ref, onMounted, toRefs, reactive, toRaw } from "vue";
import useStuFunc from "./demo2";

export default {
    props: {
        name: String,
    },
    setup(props, context) {
        console.log(props);
        console.log(context);

        const box = ref(null);
        console.log("box=>", box.value);

        onMounted( ()=> {
            console.log("box=>", box.value);
        });

        /* 示例1 */
        // let str = reactive("123"); // 不能响应式
        // let str = reactive(456); // 不能响应式
        const arr = reactive([1, 2, 3]);

        function demo1() {
            // const flag = str
            // const num = flag - 5;
            // str = num
            // console.log(str);

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
            // obj2.a = 333; // 只有通过包装之后的对象来修改，才会触发界面更新
            obj3.a = 333;
            console.log(obj1);
            console.log(obj2);
            console.log(obj3);
        }

        const { data } = useStuFunc();

        const refData = toRefs(data);

        return {
            box,
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
