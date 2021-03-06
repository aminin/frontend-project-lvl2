import { describe, it, expect } from '@jest/globals';

import genDiff from '../src/genDiff.js';

import getFixturePath from './getFixturePath';

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
});
