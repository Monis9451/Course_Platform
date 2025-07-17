import React from 'react'

const WorkshopSidebar = ({ courseData: workshopData, selectedLesson, onLessonSelect, completedLessons, setCompletedLessons, lessonProgress }) => {
  // Use completedLessons from props or fallback to empty set
  const currentCompletedLessons = completedLessons || new Set([])
  const updateCompletedLessons = setCompletedLessons || (() => {})
  // Use lessonProgress from props or fallback to empty object
  const currentLessonProgress = lessonProgress || {}
  
  // Calculate total lessons
  const totalLessons = workshopData.modules.reduce((total, module) => total + module.lessons.length, 0)
  
  // Calculate progress percentage - consider both completed lessons and partial progress
  const calculateOverallProgress = () => {
    const totalPossibleProgress = totalLessons * 100; // 100% for each lesson
    let totalProgress = 0;
    
    // First count all completed lessons as 100%
    currentCompletedLessons.forEach(() => {
      totalProgress += 100;
    });
    
    // Add partial progress for lessons not marked as fully complete
    Object.entries(currentLessonProgress).forEach(([lessonKey, progress]) => {
      if (!currentCompletedLessons.has(lessonKey)) {
        totalProgress += progress;
      }
    });
    
    // Calculate the overall percentage
    return Math.min(100, Math.round((totalProgress / totalPossibleProgress) * 100));
  };
  
  const progressPercentage = calculateOverallProgress();
  
  // Toggle lesson completion
  const toggleLessonCompletion = (moduleIndex, lessonIndex, event) => {
    event.stopPropagation()
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

  // Helper function to determine icon type based on lesson data
  const getLessonIconType = (lesson, moduleIndex, lessonIndex) => {
    // Special case for Module 6 first lesson
    if (moduleIndex === 5 && lessonIndex === 0) {
      return 'page';
    }
    
    // First check if lesson has an explicit icon type property
    if (lesson.iconType) {
      return lesson.iconType;
    }
    
    // Determine icon based on the lesson title keywords
    const title = lesson.title ? lesson.title.toLowerCase() : '';
    
    // Special cases based on exact title matches
    if (moduleIndex === 5 && title === "creating your ongoing healing practice") {
      return 'page';
    }
    
    // Regular keyword matching
    if (title.includes('exercise') || 
        (title.includes('practice') && !title.includes('creating your ongoing healing practice')) || 
        title.includes('checklist')) {
      return 'checkbox';
    } else if (title.includes('audio') || title.includes('listen') || title.includes('podcast')) {
      return 'speaker';
    }
    
    // If no match by title, use the pattern from previous implementation
    if (moduleIndex === 0) {
      if (lessonIndex <= 3) return 'page';
      if (lessonIndex >= 4 && lessonIndex <= 6) return 'checkbox';
      if (lessonIndex === 7) return 'speaker';
    } else if ( moduleIndex === 1) {
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex === 3 || lessonIndex === 6) return 'speaker';
      if (lessonIndex >= 4 && lessonIndex <= 5 ) return 'checkbox';
    } else if ( moduleIndex === 2) {
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex === 3 || lessonIndex === 7) return 'speaker';
      if (lessonIndex >= 4 && lessonIndex <= 6) return 'checkbox';
    } else if ( moduleIndex === 3) {
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex <= 5) return 'checkbox';
      if (lessonIndex === 6) return 'speaker';
    } else if ( moduleIndex === 4) {
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex <= 5) return 'checkbox';
      if (lessonIndex === 6) return 'speaker';
    } else if ( moduleIndex === 5) {
      // Already handled the first lesson at the top of the function
      if (lessonIndex >= 1 && lessonIndex <= 2) return 'page';
      if (lessonIndex >= 3 && lessonIndex <= 5) return 'checkbox';
    }
    
    // Default icon is document/page
    return 'page';
  }

  // Helper function to render the appropriate icon
  const renderLessonIcon = (iconType, isSelected) => {
    switch (iconType) {
      case 'checkbox':
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`}>
              <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 125.7-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"/>
            </svg>
          </div>
        );
      case 'speaker':
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`}>
              <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
              <path d="M16 9a5 5 0 0 1 0 6"></path>
              <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
            </svg>
          </div>
        );
      case 'page':
      default:
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`}>
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
          </div>
        );
    }
  }

  return (
    <div className="w-80 bg-white max-h-screen h-full overflow-y-auto border-r border-gray-200" style={{ paddingBottom: "60px" }}>
      {/* Progress Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-600 mb-1">Workshop Content</div>
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
        {workshopData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-4 relative">
            {/* Connection line between modules (only for modules after the first one) */}
            {moduleIndex !== 0 && (
              <div className="absolute left-14 w-px bg-gray-300" style={{ 
                top: "-8px", 
                bottom: "100%",
                height: "8px",
                zIndex: 5
              }}></div>
            )}
            
            {/* Module Title - with light gray background */}
            <div className="px-4 py-3 mb-1 bg-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">
                {module.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{module.description}</p>
            </div>

            {/* Module Lessons */}
            <div className="relative">
              {/* Vertical line for lessons - only appears within the lessons container */}
              <div className="absolute left-14 w-px bg-gray-300" style={{ 
                top: "0",
                bottom: "0",
                zIndex: 1 /* Lower z-index so it appears behind lesson content but still visible */
              }}></div>
              
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="relative border-b border-gray-100 last:border-b-0">
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
                    <div className="absolute left-6 flex-shrink-0 z-20">
                      {/* Completed lesson styling with double border effect */}
                      {currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`) && !(selectedLesson?.moduleIndex === moduleIndex && 
                        selectedLesson?.lessonIndex === lessonIndex) && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary">
                          <div className="absolute inset-0 m-0.1 rounded-full border border-white bg-primary"></div>
                        </div>
                      )}
                      
                      {/* White fill for completed and selected lesson - completely white with no inner border */}
                      {currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`) && (selectedLesson?.moduleIndex === moduleIndex && 
                        selectedLesson?.lessonIndex === lessonIndex) && (
                        <div className="absolute inset-0 rounded-full bg-white border-2 border-white">
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => toggleLessonCompletion(moduleIndex, lessonIndex, e)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`)
                            ? selectedLesson?.moduleIndex === moduleIndex && 
                              selectedLesson?.lessonIndex === lessonIndex
                              ? 'border-0 border-transparent' 
                              : 'border-0 border-transparent'
                            : selectedLesson?.moduleIndex === moduleIndex && 
                              selectedLesson?.lessonIndex === lessonIndex
                            ? 'border-2 border-white' 
                            : 'border-2 border-[#B45B29]'
                        }`}
                      >
                        {/* For partial progress, show a progress fill */}
                        {currentLessonProgress[`${moduleIndex}-${lessonIndex}`] > 0 && !currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`) && (
                          <div 
                            className="absolute inset-0 rounded-full transition-all duration-300 overflow-hidden"
                            style={{ 
                              padding: '1px'
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                backgroundColor: selectedLesson?.moduleIndex === moduleIndex && 
                                    selectedLesson?.lessonIndex === lessonIndex
                                    ? '#FFFFFF' // White for selected
                                    : '#B45B29', // Brownish-orange for unselected
                                clipPath: `inset(0 ${100 - currentLessonProgress[`${moduleIndex}-${lessonIndex}`]}% 0 0)`,
                                opacity: 1
                              }}
                            />
                          </div>
                        )}
                      </button>
                    </div>

                    {/* Lesson Icon */}
                    <div className="mr-3 ml-14">
                      {/* Determine the icon type for the lesson */}
                      {renderLessonIcon(getLessonIconType(lesson, moduleIndex, lessonIndex), selectedLesson?.moduleIndex === moduleIndex && selectedLesson?.lessonIndex === lessonIndex)}
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

export default WorkshopSidebar
