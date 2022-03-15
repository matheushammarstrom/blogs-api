const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, getUsers } = require('../controllers');

const router = express.Router();

router.post('/', createUser);
router.get('/', auth, getUsers);

module.exports = router;