const { request } = require('../app');
const User = require('../models/userModel');

// User Endpoint Handlers
exports.getAllUsers = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    const users = await User.find(queryObj);

    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    console.log('error', err);
    res.status('404').json({ message: err });
  }
};

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route Not Yet Implemented' });
};

exports.getUserById = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route Not Yet Implemented' });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route Not Yet Implemented' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route Not Yet Implemented' });
};
