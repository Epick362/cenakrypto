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
            Zoznam kryptomien s najväčšou kapitalizáciou
          </h2>

          <p class="help-block">
            <span class="tooltip-icon">
              <i class="fas fa-question-circle"></i>
            </span>

            Kapitalizácia je počet jednotiek meny v obehu násobený ich aktuálnou trhovou hodnotu.
          </p>

          <b-table
            :data="currencies"
            :loading="loading"
            hoverable
            striped
            paginated
            backend-pagination
            :total="total"
            :per-page="perPage"
            @page-change="onPageChange"

            backend-sorting
            :default-sort-direction="defaultSortOrder"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"
          >
            <template slot-scope="props">
              <b-table-column field="mktcap" label="Poradie" numeric sortable>
                {{ props.row.rank }}.
              </b-table-column>

              <b-table-column field="short" label="Symbol" class="currency-symbol">
                {{ props.row.short }}
              </b-table-column>

              <b-table-column field="long" label="Názov">
                <router-link :to="{name: 'coin', params: {coin: props.row.short}}">
                  <coin-icon
                    className="currency-icon"
                    :symbol="props.row.short">
                  </coin-icon>
                  {{ props.row.long }}

                </router-link>
              </b-table-column>

              <b-table-column field="mktcap" label="Kapitalizácia" numeric sortable>
                <b>{{ props.row.mktcap | formatNumbers(0) }}</b> €
              </b-table-column>

              <b-table-column field="price" label="Cena" numeric sortable>
                <b>{{ props.row.price | formatNumbers(2) }}</b> €
              </b-table-column>

              <b-table-column field="perc" label="Zmena 24h" numeric sortable>
                <pretty-change-perc :percent="props.row.perc" :bold="true"></pretty-change-perc>
              </b-table-column>

              <b-table-column field="supply" label="Jednotky v obehu" numeric sortable>
                {{ props.row.supply | formatNumbers(0) }}
              </b-table-column>

              <b-table-column field="volume" label="Objem 24h" numeric sortable>
                {{ props.row.volume | formatNumbers(0) }}
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
import PrettyChangePerc from '@/components/PrettyChangePerc'
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

    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadData()
    }
  },

  mounted() {
      this.loadData()
  },

  components: {
    Navbar,
    PageFooter,
    CoinIcon,
    PrettyChangePerc
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/variables';

.brand-heading {
  font-size: 2rem;
}

.help-block {
  color: fade-out($palette-text, 0.2);
  margin: 2rem 0;
}

.brand-icon {
  width: 40px;
  height: auto;
  vertical-align: middle;
  margin: 0 0.5rem;
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
  letter-spacing: 1px;
}

</style>
