import React from 'react'

const Module1Lesson3 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-8">TRAUMA RESPONSES: FIGHT, FLIGHT, FREEZE, FAWN – HOW TRAUMA MANIFESTS IN BEHAVIOUR</h1>
      
      <p className="mb-6">These trauma responses aren't just reactions—they're survival strategies your body learned when it didn't feel safe. They often become habits, roles, even identities.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Fight Response Card */}
        <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
          <h3 className="font-bold text-xl mb-3 text-red-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fight Response
          </h3>
          <p className="mb-3">Looks like defensiveness, anger, controlling behaviour.</p>
          <p className="italic text-red-700">"I must overpower the threat to survive."</p>
          <div className="mt-4 text-sm">
            <strong>Common signs:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Argumentative behaviour</li>
              <li>Quick to anger</li>
              <li>Controlling tendencies</li>
              <li>Verbal aggression</li>
            </ul>
          </div>
        </div>
        
        {/* Flight Response Card */}
        <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400">
          <h3 className="font-bold text-xl mb-3 text-yellow-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Flight Response
          </h3>
          <p className="mb-3">Manifests as anxiety, perfectionism, busyness, or avoidance.</p>
          <p className="italic text-yellow-700">"If I can just keep moving, nothing can catch me."</p>
          <div className="mt-4 text-sm">
            <strong>Common signs:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Constant busyness</li>
              <li>Workaholic tendencies</li>
              <li>Perfectionism</li>
              <li>Avoidance behaviors</li>
            </ul>
          </div>
        </div>
        
        {/* Freeze Response Card */}
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
          <h3 className="font-bold text-xl mb-3 text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Freeze Response
          </h3>
          <p className="mb-3">Creates feeling numb, shutting down, dissociating.</p>
          <p className="italic text-blue-700">"If I don't move, I can't be seen."</p>
          <div className="mt-4 text-sm">
            <strong>Common signs:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Brain fog</li>
              <li>Feeling stuck or paralyzed</li>
              <li>Numbness</li>
              <li>Emotional shutdown</li>
            </ul>
          </div>
        </div>
        
        {/* Fawn Response Card */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
          <h3 className="font-bold text-xl mb-3 text-green-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Fawn Response
          </h3>
          <p className="mb-3">Shows up as people-pleasing, self-abandonment, over-accommodation.</p>
          <p className="italic text-green-700">"If I make everyone happy, maybe I'll be safe."</p>
          <div className="mt-4 text-sm">
            <strong>Common signs:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>People-pleasing</li>
              <li>Difficulty saying no</li>
              <li>Self-abandonment</li>
              <li>Emotional caretaking</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334]">Recognizing Your Patterns</h3>
        <p className="mb-4">Each of these responses is intelligent and protective. Each kept you alive. The work now isn't to get rid of them, but to recognise when they show up, thank them for their protection, and choose your response from a place of awareness.</p>
        <p className="mb-2 font-medium">Reflect on these questions:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>Which response pattern do you recognise most clearly in yourself?</li>
          <li>What situations tend to trigger these responses?</li>
          <li>How has this response pattern served to protect you in the past?</li>
        </ul>
      </div>
      
      <div className="border border-gray-200 p-6 rounded-md">
        <h3 className="font-semibold mb-4">Journaling Exercise</h3>
        <p className="mb-4">Take some time to journal about a recent situation where you noticed one of these trauma responses activated:</p>
        <ol className="list-decimal pl-8 space-y-2">
          <li>What happened just before you noticed the response?</li>
          <li>What physical sensations did you experience in your body?</li>
          <li>Which response pattern was activated (Fight, Flight, Freeze, or Fawn)?</li>
          <li>What was this response trying to protect you from?</li>
          <li>If you could respond from your adult, regulated self now, what might that look like?</li>
        </ol>
      </div>
    </div>
  )
}

export default Module1Lesson3
