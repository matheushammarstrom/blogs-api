const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, getUsers, getUser } = require('../controllers');

const router = express.Router();

router.post('/', createUser);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);

module.exports = router;