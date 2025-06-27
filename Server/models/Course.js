const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide lesson title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide lesson description']
  },
  content: {
    type: String,
    required: [true, 'Please provide lesson content']
  },
  videoUrl: {
    type: String
  },
  duration: {
    type: String,
    required: [true, 'Please provide lesson duration']
  },
  order: {
    type: Number,
    required: true
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'audio', 'link', 'image']
    }
  }],
  quiz: {
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }],
    passingScore: {
      type: Number,
      default: 70
    }
  }
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide module title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide module description']
  },
  order: {
    type: Number,
    required: true
  },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide course title'],
    trim: true,
    maxLength: [200, 'Course title cannot exceed 200 characters']
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide course description']
  },
  fullDescription: {
    type: String
  },
  instructor: {
    type: String,
    required: [true, 'Please provide instructor name']
  },
  instructorBio: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please provide course price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration']
  },
  level: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL LEVELS'],
    default: 'ALL LEVELS'
  },
  category: {
    type: String,
    required: [true, 'Please provide course category'],
    enum: ['TRAUMA HEALING', 'RELATIONSHIPS', 'MENTAL HEALTH', 'PERSONAL GROWTH', 'BUNDLE']
  },
  tags: [String],
  language: {
    type: String,
    default: 'English'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  thumbnail: {
    public_id: String,
    url: String
  },
  preview: {
    public_id: String,
    url: String
  },
  modules: [moduleSchema],
  whatYouWillLearn: [String],
  requirements: [String],
  targetAudience: [String],
  enrollmentCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalLessons: {
    type: Number,
    default: 0
  },
  estimatedHours: {
    type: Number
  }
}, {
  timestamps: true
});

// Calculate total lessons when modules are updated
courseSchema.pre('save', function(next) {
  this.totalLessons = this.modules.reduce((total, module) => {
    return total + module.lessons.length;
  }, 0);
  next();
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
    return;
  }
  
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating.average = (totalRating / this.reviews.length).toFixed(1);
  this.rating.count = this.reviews.length;
};

module.exports = mongoose.model('Course', courseSchema);
