export function composeNewArray(arr) {
    const length = arr.length;
    if (length >= 2) {
        const len1 = arr[0].length;
        const len2 = arr[1].length;
        const bothLen = len1 * len2;
        const items = new Array(bothLen);
        let index = 0;

        for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
                if (Array.isArray(arr[0][i])) {
                    items[index] = arr[0][i].concat(arr[1][j]);
                } else {
                    items[index] = [arr[0][i]].concat(arr[1][j]);
                }

                index++;
            }
        }

        const newArray = new Array(length - 1);
        for (let i = 2; i < length; i++) {
            newArray[i -1] = arr[i];
        }

        newArray[0] = items;

        return composeNewArray(newArray);
    } else {
        return arr[0];
    }
}
