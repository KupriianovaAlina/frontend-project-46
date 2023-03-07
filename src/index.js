import * as fs from 'fs';
import process from 'process';
import path from 'path';

const readFile = (file) => {
  const filepath = path.resolve(process.cwd(), file);
  console.log(filepath);
  const data = fs.readFileSync(filepath, 'utf8');
  return data;
};

const checkElement = (key, obj1, obj2) => {
  if (!Object.keys(obj1).includes(key)) return ` + ${key}: ${obj2[key]}`;
  if (!Object.keys(obj2).includes(key)) return ` - ${key}: ${obj1[key]}`;

  if (obj1[key] === obj2[key]) return `   ${key}: ${obj1[key]}`;

  return ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
};

const genDiff = (filepath1, filepath2) => {
  // здесь читаем значения из файлов
  const obj1 = JSON.parse(readFile(filepath1));
  const obj2 = JSON.parse(readFile(filepath2));

  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const arr = keys.reduce((acc, key) => {
    const newElm = checkElement(key, obj1, obj2);
    acc.push(newElm);
    return acc;
  }, ['{']);

  arr.push('}');
  const result = arr.join('\n');
  console.log(result);

  return result;
};

export default genDiff;
