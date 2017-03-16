print('=========开始为没有随机数的数据生成随机数==========');
var setNum = 0;
var res=db.vds.find();
var allNum = res.count();

while(res.hasNext()){
    var re=res.next();
    var randomNum = Math.floor(Math.random()*10000);
    if(!re.randomNum){
        db.vds.update(re, {$set:{randomNum:randomNum}});
        print(randomNum);
        print('ok');
        setNum++;
    }else{
        print('pass');
    }
}




print('=========共有数据==========');
print(allNum);
print('=========本次导入==========');
print(setNum);