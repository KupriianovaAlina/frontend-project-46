import _ from 'lodash';

const styleValue = (itemValue, oldDepth) => {
  if (!_.isObject(itemValue) || itemValue === null) return `${itemValue}`;

  const stringify = (data, depth) => {
    const levelIndent = ' '.repeat((depth + 2) * 2);
    const closeIndent = ' '.repeat((depth) * 2 + 2);

    const result = Object.entries(data).reduce((acc, [key, value]) => {
      const stringifyValue = (typeof value === 'object' && value !== null) ? stringify(value, depth + 2) : value;
      return `${acc}\n${levelIndent}  ${key}: ${stringifyValue}`;
    }, '{');

    return `${result}\n${closeIndent}}`;
  };

  return stringify(itemValue, oldDepth);
};

const stylish = (tree) => {
  const stringifyWithDepth = (node, depth) => {
    const levelIndent = ' '.repeat(depth * 2);
    const closeIndent = ' '.repeat((depth - 1) * 2);
    const result = '{';

    const body = node.reduce((acc, item) => {
      if (item.status === 'added') return `${acc}\n${levelIndent}+ ${item.name}: ${styleValue(item.newValue, depth)}`;
      if (item.status === 'deleted') return `${acc}\n${levelIndent}- ${item.name}: ${styleValue(item.oldValue, depth)}`;
      if (item.status === 'unchanged') return `${acc}\n${levelIndent}  ${item.name}: ${styleValue(item.oldValue, depth)}`;
      if (item.status === 'changed') return `${acc}\n${levelIndent}- ${item.name}: ${styleValue(item.oldValue, depth)}\n${levelIndent}+ ${item.name}: ${styleValue(item.newValue, depth)}`;

      // если дети в обоих файлах были объектами, статус 'has children'
      return `${acc}\n${levelIndent}  ${item.name}: ${stringifyWithDepth(item.children, depth + 2)}`;
    }, '');

    return `${result}${body}\n${closeIndent}}`;
  };

  return stringifyWithDepth(tree, 1);
};

export default stylish;
