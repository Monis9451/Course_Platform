import React from 'react'

const Module1Lesson5 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6 flex items-center">
        PERSONAL TRAUMA TIMELINE
      </h1>
      
      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Why Create a Timeline?</h3>
        <p className="mb-4">Creating a trauma timeline helps you visualize your life's journey and identify patterns. This process can reveal connections between past events and current behaviors, providing insight into your healing journey. By mapping these experiences, you gain a new perspective on your resilience and growth.</p>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">Recognition</p>
            <p>Acknowledge events that have shaped you, both big and seemingly small</p>
          </div>
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">Patterns</p>
            <p>Identify recurring themes and responses across different life stages</p>
          </div>
          <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
            <p className="font-medium text-[#bd6334] mb-1">Integration</p>
            <p>Begin to see your story as a whole, not just isolated painful moments</p>
          </div>
        </div>
      </div>
      
      <p className="mb-6">Let's begin by creating your Personal Trauma Timeline. This is a private, safe space for reflection.</p>
      
      <div className="mb-8">
        <h3 className="font-semibold mb-4">Guidance for Your Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
            <div>
              <p className="font-medium">Identify Key Events</p>
              <p className="text-gray-700">Write down significant moments in your life that you feel were shaped by trauma. Include childhood, adolescence, and adulthood experiences.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
            <div>
              <p className="font-medium">Note Multiple Impacts</p>
              <p className="text-gray-700">For each event, reflect on how it affected you emotionally, physically, mentally, and relationally. What beliefs about yourself formed from these experiences?</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
            <div>
              <p className="font-medium">Include Resilience Points</p>
              <p className="text-gray-700">Also mark moments of strength, healing, and growth on your timeline. These are equally important parts of your story.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-1 border-4 border-[#f7f1e9] rounded-lg mb-8">
        <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
          <h3 className="font-semibold mb-6 text-center">Your Personal Timeline</h3>
          
          <div className="w-full h-1 bg-[#bd6334] my-8 relative">
            <div className="absolute left-0 -top-7 text-sm font-medium">Early Childhood</div>
            <div className="absolute left-0 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
            
            <div className="absolute left-1/4 -top-7 text-sm font-medium">Adolescence</div>
            <div className="absolute left-1/4 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
            
            <div className="absolute left-1/2 -top-7 text-sm font-medium">Early Adulthood</div>
            <div className="absolute left-1/2 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
            
            <div className="absolute left-3/4 -top-7 text-sm font-medium">Mid Adulthood</div>
            <div className="absolute left-3/4 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
            
            <div className="absolute right-0 -top-7 text-sm font-medium">Present</div>
            <div className="absolute right-0 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="font-medium mb-2">Event:</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
              <p className="font-medium mt-3 mb-2">Impact:</p>
              <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="font-medium mb-2">Event:</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
              <p className="font-medium mt-3 mb-2">Impact:</p>
              <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="font-medium mb-2">Event:</p>
              <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
              <p className="font-medium mt-3 mb-2">Impact:</p>
              <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
              <button className="flex items-center text-[#bd6334]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Another Event
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-4">Reflection Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">1. What patterns or themes do you notice across your timeline?</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <p className="font-medium mb-2">2. How have these experiences shaped your beliefs about yourself and others?</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
          <div>
            <p className="font-medium mb-2">3. What strengths or resilience have you developed as a result?</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
          </div>
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

export default Module1Lesson5
