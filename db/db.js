const mongoose = require('mongoose');

const db = async () => {
    console.log(process.env.MONGO_URL)
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}