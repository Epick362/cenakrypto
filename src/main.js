// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import _ from 'lodash'

import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock';
loadStock(Highcharts);

Vue.config.productionTip = false

Vue.use(VueHighcharts, { Highcharts });


// TEMP HACK
axios.get(`https://api.fixer.io/latest?base=EUR`)
.then(response => {
  let eurToUsd = _.get(response.data, "rates.USD");

  if (eurToUsd) {
    Vue.prototype.$eurToUsd = eurToUsd;
  }
})
.catch(err => {
  console.error('Unable to load EUR to USD rates, defaulting to 1.2');
  Vue.prototype.$eurToUsd = 1.2;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
