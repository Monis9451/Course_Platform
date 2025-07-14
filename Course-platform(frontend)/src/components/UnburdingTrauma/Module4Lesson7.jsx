import React from 'react'

const Module4Lesson7 = () => {
  return (
    <div>
      <h1 className="text-black text-2xl mb-6">EMPOWERMENT MEDITATION</h1>
      
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">LISTEN</h2>
        
        <div className="bg-black p-1 rounded-md">
          <button className="flex items-center w-full px-4 py-3 bg-black text-white hover:bg-gray-900 rounded-md">
            <span className="flex-shrink-0 mr-3">▶</span>
            <span className="text-sm">Listen to Empowerment Meditation [18 mins].mp3</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">JOURNAL</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>What feelings of empowerment did you experience during the meditation?</li>
          <li>Did any resistance or doubts arise during the practice?</li>
          <li>How can you bring this sense of empowerment into your daily life?</li>
        </ul>
      </div>
      
      {/* Content will be added later */}
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Content for this lesson will be added soon.</p>
      </div>
    </div>
  )
}

export default Module4Lesson7
