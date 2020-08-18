import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import {
  Message
} from "element-ui";
import {
  getToken,
  removeToken
} from "@/utils/auth"; // 验权
import Layout from "./views/layout/Layout";
import u from "./utils/utility";
import Vue from "vue";
const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  MtaH5.pgv();
  window.onbeforeunload = function (e) {
    if (getToken() && window.localStorage.getItem("printstate") === "false") {
      e = e || window.event;
      if (e) {
        e.returnValue = "确认重新加载后将会重新登录!";
      }
    }
    window.localStorage.setItem("printstate", "false"); // 如果打印按钮调用了后重置
  };
  window.onunload = function () {
    removeToken();
  };
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      next({
        path: "/"
      });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // //赋值当前路由的参数
      // store.dispatch("settpParams", to);
      // //从login页面过来，加载动态路由
      // if (from.path === "/login" && store.state.user.au.webPowers) {
      //   for (let nodeitem of store.state.user.au.webPowers) {
      //     // 组建子节点
      //     let listchild = [];
      //     for (let childitem of nodeitem.children) {
      //       let child = {
      //         path: childitem.path,
      //         name: childitem.name,
      //         component: resolve =>
      //           require(["@/views/" + childitem.component], resolve),
      //         hidden: childitem.hidden,
      //         meta: {
      //           title: childitem.meta.title,
      //           icon: childitem.meta.icon,
      //           tpParams: childitem.meta.tpParams,
      //           permissionId: childitem.meta.permissionId
      //         }
      //       };
      //       listchild.push(child);
      //     }
      //     // 放入权限菜单节点
      //     let power = {
      //       path: nodeitem.path,
      //       component: Layout,
      //       // redirect: "/sys/def",
      //       name: nodeitem.name,
      //       meta: {
      //         title: nodeitem.meta.title,
      //         icon: nodeitem.meta.icon
      //       },
      //       children: listchild
      //     };
      //     // console.log(power)
      //     router.options.routes.push(power);
      //   }
      //   // router.options.routes = []
      //   router.addRoutes(router.options.routes);
      //   next();
      // } else {
      //   next();
      // }
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
