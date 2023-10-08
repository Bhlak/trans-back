const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
  let temp = req.body;
  temp.password = CryptoJS.AES.encrypt(
    temp.password,
    process.env.PASS_ENC
  ).toString();
  const newUser = new User(temp);
  try {
    const savedUser = await newUser.save();
    console.log('User Registered Successfully');
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  // res.status(200).json('Works');
  // return;
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json('Invalid email');
    if (!user) {
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_ENC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json('Incorrect password');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isVendor: user.isVendor,
      },
      process.env.ACC_TOK_ENC,
      { expiresIn: '1h' }
    );

    const { password, ...details } = user._doc;

    res.status(200).json({ ...details, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
