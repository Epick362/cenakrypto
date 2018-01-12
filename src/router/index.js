import Vue from 'vue'
import Router from 'vue-router'
import Front from '@/components/Front'
import Coin from "@/components/Coin";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Front",
      component: Front
    },
    {
      path: "/coin/:coin",
      name: "Coin",
      component: Coin
    }
  ]
});
