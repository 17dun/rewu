'use strict';zeus.page({
    initDatas: function initDatas() {
        self.list = [];
    },
    // 初始化部件
    initParts: function initParts() {
        var self = this;
        self.setPic();
    },
    bindEvent: function bindEvent() {
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                self.getNewList();
            }
        });
        $('.submit').on('click', function () {
            var wd = $.trim($('.search').val());
            if (wd == '') {
                return false;
            }

            window.location.href = '/search?word=' + wd;
        });
    },

    // 图片延迟加载
    setPic: function setPic() {
        var $pics = $('.load-pic');
        for (var i = 0; i < $pics.length; i++) {
            var $item = $($pics[i]);
            var src = $item.data('src');
            $item.attr('src', src);
            $item.removeClass('.load-pic');
        }
    },

    getNewList: function getNewList() {
        var start = $('#infiniteList .channel-item').length / 50;
        $.ajax({
            url: '/home/list?start=' + start,
            type: 'GET',
            dataType: 'json',
            success: function success(rt) {
                $('#listTemp').renderAppend(rt.data).appendTo('#infiniteList').show();
                self.setPic();
            } });

    } });