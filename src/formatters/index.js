import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

const formatObjDiff = (objDiff, type = 'stylish') => {
  const format = formatters[type] ?? formatters.stylish;
  return format(objDiff);
};

export default formatObjDiff;
