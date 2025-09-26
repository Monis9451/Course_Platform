// Static data for course bundle and shared content across all courses
export const staticCourseData = {
  // Course 32 - Bundle course (remains completely static)
  32: {
    id: 32,
    title: "Unburdening Love + Trauma",
    subtitle: "The 12-Week Self-Paced Healing Bundle",
    description: "Heal Emotional Wounds, Reclaim Self-Worth & Create Conscious Relationships",
    tagline: "Complete Transformation in Just 12 Weeks",
    additionalTagline: "Holistic Healing Journey for Deep, Lasting Change",
    fullDescription: "If you're carrying pain from the past that's affecting your present, whether in love, in life, or in your relationship with yourself, this bundle is for you. The Healing Bundle combines Unburdening Love and Unburdening Trauma, two deeply complementary Workshop designed by trauma-informed psychologist Dr Samina. This 12-week, self-paced journey will guide you through healing emotional wounds, understanding your patterns, and building safe, loving relationships, starting with the one you have with yourself.",
    instructor: "Dr. Samina Khatun",
    duration: "12 weeks",
    lessons: 44,
    level: "ALL LEVELS",
    price: 120,
    originalPrice: 150,
    featured: true,
    img_src: "/3.png",
    img_alt: "Healing Bundle Course",
    benefits: [
      "Complete Emotional Healing: Address trauma patterns and relationship wounds in one comprehensive journey.",
      "Nervous System Regulation: Learn to reconnect with your body and regulate your emotional responses.",
      "Inner Child Healing: Address emotional wounds rooted in childhood experiences and early relationships.",
      "Healthy Relationship Patterns: Build conscious, self-led approaches to love and connection.",
      "Self-Worth Reclamation: Develop a strong, loving relationship with yourself as the foundation for all other relationships.",
      "Lasting Transformation: Build practices that support ongoing growth, resilience, and emotional freedom."
    ],
    modules: [
      {
        id: 1,
        title: "Unburdening Trauma & the Body",
        description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free"
      },
      {
        id: 2,
        title: "Reconnecting with the Body",
        description: "Coming Back to Yourself – Safety, Sensation, and Presence"
      },
      {
        id: 3,
        title: "Inner Child Healing",
        description: "Reclaiming the Parts of You That Still Hurt"
      },
      {
        id: 4,
        title: "Rewriting the Story",
        description: "Challenging Limiting Beliefs and Thought Loops"
      },
      {
        id: 5,
        title: "Releasing Emotional Baggage",
        description: "Letting Go of What You've Been Carrying"
      },
      {
        id: 6,
        title: "Integration & Forward Momentum",
        description: "Staying Connected to Growth, Resilience, and Self-Love"
      },
      {
        id: 7,
        title: "Understanding Love Blocks",
        description: "Identifying the Patterns That Keep You from Love"
      },
      {
        id: 8,
        title: "Attachment & Connection",
        description: "Healing Your Relationship Blueprint"
      },
      {
        id: 9,
        title: "Self-Worth in Love",
        description: "Building a Foundation of Healthy Self-Love"
      },
      {
        id: 10,
        title: "Boundaries & Communication",
        description: "Creating Safe, Respectful Connections"
      },
      {
        id: 11,
        title: "Conscious Relationships",
        description: "Moving from Reactive to Intentional Love"
      },
      {
        id: 12,
        title: "Living in Love",
        description: "Integrating Healing into Daily Life and Relationships"
      }
    ],
    whyDifferent: [
      {
        title: "Complete Transformation",
        description: "Address both trauma healing and relationship patterns in one comprehensive, integrated Workshop."
      },
      {
        title: "Expert-Led",
        description: "Created by a trauma-informed psychologist with years of experience in emotional healing and relationship therapy."
      },
      {
        title: "Exceptional Value",
        description: "Get both Workshop for less than the cost of one therapy session - normally £150 when purchased separately."
      },
      {
        title: "Self-Paced",
        description: "Complete the 12-week journey at your own pace with lifetime access to all materials."
      },
      {
        title: "Holistic Approach",
        description: "Combining both Workshop offers a complete path to healing that addresses emotional pain at the root, then helps you build healthier connections."
      }
    ],
    testimonials: [
      {
        text: "I started with trauma, and then moved into love. The combination changed everything. I finally understand myself and I feel hopeful again.",
        author: "Layla R."
      },
      {
        text: "The love Workshop gave me the relationship tools I never got growing up, but the trauma Workshop gave me the emotional grounding to actually use them.",
        author: "Ben C."
      }
    ],
    bonuses: [
      "Unburdening Trauma (6 Weeks): A body-based healing Workshop focused on emotional release, nervous system regulation, and inner child healing",
      "Unburdening Love (6 Weeks): A relationship-focused journey into attachment, boundaries, and self-worth in love",
      "12 Voice-Led Modules guided by Dr Samina",
      "Downloadable Worksheets, Tools & Prompts to support your healing",
      "Meditations & Visualisations designed to deepen emotional transformation",
      "Email Access to Dr Samina for Workshop-related support"
    ],
    faqs: [
      {
        id: 1,
        question: "Do I need to do the courses in a specific order?",
        answer: "You can start where it feels right, but we recommend beginning with Unburdening Trauma if you're navigating emotional overwhelm or early wounds, and Unburdening Love if your focus is more on relationships.",
        icon: "📋"
      },
      {
        id: 2,
        question: "Is this bundle therapy?",
        answer: "No. These are educational and therapeutic-style courses designed for self-reflection and growth. They are not a substitute for therapy, but they can complement therapy well.",
        icon: "🧠"
      },
      {
        id: 3,
        question: "How long do I have access?",
        answer: "You'll receive lifetime access to both courses and all materials.",
        icon: "⏰"
      },
      {
        id: 4,
        question: "Is there a refund policy?",
        answer: "Due to the digital nature of the Workshop, refunds are not available. You'll have immediate, permanent access to all content upon purchase.",
        icon: "💰"
      },
      {
        id: 5,
        question: "Is support available?",
        answer: "Yes, you'll have email access to Dr Samina for any Workshop-related questions or clarifications.",
        icon: "💬"
      }
    ]
  }
};

