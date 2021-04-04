<template>
  <div class="container">
    <div class="banner">
    </div>
    <filter-navbar></filter-navbar>
    
  </div>
</template>

<script>
import SubNavbar from '@/components/subNavbar/index'
import FilterNavbar from './components/filter';

export default {
  components: {
    SubNavbar,
    FilterNavbar
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
  .container {
    background: #F8F8F8;
    .banner {
      cursor: pointer;
      width: 100%;
      height: 560px;
      background-image: url('./image/banner.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }
  }
  
</style>