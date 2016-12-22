// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://i.youku.com/i/UNDI5MDQ5OTcy/videos?page=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    function parse(){
        checkAndClear();
        var rt = [];
        var mobijs = $;
        var $vds = mobijs('.videos-list .items .va');
        for(var i=0;i<$vds.length;i++){
            var $vd = mobijs($vds[i]);
            var vid = $vd.find('.v-link a').attr('href').replace(/\S*\/id_/,'').replace(/\.html?\S*/,'');
            var img = $vd.find('.v-thumb img').attr('src');
            var name = $vd.find('.v-meta-title a').attr('title');
            var num = $vd.find('.v-meta-entry .v-num').html();
            var pub = $vd.find('.v-meta-entry .v-publishtime').html();
            var target = $vd.find('.v-link .v-link-tagrt i').html();
            var time = $vd.find('.v-link .v-time').html();
            if(target!='频道会员'){
                rt.push({
                    vid: vid,
                    img: img,
                    name: name,
                    pub: pub,
                    num: num,
                    target: target,
                    time: time
                });
            }
        }
        var result = JSON.stringify(rt);

        var value = '';
        if(!localStorage.getItem('vds')){
            value = result;
        }else{
            value = localStorage.getItem('vds') + ',' + result;
        }

        localStorage.setItem('vds', value);
        setTimeout(next, 2000);

    }


    function checkAndClear(){
        var curNum = location.href.split('videos?page=')[1]*1;
        if(curNum==1){
            localStorage.setItem('vds', '');
        }

    }

    //输出结果
    function ifOutPut(){
        if($('.YK-box .title span').html()=='(0)'){
            var str = localStorage.getItem('vds');
            sqlStr = str.replace('],[',',');
            document.write(sqlStr);
        }else{
            parse();
        }
    }

    function next(){
        var nextNum = location.href.split('videos?page=')[1]*1 + 1;
        var baseUrl = location.href.split('videos?page=')[0];
        var nextPage = baseUrl + 'videos?page=' + nextNum;
        location.href = nextPage;
    }


    setTimeout(ifOutPut,2000);
    // Your code here...
})();