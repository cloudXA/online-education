<template>
  <div>
    <nav-bar></nav-bar>
    <!-- {{ exercise }} -->
    <exercise :exercise="exercise" :total="total"></exercise>
    {{ total }}
  </div>  
</template>

<script>
import NavBar from '../navbar/index';
import exercise from './components/exercise';

export default {
  name: 'Summary',
  components: {
    NavBar,
    exercise
  },

  data() {
    return {
      exercise: "",
      total: "",
      exerciseIndex: 0
    }
  },
  /**
   * exerciseIndex: this.$route.params.exerciseIdList
   */
  async created() {
    let data = await this.getExercise(this.$route.params.id);
    this.exercise = data;

    
    let jointId = localStorage.getItem(this.$route.params.companyId);
    let idList = jointId.split(",");
    this.total = idList.length;


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