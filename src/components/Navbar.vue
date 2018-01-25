<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <span class="icon">
            <i class="fas fa-gem" />
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
          <a class="navbar-item is-active">Prehľad cien</a>
          <a class="navbar-item">Čo sú to kryptomeny?</a>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            <a class="button is-white is-outlined is-small" target="_blank" href="https://www.coinbase.com/join/594d5ece3f676a05e495611b">
              <span class="icon">
                <i class="fas fa-shopping-cart" />
              </span>
              <span>Kúpiť kryptomeny</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
