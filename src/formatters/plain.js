import _ from 'lodash';
import {
  TYPE_ADDED, TYPE_CHANGED, TYPE_DELETED, TYPE_UNCHANGED, TYPE_NODE,
} from '../genObjDiff.js';

const getFQPN = (key, parents = []) => [...parents, key].join('.');

export const stringify = (value) => {
  if (_.isObject(value) || _.isArray()) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return String(value);
};

const diffByKeyType = {
  [TYPE_ADDED]: ({ key, nuevo }, parents = []) => ([
    `Property '${getFQPN(key, parents)}' was added with value: ${stringify(nuevo)}`,
  ]),
  [TYPE_DELETED]: ({ key }, parents = []) => ([
    `Property '${getFQPN(key, parents)}' was removed`,
  ]),
  [TYPE_CHANGED]: ({ key, viejo, nuevo }, parents = []) => ([
    `Property '${getFQPN(key, parents)}' was updated. From ${stringify(viejo)} to ${stringify(nuevo)}`,
  ]),
  [TYPE_UNCHANGED]: () => [],
  [TYPE_NODE]: ({ key, node }, parents, iter) => ([
    iter(node, [...parents, key]),
  ]),
};

const formatPlain = (objDiff) => {
  const iter = (diff, parents = []) => (
    Object.entries(diff).map(([key, {
      type, viejo, nuevo, node,
    }]) => (
      diffByKeyType[type]({
        key, viejo, nuevo, node,
      }, parents, iter)
    )).flat().join('\n')
  );
  return iter(objDiff);
};

export default formatPlain;
