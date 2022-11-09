const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const dbCloud = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const dbLocal = process.env.DATABASE_LOCAL.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(dbCloud, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

const app = require('./app');

const port = process.env.PORT || 8000;

const localHost = 'localhost';
app.listen(port, localHost, () => {
  console.log(`App running on port ${port}`);
});
