const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hash(password, 10);
const comparePasswords = (password, hash) => bcrypt.compare(password, hash);

module.exports = { hashPassword, comparePasswords };
