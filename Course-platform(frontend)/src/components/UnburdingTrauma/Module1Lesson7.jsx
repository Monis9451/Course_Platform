import React from 'react'

const Module1Lesson7 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6 flex items-center">
        SOMATIC MAPPING EXERCISE
      </h1>
      
      <div className="bg-yellow-100 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Reconnecting with Your Body</h3>
        <p className="mb-4">Many trauma survivors experience disconnection from their bodies as a protective response. This powerful exercise will help you begin to notice and map bodily sensations—safely and gently. It's a way to tune in without judgment and create a visual language for how trauma resides in your physical form.</p>
        <div className="flex flex-col sm:flex-row gap-4 text-sm mt-4">
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">Safety First</p>
            <p>If at any point you feel overwhelmed, pause the exercise and use a grounding technique</p>
          </div>
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">Go Slowly</p>
            <p>There's no rush—this is about gentle curiosity, not forcing anything</p>
          </div>
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">No Judgment</p>
            <p>However you experience your body is valid—there are no wrong answers</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Getting Started</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
              <div>
                <p className="font-medium">Create Your Space</p>
                <p className="text-gray-700">Find a quiet, comfortable space where you won't be disturbed for at least 20 minutes. Have the body outline and something to mark it with ready.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
              <div>
                <p className="font-medium">Ground Yourself</p>
                <p className="text-gray-700">Take three deep breaths, breathing in for 4 counts, holding for 2, and releasing for 6. Feel your feet on the floor and your body supported.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
              <div>
                <p className="font-medium">Set an Intention</p>
                <p className="text-gray-700">Say to yourself: "I am exploring my body with curiosity and compassion. I can pause anytime I need to."</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Body Scan Guide</h3>
          <p className="mb-4">Begin to scan your body from head to toe and notice:</p>
          <div className="space-y-3">
            <div className="flex items-center border-l-4 border-primary pl-3 py-1 bg-gray-50">
              <p>Where do I feel <strong>heaviness</strong> or pressure?</p>
            </div>
            <div className="flex items-center border-l-4 border-primary pl-3 py-1 bg-gray-50">
              <p>Where do I feel <strong>numb</strong> or disconnected?</p>
            </div>
            <div className="flex items-center border-l-4 border-primary pl-3 py-1 bg-gray-50">
              <p>Where do I feel <strong>tingling</strong>, pain, or heat?</p>
            </div>
            <div className="flex items-center border-l-4 border-primary pl-3 py-1 bg-gray-50">
              <p>Where do I feel <strong>aliveness</strong>, ease, or warmth?</p>
            </div>
          </div>
          <p className="mt-4 text-sm italic">Take your time with each area. There's no rush.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Mapping Your Sensations</h3>
        <p className="mb-4">Mark these areas on your body map using colours, symbols, or words that feel right to you:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-primary mb-1">Tension/Heaviness</p>
            <p className="text-sm">A tight chest might be red with the word "guarded" or "constricted"</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-primary mb-1">Numbness</p>
            <p className="text-sm">A numb leg might be blue with the word "invisible" or "frozen"</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-primary mb-1">Activation</p>
            <p className="text-sm">A buzzing arm might be yellow with the word "electric" or "anxious"</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-primary mb-1">Comfort/Safety</p>
            <p className="text-sm">Areas of ease might be green with words like "peaceful" or "open"</p>
          </div>
        </div>
        
        <p className="mb-4">Use metaphors that make sense to you. For example:</p>
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>"My chest feels like a locked box with something trying to get out."</li>
          <li>"My shoulders are carrying invisible bricks."</li>
          <li>"My stomach is a coiled spring, ready to unwind."</li>
          <li>"My hands feel light, like they could float away."</li>
        </ul>
      </div>
      
      <div className="p-1 border-4 border-[#f7f1e9] rounded-lg mb-8">
        <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
          <h3 className="font-semibold mb-6 text-center">Your Body Map</h3>
          
          <div className="flex justify-center my-8">
            <div className="flex flex-col items-center">
                <img src="/body.png" alt="bodyImg" />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 italic">Click on areas of your body where you feel sensations to add markers</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>
                    <span className="text-xs">Tension/Pain</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>
                    <span className="text-xs">Heaviness</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>
                    <span className="text-xs">Anxiety</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-primary mr-1"></div>
                    <span className="text-xs">Ease/Comfort</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-medium mb-2">Sensations:</p>
              <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe what you notice..."></textarea>
            </div>
            <div>
              <p className="font-medium mb-2">Emotions:</p>
              <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="What emotions arise?"></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Closing the Practice</h3>
        <div className="space-y-4">
          <p className="mb-2">To complete this exercise:</p>
          
          <div className="flex items-start">
            <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-center justify-center border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">1</div>
            <p>Place a hand gently on one area that feels disconnected or tense. Breathe into it for 3-5 breaths.</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-center justify-center border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">2</div>
            <p>Say quietly to yourself: "I am safe enough to begin listening to my body. These sensations have wisdom to share."</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-center justify-center border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">3</div>
            <p>End with three slow, hand-on-heart breaths. Feel your chest rise and fall beneath your palm.</p>
          </div>
          
          <div className="p-4 bg-white rounded-md italic text-center mt-4">
            "You are slowly building a bridge back to yourself—one breath, one sensation at a time."
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <button className="inline-flex items-center bg-[#bd6334] text-white rounded-full px-6 py-3 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          </svg>
          SAVE YOUR WORK
        </button>
        
        <button className="inline-flex items-center border-2 border-[#bd6334] text-[#bd6334] rounded-full px-6 py-2 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          DOWNLOAD WORKSHEET
        </button>
      </div>
    </div>
  )
}

export default Module1Lesson7
