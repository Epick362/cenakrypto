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
              v-for="(currency, index) of topCurrencies"
              :key="currency.short"
              :to="{name: 'coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">
                <coin-icon
                  className="currency-icon"
                  :symbol="currency.short">
                </coin-icon>
                {{ currency.short }}
              </div>
              <div class="currency-name-long">
                <span class="muted-text">
                  {{ index + 1 }}. 
                </span>
                {{ currency.long }}
              </div>
              <div class="current-price">
                {{ currency.price | formatNumbers(2) }}
                <span class="muted-text">
                  €
                </span>
              </div>
              <div class="currency-change">
                <pretty-change-perc :percent="currency.perc">
                  <span slot="post">
                    <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                    <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
                  </span>
                </pretty-change-perc>
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
              :to="{name: 'coin', params: {coin: currency.short}}"
            >
              <div class="currency-name">
                <coin-icon
                  className="currency-icon"
                  :symbol="currency.short">
                </coin-icon>
                {{ currency.short }}
                </div>
              <div class="current-price">
                {{ currency.price | formatNumbers(2) }}
                <span class="muted-text">
                  €
                </span>
              </div>
              <div class="currency-change">
                <pretty-change-perc :percent="currency.perc">
                  <span slot="post">
                    <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                    <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
                  </span>
                </pretty-change-perc>
              </div>
            </router-link>
          </div>

          <router-link
            class="button primary-button"
            :to="{name: 'list'}"
          >
            <i class="fas fa-list-ol"></i>
            Zobraziť všetky kryptomeny
          </router-link>
        </div>
      </div>
    </section>

    <section id="faq" class="section container crypto-faq">
      <h2 class="title">Čo je kryptomena?</h2>
      <p>
        Kryptomeny sú digitálna forma peňazí. Sú kryptograficky chránené proti manipulácii.
Medzi najpopulárnejšie kryptomeny patrí Bitcoin a Ethereum. Existuje však viac ako tisíc alternatívnych kryptomien a nové vznikajú každý deň.
Jeden z hlavných rozdielov oproti tradičným menám je ich decentralizácia podobne ako je tomu pri internete a fakt, že nikto nemôže zmeniť počet mincí v obehu čo zabraňuje inflácii.
Kryptomeny nie sú ovládané žiadnou inštitúciou, bankou a ani štátom a neexistujú pre nich hranice či regulácie.
      </p>

      <h2 class="title">Ako kryptomeny začali?</h2>
      <p>
        Prvá kryptomena, s ktorou sa začalo obchodovať, bol Bitcoin v roku 2009 (3. januára  2009 bol vytvorený prvý blok v blockchaine (reťazi blokov) tzv. Bitcoin Genesis Block) 
        a za jej autora sa považuje človek s prezývkou Satoshi Nakamoto (táto osoba v reálnom živote neexistuje a môže ísť kľudne aj o skupinu ľudí).
      </p>

      <h2 class="title">Prečo existuje mnoho kryptomien?</h2>
      <p>
        Každá kryptomena má rozdielny ciel a niektoré sa snažia byť viac ako len prostriedok ma výmenu peňazí. Ethereum okrem presunu peňazí funguje aj ako jeden celosvetový super počítač, na ktorom vďaka Smart Kontraktom môže ktokoľvek vytvoriť a spúštať aplikácie. 
      </p>

      <h2 class="title">Ako investovať do kryptomien?</h2>
      <p>
        Kryptomeny patria medzi veľmi riskantné investície. Denné výkyvy niekedy dosahujú až 50% hodnoty a preto je veľmi dôležité investovať iba toľko, koľko si môžeme dovoliť stratiť. Najjednoduchšia cesta ako začať je registovať sa na Coinbase. Po registrácií a overení identity prevediete peniaze bankovým prevodom podľa inštrukcií a potom si môžete kúpiť jednu z poskytovaných kryptomien: Bitcoin, Ethereum, Litecoin a Bitcoin Cash.
      </p>

      <h2 class="title">Ako sa "skladujú" kryptomeny?</h2>
      <p>
        Krypto mince (coins) sa uchovávajú v takzvaných digitálnych peňaženkách (wallets). Peňaženka sa skladá z dvoch kľúčov, verejný a súkromný. Verejný kľúč je adresa na ktorú Vám niekto može poslať mince. Privátny kľúč je niečo ako heslo ktoré overí, že ste vlastníkom danej peňaženky a dovolí Vám s ňou narábať a posielať z nej mince.
      </p>

      <cta></cta>
    </section>

    <page-footer></page-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import Navbar from '@/components/Navbar'
import PageFooter from '@/components/PageFooter'
import Cta from '@/components/Cta'
import CoinIcon from '@/components/CoinIcon'
import PrettyChangePerc from '@/components/PrettyChangePerc'
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
    Navbar,
    PageFooter,
    Cta,
    CoinIcon,
    PrettyChangePerc
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins";
@import '../assets/variables';

.primary-button {
  display: inline-block;
  margin: 2rem auto 0 auto;
  background: lighten($palette-accent, 10%);
  border: none;
  border-radius: 40px;
  padding: 1rem 2.5rem;
  height: auto;
  color: $palette-text;
  transition: 300ms all ease-in-out;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;

  &:hover {
    background: lighten($palette-hero, 10%);
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.3);
  }
}

.top-currencies {
  margin: 2rem 0;
  min-height: 240px;
}

.small-currencies {
  margin: 2rem 0;
  min-height: 160px;
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

  @include mobile() {
    &:not(:last-child):after {
      display: none;
    }
  }

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
  padding: 1.2rem 0.2rem 0.7rem 0.2rem;
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
