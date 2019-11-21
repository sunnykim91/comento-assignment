import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import Main from "./components/Main";
import DetailPage from "./components/DetailPage";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueRouter from "vue-router";
import infiniteScroll from "vue-infinite-scroll";

Vue.use(infiniteScroll);

Vue.use(BootstrapVue);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.prototype.$EventBus = new Vue();

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/detail/:id",
    component: DetailPage
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
