import _ from 'lodash';

export const TYPE_ADDED = 'added';
export const TYPE_DELETED = 'deleted';
export const TYPE_CHANGED = 'changed';
export const TYPE_UNCHANGED = 'unchanged';
export const TYPE_NODE = 'node';

const genObjDiff = (obj1, obj2) => {
  const objDiff = {};
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  for (const key of keys) {
    if (!_.has(obj1, key)) {
      objDiff[key] = {
        type: TYPE_ADDED,
        nuevo: obj2[key],
      };
    } else if (!_.has(obj2, key)) {
      objDiff[key] = {
        type: TYPE_DELETED,
        viejo: obj1[key],
      };
    } else if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      objDiff[key] = {
        type: TYPE_NODE,
        node: genObjDiff(obj1[key], obj2[key]),
      };
    } else if (!_.isEqual(obj1[key], obj2[key])) {
      objDiff[key] = {
        type: TYPE_CHANGED,
        viejo: obj1[key],
        nuevo: obj2[key],
      };
    } else {
      objDiff[key] = {
        type: TYPE_UNCHANGED,
        viejo: obj1[key],
        nuevo: obj2[key],
      };
    }
  }
  return objDiff;
};

export default genObjDiff;
