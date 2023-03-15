/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  return data;
};

const getFileExtension = (filepath) => {
  const extension = filepath.split('.');
  return extension[extension.length - 1];
};

const parse = (filepath) => {
  // читаем файл
  const data = readFile(filepath);
  // узнаем расширение
  const extension = getFileExtension(filepath);

  // преобразуем в объект в зависимости от расширения
  if (extension === 'yml' || extension === 'yaml') return yaml.load(data);
  return JSON.parse(data);
};

export default parse;
