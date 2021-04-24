<template>
  <div>
    <nav-bar></nav-bar>
    {{ exercise }}
  </div>  
</template>

<script>
import NavBar from '../navbar/index'

export default {
  name: 'Summary',
  components: {
    NavBar
  },

  data() {
    return {
      exercise: ""
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm, 'vm')
    })

  },

  async created() {
    let data = await this.getExercise(this.$route.params.id);
    // console.log(data, 'data')
    this.exercise = data;
  },

  methods: {
    async getExercise(id) {
      let result = await this.$ajax({
                            url: `/api/exercise/${id}`,
                            method: 'get'
                          })
      return result.data.doc
    }
  }
}
</script>

<style>

</style>