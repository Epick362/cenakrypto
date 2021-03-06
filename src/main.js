// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import _ from 'lodash'

import VTooltip from 'v-tooltip'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts'
import loadStock from 'highcharts/modules/stock'
import VModal from 'vue-js-modal'
import Buefy from 'buefy'

import '@/filters/formatNumbers'

loadStock(Highcharts)

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fas',
})
Vue.use(VueHighcharts, { Highcharts })
Vue.use(VTooltip)
Vue.use(VModal, { dialog: true })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
