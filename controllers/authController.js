const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES,
});

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      age: req.body.age || 0,
      role: req.body.role,
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
    throw new Error('Não Será Possível Finalizar seu Processo de Login. Tente Novamente!');
  }
};

exports.protect = async (req, res, next) => {
  try {
  // 1 => VERIFICAR SE O TOKEN EXISTE
  // => SPLITAR DO BEARER SE EXISTE, SENÃO THROW ERROR
    let token;
    if (req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
    ) {
    // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new Error('Operação não Autorizada. Faça Login para continuar'));
    }
    // 2 => VERIFICAR VALIDADE DO TOKEN E SE HOUVE ALTERAÇÃO(SENHA)
    const decodedData = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3 => CHECAR SE O USER EXISTE
    const freshUser = await User.findById(decodedData.id);
    if (!freshUser) {
      return next(new Error('Token de acesso não reconhecido. Faça login novamente.'));
    }

    // 4 => CHECAR SE O USER ALTEROU PASSWORD (USERMODEL)
    if (freshUser.changedPasswordAfter(decodedData.iat)) {
      return next(new Error('Password Mudou. Login Novamente.'));
    }

    req.user = freshUser;
    next();
  } catch (e) {
    throw new Error(`Erro de Permissão. Você Não Pode Acessar Este Recurso. Tente Novamente! => ERR: ${e}`);
  }
};
