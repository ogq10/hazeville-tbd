const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register Route
router.post('/register', async (req, res) => {
  //use our models
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save(); //save user to db
    res.status(201).json(savedUser); //send user to client side
  } catch (error) {
    res.status(500).json(err);
  }
});

//LOGIN LOGIC

router.post('/login', async (req, res) => {
  try {
    //how to find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('Wrong Credentials!');

    //decrypt password to find password in db
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json('Wrong Credentials!');

    //create jwt
    const accessToken = jwt.sign(
      {
        id: user._id, //same in db (_id)
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc; //send only others, not password

    res.status(200).json({...others, accessToken});
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;

//mongodb stores documents in _doc but we are passing user directly , so write ._doc on line 42
