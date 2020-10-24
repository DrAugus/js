const lv_method = (() => {

    //两数组元素是否完全一致
    //数组一  数组二    是否排除空洞元素     是否需完全一致
    const isSameArray = (Array_1, Array_2, bExcludeSpaceElement, bCompleteSame) => {
        if (!Array.isArray(Array_1) || !Array.isArray(Array_2))
            return false;

        bCompleteSame = Boolean(bCompleteSame);
        bExcludeSpaceElement = Boolean(bExcludeSpaceElement);

        var TempArray_1 = new Array();
        var TempArray_2 = new Array();

        for (var i = 0; i < Array_1.length; i++) {
            if (!bExcludeSpaceElement)
                TempArray_1[TempArray_1.length] = Array_1[i];
            else {
                if (Array_1[i] != undefined && Array_1[i] != null)
                    TempArray_1[TempArray_1.length] = Array_1[i];
            }
        }

        for (var i = 0; i < Array_2.length; i++) {
            if (!bExcludeSpaceElement)
                TempArray_2[TempArray_2.length] = Array_2[i];
            else {
                if (Array_2[i] != undefined && Array_2[i] != null)
                    TempArray_2[TempArray_2.length] = Array_2[i];
            }
        }

        if (bCompleteSame) {
            if (TempArray_1.length != TempArray_2.length)
                return false;

            for(var i in TempArray_1)
            {
                if(Array.isArray(TempArray_1[i]) && Array.isArray(TempArray_2[i]))
                {
                    if(!this.IsSameArray(TempArray_1[i], TempArray_2[i], bExcludeSpaceElement, bCompleteSame))
                        return false;
                }
                else if(!Array.isArray(TempArray_1[i]) && !Array.isArray(TempArray_2[i]))
                {
                    if(TempArray_1[i] != TempArray_2[i])
                        return false;
                }
                else
                    return false;
            }

            return true;
        } else {
            var bSame_1 = Array(TempArray_1.length).fill(false);
            var bSame_2 = Array(TempArray_2.length).fill(false);
            for (var i in TempArray_1) {
                for (var j in TempArray_2) {
                    if (bSame_2[j] == true) continue;
                    if(Array.isArray(TempArray_1[i]) && Array.isArray(TempArray_2[j]))
                    {
                        if(this.IsSameArray(TempArray_1[i], TempArray_2[j], bExcludeSpaceElement, bCompleteSame))
                        {
                            bSame_2[j] = true;
                            break;
                        }
                    }
                    else if(!Array.isArray(TempArray_1[i]) && !Array.isArray(TempArray_2[j]))
                    {
                        if(TempArray_1[i] == TempArray_2[j])
                        {
                            bSame_2[j] = true;
                            break;
                        }
                    } 

                }
            }

            for (var i in TempArray_2) {
                for (var j in TempArray_1) {
                    if (bSame_1[j] == true) continue;
                    if(Array.isArray(TempArray_2[i]) && Array.isArray(TempArray_1[j]))
                    {
                        if(this.IsSameArray(TempArray_2[i], TempArray_1[j], bExcludeSpaceElement, bCompleteSame))
                        {
                            bSame_1[j] = true;
                            break;
                        }
                    }
                    else if(!Array.isArray(TempArray_2[i]) && !Array.isArray(TempArray_1[j]))
                    {
                        if(TempArray_2[i] == TempArray_1[j])
                        {
                            bSame_1[j] = true;
                            break;
                        } 
                    }
                }
            }

            for (var i in bSame_1) {
                if (!bSame_1[i])
                    return false;
            }

            for (var i in bSame_2) {
                if (!bSame_1[i])
                    return false;
            }

            return true;

        }

    }

    return {
        isSameArray: isSameArray,
    };

})();
