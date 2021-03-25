import fs from 'fs';
import path from 'path';

import parse from './parser.js';
import genObjDiff from './genObjDiff.js';
import formatObjDiff from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));
const getFormat = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, formatterName = 'stylish') => {
  const obj1 = parse(readFile(filePath1), getFormat(filePath1));
  const obj2 = parse(readFile(filePath2), getFormat(filePath2));

  const objDiff = genObjDiff(obj1, obj2);

  return formatObjDiff(objDiff, formatterName);
};

export default genDiff;
