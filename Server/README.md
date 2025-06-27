# Course Platform Backend

A comprehensive backend API for an online course platform built with Node.js, Express, and MongoDB, integrated with Firebase Authentication.

## Features

- 🔐 **Firebase Authentication Integration**
- 📚 **Course Management** (CRUD operations)
- 👥 **User Management** (profiles, enrollment, wishlist)
- 💳 **Payment Processing** (Stripe integration)
- 📊 **Progress Tracking** (lessons, quizzes, certificates)
- 🖼️ **File Upload** (Cloudinary integration)
- 🔒 **Role-based Access Control**
- 📧 **Email Notifications**
- 🛡️ **Security** (Helmet, CORS, Rate Limiting)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Admin SDK
- **Payment**: Stripe
- **File Storage**: Cloudinary
- **Validation**: Express Validator

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Firebase Project
- Stripe Account
- Cloudinary Account

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd "Server(backend)"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables in `.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/course-platform
   CLIENT_URL=http://localhost:5173
   
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key_Here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your_client_id
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication

2. **Generate Service Account Key**
   - Go to Project Settings > Service Accounts
   - Generate new private key
   - Download the JSON file

3. **Extract Required Values**
   From the downloaded JSON file, extract these values for your `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `client_id` → `FIREBASE_CLIENT_ID`

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/category/:category` - Get courses by category
- `GET /api/courses/search` - Search courses
- `POST /api/courses` - Create course (Admin/Instructor)
- `PUT /api/courses/:id` - Update course (Admin/Instructor)
- `DELETE /api/courses/:id` - Delete course (Admin/Instructor)
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/:id/content` - Get course content (Enrolled users)
- `POST /api/courses/:id/reviews` - Add review
- `GET /api/courses/:id/reviews` - Get reviews

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/avatar` - Update avatar
- `GET /api/users/enrolled-courses` - Get enrolled courses
- `GET /api/users/wishlist` - Get wishlist
- `POST /api/users/wishlist/:courseId` - Add to wishlist
- `DELETE /api/users/wishlist/:courseId` - Remove from wishlist
- `GET /api/users/payment-history` - Get payment history
- `DELETE /api/users/account` - Delete account

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/status/:paymentId` - Get payment status
- `POST /api/payments/refund` - Process refund (Admin)
- `POST /api/payments/webhook` - Stripe webhook

### Progress
- `GET /api/progress/course/:courseId` - Get course progress
- `PUT /api/progress/lesson` - Update lesson progress
- `POST /api/progress/lesson/complete` - Mark lesson completed
- `POST /api/progress/quiz` - Submit quiz result
- `GET /api/progress/certificate/:courseId` - Get certificate
- `POST /api/progress/certificate/:courseId/generate` - Generate certificate

## Authentication

This API uses Firebase Authentication. Include the Firebase ID token in the Authorization header:

```javascript
Authorization: Bearer <firebase_id_token>
```

### Frontend Integration Example

```javascript
// Get Firebase ID token
const idToken = await user.getIdToken();

// Make API request
const response = await fetch('/api/courses', {
  headers: {
    'Authorization': `Bearer ${idToken}`,
    'Content-Type': 'application/json'
  }
});
```

## Database Models

### User
- Firebase UID integration
- Profile information
- Enrolled courses
- Wishlist
- Payment history

### Course
- Course details and metadata
- Modules and lessons structure
- Reviews and ratings
- Enrollment tracking

### Progress
- User course progress
- Completed lessons
- Quiz results
- Certificate information

## Security Features

- 🔒 **Firebase Authentication** - Secure user authentication
- 🛡️ **Helmet** - Security headers
- 🚦 **Rate Limiting** - Prevent API abuse
- 🔐 **CORS** - Cross-origin request control
- ✅ **Input Validation** - Request validation
- 🎭 **Role-based Access** - Admin/Instructor/User roles

## File Upload

Files are uploaded to Cloudinary with automatic optimization:
- **Images**: JPG, PNG, GIF
- **Videos**: MP4, MOV, AVI
- **Documents**: PDF
- **Size Limit**: 50MB

## Development

### Project Structure
```
Server(backend)/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── server.js       # Application entry point
└── package.json    # Dependencies and scripts
```

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Deployment

1. **Environment Variables**: Ensure all production environment variables are set
2. **Database**: Set up MongoDB Atlas or your preferred MongoDB hosting
3. **File Storage**: Configure Cloudinary for production
4. **Payment**: Set up production Stripe keys
5. **Domain**: Update CORS settings for your production domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
