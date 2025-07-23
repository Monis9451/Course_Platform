import React from 'react'

const Module6Lesson3 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">VISIONING THE HEALED SELF & EMBRACING POST-TRAUMA GROWTH</h1>
      
      <div className="bg-yellow-100 p-6 rounded-md mb-8">
        <p className="mb-4">In trauma recovery, we often focus intensely on what needs healing, sometimes overlooking the remarkable strengths and progress we've already developed. Taking time to acknowledge and celebrate your journey is not just a pleasant addition—it's an essential component of healing.</p>
        
        <p className="mb-4">Intentional celebration helps rewire your brain to recognise positive changes, countering the negativity bias that can keep you focused only on what's still difficult. It also reinforces neural pathways associated with resilience, growth, and possibility.</p>
        
        <p className="mb-3">Celebrating your progress and strengths helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Recognise how far you've come on your healing journey</li>
          <li>Identify and amplify your innate strengths and capacities</li>
          <li>Build momentum for continued growth and healing</li>
          <li>Develop a more balanced self-perception</li>
        </ul>
        
        <p className="font-medium italic">Acknowledging your progress isn't about toxic positivity—it's about seeing yourself with clear, compassionate eyes that recognise both challenges and triumphs.</p>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Celebration Inventory</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="mb-4">This exercise helps you identify and acknowledge your progress, strengths, and growth, creating a more complete picture of yourself beyond the wounds you're healing.</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Part 1: Signs of Progress</h4>
            <p className="mb-2">Reflect on changes you've noticed since beginning your healing journey. These might be subtle shifts rather than dramatic transformations.</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium mb-1">Changes in how you relate to yourself:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="I've noticed changes in how I speak to myself, care for myself, or view myself..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Changes in how you relate to others:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="I've noticed changes in my relationships, boundaries, or communication..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Changes in how you respond to challenges:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="I've noticed changes in how I handle stress, triggers, or difficult emotions..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Changes in your body and physical experience:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="I've noticed changes in my body sensations, tension patterns, or physical awareness..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Part 2: Strengths Inventory</h4>
            <p className="mb-2">Identify the strengths and resilient qualities you've developed or discovered. These might include qualities that emerged directly because of your challenges.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-[#f8f0e6] p-5 rounded-lg">
                <h5 className="font-medium mb-3">Courage & Resilience</h5>
                <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Perseverance through difficulty</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Willingness to face painful truths</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Courage to be vulnerable</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Ability to start again after setbacks</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Inner resourcefulness</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg">
                <h5 className="font-medium mb-3">Emotional Intelligence</h5>
                <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Self-awareness</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Empathy for others' struggles</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Ability to name and process feelings</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Emotional regulation skills</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Intuitive understanding of others</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg">
                <h5 className="font-medium mb-3">Wisdom & Perspective</h5>
                <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Deeper understanding of human nature</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Ability to see multiple perspectives</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Insight into what truly matters</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Capacity for meaning-making</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Discernment in relationships</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg">
                <h5 className="font-medium mb-3">Compassion & Connection</h5>
                <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Self-compassion</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Ability to support others</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Capacity for authentic connection</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Willingness to be vulnerable</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                    <span className="text-sm">Ability to forgive self and others</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Additional strengths I recognise in myself:</p>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Other strengths, qualities, or capacities I've developed..."
              ></textarea>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Part 3: Celebration Planning</h4>
            <p className="mb-2">Create a meaningful way to acknowledge and celebrate your progress and strengths:</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium mb-1">A personal celebration ritual:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="A meaningful way I will celebrate my progress (e.g., a special meal, time in nature, creative expression, etc.)..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">People I'd like to share this milestone with:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="People who have supported my journey and how I might share with them..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">A message to my future self:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="What I want to remember about this moment in my healing journey..."
                ></textarea>
              </div>
            </div>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Celebration Plan
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Neuroscience of Celebration</h3>
        
        <p className="mb-4">Celebration isn't just a nice addition to healing—it's neurologically powerful. Here's why it matters so much:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Reinforcing Neural Pathways</h4>
            <p className="mb-3">When you celebrate progress, you strengthen the neural connections associated with positive change.</p>
            
            <ul className="space-y-2 pl-6 list-disc">
              <li>The brain's reward system releases dopamine</li>
              <li>This creates stronger memory encoding</li>
              <li>Neural pathways for new behaviours are reinforced</li>
              <li>Change becomes more sustainable over time</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Countering the Negativity Bias</h4>
            <p className="mb-3">Our brains are naturally wired to focus more on threats and problems than on positive experiences.</p>
            
            <ul className="space-y-2 pl-6 list-disc">
              <li>Trauma further strengthens this negative bias</li>
              <li>Celebration helps balance this tendency</li>
              <li>Intentionally noticing positives creates new patterns</li>
              <li>The brain gradually becomes more balanced in its focus</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Expanding Emotional Capacity</h4>
            <p className="mb-3">Celebration helps expand your capacity for positive emotions, which is often constricted after trauma.</p>
            
            <ul className="space-y-2 pl-6 list-disc">
              <li>Helps overcome fear of feeling good</li>
              <li>Builds tolerance for joy and pleasure</li>
              <li>Creates a broader emotional vocabulary</li>
              <li>Develops a more flexible nervous system</li>
            </ul>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">Social Connection & Resilience</h4>
            <p className="mb-3">Sharing celebrations with others activates our social engagement system, which is key to healing.</p>
            
            <ul className="space-y-2 pl-6 list-disc">
              <li>Releases oxytocin and other bonding hormones</li>
              <li>Creates positive associations with connection</li>
              <li>Builds a narrative of shared triumph</li>
              <li>Strengthens support networks that buffer stress</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Overcoming Celebration Resistance</h3>
        
        <p className="mb-4">Many trauma survivors find it challenging to celebrate their progress. If you notice resistance to acknowledging your strengths and growth, you're not alone. Common concerns include:</p>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">"If I celebrate, something bad will happen."</h4>
            <p className="text-sm">This fear often stems from experiences where joy was followed by pain or where feeling good seemed dangerous.</p>
            <p className="text-sm mt-2 italic"><strong>Reframe:</strong> "I'm creating new patterns now. Feeling good doesn't invite harm. I can celebrate while remaining grounded and aware."</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">"I haven't done enough to deserve celebration."</h4>
            <p className="text-sm">Trauma often creates impossible standards and a sense that you must "earn" basic acknowledgment.</p>
            <p className="text-sm mt-2 italic"><strong>Reframe:</strong> "All progress deserves recognition. My steps forward matter, regardless of their size. I don't need to earn the right to acknowledge my growth."</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">"Celebrating feels self-indulgent or selfish."</h4>
            <p className="text-sm">Many survivors were taught that focusing on themselves in any positive way was wrong or inappropriate.</p>
            <p className="text-sm mt-2 italic"><strong>Reframe:</strong> "Celebrating my healing nourishes my capacity to be present for others too. Taking time to acknowledge my journey is an act of self-respect, not selfishness."</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">"I'm still struggling, so celebration feels false."</h4>
            <p className="text-sm">The presence of ongoing challenges can make it hard to acknowledge progress.</p>
            <p className="text-sm mt-2 italic"><strong>Reframe:</strong> "Healing isn't an all-or-nothing state. I can honour my growth while still acknowledging my challenges. Both realities can exist simultaneously."</p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To embrace celebration as part of your healing journey:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Complete the "Celebration Inventory" exercise</li>
            <li>Each day, note at least one sign of progress or strength you observe in yourself</li>
            <li>Plan and implement your personal celebration ritual</li>
            <li>Share your growth with at least one supportive person</li>
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

export default Module6Lesson3