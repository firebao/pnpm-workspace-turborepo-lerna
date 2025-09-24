import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  /*   {
     path: '/',
    name: 'home',
    component: HomeView,
 children: [						]
  },*/

  {
    path: "/",
    name: "homeIndex",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/homered.vue"),
    meta: {
      title: "登录",
      requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  // {
  //   path: "/largeScreen",
  //   name: "largeScreen",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/largeScreen.vue"),
  //   meta: {
  //     title: "大屏",
  //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  //   },
  // },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/indexdig.vue"),
    meta: {
      title: "首页",
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: "/indexdig",
    name: "indexdig",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/indexdig.vue"),
    meta: {
      title: "首页",
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: "/message",
    name: "message",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/message/index.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: "/updatePassword",
    name: "updatePassword",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/components/Login/updatePassword"
      ),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: "/loginout",
    name: "loginout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/message/loginout.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  // {
  //   path: "/monitorQueue",
  //   name: "monitorQueue",
  //   // component: () => import("../views/monitorQueue.vue"),
  //   component: () => import("../views/monitorQueue-new.vue"),

  //   meta: {
  //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  //   },
  // },
  // {
  //   path: "/systemConnection",
  //   name: "systemConnection",
  //   component: () => import("../views/systemConnection.vue"),
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || "登录"; // 动态设置页面标题
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    console.log("需要登录", JSON.parse(localStorage.getItem("userinfo")));
    if (JSON.parse(localStorage.getItem("userinfo"))) {
      // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      next({
        path: "/",
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
