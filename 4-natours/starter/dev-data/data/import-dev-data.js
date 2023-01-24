const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

console.log('DATABASE', process.env.DATABASE);
console.log('DATABASE PASSWORD', process.env.DATABASE_PASSWORD);

const dbCloud = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(dbCloud, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

const tourJson = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log('***** Tour Data Cleared *****');
  } catch (err) {
    console.log(`Error clearing tour data ${err}`);
  }
  process.exit();
};

const importData = async () => {
  try {
    console.log('load the data');
    console.log(tourJson);
    await Tour.create(JSON.parse(tourJson));
    console.log('***** Tour Data Imported *****');
  } catch (err) {
    console.log(`Error adding tour ${err}`);
  }
  process.exit();
};

if (process.argv.includes('--import-data')) {
  console.log('IMPORT THE DATA');
  importData();
} else if (process.argv.includes('--clear-data')) {
  console.log('CLEAR THE DATA');
  clearData();
} else {
  console.log('NO MATCHING ARGS');
}

// const processArgs = async () => {
//   if (process.argv.includes('--clear-data')) {
//     console.log('1. clear the data');
//     await clearData();
//     console.log('2. data cleared');
//   }

//   if (process.argv.includes('--import-data')) {
//     console.log('3. import the data');
//     await importData();
//     console.log('4. data imported');
//   }
// };

// console.log('exit app');

// clearTourData();
// importData();
