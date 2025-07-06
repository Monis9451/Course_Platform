import React from 'react'

const Module3Lesson6 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">CREATING A SELF-COMPASSION RITUAL</h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Self-compassion is the practise of treating yourself with the same kindness, concern, and support you'd offer to a good friend. Yet for many of us, especially those with trauma histories, self-compassion doesn't come naturally. We need to deliberately cultivate it through consistent practise.</p>
        
        <p className="mb-4">Creating a regular self-compassion ritual helps rewire neural pathways that may be tuned toward self-criticism, making compassionate self-treatment more automatic over time.</p>
        
        <p className="mb-3">A consistent self-compassion practise helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Respond to difficult emotions with kindness rather than judgment</li>
          <li>Develop emotional resilience during challenging times</li>
          <li>Connect with your common humanity rather than feeling isolated</li>
          <li>Create a sustainable foundation for your healing journey</li>
        </ul>
        
        <p className="font-medium italic">Self-compassion isn't self-indulgence—it's a courageous form of self-care that research shows reduces anxiety, depression, and shame while increasing wellbeing.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Three Elements of Self-Compassion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Mindfulness</h4>
            
            <div className="space-y-3">
              <p className="mb-2">Being aware of your suffering without over-identifying with it. Acknowledging your pain without being completely swept away by it.</p>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic font-medium">Practice sounds like:</p>
                <p className="text-sm italic">"I notice I'm feeling anxious right now. This is a difficult moment."</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Common Humanity</h4>
            
            <div className="space-y-3">
              <p className="mb-2">Recognizing that suffering is part of the shared human experience. You're not alone or abnormal in your struggles.</p>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic font-medium">Practice sounds like:</p>
                <p className="text-sm italic">"Many people feel this way. Struggling is part of being human."</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Self-Kindness</h4>
            
            <div className="space-y-3">
              <p className="mb-2">Offering yourself warmth, care and understanding rather than harsh judgment or criticism.</p>
              
              <div className="bg-[#f8f0e6] p-3 rounded-md">
                <p className="text-sm italic font-medium">Practice sounds like:</p>
                <p className="text-sm italic">"May I be kind to myself in this moment. I'm doing the best I can."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Creating Your Personal Self-Compassion Ritual</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">Design a brief (5-10 minute) ritual that incorporates all three elements of self-compassion. You'll practise this regularly, especially during difficult moments.</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Step 1: Your Mindfulness Element</h4>
            <p className="mb-2">How will you acknowledge your difficult feelings without becoming overwhelmed by them? Consider a grounding technique, brief meditation, or simple awareness practise.</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="For the mindfulness portion of my ritual, I will..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 2: Your Common Humanity Element</h4>
            <p className="mb-2">How will you remind yourself that suffering is universal and you're not alone? This might involve reading quotes, reciting phrases, or visualisation.</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="For the common humanity portion of my ritual, I will..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 3: Your Self-Kindness Element</h4>
            <p className="mb-2">How will you actively offer yourself care and kindness? Consider soothing touch, kind words, or a comforting activity.</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="For the self-kindness portion of my ritual, I will..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Step 4: Creating Your Ritual Flow</h4>
            <p className="mb-2">Now combine the elements above into a short, repeatable ritual. Include when and where you'll practise it.</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="My complete self-compassion ritual will be:&#10;&#10;I will practise this ritual at these times: "
            ></textarea>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Ritual Plan
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Sample Self-Compassion Rituals</h3>
        
        <p className="mb-4">Here are three examples of self-compassion rituals that incorporate all three elements:</p>
        
        <div className="space-y-6 mb-6">
          <div className="bg-[#f8f0e6] p-4 rounded-md">
            <h4 className="font-medium mb-2">Morning Mirror Ritual</h4>
            <ul className="space-y-2 pl-6 list-disc">
              <li><span className="font-medium">Mindfulness:</span> Stand in front of the mirror, take three deep breaths, and acknowledge out loud one challenge you're facing today.</li>
              <li><span className="font-medium">Common Humanity:</span> Place your hand on your heart and say, "Many others feel this way too. I'm not alone in this experience."</li>
              <li><span className="font-medium">Self-Kindness:</span> Look into your eyes in the mirror and speak three supportive statements to yourself, such as "I'm doing my best," "I deserve compassion," and "I'm worthy of care and support."</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-4 rounded-md">
            <h4 className="font-medium mb-2">Midday Reset Practice</h4>
            <ul className="space-y-2 pl-6 list-disc">
              <li><span className="font-medium">Mindfulness:</span> Take a 2-minute break, close your eyes, and scan your body for tension. Name any difficult emotions present.</li>
              <li><span className="font-medium">Common Humanity:</span> Visualize thousands of others around the world also taking a moment to pause and care for themselves amidst their struggles.</li>
              <li><span className="font-medium">Self-Kindness:</span> Place one hand on your cheek and one on your heart. Repeat: "May I be kind to myself right now. May I give myself what I need."</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-4 rounded-md">
            <h4 className="font-medium mb-2">Evening Comfort Ritual</h4>
            <ul className="space-y-2 pl-6 list-disc">
              <li><span className="font-medium">Mindfulness:</span> Sit comfortably with a journal and write down any difficult moments from the day without judgment.</li>
              <li><span className="font-medium">Common Humanity:</span> Read a quote or poem about shared human experience, or write: "Everyone has imperfect days. Struggle connects me to others."</li>
              <li><span className="font-medium">Self-Kindness:</span> Wrap yourself in a soft blanket, hold a cup of warm tea, and speak gently to yourself about what you need right now.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To build your self-compassion muscle:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Commitment</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Practice your self-compassion ritual at least once daily at your designated time</li>
            <li>Use your ritual during one difficult moment when you notice self-criticism arising</li>
            <li>Track in a journal how you feel before and after your self-compassion practise</li>
            <li>Notice any resistance that arises and approach it with curiosity rather than judgment</li>
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

export default Module3Lesson6
