const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { fetchUserata, addUserData, updateUserData } = require('../controllers/userDataController');

// ROUTE 1: Get All the data using: GET "/api/data/getdata". Login required
router.get('/fetchdata', fetchuser, fetchUserata)

// ROUTE 2: Add data using: POST "/api/data/addData". Login required
router.post('/addData', fetchuser, addUserData )

// ROUTE 3: Update data using: PUT "/api/data/updateData". Login required
router.put('/updateData', fetchuser, updateUserData )

module.exports = router