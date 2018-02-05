<template>
    <span class="percent-change" :class="[type(percent), getChangeIntensity(percent), bold ? 'bold' : '']">
        <slot name="pre"></slot>
        <span v-if="percent > 0">+</span>{{ percent | formatNumbers(2) }}%
        <slot name="post"></slot>
    </span>
</template>

<script>
export default {
  name: 'pretty-change-perc',
  props: ['percent', 'bold'],
  methods: {
    getChangeIntensity(value) {
        if (Math.abs(value) > 45) {
            return 'intensity5';
        } else if (Math.abs(value) > 30) {
            return 'intensity4';
        } else if (Math.abs(value) > 15) {
            return 'intensity3';
        } else if (Math.abs(value) > 5) {
            return 'intensity2';
        } else {
            return 'intensity1';
        }
    },
    type(value) {
      const number = parseFloat(value)
      if (number > 0) {
          return 'green'
      } else {
          return 'red'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.percent-change {
    letter-spacing: 1px;

    &.bold {
        font-weight: bold;
    }
}

// TODO make this into mixin
.red {
  &.intensity1 {
      color: $red;
  }

  &.intensity2 {
      color: saturate($red, 20);
  }

  &.intensity3 {
      color: saturate($red, 40);
  }

  &.intensity4 {
      color: saturate($red, 80);
  }

  &.intensity5 {
      color: saturate($red, 100);
  }
}

.green {
  &.intensity1 {
      color: $green;
  }

  &.intensity2 {
      color: saturate($green, 20);
  }

  &.intensity3 {
      color: saturate($green, 40);
  }

  &.intensity4 {
      color: saturate($green, 80);
  }

  &.intensity5 {
      color: saturate($green, 100);
  }
}


</style>
