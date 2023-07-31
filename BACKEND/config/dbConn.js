const mongoose = require('mongoose');
const DB = process.env.DATABASE_URI;

const connectDB = async () =>
{
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;