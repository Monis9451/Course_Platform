import React from 'react'

const Module1Lesson4 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-8">DISSOCIATION IN TRAUMA: DEPERSONALISATION, DEREALISATION, DISSOCIATIVE AMNESIA</h1>

      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334]">Important to Remember</h3>
        <p className="mb-4"><strong>You're not losing your mind.</strong> These are normal responses to abnormal experiences. Dissociation happens when the mind says, "It's too much, let's pause this." Healing means helping those parts feel safe enough to come back.</p>
        
        <div className="border-l-4 border-[#bd6334] pl-4 italic">
          <p>Dissociation exists on a spectrum. Almost everyone dissociates to some degree - like zoning out while driving or getting lost in a book. Trauma-related dissociation is more intense and occurs as a protective mechanism.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg mb-8 border border-purple-100">
        <h2 className="text-lg font-semibold mb-3 text-primary">What is Dissociation?</h2>
        <p className="mb-4">Dissociation is the nervous system's emergency brake. When things become too overwhelming, we split—mentally, emotionally, even physically. It's a protective mechanism that helps us survive unbearable experiences.</p>
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <div className="h-1 w-12 bg-purple-200"></div>
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="h-1 w-12 bg-purple-200"></div>
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <p className="text-center italic text-primary mb-4">Disconnect → Protect → Safety</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Depersonalisation Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-3 text-center">Depersonalisation</h3>
          <p className="text-primary">Feeling detached from yourself, like you're observing your life instead of living it.</p>
          <div className="mt-4 bg-gray-100 p-3 rounded">
            <p className="italic text-sm">"I feel like I'm watching myself in a movie. My body doesn't feel like it belongs to me."</p>
          </div>
        </div>
        
        {/* Derealisation Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-3 text-center">Derealisation</h3>
          <p className="text-primary">Feeling like your surroundings aren't real, everything feels dreamlike or off.</p>
          <div className="mt-4 bg-gray-50 p-3 rounded">
            <p className="italic text-sm">"The world looks foggy or distant. Things seem unreal, like I'm in a dream or behind glass."</p>
          </div>
        </div>
        
        {/* Dissociative Amnesia Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-3 text-center">Dissociative Amnesia</h3>
          <p className="text-primary">Gaps in memory, especially around trauma. This isn't forgetfulness—it's protection.</p>
          <div className="mt-4 bg-gray-50 p-3 rounded">
            <p className="italic text-sm">"There are whole chunks of my childhood I can't remember. Traumatic events seem to have 'missing pieces'."</p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-6">
        <h3 className="font-semibold mb-4">Grounding Practice for Dissociation</h3>
        <p className="mb-4">When you notice yourself dissociating, try this 5-4-3-2-1 grounding technique:</p>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
            <p><strong>See:</strong> Name 5 things you can see around you</p>
          </div>
          <div className="flex items-start">
            <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
            <p><strong>Touch:</strong> Name 4 things you can touch or feel (like your feet on the ground)</p>
          </div>
          <div className="flex items-start">
            <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
            <p><strong>Hear:</strong> Name 3 things you can hear</p>
          </div>
          <div className="flex items-start">
            <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
            <p><strong>Smell:</strong> Name 2 things you can smell (or like to smell)</p>
          </div>
          <div className="flex items-start">
            <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
            <p><strong>Taste:</strong> Name 1 thing you can taste (or like to taste)</p>
          </div>
        </div>
        <p className="mt-4 text-sm italic">This exercise helps bring your awareness back to the present moment and reconnect with your senses.</p>
      </div>
    </div>
  )
}

export default Module1Lesson4
