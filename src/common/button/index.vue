<template>
  <div class="x-button" :index="exerIndex" :character="character">
        <slot></slot>
  </div>  
</template>

<script>
export default {
  name: 'Button',
  props: {
    exerIndex: {
      type: Number,
      default: 1
    },
    character: String,
  },
  data() {
    return {

    }
  },
 
}
</script>

<style lang="scss" scoped>
  .x-button {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    padding: 0px 28px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #586AEA;
    font-size: 16px;
    font-weight: 400;
    color: #586AEA;
    line-height: 36px;
  }

</style>