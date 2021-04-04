<template>
  <div class="container">
    <ul class="topContainer" @click="handleClick($event)">
      <li :class="{ active: isActive }" id="null">全部</li>
      <li v-for="(item, index) in topList" :key="index" :id="item.id || item._id">
        {{item.name}}
      </li>
    </ul>
    <ul class="mediumContainer" @click="handleMediumClick($event)" ref="mediumUl">
      <li v-for="(item, index) in mediumList" :key="index" :id="item._id || item.id">
        {{ item.name  }}
      </li>
    </ul>
    <ul :class="{basicContainer: isBasic}" @click="handleBasicClick($event)" ref="basicUl">
      <li v-for="(item, index) in basicList" :key="index" :id="item.id || item._id">
        {{ item.name  }}
      </li>
    </ul>
  </div>  
</template>

<script>

export default {
  data() {
    return {
      topList: [],
      mediumList: [],
      basicList: [],
      isActive: true
    }
  },
  computed: {
    isBasic() {
      return this.basicList.length > 0;
    }
  },
  created() {
    this.queryCategoryTop();
  },
  methods: {
    /**
     * 请求顶层分类
     */
    queryCategoryTop() {
      this.$ajax({
        url: '/api/filterate/top',
        method: 'get',
        data: { test: 'test' }
      })
      .then(data => {
        let { result } = data.data
        this.topList = result.map(item => {
          return {
            name: item.name,
            id: item._id
          }
        })
      })
    },

  /**
   * 请求中间层分类
   */
    queryCategoryMedium(id) {
      this.$ajax({
        url: '/api/filterate/medium',
        method: 'get',
        params: {
          id: id
        }
      })
      
      .then(result => {
        let { containers } = result.data.data;
        console.log(containers, 'containers')
        this.mediumList = containers
      })
    },

  /**
   * 请求底层分类
   */
    queryCategoryBasic(id) {
      this.$ajax({
        url: '/api/filterate/basic',
        method: 'get',
        params: {
          id: id
        }
      })
      
      .then(result => {
        let { containers } = result.data.data;
        console.log(containers, 'containers')
        this.basicList = containers
      })
    },

    handleClick(event) {
      /**
       * Tips: get element's tagName的方法
       */
      if(event.target.tagName == "LI") {
        this.toggleActive(event, 'top');
        this.queryCategoryMedium(event.target.getAttribute('id'));
      }
      


      /**
       * Tips: 清空数组的渲染的方法
       */
      this.basicList.length = 0;
      

    },

    handleMediumClick(event) {
      if(event.target.tagName == "LI") {
        this.toggleActive(event, 'medium');
        this.queryCategoryBasic(event.target.getAttribute('id'))
      }
    },

    handleBasicClick(event) {
      if(event.target.tagName == "LI") {
        this.toggleActive(event);
      }
    },

    /**
     * Tips:event.target.classList作为一个对象具有的api有：add('class') remove('class') toggle('class') replace()
     */
    toggleActive(event, level) {
      let ulTag = event.currentTarget;
      for(let i = 0, length = ulTag.children.length; i < length; i ++) {
        ulTag.children[i].classList.remove('active')
      }

      event.target.classList.add("active")

      /**
       * Tips: switch case 情况
       */
      switch(level) {
        case 'top':
          this.clearActive('mediumUl');
          break;
        case 'medium':
          this.clearActive('basicUl')
          break;
        default:
          return;
      }

    },
    clearActive(ulList) {
      /**
       * Tips: 在原生HTML标签使用this.$refs['list']指向元素
      */
      let mediumUl = this.$refs[ulList]
      for(let i = 0, length = mediumUl.children.length; i < length; i ++) {
        mediumUl.children[i].classList.remove('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 1200px;
    margin: 0 auto;
    background: white;
  }
  .topContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 10px;
    border-bottom: 1px solid #F0F0F0;
    li {
      margin-right: 30px;
      margin-top: 20px;
      cursor: pointer;
      color: #999999;
    }
    .active {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #586AEA;
    }
  }
  .mediumContainer, .basicContainer {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    li {
      margin-right: 20px;
      margin-top: 20px;
      border: 1px solid #CCCCCC;
      cursor: pointer;
      font-size: 16px;
      color:  #999999;
      border-radius: 39px;
      padding: 3px 14px 3px 16px;
    }
    .active {
      background: #586AEA;
      color: #FFFFFF;
    }
  }
  .basicContainer {
    border-top: 1px solid #F0F0F0;
  }
</style>