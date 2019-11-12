const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Nome é Obrigatório para Cadastro'],
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
    unique: true,
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
    validate(password) {
      if (
        password.includes('password')
      || password.includes('123456')
      || password.includes('000000')
      ) throw new Error('Senha Manjada. Tente Outra.');
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirme sua senha...'],
    validate(passwordConfirm) {
      return passwordConfirm === this.password;
    },
    message: 'Senhas devem ser exatamente iguais !!!',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema
  .pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });

userSchema
  .methods
  .correctPassword = async function (candidatePassword, userPassword) {
    const comparation = await bcrypt.compare(candidatePassword, userPassword);
    return comparation;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
