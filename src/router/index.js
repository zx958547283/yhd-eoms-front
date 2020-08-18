import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export var constantRouterMap = [{
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/wrongPage",
    component: () => import("@/views/wrongPage"),
    hidden: true
  },
  {
    path: "",
    name: "home",
    component: Layout,
    redirect: "/home",
    children: [{
      path: "home",
      name: "首页",
      component: () => import("@/views/home/home"),
      meta: {
        title: "首页",
        icon: "home",
        noCache: true
      }
    }]
  },
  {
    path: "*",
    redirect: "/wrongPage",
    hidden: true,
    noCache: true
  }
];
export const asyncRoutes = [];
// constantRouterMap.push(newitem);
const createRouter = () => new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
