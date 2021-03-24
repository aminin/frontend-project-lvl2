import _ from 'lodash';
import {
  TYPE_ADDED, TYPE_CHANGED, TYPE_DELETED, TYPE_UNCHANGED, TYPE_NESTED,
} from '../genObjDiff.js';

const tab = '    ';

const wrap = (items, bra, ket, indent) => (
  [bra, ...[...items, ket].map((item) => `${indent}${item}`)].join('\n')
);

export const stringify = (value, depth = 0) => {
  const indent = tab.repeat(depth);
  if (_.isArray(value)) {
    return wrap(value.map((v) => `${tab}${stringify(v, depth + 1)}`), '[', ']', indent);
  }

  if (_.isPlainObject(value)) {
    return wrap(
      Object.entries(value).map(([k, v]) => `${tab}${k}: ${stringify(v, depth + 1)}`), '{', '}', indent,
    );
  }

  return String(value);
};

const diffByKeyType = {
  [TYPE_ADDED]: ({ key, value2 }, depth = 0) => ([
    `  + ${key}: ${stringify(value2, depth + 1)}`,
  ]),
  [TYPE_DELETED]: ({ key, value1 }, depth = 0) => ([
    `  - ${key}: ${stringify(value1, depth + 1)}`,
  ]),
  [TYPE_CHANGED]: ({ key, value1, value2 }, depth = 0) => ([
    `  - ${key}: ${stringify(value1, depth + 1)}`,
    `  + ${key}: ${stringify(value2, depth + 1)}`,
  ]),
  [TYPE_UNCHANGED]: ({ key, value1 }, depth = 0) => ([
    `    ${key}: ${stringify(value1, depth + 1)}`,
  ]),
  [TYPE_NESTED]: ({ key, children }, depth, iter) => ([
    `    ${key}: ${iter(children, depth + 1)}`,
  ]),
};

const formatStylish = (objDiff) => {
  const iter = (diff, depth = 0) => (
    wrap(diff.map(([key, {
      type, value1, value2, children,
    }]) => (
      diffByKeyType[type]({
        key, value1, value2, children,
      }, depth, iter)
    )).flat(), '{', '}', tab.repeat(depth))
  );
  return iter(objDiff);
};

export default formatStylish;
