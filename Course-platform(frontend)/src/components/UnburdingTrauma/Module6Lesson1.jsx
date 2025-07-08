import React from 'react'

const Module6Lesson1 = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-black mb-8">
        CREATING YOUR ONGOING HEALING PRACTICE
      </h1>
      
      <div className="bg-[#f7f3e9] p-6 rounded-lg mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          As you near the end of this course, it's time to create a personalised healing plan that will support your continued growth. This plan serves as a bridge between the structured learning environment of the course and your ongoing independent journey.
        </p>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          An effective healing plan is both practical and flexible, taking into account your unique needs, resources, and circumstances. It provides direction without becoming rigid, allowing space for your healing process to unfold organically.
        </p>
        
        <p className="text-gray-700 leading-relaxed mb-3">Creating your personalised plan helps you:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
          <li>Integrate the practices that have been most helpful for you</li>
          <li>Establish sustainable rhythms for ongoing healing</li>
          <li>Identify resources and support systems</li>
          <li>Navigate challenges and setbacks with greater resilience</li>
        </ul>
        
        <p className="font-medium italic text-gray-700">
          Your healing plan isn't set in stone—it's a living document that will evolve with you as you continue your journey.
        </p>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Creating Your Healing Plan</h3>
          <button className="h-8 px-3 rounded-full text-sm flex items-center bg-gray-100 text-gray-600">
            Mark Complete
          </button>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Take your time with this comprehensive exercise to create a healing plan that truly serves your needs. Remember that this plan belongs to you—make it something that resonates with your authentic self.
        </p>
        
        <div className="space-y-6 mb-6">
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Step 1: Core Practices</h4>
            <p className="text-gray-700 mb-2">
              Identify 3-5 practices from this course that have been most helpful for you and that you want to continue:
            </p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium mb-1">Practice 1:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Practice name and how it helps you..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Practice 2:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Practice name and how it helps you..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Practice 3:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Practice name and how it helps you..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Practice 4 (optional):</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Practice name and how it helps you..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Practice 5 (optional):</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Practice name and how it helps you..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Step 2: Realistic Integration</h4>
            <p className="text-gray-700 mb-2">
              For each practice, decide how you'll realistically integrate it into your life:
            </p>
            
            <div className="overflow-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-[#f8f0e6]">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Practice</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Frequency</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">When/Where</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Reminders</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Practice 1" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select className="w-full p-1 border border-gray-200 rounded-sm">
                        <option>Daily</option>
                        <option>2-3 times/week</option>
                        <option>Weekly</option>
                        <option>As needed</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="5 min" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Morning, bedroom" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Phone alarm" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Practice 2" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select className="w-full p-1 border border-gray-200 rounded-sm">
                        <option>Daily</option>
                        <option>2-3 times/week</option>
                        <option>Weekly</option>
                        <option>As needed</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="10 min" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Evening, living room" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="After dinner" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Practice 3" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select className="w-full p-1 border border-gray-200 rounded-sm">
                        <option>Daily</option>
                        <option>2-3 times/week</option>
                        <option>Weekly</option>
                        <option>As needed</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="15 min" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Weekend, park" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full p-1 border border-gray-200 rounded-sm" placeholder="Calendar event" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Step 3: Support System</h4>
            <p className="text-gray-700 mb-2">
              Identify people, resources, and professional support that can help you on your journey:
            </p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium mb-1">Supportive People:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Friends, family members, or support group members who understand and encourage your healing..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Professional Support:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Therapist, coach, healthcare providers, or other professionals you work with (or plan to)..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Community Resources:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Support groups, classes, workshops, or online communities that might be helpful..."
                ></textarea>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Emergency Resources:</p>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Hotlines, crisis services, or people you can contact during difficult moments..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Step 4: Potential Challenges & Solutions</h4>
            <p className="text-gray-700 mb-2">
              Anticipate possible obstacles and plan how you'll address them:
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Challenge 1:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="Possible obstacle to your healing plan..."
                  ></textarea>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Solution/Adaptation:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="How you might address this challenge..."
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Challenge 2:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="Possible obstacle to your healing plan..."
                  ></textarea>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Solution/Adaptation:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="How you might address this challenge..."
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Challenge 3:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="Possible obstacle to your healing plan..."
                  ></textarea>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Solution/Adaptation:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="How you might address this challenge..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-[#bd6334]">Step 5: Self-Compassion Plan</h4>
            <p className="text-gray-700 mb-2">
              How will you respond to yourself when setbacks or difficulties arise?
            </p>
            
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={4}
              placeholder="When I struggle with my healing plan or experience setbacks, I will..."
            ></textarea>
            
            <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Healing Plan
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">
          Elements of a Sustainable Healing Plan
        </h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          As you create your plan, consider these key elements that support long-term sustainability:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Balance</h4>
            
            <p className="text-gray-700 mb-3">
              A sustainable plan balances different types of practices and needs.
            </p>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Balance solo practices with relational connection</li>
              <li>Balance emotional processing with joy and pleasure</li>
              <li>Balance structured routines with spontaneity</li>
              <li>Balance challenge with comfort and ease</li>
              <li>Balance doing with being</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Realistic Scope</h4>
            
            <p className="text-gray-700 mb-3">
              An effective plan is realistic about what you can consistently maintain.
            </p>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Start small and build gradually</li>
              <li>Consider your energy levels and other commitments</li>
              <li>Focus on quality of practice over quantity</li>
              <li>Plan for the life you actually have, not an ideal one</li>
              <li>Create options for both high and low capacity days</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Meaningful Rituals</h4>
            
            <p className="text-gray-700 mb-3">
              Creating rituals around healing practices helps them become sustaining habits.
            </p>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Link practices to existing routines (e.g., morning coffee)</li>
              <li>Create environmental cues that support practice</li>
              <li>Include sensory elements that feel nourishing</li>
              <li>Acknowledge beginnings and endings of practice sessions</li>
              <li>Connect practices to your deeper values and purpose</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 p-5 rounded-lg">
            <h4 className="font-medium mb-3 text-[#bd6334]">Flexible Adaptation</h4>
            
            <p className="text-gray-700 mb-3">
              A resilient plan includes the ability to adapt to changing circumstances.
            </p>
            
            <ul className="space-y-2 pl-6 list-disc text-gray-700">
              <li>Create "minimum viable practice" versions for low-capacity days</li>
              <li>Schedule regular check-ins to assess what's working</li>
              <li>Be willing to modify practices as your needs change</li>
              <li>Have contingency plans for challenging periods</li>
              <li>View adaptation as wisdom, not failure</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">
          Monitoring Progress Without Judgment
        </h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          An important aspect of your healing plan is having a way to track your progress without falling into self-criticism or rigid expectations. Consider these approaches:
        </p>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Reflective Journaling</h4>
            <p className="text-sm text-gray-700">
              Set aside time weekly or monthly to reflect on your journey. Rather than focusing only on what you "accomplished," notice shifts in how you feel, respond to challenges, and relate to yourself and others.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Compassionate Check-Ins</h4>
            <p className="text-sm text-gray-700">
              Create a ritual of checking in with yourself from a place of kindness. Ask questions like "What do I need right now?" "What's been supportive lately?" and "How can I best care for myself today?"
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Milestone Celebrations</h4>
            <p className="text-sm text-gray-700">
              Mark meaningful milestones in your healing journey with small celebrations or acknowledgments. This helps validate your progress and reinforces your commitment.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <h4 className="font-medium mb-2">Community Witnessing</h4>
            <p className="text-sm text-gray-700">
              Share parts of your journey with trusted others who can reflect back your growth and provide encouragement. This might be friends, family, support groups, or a therapist.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#bd6334] mb-4">
          This Week's Practice
        </h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          To establish your ongoing healing journey:
        </p>
        
        <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Daily Practices</h4>
          <ul className="space-y-2 pl-6 list-disc text-gray-700">
            <li>Complete the "Creating Your Healing Plan" exercise</li>
            <li>Share your plan with at least one supportive person</li>
            <li>Schedule time in your calendar for your core practices</li>
            <li>Begin implementing one element of your plan</li>
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

export default Module6Lesson1