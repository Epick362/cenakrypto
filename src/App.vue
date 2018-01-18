<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~bulma/bulma';
@import './assets/variables';

body {
  color: $palette-text;
  background-color: $palette-body;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Montserrat",sans-serif;
}

.hero.hero-main {
  background-color: transparent;
  background: linear-gradient($palette-accent, transparent);

  .title {
    font-size: 2.5rem;
    font-weight: 300;
  }

  & a:not(.button),
  & strong {
    transition: all 200ms ease-in-out;
    color: fade-out($palette-text, 0.35);
  }

  & a.navbar-item:hover,
  & a.navbar-item.is-active,
  & .navbar-link:hover,
  & .navbar-link.is-active {
    background-color: transparent;
    color: $palette-text;
  }
}

</style>
