// import $ from './jquery-3.2.1.min.js'

const Utils = {}

//打印调试
Utils.log = console.log.bind(console);

// 手机号验证
Utils.isPhone = function (phone) {
    var phoneReg = /^1[3|4|5|6|7|8|9]\d{9}$/;
    var ok = false;
    if (phoneReg.test(phone)) {
        ok = true
    }
    return ok
}


/**
 *截取url的参数
 *
 * @param {string} name  要截取的参数名
 * @returns
 */
Utils.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 *设置css属性
 *
 * @param {dom} obj   目标
 * @param {object} options   要设置的css属性的集合，已对象形式传入
 */
Utils.css = function(obj,options){
    for(let i in options){
        obj.style[i] = options[i]
    }
}

/**
 *检测是否有class名
 *
 * @param {dom} obj
 * @param {string} name class名
 * @returns
 */
Utils.hasClass = function(obj,cls){
    let reg = new RegExp(cls)
    if(reg.test(obj.className)){
        return true
    }else{
        return false
    }
}

//新增class
Utils.addClass = function(obj,cls){
    obj.className += ' ' + cls
}

//删除class
Utils.removeClass = function(obj,cls){
    if(Utils.hasClass(obj,cls)){
        let name = obj.className
        let reg = new RegExp(cls)
        let str = name.replace(reg,'')
        obj.className = str
    }else{
        console.log('当前目标没有此class')
    }
}


/**
 *监听手机屏幕状态，要在手机上才有用
 *
 */
Utils.hengshuping = function () {
    let remind = document.querySelector('.remind-box')
    if (window.orientation == 180 || window.orientation == 0) {
        // alert("竖屏状态！")
        remind.style.display = 'none'
    }
    if (window.orientation == 90 || window.orientation == -90) {
        // alert("建议竖屏状态下体验！")
        remind.style.display = 'block'
    }
}
// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 

//设置rem  50px
Utils.setRem = function () {
    var cw = document.body.clientWidth || document.documentElement.clientWidth;
    document.getElementsByTagName("html")[0].style.fontSize = cw / 7.5 + "px";
};

/**
 *
 *
 * @param {arr} imgSrc  imgSrc参数是页面中要预加载的图片的路径数组，如imgSrc=['img/xx.png','img/xxx.png'...]
 * @param {function} callback  callback就是你加载完图片之后要执行的函数
 * @returns
 */
function perload(imgSrc, callback) {
    var imgs = [];
    var c = 0;
    for (var i = 0; i < imgSrc.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSrc[i];
        imgs[i].onload = function () {
            c++
            if (c == imgSrc.length) {
                if (callback) {
                    callback();
                }
            }
        }
    }
    return imgs; //返回加载的图片列表，这个省略也没有问题
}

/**
 * 移动端禁止页面滚动
 * 
 * @returns {object} 
 */
Utils.stopScroll = function () {
    var html = document.getElementsByTagName('html')[0];
    var body = document.getElementsByTagName('body')[0];
    var o = {};
    o.can = function () {
            html.style.overflow = "visible";
            html.style.height = "auto";
            body.style.overflow = "visible";
            body.style.height = "auto";
        },
        o.stop = function () {
            html.style.overflow = "hidden";
            html.style.height = "100%";
            body.style.overflow = "hidden";
            body.style.height = "100%";
        }
    return o
}

/**
 * 页面后退时触发的事件
 * 
 * @param {function} callback 
 */
Utils.unload = function (callback) {
    pushHistory();
    var bool = false;
    setTimeout(function () {
        bool = true;
    }, 1500);
    window.addEventListener("popstate", function (e) {
        if (bool) {
            callback() //根据自己的需求实现自己的功能  
        }
        pushHistory();

    }, false);

    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
}


/**
 *禁止出现右键菜单，移动端防止微信长按出现菜单
 *
 */
Utils.contextmenu = function () {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    },false);
}


/**
 *@desc 自动播放音乐
 *
 * @param {dom} dom  
 */
Utils.autoPlay = function (dom) {
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            dom.play();
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                dom.play();
            });
        }, false);
    }
}

/**
 *点击停止或播放音乐
 *
 */
Utils.musicPlay = function () {
    document.querySelector('.music-box').addEventListener('click', function () {
        var music = document.querySelector('#music')
        console.log(music)
        if (/on/.test(this.className)) {
            this.className = 'music-box'
            music.pause()
        } else {
            this.className = 'music-box on'
            music.play()
        }
    },false)
}

//弹窗提示
Utils.toast = function (text, callback) {
    let obj = document.querySelector('.toast');
    let isHas = obj? true : false;
    if (isHas) {
        obj.style.display = 'block'
    } else {
        var p = document.createElement('p');
        p.className = 'toast'
        p.innerText = text
        p.css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '5px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            zIndex: '100'
        })
        $('body').append(p)
    }

    setTimeout(function () {
        obj.style.display = 'none'
        callback && callback()
    }, 2000)
}

//检测IPhoneX
function isIPhoneX() {
    var u = navigator.userAgent;
    var o = false
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
            //是iphoneX
            return o = true
        } else {
            //不是iphoneX
            return o = false
        }
    }
}

/**
 *浏览器后退事件
 *
 * @param {function} fn  后退的时候执行的事件
 */
function houtui(fn) {
    window.onpopstate = function (event) {
        // alert('退出页面')
        fn()
    };
    //加入以下俩行代码，才能触发 
    window.history.pushState('forward', null, '#');
    window.history.forward(1);
}


export default Utils;