import React from 'react'

const Module2Lesson4 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">SAFE SPACE VISUALIZATION</h1>
      
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">LISTEN</h2>
        
        <div className="bg-primary p-1 rounded-md">
          <button className="flex items-center w-full px-4 py-3 bg-primary text-white hover:bg-gray-900 rounded-md">
            <span className="flex-shrink-0 mr-3">▶</span>
            <span className="text-sm">Listen to Safe Space Visualization [18 mins].mp3</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-3">JOURNAL</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>What details did you include in your safe space?</li>
          <li>Did you encounter any resistance when trying to visualize safety?</li>
          <li>How did your body feel during and after the visualization?</li>
        </ul>
      </div>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Creating a mental safe space gives your nervous system a powerful way to experience safety, even when your external environment feels threatening or overwhelming.</p>
        
        <p className="mb-4">By regularly practicing this visualisation, you build neural pathways that make it easier to access feelings of safety and calm during times of distress.</p>
        
        <p className="mb-3">The safe space visualisation helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Activate the parasympathetic "rest and digest" system</li>
          <li>Create distance from overwhelming emotions</li>
          <li>Establish a sense of control and agency</li>
          <li>Develop a tool you can access anywhere, anytime</li>
        </ul>
        
        <p className="font-medium italic">The more richly detailed and sensory your safe space becomes, the more effective it will be.</p>
      </div>
      
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <div className="bg-[#f8f0e6] rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
            <p className="text-gray-600">10-minute guided safe space visualisation meditation</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Creating Your Personal Safe Space</h3>
        
        <p className="mb-4">Before listening to the guided visualisation, take some time to consider what elements would make a space feel completely safe and nurturing for you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Elements to Consider</h4>
            <ul className="space-y-2 pl-6 list-disc">
              <li><strong>Location</strong> - A real place from your life, a fictional location, or something entirely imagined</li>
              <li><strong>Visual details</strong> - Colours, lighting, objects, size, boundaries</li>
              <li><strong>Sounds</strong> - Music, nature sounds, silence, distant voices</li>
              <li><strong>Textures</strong> - Soft surfaces, smooth objects, comforting fabrics</li>
              <li><strong>Scents</strong> - Fresh air, flowers, food, candles, natural smells</li>
              <li><strong>Temperature</strong> - Warm sunlight, cool breeze, perfect comfort</li>
              <li><strong>Protective features</strong> - Boundaries, doors, walls, shields, guardians</li>
              <li><strong>Comforting objects</strong> - Items that bring you joy or peace</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Personal Reflection</h4>
            <p className="mb-3">Consider these questions to build your safe space:</p>
            
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium">Where do you feel most at peace?</p>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows={2}
                  placeholder="Is it in nature, at home, somewhere from your past, or a place you've imagined?"
                ></textarea>
              </div>
              
              <div>
                <p className="mb-2 text-sm font-medium">What sensory elements calm your nervous system?</p>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows={2}
                  placeholder="E.g., soft blankets, the sound of water, natural light, certain colours..."
                ></textarea>
              </div>
              
              <div>
                <p className="mb-2 text-sm font-medium">Who (if anyone) would be welcome in this space?</p>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  rows={2}
                  placeholder="People, animals, spiritual figures, or perhaps no one but yourself?"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Using Your Safe Space Effectively</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">Once you've created your safe space through the guided visualisation, here are some ways to use it in your daily life:</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Regular Practice</h4>
            <p className="mb-2">Like any skill, accessing your safe space becomes easier with practice:</p>
            
            <ul className="space-y-2 pl-6 list-disc mb-4">
              <li>Set aside 5-10 minutes daily to visit your safe space</li>
              <li>Practice when you're already calm to strengthen the neural pathways</li>
              <li>Create a physical anchor (like a small stone or object) that reminds you of your safe space</li>
              <li>Keep a written description or drawing of your space to help reinforce the details</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">In Moments of Distress</h4>
            <p className="mb-2">When you're feeling triggered or overwhelmed:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li>First use a quick grounding technique (like the 5-4-3-2-1 method)</li>
              <li>Take several deep breaths to activate your parasympathetic system</li>
              <li>Recall your safe space by focusing on its most vivid or comforting element</li>
              <li>Mentally "step into" your space and engage with as many sensory details as possible</li>
              <li>Remind yourself: "I am safe right now in this moment"</li>
            </ol>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Your Experience</h4>
          <p className="text-sm mb-2">After practicing with the guided visualisation, reflect on your experience:</p>
          
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
            rows={3}
            placeholder="What did your safe space include? How did it feel to be there? Did you notice any changes in your body while visualizing it?"
          ></textarea>
          
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
            Save Reflection
          </button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Advanced Safe Space Techniques</h3>
        
        <p className="mb-4">As you become more familiar with your safe space, you can enhance its effectiveness with these advanced techniques:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Container Visualisation</h4>
            <p className="mb-3">Create a special container within your safe space:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li>Visualize a container that feels secure (a chest, vault, etc.)</li>
              <li>Use this to temporarily store overwhelming emotions or memories</li>
              <li>Imagine placing difficult content inside and securely closing it</li>
              <li>Know you can return to process these contents when you're ready</li>
            </ol>
            
            <p className="text-sm italic">This technique helps create psychological distance from overwhelming content without denial or suppression.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Inner Resource Visualisation</h4>
            <p className="mb-3">Meet your internal wisdom or strength in your safe space:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li>Within your safe space, imagine meeting a figure who represents wisdom, compassion, or strength</li>
              <li>This could be an ideal mentor, spiritual figure, animal guide, or your future healed self</li>
              <li>Visualize receiving guidance, comfort, or resources from this figure</li>
              <li>Practice dialoguing with this inner resource when faced with challenges</li>
            </ol>
            
            <p className="text-sm italic">This technique helps you access your own inner wisdom and compassion, even when feeling disconnected from these qualities.</p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To integrate the safe space visualisation into your healing journey:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Listen to the guided visualisation recording 3-4 times this week</li>
            <li>Spend 5 minutes daily visiting your safe space without the recording</li>
            <li>Create a physical reminder of your safe space to carry with you</li>
            <li>Practice accessing one sensory aspect of your safe space during a mild stressor</li>
          </ul>
        </div>
        
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Your Commitment:</h4>
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
            I Commit to This Practice
          </button>
        </div>
      </div>
    </div>
  )
}

export default Module2Lesson4
