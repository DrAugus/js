// functionNamesLikeThis
// variableNamesLikeThis
// ClassNamesLikeThis
// EnumNamesLikeThis
// methodNamesLikeThis
// CONSTANT_VALUES_LIKE_THIS
// foo.namespaceNamesLikeThis.bar
// filenameslikethis.js

//秒转换
const secondsFormat = (s) => {
    const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
    const hour = Math.floor((s - day * 24 * 3600) / 3600);
    const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
    if (day < 0 || hour < 0 || minute < 0 || second < 0) return -1;
    return day + "天" + hour + "时" + minute + "分" + second + "秒";
};

const Deadline = (start, end) => secondsFormat(Math.floor(end.diff(start) / 1000));

//返回始末时间之间的所有日期
const getDuration = (type, start, end) => {
    const $array = [];
    const current = new Date(start);
    end = new Date(end);
    while (current <= end) {
        $array.push(new Date(current));
        if (type == "hour") {//小时
            current.setHours(current.getHours() + 1);
        } else if (type == "day") {//天
            current.setDate(current.getDate() + 1);
        } else if (type == "week") {//周
            current.setDate(current.getDate() + 7);
        } else if (type == "month") {//月
            current.setMonth(current.getMonth() + 1);
        } else {//默认天
            current.setDate(current.getDate() + 1);
        }
    }
    return $array;
};

const obj2arr = (obj) => {
    const arr = [];
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        const item = {};
        item[key] = obj[key];
        arr.push(item);
    }
    return arr;
};


const findKey = (value, compare = (a, b) => a === b) => Object.keys(data).find(k => compare(data[k], value));


const removeRepeat = (arr) => {
    //key 为 name
    let repeatName = new Map();
    arr.forEach(v => !repeatName.has(v.name) ? repeatName.set(v.name, v) : repeatName.set(v.name, [repeatName.get(v.name), v]));
    //移除非重复的
    repeatName.forEach((value, key) => {
        if (!Array.isArray(value))
            repeatName.delete(key);
    });
    return repeatName;
};


const module1 = new Object({

    _count: 0, /// can be changed

    fun1: function () {
        //...
    },

    fun2: function () {
        //...
    }

});


const UtilsAugus = (() => {
    const _count = 0; /// private cannot be changed

    const countRepeat = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

    const getRepeatNum = (arr) => {
        return arr.reduce((prev, next) => {
            prev[next] = (prev[next] + 1) || 1;
            return prev;
        }, {});
    };

    const getRepeatNum2 = (arr) => {
        /// no use reduce
        const obj = {};
        let i = 0, l = arr.length;
        for (; i < l; i++) {
            const item = arr[i];
            obj[item] = (obj[item] + 1) || 1;
        }
        return obj;
    };


    const jsOpNum = () => {
        // 1.只保留整数部分（丢弃小数部分）
        parseInt(5.1234);// 5
        // 2.向下取整（<= 该数值的最大整数）和parseInt()一样
        Math.floor(5.1234);// 5
        // 3.向上取整（有小数，整数就+1）
        Math.ceil(5.1234);
        // 4.四舍五入（小数部分）
        Math.round(5.1234);// 5
        Math.round(5.6789);// 6
        // 5.绝对值
        Math.abs(-1);// 1
        // 6.返回两者中的较大值
        Math.max(1, 2);// 2
        // 7.返回两者中的较小值
        Math.min(1, 2);// 1
        // 随机数（0-1）
        Math.random();
        // 关于Math.floor()与parseInt()
        // 它们两个都是只保留整数部分,在转换时可能会出现不精确的情况
        // 临界点
        //  当有16位小数且最后一位小数为5时 取的值是该数值的最大整数
        Math.floor(5.9999999999999995);//5
        //  当有16位小数且最后一位小数为6时 取的值是该数值的最大整数+1
        Math.floor(5.9999999999999996);//6
        // 浮点数精度解决
        var sol1 = 1.01 + 1.1;//2.1100000000000003
        sol1.toFixed(2);// "2.11"
        //将计算结果调用toFixed(num)进行四舍五入并设置要保留的小数位数
        //toFixed()返回的是字符串 如要转成number 调用parseFloat
        parseFloat(sol1.toFixed(2));//2.11
    };


    const ReduceUsage = (() => {
        const sum = (arr) => {
            return arr.reduce((x, y) => x + y);
        };

        const mul = (arr) => {
            return arr.reduce((x, y) => x * y);
        };

        /// clean repeat
        const cleanRepeat = (arr) => {
            return arr.reduce((pre, cur) => {
                if (!pre.includes(cur)) {
                    return pre.concat(cur);
                } else {
                    return pre;
                }
            }, []);
        };

        /// dimensionality reduction
        const changeArr = (arr) => {
            return arr.reduce((pre, cur) => {
                return pre.concat(cur);
            }, []);
        };

        /// dimensionality Ascend
        const changeArr2 = (arr) => {
            return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? changeArr2(cur) : cur), []);
        };

        return {
            sum: sum,
            mul: mul,
            cleanRepeat: cleanRepeat,
            changeArr: changeArr,
            changeArr2: changeArr2,
        };
    });

    //组合
    const findCombination = (arr, size) => {
        const allResult = [];
        (function fnCore(arr, size, result) {
            const arrLen = arr.length;
            if (size > arrLen) {
                return;
            }
            if (size == arrLen) {
                allResult.push([].concat(result, arr));
            } else {
                for (let i = 0; i < arrLen; i++) {
                    const newResult = [].concat(result);
                    newResult.push(arr[i]);

                    if (size == 1) {
                        allResult.push(newResult);
                    } else {
                        const newArr = [].concat(arr);
                        newArr.splice(0, i + 1);
                        fnCore(newArr, size - 1, newResult);
                    }
                }
            }
        })(arr, size, []);
        return allResult;
    };

    return {
        countRepeat: countRepeat,
        getRepeatNum: getRepeatNum,
        getRepeatNum2: getRepeatNum2,
        ReduceUsage: ReduceUsage(),
        findCombination: findCombination,
    };

})();

/// 功能模块
const ModuleFacility = (() => {

    /// 获取可视窗口大小
    const view = () => {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        };
    };

    /// 获取已经滚动到元素的左边界或上边界的像素数
    const scroll = () => {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
    };

    const random = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };


    return {
        view: view,
        scroll: scroll,
        random: random,
    };

})();






