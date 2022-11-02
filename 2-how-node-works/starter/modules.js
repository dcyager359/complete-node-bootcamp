// console.log(arguments);
// console.log(require("module").wrapper);

//module exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports
const D = require("./test-module-2");
console.log(D.add(1, 1));
console.log(D.multiply(3, 3));
console.log(D.divide(9, 3));

const { add, multiply, divide } = require("./test-module-2");
console.log(add(1, 1));
console.log(multiply(3, 3));
console.log(divide(9, 3));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
