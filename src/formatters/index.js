import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormat from './jsonFormat.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonFormat(diff);
    default:
      return stylish(diff);
  }
};
