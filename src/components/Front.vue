<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">cenakrypto.sk</h1>

          <div class="columns top-currencies">
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
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      kekkerino
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import Navbar from '@/components/Navbar'

export default {
  name: 'Front',
  data() {
    return {
      eurRate: 1,
      topCurrencies: [],
      smallCurrencies: [],
      errors: []
    };
  },

  created() {
      axios.get(`http://coincap.io/front`)
      .then(response => {
        this.topCurrencies = response.data.slice(0, 3);
        this.smallCurrencies = response.data.slice(3, 10);
      })
      .catch(e => {
        this.errors.push(e)
      })
  },

  components: {
    Navbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
