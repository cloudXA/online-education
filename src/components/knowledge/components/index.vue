<template>
  <div>
    hi
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

    this.$ajax({
        url: '/api/goodslist',
        method: 'get',
    })
      .then(result => {
        console.log(result, 'result')
    })

  }
}
</script>

<style>

</style>