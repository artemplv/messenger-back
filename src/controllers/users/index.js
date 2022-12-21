const updateUser = require('./updateUser');
const changePassword = require('./changePassword');
const getByUsername = require('./getByUsername');

const usersController = {
  update: updateUser,
  changePassword,
  getByUsername,
};

module.exports = usersController;
