const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is requred'],
    unique: true,
    trim: true,
  },
  duration: { type: Number, required: [true, 'a tour must have a duration'] },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size'],
    min: 1,
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have a difficulty'],
  },
  ratingsAverage: { type: Number, default: 4.5, required: false },
  ratingsQuantity: { type: Number, default: 0, required: false },
  price: { type: Number, required: [true, 'price is required'] },
  summary: {
    type: String,
    required: [true, 'a tour must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'the tour must have a description'],
  },
  priceDiscount: { type: Number, required: [false] },
  imageCover: { type: String, required: [true, 'a tour must have a image'] },
  images: [String],
  createdAt: { type: Date, default: Date.now(), select: false }, //set select to false to prevent mongoose from showing.
  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
