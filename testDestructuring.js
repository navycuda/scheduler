// testDestructuring.js
const [key, value, add] = [ 'key', 'value', 'mostcertainly not add' ];
const { objKey, objValue } = { objKey:'objKey', objValue:'objValue' }

console.log(key);
console.log(value);
console.log(objKey);
console.log(objValue);
console.log(add);