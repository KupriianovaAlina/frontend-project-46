import genDiff from './genDiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const buildDiff = (filepath1, filepath2, formatName) => {
  // читаем данные из файлов
  const parsedFile1 = parse(filepath1);
  const parsedFile2 = parse(filepath2);

  // строим дерево по этим данным
  const diff = genDiff(parsedFile1, parsedFile2);

  // форматируем наш результат
  return format(diff, formatName);
};

export default buildDiff;
