<template>
  <h3>路由</h3>
  <ul>
    <li v-for="(route, index) in routes" :key="index">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </li>
  </ul>

  <!-- <portCon /> -->
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
// import portCon from "./portCon.vue";

export default {
  // components: {
  //   portCon,
  // },
  setup() {
    const routeList = useRouter().options.routes;
    const routes = computed(() => routeList.filter((item) => item.path != "/"));

    return {
      routes,
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
  box-sizing: border-box;
}
li {
  width: 50%;
  padding-left: 8px;
  padding-right: 8px;
  margin: 8px 0;
  box-sizing: border-box;
}
li a {
  display: block;
  line-height: 30px;
  background: #00a0e9;
  color: #fff;
}
</style>