import { describe, it, expect } from '@jest/globals';

import { stringify } from '../src/formatters/stylish.js';

describe('stringify', () => {
  it('выводит плоский объект', () => {
    expect(stringify({
      follow: false,
      host: 'hexlet.io',
    })).toBe(`
{
    follow: false
    host: hexlet.io
}
    `.trim());
  });

  it('выводит вложенный объект', () => {
    expect(stringify({
      follow: false,
      host: 'hexlet.io',
      nested: { some: 123 },
      arr: [3, 2],
    })).toBe(`
{
    follow: false
    host: hexlet.io
    nested: {
        some: 123
    }
    arr: [
        3
        2
    ]
}
    `.trim());
  });
});
