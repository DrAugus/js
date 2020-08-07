/// 6 kyu Shortest Path in Perfect City
function perfectCity(departure, destination) {
    //your code here
    const a = departure[1] - departure[0],
        b = destination[1] - destination[0];

    //// 小数部分
    const fractional_ax = departure[0] % 1,
        fractional_ay = departure[1] % 1,
        fractional_bx = destination[0] % 1,
        fractional_by = destination[1] % 1;
    /// 整数部分
    const ax = Math.trunc(departure[0]),
        ay = Math.trunc(departure[1]),
        bx = Math.trunc(destination[0]),
        by = Math.trunc(destination[1]);

    /// 比较 destination x 左右两端直线的距离
    const distance_bx_left = fractional_bx,
        distance_bx_right = bx + 1 - destination[0];

    const distance_ax_left = fractional_ax,
        distance_ax_right = ax + 1 - destination[0];

    if (distance_ax_left < distance_ax_right) {
        //// no handle
    } else {

    }


    let dis_add_x = 0;
    const dis_x = 0;

    if (distance_bx_left < distance_bx_right) {
        /// no handle
    } else {
        dis_add_x = distance_bx_right;
    }


    return b + a;

}


/// 取小数部分 或者直接 模
function fractional(num) {
    return num - Math.trunc(num);
}


var log = perfectCity([0.4, 1], [0.9, 3]);
console.log(log);