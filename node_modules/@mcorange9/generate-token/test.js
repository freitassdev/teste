const generateToken = require("./index")

let gen = new generateToken(/** Custom chars */);

console.log(gen.generateToken(10))