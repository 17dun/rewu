zeus.page({
    initDatas: function () {
        self.list = [];
    },
    // 初始化部件
    initParts: function () {
        var self = this;
        self.setPic();
    },
    bindEvent: function () {
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
    setPic: function () {
        var $pics = $('.load-pic');
        for (var i = 0; i < $pics.length; i++) {
            var $item = $($pics[i]);
            var src = $item.data('src');
            $item.attr('src', src);
            $item.removeClass('.load-pic');
        }
    },

    getNewList: function () {
        var start = $('#infiniteList .channel-item').length / 50;
        $.ajax({
            url: '/home/list?start=' + start,
            type: 'GET',
            dataType: 'json',
            success: function (rt) {
                $('#listTemp').tmpl(rt.data).appendTo('#infiniteList');
                self.setPic();
            }
        });
    }
});
