function newOperation(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw new Error('constructor must be a function.')
    }

    const o = {};
    o.__proto__ = constructor.prototype;
    // const args = Array.from(arguments);
    const returnValue = constructor.apply(o, args);
    const isObject = typeof returnValue === 'object' && returnValue;
    const isFunction = typeof returnValue === 'function';
    return (isObject ||isFunction) ? returnValue : o;
}

export default newOperation
