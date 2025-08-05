import React, { useState } from 'react';

const Module4Lesson2 = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [answers, setAnswers] = useState({});
  const [completedReflections, setCompletedReflections] = useState(new Set());

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const markReflectionComplete = (reflectionId) => {
    setCompletedReflections(prev => new Set([...prev, reflectionId]));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg- p-4 md:p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="text mb-8">
          <h2 className="text-xl md:text-2xl text-black mb-6">
            HOW TRAUMA SHAPES BELIEFS ABOUT SELF AND OTHERS
          </h2>
          {/* <div className="w-24 h-1 bg-gradient-to-r from-[#D2691E] to-[#CD853F] mx-auto rounded-full"></div> */}
        </div>

        {/* Introduction */}
        <div className="bg-[#FFF1DC] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">The Lens of Trauma</h3>
          <p className="text-black leading-relaxed mb-4">
            Trauma doesn't just affect our emotions and bodies - it fundamentally shapes how we see ourselves, others, and the world around us. These trauma-formed beliefs act like a lens through which we interpret every experience, often without us even realising it.
          </p>
          <p className="text-black leading-relaxed">
            Understanding these beliefs is crucial because they influence every aspect of our lives - from our relationships and career choices to our daily decisions and self-care practices. Today, we'll explore the most common trauma-related beliefs and learn to recognise them in our own thinking patterns.
          </p>
        </div>

        {/* Learning Objectives */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-[#DEB887]/30">
            <h3 className="text-xl font-semibold text-[#8B4513] mb-4 flex items-centre">
              <span className="w-8 h-8 bg-[#D2691E] text-white rounded-full flex items-centre justify-centre text-sm mr-3">🎯</span>
              Learning Objectives
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-[#5D4037]">
              <li>Understand how trauma creates core beliefs about safety, self-worth, and relationships</li>
              <li>Identify common trauma-related beliefs and their impact on daily life</li>
              <li>Explore how different types of trauma shape specific belief patterns</li>
              <li>Develop awareness of your own trauma-related beliefs</li>
            </ul>
          </div>

          {/* Core Beliefs Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#8B4513] mb-6 flex items-centre">
            <span className="w-10 h-10 bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white rounded-full flex items-centre justify-centre text-lg mr-4">🧠</span>
            The Three Pillars of Trauma Beliefs
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Safety Beliefs */}
            <div className="bg-gray-100 p-5 rounded-lg border border-[#DDA0DD]/30">
              <h4 className="text-lg font-semibold text-primary mb-3 flex items-centre">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-centre justify-centre text-sm mr-3">🛡️</span>
                Safety & Trust
              </h4>
              <ul className="space-y-2 text-sm text-primary">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "The world is dangerous"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "People can't be trusted"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I must stay alert to survive"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "Nowhere is truly safe"
                </li>
              </ul>
            </div>

            {/* Self-Worth Beliefs */}
            <div className="bg-gray-100 p-5 rounded-lg border border-[#DDA0DD]/30">
              <h4 className="text-lg font-semibold text-primary mb-3 flex items-centre">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-centre justify-centre text-sm mr-3">💫</span>
                Self-Worth
              </h4>
              <ul className="space-y-2 text-sm text-primary">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I am fundamentally flawed"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "It was my fault"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I am not worthy of love"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I am powerless"
                </li>
              </ul>
            </div>

            {/* Control Beliefs */}
            <div className="bg-gray-100 p-5 rounded-lg border border-[#DDA0DD]/30">
              <h4 className="text-lg font-semibold text-[#8B4513] mb-3 flex items-centre">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-centre justify-centre text-sm mr-3">⚖️</span>
                Control & Power
              </h4>
              <ul className="space-y-2 text-sm text-primary">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I have no control"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I must control everything"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "Bad things always happen"
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  "I can't depend on anyone"
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Belief Explorer */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#8B4513] mb-6 flex items-centre">
            <span className="w-10 h-10 bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white rounded-full flex items-centre justify-centre text-lg mr-4">🔍</span>
            Explore Common Trauma Beliefs
          </h3>
          
          <div className="space-y-4">
            {[
              {
                id: 'safety',
                title: 'Safety & Trust Beliefs',
                icon: '🛡️',
                beliefs: [
                  {
                    belief: '"The world is dangerous"',
                    description: 'Constant hypervigilance and difficulty feeling safe in everyday situations.',
                    examples: ['Avoiding crowded places', 'Checking locks multiple times', 'Startling easily at unexpected sounds']
                  },
                  {
                    belief: '"People cannot be trusted"',
                    description: 'Difficulty forming close relationships and assuming negative intent from others.',
                    examples: ['Keeping emotional distance', 'Testing others\' loyalty', 'Expecting betrayal or abandonment']
                  },
                  {
                    belief: '"I must stay alert to survive"',
                    description: 'Chronic vigilance that prevents relaxation and rest.',
                    examples: ['Difficulty sleeping', 'Scanning for threats', 'Unable to fully relax']
                  }
                ]
              },
              {
                id: 'selfworth',
                title: 'Self-Worth Beliefs',
                icon: '💫',
                beliefs: [
                  {
                    belief: '"I am fundamentally flawed"',
                    description: 'Deep sense of being inherently damaged or broken.',
                    examples: ['Feeling different from others', 'Believing you don\'t deserve good things', 'Self-criticism and shame']
                  },
                  {
                    belief: '"It was my fault"',
                    description: 'Taking responsibility for trauma that was not your fault.',
                    examples: ['Self-blame for past events', 'Guilt about not preventing trauma', 'Feeling responsible for others\' actions']
                  },
                  {
                    belief: '"I am not worthy of love"',
                    description: 'Belief that you don\'t deserve care, affection, or positive relationships.',
                    examples: ['Pushing people away', 'Settling for less than you deserve', 'Difficulty accepting compliments']
                  }
                ]
              },
              {
                id: 'control',
                title: 'Control & Power Beliefs',
                icon: '⚖️',
                beliefs: [
                  {
                    belief: '"I have no control"',
                    description: 'Feeling powerless to influence your life or circumstances.',
                    examples: ['Learned helplessness', 'Giving up easily', 'Feeling like a victim of circumstances']
                  },
                  {
                    belief: '"I must control everything"',
                    description: 'Attempting to micromanage life to prevent future trauma.',
                    examples: ['Perfectionism', 'Difficulty delegating', 'Anxiety when plans change']
                  },
                  {
                    belief: '"Bad things always happen to me"',
                    description: 'Expectation that negative events are inevitable.',
                    examples: ['Catastrophic thinking', 'Preparing for the worst', 'Difficulty enjoying good moments']
                  }
                ]
              }
            ].map((section) => (
              <div key={section.id} className="border border-[#DEB887]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 bg-gradient-to-r from-[#F5E6D3] to-[#F0E68C]/30 flex items-centre justify-between hover:from-[#F0E68C]/40 hover:to-[#F5E6D3] transition-colours duration-300"
                >
                  <div className="flex items-centre">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <span className="text-lg font-semibold text-[#8B4513]">{section.title}</span>
                  </div>
                  <span className={`text-[#8B4513] transform transition-transform duration-300 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                
                {expandedSection === section.id && (
                  <div className="p-4 bg-white/50 space-y-4">
                    {section.beliefs.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-[#DEB887]/20">
                        <h5 className="font-semibold text-[#8B4513] mb-2">{item.belief}</h5>
                        <p className="text-[#5D4037] mb-3">{item.description}</p>
                        <div className="bg-[#F8F4F0] p-3 rounded-md">
                          <p className="text-sm font-medium text-[#8B4513] mb-2">Common manifestations:</p>
                          <ul className="text-sm text-[#5D4037] space-y-1">
                            {item.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-[#D2691E] mr-2">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Personal Reflection Exercise */}
        <div className="bg-gradient-to-br from-[#FFF8DC] to-[#F0E68C]/20 rounded-xl p-6 mb-8 border border-[#DEB887]/40">
          <h3 className="text-2xl font-semibold text-[#8B4513] mb-6 flex items-centre">
            <span className="w-10 h-10 bg-primary text-white rounded-full flex items-centre justify-centre text-lg mr-4">📝</span>
            Personal Belief Identification
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white/80 p-5 rounded-lg">
              <h4 className="text-lg font-semibold text-primary mb-3">Reflection Questions</h4>
              <p className="text-[#5D4037] mb-4">
                Take time to reflect on these questions. There are no right or wrong answers - this is about building self-awareness.
              </p>
              
              <div className="space-y-4">
                {[
                  "Which of the beliefs we've discussed feel most familiar to you?",
                  "When do you notice these beliefs being strongest in your daily life?",
                  "How do these beliefs currently protect you?",
                  "In what ways might these beliefs be limiting you now?"
                ].map((question, index) => (
                  <div key={index} className="bg-[#F8F4F0] p-4 rounded-lg">
                    <label className="block text-[#8B4513] font-medium mb-2">
                      {index + 1}. {question}
                    </label>
                    <textarea
                      className="w-full p-3 border border-[#DEB887]/30 rounded-md resize-none focus:ring-2 focus:ring-[#D2691E]/50 focus:border-[#D2691E] transition-colours duration-200"
                      rows="3"
                      placeholder="Take your time to reflect..."
                      value={answers[`reflection_${index}`] || ''}
                      onChange={(e) => handleAnswerChange(`reflection_${index}`, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => markReflectionComplete('personal_beliefs')}
                className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-colours duration-300 ${
                  completedReflections.has('personal_beliefs')
                    ? 'bg-green-500 text-white'
                    : 'bg-[#D2691E] text-white hover:bg-[#B8860B]'
                }`}
                disabled={completedReflections.has('personal_beliefs')}
              >
                {completedReflections.has('personal_beliefs') ? '✓ Reflection Complete' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        </div>

        {/* How Beliefs Form Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-[#8B4513] mb-6 flex items-centre">
            <span className="w-10 h-10 bg-primary text-white rounded-full flex items-centre justify-centre text-lg mr-4">🔄</span>
            How Trauma Beliefs Form
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-100 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-primary mb-3">The Survival Function</h4>
                <p className="text-black leading-relaxed">
                  Trauma beliefs form as our mind's attempt to make sense of overwhelming experiences and prevent future harm. They serve an important survival function by helping us detect and avoid potential threats.
                </p>
              </div>
              
              <div className="bg-gray-100 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-primary mb-3">Pattern Recognition</h4>
                <p className="text-black leading-relaxed">
                  Our brains naturally look for patterns to predict and prevent future trauma. These patterns become beliefs that guide our behaviour, even when the original threat is no longer present.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-primary mb-3">Generalisation</h4>
                <p className="text-black leading-relaxed">
                  Trauma beliefs often generalise beyond the original situation. A belief formed from one harmful relationship might apply to all relationships, or danger in one context might extend to feeling unsafe everywhere.
                </p>
              </div>
              
              <div className="bg-gray-100 p-5 rounded-lg">
                <h4 className="text-lg font-semibold text-primary mb-3">Reinforcement</h4>
                <p className="text-black leading-relaxed">
                  These beliefs become stronger when our behaviour based on them seems to keep us safe. Avoiding situations reinforces the belief that they were dangerous, creating a cycle that maintains the belief.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8 border border-[#DDA0DD]/30">
          <h3 className="text-2xl font-semibold text-primary mb-6 flex items-centre">
            <span className="w-10 h-10 bg-primary text-white rounded-full flex items-centre justify-centre text-lg mr-4">📊</span>
            Assessing the Impact of Your Beliefs
          </h3>
          
          <div className="bg-white/80 p-5 rounded-lg">
            <p className="text-[#5D4037] mb-4">
              Consider how your current beliefs might be impacting different areas of your life. This isn't about judgment - it's about awareness.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-primary">Potential Protective Benefits:</h4>
                <ul className="space-y-2 text-[#5D4037]">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Increased awareness of potential dangers
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Motivation to avoid harmful situations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Heightened intuition about people and situations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Strong survival instincts
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#8B4513]">Potential Limiting Effects:</h4>
                <ul className="space-y-2 text-[#5D4037]">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    Missed opportunities for connection and growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    Chronic stress and hypervigilance
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    Difficulty trusting and forming relationships
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    Limited self-esteem and self-compassion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8 border-l-4 border-primary">
          <h3 className="text-2xl font-semibold text-primary mb-6 flex items-centre">
            <span className="w-10 h-10 bg-primary text-white rounded-full flex items-centre justify-centre text-lg mr-4">💡</span>
            Key Takeaways
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Beliefs Are Protective</h4>
                <p className="text-black text-sm">
                  Your trauma-related beliefs developed to keep you safe. They made sense given what you experienced and shouldn't be dismissed or judged.
                </p>
              </div>
              
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Beliefs Can Limit</h4>
                <p className="text-black text-sm">
                  While protective, these beliefs may now limit your ability to fully engage with life, relationships, and opportunities for growth and healing.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Awareness Is the First Step</h4>
                <p className="text-black text-sm">
                  Simply becoming aware of these belief patterns is the first step toward having more choice about how they influence your life.
                </p>
              </div>
              
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Change Is Possible</h4>
                <p className="text-black text-sm">
                  These beliefs aren't permanent fixtures. With awareness, patience, and practice, you can develop more balanced and helpful ways of thinking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-[#8B4513] mb-4 flex items-centre">
            <span className="w-8 h-8 bg-[#D2691E] text-white rounded-full flex items-centre justify-centre text-sm mr-3">📈</span>
            Lesson Progress
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-centre p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-primary">Belief Categories</div>
            </div>
            <div className="text-centre p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Object.keys(answers).length}</div>
              <div className="text-sm text-primary">Reflections</div>
            </div>
            <div className="text-centre p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">{completedReflections.size}</div>
              <div className="text-sm text-primary">Completed</div>
            </div>
            <div className="text-centre p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-primary">Understanding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module4Lesson2;
