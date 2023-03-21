/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const readFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  return data;
};

const getParser = (type) => {
  switch (type) {
    case '.json':
      return JSON.parse;
    case '.yaml':
    case '.yml':
      return yaml.load;
    default:
      throw new Error(`Unknown file type: '${type}'!`);
  }
};

const parse = (filepath) => {
  // читаем файл
  const data = readFile(filepath);

  // узнаем расширение
  const type = path.extname(filepath);

  // берем функцию для чтения в зависимости от расширения файла
  const parser = getParser(type);

  return parser(data);
};

export default parse;
