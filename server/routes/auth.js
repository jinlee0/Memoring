const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schemas/user');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);
    const user = await User.create({
      email,
      password: hash,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error(err);
  }
})


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  //
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(400).json({ msg: `${req.originalUrl} password not match` });
  }
  const token = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: 'Cluper'
  })
  return res.json(token);
});



module.exports = router;