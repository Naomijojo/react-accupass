import axios from "axios" // 1. 引入 axios

export const postApi = { // 2. 創建 postApi 物件放置 post 相關 api
  getPosts: async() => { 
    const { data } = await axios.get('/mock/posts')
    return data
  }
}