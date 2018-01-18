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
            <router-link
              class="column currency-box"
              v-for="currency of topCurrencies"
              :key="currency.short"
              :to="{name: 'Coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">1 {{ currency.short }}</div>
              <div class="current-price">€ {{ convertToEur(currency.price) }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ currency.perc }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </router-link>
          </div>

          <div class="columns small-currencies">
            <router-link
              class="column currency-box-small"
              v-for="currency of smallCurrencies"
              :key="currency.short"
              :to="{name: 'Coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">{{ currency.short }}</div>
              <div class="current-price">€ {{ convertToEur(currency.price) }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ currency.perc }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </router-link>
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

  methods: {
    convertToEur: function(price) {
      return (price / this.$eurToUsd).toFixed(2);
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

.top-currencies {
  margin: 3rem 0;
}

.small-currencies {
  margin: 2rem 5rem;
}

.currency-box {
  position: relative;
  margin: 1rem 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 16px;
  transition: all 300ms ease-in-out;

  &:hover {
    box-shadow: 0 0 24px fade-out($palette-text, 0.9);
  }

  &:not(:last-child):after {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: fade-out($palette-text, 0.8);
    right: -25px;
    height: 50%;
    transform: translateY(50%);
  }

  .currency-name {
    font-size: 1.2rem;
    font-weight: 300;
  }

  .current-price {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -3px;
  }

  .currency-change {
    font-size: 1.6rem;

    &.red {
      color: $red;
    }

    &.green {
      color: $green;
    }
  }
}

.currency-box-small {
  margin: 1rem 0.5rem;
  padding: 0.5rem 0.2rem;
  border-radius: 16px;
  transition: background-color 300ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: fade-out($palette-text, 0.9);
  }

  .currency-name {
    font-size: 1rem;
    font-weight: 300;
  }

  .current-price {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .currency-change {
    font-size: 1rem;

    &.red {
      color: $red;
    }

    &.green {
      color: $green;
    }
  }
}
</style>
