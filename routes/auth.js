
const { Router } = require('express');

const { getLogin, getSignUp, authRedirect } = require('../controllers');

const router = Router();

router
.post('/login', getLogin)
.post('/signup', getSignUp)


module.exports = router;