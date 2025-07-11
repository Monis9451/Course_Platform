import React, { useState, useRef, useEffect } from 'react'
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
import Module4Lesson5 from '../components/UnburdingTrauma/Module4Lesson5'
import Module4Lesson6 from '../components/UnburdingTrauma/Module4Lesson6'
import Module4Lesson7 from '../components/UnburdingTrauma/Module4Lesson7'

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
import Module6Lesson6 from '../components/UnburdingTrauma/Module6Lesson6'
import Module6Lesson7 from '../components/UnburdingTrauma/Module6Lesson7'

const CourseContent_new = () => {
  const [selectedLesson, setSelectedLesson] = useState({ moduleIndex: 0, lessonIndex: 0 })
  const [completedLessons, setCompletedLessons] = useState(new Set([])) // Initialize with no lessons completed
  const [lessonProgress, setLessonProgress] = useState({}) // Track scroll progress for each lesson
  
  // Reference to the lesson content container
  const lessonContentRef = useRef(null)
  
  // Course data with all modules and lessons
  const courseData = {
    title: "Unburdening Trauma: A 6-Week Self Paced Programme",
    description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free",
    modules: [
      {
        title: "Understanding Trauma & the Body",
        description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free",
        lessons: [
          { title: "The Neuroscience: How trauma rewires the brain", component: Module1Lesson1 },
          { title: "The Nervous System & Trauma", component: Module1Lesson2 },
          { title: "Trauma Responses: Fight, Flight, Freeze, Fawn – How Trauma Manifests in Behaviour", component: Module1Lesson3 },
          { title: "Dissociation in PTSD: Depersonalisation, Derealisation, Dissociative Amnesia", component: Module1Lesson4 },
          { title: "Personal Trauma Timeline", component: Module1Lesson5 },
          { title: "Self-Assessment - Trauma Responses", component: Module1Lesson6 },
          { title: "Trauma Body Map", component: Module1Lesson7 },
          { title: "Guided Visualisation - Grounding & Nervous System Regulation", component: Module1Lesson8 }
        ]
      },
      {
        title: "Reconnecting with the Body - Coming Back to Yourself",
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
        title: "Inner Child Healing",
        description: "Reclaiming the Parts of You That Still Hurt",
        lessons: [
          { title: "Understanding the Inner Child and Emotional Wounds", component: Module3Lesson1 },
          { title: "How Childhood Pain Shapes Adult Patterns", component: Module3Lesson2 },
          { title: "Reparenting: Offering Compassion to the Self Within", component: Module3Lesson3 },
          { title: "Meet your Inner Child", component: Module3Lesson4 },
          { title: "What My Inner Child Needs to Hear", component: Module3Lesson5 },
          { title: "Creating a Self-Compassion Ritual", component: Module3Lesson6 },
          { title: "Letter to your inner child", component: Module3Lesson7 },
          { title: "Inner Child Healing Meditation", component: Module3Lesson8 }
        ]
      },
      {
        title: "The Inner Narrative",
        description: "\"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"",
        lessons: [
          { title: "The Inner Narrative: \"I'm Not Enough,\" \"I'm Unsafe,\" \"I'm Alone\"", component: Module4Lesson1 },
          { title: "How Trauma Shapes Beliefs About Self and Others", component: Module4Lesson2 },
          { title: "Transforming Inner Dialogue with Clarity and Compassion", component: Module4Lesson6 },
          { title: "Identifying Stuck Points", component: Module4Lesson3 },
          { title: "Reframing Negative Beliefs", component: Module4Lesson5 },
          { title: "Taking Small Bold Actions", component: Module4Lesson4 },
          { title: "Empowerment Meditation", component: Module4Lesson7 }
        ]
      },
      {
        title: "Releasing Emotional Baggage",
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
        title: "Integration & Forward Momentum",
        description: "Staying Connected to Growth, Resilience, and Self-Love",
        lessons: [
          { title: "Creating Your Ongoing Healing Practice", component: Module6Lesson1 },
          { title: "Resilience Through Rhythm – Daily and Weekly Rituals", component: Module6Lesson2 },
          { title: "Visioning the Healed Self & Embracing Post-Trauma Growth", component: Module6Lesson3 },
          { title: "Healing Action Plan (Writing Practice)", component: Module6Lesson4 },
          { title: "Future-Self Reflection (Sentence Completion)", component: Module6Lesson5 },
          { title: "Building Your Community – Support and Connection", component: Module6Lesson6 },
          { title: "Integration Meditation", component: Module6Lesson7 }
        ]
      }
    ]
  }

  const handleLessonSelect = (moduleIndex, lessonIndex) => {
    // Check if this is a different lesson than the current one
    if (selectedLesson.moduleIndex !== moduleIndex || selectedLesson.lessonIndex !== lessonIndex) {
      setSelectedLesson({ moduleIndex, lessonIndex });
      
      // Reset scroll position when changing lessons
      if (lessonContentRef.current) {
        lessonContentRef.current.scrollTop = 0;
      }
    }
  }

  // Navigation functions
  const goToPreviousLesson = () => {
    const { moduleIndex, lessonIndex } = selectedLesson
    
    if (lessonIndex > 0) {
      // Go to previous lesson in same module
      setSelectedLesson({ moduleIndex, lessonIndex: lessonIndex - 1 })
    } else if (moduleIndex > 0) {
      // Go to last lesson of previous module
      const prevModule = courseData.modules[moduleIndex - 1]
      setSelectedLesson({ moduleIndex: moduleIndex - 1, lessonIndex: prevModule.lessons.length - 1 })
    }
    
    // Reset scroll position
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTop = 0;
    }
  }

  const completeAndContinue = () => {
    const { moduleIndex, lessonIndex } = selectedLesson
    const lessonKey = `${moduleIndex}-${lessonIndex}`
    
    // Mark current lesson as completed
    setCompletedLessons(prev => new Set([...prev, lessonKey]))
    
    // Set progress to 100% for this lesson
    setLessonProgress(prev => ({
      ...prev,
      [lessonKey]: 100
    }));
    
    // Navigate to next lesson
    const currentModule = courseData.modules[moduleIndex]
    if (lessonIndex < currentModule.lessons.length - 1) {
      // Go to next lesson in same module
      setSelectedLesson({ moduleIndex, lessonIndex: lessonIndex + 1 })
    } else if (moduleIndex < courseData.modules.length - 1) {
      // Go to first lesson of next module
      setSelectedLesson({ moduleIndex: moduleIndex + 1, lessonIndex: 0 })
    }
    
    // Reset scroll position
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTop = 0;
    }
  }

  // Check if navigation buttons should be disabled
  const isFirstLesson = selectedLesson.moduleIndex === 0 && selectedLesson.lessonIndex === 0
  const isLastLesson = selectedLesson.moduleIndex === courseData.modules.length - 1 && 
                      selectedLesson.lessonIndex === courseData.modules[courseData.modules.length - 1].lessons.length - 1

  // Get the current lesson component
  const getCurrentLessonComponent = () => {
    const currentModule = courseData.modules[selectedLesson.moduleIndex]
    const currentLesson = currentModule?.lessons[selectedLesson.lessonIndex]
    const LessonComponent = currentLesson?.component
    
    return (
      <div className="flex flex-col h-full">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <button
            onClick={goToPreviousLesson}
            disabled={isFirstLesson}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isFirstLesson 
                ? 'text-[#6B7280] cursor-not-allowed' 
                : 'text-[#6B7280] hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous Lecture
          </button>

          <button
            onClick={completeAndContinue}
            disabled={isLastLesson}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLastLesson
                ? 'text-[#6B7280] cursor-not-allowed'
                : 'text-[#6B7280] hover:bg-primary-dark'
            }`}
          >
            Complete and Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto" ref={lessonContentRef}>
          <div className="pb-48 px-8 md:px-16 lg:px-24">
            {LessonComponent ? <LessonComponent /> : (
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to {courseData.title}
                </h1>
                <p className="text-lg text-gray-600">
                  Select a lesson from the sidebar to begin your learning journey.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Effect to track scroll progress for the current lesson
  useEffect(() => {
    if (!lessonContentRef.current) return;
    
    const lessonKey = `${selectedLesson.moduleIndex}-${selectedLesson.lessonIndex}`;
    const scrollContainer = lessonContentRef.current;
    
    // Function to calculate scroll percentage
    const calculateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      
      // Calculate how far we've scrolled as a percentage
      // scrollHeight - clientHeight = total scrollable distance
      const scrollableDistance = scrollHeight - clientHeight;
      if (scrollableDistance <= 0) return 0; // If no scrollable content, don't mark it as complete automatically
      
      const scrollPercentage = Math.min(100, Math.ceil((scrollTop / scrollableDistance) * 100));
      
      // Only update if the new progress is higher than the previous
      setLessonProgress(prev => {
        const currentProgress = prev[lessonKey] || 0;
        if (scrollPercentage > currentProgress) {
          // If progress is more than 95%, consider lesson as fully completed
          if (scrollPercentage > 95) {
            // Add to completed lessons
            setCompletedLessons(prevCompleted => new Set([...prevCompleted, lessonKey]));
            return { ...prev, [lessonKey]: 100 }; // Set to 100% for visual completeness
          }
          
          return { ...prev, [lessonKey]: scrollPercentage };
        }
        return prev;
      });
    };
    
    // Attach scroll event listener
    scrollContainer.addEventListener('scroll', calculateScrollProgress);
    
    // We'll skip the initial calculation to prevent auto-completing lessons
    // when they first load, user needs to scroll to show progress
    
    // Cleanup
    return () => {
      scrollContainer.removeEventListener('scroll', calculateScrollProgress);
    };
  }, [selectedLesson, setCompletedLessons]);

  return (
    <>
      {/* Add Marcellus font styles */}
      <style>{fontStyle}</style>
      
      <div className="flex flex-col h-screen bg-gray-50 marcellus-font">
        {/* Course Header - Full Width */}
        <div className="bg-primary text-white px-6 py-8 w-full">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            <h1 className="text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">{courseData.title}</h1>
            
            {/* Empty div for balance */}
            <div></div>
          </div>
        </div>

        {/* Add custom CSS for scrolling */}
        <style>{`
          .custom-scrollbar::-webkit-scrollbar-track {
            margin-bottom: 80px;
          }
        `}</style>
        
        {/* Content Area with Sidebar and Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="sidebar-container h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
            <CourseSidebar 
              courseData={courseData}
              selectedLesson={selectedLesson}
              onLessonSelect={handleLessonSelect}
              completedLessons={completedLessons}
              setCompletedLessons={setCompletedLessons}
              lessonProgress={lessonProgress}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            {getCurrentLessonComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseContent_new
