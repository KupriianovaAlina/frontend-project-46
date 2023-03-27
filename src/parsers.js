import yaml from 'js-yaml';

const parsers = { json: JSON.parse, yaml: yaml.load, yml: yaml.load };
const getParser = (data, typeFile) => parsers[typeFile](data);

export default getParser;
