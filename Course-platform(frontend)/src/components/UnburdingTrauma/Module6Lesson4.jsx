import React from 'react';

const Module6Lesson4 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">HEALING ACTION PLAN (WRITING PRACTICE)</h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Creating a personalised healing action plan is one of the most empowering steps you can take in your recovery journey. This isn't about having all the answers right now—it's about identifying what works for you and building a practical roadmap for moving forward.</p>
        
        <p className="mb-4">Your healing action plan will be unique to you, incorporating the tools, insights, and practices that resonate most deeply with your experience and needs.</p>
        
        <p className="font-medium italic">Remember: This plan is flexible and will evolve as you do. The goal is progress, not perfection.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 1: Reflect on Your Journey So Far</h3>
        
        <p className="mb-4">Before moving forward, take time to acknowledge how far you've come. This reflection helps you identify what's been most helpful and what you want to focus on next.</p>
        
        <div className="bg-[#f8f0e6] p-6 rounded-lg mb-6">
          <h4 className="font-medium mb-4">Writing Prompts for Reflection</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">What have been the most significant insights or realisations during this course?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Consider moments of understanding, shifts in perspective, or new awareness about yourself..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">Which tools or practices have felt most helpful and supportive?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Think about specific exercises, meditations, concepts, or approaches that resonated..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">What patterns or triggers have you become more aware of?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Notice without judgement - awareness is the first step to change..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">How has your relationship with your body changed?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Consider changes in body awareness, comfort, trust, or connection..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 2: Create Your Personal Toolkit</h3>
        
        <p className="mb-4">Based on your reflections, identify the specific tools and practices you want to continue using. Your toolkit should be practical and sustainable for your daily life.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3">Daily Practices</h4>
            <p className="text-sm mb-3">Tools you can use regularly for ongoing support:</p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows={4}
              placeholder="e.g., morning grounding practice, evening body scan, breathing exercises..."
            />
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3">Crisis/Difficult Moment Tools</h4>
            <p className="text-sm mb-3">Practices for when you're struggling:</p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows={4}
              placeholder="e.g., 5-4-3-2-1 grounding, safe space visualisation, emergency contacts..."
            />
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3">Weekly/Monthly Practices</h4>
            <p className="text-sm mb-3">Deeper work for ongoing growth:</p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows={4}
              placeholder="e.g., journaling sessions, therapy appointments, nature time, creative expression..."
            />
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3">Professional Support</h4>
            <p className="text-sm mb-3">People and services in your support network:</p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
              rows={4}
              placeholder="e.g., therapist, GP, support groups, trusted friends, family members..."
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 3: Set Gentle Goals and Intentions</h3>
        
        <p className="mb-4">Rather than rigid goals, set gentle intentions for your continued healing. These should feel supportive and achievable, not overwhelming.</p>
        
        <div className="bg-[#f8f0e6] p-6 rounded-lg mb-6">
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">In the next month, I want to focus on:</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Choose 1-2 specific areas that feel most important right now..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">One new thing I'd like to explore or try:</label>
              <input 
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="This could be a new therapy approach, hobby, support group, etc..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">How I'll know I'm making progress:</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Consider both internal shifts and external changes you might notice..."
              />
            </div>
            
            <div>
              <label className="block font-medium mb-2">My commitment to myself:</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="A gentle, compassionate promise about how you'll treat yourself moving forward..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h4 className="font-medium mb-3 text-[#bd6334]">A Note on Setbacks</h4>
        <p className="mb-3">Healing isn't linear. There will be difficult days, moments when old patterns resurface, times when progress feels slow or non-existent. This is normal and doesn't mean you're failing.</p>
        <p className="mb-3">When setbacks happen:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Return to your basic tools (breathing, grounding, self-compassion)</li>
          <li>Reach out for support—you don't have to face difficulties alone</li>
          <li>Remember that setbacks often precede breakthrough moments</li>
          <li>Treat yourself with the same kindness you'd offer a dear friend</li>
        </ul>
      </div>
      
      <div className="text-center">
        <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
          Save My Healing Action Plan
        </button>
      </div>
    </div>
  );
};

export default Module6Lesson4;