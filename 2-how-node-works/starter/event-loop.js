const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);

setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("./test-file.txt", () => {
  console.log("IO finished");
  console.log("---------------");
  setTimeout(() => console.log("Timer 2 finished"));
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("process next tick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 2048, "sha512");
  console.log(Date.now() - start, "password encrypted ");
  crypto.pbkdf2Sync("password", "salt", 100000, 2048, "sha512");
  console.log(Date.now() - start, "password encrypted ");
  crypto.pbkdf2Sync("password", "salt", 100000, 2048, "sha512");
  console.log(Date.now() - start, "password encrypted ");
  crypto.pbkdf2Sync("password", "salt", 100000, 2048, "sha512");
  console.log(Date.now() - start, "password encrypted ");
  // crypto.pbkdf2("password", "salt", 100000, 2048, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted ");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 2048, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted ");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 2048, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted ");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 2048, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted ");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 2048, "sha512", () => {
  //   console.log(Date.now() - start, "password encrypted ");
  // });
});

console.log("TOP Level code exexutes");
