<template>
  <div class="container">
    <ul class="topContainer" @click="handleClick($event)">
      <li :class="{ active: isActive }" name="all" id="null" ref="all">全部</li>
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
    <ul class="choose">
      <li class="chooseTitle">
        常规选项：
      </li>
      <li>
        <ul class="chooseContainer" @click="handleChooseClick($event)" ref="chooseUl">
          <li v-for="(item, index) in chooseList" :key="index" >
            {{ item.name }}
          </li>
        </ul>
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
      chooseList: [
        {
          type: 0,
          name: '全部'
        },
        {
          type: 1,
          name: '单选'
        },
        {
          type: 2,
          name: '多选'
        },
        {
          type: 3,
          name: '判断'
        },
        {
          type: 4,
          name: '简答'
        }
      ],
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

    this.$nextTick(() => {
      this.$store.dispatch('filter/set_isAll', true)
    })
    

  },
  methods: {
    /**
     * 请求一级分类top
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
   * 请求二级分类medium
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
        this.mediumList = containers
      })
    },

  /**
   * 请求三级分类(basic)
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
        this.basicList = containers
      })
    },

    /**
     * 一级分类中获取二级分类内容
     */
    handleClick(event) {
      if(event.target.tagName == "LI" && event.target.getAttribute("name") === "all") {
        this.toggleActive(event, 'top');

        this.clearActive("mediumUl");
        this.clearActive("basicUl");
        this.basicList = "";
        this.mediumList = "";

        this.$store.dispatch('filter/set_isAll', true)

      } else if (event.target.tagName == "LI") {
        
        this.$store.dispatch('filter/set_isAll', "")
        this.toggleActive(event, 'top');
        this.queryCategoryMedium(event.target.getAttribute('id'));

      }

      if(this.basicList) {
        this.basicList.length = 0
      }

    },

    /**
     * 二级分类中获取三级分类
     */
    handleMediumClick(event) {
      if(event.target.tagName == "LI") {
        this.toggleActive(event, 'medium');
        this.queryCategoryBasic(event.target.getAttribute('id'))
      }
    },

    /**
     * 三级分类中获取对应的exercise题目内容
     */
    handleBasicClick(event) {
      if(event.target.tagName == "LI") {
        this.toggleActive(event);
        let id = event.target.getAttribute('id');
        this.$emit('basicFilter', id)
      }
    },

    handleChooseClick(event) {
      if(event.target.tagName == "LI") {
        this.toggleActive(event);
      }
    },


    toggleActive(event, level) {
      let ulTag = event.currentTarget;
      for(let i = 0, length = ulTag.children.length; i < length; i ++) {
        ulTag.children[i].classList.remove('active')
      }

      event.target.classList.add("active")

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
    background: white;
    padding: 0 70px;
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
  .choose {
    display: flex;
    align-items: baseline;
  }
  .mediumContainer, .basicContainer, .chooseContainer {
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
    .chooseTitle {
      font-size: 18px;
      font-family: STHeitiSC-Medium, STHeitiSC;
      font-weight: 500;
      color: #333333;
      line-height: 19px;
      border: none;
    }
  }
  .basicContainer {
    border-top: 1px solid #F0F0F0;
  }
</style>