require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/trips', tripRoutes);

module.exports = app;