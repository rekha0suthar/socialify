import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User.js';

// @desc    Signup new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, username, password, friends } = req.body;

    // Check if user already exist
    const existUser = await User.findOne({ username });

    if (existUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    // New User added to Database
    const newUser = await new User({
      name,
      username,
      password,
      friends,
      viewProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    }).save();

    res.status(201).json({ msg: 'Signup Successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exist
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User does not found' });
    }

    // Match user password
    const matchPassword = await user.checkPassword(password);

    if (!matchPassword) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { login, signup };
