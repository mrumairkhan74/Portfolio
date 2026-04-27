require('dotenv').config();

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const router = require('./routes/all-routes')




const app = express()
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1', router)


app.get('/api/test', (req, res) => {
    res.json({ message: "Successfully running", success: true })
})


module.exports = app