print('=========开始导入==========');
var db = connect('rewu');
var importNum = 0;
var allNum = 0;
var fileNum = 0;

var dir = '20170329';
var startIndex = 1;
var endIndex = 30;

for(var index=startIndex; index<endIndex; index++){
    try{
        load( './data/' + dir + '/' + index + '.js' );
        fileNum++;
        print(list.length);
        var importTime = new Date().getTime();
        for(var i=0; i<list.length; i++){
            allNum++;
            var res=db.vds.find({vid:list[i].vid});
            if(!res.length()){
                list[i].importTime = importTime;
                list[i].randomNum = Math.floor(Math.random()*10000);
                db.vds.save(list[i]);
                print(allNum + 'ok');
                importNum++;
            }else{
                print(allNum + 'pass');
            }
        }
    }catch(e){
        print('忽略');
    }

}

print('=========导入完成==========');
print('处理文件:'+fileNum+'个');
print('共有数据:'+allNum+'条');
print('成功导入:'+importNum+'条');