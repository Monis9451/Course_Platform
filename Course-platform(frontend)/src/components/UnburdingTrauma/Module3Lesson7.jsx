import React from 'react';

const Module3Lesson7 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">LETTER TO YOUR INNER CHILD</h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <p className="mb-4">Writing a letter to your inner child is a powerful way to express the understanding, validation, and love that your younger self may have needed. This compassionate communication helps bridge the gap between your adult self and the child within who still carries unresolved feelings or needs.</p>
        
        <p className="mb-4">Through this letter, you can offer your inner child the words they most needed to hear and create a sense of safety, acceptance, and nurturing that may have been missing.</p>
        
        <p className="mb-3">This letter-writing practise allows you to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Express understanding and empathy for childhood experiences</li>
          <li>Validate feelings that may have been dismissed</li>
          <li>Offer reassurance and comfort to your younger self</li>
          <li>Make promises about how you'll care for yourself moving forward</li>
        </ul>
        
        <p className="font-medium italic">By writing this letter, you step into the role of the wise, compassionate adult who can provide your inner child with the emotional support they deserve.</p>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Your Letter</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">Take your time with this exercise. Find a quiet space where you can connect with yourself and write from the heart. Your letter doesn't need to be perfect—authenticity and compassion are what matter most.</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-medium mb-2">Guidance for Your Letter</h4>
            <ul className="space-y-2 pl-6 list-disc mb-4">
              <li>Address your letter to yourself at a specific age or to your inner child in general</li>
              <li>Write in a warm, loving tone as you would to a child you deeply care about</li>
              <li>Acknowledge specific experiences, feelings, or struggles from your childhood</li>
              <li>Offer the validation, understanding, and reassurance your younger self needed</li>
              <li>Make promises about how you'll care for and protect yourself now</li>
              <li>End with expressions of love and acceptance</li>
            </ul>
          </div>
          
          <div className="p-4 bg-[#f8f0e6] rounded-md mb-4">
            <p className="text-sm">Begin your letter with "Dear [age] year old me" or "Dear little one" or whatever feels right to you. Then write freely and compassionately.</p>
          </div>
          
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
            rows={15}
            placeholder="Dear ______,"
          ></textarea>
          
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
            Save Letter
          </button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">After Writing Your Letter</h3>
        
        <p className="mb-4">Once you've completed your letter, consider these ways to deepen the experience:</p>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">1</div>
            <div>
              <p className="font-medium">Read It Aloud</p>
              <p className="text-sm text-gray-700">Find a private space and read your letter out loud to yourself. Notice any emotions that arise and allow them to move through you.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">2</div>
            <div>
              <p className="font-medium">Create a Ritual</p>
              <p className="text-sm text-gray-700">Consider creating a small ritual around your letter—perhaps lighting a candle while reading it, or placing it somewhere special afterward.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">3</div>
            <div>
              <p className="font-medium">Keep It Accessible</p>
              <p className="text-sm text-gray-700">Save your letter somewhere you can return to it when you need comfort or when old wounds feel triggered.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-center justify-center mr-3">4</div>
            <div>
              <p className="font-medium">Write Follow-Up Letters</p>
              <p className="text-sm text-gray-700">Consider writing additional letters to your inner child at different ages or addressing specific experiences as your healing journey continues.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Reflection</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Your Experience</h4>
            <p className="text-sm mb-2">Take a moment to reflect on what it was like to write this letter:</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="What emotions came up for you while writing? What was challenging? What felt healing? What did you learn about yourself or your needs through this process?"
            ></textarea>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Reflection
            </button>
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
  );
};

export default Module3Lesson7;
