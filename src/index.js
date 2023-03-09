import parse from './parsers.js';

const checkElement = (key, obj1, obj2) => {
  if (!Object.keys(obj1).includes(key)) return ` + ${key}: ${obj2[key]}`;
  if (!Object.keys(obj2).includes(key)) return ` - ${key}: ${obj1[key]}`;

  if (obj1[key] === obj2[key]) return `   ${key}: ${obj1[key]}`;

  return ` - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
};

const genDiff = (filepath1, filepath2) => {
  // здесь читаем значения из файлов
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const arr = keys.reduce((acc, key) => {
    const newElm = checkElement(key, obj1, obj2);
    acc.push(newElm);
    return acc;
  }, ['{']);

  const result = arr.join('\n ').concat('\n}');
  console.log(result);

  return result;
};

export default genDiff;

// {
//   name: key,
//     status : added | deleted | changed | unchanged,
//       newValue : value,
//         oldValue: value,
//           children: [key, key]
// }
