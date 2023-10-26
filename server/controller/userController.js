const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    newUser.accessToken = token;

    await newUser.save();

    res
      .status(201)
      .json({ message: 'User created successfully!', accessToken: token });
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials!' });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    user.accessToken = token;
    await user.save();

    user.password = '';

    res.status(200).json({ ...user._doc, accessToken: token });
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    user.accessToken = '';
    await user.save();
    res.status(200).json({ message: 'Logged Out Successfully!' });
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

const tokenLogin = async (req, res) => {
  try {
    const token = req.body.accesstoken;

    if (!token) {
      return res
        .status(400)
        .json({ message: 'Please provide a token!', valid: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: 'Invalid Token!', valid: false });
    }

    decoded.user.password = '';

    res.status(200).json({ ...decoded.user, accessToken: token, valid: true });
  } catch (error) {
    res.status(502).json({
      error,
      valid: false,
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({ message: 'Action denied!' });
    }

    const users = await User.find({});

    // remove current user from the list
    const filteredUsers = users.filter(
      (u) => u._id.toString() !== user._id.toString()
    );

    res.status(200).json({ users: filteredUsers });
  } catch (error) {
    res.status(502).json({
      error,
    });
  }
};

module.exports = { register, login, logout, tokenLogin, getUsersById };
