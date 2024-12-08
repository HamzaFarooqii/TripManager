const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: 'tripManager',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };