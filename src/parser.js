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

const parseAny = (data) => {
  const [, parsed] = Object.values(parsers).reduce(([isParsed, result], doParse) => {
    if (!isParsed) {
      try {
        return [true, doParse(data)];
      } catch {
        // continue regardless of error
      }
    }
    return [isParsed, result];
  }, [false, undefined]);

  return parsed;
};

const parse = (data, format = PARSER_FORMAT_ANY) => {
  if (parsers[format]) {
    return parsers[format](data);
  }
  if (format === PARSER_FORMAT_ANY) {
    const result = parseAny(data);
    if (result) {
      return result;
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
