const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

//returns array from key/values
module.exports.queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');

//returns object with key-values
module.exports.parse = string => {
   return Object.fromEntries(string.split('&').map(item => {
    let [key, value] = item.split('=');
    if(value.indexOf(',') > -1) {
        value = value.split(',')
    }
    
    return [key, value];
   }));
};
