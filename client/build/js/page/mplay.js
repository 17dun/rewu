zeus.page({initDatas:function(){self.list=[]},initParts:function(){var t=this;t.getList()},bindEvent:function(){},getList:function(){var t=this;$.ajax({url:"/reList",type:"GET",dataType:"json",data:{user:"悦舞官方"},success:function(n){t.list=n.data,t.renderList()},error:function(t){}})},renderList:function(){$("#listTemp").renderAppend(self.list).appendTo(".recommend").show()}});