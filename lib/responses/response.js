exports.summary = (obj) => {
  const result = [];
  Object.entries(obj).forEach(([key, value]) =>
    result.push(`${key} ${value}`));
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
          error: actions.error.description
        });
      });
    });
  });
  return result;
};

exports.attributeFail = (array) => {
  const result = [];
  array.forEach((element) => {
    console.log(element);
  });
};
