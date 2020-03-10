<template>
  <div>
    <el-tag @click="getGoodsList">获取数据</el-tag>
    <el-tag @click="postGoodsList">提交数据</el-tag>
    <!-- 动态获取用户id,可以使用scope.row.id  -->
    <el-tag @click="getListByid(2)">根据id获取数据</el-tag>
    <p>{{ displayMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayMessage: ''
    };
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/goodslist');
      const result = await this.$http.get('/api/goodslist');
      this.displayMessage = result;
      console.log(result, 'result');
      console.log(res, 'res');
    },

    async postGoodsList() {
      const { data: res } = await this.$http.post('/api/addgoods', {
        name: '苹果',
        price: 5,
        count: 550,
        img: ''
      });
      console.log(res);
      this.displayMessage = res;
    },

    async getListByid(id) {
      const { data: res } = await this.$http.get(`/api/goodslist/${id}`);
      console.log(res);
      this.displayMessage = res;
    }
  }
};
</script>

<style>

</style>