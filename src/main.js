// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock';
loadStock(Highcharts);

Vue.config.productionTip = false

Vue.use(VueHighcharts, { Highcharts });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
