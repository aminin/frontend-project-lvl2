import { describe, it, expect } from '@jest/globals';

import genDiff from '../src/genDiff.js';

import { getFixturePath, getFixture } from './_utils.js';

describe('genDiff', () => {
  it('сравнивает плоские json-файлы', () => {
    expect(genDiff(
      getFixturePath('step3-file1.json'),
      getFixturePath('step3-file2.json'),
    )).toBe(getFixture('step3-result.txt').trim());
  });

  it('сравнивает плоские yaml-файлы', () => {
    expect(genDiff(
      getFixturePath('step5-file1.yaml'),
      getFixturePath('step5-file2.yaml'),
    )).toBe(getFixture('step3-result.txt').trim());
  });

  it('сравнивает вложенные json-файлы', () => {
    expect(genDiff(
      getFixturePath('step6-file1.json'),
      getFixturePath('step6-file2.json'),
    )).toBe(getFixture('step6-result.txt').trim());
  });

  describe('сравнивает вложенные yaml-файлы', () => {
    it('в формате stylish', () => {
      expect(genDiff(
          getFixturePath('step6-file1.yaml'),
          getFixturePath('step6-file2.yaml'),
      )).toBe(getFixture('step6-result.txt').trim());
    });
    it('в формате plain', () => {
      expect(genDiff(
          getFixturePath('step6-file1.yaml'),
          getFixturePath('step6-file2.yaml'),
          'plain',
      )).toBe(getFixture('step7-result.txt').trim());
    });
  });
});
