require('dotenv').config();
const mongoose = require('mongoose')



const db = mongoose.connect(process.env.MONGO_URL)

db.then(() => {
    console.log("=============================")
    console.log("|    Database Connected     |")
    console.log("=============================")
})
db.catch(() => {
   console.log("==============================")
    console.log("| Database Not Connected    |")
    console.log("=============================")
})

module.exports = db