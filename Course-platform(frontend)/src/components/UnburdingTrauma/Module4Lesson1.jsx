import React from 'react';

const Module4Lesson1 = () => {
  return (
    <div className="p-8">
      <h1 className="text-black text-2xl mb-6">THE INNER NARRATIVE: 'I'M NOT ENOUGH,' 'I'M UNSAFE,' 'I'M ALONE'</h1>
      
      <div className="bg-[#FFF1DC] p-6 rounded-md mb-8">
        <p className="mb-4">The stories we tell ourselves shape our entire experience of life. Limiting beliefs are those internal narratives that constrain what we think is possible, acceptable, or available to us. They act like invisible prison walls, restricting our choices and experiences.</p>
        
        <p className="mb-4">Many of our most powerful limiting beliefs formed early in life before we had the cognitive abilities to question them. These core beliefs are particularly challenging to identify precisely because they feel like absolute truths rather than optional perspectives.</p>
        
        <p className="mb-3">Working with limiting beliefs helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Recognize how your thoughts create your reality</li>
          <li>Identify patterns that keep you stuck in familiar struggles</li>
          <li>Question assumptions that have seemed like facts</li>
          <li>Create space for new possibilities and experiences</li>
        </ul>
        
        <p className="font-medium italic">The most liberating discovery is that beliefs are choices, not truths—and different choices create different lives.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Categories of Limiting Beliefs</h3>
        
        <p className="mb-4">Limiting beliefs tend to cluster around these core categories:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Beliefs About Self-Worth</h4>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Common Examples:</p>
                <ul className="space-y-1 pl-5 list-disc text-sm">
                  <li>"I'm not enough (smart, attractive, capable, etc.)"</li>
                  <li>"I don't deserve good things"</li>
                  <li>"I'm broken/damaged/flawed at my core"</li>
                  <li>"My worth depends on what I achieve"</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium">How These Beliefs Limit You:</p>
                <p className="text-sm">These beliefs cause self-sabotage, imposter syndrome, settling for less, and difficulty receiving love or abundance. They create a fundamental sense of unworthiness that affects every area of life.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Beliefs About Capability</h4>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Common Examples:</p>
                <ul className="space-y-1 pl-5 list-disc text-sm">
                  <li>"I can't handle [challenging situation]"</li>
                  <li>"I'll never be good at [skill/ability]"</li>
                  <li>"I always fail at what matters most"</li>
                  <li>"It's too late for me to [learn/change/achieve]"</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium">How These Beliefs Limit You:</p>
                <p className="text-sm">These beliefs lead to avoiding challenges, giving up prematurely, staying in your comfort zone, and missed opportunities. They create a sense of helplessness that prevents growth and new experiences.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Beliefs About Relationships</h4>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Common Examples:</p>
                <ul className="space-y-1 pl-5 list-disc text-sm">
                  <li>"I'll be abandoned/rejected if I show my true self"</li>
                  <li>"I have to earn love through [performance/giving/pleasing]"</li>
                  <li>"People can't be trusted"</li>
                  <li>"Conflict means the relationship is doomed"</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium">How These Beliefs Limit You:</p>
                <p className="text-sm">These beliefs cause difficulty with vulnerability, choosing unavailable partners, people-pleasing behaviors, isolation, and repeating unhealthy patterns. They create disconnection and prevent authentic intimacy.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Beliefs About Life/The World</h4>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Common Examples:</p>
                <ul className="space-y-1 pl-5 list-disc text-sm">
                  <li>"Life is a struggle/battle"</li>
                  <li>"There's never enough (money, time, love, etc.)"</li>
                  <li>"The world is dangerous/unsafe"</li>
                  <li>"Success requires suffering/sacrifice"</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium">How These Beliefs Limit You:</p>
                <p className="text-sm">These beliefs lead to chronic stress, scarcity mindset, defensive living, workaholism, and resistance to joy/ease. They create a fundamental orientation toward life as threatening or lacking rather than supportive or abundant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Uncovering Your Limiting Beliefs</h3>                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
        </div>
        
        <p className="mb-4">Identifying your limiting beliefs requires becoming a detective of your own mind. Use these approaches to uncover beliefs that may be operating below your conscious awareness:</p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3">Method 1: Follow the Emotion Trail</h4>
            <p className="mb-2">Strong emotional reactions often point to underlying beliefs. Think of a recent situation where you felt a strong negative emotion (anxiety, shame, anger, etc.):</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={2}
              placeholder="Describe a recent situation that triggered a strong emotional reaction..."
            ></textarea>
            
            <p className="mb-2">Now, ask yourself what you must believe for this situation to cause such a strong reaction:</p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={2}
              placeholder="For me to feel this way, I must believe that..."
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Method 2: Examine Your "I Can't" Statements</h4>
            <p className="mb-2">Notice areas where you tell yourself something isn't possible for you specifically:</p>
            
            <div className="space-y-2 mb-4">                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>"I can't speak up in groups/meetings"</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>"I can't handle confrontation/conflict"</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>"I can't be successful in [area]"</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>"I can't trust my judgment/decisions"</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Other: "I can't..."</span>
                    </div>
            </div>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={2}
              placeholder="What deeper belief might be underneath your 'I can't' statement?"
            ></textarea>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Method 3: Notice Your "Always/Never" Thinking</h4>
            <p className="mb-2">Absolute statements often reveal core limiting beliefs. Complete these sentences honestly:</p>
            
            <div className="space-y-3">
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md mb-1"
                rows={1}
                placeholder="I always have to..."
              ></textarea>
              
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md mb-1"
                rows={1}
                placeholder="I never get to..."
              ></textarea>
              
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md mb-1"
                rows={1}
                placeholder="People always..."
              ></textarea>
              
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md mb-1"
                rows={1}
                placeholder="Life never..."
              ></textarea>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Method 4: Examine Your Core Life Areas</h4>
            <p className="mb-2">For each area of life, identify a limiting belief that might be affecting your experience:</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Money/Finances:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-1"
                  rows={1}
                  placeholder="My limiting belief about money is..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Relationships/Love:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-1"
                  rows={1}
                  placeholder="My limiting belief about relationships is..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Health/Body:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-1"
                  rows={1}
                  placeholder="My limiting belief about my health/body is..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Career/Purpose:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-1"
                  rows={1}
                  placeholder="My limiting belief about my work/purpose is..."
                ></textarea>
              </div>
            </div>                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours mt-4">
                    Save Reflection
                  </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Formation of Limiting Beliefs</h3>
        
        <p className="mb-4">Understanding how limiting beliefs form helps reduce their power and creates compassion for yourself.</p>
        
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6d5c1]"></div>
            
            <div className="relative pl-10 pb-8">                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">1</div>
              <h4 className="font-medium mb-2">Direct Messaging</h4>
              <p className="text-sm mb-1">Explicitly told messages from authority figures that we internalize.</p>
              <p className="text-sm italic">"You'll never amount to anything." "Money doesn't grow on trees." "Don't trust anyone."</p>
            </div>
            
            <div className="relative pl-10 pb-8">                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">2</div>
              <h4 className="font-medium mb-2">Modeling</h4>
              <p className="text-sm mb-1">Absorbing the unspoken beliefs of family members through their behaviors.</p>
              <p className="text-sm italic">Watching parents struggle with money, relationships, or self-worth teaches us what's "normal."</p>
            </div>
            
            <div className="relative pl-10 pb-8">                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">3</div>
              <h4 className="font-medium mb-2">Misinterpreted Experiences</h4>
              <p className="text-sm mb-1">Childhood conclusions drawn from experiences with our limited understanding.</p>
              <p className="text-sm italic">A parent leaving leads to "I'm not worthy of love" rather than "Adults have complex problems."</p>
            </div>
            
            <div className="relative pl-10 pb-8">                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">4</div>
              <h4 className="font-medium mb-2">Cultural Programming</h4>
              <p className="text-sm mb-1">Societal messages about our worth based on identity, appearance, etc.</p>
              <p className="text-sm italic">Media, education, and cultural norms teaching us what's valuable, beautiful, or acceptable.</p>
            </div>
            
            <div className="relative pl-10">                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">5</div>
              <h4 className="font-medium mb-2">Protective Adaptations</h4>
              <p className="text-sm mb-1">Beliefs developed to protect us from emotional pain or perceived threats.</p>
              <p className="text-sm italic">"Never depend on anyone" as a way to avoid potential abandonment pain.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Signs a Belief Is Limiting You</h3>
        
        <p className="mb-4">How do you know if a belief is truly limiting your potential? Look for these indicators:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Emotional Charge</h4>
            <p className="text-sm">The belief triggers strong emotions when questioned or challenged. You might feel defensive, anxious, or angry at the mere suggestion that this belief might not be absolutely true.</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Black and White Language</h4>
            <p className="text-sm">The belief contains absolutes: always, never, everyone, no one, impossible, etc. This rigid thinking leaves no room for exceptions, growth, or new possibilities.</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Recurring Patterns</h4>
            <p className="text-sm">You notice the same frustrating situations happening repeatedly in your life—same types of relationships, financial challenges, work conflicts, etc. These patterns often stem from underlying beliefs.</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Desire-Behavior Gap</h4>
            <p className="text-sm">There's a disconnection between what you say you want and what you actually do or achieve. Limiting beliefs often operate as invisible saboteurs of your conscious intentions.</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Energy Drain</h4>
            <p className="text-sm">Thinking about certain areas of life feels heavy, draining, or hopeless. This often indicates a limiting belief is creating a sense of predetermination or lack of agency.</p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Negative Self-Talk</h4>
            <p className="text-sm">You notice a harsh inner critic that uses specific recurring phrases or judgments. These often directly reflect your core limiting beliefs about yourself and what's possible.</p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="mb-4">To begin identifying and working with your limiting beliefs:</p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc">
            <li>Complete the "Uncovering Your Limiting Beliefs" exercise</li>
            <li>Start a belief journal, noting when you catch yourself in absolute thinking</li>
            <li>Each day, identify one limiting belief and ask "Is this absolutely true? How do I know?"</li>
            <li>Notice how your body feels when you hold a limiting belief vs. when you question it</li>
          </ul>
        </div>
        
        <div className="flex justify-between items-centre">
          <h4 className="font-medium">Your Commitment:</h4>
          <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
            I Commit to This Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module4Lesson1;
