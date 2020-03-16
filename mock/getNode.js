import Mock from 'mockjs';
Mock.mock('/api/getNodes','get', {
  status: 200,
  message: '获取数据列表成功',
  'data|3': [
    {
      "children|5": [
        {
          "children|2-5": [
          {
            "children": [],
            "levelName": "@cword(2,5)",
            "pid": 42,
            "id": 'increment(40)'
          }],
          "levelName": "@cword(2,3)",
          "pid": 1,
          "id": '@increment(60)'
        }],
      "levelName": "@cword(2,3)",
      "pid": 0,
      "id": '@increment(1)'
    },
    {
      "ids": "43,46"
    }
  ]
});

// {
//   "statuscode":200,
//   "msg":"success",
//   "content":
//     [
//       {
//         "children":
//           [
//             {
//               "children":
//                 [
//                   {"children":[],"levelName":"JAVA基础","pid":42,"id":43},
//                   {"children":[],"levelName":"Java中级","pid":42,"id":46}
//                 ],
//               "levelName":"JAVA",
//               "pid":1,
//               "id":42
//             }
//           ],
//           "levelName":"",
//           "pid":0,
//           "id":1
//         },
//         {
//           "ids":"43,46"
//         }
//     ]
// }