import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  json: JSON.stringify,
  stylish: formatStylish,
  plain: formatPlain,
};

const formatObjDiff = (objDiff, type = 'stylish') => {
  const format = formatters[type] ?? formatters.stylish;
  return format(objDiff);
};

export default formatObjDiff;
