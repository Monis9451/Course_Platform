import React from 'react'

const Module5Lesson2 = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-black mb-8">
        EMOTIONAL ENERGY & HOW THE BODY STORES PAIN
      </h1>
      
      <div className="bg-[#f7f3e9] p-6 rounded-lg mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          Emotions are not merely psychological experiences—they are energetic phenomena that have physical components in our bodies. When we don't process emotional energy fully, it doesn't simply disappear but instead becomes stored within our physical form, often manifesting as tension, pain, or dysfunction.
        </p>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          For decades, researchers and clinicians have observed the connection between emotional experiences and physical symptoms. From the pioneering work of trauma researchers to modern neuroscience, evidence consistently shows that our bodies become repositories for unprocessed emotional experiences.
        </p>
        
        <p className="text-gray-700 leading-relaxed mb-3">Understanding how emotional energy is stored in the body provides valuable insights:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
          <li>The origin of persistent physical symptoms that lack clear medical explanation</li>
          <li>Why certain emotions trigger specific physical sensations</li>
          <li>How traumatic memories become encoded in bodily sensations</li>
          <li>Why release work often requires both somatic and emotional approaches</li>
        </ul>
        
        <p className="font-medium italic text-gray-700">
          In this lesson, we'll explore how emotions become physically stored and map the common patterns of emotional holding in the body.
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Body's Emotional Storage System</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Our bodies store emotional information in specific ways. Understanding these patterns can help you locate and release stored emotional energy:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-3 text-[#bd6334]">Muscle Memory</h4>
            <p className="text-sm text-gray-700">Muscles contract in response to emotion and can maintain these patterns long-term:</p>
            <ul className="list-disc pl-5 pt-2 text-sm space-y-1 text-gray-700">
              <li>Jaw tension often relates to unexpressed anger or words held back</li>
              <li>Shoulder and neck tension commonly stores anxiety and responsibility</li>
              <li>Chest tightness frequently holds grief and unexpressed sadness</li>
              <li>Lower back pain can relate to feeling unsupported or financial stress</li>
            </ul>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-3 text-[#bd6334]">Fascia and Connective Tissue</h4>
            <p className="text-sm text-gray-700">The web of tissue that surrounds muscles and organs holds emotional patterns:</p>
            <ul className="list-disc pl-5 pt-2 text-sm space-y-1 text-gray-700">
              <li>Stores long-term emotional patterns and memories</li>
              <li>Creates restrictions that limit movement and energy flow</li>
              <li>Responds to both physical and emotional trauma</li>
              <li>Can release stored emotion through targeted bodywork</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Emotional Body Mapping</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          This exercise helps you identify where your body might be storing emotional energy through gentle awareness and inquiry.
        </p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Part 1: Body Tension Scan</h4>
            <p className="text-gray-700 mb-2">
              For each statement, rate how true it is for you on a scale from 0 (not at all true) to 5 (very true):
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <p className="text-gray-700 mb-2">1. I find it difficult to say "no" when someone asks for my time or help.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q1" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">2. I tend to share personal information very quickly when meeting new people.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q2" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">3. I often feel responsible for other people's feelings and problems.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q3" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">4. I keep most people at a distance and rarely let others get close.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q4" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">5. I find it difficult to ask for help or support when I need it.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q5" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">6. I often feel resentful about how much I do for others compared to what I receive.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q6" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">7. I tend to abandon my own plans or needs when someone else has a request.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q7" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">8. I have strong opinions about what others should or shouldn't do.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q8" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">9. I find it difficult to be around people who express strong emotions.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q9" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2">10. I tend to avoid conflict, even when something important is at stake.</p>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                      <input type="radio" name="q10" value={num} className="mr-1 accent-[#bd6334]" />
                      <label>{num}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Part 2: Boundary Patterns in Different Contexts</h4>
            <p className="text-gray-700 mb-2">
              Consider how your boundaries vary across different relationships and situations:
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <p className="font-medium mb-2">Family of Origin:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="How do your boundaries typically function with family members? Do you find it easier or harder to set boundaries with family compared to others?"
                ></textarea>
              </div>
              
              <div>
                <p className="font-medium mb-2">Romantic Relationships:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="What patterns do you notice in how you maintain (or struggle with) boundaries in intimate relationships? Are there particular triggers or challenges?"
                ></textarea>
              </div>
              
              <div>
                <p className="font-medium mb-2">Friendships:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="How do you navigate boundaries with friends? Are there differences between close friends and acquaintances?"
                ></textarea>
              </div>
              
              <div>
                <p className="font-medium mb-2">Work/Professional Settings:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="What are your typical boundary patterns in work contexts? How do power dynamics affect your boundaries?"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Part 3: Understanding Your Patterns</h4>
            <p className="text-gray-700 mb-2">
              Based on your responses above, reflect on your overall boundary patterns:
            </p>
            
            <div className="space-y-4 mb-4">
              <div>
                <p className="font-medium mb-2">Which boundary pattern seems most dominant for you?</p>
                <select className="w-full p-3 border border-gray-300 rounded-md mb-3">
                  <option>Please select...</option>
                  <option>Porous/weak boundaries (difficulty saying no, overgiving)</option>
                  <option>Rigid/walls (keeping people at a distance, difficulty letting others in)</option>
                  <option>Fluctuating (swinging between too open and too closed)</option>
                  <option>Context-dependent (strong in some areas, challenged in others)</option>
                </select>
              </div>
              
              <div>
                <p className="font-medium mb-2">How do you think these patterns developed? What experiences shaped them?</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Consider childhood experiences, relationship history, trauma, cultural messages, etc."
                ></textarea>
              </div>
              
              <div>
                <p className="font-medium mb-2">How have these boundary patterns served or protected you?</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Even challenging patterns developed for important reasons. What needs were these patterns trying to meet?"
                ></textarea>
              </div>
              
              <div>
                <p className="font-medium mb-2">What costs or challenges do these patterns create in your life now?</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="How do these patterns impact your relationships, wellbeing, or ability to meet your needs?"
                ></textarea>
              </div>
            </div>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Assessment
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Boundary Patterns After Trauma</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          These patterns represent common adaptations to trauma. You might recognise yourself primarily in one pattern or see elements of several, depending on your experiences and context:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Caretaker/People-Pleaser</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "My needs don't matter as much as others' needs."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Difficulty saying no, even when overwhelmed</li>
                <li>Anticipating others' needs before your own</li>
                <li>Feeling responsible for others' emotions</li>
                <li>Chronic resentment and burnout</li>
                <li>Identity heavily tied to helping others</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops when emotional safety in childhood depended on meeting others' needs or when expressions of your own needs were punished or ignored.</p>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Fortress/Distancer</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "Getting close to others is dangerous."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Maintaining emotional distance in relationships</li>
                <li>Difficulty sharing vulnerabilities</li>
                <li>Strong preference for self-reliance</li>
                <li>Uncomfortable with others' emotional needs</li>
                <li>Tendency to leave relationships when they deepen</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops when emotional or physical safety was compromised by those who should have provided care, or when attachment figures were inconsistent or harmful.</p>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Chameleon/Adapter</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "I must adapt to others to be safe/accepted."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Changing your preferences/opinions to match others</li>
                <li>Uncertainty about your own desires or values</li>
                <li>Strong attunement to others' emotional states</li>
                <li>Difficulty maintaining a consistent sense of self</li>
                <li>Exhaustion from constant adaptation</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops in unpredictable or volatile environments where safety depended on reading others' cues and adapting quickly, or where authentic self-expression was punished.</p>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Controller/Perfectionist</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "Maintaining control is the only way to be safe."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Strong need to control your environment</li>
                <li>Difficulty with flexibility or unpredictability</li>
                <li>Setting rigid rules for yourself and others</li>
                <li>Anxiety when things don't go as planned</li>
                <li>Tendency to micromanage relationships</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops in chaotic or traumatic environments where control (or the illusion of it) was the only available coping mechanism, or where perfectionism was rewarded.</p>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Merger/Fuser</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "Complete closeness equals love and security."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Discomfort with separation in close relationships</li>
                <li>Tendency to lose sense of self in relationships</li>
                <li>Intense fear of abandonment or rejection</li>
                <li>Difficulty distinguishing your feelings from others'</li>
                <li>Relationships become all-consuming</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops when attachment was inconsistent, leading to anxiety about connection, or when boundaries were blurred in family of origin.</p>
          </div>
          
          <div className="bg-[#f8f0e6] p-5 rounded-lg">
            <h4 className="font-medium mb-3">The Oscillator/Ambivalent</h4>
            <p className="mb-3"><span className="italic">Core belief:</span> "Both closeness and distance are threatening."</p>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm"><span className="font-medium">Signs:</span></p>
              <ul className="pl-6 list-disc text-sm space-y-1">
                <li>Swinging between intense closeness and withdrawal</li>
                <li>Sending mixed signals in relationships</li>
                <li>Feeling trapped when close, anxious when distant</li>
                <li>Difficulty finding a comfortable middle ground</li>
                <li>Pattern of approach-avoid in relationships</li>
              </ul>
            </div>
            
            <p className="text-sm"><span className="font-medium">Origin:</span> Often develops in response to relationships that were both essential for survival yet also sources of harm or inconsistency, creating an approach-avoid conflict.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-5 rounded-lg mt-4 border border-[#e6d5c1]">
          <p className="italic text-gray-700">
            Remember that these patterns developed for good reasons. They were adaptations that helped you survive difficult circumstances. Acknowledging them with compassion rather than judgment creates space for growth and change.
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Somatic Signatures of Boundary Challenges</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Your body often gives you important information about your boundaries through physical sensations. Learning to recognise these somatic cues can help you identify when your boundaries are being crossed:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Throat and Voice</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Tightening or constriction in the throat</li>
              <li>Voice becoming softer, higher, or shaky</li>
              <li>Difficulty speaking up or forming words</li>
              <li>Feeling like something is stuck in your throat</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              These sensations often signal difficulty expressing boundaries verbally.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Chest and Heart</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Tightness or heaviness in the chest</li>
              <li>Shallow or restricted breathing</li>
              <li>Racing heart or palpitations</li>
              <li>Feeling of pressure or anxiety in the heart area</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              These sensations often relate to emotional boundaries and feeling safe in connection.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Gut and Stomach</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>"Pit in the stomach" sensation</li>
              <li>Nausea or queasiness</li>
              <li>Butterflies or knots in the abdomen</li>
              <li>Digestive discomfort or "gut feelings"</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              The gut often registers boundary violations before the conscious mind recognises them.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Limbs and Extremities</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Restlessness or fidgeting</li>
              <li>Feeling frozen or unable to move</li>
              <li>Tingling or numbness in hands/feet</li>
              <li>Strong urge to physically leave</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              These sensations often relate to the fight/flight/freeze responses activated by boundary issues.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Face and Head</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Tension in jaw or facial muscles</li>
              <li>Headache or pressure in the head</li>
              <li>Difficulty maintaining eye contact</li>
              <li>Flushing or heat in the face</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              These sensations often signal social discomfort related to boundary setting.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Overall Energy</h4>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Sudden fatigue or energy drain</li>
              <li>Feeling spacey or dissociated</li>
              <li>Sense of heaviness or lightness</li>
              <li>Feeling "off" or "not right"</li>
            </ul>
            
            <p className="text-sm italic mt-3 text-gray-600">
              These sensations reflect how boundary issues affect your overall energetic state.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          To deepen your awareness of your boundary patterns:
        </p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc text-gray-700">
            <li>Complete the "Boundary Pattern Assessment" exercise</li>
            <li>Each day, notice at least one situation where your boundaries feel comfortable and one where they feel challenged</li>
            <li>Practice tuning into your body's signals when in different relationships and contexts</li>
            <li>Reflect on how your boundary patterns have served as adaptations to your circumstances</li>
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

export default Module5Lesson2