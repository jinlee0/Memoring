const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { email, password } = req.query;
  return res.json({ email, password, a: 'a' });
});

module.exports = router;