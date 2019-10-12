const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Must Have a Name'],
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(val) {
      if (val < 0) throw new Error('Idade deve ser igual ou maior que Zero');
    },
  },
  email: {
    type: String,
    required: [true, 'User Must Have an Email'],
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error('Formato Inválido');
    },
  },
  password: {
    type: String,
    required: [true, 'Você deve escolher uma senha para se cadastrar'],
    trim: true,
    minlength: [6, 'Senha deve conter mais que seis caracteres'],
    validate(val) {
      if (val.includes('password')) throw new Error('Senha Manjada. Tente Outra.');
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
