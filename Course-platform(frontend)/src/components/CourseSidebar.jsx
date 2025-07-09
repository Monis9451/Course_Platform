import React from 'react'

const CourseSidebar = ({ courseData, selectedLesson, onLessonSelect, completedLessons, setCompletedLessons }) => {
  // Use completedLessons from props or fallback to default
  const currentCompletedLessons = completedLessons || new Set(['0-0'])
  const updateCompletedLessons = setCompletedLessons || (() => {})
  
  // Calculate total lessons
  const totalLessons = courseData.modules.reduce((total, module) => total + module.lessons.length, 0)
  
  // Calculate progress percentage
  const progressPercentage = Math.round((currentCompletedLessons.size / totalLessons) * 100)
  
  // Toggle lesson completion
  const toggleLessonCompletion = (moduleIndex, lessonIndex, event) => {
    event.stopPropagation() // Prevent lesson selection when clicking the circle
    const lessonKey = `${moduleIndex}-${lessonIndex}`
    updateCompletedLessons(prev => {
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
    <div className="w-80 bg-white h-screen overflow-y-auto border-r border-gray-200">
      {/* Progress Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-600 mb-1">Course Content</div>
        <div className="text-xl font-bold text-primary mb-1">{progressPercentage}% COMPLETE</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Content List */}
      <div className="py-4">
        {courseData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-4">
            {/* Module Title */}
            <div className="px-4 mb-3">
              <h3 className="font-bold text-gray-900 text-sm">
                {module.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{module.description}</p>
            </div>

            {/* Module Lessons */}
            <div className="ml-6">
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="relative">
                  <button
                    onClick={() => onLessonSelect(moduleIndex, lessonIndex)}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 flex items-center hover:bg-cream ${
                      selectedLesson?.moduleIndex === moduleIndex && 
                      selectedLesson?.lessonIndex === lessonIndex
                        ? 'bg-primary text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {/* Status Circle - positioned with some left spacing */}
                    <div className="absolute left-1 flex-shrink-0">
                      <button
                        onClick={(e) => toggleLessonCompletion(moduleIndex, lessonIndex, e)}
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`)
                            ? selectedLesson?.moduleIndex === moduleIndex && 
                              selectedLesson?.lessonIndex === lessonIndex
                              ? 'border-white bg-white' // White background with white border when selected
                              : 'border-primary bg-primary' // Primary when completed but not selected
                            : selectedLesson?.moduleIndex === moduleIndex && 
                              selectedLesson?.lessonIndex === lessonIndex
                            ? 'border-white bg-transparent' // Transparent with white border when selected
                            : 'border-gray-300 bg-white hover:border-primary' // Default state
                        }`}
                      >
                        {/* Show checkmark for completed lessons */}
                        {currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`) && (
                          <svg className={`w-2.5 h-2.5 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-primary' // Primary color checkmark when selected
                              : 'text-white' // White checkmark when not selected
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Lesson Icon */}
                    <div className="mr-3 ml-12">
                      {lessonIndex === 0 ? (
                        // First lesson - file icon
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-primary'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-primary'
                              : 'text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : lessonIndex % 3 === 1 ? (
                        // Edit icon for action/writing lessons
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-yellow-500'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-yellow-500'
                              : 'text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </div>
                      ) : lessonIndex % 3 === 2 ? (
                        // Audio/meditation icon
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-yellow-600'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-yellow-600'
                              : 'text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776l-4.383-3.5A1 1 0 014 13V7a1 1 0 01.383-.776l4.383-3.5zM7 7.618V12.382L9 14.118V5.882L7 7.618zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0118 10a9.972 9.972 0 01-.929 3.657 1 1 0 01-1.414 0 1 1 0 010-1.414A7.971 7.971 0 0016 10c0-.89-.165-1.736-.464-2.536a1 1 0 010-1.414z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M13.828 8.172a1 1 0 011.414 0 5.983 5.983 0 010 8.484 1 1 0 01-1.414-1.414 3.983 3.983 0 000-5.656 1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        // Default file icon
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-primary'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-primary'
                              : 'text-white'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        selectedLesson?.moduleIndex === moduleIndex && 
                        selectedLesson?.lessonIndex === lessonIndex
                          ? 'text-white'
                          : 'text-gray-900'
                      }`}>
                         {lesson.title}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar
