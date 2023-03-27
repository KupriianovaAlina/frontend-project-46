/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const readFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  return data;
};

const parsers = { json: JSON.parse, yaml: yaml.load, yml: yaml.load };

const getParser = (typeFile) => parsers[typeFile];

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
