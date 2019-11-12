const User = require('./../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({
        status: 'SUCCESS',
        data: { users },
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

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'SUCCESS',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAIL',
      message: err,
    });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res
//       .status(201)
//       .json({
//         status: 'SUCCESS',
//         data: {
//           user: newUser,
//         },
//       });
//   } catch (err) {
//     res
//       .status(400)
//       .json({
//         status: 'FAIL',
//         message: err,
//       });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'SUCCESS',
      data: {
        task: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAIL',
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'SUCCESS',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAIL',
      message: err,
    });
  }
};
