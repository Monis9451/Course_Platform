import React, { useState } from 'react'
import CourseSidebar from '../components/CourseSidebar'

// Import all lesson components
import Module1Lesson1 from '../components/UnburdingTrauma/Module1Lesson1'
import Module1Lesson2 from '../components/UnburdingTrauma/Module1Lesson2'
import Module1Lesson3 from '../components/UnburdingTrauma/Module1Lesson3'
import Module1Lesson4 from '../components/UnburdingTrauma/Module1Lesson4'
import Module1Lesson5 from '../components/UnburdingTrauma/Module1Lesson5'
import Module1Lesson6 from '../components/UnburdingTrauma/Module1Lesson6'
import Module1Lesson7 from '../components/UnburdingTrauma/Module1Lesson7'

import Module2Lesson1 from '../components/UnburdingTrauma/Module2Lesson1'
import Module2Lesson2 from '../components/UnburdingTrauma/Module2Lesson2'
import Module2Lesson3 from '../components/UnburdingTrauma/Module2Lesson3'
import Module2Lesson4 from '../components/UnburdingTrauma/Module2Lesson4'
import Module2Lesson5 from '../components/UnburdingTrauma/Module2Lesson5'
import Module2Lesson6 from '../components/UnburdingTrauma/Module2Lesson6'

import Module3Lesson1 from '../components/UnburdingTrauma/Module3Lesson1'
import Module3Lesson2 from '../components/UnburdingTrauma/Module3Lesson2'
import Module3Lesson3 from '../components/UnburdingTrauma/Module3Lesson3'
import { Module3Lesson4, Module3Lesson5, Module3Lesson6, Module3Lesson7 } from '../components/UnburdingTrauma/Module3Lessons'

import { 
  Module4Lesson1, Module4Lesson2, Module4Lesson3, Module4Lesson4, 
  Module4Lesson5, Module4Lesson6, Module4Lesson7 
} from '../components/UnburdingTrauma/Module4Lessons'

import { 
  Module5Lesson1, Module5Lesson2, Module5Lesson3, Module5Lesson4, 
  Module5Lesson5, Module5Lesson6, Module5Lesson7 
} from '../components/UnburdingTrauma/Module5Lessons'

import { 
  Module6Lesson1, Module6Lesson2, Module6Lesson3, Module6Lesson4, Module6Lesson5 
} from '../components/UnburdingTrauma/Module6Lessons'

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
          { title: "Lesson 1: The Neuroscience: How trauma rewires the brain", component: Module1Lesson1 },
          { title: "Lesson 2: The Nervous System & Trauma", component: Module1Lesson2 },
          { title: "Lesson 3: Trauma Responses: Fight, Flight, Freeze, Fawn – How Trauma Manifests in Behaviour", component: Module1Lesson3 },
          { title: "Lesson 4: Dissociation in PTSD: Depersonalisation, Derealisation, Dissociative Amnesia", component: Module1Lesson4 },
          { title: "Lesson 5: Personal Trauma Timeline", component: Module1Lesson5 },
          { title: "Lesson 6: Self-Assessment - Trauma Responses", component: Module1Lesson6 },
          { title: "Lesson 7: Trauma Body Map", component: Module1Lesson7 }
        ]
      },
      {
        title: "Module 2: Reconnecting with the Body - Coming Back to Yourself",
        description: "Safety, Sensation, and Presence",
        lessons: [
          { title: "Lesson 1: Why Trauma Disconnects Us from the Body", component: Module2Lesson1 },
          { title: "Lesson 2: Felt Sense & Body Awareness: Listening to Inner Signals", component: Module2Lesson2 },
          { title: "Lesson 3: Grounding Through the Senses: Touch, Movement, Breath", component: Module2Lesson3 },
          { title: "Lesson 4: Safe Space Visualisation", component: Module2Lesson4 },
          { title: "Lesson 5: Somatic Reflection – When Do I Feel Safe?", component: Module2Lesson5 },
          { title: "Lesson 6: Mindful Movement Practice", component: Module2Lesson6 }
        ]
      },
      {
        title: "Module 3: Inner Child Healing",
        description: "Reclaiming the Parts of You That Still Hurt",
        lessons: [
          { title: "Lesson 1: Understanding the Inner Child and Emotional Wounds", component: Module3Lesson1 },
          { title: "Lesson 2: How Childhood Pain Shapes Adult Patterns", component: Module3Lesson2 },
          { title: "Lesson 3: Reparenting: Offering Compassion to the Self Within", component: Module3Lesson3 },
          { title: "Lesson 4: Meet your Inner Child", component: Module3Lesson4 },
          { title: "Lesson 5: What My Inner Child Needs to Hear", component: Module3Lesson5 },
          { title: "Lesson 6: Creating a Self-Compassion Ritual", component: Module3Lesson6 },
          { title: "Lesson 7: Letter to your Inner Child", component: Module3Lesson7 }
        ]
      },
      {
        title: "Module 4: The Inner Narrative",
        description: "\"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"",
        lessons: [
          { title: "Lesson 1: The Inner Narrative: \"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"", component: Module4Lesson1 },
          { title: "Lesson 2: How Trauma Shapes Beliefs About Self and Others", component: Module4Lesson2 },
          { title: "Lesson 3: Transforming Inner Dialogue with Clarity and Compassion", component: Module4Lesson3 },
          { title: "Lesson 4: Identifying Stuck Points", component: Module4Lesson4 },
          { title: "Lesson 5: Reframing Stuck Points", component: Module4Lesson5 },
          { title: "Lesson 6: Taking Small Bold Actions", component: Module4Lesson6 },
          { title: "Lesson 7: Empowerment Meditation", component: Module4Lesson7 }
        ]
      },
      {
        title: "Module 5: Releasing Emotional Baggage",
        description: "Letting Go of What You've Been Carrying",
        lessons: [
          { title: "Lesson 1: The Cost of Suppressed Emotions", component: Module5Lesson1 },
          { title: "Lesson 2: Emotional Energy & How the Body Stores Pain", component: Module5Lesson2 },
          { title: "Lesson 3: Release as a Path to Freedom and Wholeness", component: Module5Lesson3 },
          { title: "Lesson 4: Writing to Release", component: Module5Lesson4 },
          { title: "Lesson 5: Drawing Your Emotions", component: Module5Lesson5 },
          { title: "Lesson 6: Breathwork for Emotional Clearing", component: Module5Lesson6 },
          { title: "Lesson 7: Guided Release Meditation", component: Module5Lesson7 }
        ]
      },
      {
        title: "Module 6: Integration & Forward Momentum",
        description: "Staying Connected to Growth, Resilience, and Self-Love",
        lessons: [
          { title: "Lesson 1: Creating Your Ongoing Healing Practice", component: Module6Lesson1 },
          { title: "Lesson 2: Resilience Through Rhythm – Daily and Weekly Rituals", component: Module6Lesson2 },
          { title: "Lesson 3: Visioning the Healed Self & Embracing Post-Trauma Growth", component: Module6Lesson3 },
          { title: "Lesson 4: Healing Action Plan (Writing Practice)", component: Module6Lesson4 },
          { title: "Lesson 5: Future-Self Reflection (Sentence Completion)", component: Module6Lesson5 }
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
    <div className="flex h-screen bg-gray-50">
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
  )
}

export default CourseContent_new
