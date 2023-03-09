/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import process from 'process';
import path from 'path';
import yaml from 'js-yaml';

const readFile = (file) => {
  const filepath = path.resolve(process.cwd(), file);
  const data = fs.readFileSync(filepath, 'utf8');
  return data;
};

const getFileExtension = (filepath) => {
  const extension = filepath.split('.').pop();
  return extension;
};

const parse = (filepath) => {
  // читаем файл
  const data = readFile(filepath);
  // узнаем расширение
  const extension = getFileExtension(filepath);

  // преобразуем в объект в зависимости от расширения
  let parsedData;
  if (extension === 'json') {
    parsedData = JSON.parse(data);
  } else if (extension === 'yml' && extension === 'yaml') {
    parsedData = yaml.load(data);
  }
  return parsedData;
};

export default parse;
