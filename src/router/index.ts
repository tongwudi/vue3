import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: "首页"
    },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/demo1',
    name: 'Demo1',
    meta: {
      title: "Demo1"
    },
    component: () => import('@/views/demo1.vue')
  },
  {
    path: '/demo2',
    name: 'Demo2',
    meta: {
      title: "Demo2"
    },
    component: () => import('@/views/demo2.vue')
  },
  {
    path: '/demo3',
    name: 'Demo3',
    meta: {
      title: "Demo3"
    },
    component: () => import('@/views/demo3.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title
  }
  // console.log(from);
  next()
})

export default router