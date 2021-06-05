const lodash = require("lodash");

const str ="This is The string";
let strChanged = lodash.kebabCase(lodash.lowerCase(str));
console.log(str);
console.log(strChanged);
