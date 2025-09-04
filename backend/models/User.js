
const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  lat: String,
  lng: String
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  zipcode: String,
  geo: geoSchema
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: String },
  company: { type: String },
  address: addressSchema
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
