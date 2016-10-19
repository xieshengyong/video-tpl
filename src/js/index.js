"use strict";

//引入的包根据实际情况而定
var TD = require('./app/TD'),
    Config = require('./app/Config');
    // Preload = require('./app/Preload'),
    // KeyAnimation = require('./app/KeyAnimation'),
    // MediaSprite = require('./app/MediaSprite');
    // LoadViewController = require('./app/LoadViewController'),
    // IndexViewController = require('./app/IndexViewController');

/*
*
*  引入lib库文件和LESS文件
*  必须要引入,过滤器会过滤lib文件夹里面的JS文件,做一个简单的复制
*  复制到相应的文件夹
*  引入的less会对less进行编译存放到css文件夹
* */

require('zepto');

//私有变量
var _private = {};

	_private.beginPage = $('.m-begin');
	_private.btnPlay = _private.beginPage.find('.btn-play')

	_private.video = $('.video-wrap .video-main');

	_private.lastPage = $('.m-end');
	_private.btnSeeAgain = _private.lastPage.find('.btn-seeAgain');
	_private.btnToShare = _private.lastPage.find('.btn-toShare');

	_private.shareWrap = _private.lastPage.find('.share-wrap');


var init = function () {

    //初始化微信接口
    TD.initWxApi(Config.defShare);

    $(document.documentElement).on('touchmove', function(e) {
        e.preventDefault();
    });

    _private.btnPlay.on('touchstart',beginWatch);
	
}

//预播放函数
var videoPrePlay = function (callback) {

    _private.video[0].play();

    var timeupdateFoo = function () {
    	
	    if ( this.currentTime > 0 ) {

	        _private.video.addClass('playing');

	        callback && callback();

	        _private.video.off('timeupdate', timeupdateFoo);

	    }
    	
    }
    _private.video.on('timeupdate', timeupdateFoo);

}

//开始播放
var beginWatch = function () {

    // _private.bgmp3[0].pause();

    videoPrePlay(function () {

        _private.beginPage.css('opacity','0');

        setTimeout(function () {
            _private.beginPage.hide();
        },300)

    	_private.video.on('ended', showLastPage);

    })

}


var showLastPage = function (e) {
    // if ( this.currentTime >= 3 ) {

    	this.pause();

        _private.lastPage.show();
        
        setTimeout(function () {
            _private.lastPage.css('opacity','1');
        },0);

        $(this).off('timeupdate', showLastPage)

        _private.btnToShare.on("touchstart",function (e) {
            _private.shareWrap.show();
            return false;
        })

        _private.shareWrap.on('touchstart',function (e) {
            $(this).hide();
        })
    // }
}

init();
