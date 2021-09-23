![面试图片](./interview.jpg)

你是否有过这样的经历：
面试官：你知道js中new操作符具体做了哪些事情么？
我：...
面试官：你能自己实现一个new操作符么？
我：...
现在让咱们一起治愈面试尴尬症。

### 简化的new操作符
要说new操作符中做了什么，就不得不说一下js中的三个属性——constructor、prototype、实例内部的[[prototype]]指针——三者之间的关系，即：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。了解了这三者之间的关系后，
我们就不难理解new操作符所要实现的目，对应简化后的实现步骤如下所示：
1. 在内存中创建一个新对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）。
4. 执行构造函数内部的代码（给新对象添加属性）。
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

对应以上步骤，具体代码实现如下所示：
```js
function newOperation(constructor) {
    const o = new Object();
    o.__proto__ = constructor.prototype;
    const args = Array.from(arguments);
    const returnValue = constructor.apply(o, args.slice(1));
    return typeof returnValue !== 'object' ? o: returnValue;
}
```

### ECMAScript规范中new操作符的定义


