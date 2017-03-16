print('=========开始导入==========');
load( './data.js' );
print(list.length);
var importTime = new Date().getTime();
var importNum = 0;
for(var i=0; i<list.length; i++){
    print(list[i].vid);
    var res=db.vds.find({vid:list[i].vid});
    if(!res.length()){
        list[i].importTime = importTime;
        list[i].randomNum = Math.floor(Math.random()*10000);
        db.vds.save(list[i]);
        print('ok');
        importNum++;
    }
}
print('=========共有数据==========');
print(list.length);
print('=========本次导入==========');
print(importNum);