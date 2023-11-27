const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  "nom_complet":String,
  "age": Number,
  "email":String,
  "phone":String,
  "user_id":  { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
},{ timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;