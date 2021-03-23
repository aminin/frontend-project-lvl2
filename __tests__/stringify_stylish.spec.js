import { describe, it, expect } from '@jest/globals';

import { stringify } from '../src/formatters/stylish.js';
import { getFixture } from './_utils';

describe('stringify stylish', () => {
  it('выводит плоский объект', () => {
    expect(stringify({
      follow: false,
      host: 'hexlet.io',
    })).toBe(getFixture('stringify-flat-result.txt'));
  });

  it('выводит вложенный объект', () => {
    expect(stringify({
      follow: false,
      host: 'hexlet.io',
      nested: { some: 123 },
      arr: [3, 2],
    })).toBe(getFixture('stringify-tree-result.txt'));
  });
});
