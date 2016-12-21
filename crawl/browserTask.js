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
console.log(JSON.stringify(rt));