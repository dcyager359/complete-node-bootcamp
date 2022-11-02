const EventEmitter = require("events");
const http = require("http");

const myEmitter = new EventEmitter();

myEmitter.on("newsale", () => console.log("made a sale!!"));
myEmitter.on("newsale", () => console.log("reduce inventory!!"));
myEmitter.on("newsale", (price) => console.log(`sold an item for ${price}!!`));
myEmitter.on("return", () => console.log("increase inventory"));
myEmitter.on("return", () => console.log("have a return"));

myEmitter.emit("newsale");
myEmitter.emit("newsale", 56.25);
myEmitter.emit("return");

////////////////////////////////////////////////
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("received a request");
  res.writeHead(200, { "Content-Type": "text/http" });
  res.end("here's the response");
});

server.listen(8000, () => {
  console.log("listening on port 8000 ....");
});
