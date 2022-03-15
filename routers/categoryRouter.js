const express = require('express');
const auth = require('../middlewares/auth');
const { createCategory } = require('../controllers');

const router = express.Router();

router.post('/', auth, createCategory);

module.exports = router;