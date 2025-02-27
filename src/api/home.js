import axios from "axios" 
//axios :有promise跟async\await兩種方式跟後端要資料


export const homeApi = { 
  getRecommend: async() => { 
    const { data } = await axios.get('/mock/recommend')
    return data
  },
  getArticle: async() =>{
    const { data } = await axios.get('/mock/article')
    return data
  }
}