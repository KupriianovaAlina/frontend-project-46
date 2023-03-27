import path from 'path';
import * as fs from 'fs';
import genDiff from './genDiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getTypeFile = (pathFile) => path.extname(pathFile).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), getTypeFile(filepath));
const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const buildDiff = (filepath1, filepath2, formatName) => {
  // читаем данные из файлов
  const parsedFile1 = getData(buildFullPath(filepath1));
  const parsedFile2 = getData(buildFullPath(filepath2));

  // строим дерево по этим данным
  const diff = genDiff(parsedFile1, parsedFile2);

  // форматируем наш результат
  return format(diff, formatName);
};

export default buildDiff;
