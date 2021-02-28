<template>
  <div>
    <div class="container-search">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select" suffix-icon="el-icon-search">
        <el-select v-model="select" slot="prepend" placeholder="标题" class="select">
          <el-option :label="option.label" :value="option.value" v-for="(option,index) in options" :key="index"></el-option>
        </el-select>
      </el-input>
    </div> 

  </div>  
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: '单选',
          value: 1
        },
        {
          label: '多选',
          value: 2
        },
        {
          label: '判断',
          value: 3
        },
        {
          label: '简答',
          value: 4
        },
        {
          label: '面试题',
          value: 5
        },
      ],
      input: '',
      select: ''
    }
  }
}
</script>

<style lang="scss">
  .container-search {
    .el-input-group__prepend {
      .el-input__inner {
        width: 100px;
      }
    }
    
    
  }
</style>
<style lang="scss" scoped>
  .el-select-dropdown__item.selected {
    color: #586AEAFF;
  }
</style>