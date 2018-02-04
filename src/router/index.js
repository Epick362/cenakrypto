import Vue from 'vue'
import Router from 'vue-router'
import Front from '@/components/Front'
import Coin from '@/components/Coin'
import CoinList from '@/components/CoinList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "front",
      component: Front
    },
    {
      path: "/list",
      name: "list",
      component: CoinList
    },
    {
      path: "/coin/:coin",
      name: "coin",
      component: Coin
    }
  ]
});
