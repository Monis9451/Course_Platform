const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: "Understanding Trauma",
    subtitle: "A 6-Week Self-Paced Course",
    description: "Break free from trauma patterns and discover deep healing with evidence-based techniques in this comprehensive self-paced program.",
    fullDescription: "Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",
    instructor: "Dr. Samina Khatun",
    instructorBio: "Dr. Samina Khatun is a licensed clinical psychologist with over 15 years of experience in trauma therapy and healing.",
    price: 75,
    originalPrice: 99,
    duration: "6 weeks",
    level: "ALL LEVELS",
    category: "TRAUMA HEALING",
    tags: ["trauma", "healing", "psychology", "self-paced"],
    language: "English",
    featured: true,
    published: true,
    thumbnail: {
      url: "/1.png"
    },
    whatYouWillLearn: [
      "Understanding the neuroscience of trauma",
      "Recognizing trauma responses in daily life",
      "Developing emotional regulation skills",
      "Creating healthy coping mechanisms",
      "Building resilience and post-traumatic growth",
      "Establishing healthy boundaries"
    ],
    requirements: [
      "No prior knowledge required",
      "Open mind and willingness to self-reflect",
      "Commitment to complete weekly modules"
    ],
    targetAudience: [
      "Individuals seeking trauma healing",
      "Mental health professionals",
      "Anyone interested in psychological wellness"
    ],
    modules: [
      {
        title: "Understanding Trauma – How It Affects the Mind & Body",
        description: "Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",
        order: 1,
        lessons: [
          {
            title: "The Neuroscience of Trauma",
            description: "Explore how trauma affects your brain and nervous system, and why understanding these patterns is essential for healing.",
            content: "In this comprehensive lesson, we delve into the fascinating world of neuroscience to understand how trauma impacts our brain...",
            duration: "18 minutes",
            order: 1,
            resources: [
              {
                title: "Trauma Brain Diagram",
                url: "/resources/trauma-brain.pdf",
                type: "pdf"
              }
            ]
          },
          {
            title: "Trauma Responses and the Window of Tolerance",
            description: "Learn to recognize your unique trauma responses and how they affect your daily life.",
            content: "Understanding your window of tolerance is crucial for trauma recovery...",
            duration: "22 minutes",
            order: 2
          },
          {
            title: "Action - Detach",
            description: "Practical exercise to help you create space for healing by detaching from unhelpful patterns.",
            content: "This practical exercise will guide you through the process of detachment...",
            duration: "15 minutes",
            order: 3
          }
        ]
      },
      {
        title: "Recognizing Trauma Patterns",
        description: "Identifying how trauma shows up in your daily life and relationships",
        order: 2,
        lessons: [
          {
            title: "Identifying Triggers",
            description: "Learn to recognize what triggers your trauma responses",
            content: "Triggers are external or internal stimuli that activate our trauma responses...",
            duration: "20 minutes",
            order: 1
          },
          {
            title: "Relationship Patterns",
            description: "Understanding how trauma affects your relationships",
            content: "Trauma often creates patterns in how we relate to others...",
            duration: "25 minutes",
            order: 2
          }
        ]
      }
    ],
    enrollmentCount: 1247,
    rating: {
      average: 4.8,
      count: 156
    },
    reviews: [
      {
        rating: 5,
        comment: "This course completely transformed my understanding of trauma. The practical exercises were incredibly helpful.",
        createdAt: new Date('2024-01-15')
      },
      {
        rating: 4,
        comment: "Great content and well-structured. Dr. Khatun explains complex concepts in an easy-to-understand way.",
        createdAt: new Date('2024-02-20')
      }
    ],
    estimatedHours: 12
  },
  {
    title: "Understanding Love",
    subtitle: "A 6-Week Self-Paced Course",
    description: "A 6-Week Self-Paced Programme focused on building authentic relationships, understanding attachment styles, and creating healthy relationship patterns.",
    fullDescription: "Explore the psychology of love, attachment theory, and practical tools for building lasting, healthy relationships.",
    instructor: "Dr. Samina Khatun",
    instructorBio: "Dr. Samina Khatun is a licensed clinical psychologist with over 15 years of experience in trauma therapy and healing.",
    price: 75,
    originalPrice: 99,
    duration: "6 weeks",
    level: "ALL LEVELS",
    category: "RELATIONSHIPS",
    tags: ["relationships", "love", "attachment", "communication"],
    language: "English",
    featured: true,
    published: true,
    thumbnail: {
      url: "/love_course.png"
    },
    whatYouWillLearn: [
      "Understanding attachment styles",
      "Building secure relationships",
      "Effective communication techniques",
      "Recognizing healthy vs unhealthy patterns",
      "Self-love and self-compassion",
      "Conflict resolution skills"
    ],
    requirements: [
      "No prior knowledge required",
      "Willingness to examine your relationship patterns",
      "Commitment to practice new skills"
    ],
    targetAudience: [
      "Individuals seeking better relationships",
      "Couples looking to improve their connection",
      "Anyone interested in understanding love and attachment"
    ],
    modules: [
      {
        title: "The Science of Love and Attachment",
        description: "Understanding how we form connections and what drives our relationship patterns",
        order: 1,
        lessons: [
          {
            title: "Attachment Theory Basics",
            description: "Learn about the four attachment styles and how they shape relationships",
            content: "Attachment theory, developed by John Bowlby, explains how our early experiences...",
            duration: "20 minutes",
            order: 1
          },
          {
            title: "The Chemistry of Love",
            description: "Explore the neurochemical basis of love and attraction",
            content: "Love isn't just an emotion - it's a complex neurochemical process...",
            duration: "18 minutes",
            order: 2
          }
        ]
      },
      {
        title: "Building Secure Relationships",
        description: "Practical tools for creating and maintaining healthy relationships",
        order: 2,
        lessons: [
          {
            title: "Communication Fundamentals",
            description: "Master the art of effective communication in relationships",
            content: "Good communication is the foundation of any healthy relationship...",
            duration: "25 minutes",
            order: 1
          },
          {
            title: "Setting Healthy Boundaries",
            description: "Learn to establish and maintain boundaries that support connection",
            content: "Boundaries are not walls - they're bridges to healthier relationships...",
            duration: "22 minutes",
            order: 2
          }
        ]
      }
    ],
    enrollmentCount: 892,
    rating: {
      average: 4.7,
      count: 98
    },
    reviews: [
      {
        rating: 5,
        comment: "Amazing insights into relationships and attachment. This course helped me understand my patterns so much better.",
        createdAt: new Date('2024-01-20')
      }
    ],
    estimatedHours: 10
  },
  {
    title: "Mental Health Fundamentals",
    subtitle: "Building Emotional Resilience",
    description: "A comprehensive course on mental health awareness, emotional regulation, and building psychological resilience.",
    fullDescription: "Learn evidence-based techniques for managing mental health, understanding emotions, and building lasting resilience.",
    instructor: "Dr. Sarah Johnson",
    instructorBio: "Dr. Sarah Johnson is a psychiatrist and researcher specializing in mood disorders and resilience training.",
    price: 65,
    originalPrice: 85,
    duration: "4 weeks",
    level: "BEGINNER",
    category: "MENTAL HEALTH",
    tags: ["mental health", "resilience", "emotions", "wellness"],
    language: "English",
    featured: false,
    published: true,
    thumbnail: {
      url: "/mental-health.png"
    },
    whatYouWillLearn: [
      "Understanding mental health fundamentals",
      "Emotional regulation techniques",
      "Building resilience and coping skills",
      "Stress management strategies",
      "Mindfulness and meditation practices",
      "Creating sustainable wellness habits"
    ],
    requirements: [
      "No prerequisites needed",
      "Interest in personal mental wellness"
    ],
    targetAudience: [
      "Anyone interested in mental health",
      "Individuals seeking stress management",
      "People wanting to build resilience"
    ],
    modules: [
      {
        title: "Mental Health Foundations",
        description: "Understanding the basics of mental health and emotional well-being",
        order: 1,
        lessons: [
          {
            title: "What is Mental Health?",
            description: "Comprehensive overview of mental health and wellness",
            content: "Mental health encompasses our emotional, psychological, and social well-being...",
            duration: "15 minutes",
            order: 1
          }
        ]
      }
    ],
    enrollmentCount: 456,
    rating: {
      average: 4.6,
      count: 67
    },
    reviews: [],
    estimatedHours: 8
  }
];

const seedCourses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedCourses();
