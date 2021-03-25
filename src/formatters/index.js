import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  json: JSON.stringify,
  stylish: formatStylish,
  plain: formatPlain,
};

const formatObjDiff = (objDiff, type) => {
  if (formatters[type] === undefined) {
    throw new Error(`Unknown format "${type}"`);
  }
  return formatters[type](objDiff);
};

export default formatObjDiff;
