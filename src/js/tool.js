const Tool = {//工具汇总

    //TODO 本地存储类工具*************************************************************************//

    setSession: (key, val) => sessionStorage.setItem(key, JSON.stringify(val)),//保存本地信息
    getSession: key => JSON.parse(sessionStorage.getItem(key)),//获取本地信息
    removeSession: key => sessionStorage.removeItem(key),  // 清除session

    setCookie: (key, val) => document.cookie = key + '=' + val,//保存本地cookie信息
    getCookie: key => { //获取本地cookie信息
        let val = false;
        document.cookie.split("; ").map(item => {
            if (item.split("=")[0] === key)
                val = item.split("=")[1]
        });
        return val
    },
    removeCookie: key => {//删除本地cookie信息
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        if (all.tool.getCookie(key) !== null) {
            all.tool.setCookie(key, all.tool.getCookie(key) + ";expires=" + exp.toGMTString())
        }
    },
    setLocal: (key, val) => localStorage.setItem(key, JSON.stringify(val)), // 设置localStorage
    getLocal: key => JSON.parse(localStorage.getItem(key)),  // 获取localStorage
    //工具类别分割线---------------------------------------------------------------------------------------------//

    //TODO 通用工具类*************************************************************************//
    isType: type => Object.prototype.toString.call(type).slice(8, Object.prototype.toString.call(type).length - 1),//数据类型判断工具
    

};
export default Tool;