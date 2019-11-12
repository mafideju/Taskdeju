const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES,
});

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res
      .status(201)
      .json({
        status: 'SUCCESS',
        data: {
          user: newUser,
        },
      });
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'FAIL',
        message: err,
      });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return next(new Error('Forneça um Email Cadastrado para Logar'));
    } if (!password) {
      return next(new Error('Forneça uma Senha Válida para Logar'));
    }

    const user = await User
      .findOne({ email })
      .select('+password');
    const correct = await user
      .correctPassword(password, user.password);

    const token = signToken(user.id);
    if (!user || !correct) {
      return new Error('Usuário ou Senha Incorretos. Tente Novamente!');
    }
    res
      .status(200)
      .json({
        status: 'SUCCESS',
        token,
        user,
      });
  } catch (e) {
    res
      .status(400)
      .json({
        status: 'FAIL',
        e,
      });
  }
};
