import React from 'react'

const Module1Lesson1 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">THE NEUROSCIENCE: HOW TRAUMA REWIRES THE BRAIN</h1>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
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
      
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl h-96">
          {/* Highly realistic human brain diagram SVG */}
          <img src="/brain.png" alt="Brain Diagram" className="w-full h-full object-contain" />
        </div>
      </div>
      
      <p className="mb-6">When trauma occurs, these areas stop working together as they should, leaving the brain stuck in a cycle of hyper-vigilance, emotional dysregulation, and intrusive memories. Let's explore each area in detail:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Amygdala Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-400">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 mr-2">A</span>
            The Amygdala
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">The Brain's Alarm Bell That Won't Switch Off</h4>
          <p className="mb-4">Think of the amygdala as your personal security system, always scanning for danger. When trauma happens, it goes into overdrive, treating everything as a potential threat.</p>
          <div className="bg-red-50 p-3 rounded-md">
            <p className="text-sm"><strong>Key Effect:</strong> Hypervigilance, feeling constantly on edge, being easily triggered—even in safe situations.</p>
          </div>
        </div>
        
        {/* Hippocampus Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-400">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-2">H</span>
            The Hippocampus
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">Where Memories Get Stuck in the Past</h4>
          <p className="mb-4">The hippocampus helps you tell the difference between then and now. Trauma disrupts this process, making it difficult to recognise that the danger is over.</p>
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm"><strong>Key Effect:</strong> Flashbacks, nightmares, and intrusive thoughts that feel like you're reliving the trauma, not just remembering it.</p>
          </div>
        </div>
        
        {/* Prefrontal Cortex Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-400">
          <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 mr-2">P</span>
            The Prefrontal Cortex
          </h3>
          <h4 className="font-medium mb-3 text-sm text-gray-500">The Lost Voice of Reason</h4>
          <p className="mb-4">Normally, this area helps you regulate emotions and make rational decisions. After trauma, it becomes less active, meaning logic takes a back seat to fear.</p>
          <div className="bg-green-50 p-3 rounded-md">
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
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
        <h3 className="font-semibold mb-3 text-[#bd6334]">The Good News: Neuroplasticity</h3>
        <p className="mb-4">The brain can heal and form new neural pathways throughout life. The exercises in this course are designed to help your prefrontal cortex regain control, calm your amygdala, and help your hippocampus properly process traumatic memories.</p>
        <p className="italic">Understanding how trauma affects your brain is the first step toward healing these neural pathways.</p>
      </div>
    </div>
  )
}

export default Module1Lesson1
