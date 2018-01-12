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

$palette-dark-text: #202020;
$palette-text: #fcfcfc;
$palette-body: #1f273f;
$palette-accent: #251738;

html,
body {
    height: 100%;
}

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

.top-currencies {
  margin: 3rem 0;
}

.small-currencies {
  margin: 2rem 5rem;
}

.currency-box {
  position: relative;
  margin: 1rem 0.5rem;
  padding: 0.5rem 1rem;

  &:not(:last-child):after {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: fade-out($palette-text, 0.8);
    right: 0;
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
