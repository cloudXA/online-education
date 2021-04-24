<template>
  <div>
    <nav-bar></nav-bar>
    <component :is='currentPage'></component> 
  </div>
</template>

<script>
import NavBar from '@/components/navbar/index.vue'
import HomePage from '@/components/homePage'
import KnowledgePage from '@/components/knowledge/index.vue'


const compMap = [
  {
    name: 'homepage',
    mapName: 'home-page'
  },
  {
    name: 'knowledge',
    mapName: 'knowledge-page'
  }
]

export default {
  components: {
    NavBar,
    HomePage,
    KnowledgePage
  },
  data() {
    return {
    }
  },
  computed: {
    currentPage(newVal) {
      let name = this.$route.name
      let mapName = compMap.filter(com => {
        return com.name.toLowerCase() === name.toLowerCase()
      })[0].mapName;

      return mapName
    }
  },
  
}
</script>

<style>

</style>