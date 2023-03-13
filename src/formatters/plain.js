import _ from 'lodash';

const checkObj = (item) => {
  if (_.isObject(item)) return '[complex value]';
  if (typeof item === 'string') return `'${item}'`;
  return item;
};

const plain = (tree, path) => {
  const result = tree.reduce((acc, item) => {
    const name = (path) ? `${path}.${item.name}` : `${item.name}`;
    if (item.status === 'added') return [...acc, `Property '${name}' was added with value: ${checkObj(item.newValue)}`];
    if (item.status === 'deleted') return [...acc, `Property '${name}' was removed`];
    if (item.status === 'changed') return [...acc, `Property '${name}' was updated. From ${checkObj(item.oldValue)} to ${checkObj(item.newValue)}`];
    if (item.status === 'unchanged') return acc;

    // если дети в обоих файлах были объектами, 'unchanged, has children'
    return [...acc, `${plain(item.children, `${name}`)}`];
  }, []);

  const joinedResult = result.join('\n');
  return joinedResult;
};

export default plain;
