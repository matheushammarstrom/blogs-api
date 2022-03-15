const express = require('express');
const auth = require('../middlewares/auth');
const { createCategory, getCategories } = require('../controllers');

const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', auth, getCategories);
module.exports = router;