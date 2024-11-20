const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createUser = async (userData) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);

  const newUser = new User({
    name: userData.name,
    email: userData.email,
    password: passwordHash
  });

  await newUser.save();
  return newUser;
};


exports.getAllUsers = async () => {
  const users = await User.find();
  return users;
};
exports.getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.updateUserById = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData);
  return user;
};
exports.deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
