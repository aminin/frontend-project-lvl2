import fs from 'fs';
import path from 'path';

import { parse } from './parser.js';
import genObjDiff from './genObjDiff.js';
import formatObjDiff from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));

const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  const obj1 = parse(readFile(filepath1));
  const obj2 = parse(readFile(filepath2));

  const objDiff = genObjDiff(obj1, obj2);

  return formatObjDiff(objDiff, formatterName);
};

export default genDiff;
