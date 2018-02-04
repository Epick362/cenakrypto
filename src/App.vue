<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/variables';
@import '~bulma/bulma';
@import '~buefy/src/scss/buefy';
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
    color: $palette-text;
  }

  .navbar-item {
    text-align: center;
  }

  a.navbar-item {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.8);
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.2s ease-in-out 0s;
    }

    &:hover:before {
      visibility: visible;
      transform: scaleX(0.6);
    }

    &.router-link-exact-active:before {
      visibility: visible;
      transform: scaleX(1);
    }
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
