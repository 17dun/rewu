/**
 * @file login.js
 * @desc 登陆demo 页面js
 * @author xiaoguang01
 * @date 2015/11/11
 */
zeus.page({
    initDatas: function () {
        self.list = [];
        self.allNum = 0;
    },
    // 初始化部件
    initParts: function () {
        var self = this;
        self.parts = {
            $form: $('#queryBox'),
            $table: $('#listBox')
        };
        self.getList();

    },
    // 事件绑定
    bindEvent: function () {
        var self = this;
        var $queryBtn = self.parts.$form.find('.query-btn');
        $queryBtn.on('click', function(){
            self.getList();
        })

        var $addBtn = self.parts.$form.find('.add-btn');
        $addBtn.on('click', function(){
            self.add();
        })

        $('#listBody').on('click', '.edit-btn', function(){
            self.edit(this);
        });

        $('#listBody').on('click', '.del-btn', function(){
            var id = $(this).parent().parent().data('itemid');
            self.del(id);
        });

        $('#listBody').on('click', '.del-btn', function(){
            var id = $(this).parent().parent().data('itemid');
            self.del(id);
        });

        $('#listBox').on('click', '.all-check', function(){
            self.allcheck($(this).is(':checked'));
        });

        $('.delall-btn').on('click', function(){
            self.alldel();
        });

        $('#listBody').on('click', '.rt-btn' , function(){
            var vid = $(this).parent().parent().data('itemid');
            self.setChannel(vid, 1);
        });

        $('#listBody').on('click', '.fs-btn', function(){
            var vid = $(this).parent().parent().data('itemid');
            self.setChannel(vid, 0);
        });

        $('#listBody').on('change', '.channelBox', function(){
            var vid = $(this).parent().parent().data('itemid');
            self.setChannel(vid, $(this).val());
        });
    },

    setChannel: function(vid, channel){
        $.ajax({
            url: '/vd/setchannel',
            type: 'GET',
            dataType: 'json',
            data: {
                vid: vid,
                channel: channel
            },
            success: function(rt){
                if(!rt.code){
                    self.msg(1);
                }else{
                    self.msg(0);
                }
                self.getList();
            },
            error: function(rt){
                self.msg(0);
            }
        });
    },


    alldel: function(){
        $('#delBox').dialog({
            title:'警告',
            modal:true,
            width:300,
            buttons: [
                {
                    text: "确定",
                    click: function(){
                        var ids = [];
                        $('.item-check:checked').each(function(i,item){
                            ids.push($(item).parent().parent().data('itemid'));
                        });
                        $.ajax({
                            url: '/vd/delall',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                ids: ids
                            },
                            success: function(rt){
                                if(!rt.code){
                                    self.getList();
                                }

                            },
                            error: function(rt){
                                //alert('失败');
                            }
                        });
                        $(this).dialog("close");
                    }
                },
                {
                    text: "取消",
                    click: function(){
                        $(this).dialog("close");
                    }
                }
            ]
        })

    },

    allcheck: function(flag){
        $('.item-check').each(function(i,item){
            $(item).prop('checked',flag)
        });
    },

    getList: function(){
        var self = this;
        var data = self.parts.$form.serialize();
        $.ajax({
            url: '/vd/list',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(rt){
                self.list = rt.data;
                self.channelList = rt.channelList;
                self.allNum = rt.allNum;
                self.renderList();
            },
            error: function(rt){
                //alert('失败');
            }
        });
    },

    renderList: function(){
        $('#allNum').html(self.allNum);
        $('#listNum').html(self.list.length);
        $("#listBody").empty();
        $('#listTemp').tmpl(self.list).appendTo('#listBody');
        self.renderChannelList();
    },

    renderChannelList: function(){
        $('.channelBox').append($('#channelTemp').tmpl(self.channelList));
    },

    add: function(){
        var self = this;
        self.edit();
    },

    renderEdit: function(data){
        $('#editBox').empty();
        $('#editFormTemp').tmpl(data).appendTo('#editBox');
    },

    edit: function(btn){
        var self = this;
        if(!btn){
            var taskData = {}
        }else{
            var index = $('.edit-btn').index(btn);
            var data = self.list[index];
        }
        self.renderEdit(data);

        $('#editBox').dialog({
            title:'编辑',
            modal:true,
            width:300,
            buttons: [
                {
                    text: "保存", 
                    click: function(){
                        var box = this;
                        self.save(function(){
                            self.getList();
                            self.msg(1);
                            $(box).dialog("close");
                        });
                    }
                }
            ]
        })
    },

    save: function(callback){
        var self = this;
        var data = $('#editform').serialize();
        console.log(data);
        $.ajax({
            url: '/vd/save',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(rt){
                callback();
            },
            error: function(rt){
                self.msg(0,'保存失败')
            }
        });

    },

    del: function(id){
        var self = this;
        $('#delBox').dialog({
            title:'警告',
            modal:true,
            width:300,
            buttons: [
                {
                    text: "确定", 
                    click: function(){
                        $.ajax({
                            url: '/vd/del?id='+id,
                            type: 'GET',
                            dataType: 'json',
                            success: function(rt){
                                self.msg(1);
                                self.getList();
                            },
                            error: function(rt){
                                self.msg(0);
                            }
                        });
                        $(this).dialog("close");
                    }
                },
                {
                    text: "取消",
                    click: function(){
                        $(this).dialog("close");
                    }
                }
            ]
        })
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
