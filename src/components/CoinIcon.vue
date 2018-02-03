<template>
  <img 
    v-if="imagePath"
    :class="className"
    :src="'/static/currencies/'+imagePath+'.svg'" 
    :alt="symbol"
  >
</template>

<script>
import { ICON_LIST } from '@/constants'

export default {
  name: 'coinIcon',
  props: ['symbol', 'className'],
  computed: {
    imagePath: function() {
      let match = ICON_LIST[this.symbol.toLowerCase()];

      if (match) {
        return match.toLowerCase();
      }

      return null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

</style>
