import _ from 'lodash';

export const TYPE_ADDED = 'added';
export const TYPE_DELETED = 'deleted';
export const TYPE_CHANGED = 'changed';
export const TYPE_UNCHANGED = 'unchanged';
export const TYPE_NODE = 'node';

const genObjDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return Object.fromEntries(keys.map((key) => {
    if (!_.has(obj1, key)) {
      return [key, { type: TYPE_ADDED, nuevo: obj2[key] }];
    }

    if (!_.has(obj2, key)) {
      return [key, { type: TYPE_DELETED, viejo: obj1[key] }];
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return [key, { type: TYPE_NODE, node: genObjDiff(obj1[key], obj2[key]) }];
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return [key, { type: TYPE_CHANGED, viejo: obj1[key], nuevo: obj2[key] }];
    }

    return [key, { type: TYPE_UNCHANGED, viejo: obj1[key], nuevo: obj2[key] }];
  }));
};

export default genObjDiff;
