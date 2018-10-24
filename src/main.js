import css from './css/index.css'
import $ from './js/jquery-3.2.1.min.js'
import axios from 'axios'

// var instance = axios.create({
//     baseURL: 'http://b.hj288.cn/hy/public/index.php/index/Index',
//     timeout: 1000,
//   });

axios.get('/home',{
    // baseURL: 'http://b.hj288.cn/hy/public/index.php/index/Index',
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

