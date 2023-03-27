import _ from 'lodash';

const genDiff = (object1, object2) => {
  const keys = Object.keys({ ...object1, ...object2 });

  const checkElement = (key, obj1, obj2) => {
    // самые простые случаи: новые и удаленные ключи
    if (!Object.keys(obj1).includes(key)) return { status: 'added', newValue: obj2[key] };
    if (!Object.keys(obj2).includes(key)) return { status: 'deleted', oldValue: obj1[key] };

    // если ключ есть в обоих файлах
    // рассматриваем случай, противоположный тому, что в обоих файлах по ключу содержутся объекты
    if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
      // случай: ключ есть, значения равны
      if (obj1[key] === obj2[key]) return { status: 'unchanged', oldValue: obj1[key] };
      // случай: ключ есть, значения равны, но не 2 объекта одновременно
      return { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }

    // случай, когда ключ есть в обоих файлах, а значение и там, и там - объект
    const sortedChildren = _.sortBy(genDiff(obj1[key], obj2[key]), ['name']);
    return { status: 'has children', children: sortedChildren };
  };

  const result = keys.reduce((acc, key) => {
    const info = checkElement(key, object1, object2);
    const element = { name: key, ...info };
    return [...acc, element];
  }, []);

  return _.sortBy(result, ['name']);
};

export default genDiff;
