import { describe, it, expect } from '@jest/globals';

import genDiff from '../src/genDiff.js';

import { getFixturePath, getFixture } from './_utils.js';

describe('genDiff', () => {
  it('сравнивает плоские json-файлы', () => {
    expect(genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    )).toBe(`
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
    `.trim());
  });

  it('сравнивает плоские yaml-файлы', () => {
    expect(genDiff(
      getFixturePath('file1.yaml'),
      getFixturePath('file2.yaml'),
    )).toBe(`
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
    `.trim());
  });

  it('сравнивает вложенные json-файлы', () => {
    expect(genDiff(
      getFixturePath('step6-file1.json'),
      getFixturePath('step6-file2.json'),
    )).toBe(getFixture('step6-result.txt').toString().trim());
  });

  it('сравнивает вложенные yaml-файлы', () => {
    expect(genDiff(
      getFixturePath('step6-file1.yaml'),
      getFixturePath('step6-file2.yaml'),
    )).toBe(getFixture('step6-result.txt').toString().trim());
  });
});
