import axios from "axios" 
// axios: 後端網址+須知請求方式( GET or POST )

// 跟後端要資料方法1:promise (鏈式)
// export const homeApi = {
//   getRecommend: () => {
//     return axios.get('/mock/recommend')
//       .then(res => {
//         console.log('印出res.data',res.data);
//         return res.data;
//       })
//       .catch(err => {
//         console.log('獲取recommend失敗',err);
//         throw err;
//       })
//   },
//   getArticle: () => {
//     return axios.get('/mock/article')
//       .then(res => {
//         console.log('印出res.data',res.data);
//         return res.data;
//       })
//       .catch(err => {
//         console.log('獲取article失敗',err);
//         throw err;
//       })
//   }
// }

// 跟後端要資料方法2:async/await (把promise寫更同步)

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