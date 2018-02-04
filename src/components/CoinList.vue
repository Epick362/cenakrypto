<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="brand-heading">
            <img class="brand-icon" src="../assets/logo.png" alt="cenakrypto.sk">
            cenakrypto.sk
          </h1>

          <h2 class="title">
            Rebríček kryptomien s najväčšou kapitalizáciou
          </h2>

          <b-table
            :data="currencies"
            :loading="loading"
            hoverable
            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"
            @click="clickRow"

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"
          >
            <template slot-scope="props">
              <b-table-column field="mktcap" label="Pozícia" numeric sortable>
                {{ props.row.rank }}.
              </b-table-column>

              <b-table-column field="short" label="Symbol" class="currency-symbol">
                {{ props.row.short }}
              </b-table-column>

              <b-table-column field="long" label="Názov">
                <coin-icon
                  className="currency-icon"
                  :symbol="props.row.short">
                </coin-icon>
                {{ props.row.long }}
              </b-table-column>

              <b-table-column field="mktcap" label="Kapitalizácia" numeric sortable>
                € {{ format(props.row.mktcap, 0) }}
              </b-table-column>

              <b-table-column field="price" label="Cena" numeric sortable>
                € <b>{{ format(props.row.price, 2) }}</b>
              </b-table-column>

              <b-table-column field="perc" label="Zmena 24h" numeric sortable>
                <span :class="type(props.row.perc)">
                  {{ props.row.perc }}%
                </span>
              </b-table-column>

              <b-table-column field="supply" label="Mince v obehu" numeric sortable>
                {{ format(props.row.supply, 0) }}
              </b-table-column>

              <b-table-column field="volume" label="Objem 24h" numeric sortable>
                {{ format(props.row.volume, 0) }}
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </section>

    <page-footer></page-footer>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Navbar from '@/components/Navbar'
import PageFooter from '@/components/PageFooter'
import CoinIcon from '@/components/CoinIcon'
import { API_ROOT } from '@/constants'

export default {
  name: 'Front',
  data() {
    return {
      currencies: [],
      total: 0,
      loading: false,
      sortField: 'mktcap',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 50
    };
  },
  methods: {
    loadData() {
      this.loading = true

      const params = [
        `page=${this.page}`,
        `sort_by=${this.sortField}.${this.sortOrder}`
      ].join('&')

      axios.get(`${API_ROOT}/list?${params}`)
      .then(({ data }) => {
          this.currencies = data.data
          this.total = data.total
          this.loading = false
      })
      .catch((error) => {
          this.data = []
          this.total = 0
          this.loading = false
          throw error
      })
    },

    onPageChange(page) {
      this.page = page
      this.loadData()
    },

    clickRow(row) {
      this.$router.push({name: 'coin', params: {coin: row.short}})
    },

    type(value) {
      const number = parseFloat(value)
      if (number > 0) {
          return 'green'
      } else {
          return 'red'
      }
    },

    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadData()
    },

    format(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "," : d, 
        t = t == undefined ? " " : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
  },

  mounted() {
      this.loadData()
  },

  components: {
    Navbar,
    PageFooter,
    CoinIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/variables';

.brand-heading {
  font-size: 2rem;
}

.brand-icon {
  width: 40px;
  height: auto;
  vertical-align: middle;
  margin: 0 0.5rem;
}

.red {
  color: $red;
}

.green {
  color: $green;
}

.currency-icon {
  width: 30px;
  vertical-align: middle;
  margin-top: -5px;
  margin-right: 5px;
}

.currency-symbol {
  font-weight: 700;
  text-align: center;
}

</style>
