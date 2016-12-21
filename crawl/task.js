var system = require('system');
var fs = require("fs");
var webpage = require('webpage');


var page = webpage.create();
//var url = 'http://i.youku.com/i/UNDAyOTI4NzIwNA==/videos';
var url = system.args[1];

//console.log('start');
//console.log(url);

//page.settings.resourceTimeout = 5000; // 5 seconds
//page.onResourceTimeout = function(e) {
//   // console.log(e.errorCode);   // it'll probably be 408
//    //console.log(e.errorString); // it'll probably be 'Network timeout on resource'
//    //console.log(e.url);		 // the url whose request timed out
//    phantom.exit(1);
//};

page.open(url, function(status){
    if(status !== 'success' && status !=='fail'){
        phantom.exit();
    }else{
        //console.log('open')
        setTimeout(function(){
            if (page.injectJs('clientCore.js')) {
                //console.log('begin');
                var evalResult = page.evaluate(function(){
                    var rt = [];
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
                    return rt;
                });
                console.log(JSON.stringify(evalResult));
            }
            phantom.exit();
        },1000);
    }

	setTimeout(function(){
		phantom.exit();
	},3000)

})
