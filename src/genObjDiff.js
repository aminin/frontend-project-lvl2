import _ from 'lodash';

export const TYPE_ADDED = 'added';
export const TYPE_DELETED = 'deleted';
export const TYPE_CHANGED = 'changed';
export const TYPE_UNCHANGED = 'unchanged';
export const TYPE_NESTED = 'nested';

const genObjDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return [key, { type: TYPE_ADDED, value2: obj2[key] }];
    }

    if (!_.has(obj2, key)) {
      return [key, { type: TYPE_DELETED, value1: obj1[key] }];
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return [key, { type: TYPE_NESTED, children: genObjDiff(obj1[key], obj2[key]) }];
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return [key, { type: TYPE_CHANGED, value1: obj1[key], value2: obj2[key] }];
    }

    return [key, { type: TYPE_UNCHANGED, value1: obj1[key], value2: obj2[key] }];
  });
};

export default genObjDiff;
