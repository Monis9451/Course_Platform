// Load environment variables first
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());

// CORS configuration
app.use(cors ({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Import routes
app.use('/api/users', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  
  res.status(statusCode).json({
    status: status,
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false, 
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
