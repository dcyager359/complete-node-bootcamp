const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //first solution
  // fs.readFile("./test-file.txt", (err, data) => {
  //   console.log("got a request");
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.end(data);
  //   }
  // });

  //second solution use stream
  // const stream = fs.createReadStream("./test-file.txt");
  // stream.on("data", (data) => {
  //   res.write(data);
  //   console.log("wrote some data", Date.now());
  // });
  // stream.on("end", () => {
  //   res.end();
  //   console.log("thats all folks!");
  // });
  // stream.on("error", (err) => {
  //   console.log("stream error", err);
  //   res.statusCode = 500;
  //   res.end("error reading stream");
  // });

  //third solution use stream
  const stream = fs.createReadStream("./test-file.txt"); //readablestream.pipe(writeablestream)
  stream.pipe(res);
});

server.listen(8000, "localhost");
