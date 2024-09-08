const mongoose = require('mongoose');
require("dotenv").config()
const dbgr = require('debug')("development:mongoose")

const connectToMongo = () => {
    mongoose.connect(`${process.env.MONGODB_URI}/spotify`)
        .then(() => {
            dbgr("connected")
        })
        .catch((err) => { dbgr(err) })
}

module.exports = connectToMongo;