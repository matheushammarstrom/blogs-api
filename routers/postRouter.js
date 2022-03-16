const express = require('express');
const { createPost, getPosts } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/', auth, createPost);
router.get('/', auth, getPosts);

module.exports = router;