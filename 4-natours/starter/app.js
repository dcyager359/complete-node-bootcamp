const fs = require('fs');
const { application } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello World!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint');
// });

const tourFileName = `${__dirname}/dev-data/data/tours-simple.json`;
let tourData = JSON.parse(fs.readFileSync(tourFileName, 'utf-8'));

const getNextTourId = () => {
  const tmp = tourData.map((x) => x.id);
  const max = Math.max(...tmp);
  return max + 1;
};

const appendTour = (jsonNode) => {
  tourData = { ...tourData, jsonNode };
  console.log(tourData);
};

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tourData.length,
    data: {
      tours: tourData,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = getNextTourId();
  const newTour = Object.assign({ id: newId }, req.body);
  tourData.push(newTour);

  fs.writeFile(tourFileName, JSON.stringify(tourData), (err) => {
    if (err) {
      console.log(`error writing tour file: ${err.message}`);
    } else {
      console.log('Tour file successfully updated');
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      tours: newTour,
    },
  });
});

const port = 8000;
const localHost = 'localhost';
app.listen(port, localHost, () => {
  console.log('App running on port', port);
});
