import yaml from 'js-yaml';

const PARSER_FORMAT_JSON = 'json';
const PARSER_FORMAT_YAML = 'yaml';
const PARSER_FORMAT_ANY = 'any';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);
const parseAny = (data) => {
  const tryParse = ([isParsed, result], doParse) => {
    if (!isParsed) {
      try {
        return [true, doParse(data)];
      } catch {
        // continue regardless of error
      }
    }
    return [isParsed, result];
  };
  const [isSuccess, parsed] = [parseJson, parseYaml].reduce(tryParse, [false, undefined]);

  if (!isSuccess) {
    throw new Error('Can\'t parse given data');
  }

  return parsed;
};

const parsers = {
  [PARSER_FORMAT_YAML]: parseYaml,
  [PARSER_FORMAT_JSON]: parseJson,
  [PARSER_FORMAT_ANY]: parseAny,
};

const parse = (data, format = PARSER_FORMAT_ANY) => {
  if (parsers[format] === undefined) {
    throw new Error(`Unknown format "${format}"`);
  }

  return parsers[format](data);
};

export {
  parse,
  parseJson,
  parseYaml,
  parseAny,
  PARSER_FORMAT_ANY,
  PARSER_FORMAT_JSON,
  PARSER_FORMAT_YAML,
};
