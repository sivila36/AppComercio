const User = require("../models/User");

exports.createUser = async (userData) => {
  const newUser = new User(userData);
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
