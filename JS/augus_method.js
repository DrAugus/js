const module1 = new Object({

    _count: 0, /// can be changed

    fun1: function () {
        //...
    },

    fun2: function () {
        //...
    }

});

const self_method = (() => {
    const _count = 0; /// private cannot be changed

    const CountRepeatValue = (arr, value) => {
        let counts = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
        return (counts(arr, value));
    };

    const GetRepeatNum = (arr) => {
        /// no use reduce
        const obj = {};
        let i = 0, l = arr.length;
        for (; i < l; i++) {
            const item = arr[i];
            obj[item] = (obj[item] + 1) || 1;
        }
        return obj;
    };

    const GetRepeatNum2 = (arr) => {
        return arr.reduce((prev, next) => {
            prev[next] = (prev[next] + 1) || 1;
            return prev;
        }, {});
    };


    const reduce_apply = (() => {
        const sum = (arr) => {
            return arr.reduce((x, y) => x + y);
        };

        const mul = (arr) => {
            return arr.reduce((x, y) => x * y);
        };

        /// clean repeat
        const CleanRepeat = (arr) => {
            return arr.reduce((pre, cur) => {
                if (!pre.includes(cur)) {
                    return pre.concat(cur);
                } else {
                    return pre;
                }
            }, []);
        };

        /// dimensionality reduction
        const ChangeArr = (arr) => {
            return arr.reduce((pre, cur) => {
                return pre.concat(cur);
            }, []);
        };

        /// dimensionality Ascend
        const ChangeArr2 = (arr) => {
            return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? ChangeArr2(cur) : cur), []);
        };

        /// sum property in object
        const SumInObject = (obj) => {
            return obj.reduce(function (prev, cur) {
                return cur.score + prev;
            }, 0);
        };


        return {
            sum: sum,
            mul: mul,
            CleanRepeat: CleanRepeat,
            ChangeArr: ChangeArr,
            ChangeArr2: ChangeArr2,
            SumInObject: SumInObject,
        };
    });

    return {
        CountRepeatValue: CountRepeatValue,
        GetRepeatNum: GetRepeatNum,
        GetRepeatNum2: GetRepeatNum2,
        reduce_apply: reduce_apply(),
    };

})();

/// 功能模块
const facility_module = (() => {

    /// 阻止事件冒泡封装
    const stopBubble = (eve) => {
        if (event.stopPropagation) {
            eve.stopPropagation();
        } else {
            eve.cancelBubble = true;
        }
    };

    /// 事件委托的封装
    const eveEnt = (child, cb) => {
        return function (eve) {
            let e = eve || window.eveEnt;
            let targetEle = e.target || e.srcElement;
            for (let i = 0; i < child.length; i++) {
                if (child[i] == targetEle) {
                    cb.call(targetEle)();
                }
            }
        };
    };

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

    /// event兼容
    const eve = {
        getEvent: function (event) {
            return event || window.event;
        }
    };

    const random = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    };

    /// 获取行内样式的兼容
    const getStyle = (ele, attr) => {
        if (ele.currentStyle) {
            return currentStyle[attr];
        } else {
            return getComputedStyle(ele, false)[attr];
        }
    };

    return {
        stopBubble: stopBubble,
        eveEnt: eveEnt,
        view: view,
        scroll: scroll,
        eve: eve,
        random: random,
        getStyle: getStyle,
    };

})();


