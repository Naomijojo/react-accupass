import Mock from "mockjs"; // 1. 引入 mockjs
import posts from './data/posts.json' // 2. 引入要傳遞給前端api的數據

Mock.mock('/mock/posts', { // 3. 傳遞給前端數據
  code: 200,
  data: posts
})
