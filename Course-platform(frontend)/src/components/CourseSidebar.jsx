import React from 'react'
import { HiSpeakerWave } from "react-icons/hi2"
import { FaFileAlt } from "react-icons/fa"
import { BsPencilFill } from "react-icons/bs";

const WorkshopSidebar = ({ courseData: workshopData, selectedLesson, onLessonSelect, completedLessons, setCompletedLessons, lessonProgress }) => {
  const currentCompletedLessons = completedLessons || new Set([])
  const updateCompletedLessons = setCompletedLessons || (() => {})
  const currentLessonProgress = lessonProgress || {}
  
  const totalLessons = workshopData.modules.reduce((total, module) => total + module.lessons.length, 0)
  
  const calculateOverallProgress = () => {
    const totalPossibleProgress = totalLessons * 100;
    let totalProgress = 0;
    
    currentCompletedLessons.forEach(() => {
      totalProgress += 100;
    });
    
    Object.entries(currentLessonProgress).forEach(([lessonKey, progress]) => {
      if (!currentCompletedLessons.has(lessonKey)) {
        totalProgress += progress;
      }
    });
    
    return Math.min(100, Math.round((totalProgress / totalPossibleProgress) * 100));
  };
  
  const progressPercentage = calculateOverallProgress();
  
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

  const getLessonIconType = (lesson, moduleIndex, lessonIndex) => {
    // Welcome module (new moduleIndex 0)
    if (moduleIndex === 0) {
      return 'page';
    }
    
    // Closing pages (moduleIndex 7, 8, 9)
    if (moduleIndex >= 7) {
      return 'page';
    }
    
    if (moduleIndex === 6 && lessonIndex === 0) {
      return 'page';
    }
    
    if (lesson.iconType) {
      return lesson.iconType;
    }
    
    const title = lesson.title ? lesson.title.toLowerCase() : '';
    
    if (moduleIndex === 6 && title === "creating your ongoing healing practice") {
      return 'page';
    }
    
    if (title.includes('exercise') || 
        (title.includes('practice') && !title.includes('creating your ongoing healing practice') && !title.includes('mindful movement practice')) || 
        title.includes('checklist')) {
      return 'checkbox';
    } else if (title.includes('audio') || title.includes('listen') || title.includes('podcast')) {
      return 'speaker';
    }
    
    // Module 1: Understanding Trauma & the Body (now moduleIndex 1)
    if (moduleIndex === 1) {
      if (lessonIndex <= 3) return 'page';
      if (lessonIndex >= 4 && lessonIndex <= 6) return 'checkbox';
      if (lessonIndex === 7) return 'speaker';
    } else if (moduleIndex === 2) { // Module 2: Reconnecting with the Body
      if (lessonIndex === 0 || lessonIndex === 2) return 'page';
      if (lessonIndex === 1 || lessonIndex === 3 || lessonIndex === 5 || lessonIndex === 6) return 'speaker';
      if (lessonIndex === 4) return 'checkbox';
    } else if (moduleIndex === 3) { // Module 3: Inner Child Healing
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex === 3 || lessonIndex === 7) return 'speaker';
      if (lessonIndex >= 4 && lessonIndex <= 6) return 'checkbox';
    } else if (moduleIndex === 4) { // Module 4: The Inner Narrative
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex <= 5) return 'checkbox';
      if (lessonIndex === 6) return 'speaker';
    } else if (moduleIndex === 5) { // Module 5: Releasing Emotional Baggage
      if (lessonIndex <= 2) return 'page';
      if (lessonIndex <= 5) return 'checkbox';
      if (lessonIndex === 6) return 'speaker';
    } else if (moduleIndex === 6) { // Module 6: Integration & Forward Momentum
      if (lessonIndex >= 1 && lessonIndex <= 2) return 'page';
      if (lessonIndex >= 3 && lessonIndex <= 5) return 'checkbox';
    }
    
    return 'page';
  }

  const renderLessonIcon = (iconType, isSelected) => {
    switch (iconType) {
      case 'checkbox':
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <BsPencilFill className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`} />
          </div>
        );
      case 'speaker':
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <HiSpeakerWave className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`} />
          </div>
        );
      case 'page':
      default:
        return (
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-white'
          }`}>
            <FaFileAlt className={`w-4 h-4 ${
              isSelected ? 'text-black' : 'text-black'
            }`} />
          </div>
        );
    }
  }

  return (
    <div className="w-80 bg-white max-h-screen h-full overflow-y-auto border-r border-gray-200" style={{ paddingBottom: "60px" }}>
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

      <div className="py-4">
        {workshopData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-4 relative">
            {moduleIndex !== 0 && (
              <div className="absolute left-14 w-px bg-gray-300" style={{ 
                top: "-8px", 
                bottom: "100%",
                height: "8px",
                zIndex: 5
              }}></div>
            )}
            
            <div className="px-4 py-3 mb-1 bg-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">
                {module.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{module.description}</p>
            </div>

            <div className="relative">
              <div className="absolute left-14 w-px bg-gray-300" style={{ 
                top: "0",
                bottom: "0",
                zIndex: 1
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
                    <div className="absolute left-6 flex-shrink-0 z-20">
                      {currentCompletedLessons.has(`${moduleIndex}-${lessonIndex}`) && !(selectedLesson?.moduleIndex === moduleIndex && 
                        selectedLesson?.lessonIndex === lessonIndex) && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary">
                          <div className="absolute inset-0 m-0.1 rounded-full border border-white bg-primary"></div>
                        </div>
                      )}
                      
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
                                    ? '#FFFFFF' 
                                    : '#B45B29', 
                                clipPath: `inset(0 ${100 - currentLessonProgress[`${moduleIndex}-${lessonIndex}`]}% 0 0)`,
                                opacity: 1
                              }}
                            />
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="mr-3 ml-14">
                      {renderLessonIcon(getLessonIconType(lesson, moduleIndex, lessonIndex), selectedLesson?.moduleIndex === moduleIndex && selectedLesson?.lessonIndex === lessonIndex)}
                    </div>

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
