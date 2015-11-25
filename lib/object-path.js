function split(path) {
  return path.replace(/\[(\w+)\]/g, '.$1').split('.');
}

export function get(obj, path) {
  let pathElements = split(path);
  for (let i = 0, len = pathElements.length; i < len; i++) {
    let pathElement = pathElements[i];
    if (pathElement in obj) {
      obj = obj[pathElement];
    } else {
      return;
    }
  }
  return obj;
}

export function set(obj, path, value) {
  let pathElements = split(path);
  let lastIndex = pathElements.length - 1;
  pathElements.forEach((pathElement, index) => {
    if (index < lastIndex) {
      obj = obj[pathElement];
    } else {
      obj[pathElement] = value;
    }
  });
  return obj;
}
