<template>
  <div class="knowledge">
    <ul>
      <li>
        <question-tip></question-tip>
      </li>
      <li>多选</li>
      <li>判断</li>
      <li>简答</li>
    </ul>
  </div>
</template>

<script>
import QuestionTip from './components/index'

export default {
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
    width: 1200px;
    margin: 0 auto;
    ul {
      display: grid;
      grid-template-columns: repeat(1, 1200px);
      row-gap: 20px; 
      li {
        border: 1px solid palegreen;
      }
    }
  }
</style>