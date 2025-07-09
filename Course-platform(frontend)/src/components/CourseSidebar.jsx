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
                    <div className="absolute left-4 flex-shrink-0">
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
                        // First lesson - file text icon
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-primary'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-primary'
                              : 'text-white'
                          }`}>
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                            <path d="M10 9H8"></path>
                            <path d="M16 13H8"></path>
                            <path d="M16 17H8"></path>
                          </svg>
                        </div>
                      ) : lessonIndex % 3 === 1 ? (
                        // Edit icon for action/writing lessons
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-yellow-500'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-yellow-500'
                              : 'text-white'
                          }`}>
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                          </svg>
                        </div>
                      ) : lessonIndex % 3 === 2 ? (
                        // Audio/volume icon
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-yellow-600'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-yellow-600'
                              : 'text-white'
                          }`}>
                            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
                            <path d="M16 9a5 5 0 0 1 0 6"></path>
                            <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
                          </svg>
                        </div>
                      ) : (
                        // Default file text icon
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedLesson?.moduleIndex === moduleIndex && 
                          selectedLesson?.lessonIndex === lessonIndex
                            ? 'bg-white'
                            : 'bg-primary'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'text-primary'
                              : 'text-white'
                          }`}>
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                            <path d="M10 9H8"></path>
                            <path d="M16 13H8"></path>
                            <path d="M16 17H8"></path>
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
