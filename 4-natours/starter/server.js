const app = require('./app');
const port = 8000;
const localHost = 'localhost';
app.listen(port, localHost, () => {
  console.log('App running on port', port);
});
