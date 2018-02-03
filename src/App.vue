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


.search-input {
  padding: 6px 16px;
  border-radius: 16px;
  border: none;
  background: rgba(255,255,255,0.2);
  color: #FFF;
  font-size: 1rem;
  width: 150px;
  transition: all 200ms ease-in;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:focus {
    background: rgba(255,255,255,0.25);
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }
}

.autocomplete__suggestions {
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  width: auto;
  min-width: 100%;
  font-variant: initial !important;
  margin-top: 5px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  background: transparent;

  .autocomplete__entry {
    color: $palette-text;
    background: lighten($palette-hero, 5%);
    font-variant: initial !important;
    font-size: 1em !important;
    transition: all 200ms ease-in-out;
    padding: 10px;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &:hover {
      background: $palette-accent;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      z-index: 5;
    }
  }
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

  .navbar-item {
    text-align: center;
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
