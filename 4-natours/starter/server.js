require('dotenv').config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 8000;

const localHost = 'localhost';
app.listen(port, localHost, () => {
  console.log(`App running on port ${port}`);
});
