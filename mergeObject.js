/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (hasOwn(source, key)) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function merge(target: Object): Object {
  const output = Object(target);
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    if (source !== undefined && source !== null) {
      let key;
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            console.log(key, "---");

            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output;
}