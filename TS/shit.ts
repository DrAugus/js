class First_Class {
    SimpleFunc(): void {
        console.log("THE FIRST CLASS")
    }
}

const obj = new First_Class();
obj.SimpleFunc();


const Str_WithType: string = 'Type String';
const Str_Simple = 'First String';
const Num_1 = 666;
const Num_2 = 13.14;
const Num_Total = Num_1 + Num_2;
console.log('String Print' + Str_Simple + '\nNumber Print '
    + Num_1 + ' ' + Num_2 + '\nTotal Num ' + Num_Total);


function _Choose(arr, size) {
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
}

function showChooseResult(result) {
    console.log('The number of result sets: ' + result.length);
    let i = 0, len = result.length;
    for (; i < len; i++) {
        console.log(result[i]);
    }
}


const Arr = [1, 3, 5, 7, 4, 32, 13, 74, 84, 4, 1, 13];
console.log(showChooseResult(_Choose(Arr, 2)));