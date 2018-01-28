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
@import './assets/tooltip';

html { height: 100%; }

body {
  min-height: 100%;
  color: $palette-text;
  background-color: $palette-body;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Montserrat",sans-serif;
}

.tooltip-icon {
  color: #888;
}

.hero.hero-main {
  background-color: transparent;
  background: linear-gradient($palette-hero, transparent);

  .title {
    font-weight: 700;
  }

  h1.title {
    font-size: 2.5rem;
    margin: 2rem 0;
  }

  h2.title {
    font-size: 1.6rem;
    margin: 3rem 0 2rem 0;
  }

  h3.title {
    font-size: 1.4rem;
    margin: 1.5rem 0;
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
  
  .v--modal {
    color: #202020;
  }
}

</style>
