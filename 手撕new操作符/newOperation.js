function newOperation(contructor, ...rest) {
    const o = new Object();
    o.__proto__ = contructor.prototype;
    const returnValue = contructor.apply(this, rest);
    return typeof returnValue !== 'object' ? o: returnValue;
}

export default newOperation