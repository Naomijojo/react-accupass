import axios from "axios" 
// axios: 後端網址+須知請求方式( GET or POST )

// 跟後端要資料方法1:promise (鏈式)
// axios.get('/mock/recommend').than(data => console.log(data))

// 跟後端要資料方法2:async/await (把promise寫更同步)
// const getData = async() => {
//  const data = await axios.get('/mock/recommend')
//  console.log(data) 
// }
// get(Data)

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