// Shared static content for all courses
export const sharedStaticContent = {
  // Default "What's Included" section - used for courses that don't have custom bonuses
  defaultWhatIncluded: [
    "Voice-Led Structured Workshop: Be guided by Dr. Samina as she walks you through each module with clarity and compassion.",
    "Exclusive Meditations & Visualisations: Deepen your healing with supportive audio practices throughout the journey.",
    "Downloadable Materials: Access printable worksheets, reflection tools, and healing exercises to track your progress.",
    "Journal Prompts & Body-Based Practices: Build awareness and transformation with carefully designed, trauma-informed exercises."
  ],

  // Default FAQ section - used for courses that don't have custom FAQs
  defaultFaqs: [
    {
      id: 1,
      question: "Is there a refund policy for this Workshop?",
      answer: "Due to the nature of the Workshop, refunds are not available. Once purchased, you'll receive immediate access to all content. This Workshop is built to create meaningful transformation — if you commit to it, the results will follow.",
      icon: "💰"
    },
    {
      id: 2,
      question: "Do I need to be in therapy to take this Workshop?",
      answer: "Not at all. This Workshop is designed for anyone seeking to process and heal trauma. It can also complement your work in therapy if you're currently seeing a professional.",
      icon: "🧠"
    },
    {
      id: 3,
      question: "Is this Workshop suitable for people with no prior healing experience?",
      answer: "Yes. Whether you're just beginning your healing journey or have done work before, this Workshop provides accessible yet powerful tools for all levels.",
      icon: "🌱"
    },
    {
      id: 4,
      question: "How long will I have access to the materials?",
      answer: "You'll have lifetime access to all modules, audio practices, and downloads.",
      icon: "⏰"
    },
    {
      id: 5,
      question: "Is there support available during the Workshop?",
      answer: "Yes! You can contact Dr. Samina via email for any Workshop-related questions or clarification. Please note this is not a substitute for therapy. For clinical or personalised support, we recommend working with a licensed therapist.",
      icon: "💬"
    }
  ],

  // Default instructor info
  defaultInstructor: "Dr. Samina Khatun",
  
  // Default course features
  defaultFeatures: {
    level: "ALL LEVELS",
    accessType: "Lifetime Access",
    support: "Email Support",
    materials: "Downloadable Resources"
  }
};

// Helper function to check if a course is the bundle course
export const isBundleCourse = (courseId) => {
  return parseInt(courseId) === 32;
};

// Helper function to get bundle course IDs (courses that are included in the bundle)
export const getBundleCourseIds = () => {
  return [23, 30]; // Course 23 (Trauma) and Course 30 (Love) are included in the bundle
};