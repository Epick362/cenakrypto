<template>
    <div class="indicator-container">
        <bounce-loader :loading="loading" :color="color" size="50px"></bounce-loader>
    </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader'

export default {
  name: 'loader',
  props: {
      loading: {
          type: Boolean,
          default: false
      }
  },
  data () {
    return {
      color: '#FDFDFD',
    }
  },
  components: {
    'bounce-loader': BounceLoader
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.indicator-container {
    display: inline-block;
    margin: 2.5rem 0;
}

</style>