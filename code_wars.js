/// 6 kyu Shortest Path in Perfect City
function perfectCity(departure, destination) {

    if (departure[0] > destination[0]) {
        const temp = destination;
        destination = departure;
        departure = temp;
    }

    //// 小数部分
    let fractional_ax = departure[0] % 1,
        fractional_ay = departure[1] % 1,
        fractional_bx = destination[0] % 1,
        fractional_by = destination[1] % 1;
    /// 整数部分
    let ax = Math.trunc(departure[0]),
        ay = Math.trunc(departure[1]),
        bx = Math.trunc(destination[0]),
        by = Math.trunc(destination[1]);

    // //// 一定要矫正浮点数

    /// 比较 destination x 左右两端直线的距离
    let distance_bx_left = fractional_bx,
        distance_bx_right = rectifyFractionalMinus(rectifyFractional(bx + 1), rectifyFractional(destination[0]));
    ///矫正
    if (distance_bx_right === 1) distance_bx_right = 0;

    let distance_ax_left = fractional_ax,
        distance_ax_right = rectifyFractionalMinus(rectifyFractional(ax + 1), rectifyFractional(departure[0]));
    ///矫正
    if (distance_ax_right === 1) distance_ax_right = 0;

    //// destination y
    let distance_by_down = fractional_by,
        distance_by_up = rectifyFractionalMinus(rectifyFractional(by + 1), rectifyFractional(destination[1]));
    ///矫正
    if (distance_by_up === 1) distance_by_up = 0;

    let distance_ay_down = fractional_ay,
        distance_ay_up = rectifyFractionalMinus(rectifyFractional(ay + 1), rectifyFractional(departure[1]));
    ///矫正
    if (distance_ay_up === 1) distance_ay_up = 0;


    let dis_add_x = 0,
        dis_add_y = 0;
    // let dis_x = rectifyFractionalMinus(rectifyFractional(destination[0]), rectifyFractional(departure[0])),
    //     dis_y = rectifyFractionalMinus(rectifyFractional(destination[1]), rectifyFractional(departure[1]));
    let dis_x = destination[0] - departure[0],
        dis_y = destination[1] - departure[1];

    // if (distance_ax_left > distance_ax_right) {
    //     //// no handle
    // } else {
    //     dis_add_x += distance_ax_left;
    // }

    if (distance_bx_left < distance_bx_right) {
        /// no handle
    } else {
        dis_add_x += distance_bx_right;
    }

    // if (distance_ay_up > distance_ay_down) {
    //     //// no handle
    // } else {
    //     dis_add_y += distance_ay_up;
    // }

    if (distance_by_up < distance_by_down) {
        //// no handle
    } else {
        dis_add_y += distance_by_down;
    }


    let res = dis_x + dis_add_x + dis_y + dis_add_y;


    alert(res);

    return '' + res;

}

function rectifyFractional(num) {
    /// 只需要十倍操作
    return (num * 10) / 1e1;
}

function rectifyFractionalMinus(a, b) {
    /// 只需要十倍操作
    return (a * 10 - b * 10) / 1e1;
}


/// 取小数部分 或者直接 模
function fractional(num) {
    return num - Math.trunc(num);
}


var log = perfectCity([0.4, 1], [0.9, 3]);
console.log(log);

//// 怎么解决精度问题？
///// 将数字转化为整数
function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}


function test0825() {
    var arr = [0x01, 0x02, 0x32, 0x12, 0x24, 0x45, 0x06, 0x07];
    arr.sort(function (a, b) {
        return (GetCardLogicValue(b) - GetCardLogicValue(a)) || ((b - a) && (GetCardLogicValue(b) == GetCardLogicValue(a)));
    });

    return arr;
}

console.log(test0825());

function GetCardLogicValue(cbCardData) {
    //扑克属性
    var cbCardColor = (cbCardData) & 0xf0;
    var cbCardValue = (cbCardData) & 0x0f;


    return cbCardValue;
}




