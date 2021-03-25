import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const parsers = {
  yml: parseYaml,
  yaml: parseYaml,
  json: parseJson,
};

const parse = (data, format) => {
  if (parsers[format] === undefined) {
    throw new Error(`Unknown format "${format}"`);
  }

  return parsers[format](data);
};

export default parse;
