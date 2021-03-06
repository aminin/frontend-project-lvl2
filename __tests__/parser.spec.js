import { describe, it, expect } from '@jest/globals';

import * as parser from '../src/parser.js';

describe('parser', () => {
  const fooBarObj = { foo: 'bar' };
  const fooBarYaml = 'foo: bar';
  const fooBarJson = '{"foo": "bar"}';

  describe('isYaml', () => {
    it('определяет yaml как yaml', () => {
      expect(parser.isYaml(fooBarYaml)).toBeTruthy();
    });
    it('определяет json как yaml (это особенность yaml)', () => {
      expect(parser.isYaml(fooBarJson)).toBeTruthy();
    });
  });

  describe('isJson', () => {
    it('определяет json как json', () => {
      expect(parser.isJson(fooBarJson)).toBeTruthy();
    });
    it('не определяет yaml как json', () => {
      expect(parser.isJson(fooBarYaml)).toBeFalsy();
    });
  });

  describe('parseJson', () => {
    it('читает json', () => {
      expect(parser.parseJson(fooBarJson)).toMatchObject(fooBarObj);
    });
  });

  describe('parseYaml', () => {
    it('читает yaml', () => {
      expect(parser.parseYaml(fooBarYaml)).toMatchObject(fooBarObj);
    });
  });

  describe('parse', () => {
    it('читает yaml', () => {
      expect(parser.parse(fooBarYaml)).toMatchObject(fooBarObj);
    });

    it('читает json', () => {
      expect(parser.parse(fooBarJson)).toMatchObject(fooBarObj);
    });

    describe('с указанным форматом', () => {
      it('читает yaml', () => {
        expect(parser.parse(fooBarYaml, 'yaml')).toMatchObject(fooBarObj);
      });
      it('читает json', () => {
        expect(parser.parse(fooBarJson, 'json')).toMatchObject(fooBarObj);
      });
      it('читает json если формат yaml (это особенность yaml)', () => {
        expect(() => parser.parse(fooBarJson, 'yaml')).not.toThrowError();
      });
      it('не читает yaml если формат json', () => {
        expect(() => parser.parse(fooBarYaml, 'json')).toThrowError();
      });
    });
  });
});
