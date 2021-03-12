import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
};

const formatObjDiff = (objDiff, type = 'stylish') => {
  const format = formatters[type] ?? formatters.stylish;
  return format(objDiff);
};

export default formatObjDiff;
