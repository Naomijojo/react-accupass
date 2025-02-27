import Mock from "mockjs"; 
import recommendData from './data/recommend.json'; 
import articleData from './data/article.json';

Mock.mock('/mock/recommend', { code: 200, data: recommendData })
Mock.mock('/mock/article'  , { code: 200, data: articleData })