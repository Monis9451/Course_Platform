import React from 'react'

const Module2Lesson5 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">SOMATIC REFLECTION – WHEN DO I FEEL PRESENT?</h1>
      
      <div className="bg-yellow-100 p-6 rounded-md mb-8">
        <p className="mb-4">Somatic reflection is a powerful practise of turning inward to observe your bodily experience with curiosity and compassion. It helps you recognise what circumstances, relationships, and environments support your sense of safety and presence.</p>
        
        <p className="mb-4">By identifying when you naturally feel present in your body, you can intentionally create more of these conditions in your life, strengthening your capacity for embodiment.</p>
        
        <p className="mb-3">This reflective practise helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Recognize what helps your nervous system feel safe</li>
          <li>Identify patterns in when you feel connected vs. disconnected</li>
          <li>Appreciate moments of natural presence that may go unnoticed</li>
          <li>Gather information for creating a personalised healing plan</li>
        </ul>
        
        <p className="font-medium italic">The wisdom about what helps you heal is already within you—sometimes it just needs to be uncovered through reflection.</p>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Presence Inventory</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">This reflective exercise helps you identify specific experiences, circumstances, relationships, environments, and activities that naturally support your embodied presence.</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Step 1: Moments of Natural Presence</h4>
            <p className="mb-2">Think back over the past few weeks or months. When have you felt most at home in your body? When have you felt naturally present, grounded, or connected to yourself?</p>
            
            <p className="mb-2 text-sm">Some examples might include:</p>
            <ul className="space-y-1 pl-6 list-disc mb-4 text-sm">
              <li>During a walk in nature</li>
              <li>While engaged in a creative activity</li>
              <li>When spending time with a particular person</li>
              <li>During a specific physical activity</li>
              <li>In a certain location or environment</li>
              <li>At a particular time of day</li>
            </ul>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="List 3-5 specific moments when you've felt naturally present in your body recently..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 2: Body Sensations During Presence</h4>
            <p className="mb-2">For each of the moments you identified, what body sensations were you aware of? How did presence feel in your body?</p>
            
            <p className="mb-2 text-sm">Consider sensations like:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
              <ul className="space-y-1 pl-6 list-disc">
                <li>Warmth or coolness</li>
                <li>Lightness or heaviness</li>
                <li>Expansion or contraction</li>
              </ul>
              <ul className="space-y-1 pl-6 list-disc">
                <li>Tingling or vibration</li>
                <li>Ease of breathing</li>
                <li>Muscle relaxation</li>
              </ul>
              <ul className="space-y-1 pl-6 list-disc">
                <li>Groundedness</li>
                <li>Energy flow</li>
                <li>Sense of boundaries</li>
              </ul>
            </div>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="Describe the physical sensations you notice when you're naturally present..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 3: Identifying Common Elements</h4>
            <p className="mb-2">Looking at your moments of natural presence, what patterns or common elements do you notice?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium text-sm mb-2">Environmental Factors:</p>
                <ul className="space-y-1 pl-5 text-sm">
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Natural settings (forests, beaches, parks)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Quiet, peaceful spaces</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Familiar, comfortable environments</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Spaces with specific lighting (bright, dim)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Being outdoors vs. indoors</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-sm mb-2">Relational Factors:</p>
                <ul className="space-y-1 pl-5 text-sm">
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Being alone</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Being with specific people</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Small, intimate settings</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Group activities with a shared focus</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Feeling understood or accepted</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-medium text-sm mb-2">Activity Factors:</p>
                <ul className="space-y-1 pl-5 text-sm">
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Creative expression (art, music, writing)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Physical movement (walking, yoga, dance)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Mindful activities (meditation, gardening)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Activities requiring focus or flow states</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Rest or relaxation activities</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-sm mb-2">Internal Factors:</p>
                <ul className="space-y-1 pl-5 text-sm">
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Well-rested vs. tired</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Properly nourished vs. hungry</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Times of day (morning, evening)</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>After specific self-care practices</span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span>Particular emotional states</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="Based on your reflection, what patterns do you notice about when you feel most present?"
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 4: Creating More Presence Opportunities</h4>
            <p className="mb-2">Based on your reflections, how might you intentionally create more moments of natural presence in your life?</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="List 3-5 specific ways you can create more opportunities for natural presence based on your patterns..."
            ></textarea>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Reflection
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Presence vs. Dissociation: A Comparison</h3>
        
        <p className="mb-4">Understanding the contrast between presence and dissociation can help you recognise your own patterns and shifts between these states.</p>
        
        <div className="overflow-auto">
          <table className="w-full min-w-full border-collapse">
            <thead className="bg-[#f8f0e6]">
              <tr>
                <th className="px-4 py-2 text-left border border-[#e6d5c1]">In Presence</th>
                <th className="px-4 py-2 text-left border border-[#e6d5c1]">In Dissociation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-3 border border-[#e6d5c1]">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Aware of bodily sensations</li>
                    <li>Feel connected to your emotions</li>
                    <li>Clear sense of boundaries</li>
                    <li>Able to make choices based on needs</li>
                    <li>Sense of being "in" your body</li>
                  </ul>
                </td>
                <td className="px-4 py-3 border border-[#e6d5c1]">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Numbness or absence of sensation</li>
                    <li>Emotional flatness or disconnection</li>
                    <li>Uncertain boundaries</li>
                    <li>Difficulty making decisions</li>
                    <li>Feeling of floating or watching yourself</li>
                  </ul>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 border border-[#e6d5c1]">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Appropriate energy levels</li>
                    <li>Sense of aliveness</li>
                    <li>Can track thoughts and sensations</li>
                    <li>Feel grounded in the present moment</li>
                    <li>Appropriate responsiveness to stimuli</li>
                  </ul>
                </td>
                <td className="px-4 py-3 border border-[#e6d5c1]">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Either low energy or hyperarousal</li>
                    <li>Feeling "deadened" or mechanically functioning</li>
                    <li>Mind feels foggy or racing</li>
                    <li>Time distortion (too fast or too slow)</li>
                    <li>Either under- or over-responsiveness</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-sm italic mt-4">Note: Most trauma survivors move back and forth between states of presence and dissociation. The goal isn't to never dissociate (which is unrealistic), but to expand your capacity for presence and develop awareness of when you're shifting between states.</p>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Tracking Presence in Daily Life</h3>
        
        <p className="mb-4">Developing the habit of checking in with your level of embodied presence throughout the day can strengthen your capacity for body awareness.</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h4 className="font-medium mb-3">The Presence Scale</h4>
            <p className="mb-3">A simple 1-10 scale can help you track your level of presence:</p>
            
            <ul className="space-y-2 pl-6 list-disc mb-4">
              <li><strong>1-3:</strong> Highly dissociated (feeling numb, foggy, disconnected, outside your body)</li>
              <li><strong>4-6:</strong> Partially present (aware of some sensations, but not fully in your body)</li>
              <li><strong>7-10:</strong> Highly present (clear sensation awareness, feeling grounded, emotionally connected)</li>
            </ul>
            
            <p className="mb-3">Throughout your day, pause briefly to ask:</p>
            <ul className="space-y-1 pl-6 list-disc">
              <li>"Where am I on the presence scale right now?"</li>
              <li>"What sensations am I aware of in my body?"</li>
              <li>"What might have influenced my current state?"</li>
            </ul>
          </div>
          
          <div className="md:w-1/2">
            <h4 className="font-medium mb-3">Presence Journal</h4>
            <p className="mb-3">Keep a simple presence journal with these columns:</p>
            
            <div className="overflow-auto">
              <table className="w-full min-w-full border-collapse text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="px-3 py-2 text-left border border-gray-200">Time</th>
                    <th className="px-3 py-2 text-left border border-gray-200">Presence (1-10)</th>
                    <th className="px-3 py-2 text-left border border-gray-200">Activity/Context</th>
                    <th className="px-3 py-2 text-left border border-gray-200">Body Sensations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200">9:00 AM</td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200">12:00 PM</td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200">3:00 PM</td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-gray-200">7:00 PM</td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                    <td className="px-3 py-2 border border-gray-200"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm italic mt-4">After tracking for a few days, review your journal to identify patterns about when you're most and least present in your body. This information is invaluable for creating your personalised healing plan.</p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To integrate somatic reflection into your healing journey:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Complete the "Presence Inventory" exercise</li>
            <li>Check in with your presence scale at least 3 times daily</li>
            <li>Keep a presence journal for at least 3 days</li>
            <li>Intentionally create one additional "presence opportunity" based on your patterns</li>
          </ul>
        </div>
        
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Your Commitment:</h4>
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
            I Commit to This Practice
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
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

export default Module2Lesson5
