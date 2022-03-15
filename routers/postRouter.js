const express = require('express');
const { createPost } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/', auth, createPost);

module.exports = router;