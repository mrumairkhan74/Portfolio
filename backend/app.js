require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const app = express()

app.use(express.json())


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // allowedHeaders: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
}))

app.use(express.urlencoded({ extended: true }))

// app.use('/api/v1',)


const PORT = process.env.PORT


app.listen(PORT, async () => {
    console.log('=================================');
    console.log('|                               |');
    console.log('|      🚀 Server Running        |');
    console.log('|                               |');
    console.log('=================================');
    console.log(`|    Port: ${PORT}                 |`);
    console.log(`|    Mode: ${process.env.NODE_ENV || 'development'}          |`);
    console.log('=================================');

    // Connect to database
    await connectDB();

    console.log('=================================');
    console.log('|    ✅ Database Connected      |');
    console.log('=================================');
    console.log('|    Ready to accept requests   |');
    console.log('=================================\n');
});



