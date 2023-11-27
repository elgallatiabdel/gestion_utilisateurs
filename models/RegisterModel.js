const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerShema = new Schema({
  "nom": String,
  "email": String,
  "password": String
});

const register = new mongoose.model('Register', registerShema);

module.exports = register;