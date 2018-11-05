import 'babel-polyfill'
// import 'lodash'
// import dom from './js/a.js'

import './css/animate.min.css'
import './scss/base.scss'
import './scss/index.scss'


// import $ from './js/jquery-3.2.1.min.js'
import axios from 'axios'
import utils from './js/utils.js'

pageInit()

let imgSrc = [];
perload2(imgSrc, function () {
    //音乐播放
    // utils.autoPlay()
    // utils.musicPlay()
})

window.onload = function () {
    let box = document.querySelector('.box')
    box.addEventListener('click',function(){
        utils.removeClass(box,'on')
    },false)
}

//初始化页面
function pageInit() {
    //设置rem
    utils.setRem()
    window.addEventListener('resize', utils.setRem(), false)

    // 禁止触摸
    document.addEventListener('touchmove', function (e) {
        e.preventDefault;
    })

    //长按不出现菜单
    utils.contextmenu()

    // 监听手机屏幕状态
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        utils.hengshuping()
        utils.setRem()
    }, false);
}

//图片预加载
function perload2(imgSrc, callback) {
    var imgs = [];
    var c = 0;
    for (var i = 0; i < imgSrc.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSrc[i];
        imgs[i].onload = function () {
            c++
            var num = parseInt((c / imgSrc.length) * 100);
            var poress = num + '%'
            // document.querySelector('.loading_num').innerText(poress) //百分比

            if (c == imgSrc.length) {
                document.querySelector('.loading_num').innerText('100%')

                if (callback) {
                    setTimeout(function () {
                        callback();
                    }, 500)
                }
            }
        }
    }
    return imgs; //返回加载的图片列表，这个省略也没有问题
}

// axios.get('/home', {
//         // baseURL: 'http://b.hj288.cn/hy/public/index.php/index/Index',
//     })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });