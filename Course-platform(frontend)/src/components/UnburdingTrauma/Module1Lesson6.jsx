import React from 'react'

const Module1Lesson6 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6 flex items-center">
        SELF-ASSESSMENT - TRAUMA RESPONSES
      </h1>
      
      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Why Self-Assessment Matters</h3>
        <p className="mb-4">Self-assessment is a powerful tool for trauma healing. By developing awareness of how trauma manifests in your daily life, you gain the ability to respond rather than react. This process builds your capacity for self-regulation and creates space for new patterns to emerge.</p>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#bd6334] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="italic">Remember, this is a safe space for honest reflection. There are no right or wrong answers—just your truth.</p>
        </div>
      </div>
      
      <p className="mb-6 text-lg">Let's tune into how trauma shows up for you on a daily basis.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Emotional Responses</h3>
          <p className="mb-4 font-medium">"When I feel triggered, I usually..."</p>
          <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
          <div className="mt-3 text-sm text-gray-500">
            <p>Consider: Do you shut down? Get angry? Seek control? Feel anxious?</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
          <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Emotional Patterns</h3>
          <p className="mb-4 font-medium">"The emotional pain I struggle with most often is..."</p>
          <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
          <div className="mt-3 text-sm text-gray-500">
            <p>Consider: Is it abandonment? Shame? Fear? Helplessness? Rejection?</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Physical Manifestations</h3>
        <p className="mb-4 font-medium">"My trauma shows up in my body as..."</p>
        <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
        <div className="mt-3 text-sm text-gray-500">
          <p>Consider: Tension? Pain? Digestive issues? Sleep problems? Chronic fatigue?</p>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <h3 className="font-semibold mb-4">Additional Reflection Prompts</h3>
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-medium">"The situations that most commonly trigger my trauma responses are..."</p>
            <textarea className="w-full p-3 border border-gray-300 rounded-md h-20" placeholder="Write your response here..."></textarea>
          </div>
          
          <div>
            <p className="mb-3 font-medium">"When I notice I'm triggered, what helps me come back to centre is..."</p>
            <textarea className="w-full p-3 border border-gray-300 rounded-md h-20" placeholder="Write your response here..."></textarea>
          </div>
        </div>
      </div>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Integration Practice</h3>
        <p className="mb-4">After completing your reflections, take a moment to place a hand on your heart. Acknowledge the courage it takes to look honestly at your patterns. Breathe deeply and offer yourself these words of compassion:</p>
        <div className="p-4 bg-white rounded-md italic text-center">
          "I honour my journey and my resilience. These patterns developed to protect me, and I'm grateful for that protection. As I become more aware, I create space for new possibilities."
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

export default Module1Lesson6
