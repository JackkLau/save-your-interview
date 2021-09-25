function compose(arr1, arr2) {
    const result = [];
    for (const item1 of arr1) {

        for (const item2 of arr2) {
            result.push(`${item1}${item2}`);
        }

    }

    return result;
}

export function execByRecursive(arr) {
    const length = arr.length;
    if (arr.length <= 2) {
        return compose(arr[length -2], arr[length -1]);
    }

    return compose(exec(length - 1), arr[length - 1])
}

export function exec(arr) {
    if (Array.isArray(arr)) {
        return arr.reduce((pre, cur) =>{
            return compose(pre, cur);
        })
    }
}


