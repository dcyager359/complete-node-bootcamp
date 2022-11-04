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

/// GET all
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tourData.length,
    data: {
      tours: tourData,
    },
  });
});

/// GET by ID
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tourData.find((item) => item.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tours: tour,
      },
    });
  } else {
    res.status(404).json({ status: 'failed', message: 'Invalid Id' });
  }
});

/// POST
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

// PATCH
app.patch('/api/v1/tours/:id', (req, res) => {
  console.log('APP PATCH');
  const id = req.params.id * 1;

  if (id) {
    res.status(200).json({
      status: 'success',
      data: {
        tours: '<Updated Tour here ...>',
      },
    });
  } else {
    res.status(404).json({ status: 'failed', message: 'Invalid Id' });
  }
});

// DELETE
app.delete('/api/v1/tours/:id', (req, res) => {
  console.log('APP DELETE');
  const id = req.params.id * 1;

  if (id) {
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(404).json({ status: 'failed', message: 'Invalid Id' });
  }
});

const port = 8000;
const localHost = 'localhost';
app.listen(port, localHost, () => {
  console.log('App running on port', port);
});
