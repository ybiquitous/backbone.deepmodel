function get(obj, path) {
  path = path.replace(/\[(\w+)\]/g, '.$1');
  for (let pathElement of path.split('.')) {
    if (pathElement in obj) {
      obj = obj[pathElement];
    } else {
      return obj;
    }
  }
  return obj;
}

export {get};
