<template>
  <div class="knowledge">
      <question-tip></question-tip>
  </div>
</template>

<script>
import QuestionTip from './components/index'

export default {
  name: "knowledge",
  components: {
    QuestionTip
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .knowledge {
    padding-left: 20px;
    width: 1200px;
    margin: 0 auto;
  }
</style>