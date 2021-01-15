let isExitWind = (start: number) => {
    let countNull = 0
    let resObj = {
        0: false,
        1: new Array<number>(),
    }
    return resObj
}

let a = isExitWind(2)
console.log('test ts----', a)


const test1023 = () => {
    let indexWind = [3, 4, 0];
    let cnt = indexWind[0] + indexWind[1] + indexWind[2] + indexWind[3]
    // if (cnt == 0) continue
    // if (cnt + magicCnt < 3) continue
    let kindCnt = 0;
    indexWind.forEach(c => {
        if (c > 0) kindCnt++
    });
    console.log('kindCnt', kindCnt)
}

let b = test1023();
console.log('fafafaf', b);
