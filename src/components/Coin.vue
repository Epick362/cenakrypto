<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="currency-name">
            <span class="currency-short">{{ coinData.id }}</span>
            {{ coinData.display_name }}
          </h1>

          <div class="currency-main">
            <span class="currency-price">
              € {{ (coinData.price / this.$eurToUsd).toFixed(2) }}
            </span>
            <span class="currency-change" v-bind:class="[coinData.cap24hrChange >= 0 ? 'green' : 'red']">
                {{ coinData.cap24hrChange }}%
                <i v-if="coinData.cap24hrChange >= 0" class="fas fa-chevron-up" />
                <i v-if="coinData.cap24hrChange < 0" class="fas fa-chevron-down" />
              </span>
          </div>

          <div v-if="loading == false" class="columns currency-details">
            <div class="column">
              <div class="currency-detail-price" v-bind:class="[priceStats.change >= 0 ? 'green' : 'red']">
                € {{ priceStats.change }}
              </div>
              <div class="currency-detail-type">{{ chartRange.text }} zmena</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ {{ priceStats.low }}</div>
              <div class="currency-detail-type">{{ chartRange.text }} min.</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ {{ priceStats.high }}</div>
              <div class="currency-detail-type">{{ chartRange.text }} max.</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ {{ marketStats.volume }}</div>
              <div class="currency-detail-type">24h objem</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ {{ marketStats.cap }}</div>
              <div class="currency-detail-type">Kapitalizácia</div>
            </div>
          </div>

          <div v-if="loading == true">
            <loader :loading="loading"></loader>
          </div>
        </div>
      </div>
    </section>

    <section class="container currency-chart">
      <h2 class="chart-title">
        Vývoj ceny
        <span class="is-pulled-right">
          <span v-bind:class="[priceStats.change_percent >= 0 ? 'green' : 'red']">
            {{ priceStats.change_percent }}%
            <i v-if="priceStats.change_percent >= 0" class="fas fa-chevron-up" />
            <i v-if="priceStats.change_percent < 0" class="fas fa-chevron-down" />
          </span>
        </span>
        
      </h2>
      <highstock :options="chartOptions" ref="chartRef"></highstock>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Highcharts from 'highcharts'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
import numAbbr from 'number-abbreviate'

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
      let change = high - low;

      return {
        change: (change).toFixed(2),
        change_percent: (change * 100 / low).toFixed(2),
        low: (low).toFixed(2),
        high: (high).toFixed(2)
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

      return axios.get(`http://coincap.io/page/${coin}`)
      .then((response) => {
        this.loading = false;

        this.marketStats = {
          volume: shortNumberAbbr.abbreviate(response.data.volume/this.$eurToUsd, 1),
          cap: shortNumberAbbr.abbreviate(response.data.market_cap/this.$eurToUsd, 1)
        };

        return response;
      });
    },
    loadChart: function (coin, scale = '7day') {
      const { chart } = this.$refs.chartRef;
      this.loading = true;

      return axios.get(`http://coincap.io/history/${scale}/${coin}`)
      .then((response) => {
        this.loading = false;
        let priceData = this.convertToEur(response.data.price);
        this.priceData = priceData;
        chart.series[0].setData(priceData);
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
    convertToEur: function(priceData) {
      return _.map(priceData, (item) => {
        item[1] = parseFloat((item[1] / this.$eurToUsd).toFixed(2));

        return item;
      });
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
            lineColor: '#5e548e',
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
                    [0, '#231942'],
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
    Loader
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
  .currency-price {
    font-weight: 700;
    font-size: 3.5rem;
    letter-spacing: -4px;
  }

  .currency-change {
    font-weight: 300;
    font-size: 2rem;
  }
}

.currency-details {
  margin: 2.5rem 0;
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
