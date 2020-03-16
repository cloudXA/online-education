<template>
  <div class="tabNav">
    <!--  单击一个节点能够显示对应子节点TODO:在普通题库显示当前节点下的题目  -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in rootNodes" :key="item.id" :label="item.levelName" >
        <div>
          <el-row class="rowTitle">
            <el-button v-for="innerItem in item.children" :key="innerItem.id" size="small" round @click="unfoldList" >{{innerItem.levelName}}
            </el-button>
          </el-row>
          <hr>
          <el-row class="rowTitle">
            <label for="option" class="option">常规选项：</label>
            <el-button v-for="(item, index) in options" :key="index" size="small" round  >{{item}}
            </el-button>
          </el-row>
        </div>
      </el-tab-pane>
  </el-tabs>
  </div>  
</template>

<script>

export default {
    data() {
      return {
        isA: true,
        activeName: 'second',
        rootNodes: '',
        options: ['全部','单选','多选','判断','简答']
      };
    },
    methods: {
      unfoldList(event) {
        for (let i = 0; i< this.$refs.allList.length; i++) {
          this.$refs.allList[i].style.display = 'none';
        }
        for (let i = 0; i < event.target.children.length; i++) {
          event.target.children[i].style.display = 'block'
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async getNodes() {
        const { data: res} = await this.$http.get('/api/getNodes');
        let suitable = [];
        for (let i = 0; i < res.data.length; i+=2) {
          suitable.push(res.data[i])
        }
        this.rootNodes = suitable
        this.secondaryNodes = res.data[0].children[0].children
        console.log(res,'res');
      }
    },
    mounted() {
      this.getNodes();
    }
  }
</script>

<style lang="scss">
  .tabNav {
    width: 1200px;
    margin: 0 auto;
  }
  .el-tabs__active-bar {
    background-color: white;
    height: 0;
  }
  .aClass {
    display: "none";
  }
  .option {
    width:90px;
    height:18px;
    font-size:18px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:19px;
  }
  
</style>