'use strict'; /**
               * @file login.js
               * @desc 登陆demo 页面js
               * @author xiaoguang01
               * @date 2015/11/11
               */
zeus.page({
    initDatas: function initDatas() {
        self.list = [];
    },
    // 初始化部件
    initParts: function initParts() {
        var self = this;
        self.getList();
    },
    bindEvent: function bindEvent() {
        $('.submit').on('click', function () {
            var wd = $.trim($('.search').val());
            if (wd == '') {
                return false;
            }

            window.location.href = '/search?word=' + wd;
        });
    },

    getList: function getList() {
        var self = this;
        $.ajax({
            url: '/reList',
            type: 'GET',
            dataType: 'json',
            data: {
                user: '悦舞官方' },

            success: function success(rt) {
                self.list = rt.data;
                self.renderList();
            },
            error: function error(rt) {
                //alert('失败');
            } });

    },

    renderList: function renderList() {
        $('#listTemp').renderAppend(self.list).appendTo('.recommend').show();
    } });