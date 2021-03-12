import _ from 'lodash';
import {
  TYPE_ADDED, TYPE_CHANGED, TYPE_DELETED, TYPE_UNCHANGED, TYPE_NODE,
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
  [TYPE_ADDED]: ({ key, nuevo }, depth = 0) => ([
    `  + ${key}: ${stringify(nuevo, depth + 1)}`,
  ]),
  [TYPE_DELETED]: ({ key, viejo }, depth = 0) => ([
    `  - ${key}: ${stringify(viejo, depth + 1)}`,
  ]),
  [TYPE_CHANGED]: ({ key, viejo, nuevo }, depth = 0) => ([
    `  - ${key}: ${stringify(viejo, depth + 1)}`,
    `  + ${key}: ${stringify(nuevo, depth + 1)}`,
  ]),
  [TYPE_UNCHANGED]: ({ key, viejo }, depth = 0) => ([
    `    ${key}: ${stringify(viejo, depth + 1)}`,
  ]),
  [TYPE_NODE]: ({ key, node }, depth, iter) => ([
    `    ${key}: ${iter(node, depth + 1)}`,
  ]),
};

const formatStylish = (objDiff) => {
  const iter = (diff, depth = 0) => (
    wrap(Object.entries(diff).map(([key, {
      type, viejo, nuevo, node,
    }]) => (
      diffByKeyType[type]({
        key, viejo, nuevo, node,
      }, depth, iter)
    )).flat(), '{', '}', tab.repeat(depth))
  );
  return iter(objDiff);
};

export default formatStylish;
