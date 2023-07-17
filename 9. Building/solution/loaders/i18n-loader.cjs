const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const i18nFilePath = path.resolve(__dirname, '../i18n.json');
  const i18nData = JSON.parse(fs.readFileSync(i18nFilePath, 'utf8'));

  let result = source;
  for (const key in i18nData) {
    result = result.replace(`i18n('${key}')`, `'${i18nData[key]}'`)
  }

  return result;
};