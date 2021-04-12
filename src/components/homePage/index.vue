<template>
  <div class="container">
    <div class="banner"></div>
    <filter-navbar @basicFilter="queryExerciseBasic"></filter-navbar>
    <inter-view :id="id"></inter-view>

  </div>
</template>

<script>
import SubNavbar from "@/components/subNavbar/index";
import FilterNavbar from "./components/filter";
import InterView from "./components/interview";

export default {
  components: {
    SubNavbar,
    FilterNavbar,
    InterView
  },
  data() {
    return {
      id: ""
    };
  },
  methods: {
    queryExerciseBasic(id) {
      this.id = id;
    }
  }
};
</script>

<style lang="scss">
.container {
  background: #f8f8f8;
  .banner {
    cursor: pointer;
    width: 100%;
    height: 560px;
    background-image: url("./image/banner.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
}
</style>
