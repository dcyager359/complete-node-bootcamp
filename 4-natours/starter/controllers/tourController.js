const fs = require('fs');

const tourFileName = `${__dirname}/../dev-data/data/tours-simple.json`;
let tourData = JSON.parse(fs.readFileSync(tourFileName, 'utf-8'));

exports.checkId = (req, res, next, val) => {
  const idToFind = val * 1;

  if (!tourData.find((item) => item.id === idToFind)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.validateTourData = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Incomplete Data',
    });
  }
  next();
};

const getNextTourId = () => {
  const tmp = tourData.map((x) => x.id);
  const max = Math.max(...tmp);
  return max + 1;
};

// Route Tour endpoint Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tourData.length,
    requestTime: req.requestTime,
    data: {
      tours: tourData,
    },
  });
};

exports.getTourById = (req, res) => {
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
};

exports.createTour = (req, res) => {
  const newId = getNextTourId();
  const newTour = Object.assign({ id: newId }, req.body);
  tourData.push(newTour);

  fs.writeFile(tourFileName, JSON.stringify(tourData), (err) => {
    if (err) {
      console.log(`error writing tour file: ${err.message}`);
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      tours: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  console.log('APP PATCH');
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Updated Tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log('APP DELETE');
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'success',
    data: null,
  });
};
