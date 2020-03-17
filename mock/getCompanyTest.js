import Mock from 'mockjs';

Mock.mock('/api/getCompanyTest', 'get', {
  status: 200,
  message: '获取数据列表成功',
  'data|6': [
    {
      "title|2-10":"@cword(3)",
      "id": "@increment(1)",
      "watch": 22222,
      "number": 22
    }
  ]
});