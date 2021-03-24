// - используются наши фикстуры из артефактов
// - фикстуры читаются до тестов
// - одонтипные кейсы прогонятся в each: https://jestjs.io/ru/docs/api#testeachtablename-fn-timeout
import { describe, it, expect } from '@jest/globals';

import { getFixturePath, getFixture } from './_utils.js';

import genDiff from '../index.js';

const formatsToTest = [
  'yml',
  'json',
];

const resultsToTest = {
  stylish: getFixture('result_stylish.txt'),
  plain: getFixture('result_plain.txt'),
  json: getFixture('result_json.json'),
};

describe('gendiff', () => {
  describe.each(formatsToTest)('для формата %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    it('результат по-умолчанию stylish', () => {
      expect(genDiff(filepath1, filepath2)).toEqual(resultsToTest.stylish);
    });

    it.each(Object.keys(resultsToTest))('результат %s', (resultKey) => {
      expect(genDiff(filepath1, filepath2, resultKey)).toEqual(resultsToTest[resultKey]);
    });
  });
});
