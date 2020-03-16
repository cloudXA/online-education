import { Random } from 'mockjs';

// 从指定的数组中随机返回一个元素值,创建自定义mock函数
Random.extend({
    fruit: function() {
        const arr = ['香蕉','苹果','橘子','桃子','杏'];
        return this.pick(arr);
    }
});