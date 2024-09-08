const Userdata = require('../models/Userdata');
const { validationResult } = require('express-validator');


module.exports.fetchUserata = async (req, res) => {
    try {
        const data = await Userdata.find({ user: req.user.id });
        res.json(data[0])
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports.addUserData = async (req, res) => {
    try {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let checkdata = await Userdata.findOne({ user: req.user.id });
        if (checkdata) {
            return res.status(400).json({ error: "Sorry, the data of user already exists" })
        }
        const data = new Userdata({
            history: [],
            liked: [],
            playlists1: [],
            playlists2: [],
            user: req.user.id
        })
        const savedData = await data.save()

        res.json(savedData)

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports.updateUserData = async (req, res) => {
    const { historyItem, likedItem, playlist1Item, playlist2Item } = req.body;
    try {
        // Find the data to be updated and update it
        let data = await Userdata.findOne({ user: req.user.id });
        if (!data) { return res.status(404).send("Not Found") }

        if (data.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        
        const { history, liked, playlists1, playlists2 } = data

        // Create a newData object
        let newData = {};
        if (historyItem) {
            newData.history = historyItem
        };
        if (likedItem) {
            newData.liked = likedItem
        };
        if (playlist1Item) {
            newData.playlists1 = playlist1Item
        };
        if (playlist2Item) {
            newData.playlists2 = playlist2Item
        }

        updatedData = await Userdata.findByIdAndUpdate(data.id, { $set: newData }, { new: true })
        res.json({ updatedData });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}