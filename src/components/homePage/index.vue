<template>
  <div>
    <div class="banner">
      得到
    </div>
    <sub-navbar></sub-navbar>
    
  </div>
</template>

<script>
import SubNavbar from '@/components/subNavbar/index'

export default {
  components: {
    SubNavbar
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
  .banner {
    cursor: pointer;
    width: 100%;
    height: 560px;
    background-image: url('./image/banner.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
</style>