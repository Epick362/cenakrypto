<template>
  <footer class="section page-footer">
      <div class="footer-inner container">
        <div class="columns">
            <div class="column is-3">
                <b>cenakrypto.sk</b><br />
                Vytvoril <a href="https://filiphajek.com" target="_blank">Filip Hájek</a> &copy; 2018
            </div>
            <div class="column">
                Kryptomeny sú vysoko rizikové investície. Táto stránka neposkytuje finančné poradenstvo a nezodpovedá za akékoľvek straty spôsobené investovaním do kryptomien.
            </div>
        </div>
      </div>
  </footer>
</template>

<script>
export default {
  name: 'pageFooter'
}
</script>

<style lang="scss">
@import '../assets/variables';

.social-icons {
    font-size: 3rem;
    text-align: center;

    .fa-facebook {
        margin-bottom: 3px;
    }
}

.page-footer {
    color: darken($palette-text, 20%);
    margin-top: 6rem;
    background: #202030;
}

.footer-inner {
    padding: 8rem 0;
}

a {
    color: $green;
    transition: 300ms all ease-in-out;

    &:hover {
        color: darken($green, 10%);
    }
}
</style>
