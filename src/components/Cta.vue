<template>
    <div>
        <button class="button cta-button" @click="show">
            <span class="icon">
            <i class="fas fa-exchange-alt" />
            </span>
            <span>Kúpiť kryptomeny</span>
        </button>
    </div>
</template>

<script>
export default {
  name: 'cta',
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
            }
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
  display: block;
  margin: 5rem auto 0 auto;
  background: darken($green, 10%);
  border: none;
  border-radius: 40px;
  padding: 0.8rem 2.5rem;
  height: auto;
  color: $palette-text;
  transition: 300ms all ease-in-out;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);

  &:hover {
    background: darken($green, 5%);
  }
}
</style>
