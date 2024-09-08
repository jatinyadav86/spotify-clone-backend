const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { createUser, loginUser, getUser } = require('../controllers/authController');

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', createUser )


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', loginUser );


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, getUser )

module.exports = router