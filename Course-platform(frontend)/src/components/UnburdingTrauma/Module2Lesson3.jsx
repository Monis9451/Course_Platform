import React from 'react'

const Module2Lesson3 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">GROUNDING THROUGH THE SENSES: TOUCH, MOVEMENT, BREATH</h1>
      
      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <p className="mb-4">When trauma triggers your nervous system, you may find yourself disconnected from the present moment—either hypervigilant and anxious, or numb and shut down.</p>
        
        <p className="mb-4">Grounding techniques use your five senses to bring you back to the here and now. By intentionally connecting with what you can see, hear, touch, smell, and taste, you provide your brain with clear evidence that you're safe in the present moment, not trapped in the past.</p>
        
        <p className="mb-3">Effective grounding:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Interrupts trauma responses in the nervous system</li>
          <li>Creates a sense of safety and presence</li>
          <li>Helps you "come back to your body" when dissociated</li>
          <li>Can be practiced anywhere, at any time</li>
        </ul>
        
        <p className="font-medium italic">The simple act of connecting with your senses can be a powerful anchor during emotional storms.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The 5-4-3-2-1 Grounding Technique</h3>
        
        <p className="mb-4">This popular technique systematically engages all five senses to firmly anchor you in the present moment.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">How to Practice</h4>
            <ol className="space-y-2 pl-6 list-decimal">
              <li><strong>5 things you can SEE</strong> - Look around and name five things you can see in detail</li>
              <li><strong>4 things you can TOUCH/FEEL</strong> - Notice four things you can physically feel (your feet on the floor, clothes on your skin, etc.)</li>
              <li><strong>3 things you can HEAR</strong> - Listen for three different sounds in your environment</li>
              <li><strong>2 things you can SMELL</strong> - Notice two scents, or simply take two conscious breaths through your nose</li>
              <li><strong>1 thing you can TASTE</strong> - Notice one taste, or simply acknowledge the current taste in your mouth</li>
            </ol>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Helpful Tips</h4>
            <ul className="space-y-2 pl-6 list-disc">
              <li>Focus on <strong>details</strong> - "I see my blue mug with the chip on the handle, steam rising from it..."</li>
              <li>Move <strong>slowly</strong> through each step, taking your time</li>
              <li><strong>Name sensations precisely</strong> - "My sweater feels soft and slightly heavy on my shoulders"</li>
              <li>Practice when <strong>calm</strong> so it's easier to use when distressed</li>
              <li>Keep this technique <strong>handy</strong> (write it on a card or save it in your phone)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Touch-Based Grounding</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">The sense of touch is particularly powerful for grounding because it directly connects us to our physical bodies. This exercise introduces several touch-based techniques you can use anytime you need to come back to the present moment.</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Hand Temperature</h4>
            <p className="mb-2">This method uses temperature contrast to create strong physical sensations:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li>Run your hands under <strong>cold water</strong> for 30 seconds</li>
              <li>Then run them under <strong>warm water</strong> for 30 seconds</li>
              <li>Notice the temperature change and the sensations in your hands</li>
              <li>Focus on the details: tingling, warmth spreading, blood flow</li>
            </ol>
            
            <p className="text-sm italic">Alternative: Hold an ice cube in one hand until it becomes uncomfortable, then switch hands. The intense cold sensation can quickly interrupt dissociation.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Texture Exploration</h4>
            <p className="mb-2">Keep a "grounding kit" with items of different textures:</p>
            
            <ul className="space-y-2 pl-6 list-disc mb-4">
              <li>Something <strong>soft</strong> (velvet, silk, or fur fabric swatch)</li>
              <li>Something <strong>rough</strong> (sandpaper, denim, or bark)</li>
              <li>Something with an <strong>interesting shape</strong> (a shell, smooth stone, or stress ball)</li>
              <li>Something that makes a <strong>sound</strong> when manipulated (beads, paper that crinkles)</li>
            </ul>
            
            <p className="mb-2">When you feel disconnected, take out one item and explore it thoroughly with your fingers. Notice every detail of how it feels against your skin.</p>
            
            <p className="text-sm italic">Pro tip: Keep small grounding objects in multiple locations—your desk, car, nightstand, and pocket or purse—so they're always within reach when needed.</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Your Experience</h4>
          <p className="text-sm mb-2">After trying these grounding techniques, reflect on your experience:</p>
          
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
            rows={3}
            placeholder="Which technique was most effective for you? What sensations did you notice in your body?"
          ></textarea>
          
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
            Save Reflection
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Movement-Based Grounding</h3>
        
        <p className="mb-4">Movement is a powerful way to reconnect with the body by activating the proprioceptive sense—your awareness of your body's position in space.</p>
        
        <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
          <h4 className="font-medium mb-4 text-[#bd6334]">Three Quick Movement Grounding Techniques</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-2">Push & Pull</h5>
              <p className="mb-3">This creates muscle engagement that brings awareness to your physical strength:</p>
              <ol className="space-y-1 pl-5 list-decimal text-sm">
                <li>Push your palms firmly against a wall or solid surface</li>
                <li>Push for 5-10 seconds, engaging your arm muscles</li>
                <li>Release and notice the sensations</li>
                <li>Alternatively, try pulling on a sturdy railing or doorknob</li>
              </ol>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Rhythmic Movement</h5>
              <p className="mb-3">Rhythm helps regulate the nervous system:</p>
              <ol className="space-y-1 pl-5 list-decimal text-sm">
                <li>Tap your feet in alternating patterns</li>
                <li>Gently sway from side to side</li>
                <li>Pat your thighs with alternating hands</li>
                <li>Try walking while counting your steps</li>
              </ol>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Body Scan & Tense</h5>
              <p className="mb-3">Systematically engage and release muscle groups:</p>
              <ol className="space-y-1 pl-5 list-decimal text-sm">
                <li>Starting at your feet, tense the muscles for 5 seconds</li>
                <li>Release and notice the sensation</li>
                <li>Move up to calves, thighs, abdomen, etc.</li>
                <li>End with facial muscles and then release your whole body</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Breath as an Always-Available Anchor</h3>
        
        <p className="mb-4">Your breath is always with you, making it one of the most accessible grounding tools. Unlike other techniques that require external objects or specific environments, breath-based grounding can be practiced anywhere, anytime—even in the midst of triggering situations.</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h4 className="font-medium mb-3">4-7-8 Breathing</h4>
            <p className="mb-3">This pattern activates the parasympathetic nervous system, creating a calming effect:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li><strong>Inhale</strong> through your nose for a count of 4</li>
              <li><strong>Hold</strong> your breath for a count of 7</li>
              <li><strong>Exhale</strong> completely through your mouth for a count of 8</li>
              <li>Repeat 3-4 times, or until you feel more grounded</li>
            </ol>
            
            <p className="text-sm italic">Note: If this pattern feels too challenging, simplify it to a 4-4-4 pattern (4 counts in, 4 counts hold, 4 counts out) or simply focus on making your exhale longer than your inhale.</p>
          </div>
          
          <div className="md:w-1/2">
            <h4 className="font-medium mb-3">Sensory Breath Awareness</h4>
            <p className="mb-3">This practice combines breath with sensory awareness:</p>
            
            <ol className="space-y-2 pl-6 list-decimal mb-4">
              <li><strong>Feel</strong> the air entering your nostrils—is it cool or warm?</li>
              <li><strong>Notice</strong> your chest and belly expanding and contracting</li>
              <li><strong>Listen</strong> to the subtle sound of your breath</li>
              <li><strong>Observe</strong> any sensations in your throat as air passes through</li>
              <li><strong>Follow</strong> the complete journey of your breath</li>
            </ol>
            
            <p className="text-sm italic">This technique works well because it combines physical sensation with mindful awareness, creating a double anchor to the present moment.</p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To integrate grounding techniques into your daily life:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Practice the 5-4-3-2-1 technique once daily, even when you're feeling calm</li>
            <li>Create a grounding kit with various textured items</li>
            <li>Set reminders to take 3 conscious breaths several times throughout your day</li>
            <li>Use one movement grounding technique whenever you transition between activities</li>
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

export default Module2Lesson3
