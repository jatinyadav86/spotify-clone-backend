const connectToMongo = require('./config/db');
const express = require('express')
const cors = require('cors'); 
const dbgr = require('debug')("development:mongoose")

connectToMongo();
const app = express();

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/data', require('./routes/userData'))
app.use('/api/appdata', require('./routes/appData')) 
app.use('/api/songsdata', require('./routes/songsData'))



app.listen(process.env.PORT, () => {
  dbgr(`spotify backend listening at http://localhost:${process.env.PORT}`)
})