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

          <div class="columns currency-details">
            <div class="column">
              <div class="currency-detail-price">€ +300</div>
              <div class="currency-detail-type">1 week change</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ 2000</div>
              <div class="currency-detail-type">1 week low</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ 2570</div>
              <div class="currency-detail-type">1 week high</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ 3.5mld</div>
              <div class="currency-detail-type">Volume</div>
            </div>
            <div class="column">
              <div class="currency-detail-price">€ 160mld</div>
              <div class="currency-detail-type">Market Cap</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <h2>História ceny</h2>
      <highstock :options="chartData" ref="chartRef"></highstock>
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
      this.loadCoin(this.$route.params.coin).then(response => {
        this.coinData = response.data;
      })

      this.loadChart(this.$route.params.coin).then(response => {
        this.chartData = this.formatChartData(this.$route.params.coin, response.data.price);
      })
  },

  methods: {
    loadCoin: function (coin) {
      return axios.get(`http://coincap.io/page/${coin}`);
    },
    loadChart: function (coin, scale = '7day') {
      return axios.get(`http://coincap.io/history/${scale}/${coin}`);
    },
    rangeChanged: function (range) {
      const apiRange = this.selectionToString(range);
      const { chart } = this.$refs.chartRef;
      console.log(range);

      chart.showLoading('Loading data from server...');

      this.loadChart(this.$route.params.coin, apiRange)
      .then((response) => {
        let priceData = this.convertToEur(response.data.price);
        chart.series[0].setData(response.data.price);
        chart.xAxis[0].setExtremes();
        chart.hideLoading();
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
    formatChartData: function (coin, chartData) {
      chartData = this.convertToEur(chartData);

      let vm = this;

      return {
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
            data: chartData,
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
    Navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/variables';

.currency-name {
  font-weight: 300;
  font-size: 2.5rem;

  .currency-short {
    display: 'inline-block';
    font-weight: 700;
    margin-right: '10px';
  }
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

    &.red {
      color: $red;
    }

    &.green {
      color: $green;
    }
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
