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
            Aktuálna cena kryptomien
          </h2>
          <div class="columns top-currencies">
            <router-link
              class="column currency-box"
              v-for="currency of topCurrencies"
              :key="currency.short"
              :to="{name: 'Coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">
                <img 
                  class="currency-icon"
                  :src="'/static/currencies/'+currency.short.toLowerCase()+'.svg'" 
                  :alt="currency.short"
                >
                {{ currency.short }}
              </div>
              <div class="currency-name-long">
                {{ currency.long }}
              </div>
              <div class="current-price">€ {{ (currency.price) }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ (currency.perc).toFixed(2) }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </router-link>
          </div>

          <h3 class="title">
            Ďalšie kryptomeny
          </h3>
          <div class="columns small-currencies">
            <router-link
              class="column currency-box-small"
              v-for="currency of smallCurrencies"
              :key="currency.short"
              :to="{name: 'Coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">
                <img 
                  class="currency-icon"
                  :src="'/static/currencies/'+currency.short.toLowerCase()+'.svg'" 
                  :alt="currency.short"
                >
                {{ currency.short }}
                </div>
              <div class="current-price">€ {{ currency.price }}</div>
              <div class="currency-change" v-bind:class="[currency.perc >= 0 ? 'green' : 'red']">
                {{ (currency.perc).toFixed(2) }}%
                <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="container crypto-faq">
      <h2 class="title">Čo je kryptomena?</h2>
      <p>
        Kryptomena je digitálna forma peňazí. Je matematicky zabezpečená proti zmene a zneužitiu.
        Medzi najpopulárnejšie kryptomeny patrí Bitcoin a Ethereum. Existuje však este viac ako tisíc alternatívnych kryptomien a nové vznikajú každý deň.
        Jeden z hlavných rozdielov oproti tradičným menám je ich decentralizácia podobne ako je tomu pri internete.
        Kryptomeny nie sú ovládané žiadnou inštitúciou, bankou a ani štátom a neexistujú pre nich hranice.
      </p>

      <h2 class="title">Z čoho majú kryptomeny svoju hodnotu?</h2>
      <p>
        Ich hodnota sa odvíja od počtu jednotiek danej meny v obehu a 
      </p>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import Navbar from '@/components/Navbar'
import { API_ROOT } from '@/constants'

export default {
  name: 'Front',
  data() {
    return {
      topCurrencies: [],
      smallCurrencies: []
    };
  },

  created() {
      axios.get(`${API_ROOT}/front`)
      .then(response => {
        this.topCurrencies = response.data.data.slice(0, 3);
        this.smallCurrencies = response.data.data.slice(3, 10);
      })
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
  margin: 2rem 0;
}

.small-currencies {
  margin: 2rem 0;
}

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

.crypto-faq {
  .title {
    color: $palette-text;
  }

  p {
    margin: 0 0 2rem 0;
  }
}

.currency-box {
  position: relative;
  margin: 1rem 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 16px;
  transition: all 300ms ease-in-out;

  &:hover {
    box-shadow: 0 3px 12px fade-out(#202020, 0.8);
    background: $palette-accent;
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

  .currency-name-long {
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 0.5rem;
  }

  .current-price {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -2px;
    margin: 0.3rem 0;
  }

  .currency-change {
    font-size: 1.6rem;
  }

  .currency-icon {
    vertical-align: middle;
    width: 32px;
    margin-top: -3px;
    margin-right: 3px;
  }
}

.currency-box-small {
  margin: 1rem 0.2rem;
  padding: 1.5rem 0.2rem;
  border-radius: 16px;
  transition: background-color 300ms ease-in-out;

  &:hover {
    box-shadow: 0 3px 12px fade-out(#202020, 0.7);
    background: $palette-accent;
  }

  .currency-name {
    font-size: 1rem;
    font-weight: 300;
  }

  .current-price {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.5rem 0;
  }

  .currency-change {
    font-size: 1rem;
  }

  .currency-icon {
    vertical-align: middle;
    width: 24px;
    margin-top: -5px;
    margin-right: 3px;
  }
}
</style>
