import React, { useState } from 'react'

const CourseSidebar = ({ courseData, selectedLesson, onLessonSelect }) => {
  const [expandedModules, setExpandedModules] = useState({})

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }))
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Course Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          {courseData.title}
        </h2>
        <p className="text-sm text-gray-600">
          {courseData.description}
        </p>
      </div>

      {/* Modules and Lessons */}
      <div className="p-4">
        {courseData.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-4">
            {/* Module Header */}
            <button
              onClick={() => toggleModule(moduleIndex)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 text-sm">
                  MODULE {moduleIndex + 1}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {module.title}
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                  expandedModules[moduleIndex] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Lessons */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedModules[moduleIndex] ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="mt-2 space-y-1">
                {module.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lessonIndex}
                    onClick={() => onLessonSelect(moduleIndex, lessonIndex)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      selectedLesson?.moduleIndex === moduleIndex && 
                      selectedLesson?.lessonIndex === lessonIndex
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                            selectedLesson?.moduleIndex === moduleIndex && 
                            selectedLesson?.lessonIndex === lessonIndex
                              ? 'border-white text-white'
                              : 'border-gray-300 text-gray-500'
                          }`}
                        >
                          {lessonIndex + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Lesson {lessonIndex + 1}
                        </p>
                        <p className="text-xs opacity-80 mt-1">
                          {lesson.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseSidebar
