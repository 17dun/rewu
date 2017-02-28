/**
 * @file login.js
 * @desc 登陆demo 页面js
 * @author xiaoguang01
 * @date 2015/11/11
 */
zeus.page({
    initDatas: function () {
        self.list = [];
    },
    // 初始化部件
    initParts: function () {
        var self = this;
        self.getList();
    },
    bindEvent: function(){

    },

    getList: function(){
        var self = this;
        $.ajax({
            url: '/reList',
            type: 'GET',
            dataType: 'json',
            data: {
                user:'悦舞官方'
            },
            success: function(rt){
                self.list = rt.data;
                self.renderList();
            },
            error: function(rt){
                //alert('失败');
            }
        });
    },

    renderList: function(){
        $("#listBody").empty();
        $('#listTemp').tmpl(self.list).appendTo('#listBody');
    }


});
