exports.summary = (obj) => {
  const result = [];
  Object.entries(obj).forEach(([ key, value ]) =>
    result.push(`${ key } ${ value }`));
  return result;
};

exports.errors = (obj) => {
  const result = [];
  obj.forEach((element) => {
    element.status.forEach((status) => {
      status.actions.forEach((actions) => {
        result.push({
          id: status.description.id,
          type: status.type,
          error: actions.error.description,
        });
      });
    });
  });
  return result;
};
exports.errorResponse = (error) => {
  const data = error.substring(error.indexOf('"') + 1, error.lastIndexOf('"'));
  return data;
};

exports.convertEntities = (result) => {
  const obj = {};
  result.forEach(element => {
    if(!obj[element.type]) {
      obj[element.type] = [];
    }
    obj[element.type].push(element);
  });
  return obj;
};
