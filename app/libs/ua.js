/**
 * @file json.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/10/09
 */


module.exports = {
    renderByUa: function * (tpl, data){
        var uaStr = this.req.headers['user-agent'];
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (uaStr.indexOf(Agents[v]) > 0) { flag = false; break; }
        }

        //先关闭PC站
        flag = false
        var tpl = flag? tpl : 'm'+tpl;
        var layout = flag? 'layout' : 'mlayout';
        var data = data;
        if(data){
            data.layout = layout;
        }else{
            data = {
                layout: layout
            }
        }
        yield this.render(tpl,data);
    }
};
