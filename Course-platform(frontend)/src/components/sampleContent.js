// Sample content structures for lessons
// This demonstrates how lesson content should be structured in the database

// Example 1: Simple text lesson with heading
export const sampleTextLesson = [
  {
    id: 'heading-1',
    type: 'heading',
    data: {
      title: 'Understanding Trauma',
      content: 'Understanding Trauma'
    }
  },
  {
    id: 'text-1',
    type: 'text',
    data: {
      title: 'Introduction',
      content: 'Trauma is a deeply distressing or disturbing experience that can have lasting effects on an individual\'s mental, physical, and emotional well-being...'
    }
  }
];

// Example 2: Multi-component lesson with different types
export const sampleMultiComponentLesson = [
  {
    id: 'heading-1',
    type: 'heading',
    data: {
      content: 'Healing Journey - Part 1'
    }
  },
  {
    id: 'peach-box-1',
    type: 'peach_box',
    data: {
      boxTitle: 'Important Notice',
      paragraph: 'Before we begin this healing process, please ensure you are in a safe and comfortable environment.',
      italicLines: 'Take your time with this lesson'
    }
  },
  {
    id: 'text-1',
    type: 'text',
    data: {
      title: 'Setting Intentions',
      content: 'Setting clear intentions is the first step in any healing journey. Take a moment to reflect on what you hope to achieve...'
    }
  },
  {
    id: 'exercise-box-1',
    type: 'exercise_box',
    data: {
      title: 'Reflection Exercise',
      situation: 'Think about your current state and what brought you to this healing journey.',
      questions: [
        {
          question: 'What are three things you hope to achieve through this course?',
          placeholder: 'Write your three goals here...'
        },
        {
          question: 'How do you currently feel about your healing journey?',
          placeholder: 'Describe your feelings...'
        }
      ]
    }
  },
  {
    id: 'checkbox-list-1',
    type: 'checkbox_list',
    data: {
      title: 'Daily Commitment',
      checkboxes: [
        { text: 'I commit to being present during this lesson', checked: false },
        { text: 'I will practice self-compassion throughout this process', checked: false },
        { text: 'I understand that healing takes time', checked: false }
      ]
    }
  }
];

// Example 3: Lesson with video and interactive elements
export const sampleVideoLesson = [
  {
    id: 'heading-1',
    type: 'heading',
    data: {
      content: 'Guided Meditation for Healing'
    }
  },
  {
    id: 'video-1',
    type: 'video',
    data: {
      title: 'Healing Meditation Video',
      videoUrl: 'https://example.com/meditation-video.mp4',
      description: 'A 10-minute guided meditation to help you connect with your inner healing wisdom.'
    }
  },
  {
    id: 'info-box-1',
    type: 'info_box',
    data: {
      title: 'Before You Begin',
      content: 'Find a quiet space where you won\'t be interrupted. Sit or lie down comfortably and close your eyes when ready.',
      type: 'info'
    }
  },
  {
    id: 'mark-complete-box-1',
    type: 'mark_complete_box',
    data: {
      title: 'Meditation Complete',
      description: 'After completing the meditation, take a moment to reflect on your experience.',
      question: 'How do you feel after this meditation?',
      checkboxes: [
        { text: 'I completed the full meditation', checked: false },
        { text: 'I noticed changes in my breathing', checked: false },
        { text: 'I felt more centered and grounded', checked: false }
      ]
    }
  }
];

// How to use these examples:
// 1. Store in database as JSON string: JSON.stringify(sampleTextLesson)
// 2. The DynamicContentRenderer will parse and render automatically
// 3. Each component has a unique ID that maps to a specific component type

export const contentFormatGuide = {
  // Basic structure
  structure: 'Array of component objects',
  requiredFields: {
    id: 'Unique identifier mapping to component type',
    type: 'Component type (optional if ID mapping exists)',
    data: 'Component-specific data object'
  },
  
  // Available component IDs and their types
  availableComponents: {
    'heading-1': 'heading',
    'text-1': 'text',
    'video-1': 'video',
    'audio-1': 'audio',
    'image-1': 'image',
    'info-box-1': 'info_box',
    'peach-box-1': 'peach_box',
    'gray-box-1': 'gray_box',
    'exercise-box-1': 'exercise_box',
    'checkbox-list-1': 'checkbox_list',
    'mark-complete-box-1': 'mark_complete_box',
    'quiz-1': 'quiz',
    // ... and many more (see componentMapping.js for full list)
  },
  
  // Storage format in database
  databaseStorage: 'JSON string representation of the array',
  example: 'JSON.stringify([{id: "heading-1", data: {content: "My Lesson"}}])'
};
