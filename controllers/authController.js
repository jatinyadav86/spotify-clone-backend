const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/generateToken');


module.exports.createUser = async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ $and: [{ email: req.body.email }, { phone: req.body.phone }] });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email or phone number already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // function to capitalize name
        function capitalize(name) {
            return name
                .split(' ') // Split the sentence into words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                .join(' '); // Join the words back into a sentence
        }

        // Create a new user
        let userData = {
            name: capitalize(req.body.name),
            password: secPass,
        }

        if (req.body.email) {
            userData.email = req.body.email;
        }
        else if (req.body.phone) {
            userData.phone = req.body.phone;
        }

        user = await User.create(userData);
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = generateToken(data);


        // res.json(user)
        res.json({ success: true, authtoken })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports.loginUser = async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ $and: [{ email: req.body.email }, { phone: req.body.phone }] });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = generateToken(data);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports.getUser = async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.json(user)
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }