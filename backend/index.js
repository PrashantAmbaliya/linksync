const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const apiRouter = require('./controllers/apiRouter')

const app = express()
const port = 8000 

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Database Connected...'))
.catch((err) => console.log(err.message))

app.use(cors());
app.use(express.json());

app.use('/',apiRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))