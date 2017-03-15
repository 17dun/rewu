print('=========开始清理==========');
var res=db.vds.find();
var same = 0;

var start = new Date();

while(res.hasNext()){
    var re=res.next();
    var vid = re.vid||'';
    var res1=db.vds.find({vid:vid});
    if(res1.count()>1){
        same++;
        print(same);
        db.vds.remove(re);
    }
}

var all = res.count();
var time = new Date() - start;
print('耗时:'+time);
print('清理:'+same);
print('共计:'+all);