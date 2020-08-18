import Vue from "vue";
import VueDragging from "vue-dragging";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n
import VCharts from "v-charts";

import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router";
import store from "./store";

import "@/icons"; // icon
import "@/permission"; // permission control
import QueryControl from "./components/Common/QueryControl";
import QueryView from "./components/Common/QueryView";
import TableControl from "./components/Common/TableControl";
import InputQueryControl from "./components/Common/InputQueryControl";
import FloatWindowControl from "./components/Common/FloatWindowControl";
import InputControl from "./components/Common/InputControl";
import SelectControl from "./components/Common/SelectControl";
import CityControl from "./components/Common/CityControl";
import TextareaControl from "./components/Common/TextareaControl";
import CorpControl from "./components/Common/CorpControl";
import DeptControl from "./components/Common/DeptControl";
import ProductControl from "./components/Common/ProductControl";
import DatePickerControl from "./components/Common/DatePickerControl";
import CSingleUpload from "./components/Common/SingleUpload";
import CSingleUploadWithPath from "./components/Common/SingleUploadWithPath";
import ContentCategoryControl from "./components/Common/ContentCategoryControl";
import InputNumberControl from "./components/Common/InputNumberControl";
import WxmpMaterial from "./components/Common/WxmpMaterial";
import LabelControl from "./components/Common/LabelControl";
import MultiUpload from "./components/Common/MultiUpload";
import SelectControlForLabel from "./components/Common/SelectControlForLabel";
import ImageControl from "./components/Common/ImageControl";
import VideoControl from "./components/Common/VideoControl";
import RadioControl from "./components/Common/RadioControl";
import TagsControl from "./components/Common/TagsControl";
import BookTimeControl from "./components/Common/BookTimeControl";
import BookControl from "./components/Common/BookControl";
Vue.component("cquery", QueryControl);
Vue.component("cqueryview", QueryView);
Vue.component("ctable", TableControl);
Vue.component("cinputquery", InputQueryControl);
Vue.component("cwindow", FloatWindowControl);
Vue.component("cinput", InputControl);
Vue.component("cselect", SelectControl);
Vue.component("ccity", CityControl);
Vue.component("ctextarea", TextareaControl);
Vue.component("ccorp", CorpControl);
Vue.component("cdept", DeptControl);
Vue.component("cproduct", ProductControl);
Vue.component("cdate", DatePickerControl);
Vue.component("csupload", CSingleUpload);
Vue.component("csuploadWithPath", CSingleUploadWithPath);
Vue.component("ccontentCat", ContentCategoryControl);
Vue.component("cnumber", InputNumberControl);
Vue.component("wxmpMaterial", WxmpMaterial);
Vue.component("clable", LabelControl);
Vue.component("cmupload", MultiUpload);
Vue.component("cselectForLabel", SelectControlForLabel);
Vue.component("cimage", ImageControl);
Vue.component("cvideo", VideoControl);
Vue.component("cradio", RadioControl);
Vue.component("ctags", TagsControl);
Vue.component("bookTime", BookTimeControl);
Vue.component("booking", BookControl);


Vue.use(ElementUI, {
    locale
});
Vue.use(VCharts);
Vue.use(VueDragging);

Vue.config.productionTip = false;
import u from "./utils/utility";

Vue.prototype.btnpower = function (btnid) {
    return u.buttonpower(store.getters.permissionId, store.state.user.au, btnid);
};
Vue.prototype.globalConfig = {
    imgUploadAction: process.env.IMG_UPLOAD_ACTION
};
const requireComponent = require.context(
    // 其组件目录的相对路径
    './views',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /.vue$/
)
requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // console.log(componentConfig.default)

    // 获取组件的 PascalCase 命名
    const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})

new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: {
        App
    }
});
