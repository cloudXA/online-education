import Mock from 'mockjs';

// 通过Mock.mock()模拟api接口
Mock.mock('/api/goodslist', 'get', {
    status: 200,
    message: '获取数据列表成功',
    'data|5-10': [
        {
            // 'id|+1': 0, //模拟自增长的id
            id: '@increment(1)',
            name: '@cword(2,5)',
            price: '@natural(2,10)',
            count: '@natural(100,999)',
            img: '@dataImage(25x25)'
        }
    ]
});

// 外层的mock负责拦截ajax--监听api，处理function
Mock.mock('/api/addgoods','post', function(option) {
    // 这里的option是请求相关的参数,一般请求数据的时候，都会检查是否请求的数据上传成功了
    console.log(option);

    // 里层的mock负责生成假数据的
    return Mock.mock({
        status: 200,
        message: '@cword(2,5)'
    });
});

// Mock.mock(/\/api\/goodslist/,'get',function(option) {
//     console.log(option);

//     // 返回数组形式包裹的字符串，该字符串是符合匹配正则的的字符：如完整的匹配字符串，和匹配的数字，
//     const res = /\/api\/goodslist\/(\d+)/.exec(option.url);

//     console.log(res,'res');

//     return Mock.mock({
//         data: {
//             id: res[1] - 0,
//             name: '@fruit()',
//             price: 2,
//             count: 199,
//             img: '@dataImage(25x25)'
//         },
//         status: 200,
//         message: '获取商品成功'
//     });

// });