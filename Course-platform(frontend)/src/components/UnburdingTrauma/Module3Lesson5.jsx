import React from 'react'

const Module3Lesson5 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">WHAT MY INNER CHILD NEEDS TO HEAR</h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Our inner child often carries wounds from moments when critical emotional needs went unmet. These unmet needs continue to influence our adult lives until we learn to provide what was missing.</p>
        
        <p className="mb-4">This practise focuses on identifying and expressing the specific messages your inner child needs to hear—words that perhaps were never spoken when you most needed them.</p>
        
        <p className="mb-3">Through this practise, you'll:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Identify the specific words your inner child longs to hear</li>
          <li>Practice delivering these healing messages to yourself</li>
          <li>Create consistent reminders of these affirming statements</li>
          <li>Begin replacing old, painful messages with new, nurturing ones</li>
        </ul>
        
        <p className="font-medium italic">With practise, these new messages become an integrated part of your inner dialogue, replacing the critical or dismissive voices from the past.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Things Inner Children Need to Hear</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Safety & Protection Messages</h4>
            
            <div className="space-y-4">
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I will keep you safe now."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You don't have to be afraid anymore."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I won't let anyone hurt you like that again."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I will protect your boundaries and needs."</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Worth & Belonging Messages</h4>
            
            <div className="space-y-4">
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You are worthy exactly as you are."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You don't have to earn love by being perfect."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You matter. Your existence is important."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You belong here and deserve to take up space."</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Emotional Validation Messages</h4>
            
            <div className="space-y-4">
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"Your feelings make sense and matter to me."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"It's okay to feel angry/sad/scared. I'm with you."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You don't have to hide your feelings to be loved."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I see your pain, and I won't look away from it."</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Unconditional Love Messages</h4>
            
            <div className="space-y-4">
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I love you completely, not just your 'good' parts."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"You are lovable even when you make mistakes."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"Nothing you could do would make me stop caring for you."</p>
              </div>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic">"I see your true self, and it is beautiful."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Your Inner Child Messages</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">Take time to identify and craft the specific messages your inner child most needs to hear. These often relate to your particular childhood wounds and experiences.</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Step 1: Connect with Your Need</h4>
            <p className="mb-2">Think about a situation in your childhood where you felt particularly vulnerable, misunderstood, or unsupported. What did you need to hear in that moment that you didn't?</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="When I was [age/situation], what I needed to hear was..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 2: Craft Your Messages</h4>
            <p className="mb-2">Write 3-5 specific statements that would have healed, comforted, or validated you in that situation. Make them personal, specific, and in first person (e.g., "I see that you're hurting...").</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={5}
              placeholder="1. &#10;2. &#10;3. &#10;4. &#10;5."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 3: Record Your Core Message</h4>
            <p className="mb-2">From your list above, which ONE message resonates most deeply? This will be your core healing statement to practise regularly.</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={2}
              placeholder="My core healing message is: "
            ></textarea>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Reflection
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Practice: Delivering Your Messages</h3>
        
        <p className="mb-4">Once you've identified your healing messages, you need to deliver them consistently to your inner child. Here are effective ways to do this:</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">1</div>
            <div>
              <p className="font-medium">Mirror Practice</p>
              <p className="text-sm text-gray-700">Stand in front of a mirror, look into your own eyes, and speak your messages aloud. Notice how it feels to both say and receive these words.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">2</div>
            <div>
              <p className="font-medium">Hand-on-Heart Method</p>
              <p className="text-sm text-gray-700">Place one hand on your heart, close your eyes, and whisper your messages to yourself. The physical touch helps the words land more deeply.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">3</div>
            <div>
              <p className="font-medium">Childhood Photo Dialogue</p>
              <p className="text-sm text-gray-700">Find a photo of yourself as a child. Speak directly to this image, delivering your healing messages with all the love and tenderness you can offer.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">4</div>
            <div>
              <p className="font-medium">Voice Recording</p>
              <p className="text-sm text-gray-700">Record yourself speaking your messages slowly and compassionately. Listen to this recording during difficult moments or as part of your regular self-care practise.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">5</div>
            <div>
              <p className="font-medium">Written Reminders</p>
              <p className="text-sm text-gray-700">Write your core message on small cards or sticky notes. Place them where you'll see them regularly—on your mirror, in your wallet, or as a phone wallpaper.</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-[#f8f0e6] rounded-md">
          <p className="text-sm italic">Remember that repetition is key. Your inner child may not believe these messages right away, especially if you've spent years hearing the opposite. Be patient and consistent—healing happens through gentle persistence.</p>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To integrate this healing work into your daily life:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Commitment</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Deliver your core healing message to yourself at least once each morning and once each evening</li>
            <li>Place a written reminder of your message somewhere you'll see it daily</li>
            <li>When you notice self-criticism arising, pause and offer your healing message instead</li>
            <li>Try at least three different delivery methods this week to see which resonates most</li>
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

export default Module3Lesson5
