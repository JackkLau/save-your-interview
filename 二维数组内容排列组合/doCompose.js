// 执行组合排列的函数
export function doExchange(arr) {
    const len = arr.length;
    // 当数组大于等于2个的时候
    if (len >= 2) {
        // 第一个数组的长度
        const len1 = arr[0].length;
        // 第二个数组的长度
        const len2 = arr[1].length;
        // 2个数组产生的组合数
        const lenBoth = len1 * len2;
        //  申明一个新数组,做数据暂存
        const items = new Array(lenBoth);
        // 申明新数组的索引
        let index = 0;
        // 2层嵌套循环,将组合放到新数组中
        for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
                items[index] = arr[0][i] + "|" + arr[1][j];
                index++;
            }
        }
        // 将新组合的数组并到原数组中
        let newArr = new Array(len - 1);
        for (let i = 2; i < arr.length; i++) {
            newArr[i - 1] = arr[i];
        }
        newArr[0] = items;
        // 执行回调
        return doExchange(newArr);
    } else {
        return arr[0];
    }
}
