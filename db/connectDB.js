const mongoose = require("mongoose")
const connectDB =async (DATABASE_URL) =>{
    try {
        const DB_OPTIONS = {
            dbName:'project01',
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("CONNECTED SUCCESSFULLY....")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {connectDB}