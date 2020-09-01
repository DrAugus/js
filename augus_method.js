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

const common_part = (() => {

    const GetCardColor = (cbCardData) => {
        return (cbCardData) & 0xf0;
    };

    const GetCardLogicValue = (cbCardData) => {
        //扑克属性
        var cbCardColor = (cbCardData) & 0xf0;
        var cbCardValue = (cbCardData) & 0x0f;

        if (cbCardColor == 0x40) return cbCardValue + 2;

        return (cbCardValue <= 2) ? (cbCardValue + 13) : cbCardValue;

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
    };

})();

const poker_module = (() => {
})();
　　


