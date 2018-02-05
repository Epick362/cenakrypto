<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="currency-name">
            <coin-icon
              v-if="coinData.id"
              className="currency-icon"
              :symbol="coinData.id">
            </coin-icon>
            <span class="currency-short">{{ coinData.id }}</span>
            {{ coinData.display_name }}
          </h1>

          <div class="currency-main">
            <span class="tooltip-icon" v-tooltip="{ content: 'Aktuálna cena za 1 '+ coinData.id }">
              <i class="fas fa-question-circle"></i>
            </span>
            <span class="currency-price">
              {{ coinData.price | formatNumbers(2) }}
              <span class="muted-text">€</span>
            </span>
            <span class="currency-change" v-bind:class="[coinData.cap24hrChange >= 0 ? 'green' : 'red']">
              
              <pretty-change-perc :percent="coinData.cap24hrChange"></pretty-change-perc>
            </span>
          </div>

          <div class="columns currency-details">
            <div class="column">
              <div class="currency-detail-price" v-bind:class="[priceStats.change >= 0 ? 'green' : 'red']">
                {{ priceStats.change | formatNumbers(2) }}
                <span class="muted-text">€</span>
              </div>
              <div class="currency-detail-type">Zmena / {{ chartRange.text }}</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">
                {{ priceStats.low | formatNumbers(2) }}
                <span class="muted-text">€</span>
              </div>
              <div class="currency-detail-type">Min. / {{ chartRange.text }}</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">
                {{ priceStats.high | formatNumbers(2) }}
                <span class="muted-text">€</span>
              </div>
              <div class="currency-detail-type">Max. / {{ chartRange.text }}</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">
                {{ marketStats.volume }}
                <span class="muted-text">€</span>
              </div>
              <div class="currency-detail-type">24h objem</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">
                {{ marketStats.cap }}
                <span class="muted-text">€</span>
              </div>
              <div class="currency-detail-type">
                Kapitalizácia
                <span class="tooltip-icon" v-tooltip="{ content: 'Objem mincí v obehu násobený ich aktuálnou trhovou hodnotu.' }">
                  <i class="fas fa-question-circle"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section container currency-chart">
      <h2 class="chart-title">
        Vývoj ceny
        <span class="is-pulled-right">
          <pretty-change-perc :percent="priceStats.change_percent"></pretty-change-perc>
        </span>
        
      </h2>
      <highstock :options="chartOptions" ref="chartRef"></highstock>
    </section>

    <page-footer></page-footer>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Highcharts from 'highcharts'
import Navbar from '@/components/Navbar'
import PageFooter from '@/components/PageFooter'
import Loader from '@/components/Loader'
import CoinIcon from '@/components/CoinIcon'
import PrettyChangePerc from '@/components/PrettyChangePerc'
import numAbbr from 'number-abbreviate'
import { API_ROOT } from '@/constants'

const shortNumberAbbr = new numAbbr([' tisíc', ' m.', ' mld.', ' bilion'])

