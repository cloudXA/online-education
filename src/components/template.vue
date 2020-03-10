<template>
  <div>
    <h2>插入显示</h2>
    <!-- 声明式文本绑定数据,mustaches将数据解释为普通文本 -->
    <input 
      v-model="message"
      type="text" 
    >
    <p>{{ message }}</p>
    <p v-once>
      {{ message }}
    </p>
    <!-- 输出HTML代码 -->
    <span 
      v-html="rawHTML" 
    >
    </span>
    <!-- 属性值绑定+事件绑定 -->
    <div 
      :id="dynamicId"
    />
    <button 
      :disabled="isDisabled" 
      @click="dosomething"
    >
      按钮
    </button>
    <!-- javascript表达式 -->
    {{ number + 1 }}
    {{ ok ? 'yes' : 'no' }}
    <!-- [ "1", "2", "2", "2" ] -> [ "2", "2", "2", "1"] -> 2,2,2,1 -->
    {{ info.split(' ').reverse().join(',') }}
  </div>
</template>

<script>

export default {
    data() {
        return {
          message: 'sd',
          rawHTML: '<b>垃圾</b>',
          dynamicId: 'sapp',
          isDisabled: false,
          number: 2,
          ok: undefined,
          info: '1 2 2 2'
        };
    },
    methods: {
      dosomething() {
        alert('hi');
      }
    }
};
</script>

<style>

</style>