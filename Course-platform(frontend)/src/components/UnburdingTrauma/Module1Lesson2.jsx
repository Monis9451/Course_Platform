import React from 'react'

const Module1Lesson2 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-8">THE NERVOUS SYSTEM & TRAUMA</h1>
      
      <p className="mb-6">Trauma doesn't just affect our emotions and thoughts—it also deeply impacts how our bodies function, especially our nervous system. To understand this better, we need to look at the nervous system and how it responds when we're faced with overwhelming experiences.</p>
      
      <p className="mb-6">When trauma occurs, it disrupts the delicate balance our nervous system maintains. Our body's fight-or-flight response (controlled by the sympathetic nervous system) can become stuck in overdrive, or sometimes, it can shut down entirely. This imbalance leads us into two primary states: hyperarousal and hypoarousal.</p>
      
      <div className="bg-[#f7f1e9] p-6 rounded-md mb-6">
        <h3 className="font-semibold mb-3 text-[#bd6334]">Hyperarousal vs. Hypoarousal</h3>
        <ul className="list-disc pl-8 mb-3 space-y-2">
          <li><strong>Hyperarousal</strong> is when the nervous system is on constant alert, ready to react to perceived threats. You might feel anxious, overstimulated, or irrationally fearful, even when there's no immediate danger. It's like having an alarm system that always stays on, creating a state of restlessness or irritability.</li>
          <li><strong>Hypoarousal</strong>, on the other hand, is the shutdown state. Here, you may feel emotionally numb, disconnected, or "checked out". It's a way your nervous system tries to protect you when the emotional weight becomes too much to bear. You may find yourself feeling disengaged, apathetic, or depressed as if your body has hit the pause button.</li>
        </ul>
        <p className="text-sm italic">Both states are protective responses to trauma - neither is wrong or bad.</p>
      </div>
      
      <h2 className="font-semibold text-xl mb-4">The Window of Tolerance</h2>
      
      <p className="mb-6">The Window of Tolerance is the optimal zone where our nervous system feels safe and regulated. When we are within this window—we can handle life's stresses, experience emotions without becoming overwhelmed, and respond to challenges with resilience. However, when we go outside this window—whether into hyperarousal or hypoarousal—we can lose our ability to think clearly, make decisions, or connect with others.</p>
      
      <div className="relative h-40 bg-gradient-to-b from-red-100 via-green-100 to-blue-100 rounded-lg mb-8 overflow-hidden">
        <div className="absolute w-full h-1/3 top-0 flex items-center justify-center bg-red-100/80">
          <span className="font-medium">Hyperarousal - Fight/Flight</span>
        </div>
        <div className="absolute w-full h-1/3 top-1/3 flex items-center justify-center bg-green-100/80 border-y-2 border-[#bd6334]">
          <span className="font-medium text-[#bd6334]">WINDOW OF TOLERANCE</span>
        </div>
        <div className="absolute w-full h-1/3 top-2/3 flex items-center justify-center bg-blue-100/80">
          <span className="font-medium">Hypoarousal - Freeze/Collapse</span>
        </div>
      </div>
      
      <p className="mb-6">Understanding the Window of Tolerance is a game-changer for trauma recovery. It teaches us that we can expand our tolerance for emotions, experiences, and sensations. The more we learn to recognise when we're outside of our window, and implement grounding techniques, self-regulation practices or seek professional support, the easier it becomes to stay within our optimal range, bringing us a sense of control, calm, and empowerment.</p>
      
      <h3 className="font-semibold mt-8 mb-4">Practical Application: Nervous System Check-In</h3>
      <p className="mb-4">Take a moment to check in with your nervous system right now:</p>
      <ol className="list-decimal pl-8 mb-6 space-y-2">
        <li>Notice your breath - is it shallow, rapid, or steady?</li>
        <li>Scan your body - where do you feel tension or relaxation?</li>
        <li>Observe your thoughts - are they racing or sluggish?</li>
        <li>Notice your energy level - do you feel activated or shut down?</li>
      </ol>
      <p className="italic">This simple practise helps you identify your current state and take steps to regulate as needed.</p>
    </div>
  )
}

export default Module1Lesson2
