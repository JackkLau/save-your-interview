class Compare {
  diff(target, origin) {
    const diffs = {
      targetVal: {},
      originVal: {}
    };

    const stackTarget = [{
      parent: diffs.targetVal,
      key: undefined,
      data: target
    }];
    const stackOrigin = [{
      parent: diffs.originVal,
      key: undefined,
      data:origin
    }];

    while (stackOrigin.length > 0 && stackTarget.length> 0) {
      const nodeTarget = stackTarget.pop();
      const nodeOrigin = stackOrigin.pop();

      const parentTarget = nodeTarget.parent;
      const keyTarget = nodeTarget.key;
      const dataTarget = nodeTarget.data;

      const parentOrigin = nodeOrigin.parent;
      const keyOrigin = nodeOrigin.key;
      const dataOrigin = nodeOrigin.data;

      let resTarget = parentTarget;
      let resOrigin = parentOrigin;
      if (typeof keyTarget !== 'undefined') {
        resTarget = parentTarget[keyTarget] = Array.isArray(dataTarget) ? [] : {};
      }
      if (typeof keyOrigin !== 'undefined') {
        resOrigin = parentOrigin[keyTarget] = Array.isArray(dataOrigin) ? [] : {};
      }

      for (const k in dataTarget) {
        if (dataTarget.hasOwnProperty(k)) {
          if (dataTarget[k] && typeof dataTarget[k] === 'object') {
            stackOrigin.push({
              parent: resOrigin,
              key: k,
              data:dataOrigin[k]
            });

            stackTarget.push({
              parent: resTarget,
              key: k,
              data:dataTarget[k]
            });
          } else if (dataOrigin[k] !== dataTarget[k]) {
            resTarget[k] = dataTarget[k];
            resOrigin[k] = dataOrigin[k];
          }
        }
      }
    }

    return diffs;
  }
}

const obj1 = {
  a: 1,
  b: 2,
  c: [
    {
      d: 22
    }
  ]
}

const obj2 = {
  a: 3,
  b: 2,
  c: [
    {
      d: 221
    }
  ]
}

const jsonDiff = new Compare();
const result = jsonDiff.diff(obj1, obj2);
console.log('result: >>', JSON.stringify(result));