export default {
  name: 'Coin',

  data() {
    return {
      coinData: {},
      chartOptions: {},
      chartRange: {
        type: 'week',
        count: 1,
        text: '1 týždeň'
      },
      priceData: [],
      marketStats: {},
      loading: false
    };
  },

  computed: {
    priceStats: function() {
      if (this.priceData.length <= 0) {
        return {};
      }

      let low = _.minBy(this.priceData, (price) => price[1])[1];
      let high = _.maxBy(this.priceData, (price) => price[1])[1];
      let change = this.priceData[this.priceData.length - 1][1] - this.priceData[0][1];
      let change_percent = (change  / this.priceData[0][1]) * 100;

      return {
        change: +(change).toFixed(2),
        change_percent: +(change_percent).toFixed(2),
        low: +(low).toFixed(2),
        high: +(high).toFixed(2)
      };
    }
  },

  created() {
    this.chartOptions = this.formatChartOptions(this.$route.params.coin);
    
    this.loadCoin(this.$route.params.coin).then(response => {
      this.coinData = response.data;
    })
  },

  mounted() {
      this.loadChart(this.$route.params.coin);
  },

  methods: {
    loadCoin: function (coin) {
      this.loading = true;

      return axios.get(`${API_ROOT}/coin/${coin}`)
      .then((response) => {
        this.loading = false;

        this.marketStats = {
          volume: shortNumberAbbr.abbreviate(response.data.volume, 1),
          cap: shortNumberAbbr.abbreviate(response.data.market_cap, 1)
        };

        return response;
      });
    },
    loadChart: function (coin, scale = '7day') {
      const { chart } = this.$refs.chartRef;
      this.loading = true;

      return axios.get(`${API_ROOT}/coin/${coin}/history/${scale}`)
      .then((response) => {
        this.loading = false;
        this.priceData = response.data.price;
        chart.series[0].setData(this.priceData);
        chart.xAxis[0].setExtremes();

        return response;
      })
    },
    rangeChanged: function (range) {
      const { chart } = this.$refs.chartRef;
      const apiRange = this.selectionToString(range);

      this.chartRange = range;

      // chart.showLoading('Loading data from server...');

      this.loadChart(this.$route.params.coin, apiRange)
      .then(() => {
        // chart.hideLoading();
      });
    },
    selectionToString: function (range) {
      switch (range.type) {
        case 'day':
          return '1day';
        case 'week':
          return '7day';
        case 'month':
          return '30day';
        case 'year':
        default:
          return '365day';
      }
    },
    formatChartOptions: function (coin) {
      let vm = this;

      return {
        plotOptions: {
          series: {
            lineWidth: 2,
              states: {
                hover: {
                  lineWidth: 2
                }
            }
          }
        },
        rangeSelector: {
          selected: 1,
          allButtonsEnabled: true,
          inputEnabled: false,
          buttons: [
          {
            type: 'day',
            count: 1,
            text: '1 deň'
          }, {
            type: 'week',
            count: 1,
            text: '1 týždeň'
          }, {
            type: 'month',
            count: 1,
            text: '1 mesiac'
          }, {
            type: 'year',
            count: 1,
            text: '1 rok'
          }],
          buttonSpacing: 20,
          buttonTheme: {
            fill: 'none',
            stroke: 'none',
            'stroke-width': 0,
            r: 6,
            width: 80,
            style: {
                color: '#FDFDFD'
            },
            states: {
                hover: {
                  fill: 'rgba(255,255,255,0.3)',
                  style: {
                    color: '#FFF'
                  }
                },
                select: {
                  fill: '#FFF',
                  style: {
                    color: '#202020'
                  }
                }
            }
          },
          buttonPosition: {
            align: 'center',
            x: -30
          },
          labelStyle : {
            color: 'transparent'
          }
        },
        chart: {
          backgroundColor: null,
          panning: false
        },
        scrollbar: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
            name: coin,
            data: null,
            type: 'areaspline',
            lineColor: '#5e4dbc',
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
                    [0, '#3b3177'],
                    [1, 'transparent']
                ]
            }
        }],
        tooltip: {
          formatter: function() {
              var s = '<b>' + Highcharts.dateFormat('%A, %b %e, %Y', this.x) + '</b>';

              _.forEach(this.points, () => {
                  s += '<br/>1 '+coin+' = '+this.y+' EUR';
              });

              return s;
          },
          borderWidth: 0
        },
        yAxis: {
          labels: {
            format: '€ {value}',
            style: {
              color: '#FFF',
              fontSize: '12px'
            }
          },
          gridLineDashStyle: 'Dot',
          tickColor: '#FFFFF',
          minorGridLineWidth: 0,
          gridLineColor: 'rgba(255,255,255,0.2)'
        },
        xAxis: {
          crosshair: {
            color: 'rgba(255,255,255,0.5)',
            label: {
              borderRadius: 0,
            }
          },
          visible: false,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          events: {
            setExtremes: function(e) {
              if(typeof(e.rangeSelectorButton)!== 'undefined') {
                vm.rangeChanged(e.rangeSelectorButton)
              }
            }
          }
        }
      };
    }
  },

  components: {
    Navbar,
    Loader,
    PageFooter,
    CoinIcon,
    PrettyChangePerc
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/variables';

.red {
  color: $red;
}

.green {
  color: $green;
}

.chart-title {
  font-size: 2rem;
  margin: 1rem 0;
}

.currency-name {
  font-weight: 300;
  font-size: 2.5rem;

  .currency-icon {
    vertical-align: middle;
    width: 56px;
    margin-top: -6px;
    // margin-right: 5px;
  }

  .currency-short {
    display: 'inline-block';
    font-weight: 700;
    margin-right: '10px';
  }
}

.currency-chart {
  padding-bottom: 5rem;
}

.currency-main {
  margin: 1rem 0;

  .currency-price {
    font-weight: 700;
    font-size: 3.5rem;
    letter-spacing: -2px;
  }

  .currency-change {
    font-weight: 300;
    font-size: 2rem;
  }
}

.currency-details {
  margin: 2rem 0;
}

.currency-detail {
  &-price {
    font-size: 2rem;
    font-weight: 700;
  }

  &-type {
    font-size: 1.4rem;
  }
}
</style>
