const { Console } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const hello = 'Hello World';

const replaceTemplate = require('./modules/replaceTemplate');
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
  !err &&
    fs.writeFile('./txt/inputnew.txt', data, (err) => {
      console.log(err);
    });
  err && console.log(err);
});

const loadHtmlTemplates = () => {
  const templateOverviewHtml = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
  const templateCardHtml = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
  const templateProductHtml = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

  const htmlTemplateMap = new Map();
  htmlTemplateMap.set('overview', templateOverviewHtml);
  htmlTemplateMap.set('product', templateProductHtml);
  htmlTemplateMap.set('card', templateCardHtml);

  return htmlTemplateMap;
};

/////////////////////////////
// SERVER
const rawData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(rawData);

const slugs = productData.map((element) => slugify(element.productName, { lower: true }));
console.log(slugs);
console.log('hello');

const htmlPageMap = loadHtmlTemplates();
const templateOverviewHtml = htmlPageMap.get('overview');
const templateCardHtml = htmlPageMap.get('card');
const templateProductHtml = htmlPageMap.get('product');

const server = http.createServer((req, res) => {
  console.log('url', req.url);
  console.log(slugify('Ripe avacados', { lower: true }));

  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/overview' || pathname === '/') {
    const cardsHtml = productData.map((element) => replaceTemplate(templateCardHtml, element)).join('');

    htmlOutput = templateOverviewHtml.replace(/{%PRODUCT_CARDS%}/gi, cardsHtml);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(htmlOutput);

    //Product page
  } else if (pathname === '/product') {
    const id = query.id;
    res.writeHead(200, { 'Content-type': 'text/html' });
    if (id && id >= 0 && id < productData.length) {
      console.log(productData[id]);
      res.end(replaceTemplate(templateProductHtml, productData[id]));
    } else {
      res.end('Invalid Product Id');
    }
    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(rawData);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Not Found!!</h1>');
  }
});

const port = 8010;
server.listen(port, '127.0.0.1', () => {
  console.log(`listening to requests on port ${port}`);
});
