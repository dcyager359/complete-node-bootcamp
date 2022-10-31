const { Console } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
const hello = "Hello World";
// console.log(hello);
// const contents = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(fs.readFileSync("./txt/input.txt", "utf-8"));
// fs.writeFileSync("./txt/test.txt", hello);
// fs.writeFileSync("./txt/test.txt", hello);
// console.log(fs.readFileSync("./txt/test.txt", "utf-8"));
fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  !err &&
    fs.writeFile("./txt/inputnew.txt", data, (err) => {
      console.log(err);
    });
  err && console.log(err);
});

/////////////////////////////
// SERVER
const rawData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(rawData);

const templateOverviewHtml = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const templateCardHtml = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const templateProductHtml = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  console.log("url", req.url);

  const { query, pathname } = url.parse(req.url, true);

  const replaceTemplate = (templateHtml, productItem) => {
    let text = templateHtml.replace(/{%PRODUCT_ID%}/gi, productItem.id);
    text = text.replace(/{%PRODUCT_NAME%}/g, productItem.productName);
    text = text.replace(/{%PRODUCT_IMAGE%}/g, productItem.image);
    text = text.replace(/{%PRODUCT_ORIGIN%}/g, productItem.from);
    text = text.replace(/{%PRODUCT_NUTRIENTS%}/g, productItem.nutrients);
    text = text.replace(/{%PRODUCT_QUANTITY%}/g, productItem.quantity);
    text = text.replace(/{%PRODUCT_PRICE%}/g, productItem.price);
    text = text.replace(/{%PRODUCT_DESCRIPTION%}/g, productItem.description);

    if (!productItem.organic) text = text.replace(/{%PRODUCT_IS_ORGANIC%}/g, "not-organic");

    return text;
  };

  // Overview page
  if (pathname === "/overview" || pathname === "/") {
    const cardsHtml = productData
      .map((element) => replaceTemplate(templateCardHtml, element))
      .join("");

    htmlOutput = templateOverviewHtml.replace(/{%PRODUCT_CARDS%}/gi, cardsHtml);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(htmlOutput);

    //Product page
  } else if (pathname === "/product") {
    const id = query.id;
    res.writeHead(200, { "Content-type": "text/html" });
    if (id && id >= 0 && id < productData.length) {
      console.log(productData[id]);
      res.end(replaceTemplate(templateProductHtml, productData[id]));
    } else {
      res.end("Invalid Product Id");
    }
    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(rawData);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Not Found!!</h1>");
  }
});

const port = 8010;
server.listen(port, "127.0.0.1", () => {
  console.log(`listening to requests on port ${port}`);
});
