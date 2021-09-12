const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { isLoggedIn } = require('../middleware');
const User = require('../schemas/user');
const router = express.Router();


router.post('/join', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);
    const user = await User.create({
      email,
      password: hash,
    });

    const accessToken = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: 'Cluper'
    })

    res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      accessToken
    });
  } catch (err) {
    console.error(err);
    next(err)
  }
})


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: `${req.originalUrl} email or password: null` });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ msg: `${req.originalUrl} user: not found by email` });
    }
    //
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: `${req.originalUrl} password not match` });
    }
    const accessToken = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: 'Cluper'
    })
    return res.json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      accessToken
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.get('/me', isLoggedIn, async (req, res, next) => {
  try {
    const id = req.decoded.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'user maybe deleted' });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    next();
  }
});


module.exports = router;