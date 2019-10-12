const User = require('./../models/userModel');

exports.createUser = async (req, res) => {
  try{
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'SUCCESS',
      data: {
        tour: newUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'FAIL',
      message: err
    })
  }
}
  