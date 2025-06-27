const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [{
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    }
  }],
  quizResults: [{
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    passed: {
      type: Boolean,
      required: true
    },
    attempts: {
      type: Number,
      default: 1
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  overallProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number, // Total time spent in seconds
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: Date,
    certificateId: String,
    downloadUrl: String
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate progress records
progressSchema.index({ user: 1, course: 1 }, { unique: true });

// Calculate overall progress
progressSchema.methods.calculateProgress = async function() {
  const course = await mongoose.model('Course').findById(this.course);
  if (!course) return 0;
  
  const totalLessons = course.modules.reduce((total, module) => {
    return total + module.lessons.length;
  }, 0);
  
  if (totalLessons === 0) return 0;
  
  const completedLessonsCount = this.completedLessons.length;
  const progress = Math.round((completedLessonsCount / totalLessons) * 100);
  
  this.overallProgress = progress;
  
  // Mark as completed if 100% progress
  if (progress === 100 && !this.completed) {
    this.completed = true;
    this.completedAt = new Date();
  }
  
  return progress;
};

// Check if lesson is completed
progressSchema.methods.isLessonCompleted = function(moduleId, lessonId) {
  return this.completedLessons.some(
    lesson => lesson.moduleId.toString() === moduleId.toString() && 
              lesson.lessonId.toString() === lessonId.toString()
  );
};

// Mark lesson as completed
progressSchema.methods.markLessonCompleted = function(moduleId, lessonId, timeSpent = 0) {
  // Check if already completed
  if (this.isLessonCompleted(moduleId, lessonId)) {
    return false;
  }
  
  this.completedLessons.push({
    moduleId,
    lessonId,
    timeSpent,
    completedAt: new Date()
  });
  
  this.timeSpent += timeSpent;
  this.lastAccessedAt = new Date();
  
  return true;
};

module.exports = mongoose.model('Progress', progressSchema);
