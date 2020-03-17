<template>
  <div>
    <Title v-slot:title :url="imageSrc">{{name}}</Title>
    <Detail></Detail>
  </div>
</template>

<script>
import Title from '@/common/title.vue'
import Detail from '@/components/commonArea/detail'

export default {
  data() {
    return {
      imageSrc: {
          src: "/src/assets/interview.png"
        },
      name: '普通题库'
    }
  },
  components: {
    Title,
    Detail
  }
}
</script>

<style scoped>

</style>