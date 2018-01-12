<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ coinData.id }}</h1>

          <highstock :options="chartData"></highstock>

          <!-- <div class="columns top-currencies">
            <div class="column currency-box" v-for="currency of topCurrencies" :key="currency.short">
              <div class="currency-name">1 {{ currency.short }}</div>
              <div class="current-price">€ {{ (currency.price / eurRate).toFixed(2) }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ currency.perc }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </div>
          </div>

          <div class="columns small-currencies">
            <div class="column currency-box-small" v-for="currency of smallCurrencies" :key="currency.short">
              <div class="currency-name">{{ currency.short }}</div>
              <div class="current-price">€ {{ (currency.price / eurRate).toFixed(2) }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ currency.perc }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>

    <section class="container">
      {{ coinData.id }}
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Highcharts from 'highcharts';
import Navbar from '@/components/Navbar'

export default {
  name: 'Coin',
  data() {
    return {
      coinData: {},
      chartData: {}
    };
  },

  created() {
      axios.get(`http://coincap.io/page/${this.$route.params.coin}`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.coinData = response.data;
      })

      axios.get(`http://coincap.io/history/1day/${this.$route.params.coin}`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.chartData = this.formatChartData(response.data.price);
      })
  },

  methods: {
    formatChartData: (data) => {
      return {
        rangeSelector: {
          inputEnabled: false
        },
        chart: {
          backgroundColor: null
        },
        scrollbar: {
          enabled: false
        },
        series: [{
            name: 'lel',
            data: data,
            type: 'areaspline',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            backgroundColor:null,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#6542b2'],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }],
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          gridLineColor: 'transparent'
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0
        }
      };
    }
  },

  components: {
    Navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
