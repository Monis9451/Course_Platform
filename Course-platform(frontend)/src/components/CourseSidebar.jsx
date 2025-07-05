import React, { useState } from 'react'

const CourseSidebar = ({ courseData, selectedLesson, onLessonSelect }) => {
  // State to track completed lessons
  const [completedLessons, setCompletedLessons] = useState(new Set(['0-0'])) // Start with first lesson completed
  
  // Calculate total lessons
  const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0)
  
  // Calculate progress percentage
  const progressPercentage = Math.round((completedLessons.size / totalLessons) * 100)
  
  // Toggle lesson completion
  const toggleLessonCompletion = (moduleIndex, lessonIndex, event) => {
    event.stopPropagation() // Prevent lesson selection when clicking the circle
    const lessonKey = `${moduleIndex}-${lessonIndex}`
    setCompletedLessons(prev => {
      const newSet = new Set(prev)
      if (newSet.has(lessonKey)) {
        newSet.delete(lessonKey)
      } else {
        newSet.add(lessonKey)
      }
      return newSet
    })
  }

  return (
    <div className="w-80 bg-cream h-screen overflow-y-auto">
      {/* Header with back arrow and menu */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Progress Section */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="text-2xl font-bold text-gray-900 mb-1">{progressPercentage}% COMPLETE</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content List */}
      <div className="p-4">
        {courseData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-6">
            {/* Module Title */}
            <div className="mb-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                {module.title}
              </h3>
            </div>

            {/* Module Lessons */}
            <div className="space-y-2">
              {module.lessons.map((lesson, lessonIndex) => (
                <button
                  key={lessonIndex}
                  onClick={() => onLessonSelect(moduleIndex, lessonIndex)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center ${
                    selectedLesson?.moduleIndex === moduleIndex && 
                    selectedLesson?.lessonIndex === lessonIndex
                      ? 'bg-primary text-white'
                      : 'hover:bg-white text-black'
                  }`}
                >
                  {/* Status Circle */}
                  <div className="mr-3 flex-shrink-0">
                    <button
                      onClick={(e) => toggleLessonCompletion(moduleIndex, lessonIndex, e)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors hover:scale-110 ${
                        completedLessons.has(`${moduleIndex}-${lessonIndex}`)
                          ? 'border-black bg-black'
                          : selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                          ? 'border-white bg-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {/* Show checkmark for completed lessons */}
                      {completedLessons.has(`${moduleIndex}-${lessonIndex}`) ? (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : selectedLesson?.moduleIndex === moduleIndex && 
                         selectedLesson?.lessonIndex === lessonIndex ? (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      ) : null}
                    </button>
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${
                      selectedLesson?.moduleIndex === moduleIndex && 
                      selectedLesson?.lessonIndex === lessonIndex
                        ? 'text-white'
                        : completedLessons.has(`${moduleIndex}-${lessonIndex}`)
                        ? 'text-black'
                        : 'text-gray-900'
                    } ${
                      completedLessons.has(`${moduleIndex}-${lessonIndex}`) 
                        ? 'line-through opacity-70' 
                        : ''
                    }`}>
                       {lesson.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar
