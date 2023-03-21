import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormat from './jsonFormat.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonFormat(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`output format ${formatName} not found`);
  }
};
