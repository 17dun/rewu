print('=========开始导入==========');
load( './data.js' );
var importTime = new Date().getTime();
var importNum = 0;
for(var i=0; i<list.length; i++){
    var res=db.vds.find({vid:list[i].vid});
    if(!res.length()){
        list[i].importTime = importTime;
        db.vds.save(list[i]);
        print('ok');
        importNum++;
    }
}
print('=========共有数据==========');
print(list.length);
print('=========本次导入==========');
print(importNum);