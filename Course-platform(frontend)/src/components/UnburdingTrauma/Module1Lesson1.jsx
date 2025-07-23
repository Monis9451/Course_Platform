import React from 'react'

const Module1Lesson1 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">THE NEUROSCIENCE: HOW TRAUMA REWIRES THE BRAIN</h1>
      
      <div className="bg-yellow-100 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Understanding The Neuroscience of Trauma</h3>
        <p className="mb-4">Trauma isn't just something that happens to us - it changes us, right down to the way our brain functions. If you've ever wondered why certain triggers bring back overwhelming emotions, why your body reacts before your mind catches up, or why it feels impossible to just move on, the answer lies in how trauma rewires the brain.</p>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#bd6334] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="italic">Understanding how trauma affects your brain is a crucial step in your healing journey.</p>
        </div>
      </div>
      
      <p className="mb-5 text-lg">Three key areas of the brain are most affected by trauma:</p>
      
      <div className="flex justify-centre mb-8">
              <div className="relative w-full max-w-2xl h-96">
                {/* Highly realistic human brain diagram SVG */}
                <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    {/* Gradients for realistic brain texture */}
                    <radialGradient id="brainGradient" cx="0.3" cy="0.3">
                      <stop offset="0%" stopColor="#f5e6d3"/>
                      <stop offset="60%" stopColor="#e8d4c1"/>
                      <stop offset="100%" stopColor="#d4c0a8"/>
                    </radialGradient>
                    <linearGradient id="sulciGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a99a"/>
                      <stop offset="100%" stopColor="#b89080"/>
                    </linearGradient>
                  </defs>
                  
                  <g>
                    {/* Main cerebrum with realistic contours */}
                    <path d="M400 80 Q320 60 260 90 Q200 130 180 180 Q160 240 170 300 Q180 360 220 410 Q260 450 320 470 Q380 480 400 480 Q420 480 480 470 Q540 450 580 410 Q620 360 630 300 Q640 240 620 180 Q600 130 540 90 Q480 60 400 80" 
                      fill="url(#brainGradient)" stroke="#b89080" strokeWidth="2"/>
                    
                    {/* Central sulcus - major brain fold */}
                    <path d="M340 100 Q380 120 420 100 Q400 180 380 260 Q360 340 340 420" 
                      fill="none" stroke="url(#sulciGradient)" strokeWidth="4"/>
                    
                    {/* Lateral sulcus */}
                    <path d="M280 180 Q340 200 400 180 Q460 200 520 180" 
                      fill="none" stroke="url(#sulciGradient)" strokeWidth="3"/>
                    
                    {/* Superior temporal sulcus */}
                    <path d="M280 240 Q340 250 400 240 Q460 250 520 240" 
                      fill="none" stroke="url(#sulciGradient)" strokeWidth="2"/>
                    
                    {/* Parieto-occipital sulcus */}
                    <path d="M480 120 Q520 160 540 200 Q560 240 580 280" 
                      fill="none" stroke="url(#sulciGradient)" strokeWidth="2"/>
                    
                    {/* Frontal gyri */}
                    <path d="M220 120 Q280 140 340 120" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M230 140 Q290 160 350 140" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M240 160 Q300 180 360 160" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    
                    {/* Temporal gyri */}
                    <path d="M250 280 Q320 300 390 280" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M260 320 Q330 340 400 320" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M270 360 Q340 380 410 360" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    
                    {/* Parietal gyri */}
                    <path d="M460 140 Q520 160 580 140" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M470 180 Q530 200 590 180" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    
                    {/* Occipital gyri */}
                    <path d="M520 280 Q560 300 600 280" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    <path d="M530 320 Q570 340 610 320" fill="none" stroke="#c9a99a" strokeWidth="2" opacity="0.6"/>
                    
                    {/* Brain stem - more anatomically correct */}
                    <ellipse cx="400" cy="480" rx="20" ry="15" fill="#d4c0a8" stroke="#b89080" strokeWidth="2"/>
                    <rect x="390" y="480" width="20" height="40" fill="#d4c0a8" stroke="#b89080" strokeWidth="2" rx="8"/>
                    
                    {/* Cerebellum */}
                    <ellipse cx="450" cy="440" rx="35" ry="25" fill="#e8d4c1" stroke="#c9a99a" strokeWidth="2" opacity="0.9"/>
                    <path d="M420 430 Q435 440 450 430 Q465 440 480 430" fill="none" stroke="#b89080" strokeWidth="1"/>
                    <path d="M425 445 Q440 455 455 445 Q470 455 485 445" fill="none" stroke="#b89080" strokeWidth="1"/>
                    
                    {/* Prefrontal Cortex - anatomically positioned */}
                    <path d="M220 100 Q280 90 340 100 Q360 110 380 100 Q350 140 300 150 Q250 140 220 100" 
                      fill="#d4edda" stroke="#6aaa80" strokeWidth="2" opacity="0.85"/>
                    
                    {/* Prefrontal cortex highlighting */}
                    <circle cx="300" cy="120" r="45" fill="#6aaa80" opacity="0.15">
                      <animate attributeName="r" values="45;50;45" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Hippocampus - anatomically correct seahorse shape */}
                    <path d="M380 320 Q400 310 420 315 Q440 325 445 345 Q440 365 420 370 Q400 375 385 365 Q375 350 380 320" 
                      fill="#cce5ff" stroke="#6699cc" strokeWidth="2" opacity="0.85"/>
                    
                    {/* Hippocampus highlighting */}
                    <ellipse cx="415" cy="345" rx="35" ry="25" fill="#6699cc" opacity="0.15">
                      <animate attributeName="rx" values="35;40;35" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite" />
                    </ellipse>
                    
                    {/* Amygdala - anatomically correct almond shape */}
                    <ellipse cx="350" cy="340" rx="18" ry="25" fill="#ffcccc" stroke="#e66767" strokeWidth="2" opacity="0.85" transform="rotate(-15 350 340)"/>
                    
                    {/* Amygdala highlighting */}
                    <ellipse cx="350" cy="340" rx="25" ry="30" fill="#e66767" opacity="0.15" transform="rotate(-15 350 340)">
                      <animate attributeName="rx" values="25;30;25" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                    
                    {/* Text labels with improved positioning */}
                    <text x="300" y="60" textAnchor="middle" fill="#333333" fontSize="16" fontWeight="bold">Prefrontal Cortex</text>
                    <line x1="300" y1="70" x2="300" y2="95" stroke="#6aaa80" strokeWidth="2" strokeDasharray="3,2"/>
                    
                    <text x="500" y="345" textAnchor="start" fill="#333333" fontSize="16" fontWeight="bold">Hippocampus</text>
                    <line x1="490" y1="345" x2="450" y2="345" stroke="#6699cc" strokeWidth="2" strokeDasharray="3,2"/>
                    
                    <text x="280" y="320" textAnchor="end" fill="#333333" fontSize="16" fontWeight="bold">Amygdala</text>
                    <line x1="290" y1="330" x2="330" y2="340" stroke="#e66767" strokeWidth="2" strokeDasharray="3,2"/>
                  </g>
                </svg>
                
                {/* Neural connection lines showing disrupted connectivity */}
                <div className="absolute top-[220px] left-[320px] w-32 border-t-2 border-dashed border-gray-400 opacity-50">
                  <div className="absolute w-full h-full animate-pulse"></div>
                </div>
                <div className="absolute top-[180px] left-[380px] h-32 border-l-2 border-dashed border-gray-400 opacity-50">
                  <div className="absolute w-full h-full animate-pulse"></div>
                </div>
              </div>
            </div>
      
      <p className="mb-6">When trauma occurs, these areas stop working together as they should, leaving the brain stuck in a cycle of hyper-vigilance, emotional dysregulation, and intrusive memories. Let's explore each area in detail:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Amygdala Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-primary mr-2">A</span>
            The Amygdala
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">The Brain's Alarm Bell That Won't Switch Off</h4>
          <p className="mb-4">Think of the amygdala as your personal security system, always scanning for danger. When trauma happens, it goes into overdrive, treating everything as a potential threat.</p>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm"><strong>Key Effect:</strong> Hypervigilance, feeling constantly on edge, being easily triggered—even in safe situations.</p>
          </div>
        </div>
        
        {/* Hippocampus Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-primary mr-2">H</span>
            The Hippocampus
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">Where Memories Get Stuck in the Past</h4>
          <p className="mb-4">The hippocampus helps you tell the difference between then and now. Trauma disrupts this process, making it difficult to recognise that the danger is over.</p>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm"><strong>Key Effect:</strong> Flashbacks, nightmares, and intrusive thoughts that feel like you're reliving the trauma, not just remembering it.</p>
          </div>
        </div>
        
        {/* Prefrontal Cortex Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-primary mr-2">P</span>
            The Prefrontal Cortex
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">The Lost Voice of Reason</h4>
          <p className="mb-4">Normally, this area helps you regulate emotions and make rational decisions. After trauma, it becomes less active, meaning logic takes a back seat to fear.</p>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm"><strong>Key Effect:</strong> Difficulty controlling emotions, thinking clearly, or feeling in charge of your own reactions.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-4 text-[#bd6334]">How These Three Areas Should Work Together</h3>
        <p className="mb-4">In a healthy brain state:</p>
        <ol className="list-decimal pl-8 space-y-2 mb-4">
          <li>The <strong>amygdala</strong> identifies potential threats</li>
          <li>The <strong>hippocampus</strong> provides context ("Is this actually dangerous?")</li>
          <li>The <strong>prefrontal cortex</strong> decides how to respond and regulates emotions</li>
        </ol>
        <p>But trauma disrupts this flow, leaving the amygdala in charge while the hippocampus and prefrontal cortex struggle to function properly.</p>
      </div>
      
      <div className="p-6 border border-dashed border-[#bd6334] rounded-md mb-8">
        <h3 className="font-semibold mb-4 text-center">Reflection Exercise</h3>
        <p className="mb-4">Consider how you've experienced the effects of trauma in your own life. Have you noticed:</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-medium">1. Heightened reactions to certain triggers? (Amygdala)</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a situation where you had a stronger reaction than the situation seemed to warrant..."></textarea>
          </div>
          <div>
            <p className="mb-2 font-medium">2. Moments when past traumas felt like they were happening now? (Hippocampus)</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe any flashbacks or moments when memories felt particularly vivid..."></textarea>
          </div>
          <div>
            <p className="mb-2 font-medium">3. Times when logic couldn't override your emotional responses? (Prefrontal Cortex)</p>
            <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a time when you logically knew you were safe but couldn't feel it..."></textarea>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">The Good News: Neuroplasticity</h3>
        <p className="mb-4">The brain can heal and form new neural pathways throughout life. The exercises in this course are designed to help your prefrontal cortex regain control, calm your amygdala, and help your hippocampus properly process traumatic memories.</p>
        <p className="italic">Understanding how trauma affects your brain is the first step toward healing these neural pathways.</p>
      </div>
    </div>
  )
}

export default Module1Lesson1
