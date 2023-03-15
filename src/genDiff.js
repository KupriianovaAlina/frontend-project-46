import _ from 'lodash';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const genDiff = (filepath1, filepath2, formatName) => {
  // здесь читаем значения из файлов
  const parsedFile1 = parse(filepath1);
  const parsedFile2 = parse(filepath2);

  const bulidDiff = (object1, object2) => {
    const keys = Object.keys({ ...object1, ...object2 });

    const checkElement = (key, obj1, obj2) => {
      // самые простые случаи - новые и удаленные ключи
      if (!Object.keys(obj1).includes(key)) return { status: 'added', newValue: obj2[key] };
      if (!Object.keys(obj2).includes(key)) return { status: 'deleted', oldValue: obj1[key] };

      // если ключ есть в обоих файлах
      // рассматриваем случай, противоположный тому, что в обоих файлах по ключу содержутся объекты
      if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
        // случай: ключ есть, значения равны
        if (obj1[key] === obj2[key]) return { status: 'unchanged', oldValue: obj1[key] };
        // случай: ключ есть, значения не равны, но это не 2 объекта одновременно, так что нам пофиг
        return { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
      }

      // случай, когда ключ есть в обоих файлах, а значение и там, и там - объект
      const sortedChildren = _.sortBy(bulidDiff(obj1[key], obj2[key]), ['name']);
      return { status: 'has children', children: sortedChildren };
    };

    const result = keys.reduce((acc, key) => {
      const info = checkElement(key, object1, object2);
      const element = { name: key, ...info };
      return [...acc, element];
    }, []);

    return _.sortBy(result, ['name']);
  };

  if (formatName === 'plain') return plain(bulidDiff(parsedFile1, parsedFile2));
  if (formatName === 'json') return JSON.stringify(bulidDiff(parsedFile1, parsedFile2));
  return stylish(bulidDiff(parsedFile1, parsedFile2));
};

export default genDiff;
