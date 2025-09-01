const dotenv = require('dotenv');
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'ADMIN_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');
const courseRoutes = require('./routes/course.routes');
const moduleRoutes = require('./routes/module.routes');
const lessonRoutes = require('./routes/lesson.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
app.use(morgan('combined'));

// CORS configuration
app.use(cors ({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL]
    : ["http://localhost:5173", "http://localhost:5174"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Import routes
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    headers: req.headers
  });
  
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  
  res.status(statusCode).json({
    status: status,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err, stack: err.stack })
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