const common_part = (() => {

    var enDescend = 0;
    var enAscend = 1;
    var enColor = 2;

    const GetCardColor = (cbCardData) => {
        return (cbCardData) & 0xf0;
    };

    const GetCardValue = (cbCardData) => {
        return cbCardData & 0x0f;
    };

    const isValidCard = (cbCardData) => {
        var valid = true
        if (GetCardColor(cbCardData) < 0 || GetCardColor(cbCardData) > 0x40) valid = false
        if (GetCardValue(cbCardData) < 1 || GetCardValue(cbCardData) > 0x0f) valid = false
        return valid
    };

    const _IsPrimaryCard = (cbCardData, cbPrimaryColor) => {
        var valid = isValidCard(cbCardData)
        if (!valid) return false
        var bIsPrimary = defaultPrimaryCard(cbCardData)
        if (GetCardColor(cbCardData) == cbPrimaryColor) bIsPrimary = true;
        return bIsPrimary;
    };

    const defaultPrimaryCard = (cbCardData) => {
        /// 公务员：大王、小王，黑桃A、主2、6个副2；
        var bIsPrimary = false;
        if (GetCardColor(cbCardData) == 0x40) bIsPrimary = true;
        if (cbCardData == 0x31) bIsPrimary = true
        if (GetCardValue(cbCardData) == 0x02) bIsPrimary = true;
        return bIsPrimary;
    };

    const GetCardLogicValue = (cbCardData) => {
        //扑克属性
        var cbCardColor = (cbCardData) & 0xf0;
        var cbCardValue = (cbCardData) & 0x0f;

        if (cbCardColor == 0x40) return cbCardValue + 3;
        else if (cbCardValue == 7) return 16;

        return (cbCardValue <= 2) ? (cbCardValue + 13) : cbCardValue;

    };

    const SortCardByColor = (cbCardData, cbCardCount, specificColor = null) => {
        SortCardList(cbCardData, cbCardCount, enColor);

        var primary5Data = []
        var primaryJokerData = []
        var primaryAceData = []
        var primary2Data = [] /// dont forget fix
        var primaryDragonData = []
        var primaryData = []

        /// 公务员：(主5) 大王、小王，黑桃A、主2、6个副2；
        for (var index in cbCardData) {
            if (_IsPrimaryCard(cbCardData[index], specificColor)) {
                if (GetCardValue(cbCardData[index]) == 0x05) primary5Data.push(cbCardData[index])
                else if (GetCardColor(cbCardData[index]) == 0x40) primaryJokerData.push(cbCardData[index])
                else if (cbCardData[index] == 0x31) primaryAceData.push(cbCardData[index])
                else if (GetCardValue(cbCardData[index]) == 0x02) primary2Data.push(cbCardData[index])
                else primaryData.push(cbCardData[index])

                cbCardData[index] = 0
            }
        }

        var fixPrimary2Data = []
        for (var indexFix in primary2Data) {
            if (GetCardColor(primary2Data[indexFix]) == specificColor) {
                fixPrimary2Data.push(primary2Data[indexFix])
                primary2Data[indexFix] = 0
            }
        }
        for (var data of primary2Data) {
            if (data) fixPrimary2Data.push(data)
        }


        var otherData = []
        for (var dataSource of cbCardData) {
            if (dataSource) otherData.push(dataSource)
        }

        var res = []
        res = res.concat(primary5Data, primaryJokerData, primaryAceData, fixPrimary2Data, primaryDragonData, primaryData, otherData)
        console.warn('SortCardByColor')
        var str = ''
        for (var d of res)
            str += ' 0x' + d.toString(16)
        console.warn(str)
    };


    const SortCardList = (cbCardData, cbCardCount, SortType) => {
        switch (SortType) {
            case 0:
                console.log('Des');
                cbCardData.sort(function (a, b) {
                    if (GetCardLogicValue(a) > GetCardLogicValue(b))
                        return -1;
                    else if (GetCardLogicValue(a) < GetCardLogicValue(b))
                        return 1;
                    else {
                        if (a > b) return -1;
                        else if (a < b) return 1;
                    }
                    return 0;
                });
                break;
            case 1:
                console.log('Asc');
                cbCardData.sort(function (a, b) {
                    if (GetCardLogicValue(a) > GetCardLogicValue(b))
                        return 1;
                    else if (GetCardLogicValue(a) < GetCardLogicValue(b))
                        return -1;
                    else {
                        if (a > b) return 1;
                        else if (a < b) return -1;
                    }
                    return 0;
                });
                break;
            case 2:
                console.log('ColorDes');
                cbCardData.sort(function (a, b) {
                    if (GetCardColor(a) > GetCardColor(b))
                        return -1;
                    else if (GetCardColor(a) < GetCardColor(b))
                        return 1;
                    else {
                        if (GetCardLogicValue(a) > GetCardLogicValue(b)) return -1;
                        else if (GetCardLogicValue(a) < GetCardLogicValue(b)) return 1;
                    }
                    return 0;
                });
                break;
        }
    };

    return {
        SortCardList: SortCardList,
        SortCardByColor: SortCardByColor,
    };

})();

const poker_module = (() => {
})();

const mahjong_module = (() => {
})();
　　

