const User = require('../models/user.model');
const { hashPassword, comparePasswords } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'کاربر قبلاً ثبت شده است.' });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, name, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: 'ثبت‌نام ناموفق بود.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'کاربر یافت نشد.' });

    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'رمز عبور اشتباه است.' });

    const token = generateToken(user);
    res.status(200).json({ user: { id: user._id, name: user.name, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: 'ورود ناموفق بود.', error: err.message });
  }
};
