import React from 'react'

const Module1Lesson8 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 8.5a7.39 7.39 0 0 0-4-2.5"></path><path d="M18 12a7.39 7.39 0 0 0-4-2.5"></path><path d="M2 8.5a7.39 7.39 0 0 1 4-2.5"></path><path d="M6 12a7.39 7.39 0 0 1 4-2.5"></path><path d="M12 2a2.5 2.5 0 0 0 0 5"></path><path d="M12 11a2.5 2.5 0 1 0 0 5"></path><path d="M12 20a2.5 2.5 0 1 0 0 5"></path></svg>
        GUIDED VISUALISATION - GROUNDING & NERVOUS SYSTEM REGULATION
      </h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">What is Grounding?</h3>
        <p className="mb-4">Grounding is a powerful technique that helps you reconnect to the present moment—particularly helpful when you're feeling anxious, disconnected, or overwhelmed. It's about gently anchoring back into your body and your current environment, using your senses and breath.</p>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#bd6334] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="italic">This practice helps calm your nervous system and bring you back to safety in the present moment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Preparation</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
              <div>
                <p className="font-medium">Find Your Space</p>
                <p className="text-gray-700">Find a quiet, safe space where you won't be disturbed for 10-15 minutes.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
              <div>
                <p className="font-medium">Get Comfortable</p>
                <p className="text-gray-700">Sit or lie down in a comfortable position. Feel supported by the surface beneath you.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
              <div>
                <p className="font-medium">Begin to Settle</p>
                <p className="text-gray-700">Close your eyes or soften your gaze. Allow your breathing to slow down naturally.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Benefits of This Practice</h3>
          <div className="space-y-3">
            <div className="flex items-center border-l-4 border-green-400 pl-3 py-1 bg-green-50">
              <p>Calms an overactive nervous system</p>
            </div>
            <div className="flex items-center border-l-4 border-blue-400 pl-3 py-1 bg-blue-50">
              <p>Reduces anxiety and overwhelm</p>
            </div>
            <div className="flex items-center border-l-4 border-purple-400 pl-3 py-1 bg-purple-50">
              <p>Brings you back to the present moment</p>
            </div>
            <div className="flex items-center border-l-4 border-yellow-400 pl-3 py-1 bg-yellow-50">
              <p>Helps you feel more embodied and connected</p>
            </div>
          </div>
          <p className="mt-4 text-sm italic">This practice can be done anywhere, anytime you need to feel more grounded.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Audio Guided Visualization</h3>
        <p className="mb-6">Follow along with this guided grounding exercise. You can pause at any time if you need a break.</p>
        
        <div className="flex justify-center my-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Grounding Visualization</h4>
              <span className="text-gray-300 text-sm">12:45</span>
            </div>
            
            <div className="bg-gray-700 h-2 rounded-full mb-4">
              <div className="bg-[#bd6334] h-2 rounded-full w-1/3"></div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <button className="text-white hover:text-[#bd6334] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                </svg>
              </button>
              
              <button className="bg-[#bd6334] hover:bg-[#a55429] text-white rounded-full p-3 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10H7a2 2 0 00-2 2v1a2 2 0 002 2h1m0-6h4" />
                </svg>
              </button>
              
              <button className="text-white hover:text-[#bd6334] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="h-3 w-0.5 bg-white"></div>
                <div className="h-5 w-0.5 bg-white"></div>
                <div className="h-2 w-0.5 bg-white"></div>
                <div className="h-6 w-0.5 bg-[#bd6334]"></div>
                <div className="h-4 w-0.5 bg-white"></div>
                <div className="h-1 w-0.5 bg-white"></div>
                <div className="h-3 w-0.5 bg-white"></div>
                <div className="h-5 w-0.5 bg-white"></div>
                <div className="h-2 w-0.5 bg-white"></div>
                <div className="h-4 w-0.5 bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2"><strong>What you'll experience:</strong></p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Gentle breathing exercises to calm your nervous system</li>
            <li>• Body awareness techniques to reconnect with physical sensations</li>
            <li>• Visualization of roots growing from your body into the earth</li>
            <li>• Safe space imagery to enhance feelings of security</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Written Grounding Script</h3>
        <p className="mb-4">If you prefer to read along or practice without audio, here's the full grounding script:</p>
        
        <div className="bg-white p-6 rounded-md border border-gray-200">
          <div className="space-y-4 text-gray-700">
            <p><em>"Begin by taking a few slow, deep breaths—in through the nose, out through the mouth. Feel the weight of your body supported by the ground beneath you."</em></p>
            
            <p><em>"Notice the surface you're sitting or lying on. Feel how it holds you completely. You don't have to do anything to be supported—it's already happening."</em></p>
            
            <p><em>"Now, imagine roots beginning to grow from the base of your spine, slowly extending down into the earth. These roots are strong and steady, anchoring you to the ground."</em></p>
            
            <p><em>"With each breath, feel these roots growing deeper and stronger. They connect you to the stable, nourishing energy of the earth below."</em></p>
            
            <p><em>"Notice your breath naturally slowing down. Feel your shoulders releasing any tension they've been holding."</em></p>
            
            <p><em>"You are safe in this moment. You are grounded. You are present. You are exactly where you need to be."</em></p>
            
            <p><em>"Take one more deep breath, feeling completely supported and connected to this moment."</em></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Reflection Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">How did your body feel before this exercise?</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe your sensations..."></textarea>
            </div>
            <div>
              <p className="font-medium mb-2">What did you notice during the grounding practice?</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Any changes in breath, tension, thoughts..."></textarea>
            </div>
            <div>
              <p className="font-medium mb-2">How do you feel now?</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Notice any shifts in your state..."></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Quick Grounding Techniques</h3>
          <p className="mb-4 text-sm">For when you need grounding in daily life:</p>
          <div className="space-y-3">
            <div className="border-l-4 border-[#bd6334] pl-3">
              <p className="font-medium">5-4-3-2-1 Technique</p>
              <p className="text-sm text-gray-600">5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste</p>
            </div>
            <div className="border-l-4 border-[#bd6334] pl-3">
              <p className="font-medium">Feet on Floor</p>
              <p className="text-sm text-gray-600">Press your feet firmly into the ground and notice the connection</p>
            </div>
            <div className="border-l-4 border-[#bd6334] pl-3">
              <p className="font-medium">Hand on Heart</p>
              <p className="text-sm text-gray-600">Place your hand on your chest and feel your heartbeat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="inline-flex items-center bg-[#bd6334] text-white rounded-full px-6 py-3 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          </svg>
          SAVE YOUR REFLECTIONS
        </button>
      </div>
    </div>
  )
}

export default Module1Lesson8