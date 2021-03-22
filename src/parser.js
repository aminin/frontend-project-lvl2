import yaml from 'js-yaml';

const PARSER_FORMAT_JSON = 'json';
const PARSER_FORMAT_YAML = 'yaml';
const PARSER_FORMAT_ANY = 'any';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const parsers = {
  [PARSER_FORMAT_YAML]: parseYaml,
  [PARSER_FORMAT_JSON]: parseJson,
};

const parse = (data, format = PARSER_FORMAT_ANY) => {
  if (parsers[format]) {
    return parsers[format](data);
  }
  if (format === PARSER_FORMAT_ANY) {
    // eslint-disable-next-line no-restricted-syntax
    for (const doParse of Object.values(parsers)) {
      try {
        return doParse(data);
      } catch {
        // continue regardless of error
      }
    }
  }
  throw new Error("Can't parse given data");
};

const isDataFormat = (data, format) => {
  if (parsers[format] === undefined) {
    throw new Error(`Unknown format "${format}"`);
  }
  try {
    parse(data, format);
  } catch (e) {
    return false;
  }
  return true;
};

const isJson = (data) => isDataFormat(data, PARSER_FORMAT_JSON);
const isYaml = (data) => isDataFormat(data, PARSER_FORMAT_YAML);

export {
  parse,
  parseJson,
  parseYaml,
  isJson,
  isYaml,
  PARSER_FORMAT_ANY,
  PARSER_FORMAT_JSON,
  PARSER_FORMAT_YAML,
};
