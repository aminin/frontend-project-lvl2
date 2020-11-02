import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));

const diffByState = {
  added: ({ key, nuevo }) => ([
    `  + ${key}: ${nuevo}`
  ]),
  deleted: ({ key, viejo }) => ([
    `  - ${key}: ${viejo}`
  ]),
  changed: ({ key, viejo, nuevo }) => ([
    `  - ${key}: ${viejo}`,
    `  + ${key}: ${nuevo}`,
  ]),
  unchanged: ({ key, viejo }) => ([
    `    ${key}: ${viejo}`
  ]),
};

const objDiffToString = (objDiff) => (
  ['{', ...Object.entries(objDiff).map(([key, { state, viejo, nuevo }]) => (
    diffByState[state]({ key, viejo, nuevo })
  )).flat(), '}'].join('\n')
);

export const genObjDiff = (obj1, obj2) => {
  const objDiff = {};
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  for (const key of keys) {
    if (!_.has(obj1, key)) {
      objDiff[key] = {
        state: 'added',
        nuevo: obj2[key],
      };
    } else if (!_.has(obj2, key)) {
      objDiff[key] = {
        state: 'deleted',
        viejo: obj1[key],
      };
    } else if (obj1[key] !== obj2[key]) {
      objDiff[key] = {
        state: 'changed',
        viejo: obj1[key],
        nuevo: obj2[key],
      };
    } else {
      objDiff[key] = {
        state: 'unchanged',
        viejo: obj1[key],
        nuevo: obj2[key],
      };
    }
  }

  return objDiff;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFile(filepath1));
  const obj2 = JSON.parse(readFile(filepath2));
  return objDiffToString(genObjDiff(obj1, obj2));
};

export default genDiff;
