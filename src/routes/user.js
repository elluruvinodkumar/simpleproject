const express = require('express');
const router = express.Router();
const userInit = require('../controllers/user/userInitialization');

router.post('/add-user-details',userInit.userRegister);

router.post('/verify',userInit.verifyUser);

router.post('/login',userInit.loginUser); 

module.exports = router;