/**
 * @file login.js
 * @desc 登陆demo 页面js
 * @author xiaoguang01
 * @date 2015/11/11
 */
zeus.page({
    initDatas: function () {
        self.rsList = [];
    },
    // 初始化部件
    initParts: function () {
        self.getRsList();
        self.getStatList();
    },
    // 事件绑定
    bindEvent: function () {

    },


    getRsList: function(){
        $.ajax({
            url: '/allBugList',
            type: 'GET',
            dataType: 'json',
            success: function(rt){
                self.rsList = rt.data;
                self.renderChartBox();
            },
            error: function(rt){
                //alert('失败');
            }
        });
    },

    //获取统计数据
    getStatList: function(){
        $.ajax({
            url: '/getAllStat',
            type: 'GET',
            dataType: 'json',
            success: function(rt){
                self.statList = rt;
                console.log(self.statList);
                self.statList.avi = (self.statList.allNum*100/self.statList.allQueryNum).toFixed(2)+'%';
                if(isNaN(self.statList.avi)){
                    self.statList.avi = '-';
                }
                self.renderStatBox();
            },
            error: function(rt){
                //alert('失败');
            }
        })

    },

    renderStatBox: function(){
        $('#statBody').html($('#statTemp').tmpl(self.statList));

    },

    renderChartBox: function(){
        $('#bugListTemp').tmpl(self.rsList).appendTo('#bugList');
        $('.chart-box').css({width:self.getItemWidth()});
        self.renderCharts();
    },

    getItemWidth: function(){
        return $('.chart-box-wrap').width();
    },

    renderCharts: function(){
        for(var i = 0; i < self.rsList.length; i++){
            var rsItem = self.rsList[i];
            var lineChart = echarts.init($('.chart-box')[i]);
            lineChart.setOption({
                title : {
                    show:false,
                    text: rsItem.display + '监控趋势',
                    subtext: '单位：总个数'
                },
                grid:{
                    top:10,
                    bottom:25
                },
                legend: {
                    data:['体重','净消耗']
                },
                itemStyle: {
                    normal:{
                        lineStyle:{
                            color:'#eee'
                        }
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle:{
                            color:'#eee'
                        }
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLine: {
                            lineStyle:{
                                color:'#eee'
                            }
                        },
                        data : rsItem.times
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine: {
                            lineStyle:{
                                color:'#eee'
                            }
                        },
                        
                    }
                ],
                series : [
                {
                    name:'结果',
                    type:'line',
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'skyblue'
                            }
                        }
                    },
                    data: rsItem.values
                }
            ]
            })
        }
    },

    //飘红渐变提示
    msg: function(type,msg){
        var $msgBox = $('#bgMsg')
        if(type){
            $msgBox.addClass('alert-success');
            $msgBox.removeClass('alert-danger');
            $msgBox.html('操作成功')
        }else{
            $msgBox.addClass('alert-danger');
            $msgBox.removeClass('alert-success');
            $msgBox.html('操作失败')
        }
        if(msg){
            $msgBox.html(msg);
        }
        $msgBox.animate({opacity:1});
        $msgBox.animate({opacity:0},800)
    }
    
});
