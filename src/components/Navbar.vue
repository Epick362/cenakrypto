<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <span class="icon">
            <img src="../assets/logo.png" alt="cenakrypto.sk">
          </span>
        </router-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-start">
          <a href="#faq" class="navbar-item">Čo sú to kryptomeny?</a>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            <button class="button cta-button" @click="show">
              <span class="icon">
                <i class="fas fa-exchange-alt" />
              </span>
              <span>Kúpiť kryptomeny</span>
            </button>
          </span>
        </div>
      </div>
    </div>
    <v-dialog/>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    show() {
      this.$modal.show('dialog', {
        title: 'Upozornenie!',
        text: 'Investovanie do kryptomien so sebou prináša svoje riziká. Nepreberám žiadnu zodpovednosť za možné finančné straty.',
        buttons: [
          { 
            title: '<span style="color: #FF4400">Zrušiť</span>'
          },
          { 
            title: '<span style="color: #20bc56;font-size: 0.9rem;font-weight:bold;">Rozumiem, pokračovať</span>',
            default: true,
            handler: () => {
              window.open('https://www.coinbase.com/join/594d5ece3f676a05e495611b', '_blank');
            } // Button click handler
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.cta-button {
  border-radius: 20px;
  padding: 0.375rem 1.5rem;
  background: darken($green, 5%);
  color: $palette-text;
  border: none;
  transition: 300ms all ease-in-out;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);

  &:hover {
    background: darken($green, 15%);
    transform: translateY(2px);
  }
}

.cancel {
  color: $red;
}

.confirm {
  color: $green;
  font-size: 1.2rem;
}
</style>
