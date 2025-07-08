import React, { useState } from 'react'
import CourseSidebar from '../components/CourseSidebar'

// Import Marcellus font for this page only
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
  
  .marcellus-font {
    font-family: 'Marcellus', serif;
  }
  
  .marcellus-font * {
    font-family: 'Marcellus', serif !important;
  }
`;

// Import all lesson components
import Module1Lesson1 from '../components/UnburdingTrauma/Module1Lesson1'
import Module1Lesson2 from '../components/UnburdingTrauma/Module1Lesson2'
import Module1Lesson3 from '../components/UnburdingTrauma/Module1Lesson3'
import Module1Lesson4 from '../components/UnburdingTrauma/Module1Lesson4'
import Module1Lesson5 from '../components/UnburdingTrauma/Module1Lesson5'
import Module1Lesson6 from '../components/UnburdingTrauma/Module1Lesson6'
import Module1Lesson7 from '../components/UnburdingTrauma/Module1Lesson7'
import Module1Lesson8 from '../components/UnburdingTrauma/Module1Lesson8'

import Module2Lesson1 from '../components/UnburdingTrauma/Module2Lesson1'
import Module2Lesson2 from '../components/UnburdingTrauma/Module2Lesson2'
import Module2Lesson3 from '../components/UnburdingTrauma/Module2Lesson3'
import Module2Lesson4 from '../components/UnburdingTrauma/Module2Lesson4'
import Module2Lesson5 from '../components/UnburdingTrauma/Module2Lesson5'
import Module2Lesson6 from '../components/UnburdingTrauma/Module2Lesson6'
import Module2Lesson7 from '../components/UnburdingTrauma/Module2Lesson7'

import Module3Lesson1 from '../components/UnburdingTrauma/Module3Lesson1'
import Module3Lesson2 from '../components/UnburdingTrauma/Module3Lesson2'
import Module3Lesson3 from '../components/UnburdingTrauma/Module3Lesson3'
import Module3Lesson4 from '../components/UnburdingTrauma/Module3Lesson4'
import Module3Lesson5 from '../components/UnburdingTrauma/Module3Lesson5'
import Module3Lesson6 from '../components/UnburdingTrauma/Module3Lesson6'
import Module3Lesson7 from '../components/UnburdingTrauma/Module3Lesson7'
import Module3Lesson8 from '../components/UnburdingTrauma/Module3Lesson8'

import Module4Lesson1 from '../components/UnburdingTrauma/Module4Lesson1'
import Module4Lesson2 from '../components/UnburdingTrauma/Module4Lesson2'
import Module4Lesson3 from '../components/UnburdingTrauma/Module4Lesson3'
import Module4Lesson4 from '../components/UnburdingTrauma/Module4Lesson4'
import Module4Lesson5 from '../components/UnburdingTrauma/Module4Lesson3'

import Module5Lesson1 from '../components/UnburdingTrauma/Module5Lesson1'
import Module5Lesson2 from '../components/UnburdingTrauma/Module5Lesson2'
import Module5Lesson3 from '../components/UnburdingTrauma/Module5Lesson3'
import Module5Lesson4 from '../components/UnburdingTrauma/Module5Lesson4'
import Module5Lesson5 from '../components/UnburdingTrauma/Module5Lesson5'
import Module5Lesson6 from '../components/UnburdingTrauma/Module5Lesson6'
import Module5Lesson7 from '../components/UnburdingTrauma/Module5Lesson7'

import Module6Lesson1 from '../components/UnburdingTrauma/Module6Lesson1'
import Module6Lesson2 from '../components/UnburdingTrauma/Module6Lesson2'
import Module6Lesson3 from '../components/UnburdingTrauma/Module6Lesson3'
import Module6Lesson4 from '../components/UnburdingTrauma/Module6Lesson4'
import Module6Lesson5 from '../components/UnburdingTrauma/Module6Lesson5'

const CourseContent_new = () => {
  const [selectedLesson, setSelectedLesson] = useState({ moduleIndex: 0, lessonIndex: 0 })

  // Course data with all modules and lessons
  const courseData = {
    title: "Understanding Trauma: A 6-Week Self Paced Programme",
    description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free",
    modules: [
      {
        title: "Module 1: Understanding Trauma & the Body",
        description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free",
        lessons: [
          { title: "The Neuroscience: How trauma rewires the brain", component: Module1Lesson1 },
          { title: "The Nervous System & Trauma", component: Module1Lesson2 },
          { title: "Trauma Responses: Fight, Flight, Freeze, Fawn – How Trauma Manifests in Behaviour", component: Module1Lesson3 },
          { title: "Dissociation in PTSD: Depersonalisation, Derealisation, Dissociative Amnesia", component: Module1Lesson4 },
          { title: "Personal Trauma Timeline", component: Module1Lesson5 },
          { title: "Self-Assessment - Trauma Responses", component: Module1Lesson6 },
          { title: "Somatic Mapping Exercise", component: Module1Lesson7 },
          { title: "Guided Visualisation - Grounding & Nervous System Regulation", component: Module1Lesson8 }
        ]
      },
      {
        title: "Module 2: Reconnecting with the Body - Coming Back to Yourself",
        description: "Safety, Sensation, and Presence",
        lessons: [
          { title: "Why Trauma Disconnects Us from the Body", component: Module2Lesson1 },
          { title: "Felt Sense & Body Awareness: Listening to Inner Signals", component: Module2Lesson2 },
          { title: "Grounding Through the Senses: Touch, Movement, Breath", component: Module2Lesson3 },
          { title: "Safe Space Visualisation", component: Module2Lesson4 },
          { title: "Somatic Reflection – When Do I Feel Present?", component: Module2Lesson5 },
          { title: "Mindful Movement Practice", component: Module2Lesson6 },
          { title: "Body Awareness Meditation", component: Module2Lesson7 }
        ]
      },
      {
        title: "Module 3: Inner Child Healing",
        description: "Reclaiming the Parts of You That Still Hurt",
        lessons: [
          { title: "Understanding the Inner Child and Emotional Wounds", component: Module3Lesson1 },
          { title: "How Childhood Pain Shapes Adult Patterns", component: Module3Lesson2 },
          { title: "Reparenting: Offering Compassion to the Self Within", component: Module3Lesson3 },
          { title: "Meet your Inner Child", component: Module3Lesson4 },
          { title: "What My Inner Child Needs to Hear", component: Module3Lesson5 },
          { title: "Creating a Self-Compassion Ritual", component: Module3Lesson6 },
          { title: "Letter to your Inner Child", component: Module3Lesson7 },
          { title: "Building Your Community – Support and Connection", component: Module3Lesson8 }
        ]
      },
      {
        title: "Module 4: The Inner Narrative",
        description: "\"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"",
        lessons: [
          { title: "The Inner Narrative: \"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"", component: Module4Lesson1 },
          { title: "How Trauma Shapes Beliefs About Self and Others", component: Module4Lesson2 },
          { title: "Reframing Stuck Points", component: Module4Lesson3 },
          { title: "Taking Small Bold Actions", component: Module4Lesson4 },
          { title: "Integration Meditation", component: Module4Lesson5 }
        ]
      },
      {
        title: "Module 5: Releasing Emotional Baggage",
        description: "Letting Go of What You've Been Carrying",
        lessons: [
          { title: "The Cost of Suppressed Emotions", component: Module5Lesson1 },
          { title: "Emotional Energy & How the Body Stores Pain", component: Module5Lesson2 },
          { title: "Release as a Path to Freedom and Wholeness", component: Module5Lesson3 },
          { title: "Writing to Release", component: Module5Lesson4 },
          { title: "Drawing Your Emotions", component: Module5Lesson5 },
          { title: "Breathwork for Emotional Clearing", component: Module5Lesson6 },
          { title: "Guided Release Meditation", component: Module5Lesson7 }
        ]
      },
      {
        title: "Module 6: Integration & Forward Momentum",
        description: "Staying Connected to Growth, Resilience, and Self-Love",
        lessons: [
          { title: "Creating Your Ongoing Healing Practice", component: Module6Lesson1 },
          { title: "Resilience Through Rhythm – Daily and Weekly Rituals", component: Module6Lesson2 },
          { title: "Visioning the Healed Self & Embracing Post-Trauma Growth", component: Module6Lesson3 },
          { title: "Healing Action Plan (Writing Practice)", component: Module6Lesson4 },
          { title: "Future-Self Reflection (Sentence Completion)", component: Module6Lesson5 }
        ]
      }
    ]
  }

  const handleLessonSelect = (moduleIndex, lessonIndex) => {
    setSelectedLesson({ moduleIndex, lessonIndex })
  }

  // Get the current lesson component
  const getCurrentLessonComponent = () => {
    const currentModule = courseData.modules[selectedLesson.moduleIndex]
    const currentLesson = currentModule?.lessons[selectedLesson.lessonIndex]
    const LessonComponent = currentLesson?.component
    
    return LessonComponent ? <LessonComponent /> : (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to {courseData.title}
        </h1>
        <p className="text-lg text-gray-600">
          Select a lesson from the sidebar to begin your learning journey.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Add Marcellus font styles */}
      <style>{fontStyle}</style>
      
      <div className="flex h-screen bg-gray-50 marcellus-font">
        {/* Sidebar */}
        <CourseSidebar 
          courseData={courseData}
          selectedLesson={selectedLesson}
          onLessonSelect={handleLessonSelect}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {getCurrentLessonComponent()}
        </div>
      </div>
    </>
  )
}

export default CourseContent_new
