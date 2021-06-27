const mongoose = require('mongoose');
//Pour pré-valider les informations
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Apliquer le validateur au schéma avant d'en faire un model
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

 