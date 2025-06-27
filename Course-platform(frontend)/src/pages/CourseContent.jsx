import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Headphones, FileText, File } from 'lucide-react';

const CourseContent = () => {
     const { id } = useParams();
    const CourseId = id ? parseInt(id) : 1; // Default to Unburdening Trauma
    const [activeModule, setActiveModule] = useState(null);
    const [activeLessonId, setActiveLessonId] = useState(null);
    const [lessonContent, setLessonContent] = useState(null);
    const [moduleData, setModuleData] = useState(null);

    //Fetch course
    const Course  = fetch(`/api/courses/${CourseId}`)

    //Fetch module
    const module  = fetch(`/api/courses/${CourseId}`)

    //Fetch lesson content

    const moduleStructure = [
    { 
      id: 1, 
      title: "Understanding Trauma & the Body",
      subtitle: "Why We Get Stuck in Pain – and How Awareness Sets Us Free",
      lessons: [
        { id: 1, title: "The Neuroscience: How trauma rewires the brain", type: "text" },
        { id: 2, title: "The Nervous System & Trauma", type: "text" },
        { id: 3, title: "Trauma Responses: Fight, Flight, Freeze, Fawn - How Trauma Manifests in Behaviour", type: "text" },
        { id: 4, title: "Dissociation in PTSD: Depersonalisation, Derealisation, Dissociative Amnesia", type: "text" },
        { id: 5, title: "Personal Trauma Timeline", type: "exercise", downloadable: true },
        { id: 6, title: "Self-Assessment - Trauma Responses", type: "exercise" },
        { id: 7, title: "Trauma Body Map", type: "exercise", downloadable: true },
        { id: 8, title: "Guided Visualisation - Grounding & Nervous System Regulation", type: "audio" }
      ] 
    },
    { 
      id: 2, 
      title: "Reconnecting with the Body",
      subtitle: "Coming Back to Yourself – Safety, Sensation, and Presence",
      lessons: [
        { id: 9, title: "Why Trauma Disconnects Us from the Body", type: "text" },
        { id: 10, title: "Felt Sense & Body Awareness: Listening to Inner Signals", type: "text" },
        { id: 11, title: "Grounding Through the Senses: Touch, Movement, Breath", type: "exercise" },
        { id: 12, title: "Safe Space Visualisation", type: "audio" },
        { id: 13, title: "Somatic Reflection – When Do I Feel Present?", type: "exercise" },
        { id: 14, title: "Mindful Movement Practice", type: "video" },
        { id: 15, title: "Body Awareness Meditation", type: "audio" }
      ] 
    },
    { 
      id: 3, 
      title: "Inner Child Healing",
      subtitle: "Reclaiming the Parts of You That Still Hurt",
      lessons: [
        { id: 16, title: "Understanding the Inner Child and Emotional Wounds", type: "text" },
        { id: 17, title: "How Childhood Pain Shapes Adult Patterns", type: "text" },
        { id: 18, title: "Reparenting: Offering Compassion to the Self Within", type: "exercise" },
        { id: 19, title: "Meet your Inner Child", type: "audio" },
        { id: 20, title: "What My Inner Child Needs to Hear", type: "exercise" },
        { id: 21, title: "Creating a Self-Compassion Ritual", type: "exercise" },
        { id: 22, title: "Letter to your Inner Child", type: "exercise" },
        { id: 23, title: "Inner Child Healing Meditation", type: "audio" }
      ] 
    },
    { 
      id: 4, 
      title: "Challenging Limiting Beliefs",
      subtitle: "Transforming the Stories That Keep You Stuck",
      lessons: [
        { id: 24, title: "How Trauma Creates Limiting Beliefs", type: "text" },
        { id: 25, title: "Common Trauma-Related Beliefs", type: "text" },
        { id: 26, title: "Finding Your Negative Core Beliefs", type: "exercise" },
        { id: 27, title: "Belief Detective: Gathering Evidence", type: "exercise" },
        { id: 28, title: "Creating Empowering Alternative Beliefs", type: "exercise" },
        { id: 29, title: "Embodying New Beliefs Visualisation", type: "audio" },
        { id: 30, title: "Affirmation Practice for Trauma Healing", type: "exercise" }
      ] 
    },
    { 
      id: 5, 
      title: "Boundary Work & Healthy Relationships",
      subtitle: "Creating Safety in Connection",
      lessons: [
        { id: 31, title: "Why Boundaries Matter in Trauma Recovery", type: "text" },
        { id: 32, title: "Identifying Your Boundary Patterns", type: "exercise" },
        { id: 33, title: "Setting & Maintaining Healthy Boundaries", type: "text" },
        { id: 34, title: "Communicating Boundaries with Compassion", type: "exercise" },
        { id: 35, title: "Boundary Meditation", type: "audio" },
        { id: 36, title: "Relationships as Healing Spaces", type: "text" }
      ] 
    },
    { 
      id: 6, 
      title: "Integration & Moving Forward",
      subtitle: "From Surviving to Thriving",
      lessons: [
        { id: 37, title: "The Ongoing Journey of Trauma Recovery", type: "text" },
        { id: 38, title: "Creating Your Personalised Healing Plan", type: "exercise" },
        { id: 39, title: "Connecting with Your Future Self", type: "audio" },
        { id: 40, title: "Celebrating Your Progress & Strengths", type: "exercise" },
        { id: 41, title: "Building Your Community – Support and Connection (Practical Steps)", type: "exercise" },
        { id: 42, title: "Integration Meditation", type: "audio" },
        { id: 43, title: "Resources for Continued Healing", type: "text", downloadable: true }
      ] 
    }
  ];

  // Set initial active module and lesson if none selected
  useEffect(() => {
    if (module && Array.isArray(module) && module.length > 0 && !activeModule) {
      setActiveModule(1);
      if (moduleStructure[0].lessons && moduleStructure[0].lessons.length > 0) {
        setActiveLessonId(moduleStructure[0].lessons[0].id);
      }
    }
  }, [module, activeModule]);

  useEffect(() => {
    if (activeLessonId) {
      // Find which module contains this lesson
      let currentModule = null;
      for (const module of moduleStructure) {
        const lesson = module.lessons.find(l => l.id === activeLessonId);
        if (lesson) {
          currentModule = module;
          break;
        }
      }
      
      if (currentModule) {
        setModuleData(currentModule);
        
        // Get lesson content
        const lessonData = currentModule.lessons.find(l => l.id === activeLessonId);
        if (lessonData) {
          setLessonContent(lessonData);
        }
      }
    }
  }, [activeLessonId]);

    // Navigation functions
  const goToPreviousLesson = () => {
    if (!activeLessonId) return;
    
    // Find current lesson position
    let prevLessonId = null;
    let foundInCurrentModule = false;
    
    for (const module of moduleStructure) {
      for (let i = 0; i < module.lessons.length; i++) {
        const lesson = module.lessons[i];
        
        if (lesson.id === activeLessonId) {
          // If not first lesson in module
          if (i > 0) {
            prevLessonId = module.lessons[i - 1].id;
          } 
          // If first lesson in module but not first module
          else if (moduleStructure.indexOf(module) > 0) {
            const prevModule = moduleStructure[moduleStructure.indexOf(module) - 1];
            prevLessonId = prevModule.lessons[prevModule.lessons.length - 1].id;
          }
          foundInCurrentModule = true;
          break;
        }
      }
      if (foundInCurrentModule) break;
    }
    
    if (prevLessonId) {
      setActiveLessonId(prevLessonId);
    }
  };

    const goToNextLesson = () => {
    if (!activeLessonId) return;
    
    // Find current lesson position
    let nextLessonId = null;
    let foundInCurrentModule = false;
    
    for (const module of moduleStructure) {
      for (let i = 0; i < module.lessons.length; i++) {
        const lesson = module.lessons[i];
        
        if (lesson.id === activeLessonId) {
          // If not last lesson in module
          if (i < module.lessons.length - 1) {
            nextLessonId = module.lessons[i + 1].id;
          } 
          // If last lesson in module but not last module
          else if (moduleStructure.indexOf(module) < moduleStructure.length - 1) {
            const nextModule = moduleStructure[moduleStructure.indexOf(module) + 1];
            nextLessonId = nextModule.lessons[0].id;
          }
          foundInCurrentModule = true;
          break;
        }
      }
      if (foundInCurrentModule) break;
    }
    
    if (nextLessonId) {
      setActiveLessonId(nextLessonId);
    }
  };

    // Lesson content by type
  const getLessonContent = () => {
    if (!lessonContent || !moduleData) return null;

    switch (lessonContent.id) {

        case 1: 
        return (
          <div>
            <h1 className="text-[#bd6334] text-2xl mb-6">THE NEUROSCIENCE: HOW TRAUMA REWIRES THE BRAIN</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Understanding The Neuroscience of Trauma</h3>
              <p className="mb-4">Trauma isn't just something that happens to us - it changes us, right down to the way our brain functions. If you've ever wondered why certain triggers bring back overwhelming emotions, why your body reacts before your mind catches up, or why it feels impossible to just move on, the answer lies in how trauma rewires the brain.</p>
              <div className="flex items-centre">
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
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-400">
                <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-centre">
                  <span className="flex items-centre justify-centre w-8 h-8 rounded-full bg-red-100 text-red-600 mr-2">A</span>
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
                <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-centre">
                  <span className="flex items-centre justify-centre w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-2">H</span>
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
                <h3 className="font-bold text-xl mb-3 text-[#bd6334] flex items-centre">
                  <span className="flex items-centre justify-centre w-8 h-8 rounded-full bg-green-100 text-green-600 mr-2">P</span>
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
              <h3 className="font-semibold mb-4 text-centre">Reflection Exercise</h3>
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
        );
      case 2:
        return (
          <div>
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
              <div className="absolute w-full h-1/3 top-0 flex items-centre justify-centre bg-red-100/80">
                <span className="font-medium">Hyperarousal - Fight/Flight</span>
              </div>
              <div className="absolute w-full h-1/3 top-1/3 flex items-centre justify-centre bg-green-100/80 border-y-2 border-[#bd6334]">
                <span className="font-medium text-[#bd6334]">WINDOW OF TOLERANCE</span>
              </div>
              <div className="absolute w-full h-1/3 top-2/3 flex items-centre justify-centre bg-blue-100/80">
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
        );
      case 3:
        return (
          <div>
            <h1 className="text-black text-2xl mb-8">TRAUMA RESPONSES: FIGHT, FLIGHT, FREEZE, FAWN – HOW TRAUMA MANIFESTS IN BEHAVIOUR</h1>
            
            <p className="mb-6">These trauma responses aren't just reactions—they're survival strategies your body learned when it didn't feel safe. They often become habits, roles, even identities.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Fight Response Card */}
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
                <h3 className="font-bold text-xl mb-3 text-red-700 flex items-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fight Response
                </h3>
                <p className="mb-3">Looks like defensiveness, anger, controlling behaviour.</p>
                <p className="italic text-red-700">"I must overpower the threat to survive."</p>
                <div className="mt-4 text-sm">
                  <strong>Common signs:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    <li>Argumentative behaviour</li>
                    <li>Quick to anger</li>
                    <li>Controlling tendencies</li>
                    <li>Verbal aggression</li>
                  </ul>
                </div>
              </div>
              
              {/* Flight Response Card */}
              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-400">
                <h3 className="font-bold text-xl mb-3 text-yellow-700 flex items-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Flight Response
                </h3>
                <p className="mb-3">Manifests as anxiety, perfectionism, busyness, or avoidance.</p>
                <p className="italic text-yellow-700">"If I can just keep moving, nothing can catch me."</p>
                <div className="mt-4 text-sm">
                  <strong>Common signs:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    <li>Constant busyness</li>
                    <li>Workaholic tendencies</li>
                    <li>Perfectionism</li>
                    <li>Avoidance behaviors</li>
                  </ul>
                </div>
              </div>
              
              {/* Freeze Response Card */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <h3 className="font-bold text-xl mb-3 text-blue-700 flex items-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Freeze Response
                </h3>
                <p className="mb-3">Creates feeling numb, shutting down, dissociating.</p>
                <p className="italic text-blue-700">"If I don't move, I can't be seen."</p>
                <div className="mt-4 text-sm">
                  <strong>Common signs:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    <li>Brain fog</li>
                    <li>Feeling stuck or paralyzed</li>
                    <li>Numbness</li>
                    <li>Emotional shutdown</li>
                  </ul>
                </div>
              </div>
              
              {/* Fawn Response Card */}
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
                <h3 className="font-bold text-xl mb-3 text-green-700 flex items-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Fawn Response
                </h3>
                <p className="mb-3">Shows up as people-pleasing, self-abandonment, over-accommodation.</p>
                <p className="italic text-green-700">"If I make everyone happy, maybe I'll be safe."</p>
                <div className="mt-4 text-sm">
                  <strong>Common signs:</strong>
                  <ul className="list-disc ml-5 mt-1">
                    <li>People-pleasing</li>
                    <li>Difficulty saying no</li>
                    <li>Self-abandonment</li>
                    <li>Emotional caretaking</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-4 text-[#bd6334]">Recognizing Your Patterns</h3>
              <p className="mb-4">Each of these responses is intelligent and protective. Each kept you alive. The work now isn't to get rid of them, but to recognise when they show up, thank them for their protection, and choose your response from a place of awareness.</p>
              <p className="mb-2 font-medium">Reflect on these questions:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Which response pattern do you recognise most clearly in yourself?</li>
                <li>What situations tend to trigger these responses?</li>
                <li>How has this response pattern served to protect you in the past?</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-md">
              <h3 className="font-semibold mb-4">Journaling Exercise</h3>
              <p className="mb-4">Take some time to journal about a recent situation where you noticed one of these trauma responses activated:</p>
              <ol className="list-decimal pl-8 space-y-2">
                <li>What happened just before you noticed the response?</li>
                <li>What physical sensations did you experience in your body?</li>
                <li>Which response pattern was activated (Fight, Flight, Freeze, or Fawn)?</li>
                <li>What was this response trying to protect you from?</li>
                <li>If you could respond from your adult, regulated self now, what might that look like?</li>
              </ol>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h1 className="text-black text-2xl mb-8">DISSOCIATION IN TRAUMA: DEPERSONALISATION, DEREALISATION, DISSOCIATIVE AMNESIA</h1>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-8 border border-purple-100">
              <h2 className="text-lg font-semibold mb-3 text-purple-800">What is Dissociation?</h2>
              <p className="mb-4">Dissociation is the nervous system's emergency brake. When things become too overwhelming, we split—mentally, emotionally, even physically. It's a protective mechanism that helps us survive unbearable experiences.</p>
              <div className="flex items-centre justify-centre mb-4">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-centre justify-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div className="h-1 w-12 bg-purple-200"></div>
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-centre justify-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="h-1 w-12 bg-purple-200"></div>
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-centre justify-centre">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <p className="text-centre italic text-purple-800 mb-4">Disconnect → Protect → Safety</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Depersonalisation Card */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-centre justify-centre mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-centre">Depersonalisation</h3>
                <p className="text-gray-700">Feeling detached from yourself, like you're observing your life instead of living it.</p>
                <div className="mt-4 bg-purple-50 p-3 rounded">
                  <p className="italic text-sm">"I feel like I'm watching myself in a movie. My body doesn't feel like it belongs to me."</p>
                </div>
              </div>
              
              {/* Derealisation Card */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-centre justify-centre mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-centre">Derealisation</h3>
                <p className="text-gray-700">Feeling like your surroundings aren't real, everything feels dreamlike or off.</p>
                <div className="mt-4 bg-blue-50 p-3 rounded">
                  <p className="italic text-sm">"The world looks foggy or distant. Things seem unreal, like I'm in a dream or behind glass."</p>
                </div>
              </div>
              
              {/* Dissociative Amnesia Card */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-centre justify-centre mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3 text-centre">Dissociative Amnesia</h3>
                <p className="text-gray-700">Gaps in memory, especially around trauma. This isn't forgetfulness—it's protection.</p>
                <div className="mt-4 bg-indigo-50 p-3 rounded">
                  <p className="italic text-sm">"There are whole chunks of my childhood I can't remember. Traumatic events seem to have 'missing pieces'."</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-4 text-[#bd6334]">Important to Remember</h3>
              <p className="mb-4"><strong>You're not losing your mind.</strong> These are normal responses to abnormal experiences. Dissociation happens when the mind says, "It's too much, let's pause this." Healing means helping those parts feel safe enough to come back.</p>
              
              <div className="border-l-4 border-[#bd6334] pl-4 italic">
                <p>Dissociation exists on a spectrum. Almost everyone dissociates to some degree - like zoning out while driving or getting lost in a book. Trauma-related dissociation is more intense and occurs as a protective mechanism.</p>
              </div>
            </div>
            
            <div className="border rounded-md p-6">
              <h3 className="font-semibold mb-4">Grounding Practice for Dissociation</h3>
              <p className="mb-4">When you notice yourself dissociating, try this 5-4-3-2-1 grounding technique:</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-centre justify-centre mr-3 flex-shrink-0">5</span>
                  <p><strong>See:</strong> Name 5 things you can see around you</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-centre justify-centre mr-3 flex-shrink-0">4</span>
                  <p><strong>Touch:</strong> Name 4 things you can touch or feel (like your feet on the ground)</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-centre justify-centre mr-3 flex-shrink-0">3</span>
                  <p><strong>Hear:</strong> Name 3 things you can hear</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-centre justify-centre mr-3 flex-shrink-0">2</span>
                  <p><strong>Smell:</strong> Name 2 things you can smell (or like to smell)</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-[#bd6334] text-white font-bold rounded-full w-6 h-6 flex items-centre justify-centre mr-3 flex-shrink-0">1</span>
                  <p><strong>Taste:</strong> Name 1 thing you can taste (or like to taste)</p>
                </div>
              </div>
              <p className="mt-4 text-sm italic">This exercise helps bring your awareness back to the present moment and reconnect with your senses.</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6 flex items-centre">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              PERSONAL TRAUMA TIMELINE
            </h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Why Create a Timeline?</h3>
              <p className="mb-4">Creating a trauma timeline helps you visualize your life's journey and identify patterns. This process can reveal connections between past events and current behaviors, providing insight into your healing journey. By mapping these experiences, you gain a new perspective on your resilience and growth.</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">Recognition</p>
                  <p>Acknowledge events that have shaped you, both big and seemingly small</p>
                </div>
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">Patterns</p>
                  <p>Identify recurring themes and responses across different life stages</p>
                </div>
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">Integration</p>
                  <p>Begin to see your story as a whole, not just isolated painful moments</p>
                </div>
              </div>
            </div>
            
            <p className="mb-6">Let's begin by creating your Personal Trauma Timeline. This is a private, safe space for reflection.</p>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Guidance for Your Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium">Identify Key Events</p>
                    <p className="text-gray-700">Write down significant moments in your life that you feel were shaped by trauma. Include childhood, adolescence, and adulthood experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium">Note Multiple Impacts</p>
                    <p className="text-gray-700">For each event, reflect on how it affected you emotionally, physically, mentally, and relationally. What beliefs about yourself formed from these experiences?</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium">Include Resilience Points</p>
                    <p className="text-gray-700">Also mark moments of strength, healing, and growth on your timeline. These are equally important parts of your story.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-1 border-4 border-[#f7f1e9] rounded-lg mb-8">
              <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
                <h3 className="font-semibold mb-6 text-centre">Your Personal Timeline</h3>
                
                <div className="w-full h-1 bg-[#bd6334] my-8 relative">
                  <div className="absolute left-0 -top-7 text-sm font-medium">Early Childhood</div>
                  <div className="absolute left-0 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
                  
                  <div className="absolute left-1/4 -top-7 text-sm font-medium">Adolescence</div>
                  <div className="absolute left-1/4 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
                  
                  <div className="absolute left-1/2 -top-7 text-sm font-medium">Early Adulthood</div>
                  <div className="absolute left-1/2 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
                  
                  <div className="absolute left-3/4 -top-7 text-sm font-medium">Mid Adulthood</div>
                  <div className="absolute left-3/4 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
                  
                  <div className="absolute right-0 -top-7 text-sm font-medium">Present</div>
                  <div className="absolute right-0 bottom-2 h-4 w-0.5 bg-[#bd6334]"></div>
                </div>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium mb-2">Event:</p>
                    <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
                    <p className="font-medium mt-3 mb-2">Impact:</p>
                    <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium mb-2">Event:</p>
                    <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
                    <p className="font-medium mt-3 mb-2">Impact:</p>
                    <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium mb-2">Event:</p>
                    <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe a significant event..."></textarea>
                    <p className="font-medium mt-3 mb-2">Impact:</p>
                    <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="How did this affect you emotionally, physically, mentally?"></textarea>
                  </div>
                  
                  <div className="p-4 border border-dashed border-gray-300 rounded-md flex items-centre justify-centre">
                    <button className="flex items-centre text-[#bd6334]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Another Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-4">Reflection Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">1. What patterns or themes do you notice across your timeline?</p>
                  <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div>
                  <p className="font-medium mb-2">2. How have these experiences shaped your beliefs about yourself and others?</p>
                  <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <div>
                  <p className="font-medium mb-2">3. What strengths or resilience have you developed as a result?</p>
                  <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-centre mt-8 gap-4">
              <button className="inline-flex items-centre bg-[#bd6334] text-white rounded-full px-6 py-3 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                SAVE YOUR WORK
              </button>
              
              <button className="inline-flex items-centre border-2 border-[#bd6334] text-[#bd6334] rounded-full px-6 py-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                DOWNLOAD WORKSHEET
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6 flex items-centre">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              SELF-ASSESSMENT - TRAUMA RESPONSES
            </h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Why Self-Assessment Matters</h3>
              <p className="mb-4">Self-assessment is a powerful tool for trauma healing. By developing awareness of how trauma manifests in your daily life, you gain the ability to respond rather than react. This process builds your capacity for self-regulation and creates space for new patterns to emerge.</p>
              <div className="flex items-centre">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#bd6334] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="italic">Remember, this is a safe space for honest reflection. There are no right or wrong answers—just your truth.</p>
              </div>
            </div>
            
            <p className="mb-6 text-lg">Let's tune into how trauma shows up for you on a daily basis.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Emotional Responses</h3>
                <p className="mb-4 font-medium">"When I feel triggered, I usually..."</p>
                <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Consider: Do you shut down? Get angry? Seek control? Feel anxious?</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Emotional Patterns</h3>
                <p className="mb-4 font-medium">"The emotional pain I struggle with most often is..."</p>
                <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Consider: Is it abandonment? Shame? Fear? Helplessness? Rejection?</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-all hover:shadow-md mb-8">
              <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Physical Manifestations</h3>
              <p className="mb-4 font-medium">"My trauma shows up in my body as..."</p>
              <textarea className="w-full p-3 border border-gray-300 rounded-md h-32" placeholder="Write your response here..."></textarea>
              <div className="mt-3 text-sm text-gray-500">
                <p>Consider: Tension? Pain? Digestive issues? Sleep problems? Chronic fatigue?</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
              <h3 className="font-semibold mb-4">Additional Reflection Prompts</h3>
              <div className="space-y-6">
                <div>
                  <p className="mb-3 font-medium">"The situations that most commonly trigger my trauma responses are..."</p>
                  <textarea className="w-full p-3 border border-gray-300 rounded-md h-20" placeholder="Write your response here..."></textarea>
                </div>
                
                <div>
                  <p className="mb-3 font-medium">"When I notice I'm triggered, what helps me come back to centre is..."</p>
                  <textarea className="w-full p-3 border border-gray-300 rounded-md h-20" placeholder="Write your response here..."></textarea>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Integration Practice</h3>
              <p className="mb-4">After completing your reflections, take a moment to place a hand on your heart. Acknowledge the courage it takes to look honestly at your patterns. Breathe deeply and offer yourself these words of compassion:</p>
              <div className="p-4 bg-white rounded-md italic text-centre">
                "I honour my journey and my resilience. These patterns developed to protect me, and I'm grateful for that protection. As I become more aware, I create space for new possibilities."
              </div>
            </div>
            
            <div className="flex justify-centre mt-8">
              <button className="inline-flex items-centre bg-[#bd6334] text-white rounded-full px-6 py-3 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                SAVE YOUR REFLECTIONS
              </button>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6 flex items-centre">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              SOMATIC MAPPING EXERCISE
            </h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Reconnecting with Your Body</h3>
              <p className="mb-4">Many trauma survivors experience disconnection from their bodies as a protective response. This powerful exercise will help you begin to notice and map bodily sensations—safely and gently. It's a way to tune in without judgment and create a visual language for how trauma resides in your physical form.</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm mt-4">
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">Safety First</p>
                  <p>If at any point you feel overwhelmed, pause the exercise and use a grounding technique</p>
                </div>
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">Go Slowly</p>
                  <p>There's no rush—this is about gentle curiosity, not forcing anything</p>
                </div>
                <div className="flex-1 bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium text-[#bd6334] mb-1">No Judgment</p>
                  <p>However you experience your body is valid—there are no wrong answers</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Getting Started</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium">Create Your Space</p>
                      <p className="text-gray-700">Find a quiet, comfortable space where you won't be disturbed for at least 20 minutes. Have the body outline and something to mark it with ready.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium">Ground Yourself</p>
                      <p className="text-gray-700">Take three deep breaths, breathing in for 4 counts, holding for 2, and releasing for 6. Feel your feet on the floor and your body supported.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#bd6334] text-white rounded-full w-6 h-6 flex items-centre justify-centre mr-3 mt-0.5 flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium">Set an Intention</p>
                      <p className="text-gray-700">Say to yourself: "I am exploring my body with curiosity and compassion. I can pause anytime I need to."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Body Scan Guide</h3>
                <p className="mb-4">Begin to scan your body from head to toe and notice:</p>
                <div className="space-y-3">
                  <div className="flex items-centre border-l-4 border-red-400 pl-3 py-1 bg-red-50">
                    <p>Where do I feel <strong>heaviness</strong> or pressure?</p>
                  </div>
                  <div className="flex items-centre border-l-4 border-blue-400 pl-3 py-1 bg-blue-50">
                    <p>Where do I feel <strong>numb</strong> or disconnected?</p>
                  </div>
                  <div className="flex items-centre border-l-4 border-yellow-400 pl-3 py-1 bg-yellow-50">
                    <p>Where do I feel <strong>tingling</strong>, pain, or heat?</p>
                  </div>
                  <div className="flex items-centre border-l-4 border-green-400 pl-3 py-1 bg-green-50">
                    <p>Where do I feel <strong>aliveness</strong>, ease, or warmth?</p>
                  </div>
                </div>
                <p className="mt-4 text-sm italic">Take your time with each area. There's no rush.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h3 className="font-semibold mb-4 text-[#bd6334] border-b pb-2">Mapping Your Sensations</h3>
              <p className="mb-4">Mark these areas on your body map using colours, symbols, or words that feel right to you:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 p-3 rounded-md border border-red-200">
                  <p className="font-medium text-red-700 mb-1">Tension/Heaviness</p>
                  <p className="text-sm">A tight chest might be red with the word "guarded" or "constricted"</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <p className="font-medium text-blue-700 mb-1">Numbness</p>
                  <p className="text-sm">A numb leg might be blue with the word "invisible" or "frozen"</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <p className="font-medium text-yellow-700 mb-1">Activation</p>
                  <p className="text-sm">A buzzing arm might be yellow with the word "electric" or "anxious"</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md border border-green-200">
                  <p className="font-medium text-green-700 mb-1">Comfort/Safety</p>
                  <p className="text-sm">Areas of ease might be green with words like "peaceful" or "open"</p>
                </div>
              </div>
              
              <p className="mb-4">Use metaphors that make sense to you. For example:</p>
              <ul className="list-disc pl-8 mb-6 space-y-2">
                <li>"My chest feels like a locked box with something trying to get out."</li>
                <li>"My shoulders are carrying invisible bricks."</li>
                <li>"My stomach is a coiled spring, ready to unwind."</li>
                <li>"My hands feel light, like they could float away."</li>
              </ul>
            </div>
            
            <div className="p-1 border-4 border-[#f7f1e9] rounded-lg mb-8">
              <div className="p-6 border border-dashed border-[#bd6334] rounded-lg bg-white">
                <h3 className="font-semibold mb-6 text-centre">Your Body Map</h3>
                
                <div className="flex justify-centre my-8">
                  <div className="flex flex-col items-centre">
                    <div className="relative w-80 h-96">
                      {/* Professional human body silhouette SVG */}
                      <svg width="100%" height="100%" viewBox="0 0 200 500" xmlns="http://www.w3.org/2000/svg">
                        {/* Simpler, professional human silhouette in light beige */}
                        <g fill="#F8D7A4">
                          {/* Head */}
                          <circle cx="100" cy="40" r="30" />
                          
                          {/* Neck */}
                          <rect x="90" y="70" width="20" height="15" />
                          
                          {/* Torso */}
                          <path d="M70 85 L130 85 L135 230 L65 230 Z" />
                          
                          {/* Arms */}
                          <path d="M70 85 L40 160 L30 200 L50 215 L65 180 L70 145 Z" />
                          <path d="M130 85 L160 160 L170 200 L150 215 L135 180 L130 145 Z" />
                          
                          {/* Legs */}
                          <path d="M65 230 L60 350 L50 450 L80 450 L90 230 Z" />
                          <path d="M135 230 L140 350 L150 450 L120 450 L110 230 Z" />
                        </g>
                      </svg>
                      
                      {/* Example annotation points precisely positioned for this silhouette */}
                      <div className="absolute top-[40px] left-[100px] w-6 h-6 rounded-full bg-red-400 border-2 border-white shadow-sm cursor-pointer" title="Tension in head"></div>
                      <div className="absolute top-[75px] left-[100px] w-5 h-5 rounded-full bg-blue-400 border-2 border-white shadow-sm cursor-pointer" title="Pressure in neck"></div>
                      <div className="absolute top-[130px] left-[100px] w-7 h-7 rounded-full bg-blue-400 border-2 border-white shadow-sm cursor-pointer" title="Heaviness in chest"></div>
                      <div className="absolute top-[190px] left-[100px] w-7 h-7 rounded-full bg-yellow-400 border-2 border-white shadow-sm cursor-pointer" title="Anxiety in stomach"></div>
                      <div className="absolute top-[160px] left-[50px] w-5 h-5 rounded-full bg-green-400 border-2 border-white shadow-sm cursor-pointer" title="Strength in arm"></div>
                      <div className="absolute top-[350px] left-[70px] w-5 h-5 rounded-full bg-blue-300 border-2 border-white shadow-sm cursor-pointer" title="Numbness in leg"></div>
                      
                      {/* Minimalist labels for different body parts */}
                      <div className="absolute top-[20px] right-[30px] text-xs bg-white px-1 rounded shadow-sm">Head</div>
                      <div className="absolute top-[75px] right-[30px] text-xs bg-white px-1 rounded shadow-sm">Neck</div>
                      <div className="absolute top-[130px] right-[30px] text-xs bg-white px-1 rounded shadow-sm">Chest</div>
                      <div className="absolute top-[190px] right-[30px] text-xs bg-white px-1 rounded shadow-sm">Abdomen</div>
                      <div className="absolute top-[160px] left-[20px] text-xs bg-white px-1 rounded shadow-sm">Arm</div>
                      <div className="absolute top-[350px] right-[30px] text-xs bg-white px-1 rounded shadow-sm">Leg</div>
                    </div>
                    
                    <div className="mt-6 text-centre">
                      <p className="text-sm text-gray-500 italic">Click on areas of your body where you feel sensations to add markers</p>
                      <div className="flex justify-centre mt-4 space-x-4">
                        <div className="flex items-centre">
                          <div className="w-4 h-4 rounded-full bg-red-400 mr-1"></div>
                          <span className="text-xs">Tension/Pain</span>
                        </div>
                        <div className="flex items-centre">
                          <div className="w-4 h-4 rounded-full bg-blue-400 mr-1"></div>
                          <span className="text-xs">Heaviness</span>
                        </div>
                        <div className="flex items-centre">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 mr-1"></div>
                          <span className="text-xs">Anxiety</span>
                        </div>
                        <div className="flex items-centre">
                          <div className="w-4 h-4 rounded-full bg-green-400 mr-1"></div>
                          <span className="text-xs">Ease/Comfort</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="font-medium mb-2">Sensations:</p>
                    <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Describe what you notice..."></textarea>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Emotions:</p>
                    <textarea rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="What emotions arise?"></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-3 text-[#bd6334]">Closing the Practice</h3>
              <div className="space-y-4">
                <p className="mb-2">To complete this exercise:</p>
                
                <div className="flex items-start">
                  <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-centre justify-centre border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">1</div>
                  <p>Place a hand gently on one area that feels disconnected or tense. Breathe into it for 3-5 breaths.</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-centre justify-centre border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">2</div>
                  <p>Say quietly to yourself: "I am safe enough to begin listening to my body. These sensations have wisdom to share."</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white text-[#bd6334] rounded-full w-6 h-6 flex items-centre justify-centre border border-[#bd6334] mr-3 mt-0.5 flex-shrink-0">3</div>
                  <p>End with three slow, hand-on-heart breaths. Feel your chest rise and fall beneath your palm.</p>
                </div>
                
                <div className="p-4 bg-white rounded-md italic text-centre mt-4">
                  "You are slowly building a bridge back to yourself—one breath, one sensation at a time."
                </div>
              </div>
            </div>
            
            <div className="flex justify-centre gap-4 mt-8">
              <button className="inline-flex items-centre bg-[#bd6334] text-white rounded-full px-6 py-3 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
                SAVE YOUR WORK
              </button>
              
              <button className="inline-flex items-centre border-2 border-[#bd6334] text-[#bd6334] rounded-full px-6 py-2 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                DOWNLOAD WORKSHEET
              </button>
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <h1 className="text-black text-2xl mb-8 flex items-centre">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 8.5a7.39 7.39 0 0 0-4-2.5"></path><path d="M18 12a7.39 7.39 0 0 0-4-2.5"></path><path d="M2 8.5a7.39 7.39 0 0 1 4-2.5"></path><path d="M6 12a7.39 7.39 0 0 1 4-2.5"></path><path d="M12 2a2.5 2.5 0 0 0 0 5"></path><path d="M12 11a2.5 2.5 0 1 0 0 5"></path><path d="M12 20a2.5 2.5 0 1 0 0 5"></path></svg>
              GUIDED VISUALISATION - GROUNDING & NERVOUS SYSTEM REGULATION
            </h1>
            
            <p className="mb-6">This grounding exercise is designed to help you reconnect to the present moment—particularly helpful when you're feeling anxious, disconnected, or overwhelmed. It's about gently anchoring back into your body and your current environment, using your senses and breath.</p>
            
            <p className="mb-4">Instructions:</p>
            <ul className="list-disc pl-8 mb-8">
              <li>Find a quiet, safe space where you won't be disturbed.</li>
              <li>Sit or lie down in a comfortable position.</li>
              <li>Close your eyes.</li>
              <li>Begin by taking a few slow, deep breaths—in through the nose, out through the mouth.</li>
              <li>Feel the weight of your body supported by the ground beneath you.</li>
            </ul>
            
            <div className="flex justify-centre my-8">
              <div className="h-12 bg-black/80 relative w-64 flex items-centre justify-centre">
                <div className="absolute inset-0 flex items-centre">
                  <div className="w-full h-1 bg-gray-200 flex justify-between items-centre px-2">
                    <div className="h-3 w-0.5 bg-white"></div>
                    <div className="h-5 w-0.5 bg-white"></div>
                    <div className="h-2 w-0.5 bg-white"></div>
                    <div className="h-6 w-0.5 bg-white"></div>
                    <div className="h-4 w-0.5 bg-white"></div>
                    <div className="h-1 w-0.5 bg-white"></div>
                    <div className="h-3 w-0.5 bg-white"></div>
                    <div className="h-5 w-0.5 bg-white"></div>
                    <div className="h-2 w-0.5 bg-white"></div>
                    <div className="h-4 w-0.5 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

        case 9:
            return (
            <div>
                <h1 className="text-black text-2xl mb-6">WHY TRAUMA DISCONNECTS US FROM THE BODY</h1>
                
                <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
                <p className="mb-4">Trauma isn't just something that happens in the mind—it lives in the body.</p>
                
                <p className="mb-4">When we experience overwhelming events, the nervous system goes into survival mode: fight, flight, freeze, or fawn. To protect us, the body may numb sensations, shut down emotions, or create a sense of disconnection—as if we're outside our bodies.</p>
                
                <p className="mb-3">This can feel like:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Feeling "numb" or "not present"</li>
                    <li>Having difficulty feeling sensations like hunger, pain, or pleasure</li>
                    <li>Feeling detached from emotions or memories</li>
                </ul>
                
                <p className="mb-4">While this response is a form of protection, over time it can prevent healing.</p>
                
                <p className="font-medium italic">Reconnection begins when we gently re-enter the body with safety, curiosity, and care.</p>
                </div>
                
                <div className="mb-6">
                <p className="mb-4">Have you ever experienced any of these sensations:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#f8f0e6] p-5 rounded-lg">
                    <ul className="space-y-3 pl-5">
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>A feeling of "floating above" your body or watching yourself from a distance</span>
                        </li>
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>Numbness or emptiness in your body, even during emotional situations</span>
                        </li>
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>Feeling foggy, spaced out, or like you're not fully present</span>
                        </li>
                    </ul>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-5 rounded-lg">
                    <ul className="space-y-3 pl-5">
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>Times when you or your surroundings feel unreal or dreamlike</span>
                        </li>
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>Not noticing hunger, thirst, fatigue or pain until they're extreme</span>
                        </li>
                        <li className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span>Living primarily in your mind rather than feeling connected to your body</span>
                        </li>
                    </ul>
                    </div>
                </div>
                
                <p className="mb-4">These experiences are common forms of disconnection or dissociation that many trauma survivors experience. Far from being a flaw or weakness, this disconnection is one of your nervous system's most sophisticated protective mechanisms.</p>
                
                <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-6 border border-[#e6d5c1]">
                    <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Disconnection as Protection</h3>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <p className="mb-4">When faced with overwhelming danger, especially when we can't fight or flee, our nervous system has a brilliant last resort: it disconnects our conscious awareness from our bodily experience—a survival mechanism called dissociation.</p>
                        
                        <p className="mb-4">Imagine a child experiencing abuse with no escape. Their brain essentially says: "If you can't physically leave this situation, I'll help you leave mentally and emotionally."</p>
                        
                        <p>This disconnection from the body:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Reduces the immediate pain and terror</li>
                        <li>Allows functioning during unbearable circumstances</li>
                        <li>Creates emotional distance from what's happening</li>
                        <li>Preserves core sense of self during violation</li>
                        </ul>
                        
                        <p className="italic font-medium">The problem isn't that you dissociated. The problem is that your body got stuck in this protective pattern long after the danger passed.</p>
                    </div>
                    
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h4 className="font-medium text-[#bd6334] mb-3">Real Experiences:</h4>
                        
                        <div className="space-y-4">
                            <div className="flex">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-centre justify-centre mr-3">
                                <span className="text-[#bd6334] font-medium">D</span>
                            </div>
                            <div>
                                <p className="text-sm italic">"When my father would rage, I'd feel myself float up to the ceiling. I'd watch the scene below like it was happening to someone else. For years I thought this was just a weird thing I did. Now I understand my brain was protecting me the only way it could."</p>
                                <p className="text-sm text-gray-500 mt-1">— Dani, 34</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Science: How Trauma Rewires Your Body Connection</h3>
                
                <p className="mb-4">Understanding the biology behind disconnection can help us approach our experiences with greater compassion.</p>
                
                <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <h4 className="font-medium mb-3">The Neurobiology of Disconnection</h4>
                        
                        <p className="mb-3">During traumatic events, several key processes occur in the brain and nervous system:</p>
                        
                        <ol className="space-y-3 pl-6 list-decimal mb-4">
                        <li>
                            <strong>Altered stress hormones</strong>: Your body floods with cortisol and adrenaline during trauma, but in prolonged or repeated trauma, these systems become dysregulated.
                        </li>
                        <li>
                            <strong>Disruption of the brain's integration</strong>: The communication between emotional centres (limbic system) and rational areas (prefrontal cortex) becomes impaired.
                        </li>
                        <li>
                            <strong>Fragmented sensory processing</strong>: The brain stops integrating sensory information normally, leading to disconnected awareness.
                        </li>
                        <li>
                            <strong>Neural pathway reinforcement</strong>: The more often you dissociate, the more automatic the response becomes, creating a default pattern.
                        </li>
                        </ol>
                        
                        <p>This creates a cycle: the body perceives danger → dissociation activates → relief is felt → the brain learns "disconnection equals safety."</p>
                    </div>
                    
                    <div className="md:w-1/2">
                        <div className="h-full relative">
                        <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {/* Normal integration vs Traumatic dissociation */}
                            <g>
                            {/* Labels */}
                            <text x="125" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">Normal Integration</text>
                            <text x="375" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">Traumatic Dissociation</text>
                            
                            {/* Brain outlines */}
                            <ellipse cx="125" cy="150" rx="100" ry="80" fill="#f2d0b3" stroke="#c9a99a" strokeWidth="2"/>
                            <ellipse cx="375" cy="150" rx="100" ry="80" fill="#f2d0b3" stroke="#c9a99a" strokeWidth="2"/>
                            
                            {/* Body outlines */}
                            <path d="M125 230 L125 350 M95 250 L155 250 M95 300 L155 300" stroke="#c9a99a" strokeWidth="2" fill="none"/>
                            <path d="M375 230 L375 350 M345 250 L405 250 M345 300 L405 300" stroke="#c9a99a" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                            
                            {/* Brain regions - normal */}
                            <circle cx="100" cy="130" r="25" fill="#cce5ff" stroke="#6699cc" strokeWidth="1.5"/>
                            <text x="100" cy="130" textAnchor="middle" fontSize="10" fill="#333">Limbic</text>
                            
                            <circle cx="150" cy="130" r="25" fill="#d4edda" stroke="#6aaa80" strokeWidth="1.5"/>
                            <text x="150" cy="130" textAnchor="middle" fontSize="10" fill="#333">PFC</text>
                            
                            <path d="M125 150 L125 230" stroke="#333" strokeWidth="3"/>
                            
                            {/* Connection lines - normal */}
                            <path d="M110 130 L140 130" stroke="#333" strokeWidth="2"/>
                            
                            {/* Brain regions - traumatised */}
                            <circle cx="350" cy="130" r="25" fill="#ffcccc" stroke="#e66767" strokeWidth="1.5">
                                <animate attributeName="r" values="25;27;25" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <text x="350" cy="130" textAnchor="middle" fontSize="10" fill="#333">Limbic</text>
                            
                            <circle cx="400" cy="130" r="25" fill="#f2f2f2" stroke="#cccccc" strokeWidth="1.5" opacity="0.6"/>
                            <text x="400" cy="130" textAnchor="middle" fontSize="10" fill="#333">PFC</text>
                            
                            <path d="M375 150 L375 230" stroke="#333" strokeWidth="1" strokeDasharray="5,5"/>
                            
                            {/* Connection lines - traumatised */}
                            <line x1="360" y1="130" x2="390" y2="130" stroke="#333" strokeWidth="1" strokeDasharray="2,2"/>
                            
                            {/* Disconnection symbol */}
                            <circle cx="375" cy="190" r="15" fill="#bd6334" opacity="0.7"/>
                            <line x1="360" y1="175" x2="390" y2="205" stroke="#bd6334" strokeWidth="2"/>
                            <line x1="390" y1="175" x2="360" y2="205" stroke="#bd6334" strokeWidth="2"/>
                            
                            {/* Information flows */}
                            <text x="125" y="380" textAnchor="middle" fontSize="14" fill="#333">Connected System</text>
                            <text x="375" y="380" textAnchor="middle" fontSize="14" fill="#333">Disconnected System</text>
                            </g>
                        </svg>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-6 mb-8">
                <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Mapping Your Disconnection Patterns</h3>
                    <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                    Mark Complete
                    </button>
                </div>
                
                <p className="mb-4">Understanding your unique disconnection patterns is the first step toward healing them. This exercise helps you identify your specific patterns and their triggers.</p>
                
                <div className="space-y-6 mb-6">
                    <div>
                    <h4 className="font-medium mb-3">Step 1: Identify Your Disconnection Experiences</h4>
                    <p className="mb-3 text-sm">Which of these experiences do you recognise from your own life? Check all that apply:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span className="text-sm">Feeling like you're floating outside your body</span>
                        </div>
                        <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span className="text-sm">Watching yourself as if from a distance</span>
                        </div>
                        <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span className="text-sm">Mind feels foggy or spacey</span>
                        </div>
                        <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                        <span className="text-sm">Emotional numbness</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );

        case 10:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">FELT SENSE & BODY AWARENESS: LISTENING TO INNER SIGNALS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Your body is constantly communicating with you through physical sensations that carry important information about your needs, emotions, and safety.</p>
              
              <p className="mb-4">Felt sense is your body's internal knowing—the physical way your body communicates with you about your experience, often before your conscious mind can put it into words.</p>
              
              <p className="mb-3">This inner wisdom shows up as:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Gut feelings about situations or people</li>
                <li>Physical tension that signals stress before you consciously recognise it</li>
                <li>Sensations of expansion, lightness, or warmth when something resonates with you</li>
                <li>Contraction, heaviness, or discomfort when something doesn't feel right</li>
              </ul>
              
              <p className="font-medium italic">Learning to listen to these subtle signals is a powerful way to reconnect with your body after trauma has disrupted this vital communication system.</p>
            </div>
            
            <div className="mb-6">
              <p className="mb-4">Have you ever had the experience of:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Having a "gut feeling" about a situation that later proved correct</span>
                    </li>
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Noticing tension in your shoulders or jaw before realizing you're stressed</span>
                    </li>
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Feeling a surge of energy or aliveness when doing something you love</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Experiencing heaviness in your chest during moments of grief or sadness</span>
                    </li>
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Noticing a lightness or openness in your chest when feeling happy or relieved</span>
                    </li>
                    <li className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3 h-4 w-4 accent-[#bd6334]" />
                      <span>Having an instinctive discomfort around certain people that you couldn't explain</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="mb-4">These experiences are examples of your body's "felt sense"—the physical way your body communicates with you about your experience, often before your conscious mind has fully processed it.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Why Body Awareness Matters</h3>
              
              <p className="mb-4">Cultivating body awareness and reconnecting with your felt sense is foundational to trauma healing for several key reasons:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-centre">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Trauma Is Stored in the Body
                  </h4>
                  <p className="mb-3">As trauma expert Bessel van der Kolk famously wrote, "The body keeps the score." Traumatic memories are stored not just in the mind but in physical sensations, tension patterns, and nervous system responses.</p>
                  <p>If we can't access bodily awareness, we're missing half the story of our trauma—and therefore half the path to healing.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-centre">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#bd6334] mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Self-Regulation Requires Awareness
                  </h4>
                  <p className="mb-3">You can't regulate what you can't sense. Learning to notice subtle shifts in your nervous system activation is essential for intervening before you become overwhelmed.</p>
                  <p>Body awareness creates the crucial pause between trigger and reaction where choice becomes possible.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: The Sensation Vocabulary Builder</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Many trauma survivors lack the words to describe physical sensations, which makes it harder to recognise and work with them. This exercise helps you develop a rich vocabulary for your internal experience.</p>
              
              <div className="mb-6">
                <h4 className="font-medium mb-3">Step 1: Exploring Sensation Words</h4>
                <p className="mb-2">Below are categories of physical sensations. Check any words that resonate with sensations you've felt in your body at some point:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#f8f0e6] p-4 rounded-lg">
                    <h5 className="text-sm font-medium mb-2 text-[#bd6334]">Temperature</h5>
                    <div className="space-y-2">
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Warm</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Cool</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Hot</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Cold</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-lg">
                    <h5 className="text-sm font-medium mb-2 text-[#bd6334]">Texture</h5>
                    <div className="space-y-2">
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Soft</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Rough</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Smooth</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Jagged</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-lg">
                    <h5 className="text-sm font-medium mb-2 text-[#bd6334]">Movement</h5>
                    <div className="space-y-2">
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Pulsing</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Fluttering</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Vibrating</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Still</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-lg">
                    <h5 className="text-sm font-medium mb-2 text-[#bd6334]">Weight/Pressure</h5>
                    <div className="space-y-2">
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Heavy</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Light</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Pressing</span>
                      </div>
                      <div className="flex items-centre">
                        <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                        <span className="text-sm">Floating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

        case 11:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">GROUNDING THROUGH THE SENSES: TOUCH, MOVEMENT, BREATH</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
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
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
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
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
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
                  <p className="mb-3">This practise combines breath with sensory awareness:</p>
                  
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
              
              <div className="flex justify-between items-centre">
                <h4 className="font-medium">Your Commitment:</h4>
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  I Commit to This Practice
                </button>
              </div>
            </div>
          </div>
        );
        
      case 12:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">SAFE SPACE VISUALIZATION</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Creating a mental safe space gives your nervous system a powerful way to experience safety, even when your external environment feels threatening or overwhelming.</p>
              
              <p className="mb-4">By regularly practicing this visualisation, you build neural pathways that make it easier to access feelings of safety and calm during times of distress.</p>
              
              <p className="mb-3">The safe space visualisation helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Activate the parasympathetic "rest and digest" system</li>
                <li>Create distance from overwhelming emotions</li>
                <li>Establish a sense of control and agency</li>
                <li>Develop a tool you can access anywhere, anytime</li>
              </ul>
              
              <p className="font-medium italic">The more richly detailed and sensory your safe space becomes, the more effective it will be.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">10-minute guided safe space visualisation meditation</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Creating Your Personal Safe Space</h3>
              
              <p className="mb-4">Before listening to the guided visualisation, take some time to consider what elements would make a space feel completely safe and nurturing for you.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Elements to Consider</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Location</strong> - A real place from your life, a fictional location, or something entirely imagined</li>
                    <li><strong>Visual details</strong> - Colours, lighting, objects, size, boundaries</li>
                    <li><strong>Sounds</strong> - Music, nature sounds, silence, distant voices</li>
                    <li><strong>Textures</strong> - Soft surfaces, smooth objects, comforting fabrics</li>
                    <li><strong>Scents</strong> - Fresh air, flowers, food, candles, natural smells</li>
                    <li><strong>Temperature</strong> - Warm sunlight, cool breeze, perfect comfort</li>
                    <li><strong>Protective features</strong> - Boundaries, doors, walls, shields, guardians</li>
                    <li><strong>Comforting objects</strong> - Items that bring you joy or peace</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Personal Reflection</h4>
                  <p className="mb-3">Consider these questions to build your safe space:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium">Where do you feel most at peace?</p>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        rows={2}
                        placeholder="Is it in nature, at home, somewhere from your past, or a place you've imagined?"
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="mb-2 text-sm font-medium">What sensory elements calm your nervous system?</p>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        rows={2}
                        placeholder="E.g., soft blankets, the sound of water, natural light, certain colours..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="mb-2 text-sm font-medium">Who (if anyone) would be welcome in this space?</p>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        rows={2}
                        placeholder="People, animals, spiritual figures, or perhaps no one but yourself?"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Using Your Safe Space Effectively</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Once you've created your safe space through the guided visualisation, here are some ways to use it in your daily life:</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Regular Practice</h4>
                  <p className="mb-2">Like any skill, accessing your safe space becomes easier with practise:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Set aside 5-10 minutes daily to visit your safe space</li>
                    <li>Practice when you're already calm to strengthen the neural pathways</li>
                    <li>Create a physical anchor (like a small stone or object) that reminds you of your safe space</li>
                    <li>Keep a written description or drawing of your space to help reinforce the details</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">In Moments of Distress</h4>
                  <p className="mb-2">When you're feeling triggered or overwhelmed:</p>
                  
                  <ol className="space-y-2 pl-6 list-decimal mb-4">
                    <li>First use a quick grounding technique (like the 5-4-3-2-1 method)</li>
                    <li>Take several deep breaths to activate your parasympathetic system</li>
                    <li>Recall your safe space by focusing on its most vivid or comforting element</li>
                    <li>Mentally "step into" your space and engage with as many sensory details as possible</li>
                    <li>Remind yourself: "I am safe right now in this moment"</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Experience</h4>
                <p className="text-sm mb-2">After practicing with the guided visualisation, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={3}
                  placeholder="What did your safe space include? How did it feel to be there? Did you notice any changes in your body while visualizing it?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Advanced Safe Space Techniques</h3>
              
              <p className="mb-4">As you become more familiar with your safe space, you can enhance its effectiveness with these advanced techniques:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Container Visualisation</h4>
                  <p className="mb-3">Create a special container within your safe space:</p>
                  
                  <ol className="space-y-2 pl-6 list-decimal mb-4">
                    <li>Visualize a container that feels secure (a chest, vault, etc.)</li>
                    <li>Use this to temporarily store overwhelming emotions or memories</li>
                    <li>Imagine placing difficult content inside and securely closing it</li>
                    <li>Know you can return to process these contents when you're ready</li>
                  </ol>
                  
                  <p className="text-sm italic">This technique helps create psychological distance from overwhelming content without denial or suppression.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Inner Resource Visualisation</h4>
                  <p className="mb-3">Meet your internal wisdom or strength in your safe space:</p>
                  
                  <ol className="space-y-2 pl-6 list-decimal mb-4">
                    <li>Within your safe space, imagine meeting a figure who represents wisdom, compassion, or strength</li>
                    <li>This could be an ideal mentor, spiritual figure, animal guide, or your future healed self</li>
                    <li>Visualize receiving guidance, comfort, or resources from this figure</li>
                    <li>Practice dialoguing with this inner resource when faced with challenges</li>
                  </ol>
                  
                  <p className="text-sm italic">This technique helps you access your own inner wisdom and compassion, even when feeling disconnected from these qualities.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate the safe space visualisation into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Listen to the guided visualisation recording 3-4 times this week</li>
                  <li>Spend 5 minutes daily visiting your safe space without the recording</li>
                  <li>Create a physical reminder of your safe space to carry with you</li>
                  <li>Practice accessing one sensory aspect of your safe space during a mild stressor</li>
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
        
      case 13:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">SOMATIC REFLECTION – WHEN DO I FEEL PRESENT?</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Somatic reflection is a powerful practise of turning inward to observe your bodily experience with curiosity and compassion. It helps you recognise what circumstances, relationships, and environments support your sense of safety and presence.</p>
              
              <p className="mb-4">By identifying when you naturally feel present in your body, you can intentionally create more of these conditions in your life, strengthening your capacity for embodiment.</p>
              
              <p className="mb-3">This reflective practise helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Recognize what helps your nervous system feel safe</li>
                <li>Identify patterns in when you feel connected vs. disconnected</li>
                <li>Appreciate moments of natural presence that may go unnoticed</li>
                <li>Gather information for creating a personalised healing plan</li>
              </ul>
              
              <p className="font-medium italic">The wisdom about what helps you heal is already within you—sometimes it just needs to be uncovered through reflection.</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Presence Inventory</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">This reflective exercise helps you identify specific experiences, circumstances, relationships, environments, and activities that naturally support your embodied presence.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Moments of Natural Presence</h4>
                  <p className="mb-2">Think back over the past few weeks or months. When have you felt most at home in your body? When have you felt naturally present, grounded, or connected to yourself?</p>
                  
                  <p className="mb-2 text-sm">Some examples might include:</p>
                  <ul className="space-y-1 pl-6 list-disc mb-4 text-sm">
                    <li>During a walk in nature</li>
                    <li>While engaged in a creative activity</li>
                    <li>When spending time with a particular person</li>
                    <li>During a specific physical activity</li>
                    <li>In a certain location or environment</li>
                    <li>At a particular time of day</li>
                  </ul>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="List 3-5 specific moments when you've felt naturally present in your body recently..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Body Sensations During Presence</h4>
                  <p className="mb-2">For each of the moments you identified, what body sensations were you aware of? How did presence feel in your body?</p>
                  
                  <p className="mb-2 text-sm">Consider sensations like:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
                    <ul className="space-y-1 pl-6 list-disc">
                      <li>Warmth or coolness</li>
                      <li>Lightness or heaviness</li>
                      <li>Expansion or contraction</li>
                    </ul>
                    <ul className="space-y-1 pl-6 list-disc">
                      <li>Tingling or vibration</li>
                      <li>Ease of breathing</li>
                      <li>Muscle relaxation</li>
                    </ul>
                    <ul className="space-y-1 pl-6 list-disc">
                      <li>Groundedness</li>
                      <li>Energy flow</li>
                      <li>Sense of boundaries</li>
                    </ul>
                  </div>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="Describe the physical sensations you notice when you're naturally present..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Identifying Common Elements</h4>
                  <p className="mb-2">Looking at your moments of natural presence, what patterns or common elements do you notice?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Environmental Factors:</p>
                      <ul className="space-y-1 pl-5 text-sm">
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Natural settings (forests, beaches, parks)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Quiet, peaceful spaces</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Familiar, comfortable environments</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Spaces with specific lighting (bright, dim)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Being outdoors vs. indoors</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Relational Factors:</p>
                      <ul className="space-y-1 pl-5 text-sm">
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Being alone</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Being with specific people</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Small, intimate settings</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Group activities with a shared focus</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Feeling understood or accepted</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Activity Factors:</p>
                      <ul className="space-y-1 pl-5 text-sm">
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Creative expression (art, music, writing)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Physical movement (walking, yoga, dance)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Mindful activities (meditation, gardening)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Activities requiring focus or flow states</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Rest or relaxation activities</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Internal Factors:</p>
                      <ul className="space-y-1 pl-5 text-sm">
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Well-rested vs. tired</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Properly nourished vs. hungry</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Times of day (morning, evening)</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>After specific self-care practices</span>
                        </li>
                        <li className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span>Particular emotional states</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="Based on your reflection, what patterns do you notice about when you feel most present?"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Creating More Presence Opportunities</h4>
                  <p className="mb-2">Based on your reflections, how might you intentionally create more moments of natural presence in your life?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="List 3-5 specific ways you can create more opportunities for natural presence based on your patterns..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Presence vs. Dissociation: A Comparison</h3>
              
              <p className="mb-4">Understanding the contrast between presence and dissociation can help you recognise your own patterns and shifts between these states.</p>
              
              <div className="overflow-auto">
                <table className="w-full min-w-full border-collapse">
                  <thead className="bg-[#f8f0e6]">
                    <tr>
                      <th className="px-4 py-2 text-left border border-[#e6d5c1]">In Presence</th>
                      <th className="px-4 py-2 text-left border border-[#e6d5c1]">In Dissociation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 border border-[#e6d5c1]">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Aware of bodily sensations</li>
                          <li>Feel connected to your emotions</li>
                          <li>Clear sense of boundaries</li>
                          <li>Able to make choices based on needs</li>
                          <li>Sense of being "in" your body</li>
                        </ul>
                      </td>
                      <td className="px-4 py-3 border border-[#e6d5c1]">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Numbness or absence of sensation</li>
                          <li>Emotional flatness or disconnection</li>
                          <li>Uncertain boundaries</li>
                          <li>Difficulty making decisions</li>
                          <li>Feeling of floating or watching yourself</li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 border border-[#e6d5c1]">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Appropriate energy levels</li>
                          <li>Sense of aliveness</li>
                          <li>Can track thoughts and sensations</li>
                          <li>Feel grounded in the present moment</li>
                          <li>Appropriate responsiveness to stimuli</li>
                        </ul>
                      </td>
                      <td className="px-4 py-3 border border-[#e6d5c1]">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Either low energy or hyperarousal</li>
                          <li>Feeling "deadened" or mechanically functioning</li>
                          <li>Mind feels foggy or racing</li>
                          <li>Time distortion (too fast or too slow)</li>
                          <li>Either under- or over-responsiveness</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm italic mt-4">Note: Most trauma survivors move back and forth between states of presence and dissociation. The goal isn't to never dissociate (which is unrealistic), but to expand your capacity for presence and develop awareness of when you're shifting between states.</p>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Tracking Presence in Daily Life</h3>
              
              <p className="mb-4">Developing the habit of checking in with your level of embodied presence throughout the day can strengthen your capacity for body awareness.</p>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <h4 className="font-medium mb-3">The Presence Scale</h4>
                  <p className="mb-3">A simple 1-10 scale can help you track your level of presence:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li><strong>1-3:</strong> Highly dissociated (feeling numb, foggy, disconnected, outside your body)</li>
                    <li><strong>4-6:</strong> Partially present (aware of some sensations, but not fully in your body)</li>
                    <li><strong>7-10:</strong> Highly present (clear sensation awareness, feeling grounded, emotionally connected)</li>
                  </ul>
                  
                  <p className="mb-3">Throughout your day, pause briefly to ask:</p>
                  <ul className="space-y-1 pl-6 list-disc">
                    <li>"Where am I on the presence scale right now?"</li>
                    <li>"What sensations am I aware of in my body?"</li>
                    <li>"What might have influenced my current state?"</li>
                  </ul>
                </div>
                
                <div className="md:w-1/2">
                  <h4 className="font-medium mb-3">Presence Journal</h4>
                  <p className="mb-3">Keep a simple presence journal with these columns:</p>
                  
                  <div className="overflow-auto">
                    <table className="w-full min-w-full border-collapse text-sm">
                      <thead className="bg-white">
                        <tr>
                          <th className="px-3 py-2 text-left border border-gray-200">Time</th>
                          <th className="px-3 py-2 text-left border border-gray-200">Presence (1-10)</th>
                          <th className="px-3 py-2 text-left border border-gray-200">Activity/Context</th>
                          <th className="px-3 py-2 text-left border border-gray-200">Body Sensations</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-200">9:00 AM</td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-200">12:00 PM</td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-200">3:00 PM</td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-200">7:00 PM</td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                          <td className="px-3 py-2 border border-gray-200"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="text-sm italic mt-4">After tracking for a few days, review your journal to identify patterns about when you're most and least present in your body. This information is invaluable for creating your personalised healing plan.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate somatic reflection into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Presence Inventory" exercise</li>
                  <li>Check in with your presence scale at least 3 times daily</li>
                  <li>Keep a presence journal for at least 3 days</li>
                  <li>Intentionally create one additional "presence opportunity" based on your patterns</li>
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
        
      case 14:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">MINDFUL MOVEMENT PRACTICE</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Mindful movement provides a gentle yet powerful way to reconnect with your body after trauma. By combining physical movement with present-moment awareness, you create new neural pathways that support embodied presence.</p>
              
              <p className="mb-4">Unlike high-intensity exercise which can sometimes be triggering, mindful movement practices emphasise awareness, gentle exploration, and respecting your body's limits.</p>
              
              <p className="mb-3">Regular mindful movement can help you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Gradually increase your window of tolerance for bodily sensations</li>
                <li>Release tension patterns that hold traumatic energy</li>
                <li>Develop a more positive relationship with your body</li>
                <li>Experience your body as a source of pleasure and wisdom</li>
              </ul>
              
              <p className="font-medium italic">Movement is medicine when approached with mindfulness and compassion.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">15-minute guided mindful movement practise</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Principles of Trauma-Sensitive Movement</h3>
              
              <p className="mb-4">These principles help create a safe container for reconnecting with your body through movement:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Safety First</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>You are in charge of your experience</li>
                    <li>Modify or pause any movement that doesn't feel right</li>
                    <li>Define your own personal space boundaries</li>
                    <li>Position yourself with visibility of exits/entrances</li>
                    <li>Choose environments that feel comfortable and secure</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Choice & Autonomy</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Every movement is an invitation, not a demand</li>
                    <li>Multiple options for each movement</li>
                    <li>Freedom to move at your own pace</li>
                    <li>Permission to rest or pause at any time</li>
                    <li>Honor your body's unique needs and limitations</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Present-Moment Awareness</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Focus on physical sensations as they arise</li>
                    <li>Notice without judgment or analysis</li>
                    <li>Use breath as an anchor during movement</li>
                    <li>Observe movement qualities (speed, effort, direction)</li>
                    <li>Maintain curious attention to your experience</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Titration & Pendulation</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Start with small, manageable movements</li>
                    <li>Gradually expand range only as feels safe</li>
                    <li>Alternate between activation and regulation</li>
                    <li>Move between challenging and comforting experiences</li>
                    <li>Use rhythm and repetition for nervous system regulation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Practice: Mindful Movement Sequence</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Below is a simple mindful movement sequence you can practise along with the video. Remember to move at your own pace and modify any movements as needed for your body.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">1. Centering & Grounding (2 minutes)</h4>
                  <p className="mb-2">Begin by establishing a stable foundation:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Stand, sit, or lie down in a comfortable position</li>
                    <li>Feel the points of contact between your body and the surface beneath you</li>
                    <li>Take 5 deep breaths, focusing on the sensation of air moving in and out</li>
                    <li>Mentally scan your body from feet to head, noticing any areas of tension or ease</li>
                    <li>Set an intention to move with awareness and respect for your body's needs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">2. Gentle Awakening (3 minutes)</h4>
                  <p className="mb-2">Wake up the body with subtle movements:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">Finger & Hand Exploration</h5>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Wiggle each finger one at a time</li>
                        <li>Make fists, then spread fingers wide</li>
                        <li>Draw circles with your wrists</li>
                        <li>Gently tap fingertips across different parts of your hands</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">Ankle & Foot Activation</h5>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Point and flex your feet</li>
                        <li>Draw circles with your ankles in both directions</li>
                        <li>Spread your toes wide, then curl them</li>
                        <li>Press each foot into the ground, then release</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-sm italic">Notice: What parts of your body feel most alive with sensation? What parts feel distant or numb?</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">3. Spinal Movements (3 minutes)</h4>
                  <p className="mb-2">Explore the mobility of your spine:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Gently tilt your head forward and back, side to side</li>
                    <li>Roll your shoulders in circles, forward and backward</li>
                    <li>While seated or standing, gently bend sideways, reaching one arm overhead</li>
                    <li>Twist your torso slowly to each side, following with your gaze</li>
                    <li>Round your spine forward, then arch slightly back (cat-cow motion)</li>
                  </ul>
                  
                  <p className="text-sm italic">Notice: How does your breath change with different spinal movements? What emotions or memories might be held in your spine?</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">4. Rhythmic Integration (4 minutes)</h4>
                  <p className="mb-2">Connect different parts of your body with flowing movement:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Let your arms float up and down with your breath</li>
                    <li>Gently sway side to side, allowing your weight to shift</li>
                    <li>Take small steps in place or around your space</li>
                    <li>Add arm movements that feel natural with your steps</li>
                    <li>Experiment with different rhythms and speeds</li>
                  </ul>
                  
                  <p className="text-sm italic">Notice: How does it feel to be in motion? What parts of your body want to lead the movement?</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">5. Integration & Stillness (3 minutes)</h4>
                  <p className="mb-2">Return to stillness and integrate your experience:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Gradually slow your movements</li>
                    <li>Return to your original position (standing, sitting, or lying down)</li>
                    <li>Place your hands on your heart and belly</li>
                    <li>Notice how your body feels different from when you began</li>
                    <li>Take 5 deep breaths, sensing the aliveness in your body</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Movement Experience</h4>
                <p className="text-sm mb-2">After practicing the mindful movement sequence, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={3}
                  placeholder="What sensations did you notice during the movement practise? Were there parts of your body that felt more connected or distant? How does your body feel now compared to before you began?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Mindful Movement Options for Different Needs</h3>
              
              <p className="mb-4">Different types of movement practices may resonate more or less depending on your unique needs and preferences. Here are some options to explore:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">For Grounding & Stability</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Gentle yoga</strong> with standing poses and slow transitions</li>
                    <li><strong>Tai chi</strong> with its emphasis on rooting and balance</li>
                    <li><strong>Walking meditation</strong> focusing on foot contact with earth</li>
                    <li><strong>Weight training</strong> with light weights and body awareness</li>
                    <li><strong>Pilates</strong> for core strength and stability</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">For Emotional Release</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Dance</strong> (free-form, no mirrors) for expressive movement</li>
                    <li><strong>Shaking practices</strong> for releasing tension</li>
                    <li><strong>TRE (Tension Release Exercises)</strong> for trauma release</li>
                    <li><strong>Vocal movement</strong> combining sound and motion</li>
                    <li><strong>Drumming circles</strong> for rhythmic expression</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">For Gentle Reconnection</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><strong>Restorative yoga</strong> with supported poses</li>
                    <li><strong>Feldenkrais Method</strong> for subtle awareness</li>
                    <li><strong>Seated chair movements</strong> for accessibility</li>
                    <li><strong>Water-based movement</strong> like gentle swimming</li>
                    <li><strong>Somatic Experiencing</strong> micro-movements</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-5 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3 text-[#bd6334]">Finding the Right Movement Practice</h4>
                <p className="mb-3">Consider these questions when exploring different movement options:</p>
                
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Does this practise make me feel safe and in control of my experience?</li>
                  <li>Can I modify or adapt the movements to suit my needs?</li>
                  <li>Does the pace allow me to maintain awareness of my sensations?</li>
                  <li>Is the environment comfortable and non-triggering?</li>
                  <li>Do I feel a sense of curiosity and interest in this practise?</li>
                </ul>
                
                <p className="italic mt-3">Remember: The best movement practise is one that you'll actually do regularly and that leaves you feeling more connected to your body afterward.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate mindful movement into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Practice the guided mindful movement sequence 2-3 times this week</li>
                  <li>Take 5 minutes each day for even a brief movement practise</li>
                  <li>Explore one new type of movement that interests you</li>
                  <li>Pay attention to how different movements affect your sense of presence</li>
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
        
      case 15:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">BODY AWARENESS MEDITATION</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Body awareness meditation (sometimes called a body scan) is a foundational practise for reconnecting with your physical self after trauma.</p>
              
              <p className="mb-4">This practise involves systematically bringing attention to different parts of your body, noticing sensations without trying to change them. It helps create a map of your internal landscape and builds your capacity to be present with bodily experience.</p>
              
              <p className="mb-3">Regular body awareness meditation can help you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Identify areas of tension, numbness, or disconnection</li>
                <li>Strengthen the neural pathways for interoception (internal body awareness)</li>
                <li>Notice early warning signs of stress or activation</li>
                <li>Develop a more nuanced vocabulary of physical sensations</li>
              </ul>
              
              <p className="font-medium italic">With practise, this meditation becomes a powerful tool for emotional regulation and embodied presence.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">20-minute guided body awareness meditation</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Key Principles for Trauma-Sensitive Body Awareness</h3>
              
              <p className="mb-4">When approaching body awareness after trauma, these principles help create safety and effectiveness:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Start Where You Are</h4>
                  <p className="mb-3">Begin with areas of your body that feel safest and most accessible:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Many trauma survivors find extremities (hands, feet) easiest to sense</li>
                    <li>Areas of chronic tension may be more noticeable than neutral areas</li>
                    <li>Some people connect more easily with the front of the body than the back</li>
                    <li>If the internal body feels inaccessible, start with points of contact (where body meets chair/floor)</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Titration & Pendulation</h4>
                  <p className="mb-3">Modulate the intensity of awareness to prevent overwhelm:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Move between easier and more challenging areas of your body</li>
                    <li>Alternate between body awareness and external focus (sounds, visual anchor)</li>
                    <li>Adjust the depth of focus (light touch vs. deep awareness)</li>
                    <li>Use grounding resources when needed (breath, hand on heart, etc.)</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Curious Awareness vs. Analysis</h4>
                  <p className="mb-3">Approach sensations with friendly interest rather than judgment:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Notice qualities of sensation (temperature, texture, movement, etc.)</li>
                    <li>Avoid interpreting, fixing, or analyzing what you discover</li>
                    <li>When thoughts arise about sensations, gently return to direct experience</li>
                    <li>Maintain an attitude of "I'm noticing this" rather than "This is good/bad"</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Permission for Adaptation</h4>
                  <p className="mb-3">Honor your needs by modifying the practise:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Skip areas of the body that feel too activating</li>
                    <li>Keep eyes open if closing them feels unsafe</li>
                    <li>Use shorter practise durations (even 5 minutes can be beneficial)</li>
                    <li>Add movement if stillness is challenging</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Written Body Awareness Practice</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Below is a text version of a body awareness meditation that you can use alongside the audio, or as an alternative when you prefer to guide yourself:</p>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3 text-centre">Body Awareness Meditation (10-15 minutes)</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-sm">Preparation:</h5>
                    <p className="text-sm">Find a comfortable position, either lying down or sitting. If sitting, allow your spine to be tall yet relaxed, with your feet flat on the floor. Place your hands in a comfortable position. You may keep your eyes open with a soft gaze, or close them if that feels safe. Take a few moments to settle into your position.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Beginning Awareness:</h5>
                    <p className="text-sm">Start by taking three full, deep breaths. With each inhale, notice the sensation of air flowing into your body. With each exhale, feel a natural release and settling. Now allow your breathing to find its natural rhythm—no need to control or change it.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Points of Contact:</h5>
                    <p className="text-sm">Bring awareness to the points where your body makes contact with the surface beneath you. Notice the weight, pressure, temperature, or texture at these points of contact. Take a moment to feel grounded by these contact points.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Scanning the Body:</h5>
                    <p className="text-sm">Now we'll begin moving awareness through different parts of your body. For each area, simply notice any sensations present without trying to change them.</p>
                    <ul className="space-y-1 pl-6 list-disc text-sm mt-2">
                      <li>Begin by bringing attention to your feet. Notice any sensations in your toes, the soles of your feet, the tops of your feet, and your ankles. (Pause)</li>
                      <li>Move awareness up to your lower legs—your calves and shins. Notice any sensations here. (Pause)</li>
                      <li>Continue to your knees and thighs, noticing any sensations of temperature, pressure, movement, or stillness. (Pause)</li>
                      <li>Bring awareness to your hips and pelvic area. Notice any sensations of contact with the surface beneath you. (Pause)</li>
                      <li>Move to your abdomen and lower back. Notice any sensations related to breath, digestion, or the natural rise and fall of your belly. (Pause)</li>
                      <li>Bring awareness to your chest and upper back. Notice your heartbeat if you can, and the movement of breath in this area. (Pause)</li>
                      <li>Notice your hands and arms—fingers, palms, wrists, forearms, elbows, and upper arms. (Pause)</li>
                      <li>Bring awareness to your shoulders and neck, noticing any sensations of tension, release, or neutral feelings. (Pause)</li>
                      <li>Finally, bring awareness to your head—your jaw, mouth, nose, eyes, ears, and the top and back of your head. (Pause)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Whole Body Awareness:</h5>
                    <p className="text-sm">Now expand your awareness to include your entire body as a whole. Feel the entirety of your physical presence from head to toe. Notice the life energy moving throughout your body. (Longer pause)</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm">Closing:</h5>
                    <p className="text-sm">Begin to deepen your breath slightly, bringing more conscious movement into your body. Wiggle your fingers and toes if you like. When you're ready, if your eyes are closed, gently open them. Take a moment to notice how you feel after this practise.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Body Awareness Experience</h4>
                <p className="text-sm mb-2">After practicing the body awareness meditation, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={3}
                  placeholder="What sensations did you notice in different parts of your body? Were there areas that were easy to feel and areas that were more difficult to access? Did you notice any shifts in your awareness during the practise?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Experiences During Body Awareness Meditation</h3>
              
              <p className="mb-4">When beginning a body awareness practise after trauma, you may encounter various experiences. All of these are normal and part of the reconnection process:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Absence of Sensation</h4>
                  <p className="mb-3">Many trauma survivors experience areas of numbness or disconnection:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-3">
                    <li>Inability to feel certain body parts</li>
                    <li>Vague or fuzzy awareness rather than clear sensation</li>
                    <li>Feeling like certain areas are "not yours" or "missing"</li>
                  </ul>
                  
                  <p className="text-sm italic">This is a protective response that developed for good reason. Simply noting "I'm not feeling much here right now" is a form of awareness itself. With consistent practise, sensation often gradually returns.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Emotional Responses</h4>
                  <p className="mb-3">Body awareness may trigger emotional responses:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-3">
                    <li>Unexpected feelings arising from specific body areas</li>
                    <li>Tears, sadness, anger, or anxiety emerging</li>
                    <li>Shifts in emotional state during the practise</li>
                  </ul>
                  
                  <p className="text-sm italic">Emotions are stored in the body. When we bring attention to an area, we may access emotional content held there. If emotions become overwhelming, return to a resource like breath or a safe body part.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Activation or Restlessness</h4>
                  <p className="mb-3">Some may experience increased activation:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-3">
                    <li>Difficulty remaining still</li>
                    <li>Increased heart rate or breathing</li>
                    <li>Feeling unsafe with internal focus</li>
                    <li>Strong urge to move or fidget</li>
                  </ul>
                  
                  <p className="text-sm italic">This is your nervous system signaling that the current practise may be too intense. Try a shorter duration, keep eyes open, incorporate gentle movement, or focus only on safe body parts.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Unexpected Insights</h4>
                  <p className="mb-3">Body awareness can lead to insights:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc mb-3">
                    <li>Memories associated with body sensations</li>
                    <li>Recognition of habitual tension patterns</li>
                    <li>Awareness of how emotions manifest physically</li>
                    <li>Understanding of your body's signals and needs</li>
                  </ul>
                  
                  <p className="text-sm italic">The body holds wisdom and information that our conscious mind may not access directly. Body awareness creates space for this wisdom to emerge.</p>
                </div>
              </div>
              
              <div className="bg-[#f8f0e6] p-6 rounded-lg">
                <h4 className="font-medium mb-3 text-[#bd6334]">A Note on Traumatic Memories</h4>
                
                <p className="mb-3">Occasionally, body awareness practise may trigger traumatic memories or flashbacks. If this happens:</p>
                
                <ul className="space-y-2 pl-6 list-disc mb-4">
                  <li>Immediately open your eyes if they're closed</li>
                  <li>Orient to the present by naming things you can see in your environment</li>
                  <li>Engage in a grounding technique (hold something cold, count backwards, etc.)</li>
                  <li>Remind yourself that you are safe now and the memory is from the past</li>
                  <li>If needed, stop the practise and engage in a calming activity</li>
                </ul>
                
                <p className="italic">If you consistently experience flashbacks during body awareness practise, consider working with a trauma-informed therapist who can provide additional support and guidance.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Body Awareness in Daily Life</h3>
              
              <p className="mb-4">While formal meditation practise is valuable, integrating body awareness into everyday activities can dramatically accelerate reconnection:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">During Daily Activities</h4>
                  <p className="mb-3">Bring mindful awareness to routine actions:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Notice the sensations while washing your hands or face</li>
                    <li>Feel the weight shift in your feet while walking</li>
                    <li>Pay attention to body sensations while eating</li>
                    <li>Observe your posture throughout the day</li>
                    <li>Notice how your body responds to different environments</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">During Emotional Moments</h4>
                  <p className="mb-3">Use body awareness during emotional experiences:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>When you feel an emotion, pause to notice where you feel it in your body</li>
                    <li>During stress, scan for tension and consciously release it</li>
                    <li>In moments of joy, fully feel the pleasant sensations</li>
                    <li>When triggered, use body awareness to identify early warning signs</li>
                    <li>Before responsive action, check your body's signals</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Micro-Practices</h4>
                  <p className="mb-3">Brief moments of body awareness throughout the day:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Use transitions (entering a new room, starting a task) as cues for a quick body scan</li>
                    <li>Set quiet alarms or reminders for body check-ins</li>
                    <li>Practice "3 breaths, 3 sensations" during waiting times</li>
                    <li>Notice feet on ground and breath when standing in lines</li>
                    <li>Take 30-second sensation breaks between tasks</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate body awareness into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Listen to the guided body awareness meditation 3-4 times this week</li>
                  <li>Practice at least one 3-minute body check-in each day</li>
                  <li>Choose one daily activity to do with full body awareness</li>
                  <li>Track one emotion each day by noticing its physical manifestation</li>
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

        case 16:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">UNDERSTANDING THE INNER CHILD AND EMOTIONAL WOUNDS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">We all carry a child within us – the part that experienced the world with wonder, vulnerability, and raw emotion. This inner child still lives inside, influencing how we react, what we fear, and what we deeply desire.</p>
              
              <p className="mb-4">When this child part of ourselves experienced hurt, rejection, or neglect (even in small ways), emotional wounds formed. These wounds don't simply disappear with time – they shape our adult behaviors, relationships, and self-beliefs.</p>
              
              <p className="mb-3">Understanding your inner child helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Recognize patterns that began in childhood</li>
                <li>Bring compassion to parts of yourself you've rejected</li>
                <li>Heal core emotional wounds at their source</li>
                <li>Reclaim joy, playfulness, and authentic expression</li>
              </ul>
              
              <p className="font-medium italic">The relationship you build with your inner child may be the most important relationship of your life.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Inner Child: Beyond a Metaphor</h3>
              
              <p className="mb-4">While the "inner child" might sound like just a helpful concept, neuroscience shows it represents actual neural networks formed during early development that remain active throughout our lives.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">How Your Inner Child Formed</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Early experiences created emotional memory patterns</li>
                    <li>Your child self developed strategies to feel safe and loved</li>
                    <li>Core beliefs about yourself formed before conscious memory</li>
                    <li>Your nervous system organised around these early patterns</li>
                    <li>Childhood emotions were stored in the body when too overwhelming</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">How Your Inner Child Shows Up Today</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Emotional "overreactions" to present situations</li>
                    <li>Feeling small, helpless, or overwhelmed when triggered</li>
                    <li>Repeating relationship patterns despite your best intentions</li>
                    <li>Inner critic voice that sounds like childhood authority figures</li>
                    <li>Automatic self-protective behaviors that no longer serve you</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Emotional Wounds from Childhood</h3>
              
              <p className="mb-4">We all carry some emotional wounds from childhood. Even loving families unintentionally create wounds through their own limitations, generational patterns, or simply being human. Recognizing your wounds is the first step to healing them.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Abandonment Wound</h4>
                  <p className="mb-2">Created when a child experiences physical or emotional abandonment.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">How it felt as a child:</p>
                      <p className="text-sm mb-2">"I'm all alone. No one is here for me. I have to take care of myself."</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">How it shows up in adulthood:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Fear of being left or rejected in relationships</li>
                        <li>Difficulty trusting others will stay</li>
                        <li>Self-reliance to the point of not asking for help</li>
                        <li>Anxious attachment or pushing people away first</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Unworthiness Wound</h4>
                  <p className="mb-2">Created when a child doesn't receive recognition for their inherent value.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">How it felt as a child:</p>
                      <p className="text-sm mb-2">"I'm not good enough. I have to earn love and approval. My needs don't matter."</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">How it shows up in adulthood:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>People-pleasing and difficulty setting boundaries</li>
                        <li>Perfectionism and achievement-based self-worth</li>
                        <li>Feeling like an impostor despite accomplishments</li>
                        <li>Accepting less than you deserve in relationships</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Safety Wound</h4>
                  <p className="mb-2">Created when a child experiences physical or emotional danger without protection.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">How it felt as a child:</p>
                      <p className="text-sm mb-2">"The world isn't safe. I need to be on guard. Something bad could happen anytime."</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">How it shows up in adulthood:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Hypervigilance and difficulty relaxing</li>
                        <li>Control tendencies to create a sense of safety</li>
                        <li>Anxiety, worry, and catastrophic thinking</li>
                        <li>Fight, flight, freeze responses in non-threatening situations</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Emotional Expression Wound</h4>
                  <p className="mb-2">Created when a child's emotional expression is punished, dismissed, or shamed.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">How it felt as a child:</p>
                      <p className="text-sm mb-2">"My feelings are wrong. I need to hide how I feel. I'm too much/too sensitive."</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">How it shows up in adulthood:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Difficulty identifying or expressing emotions</li>
                        <li>Shame around certain feelings (anger, sadness, joy)</li>
                        <li>Emotional suppression that emerges as anxiety/depression</li>
                        <li>Disconnection from body and emotional needs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-5 rounded-lg mt-4 border border-[#e6d5c1]">
                <p className="italic">Remember: These wounds aren't your fault. They were created when you were vulnerable and dependent on others. The adults around you were doing the best they could with their own unhealed wounds. Now, as an adult, you have the power to heal them.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection: Identifying Your Inner Child Wounds</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to reflect on which emotional wounds resonate with your experience. There's no judgment here – just an opportunity to understand yourself with compassion.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Which wounds resonate most with you?</h4>
                  <p className="mb-2">Check any that feel familiar. You might recognise several.</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Abandonment Wound</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Unworthiness Wound</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Safety Wound</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Emotional Expression Wound</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Other Wound: I would describe it as...</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">How do these wounds show up in your life today?</h4>
                  <p className="mb-2">Think about times when you feel triggered, reactive, or like you're operating from an old pattern.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="When I feel [emotion], I tend to [behaviour], which probably comes from my [type] wound..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">What does your inner child need to hear?</h4>
                  <p className="mb-2">If you could speak to your younger self now, what truth would you want them to know?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="Dear little one, I want you to know that..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Inner Child Healing Journey</h3>
              
              <p className="mb-4">Healing your inner child is a process of building relationship with this vulnerable part of yourself. The journey involves:</p>
              
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li>
                  <strong>Recognition:</strong> Acknowledging your inner child exists and influences your adult life
                </li>
                <li>
                  <strong>Connection:</strong> Learning to listen to and communicate with your inner child
                </li>
                <li>
                  <strong>Validation:</strong> Honoring the emotions and needs that weren't met in childhood
                </li>
                <li>
                  <strong>Reparenting:</strong> Providing what your inner child needed but didn't receive
                </li>
                <li>
                  <strong>Integration:</strong> Bringing your healed inner child qualities into your whole self
                </li>
              </ol>
              
              <p className="italic">This work is tender and profound. Be patient with yourself. Inner child healing doesn't happen overnight, but each step of recognition and compassion creates meaningful change.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To begin connecting with your inner child:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Spend 5 minutes each day speaking kindly to your inner child</li>
                  <li>Find a photo of yourself as a child and keep it visible</li>
                  <li>Notice when you're being hard on yourself and ask, "Would I speak this way to a child?"</li>
                  <li>Complete the "Identifying Your Inner Child Wounds" reflection</li>
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

      case 17:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">HOW CHILDHOOD PAIN SHAPES ADULT PATTERNS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">The coping mechanisms that helped you survive childhood difficulties often become the very patterns that limit you as an adult. What once protected you may now be preventing authentic connection, joy, and freedom.</p>
              
              <p className="mb-4">Understanding the link between your early experiences and current struggles removes shame and creates clarity. When you see how your patterns made perfect sense given what you went through, self-compassion naturally emerges.</p>
              
              <p className="mb-3">Exploring these connections helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Stop blaming yourself for "self-sabotaging" behaviors</li>
                <li>Recognize that many problems began as solutions</li>
                <li>Identify what your patterns are trying to protect you from</li>
                <li>Create new responses that honour your adult capabilities</li>
              </ul>
              
              <p className="font-medium italic">Every pattern you've developed was once an intelligent adaptation to your environment.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">How Childhood Adaptations Become Adult Patterns</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The People-Pleasing Pattern</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="font-medium text-sm">Childhood Experience:</p>
                      <p className="text-sm mb-1">Love and acceptance felt conditional on being "good," helpful, or meeting others' needs. Your emotions or needs may have been dismissed.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Child's Adaptation:</p>
                      <p className="text-sm mb-1">You learned to focus on others' needs and suppress your own. You became attuned to what would make others happy or avoid their displeasure.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Adult Pattern:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Difficulty saying no or setting boundaries</li>
                        <li>Resentment that builds from self-sacrifice</li>
                        <li>Feeling responsible for others' emotions</li>
                        <li>Anxiety about disappointing people</li>
                        <li>Loss of connection to your own wants and needs</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#f8f0e6] rounded-md text-sm">
                    <p className="italic">What your inner child needs to know: "Your worth isn't based on what you do for others. You deserve to have needs and ask for what you want. You're lovable just as you are."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Self-Reliance Pattern</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="font-medium text-sm">Childhood Experience:</p>
                      <p className="text-sm mb-1">Your needs weren't consistently met, or you had to grow up quickly due to family circumstances. Asking for help might have been discouraged or unavailable.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Child's Adaptation:</p>
                      <p className="text-sm mb-1">You learned to take care of yourself and perhaps others too. You developed independence and self-sufficiency as survival strategies.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Adult Pattern:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Pride in handling everything alone</li>
                        <li>Difficulty trusting others or asking for help</li>
                        <li>Feeling overwhelmed but unable to delegate</li>
                        <li>Discomfort with vulnerability or dependency</li>
                        <li>Burnout from doing it all yourself</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#f8f0e6] rounded-md text-sm">
                    <p className="italic">What your inner child needs to know: "It's okay to need support. Interdependence is strength, not weakness. You don't have to carry everything alone anymore."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Perfectionism Pattern</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="font-medium text-sm">Childhood Experience:</p>
                      <p className="text-sm mb-1">High standards were expected, or mistakes were met with criticism or punishment. You may have received praise primarily for achievements.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Child's Adaptation:</p>
                      <p className="text-sm mb-1">You learned to avoid criticism by striving for perfection. Being "the best" became a way to feel secure and worthy of love.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Adult Pattern:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Harsh inner critic that's never satisfied</li>
                        <li>Procrastination from fear of imperfection</li>
                        <li>Difficulty celebrating achievements</li>
                        <li>All-or-nothing thinking about success</li>
                        <li>Burnout from impossibly high standards</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#f8f0e6] rounded-md text-sm">
                    <p className="italic">What your inner child needs to know: "Your worth doesn't depend on performance. Making mistakes is how humans learn and grow. You are enough exactly as you are."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The Emotional Avoidance Pattern</h4>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="font-medium text-sm">Childhood Experience:</p>
                      <p className="text-sm mb-1">Emotions were overwhelming, discouraged, or even punished. You may have been told to "toughen up" or that your feelings were too much.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Child's Adaptation:</p>
                      <p className="text-sm mb-1">You learned to disconnect from painful feelings and developed ways to numb, distract, or rationalize emotions away.</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm">Adult Pattern:</p>
                      <ul className="space-y-1 pl-5 list-disc text-sm">
                        <li>Difficulty identifying or expressing feelings</li>
                        <li>Using work, substances, or activities to avoid emotion</li>
                        <li>Intellectualizing experiences rather than feeling them</li>
                        <li>Discomfort with others' emotional expression</li>
                        <li>Feeling empty or disconnected from yourself</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-[#f8f0e6] rounded-md text-sm">
                    <p className="italic">What your inner child needs to know: "Your feelings are valid and important. Emotions provide valuable information and connection. You can feel deeply and still be safe."</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection: Mapping Your Patterns</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to explore your own patterns and their childhood origins. Remember, this isn't about blaming your caregivers but understanding how your adaptations made sense.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Which patterns do you recognise in yourself?</h4>
                  <p className="mb-2">Check any that feel familiar to your experience.</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>People-Pleasing Pattern</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Self-Reliance Pattern</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Perfectionism Pattern</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Emotional Avoidance Pattern</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Other Pattern: I would describe it as...</span>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="If you checked 'Other Pattern,' please describe it here..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Exploring Your Pattern's Origins</h4>
                  <p className="mb-2">For the pattern that impacts you most, reflect on its childhood roots:</p>
                  
                  <div className="space-y-3">
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md mb-1"
                      rows={2}
                      placeholder="What childhood experiences might have led to this pattern forming?"
                    ></textarea>
                    
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md mb-1"
                      rows={2}
                      placeholder="How did this pattern help you cope or survive then?"
                    ></textarea>
                    
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md mb-1"
                      rows={2}
                      placeholder="How does this pattern limit you now as an adult?"
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Compassion for Your Adaptations</h4>
                  <p className="mb-2">Write a message of understanding to yourself about this pattern:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="It makes complete sense that I developed this pattern because... I honour the way this protected me by..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Path to Transformation</h3>
              
              <p className="mb-4">Transforming childhood patterns follows a predictable path. Understanding where you are in this process helps you navigate change with patience:</p>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6d5c1]"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">1</div>
                  <h4 className="font-medium mb-2">Awareness</h4>
                  <p className="text-sm mb-1">Recognizing the pattern exists and how it shows up in your life.</p>
                  <p className="text-sm italic">Example: "I notice I always put others' needs before my own, even when I'm exhausted."</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">2</div>
                  <h4 className="font-medium mb-2">Understanding Origins</h4>
                  <p className="text-sm mb-1">Connecting your pattern to childhood experiences that shaped it.</p>
                  <p className="text-sm italic">Example: "This started because my parents only showed love when I was being helpful."</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">3</div>
                  <h4 className="font-medium mb-2">Compassion</h4>
                  <p className="text-sm mb-1">Developing empathy for the child who needed this adaptation.</p>
                  <p className="text-sm italic">Example: "Little me did the best she could to get love and feel safe."</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">4</div>
                  <h4 className="font-medium mb-2">Practice New Responses</h4>
                  <p className="text-sm mb-1">Experimenting with different ways of being and responding.</p>
                  <p className="text-sm italic">Example: "I'm practicing saying no and noticing my fear response without giving in to it."</p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">5</div>
                  <h4 className="font-medium mb-2">Integration</h4>
                  <p className="text-sm mb-1">New responses become more natural as neural pathways strengthen.</p>
                  <p className="text-sm italic">Example: "I now naturally consider my needs alongside others' and can set boundaries without overwhelming guilt."</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To deepen your understanding of childhood patterns:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Notice one instance each day when a childhood pattern activates</li>
                  <li>When triggered, pause and ask "How old do I feel right now?"</li>
                  <li>Practice saying to yourself "This makes sense given my history"</li>
                  <li>Complete the "Mapping Your Patterns" reflection</li>
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

      case 18:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">REPARENTING: OFFERING COMPASSION TO THE SELF WITHIN</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Reparenting is one of the most profound gifts you can give yourself on your healing journey. It's the practise of becoming the loving, attuned parent your inner child needed—and perhaps didn't fully receive.</p>
              
              <p className="mb-4">When we experience childhood wounds or trauma, parts of us remain stuck at those developmental stages, waiting for the nurturing, protection, or validation they needed. Through reparenting, you learn to offer those unmet needs to yourself.</p>
              
              <p className="mb-3">This compassionate practise helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Develop a nurturing internal relationship with yourself</li>
                <li>Respond to emotional triggers with compassion instead of criticism</li>
                <li>Meet developmental needs that were overlooked</li>
                <li>Create new neural pathways of self-care and emotional regulation</li>
              </ul>
              
              <p className="font-medium italic">Reparenting isn't about blaming your caregivers—it's about empowering yourself to heal regardless of your past circumstances.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Foundations of Reparenting</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Safety & Protection</h4>
                  
                  <div className="space-y-3 mb-4">
                    <p className="mb-2">Our inner child needs to know they're physically and emotionally safe now. Reparenting involves creating boundaries that protect your wellbeing.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic font-medium">Reparenting sounds like:</p>
                      <p className="text-sm italic">"I'm here to keep you safe now. I won't let anyone hurt you like that again. I'm listening to your fear and taking it seriously."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Practical ways to offer safety:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Setting boundaries with people who don't respect you</li>
                      <li>Creating a calm, orderly living environment</li>
                      <li>Developing consistent routines and rituals</li>
                      <li>Taking threats to your wellbeing seriously</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Attunement & Validation</h4>
                  
                  <div className="space-y-3 mb-4">
                    <p className="mb-2">Many of us learned to disconnect from our emotions when they weren't validated. Reparenting involves tuning into and honoring all your feelings.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic font-medium">Reparenting sounds like:</p>
                      <p className="text-sm italic">"I see you're feeling sad right now, and that makes perfect sense. Your feelings matter to me. It's okay to feel whatever comes up."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Practical ways to offer attunement:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Checking in with yourself throughout the day</li>
                      <li>Naming emotions as they arise without judgment</li>
                      <li>Validating your emotional responses even if they seem "too much"</li>
                      <li>Keeping a feelings journal to track patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Nurturing & Comfort</h4>
                  
                  <div className="space-y-3 mb-4">
                    <p className="mb-2">Our inner child needs tenderness and care, especially when distressed. Reparenting involves soothing yourself in healthy, compassionate ways.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic font-medium">Reparenting sounds like:</p>
                      <p className="text-sm italic">"I'm here with you in this pain. Let me help take care of you. What would feel comforting right now? You deserve gentleness and rest."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Practical ways to offer nurturing:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Creating soothing rituals like warm baths or soft blankets</li>
                      <li>Using gentle touch like self-massage or hugging a pillow</li>
                      <li>Speaking to yourself with warm, caring tones</li>
                      <li>Preparing nourishing meals and environments</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Guidance & Structure</h4>
                  
                  <div className="space-y-3 mb-4">
                    <p className="mb-2">Our inner child needs supportive guidance and healthy limits. Reparenting involves providing the structure that fosters growth and wellbeing.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic font-medium">Reparenting sounds like:</p>
                      <p className="text-sm italic">"I know this feels hard, but I'll help you through it step by step. Let's find a balance that supports your health and happiness. I believe in your capability."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Practical ways to offer guidance:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Creating consistent daily routines</li>
                      <li>Setting loving limits on behaviors that harm you</li>
                      <li>Breaking down overwhelming tasks into manageable steps</li>
                      <li>Celebrating progress and effort, not just results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reparenting Practice: Dialogue with Your Inner Child</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">One powerful way to practise reparenting is through written dialogue with your inner child. This exercise helps you develop a compassionate relationship with the vulnerable parts of yourself.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Connect with Your Inner Child</h4>
                  <p className="mb-2">Close your eyes for a moment and visualize yourself at a younger age when you felt vulnerable, misunderstood, or alone. What age comes to mind? What situation was happening?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="I'm connecting with myself at age... In this memory, I was..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Listen to Your Inner Child</h4>
                  <p className="mb-2">From this younger part of you, what needs to be expressed? What feelings, fears, or needs were present then?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="Dear Adult Me,\n\n(Write from the perspective of your younger self)"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Respond with Compassion</h4>
                  <p className="mb-2">Now respond as your compassionate adult self. What would this child need to hear? How can you offer safety, validation, nurturing, or guidance?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="Dear Little One,\n\n(Write from your compassionate adult self)"
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Create a Reparenting Phrase</h4>
                  <p className="mb-2">Based on this dialogue, create a simple phrase you can use when this part of you feels triggered or vulnerable:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="Example: 'You're safe now. I've got you. Your feelings matter to me.'"
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Reparenting in Daily Life</h3>
              
              <p className="mb-4">Reparenting isn't a one-time exercise—it's a consistent practise that gradually rewires your relationship with yourself. Here are ways to incorporate reparenting into your everyday life:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Morning Check-In</h4>
                  <p className="text-sm">Start your day by placing a hand on your heart and asking, "How are you feeling today? What do you need?" Listen with curiosity and compassion, then consider how you might meet one need today.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Emotional Trigger Response</h4>
                  <p className="text-sm">When you notice strong emotional reactions, pause and ask, "What younger part of me might be activated right now? What did they need then that I can provide now?" Even a moment of this awareness can shift your response.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Physical Comfort Practice</h4>
                  <p className="text-sm">Create a physical self-soothing ritual—perhaps wrapping yourself in a soft blanket, placing a hand on your cheek, or gently stroking your arm while saying, "I'm here with you." Physical touch releases oxytocin and creates a sense of safety.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Celebration and Acknowledgment</h4>
                  <p className="text-sm">End each day by acknowledging three things you did well, no matter how small. Many of us received more criticism than praise as children. Consistent acknowledgment helps rewire your self-relationship.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate reparenting into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the written dialogue with your inner child at least twice this week</li>
                  <li>Practice your personalised reparenting phrase when you notice emotional triggers</li>
                  <li>Set a daily reminder to check in with your feelings and needs</li>
                  <li>Create one physical comfort ritual to use when distressed</li>
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
        
      case 19:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">MEET YOUR INNER CHILD</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">This guided audio meditation creates a safe, nurturing space for you to connect with your inner child. Through gentle visualisation and compassionate dialogue, you'll begin building a relationship with this vulnerable part of yourself.</p>
              
              <p className="mb-4">Regular practise strengthens this connection, allowing for deeper healing of childhood wounds and the development of greater self-compassion.</p>
              
              <p className="mb-3">This meditation helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Visualize and connect with your inner child at different ages</li>
                <li>Listen to what your inner child needs to tell you</li>
                <li>Offer comfort, safety, and understanding to yourself</li>
                <li>Begin healing specific emotional wounds from childhood</li>
              </ul>
              
              <p className="font-medium italic">The relationship you build with your inner child becomes a source of profound healing and self-compassion that grows stronger with practise.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-lg font-medium">Meet Your Inner Child Meditation</p>
                  <p className="text-sm text-gray-500">18:30 • Guided Audio Visualisation</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Before You Begin This Meditation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Creating The Right Environment</h4>
                  
                  <div className="space-y-3">
                    <p className="mb-2">To make your inner child meditation most effective:</p>
                    
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Find a quiet space where you won't be disturbed for at least 20 minutes</li>
                      <li>Turn off notifications and put devices on silent</li>
                      <li>Consider dimming the lights or using soft lighting</li>
                      <li>Have a blanket or comfort item nearby (optional)</li>
                      <li>Keep tissues accessible in case emotions arise</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Physical Preparation</h4>
                  
                  <div className="space-y-3">
                    <p className="mb-2">Preparing your body for the experience:</p>
                    
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Find a comfortable seated position or lie down</li>
                      <li>Ensure your spine is supported and your body feels at ease</li>
                      <li>Loosen any tight clothing or restrictive items</li>
                      <li>Consider using headphones for a more immersive experience</li>
                      <li>Have water nearby in case you need it</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Meditation Instructions</h3>
              
              <p className="mb-4">This audio visualisation will guide you through meeting your inner child. Here's what to expect:</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">1</div>
                  <div>
                    <p className="font-medium">Relaxation & Grounding</p>
                    <p className="text-sm text-gray-700">The meditation begins with gentle breathing exercises and body relaxation to help you feel safe and present.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">2</div>
                  <div>
                    <p className="font-medium">Creating a Safe Meeting Place</p>
                    <p className="text-sm text-gray-700">You'll visualize a special place where you can meet your inner child—somewhere that feels nurturing and secure.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">3</div>
                  <div>
                    <p className="font-medium">Meeting Your Inner Child</p>
                    <p className="text-sm text-gray-700">With gentle guidance, you'll visualize your younger self appearing in this safe space and begin building connection.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">4</div>
                  <div>
                    <p className="font-medium">Compassionate Communication</p>
                    <p className="text-sm text-gray-700">You'll be guided to listen to your inner child's needs and respond with the compassion, validation, and reassurance they need.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">5</div>
                  <div>
                    <p className="font-medium">Integration & Return</p>
                    <p className="text-sm text-gray-700">The meditation closes with an integration of this healing experience and a gentle return to the present moment.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#f8f0e6] rounded-md mb-4">
                <p className="text-sm italic">Remember there is no "right way" to experience this meditation. Your inner child may appear clearly or subtly. You might feel strong emotions or very little. Whatever emerges is perfect for where you are in your healing journey right now.</p>
              </div>
              
              <p className="mb-2 font-medium">Click the play button when you're ready to begin:</p>
              
              <div className="bg-[#f8f0e6] rounded-lg p-6 flex items-centre justify-centre">
                <div className="text-centre">
                  <button className="h-20 w-20 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4 hover:bg-[#a85629] transition-colours">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-lg font-medium">Inner Child Meditation</p>
                  <p className="text-sm text-gray-600">18:30 • Guided Audio</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Practice Reflection</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Your Inner Child Experience</h4>
                  <p className="text-sm mb-2">After completing the meditation, take some time to reflect on your experience:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="What did you notice about your inner child? What age did they appear? What did they need from you? How did it feel to connect with this part of yourself? What insights or emotions emerged during the meditation?"
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">After Your Meditation</h3>
              
              <p className="mb-4">Inner child work can bring up unexpected emotions. Here are some gentle suggestions for after your practise:</p>
              
              <ul className="space-y-2 pl-6 list-disc mb-6">
                <li>Take your time transitioning back to regular activities</li>
                <li>Stay hydrated and consider having a small, nourishing snack</li>
                <li>Be gentle with yourself if difficult emotions arose</li>
                <li>Consider journaling any additional insights that come up</li>
                <li>Plan a simple self-care activity for later in your day</li>
              </ul>
              
              <p className="text-sm italic">Remember that this meditation is a practise that deepens over time. Your relationship with your inner child will continue to evolve with each session.</p>
            </div>
          </div>
        );

      case 20:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">WHAT MY INNER CHILD NEEDS TO HEAR</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Our inner child often carries wounds from moments when critical emotional needs went unmet. These unmet needs continue to influence our adult lives until we learn to provide what was missing.</p>
              
              <p className="mb-4">This practise focuses on identifying and expressing the specific messages your inner child needs to hear—words that perhaps were never spoken when you most needed them.</p>
              
              <p className="mb-3">Through this practise, you'll:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Identify the specific words your inner child longs to hear</li>
                <li>Practice delivering these healing messages to yourself</li>
                <li>Create consistent reminders of these affirming statements</li>
                <li>Begin replacing old, painful messages with new, nurturing ones</li>
              </ul>
              
              <p className="font-medium italic">With practise, these new messages become an integrated part of your inner dialogue, replacing the critical or dismissive voices from the past.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Things Inner Children Need to Hear</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Safety & Protection Messages</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I will keep you safe now."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You don't have to be afraid anymore."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I won't let anyone hurt you like that again."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I will protect your boundaries and needs."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Worth & Belonging Messages</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You are worthy exactly as you are."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You don't have to earn love by being perfect."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You matter. Your existence is important."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You belong here and deserve to take up space."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Emotional Validation Messages</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"Your feelings make sense and matter to me."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"It's okay to feel angry/sad/scared. I'm with you."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You don't have to hide your feelings to be loved."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I see your pain, and I won't look away from it."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Unconditional Love Messages</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I love you completely, not just your 'good' parts."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"You are lovable even when you make mistakes."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"Nothing you could do would make me stop caring for you."</p>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic">"I see your true self, and it is beautiful."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Your Inner Child Messages</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take time to identify and craft the specific messages your inner child most needs to hear. These often relate to your particular childhood wounds and experiences.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Connect with Your Need</h4>
                  <p className="mb-2">Think about a situation in your childhood where you felt particularly vulnerable, misunderstood, or unsupported. What did you need to hear in that moment that you didn't?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="When I was [age/situation], what I needed to hear was..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Craft Your Messages</h4>
                  <p className="mb-2">Write 3-5 specific statements that would have healed, comforted, or validated you in that situation. Make them personal, specific, and in first person (e.g., "I see that you're hurting...").</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={5}
                    placeholder="1. \n2. \n3. \n4. \n5."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Record Your Core Message</h4>
                  <p className="mb-2">From your list above, which ONE message resonates most deeply? This will be your core healing statement to practise regularly.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="My core healing message is: "
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Practice: Delivering Your Messages</h3>
              
              <p className="mb-4">Once you've identified your healing messages, you need to deliver them consistently to your inner child. Here are effective ways to do this:</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">1</div>
                  <div>
                    <p className="font-medium">Mirror Practice</p>
                    <p className="text-sm text-gray-700">Stand in front of a mirror, look into your own eyes, and speak your messages aloud. Notice how it feels to both say and receive these words.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">2</div>
                  <div>
                    <p className="font-medium">Hand-on-Heart Method</p>
                    <p className="text-sm text-gray-700">Place one hand on your heart, close your eyes, and whisper your messages to yourself. The physical touch helps the words land more deeply.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">3</div>
                  <div>
                    <p className="font-medium">Childhood Photo Dialogue</p>
                    <p className="text-sm text-gray-700">Find a photo of yourself as a child. Speak directly to this image, delivering your healing messages with all the love and tenderness you can offer.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">4</div>
                  <div>
                    <p className="font-medium">Voice Recording</p>
                    <p className="text-sm text-gray-700">Record yourself speaking your messages slowly and compassionately. Listen to this recording during difficult moments or as part of your regular self-care practise.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">5</div>
                  <div>
                    <p className="font-medium">Written Reminders</p>
                    <p className="text-sm text-gray-700">Write your core message on small cards or sticky notes. Place them where you'll see them regularly—on your mirror, in your wallet, or as a phone wallpaper.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#f8f0e6] rounded-md">
                <p className="text-sm italic">Remember that repetition is key. Your inner child may not believe these messages right away, especially if you've spent years hearing the opposite. Be patient and consistent—healing happens through gentle persistence.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate this healing work into your daily life:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Commitment</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Deliver your core healing message to yourself at least once each morning and once each evening</li>
                  <li>Place a written reminder of your message somewhere you'll see it daily</li>
                  <li>When you notice self-criticism arising, pause and offer your healing message instead</li>
                  <li>Try at least three different delivery methods this week to see which resonates most</li>
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
        
      case 21:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">CREATING A SELF-COMPASSION RITUAL</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Self-compassion is the practise of treating yourself with the same kindness, concern, and support you'd offer to a good friend. Yet for many of us, especially those with trauma histories, self-compassion doesn't come naturally. We need to deliberately cultivate it through consistent practise.</p>
              
              <p className="mb-4">Creating a regular self-compassion ritual helps rewire neural pathways that may be tuned toward self-criticism, making compassionate self-treatment more automatic over time.</p>
              
              <p className="mb-3">A consistent self-compassion practise helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Respond to difficult emotions with kindness rather than judgment</li>
                <li>Develop emotional resilience during challenging times</li>
                <li>Connect with your common humanity rather than feeling isolated</li>
                <li>Create a sustainable foundation for your healing journey</li>
              </ul>
              
              <p className="font-medium italic">Self-compassion isn't self-indulgence—it's a courageous form of self-care that research shows reduces anxiety, depression, and shame while increasing wellbeing.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Three Elements of Self-Compassion</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Mindfulness</h4>
                  
                  <div className="space-y-3">
                    <p className="mb-2">Being aware of your suffering without over-identifying with it. Acknowledging your pain without being completely swept away by it.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic font-medium">Practice sounds like:</p>
                      <p className="text-sm italic">"I notice I'm feeling anxious right now. This is a difficult moment."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Common Humanity</h4>
                  
                  <div className="space-y-3">
                    <p className="mb-2">Recognizing that suffering is part of the shared human experience. You're not alone or abnormal in your struggles.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic font-medium">Practice sounds like:</p>
                      <p className="text-sm italic">"Many people feel this way. Struggling is part of being human."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Self-Kindness</h4>
                  
                  <div className="space-y-3">
                    <p className="mb-2">Offering yourself warmth, care and understanding rather than harsh judgment or criticism.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md">
                      <p className="text-sm italic font-medium">Practice sounds like:</p>
                      <p className="text-sm italic">"May I be kind to myself in this moment. I'm doing the best I can."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Creating Your Personal Self-Compassion Ritual</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Design a brief (5-10 minute) ritual that incorporates all three elements of self-compassion. You'll practise this regularly, especially during difficult moments.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Your Mindfulness Element</h4>
                  <p className="mb-2">How will you acknowledge your difficult feelings without becoming overwhelmed by them? Consider a grounding technique, brief meditation, or simple awareness practise.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="For the mindfulness portion of my ritual, I will..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Your Common Humanity Element</h4>
                  <p className="mb-2">How will you remind yourself that suffering is universal and you're not alone? This might involve reading quotes, reciting phrases, or visualisation.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="For the common humanity portion of my ritual, I will..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Your Self-Kindness Element</h4>
                  <p className="mb-2">How will you actively offer yourself care and kindness? Consider soothing touch, kind words, or a comforting activity.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="For the self-kindness portion of my ritual, I will..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Creating Your Ritual Flow</h4>
                  <p className="mb-2">Now combine the elements above into a short, repeatable ritual. Include when and where you'll practise it.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="My complete self-compassion ritual will be:\n\nI will practise this ritual at these times: "
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Ritual Plan
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Sample Self-Compassion Rituals</h3>
              
              <p className="mb-4">Here are three examples of self-compassion rituals that incorporate all three elements:</p>
              
              <div className="space-y-6 mb-6">
                <div className="bg-[#f8f0e6] p-4 rounded-md">
                  <h4 className="font-medium mb-2">Morning Mirror Ritual</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><span className="font-medium">Mindfulness:</span> Stand in front of the mirror, take three deep breaths, and acknowledge out loud one challenge you're facing today.</li>
                    <li><span className="font-medium">Common Humanity:</span> Place your hand on your heart and say, "Many others feel this way too. I'm not alone in this experience."</li>
                    <li><span className="font-medium">Self-Kindness:</span> Look into your eyes in the mirror and speak three supportive statements to yourself, such as "I'm doing my best," "I deserve compassion," and "I'm worthy of care and support."</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-4 rounded-md">
                  <h4 className="font-medium mb-2">Midday Reset Practice</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><span className="font-medium">Mindfulness:</span> Take a 2-minute break, close your eyes, and scan your body for tension. Name any difficult emotions present.</li>
                    <li><span className="font-medium">Common Humanity:</span> Visualize thousands of others around the world also taking a moment to pause and care for themselves amidst their struggles.</li>
                    <li><span className="font-medium">Self-Kindness:</span> Place one hand on your cheek and one on your heart. Repeat: "May I be kind to myself right now. May I give myself what I need."</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-4 rounded-md">
                  <h4 className="font-medium mb-2">Evening Comfort Ritual</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><span className="font-medium">Mindfulness:</span> Sit comfortably with a journal and write down any difficult moments from the day without judgment.</li>
                    <li><span className="font-medium">Common Humanity:</span> Read a quote or poem about shared human experience, or write: "Everyone has imperfect days. Struggle connects me to others."</li>
                    <li><span className="font-medium">Self-Kindness:</span> Wrap yourself in a soft blanket, hold a cup of warm tea, and speak gently to yourself about what you need right now.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To build your self-compassion muscle:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Commitment</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Practice your self-compassion ritual at least once daily at your designated time</li>
                  <li>Use your ritual during one difficult moment when you notice self-criticism arising</li>
                  <li>Track in a journal how you feel before and after your self-compassion practise</li>
                  <li>Notice any resistance that arises and approach it with curiosity rather than judgment</li>
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

      case 22:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">LETTER TO YOUR INNER CHILD</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Writing a letter to your inner child is a powerful way to express the understanding, validation, and love that your younger self may have needed. This compassionate communication helps bridge the gap between your adult self and the child within who still carries unresolved feelings or needs.</p>
              
              <p className="mb-4">Through this letter, you can offer your inner child the words they most needed to hear and create a sense of safety, acceptance, and nurturing that may have been missing.</p>
              
              <p className="mb-3">This letter-writing practise allows you to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Express understanding and empathy for childhood experiences</li>
                <li>Validate feelings that may have been dismissed</li>
                <li>Offer reassurance and comfort to your younger self</li>
                <li>Make promises about how you'll care for yourself moving forward</li>
              </ul>
              
              <p className="font-medium italic">By writing this letter, you step into the role of the wise, compassionate adult who can provide your inner child with the emotional support they deserve.</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Your Letter</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take your time with this exercise. Find a quiet space where you can connect with yourself and write from the heart. Your letter doesn't need to be perfect—authenticity and compassion are what matter most.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Guidance for Your Letter</h4>
                  <ul className="space-y-2 pl-6 list-disc mb-4">
                    <li>Address your letter to yourself at a specific age or to your inner child in general</li>
                    <li>Write in a warm, loving tone as you would to a child you deeply care about</li>
                    <li>Acknowledge specific experiences, feelings, or struggles from your childhood</li>
                    <li>Offer the validation, understanding, and reassurance your younger self needed</li>
                    <li>Make promises about how you'll care for and protect yourself now</li>
                    <li>End with expressions of love and acceptance</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-[#f8f0e6] rounded-md mb-4">
                  <p className="text-sm">Begin your letter with "Dear [age] year old me" or "Dear little one" or whatever feels right to you. Then write freely and compassionately.</p>
                </div>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={15}
                  placeholder="Dear ______,"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Letter
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">After Writing Your Letter</h3>
              
              <p className="mb-4">Once you've completed your letter, consider these ways to deepen the experience:</p>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">1</div>
                  <div>
                    <p className="font-medium">Read It Aloud</p>
                    <p className="text-sm text-gray-700">Find a private space and read your letter out loud to yourself. Notice any emotions that arise and allow them to move through you.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">2</div>
                  <div>
                    <p className="font-medium">Create a Ritual</p>
                    <p className="text-sm text-gray-700">Consider creating a small ritual around your letter—perhaps lighting a candle while reading it, or placing it somewhere special afterward.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">3</div>
                  <div>
                    <p className="font-medium">Keep It Accessible</p>
                    <p className="text-sm text-gray-700">Save your letter somewhere you can return to it when you need comfort or when old wounds feel triggered.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#bd6334] rounded-full text-white flex items-centre justify-centre mr-3">4</div>
                  <div>
                    <p className="font-medium">Write Follow-Up Letters</p>
                    <p className="text-sm text-gray-700">Consider writing additional letters to your inner child at different ages or addressing specific experiences as your healing journey continues.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Reflection</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Your Experience</h4>
                  <p className="text-sm mb-2">Take a moment to reflect on what it was like to write this letter:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="What emotions came up for you while writing? What was challenging? What felt healing? What did you learn about yourself or your needs through this process?"
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 23:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">INNER CHILD HEALING MEDITATION</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">This guided meditation creates a sacred space for you to connect with your inner child. Through visualisation and compassionate dialogue, you'll begin the process of healing old wounds and establishing a nurturing relationship with this vulnerable part of yourself.</p>
              
              <p className="mb-4">Regular practise of this meditation helps rebuild trust between your adult self and your inner child, allowing for deeper integration and healing.</p>
              
              <p className="mb-3">This meditation helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Visualize and connect with your inner child</li>
                <li>Listen to what your inner child needs</li>
                <li>Offer comfort, safety, and understanding</li>
                <li>Begin healing specific emotional wounds</li>
              </ul>
              
              <p className="font-medium italic">The relationship you build with your inner child becomes a source of profound healing and self-compassion.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">20-minute guided inner child healing meditation</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Preparing for Inner Child Meditation</h3>
              
              <p className="mb-4">Creating the right conditions will help make your inner child meditation most effective:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Creating Physical Safety</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Find a quiet, private space where you won't be disturbed</li>
                    <li>Create physical comfort with pillows, blankets, or whatever helps you feel secure</li>
                    <li>Consider having a comfort object nearby (stuffed animal, photo, special item)</li>
                    <li>Ensure your basic needs are met (not too hungry, thirsty, or tired)</li>
                    <li>Turn off notifications and set boundaries around this sacred time</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Creating Emotional Safety</h4>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Set an intention of gentleness and non-judgment</li>
                    <li>Remind yourself you can pause or stop the meditation at any time</li>
                    <li>Have grounding resources ready if needed (grounding object, breathing technique)</li>
                    <li>Consider journaling materials for after the meditation</li>
                    <li>Approach with curiosity rather than expectations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Written Inner Child Meditation Guide</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">If you prefer to guide yourself or want to review the meditation content, here's a written version of the inner child healing meditation:</p>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg mb-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Beginning</h4>
                  <p className="text-sm">Find a comfortable position where you feel supported and at ease. Allow your eyes to close gently or maintain a soft gaze. Take a few deep breaths, feeling your body becoming heavier and more relaxed with each exhale. Notice any tension you're holding and with each breath, invite that tension to soften.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Creating a Safe Space</h4>
                  <p className="text-sm">Imagine a place—real or imagined—where you feel completely safe and at peace. Notice the details of this space... What do you see around you? What sounds do you hear? Is there a particular scent in the air? Feel the temperature on your skin... Allow this place to become vivid and real in your mind. This is your sacred meeting place.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Meeting Your Inner Child</h4>
                  <p className="text-sm">In this safe space, imagine that your inner child—the younger version of you—is going to join you. You might picture yourself at a specific age, or simply hold the intention of connecting with your child self. Notice if an image comes to mind... How old is this child? What are they wearing? What's their expression? If no clear image appears, that's perfectly fine—just sense their presence.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Approaching with Love</h4>
                  <p className="text-sm">As your adult self, approach this child with gentleness and love. Move slowly, respecting their boundaries. Let them know you're here now, as the adult who can protect and care for them. You might sit nearby, extend a hand, or open your arms—following what feels right. Notice how your inner child responds to your presence.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Listening with Compassion</h4>
                  <p className="text-sm">Ask your inner child what they need from you. What have they been wanting to tell you? What do they most need to hear? Listen deeply, without judgment. They might communicate through words, images, sensations, or simply a felt sense. Whatever arises, receive it with openness.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Offering What Was Missing</h4>
                  <p className="text-sm">From your wise adult self, offer what this child needed but didn't receive. You might say: "I see you." "You're safe now." "It wasn't your fault." "Your feelings matter." "I'll never leave you." Use the words that feel most healing. You might also offer comfort through your presence, a hug, or simply being with any emotions that arise.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Integration</h4>
                  <p className="text-sm">If it feels right, imagine embracing your inner child and bringing them into your heart. Feel their essence merging with yours—their gifts, resilience, and pure qualities becoming integrated into your adult self. Remember that you can visit this child anytime. You are building a relationship that will continue to grow.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Returning</h4>
                  <p className="text-sm">Begin to bring your awareness back to your physical body. Feel the points of contact with the surface beneath you. Wiggle your fingers and toes. Take a few deeper breaths. When you're ready, gently open your eyes, carrying the connection with your inner child into your day.</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Inner Child Experience</h4>
                <p className="text-sm mb-2">After practicing the inner child meditation, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={4}
                  placeholder="What did you notice about your inner child? What did they need from you? How did it feel to connect with this part of yourself? What insights or emotions emerged during the meditation?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Inner Child Healing Experiences</h3>
              
              <p className="mb-4">When people begin connecting with their inner child, they often have one of these experiences:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Strong Emotions Arise</h4>
                  <p className="text-sm">Many people experience tears, grief, anger, or tenderness when first connecting with their inner child. These emotions often represent feelings that couldn't be fully expressed in childhood. They're a sign of healing—old pain finally being witnessed and released.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Difficulty Visualizing</h4>
                  <p className="text-sm">Some people can't "see" their inner child clearly or struggle with visualisation. This is often a protective mechanism. Instead of forcing it, try sensing their presence or energy. Trust what comes naturally—whether images, feelings, sensations, or just a knowing.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Inner Child is Distant or Distrustful</h4>
                  <p className="text-sm">If your inner child hides, turns away, or seems afraid, this reflects early experiences of betrayal or harm. Don't force connection; instead, respect their boundaries. Say, "I'll be here when you're ready" and practise patience. Trust builds over time with consistent presence.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Unexpected Age Appears</h4>
                  <p className="text-sm">Sometimes the inner child who shows up is from a different age than expected. This often indicates a time of significant wounding or need. Trust the wisdom of your psyche to bring forward the aspect that most needs healing now.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Multiple Inner Children</h4>
                  <p className="text-sm">Some people discover they have several inner children at different ages, each with unique needs. This is completely normal and reflects different developmental stages or aspects of your experience. You can work with one at a time or acknowledge all of them.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To deepen your inner child healing:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Listen to the guided meditation 2-3 times this week</li>
                  <li>Each day, ask your inner child "What do you need today?" and honour one small request</li>
                  <li>Place a childhood photo where you'll see it daily as a reminder of your commitment to this relationship</li>
                  <li>When self-criticism arises, pause and ask "Would I speak to a child this way?"</li>
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
        
      case 24:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">THE INNER NARRATIVE: 'I'M NOT ENOUGH,' 'I'M UNSAFE,' 'I'M ALONE'</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
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
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Uncovering Your Limiting Beliefs</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
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
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
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
                  </div>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours mt-4">
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
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">1</div>
                    <h4 className="font-medium mb-2">Direct Messaging</h4>
                    <p className="text-sm mb-1">Explicitly told messages from authority figures that we internalize.</p>
                    <p className="text-sm italic">"You'll never amount to anything." "Money doesn't grow on trees." "Don't trust anyone."</p>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">2</div>
                    <h4 className="font-medium mb-2">Modeling</h4>
                    <p className="text-sm mb-1">Absorbing the unspoken beliefs of family members through their behaviors.</p>
                    <p className="text-sm italic">Watching parents struggle with money, relationships, or self-worth teaches us what's "normal."</p>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">3</div>
                    <h4 className="font-medium mb-2">Misinterpreted Experiences</h4>
                    <p className="text-sm mb-1">Childhood conclusions drawn from experiences with our limited understanding.</p>
                    <p className="text-sm italic">A parent leaving leads to "I'm not worthy of love" rather than "Adults have complex problems."</p>
                  </div>
                  
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">4</div>
                    <h4 className="font-medium mb-2">Cultural Programming</h4>
                    <p className="text-sm mb-1">Societal messages about our worth based on identity, appearance, etc.</p>
                    <p className="text-sm italic">Media, education, and cultural norms teaching us what's valuable, beautiful, or acceptable.</p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">5</div>
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
        
      case 25:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">HOW TRAUMA SHAPES BELIEFS ABOUT SELF AND OTHERS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">After trauma, our minds create specific patterns of meaning to make sense of what happened. These trauma-related beliefs serve as protective mechanisms but often restrict our wellbeing and potential.</p>
              
              <p className="mb-4">Recognising these common trauma-related beliefs is the first step toward challenging their hold over your life. When you see that many trauma survivors share similar thoughts, it normalises your experience and reduces shame.</p>
              
              <p className="mb-3">Exploring these common beliefs helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Recognise the universality of trauma responses</li>
                <li>Understand how specific types of trauma shape specific beliefs</li>
                <li>See the connection between your thoughts and your trauma experiences</li>
                <li>Begin questioning whether these beliefs still serve you</li>
              </ul>
              
              <p className="font-medium italic">Trauma-related beliefs make perfect sense given what you've been through, but they don't have to define your future.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Beliefs About Safety and Trust</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">The World Is Dangerous</h4>
                  
                  <div>
                    <p className="mb-3">After trauma, many survivors develop a heightened perception of threat and danger in everyday situations.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"I need to be on constant alert. Something bad could happen at any moment. Nowhere is truly safe."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Catastrophising or assuming the worst will happen</li>
                      <li>Hypervigilance in public spaces</li>
                      <li>Difficulty relaxing or feeling at ease</li>
                      <li>Avoiding new experiences or environments</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">People Cannot Be Trusted</h4>
                  
                  <div>
                    <p className="mb-3">When trust is broken through betrayal, abuse, or neglect, many survivors develop profound mistrust of others' intentions.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"Everyone has ulterior motives. I can only rely on myself. People will hurt me if I let them close."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Questioning others' intentions even when shown kindness</li>
                      <li>Difficulty forming close relationships</li>
                      <li>Reluctance to ask for or accept help</li>
                      <li>Suspicion of authority figures or institutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Beliefs About Self-Worth and Responsibility</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">It Was My Fault</h4>
                  
                  <div>
                    <p className="mb-3">Many trauma survivors blame themselves for what happened as a way to create a sense of control over random, terrifying events.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"If only I had been more careful/aware/different, this wouldn't have happened. I deserved what happened to me."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Excessive responsibility-taking for others' actions</li>
                      <li>Persistent shame and self-blame</li>
                      <li>Difficulty accepting support or compassion</li>
                      <li>Punishing yourself for perceived mistakes</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">I Am Damaged/Broken</h4>
                  
                  <div>
                    <p className="mb-3">Trauma can create a sense of fundamental brokenness, as if the traumatic experience has permanently altered one's core identity.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"I'm defective because of what happened. Normal people didn't go through this. I'll never be whole again."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Feeling fundamentally different from others</li>
                      <li>Difficulty imagining a happy, fulfilling future</li>
                      <li>Harsh self-criticism or self-loathing</li>
                      <li>Believing recovery is impossible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Beliefs About Control and Capability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">I Must Control Everything</h4>
                  
                  <div>
                    <p className="mb-3">When trauma creates a sense of helplessness, many survivors attempt to regain safety through rigid control of their environment and emotions.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"I can't let my guard down. If I don't maintain control, terrible things will happen. Uncertainty is dangerous."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Perfectionism and overpreparation</li>
                      <li>Difficulty delegating or sharing responsibilities</li>
                      <li>Emotional rigidity or suppression</li>
                      <li>Discomfort with spontaneity or change</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">I Am Powerless</h4>
                  
                  <div>
                    <p className="mb-3">The inverse of control beliefs, some trauma survivors develop a profound sense of helplessness and powerlessness in the face of challenges.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-4">
                      <p className="text-sm italic">"I have no agency or choice. Bad things just happen to me. I can't influence my life's direction."</p>
                    </div>
                    
                    <p className="text-sm mb-2">This belief might show up as:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Learned helplessness or passivity</li>
                      <li>Difficulty making decisions</li>
                      <li>Surrendering to harmful situations</li>
                      <li>Fatalistic thinking or external locus of control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection: Recognising Your Trauma-Related Beliefs</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to explore which trauma-related beliefs feel familiar in your own experience. Remember, these beliefs developed as adaptations to help you survive difficult experiences.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Beliefs That Resonate</h4>
                  <p className="mb-2">Which of the beliefs described resonate most strongly with your experience? Select all that apply:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>The world is dangerous</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>People cannot be trusted</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>It was my fault</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>I am damaged/broken</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>I must control everything</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>I am powerless</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Your Personal Version</h4>
                  <p className="mb-2">How would you express the belief(s) you selected in your own words? What specific thoughts come up for you?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="In my own words, I believe that..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Origins of the Belief</h4>
                  <p className="mb-2">Can you connect this belief to specific experiences in your life? When might this belief have first developed?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="This belief likely started when..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Trauma-Related Beliefs in Context</h3>
              
              <p className="mb-4">Understanding the context of trauma-related beliefs can help reduce shame and create compassion for yourself:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Beliefs as Adaptations</h4>
                  <p className="text-sm">Trauma-related beliefs aren't errors or weaknesses—they're intelligent adaptations that helped you navigate threatening situations. For example, believing "I must stay alert at all times" would be entirely reasonable in an unsafe environment.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Cultural Influence</h4>
                  <p className="text-sm">Some trauma-related beliefs are reinforced by cultural messages. For instance, beliefs about self-blame may be stronger in cultures that emphasise individual responsibility, while beliefs about shame may be amplified in honour-based cultures.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Types of Trauma and Belief Patterns</h4>
                  <p className="text-sm">Different types of trauma tend to generate different belief patterns. Interpersonal trauma (abuse, assault) often creates beliefs about trust and worth, while accidents or disasters may create more beliefs about safety and control.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">The Role of Developmental Stage</h4>
                  <p className="text-sm">Beliefs formed during childhood trauma often have deeper roots as they become woven into your developing identity. Adult-onset trauma may create strong beliefs, but they're often more accessible to conscious examination.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To deepen your understanding of trauma-related beliefs:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Recognising Your Trauma-Related Beliefs" reflection</li>
                  <li>Notice when trauma-related beliefs arise in daily life and name them</li>
                  <li>Keep a small notebook to capture automatic thoughts when triggered</li>
                  <li>Practice self-compassion when you notice these beliefs ("Of course I think this way given what happened")</li>
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

        case 26:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">RELATIONSHIPS AS HEALING SPACES</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">While trauma often occurs in relationships, healing also happens in relationship. When we experience consistent safety, attunement, and respect with others, our nervous systems gradually relearn that connection can be nurturing rather than threatening.</p>
              
              <p className="mb-4">Healthy relationships serve as containers for healing—spaces where we can practise vulnerability, receive co-regulation, express needs, and experience repair after ruptures. These healing relationships may include friendships, romantic partnerships, family connections, therapeutic relationships, or community bonds.</p>
              
              <p className="mb-3">Healing relationships help you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Rebuild trust in yourself and others</li>
                <li>Experience attunement and being truly seen</li>
                <li>Practice expressing needs and feelings safely</li>
                <li>Rewire attachment patterns through consistent safety</li>
              </ul>
              
              <p className="font-medium italic">The qualities that make relationships healing aren't mysterious—they're practical patterns of interaction that can be cultivated with intention.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Qualities of Healing Relationships</h3>
              
              <p className="mb-4">All healing relationships share certain key qualities, regardless of whether they're friendships, family relationships, romantic partnerships, or therapeutic connections:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Safety</h4>
                  
                  <div>
                    <p className="mb-3">The foundation of all healing relationships is consistent emotional and physical safety.</p>
                    
                    <p className="text-sm mb-2">What safety looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Respect for boundaries and consent</li>
                      <li>Predictable responses and reliability</li>
                      <li>Freedom from criticism, judgement, or manipulation</li>
                      <li>Space for authentic expression without punishment</li>
                      <li>Absence of fear, walking on eggshells, or emotional danger</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Attunement</h4>
                  
                  <div>
                    <p className="mb-3">Healing relationships involve seeing and responding to each other's emotional states with care.</p>
                    
                    <p className="text-sm mb-2">What attunement looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Noticing subtle changes in emotional states</li>
                      <li>Checking in with genuine curiosity</li>
                      <li>Validating feelings without trying to "fix" them</li>
                      <li>Matching energy appropriately (calm when needed, playful when appropriate)</li>
                      <li>Adapting responses based on what's happening for the other person</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Repair</h4>
                  
                  <div>
                    <p className="mb-3">All relationships involve ruptures—moments of disconnection or hurt. Healing relationships reliably repair these ruptures.</p>
                    
                    <p className="text-sm mb-2">What repair looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Acknowledging when hurt has occurred</li>
                      <li>Taking responsibility without defensiveness</li>
                      <li>Genuine apologies that focus on impact, not intention</li>
                      <li>Changed behaviour that demonstrates learning</li>
                      <li>Creating space to process difficult interactions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Mutuality</h4>
                  
                  <div>
                    <p className="mb-3">Healing relationships involve reciprocity and balance, even as they accommodate differences in needs and capacities.</p>
                    
                    <p className="text-sm mb-2">What mutuality looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Both people's needs matter and receive attention</li>
                      <li>Giving and receiving ebbs and flows over time</li>
                      <li>Power is shared rather than one person dominating</li>
                      <li>Both people can influence the relationship</li>
                      <li>Differences are honoured rather than erased</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Appropriate Responsiveness</h4>
                  
                  <div>
                    <p className="mb-3">Healing relationships respond to needs with appropriate timing, intensity, and consistency.</p>
                    
                    <p className="text-sm mb-2">What appropriate responsiveness looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Being present when needed without engulfment</li>
                      <li>Respecting "no" without withdrawal or punishment</li>
                      <li>Supporting autonomy and independence</li>
                      <li>Matching the level of emotional intensity needed</li>
                      <li>Consistency that builds trust over time</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Growth Orientation</h4>
                  
                  <div>
                    <p className="mb-3">Healing relationships encourage development and evolution rather than stagnation.</p>
                    
                    <p className="text-sm mb-2">What growth orientation looks like:</p>
                    <ul className="space-y-1 pl-5 list-disc text-sm">
                      <li>Supporting each other's healing journeys</li>
                      <li>Willingness to learn and change over time</li>
                      <li>Discussing difficult topics with care</li>
                      <li>Celebrating progress and changes</li>
                      <li>Flexibility as needs and circumstances evolve</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Relationship Inventory</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to reflect on your current relationships and identify which ones provide healing qualities. This isn't about judging relationships as "good" or "bad," but understanding what each offers you.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Identifying Your Relationships</h4>
                  <p className="mb-2">List 3-5 significant relationships in your life right now:</p>
                  
                  <div className="space-y-3 mb-4">
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Relationship 1 (e.g., 'friendship with Alex')"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Relationship 2"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Relationship 3"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Relationship 4 (optional)"
                    />
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Relationship 5 (optional)"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Assessing Healing Qualities</h4>
                  <p className="mb-2">For your first relationship, rate the presence of these healing qualities from 1 (rarely present) to 5 (consistently present):</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm mb-1">Safety:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Attunement:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Repair:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Mutuality:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Appropriate Responsiveness:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Growth Orientation:</p>
                      <input type="range" min="1" max="5" className="accent-[#bd6334] w-full" />
                    </div>
                  </div>
                  
                  <p className="text-sm mb-2">Based on your assessment, what healing qualities does this relationship provide? What might be missing?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="This relationship provides... What might strengthen this relationship is..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Creating a Healing Relationship Network</h4>
                  <p className="mb-2">Based on your assessment of all your relationships, reflect on your overall support network:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="The healing qualities most present in my relationships are... The qualities I might need to seek more of are..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Co-Regulation in Healing Relationships</h3>
              
              <p className="mb-4">One of the most powerful healing aspects of relationships is co-regulation—the process by which our nervous systems naturally influence and stabilise each other. When someone with a regulated nervous system stays present with us during distress, their calm state helps our own system settle.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Receiving Co-Regulation</h4>
                  <p className="mb-3">Ways to benefit from others' regulated states:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Reach out to a calm, grounding person when distressed</li>
                    <li>Engage in synchronous breathing with a regulated person</li>
                    <li>Sit side-by-side in quiet companionship during stress</li>
                    <li>Allow physical comfort like a hand on your shoulder or a hug (if welcome)</li>
                    <li>Share your distress without expecting the other person to "fix" it</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Offering Co-Regulation</h4>
                  <p className="mb-3">Ways to provide regulatory support to others:</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Stay calm and grounded in your own body when others are distressed</li>
                    <li>Offer a steady, non-anxious presence without rushing to fix</li>
                    <li>Match your voice tone, pace, and volume to create a sense of safety</li>
                    <li>Provide physical comfort if welcomed and appropriate</li>
                    <li>Validate emotions without amplifying or dismissing them</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-5 rounded-lg mt-4 border border-[#e6d5c1]">
                <p className="italic">Remember: Co-regulation isn't about one person constantly regulating the other. In healthy relationships, the role of regulator flows back and forth depending on who needs support in the moment.</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Creating New Healing Relationships</h3>
              
              <p className="mb-4">If you've assessed your current relationships and found gaps in healing qualities, you may want to intentionally develop new connections. Here are suggestions for finding and nurturing healing relationships:</p>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium mb-1">Start with shared interests or values</h4>
                    <p className="text-sm">Join groups, classes, or communities organised around activities or causes you care about. Shared engagement creates natural opportunities for connection without immediate pressure for emotional intimacy.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium mb-1">Look for "green flags"</h4>
                    <p className="text-sm">Pay attention to how people treat others, respond to boundaries, handle their own emotions, and speak about absent people. These behaviours reveal a lot about their capacity for healthy connection.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium mb-1">Build connection gradually</h4>
                    <p className="text-sm">Allow relationships to develop at a pace that feels safe for your nervous system. Rushing into deep disclosure or dependency can overwhelm trauma responses and prevent sustainable connection.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium mb-1">Consider structured support</h4>
                    <p className="text-sm">Therapy groups, support circles, or healing communities offer contained spaces to practise vulnerability with clear boundaries and shared purpose. These can be valuable stepping stones toward broader relationship healing.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-medium mb-1">Practice reciprocity</h4>
                    <p className="text-sm">Healing relationships involve both giving and receiving. Notice if you tend to only give (keeping others at arm's length) or only receive (avoiding vulnerability of offering support). Practice balancing these aspects.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To nurture healing relationships in your life:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Relationship Inventory" exercise</li>
                  <li>Notice moments of co-regulation in your interactions</li>
                  <li>Practice one small act of vulnerability with a trusted person</li>
                  <li>Reflect on which healing qualities you might need more of in your life</li>
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

      case 27:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">CREATING YOUR ONGOING HEALING PRACTICE</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Healing from trauma isn't a one-time event—it's an ongoing practise that becomes integrated into your daily life. As you've progressed through this programme, you've developed tools and insights that can serve you long after this course ends.</p>
              
              <p className="mb-4">Creating a sustainable healing practise means establishing rhythms and rituals that support your continued growth. This isn't about perfection or rigid schedules; it's about creating a flexible framework that nourishes your wellbeing and helps you maintain the progress you've made.</p>
              
              <p className="mb-3">Your ongoing healing practise supports you by:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Maintaining the progress you've made</li>
                <li>Continuing to process and integrate experiences</li>
                <li>Preventing regression during stressful periods</li>
                <li>Supporting your nervous system's ongoing regulation</li>
              </ul>
              
              <p className="font-medium italic">Your healing practise becomes a sanctuary—a reliable source of support and growth that evolves with you.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Elements of Your Healing Practice</h3>
              
              <p className="mb-4">Core beliefs exist at a deeper level than everyday thoughts. They are the foundation upon which all your other thoughts are built:</p>
              
              <div className="relative overflow-hidden p-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f1e9] to-white opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="mb-8 text-centre">
                    <div className="inline-block p-3 bg-white border border-gray-300 rounded-md shadow-sm">
                      <p className="font-medium">Surface Thoughts</p>
                      <p className="text-sm italic">"I'll probably mess up this presentation."</p>
                      <p className="text-sm italic">"Why would they want to hear from me?"</p>
                    </div>
                    <div className="h-8 w-0.5 mx-auto bg-gray-300"></div>
                  </div>
                  
                  <div className="mb-8 text-centre">
                    <div className="inline-block p-3 bg-white border border-gray-300 rounded-md shadow-sm">
                      <p className="font-medium">Intermediate Beliefs</p>
                      <p className="text-sm italic">"I always fail when it matters."</p>
                      <p className="text-sm italic">"People judge me harshly."</p>
                    </div>
                    <div className="h-8 w-0.5 mx-auto bg-gray-300"></div>
                  </div>
                  
                  <div className="text-centre">
                    <div className="inline-block p-4 bg-[#bd6334] text-white rounded-md shadow-md">
                      <p className="font-medium">Core Beliefs</p>
                      <p className="italic">"I am inadequate."</p>
                      <p className="italic">"I am unworthy."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-centre italic mt-2">Core beliefs are the foundation that generates intermediate beliefs (rules, assumptions) and surface thoughts (moment-to-moment automatic thoughts).</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: The Downward Arrow Technique</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">The Downward Arrow is a powerful technique for uncovering core beliefs by following a chain of thoughts to their root. This exercise helps reveal beliefs that may be operating outside your awareness.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Identify a Trigger Situation</h4>
                  <p className="mb-2">Think of a recent situation where you experienced a strong emotional reaction (anxiety, shame, anger, etc.) that seemed disproportionate to the event.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="Describe a recent situation that triggered a strong emotional reaction..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Capture Your Surface Thought</h4>
                  <p className="mb-2">What was the main thought going through your mind in that moment?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="The main thought I had was..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Follow the Downward Arrow</h4>
                  <p className="mb-2">For each thought, ask yourself: "If this were true, what would it mean about me?" or "What's the worst thing about that?" Then record your answer, and repeat the process with each new thought.</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm mb-1">If my thought is true, what would that mean about me?</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="It would mean that I..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">And if that were true, what would that mean?</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="It would mean that I..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">And if that were true, what would that mean?</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="It would mean that I..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm mb-1">And at the deepest level, what does that mean about me, others, or the world?</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="At the core, I believe that..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Identify the Core Belief</h4>
                  <p className="mb-2">Look at your final answer(s). Can you distill this into a simple core belief statement? Core beliefs often start with "I am..." or contain absolute terms like "always" or "never."</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="My core belief appears to be..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Core Beliefs After Trauma</h3>
              
              <p className="mb-4">While each person's experience is unique, trauma tends to generate specific types of core beliefs. See if you recognise any of these common core beliefs in yourself:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">About Self</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"I am fundamentally damaged/broken"</li>
                    <li>"I am unworthy of love and belonging"</li>
                    <li>"I am responsible for others' pain"</li>
                    <li>"I am helpless/powerless"</li>
                    <li>"I am shameful/bad/defective"</li>
                    <li>"I don't deserve good things"</li>
                    <li>"I am only valuable when I'm [helping/achieving/etc.]"</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">About Others</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"People will always hurt/abandon me"</li>
                    <li>"Others can't be trusted"</li>
                    <li>"People are dangerous/threatening"</li>
                    <li>"Others will reject me if they know the real me"</li>
                    <li>"Everyone is out for themselves"</li>
                    <li>"People are inherently manipulative"</li>
                    <li>"Others are judging me constantly"</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">About the World</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"The world is fundamentally unsafe"</li>
                    <li>"Life is a constant struggle"</li>
                    <li>"Bad things happen without warning"</li>
                    <li>"Nothing good lasts"</li>
                    <li>"I have no control over what happens"</li>
                    <li>"The world is unjust/unfair"</li>
                    <li>"There's never enough to go around"</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-5 rounded-lg mt-4 border border-[#e6d5c1]">
                <p className="italic">Remember: Identifying a core belief doesn't mean it's true. These beliefs developed as adaptations to painful experiences, but they aren't accurate reflections of who you are or how the world truly is.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">How Core Beliefs Maintain Themselves</h3>
              
              <p className="mb-4">Core beliefs are remarkably persistent because they create self-reinforcing cycles that maintain them, even in the face of contradictory evidence:</p>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex flex-col items-centre">
                  <div className="w-64 p-4 bg-[#f8f0e6] rounded-lg text-centre mb-4">
                    <p className="font-medium mb-1">Core Belief</p>
                    <p className="italic">"I am unlovable"</p>
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                    <div className="flex flex-col items-centre">
                      <div className="w-full p-4 bg-[#f8f0e6] rounded-lg text-centre mb-4">
                        <p className="font-medium mb-1">Selective Attention</p>
                        <p className="text-sm">Notice every sign of rejection but discount signs of acceptance</p>
                      </div>
                      
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                      
                      <div className="w-full p-4 bg-[#f8f0e6] rounded-lg text-centre">
                        <p className="font-medium mb-1">Interpretation</p>
                        <p className="text-sm">"They're just being nice, they don't really care about me"</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-centre">
                      <div className="w-full p-4 bg-[#f8f0e6] rounded-lg text-centre mb-4">
                        <p className="font-medium mb-1">Behaviour</p>
                        <p className="text-sm">Withdraw from relationships or test people's loyalty</p>
                      </div>
                      
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                      
                      <div className="w-full p-4 bg-[#f8f0e6] rounded-lg text-centre">
                        <p className="font-medium mb-1">Result</p>
                        <p className="text-sm">Relationships become strained, confirming the belief of being unlovable</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  
                  <div className="w-64 p-4 bg-[#bd6334] text-white rounded-lg text-centre">
                    <p className="font-medium mb-1">Belief Reinforced</p>
                    <p className="italic">"See? I really am unlovable"</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To deepen your understanding of your core beliefs:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Downward Arrow" exercise for at least two different trigger situations</li>
                  <li>Notice when strong emotions arise and ask, "What might I be believing in this moment?"</li>
                  <li>Journal about which core beliefs from the list resonate most strongly with you</li>
                  <li>Begin observing how your core beliefs influence your daily perceptions and actions</li>
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

      case 28:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">REFRAMING STUCK POINTS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Once you've identified your stuck points—those thoughts and beliefs that keep you trapped in trauma responses—the next step is learning to reframe them. Reframing doesn't mean denying your experience or forcing positivity; it means developing more balanced, compassionate, and accurate ways of understanding what happened to you.</p>
              
              <p className="mb-4">Effective reframing acknowledges the reality of your experience while opening possibilities for healing and growth. It helps you move from rigid, trauma-influenced thinking patterns to more flexible, empowering perspectives that support your recovery.</p>
              
              <p className="mb-3">Reframing stuck points helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Challenge distorted thinking patterns with compassion</li>
                <li>Develop more balanced perspectives on traumatic experiences</li>
                <li>Create space for healing and growth</li>
                <li>Reduce the emotional charge of triggering thoughts</li>
                <li>Develop awareness of your unique trauma response patterns</li>
              </ul>
              
              <p className="font-medium italic">The process of identifying stuck points is not about self-criticism but about compassionate awareness—recognizing these thoughts as natural responses to abnormal events.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Categories of Stuck Points</h3>
              
              <p className="mb-4">Stuck points typically fall into recognizable categories. Identifying which categories your stuck points belong to can help you understand the specific ways trauma has impacted your thinking:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Safety Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs related to danger, vulnerability, and the inability to protect yourself.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I can never feel safe again."</p>
                      <p className="text-sm italic">"The world is fundamentally dangerous."</p>
                      <p className="text-sm italic">"I must always be on guard or something terrible will happen."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I am not safe and cannot protect myself."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Trust Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs about the impossibility of trusting others or even yourself.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I can't trust anyone ever again."</p>
                      <p className="text-sm italic">"People will always betray me if given the chance."</p>
                      <p className="text-sm italic">"I can't even trust my own judgment."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I cannot depend on others or myself to be reliable."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Control Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs about powerlessness and inability to influence outcomes in your life.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I have no control over what happens to me."</p>
                      <p className="text-sm italic">"I am powerless to change my circumstances."</p>
                      <p className="text-sm italic">"Nothing I do makes any difference."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I am helpless and have no agency in my own life."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Self-Worth Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs about being fundamentally flawed, unworthy, or undeserving of love and respect.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I am not enough."</p>
                      <p className="text-sm italic">"I don't deserve good things in my life."</p>
                      <p className="text-sm italic">"There is something inherently wrong with me."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I am fundamentally unworthy and unlovable."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Intimacy Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs about emotional closeness and connection being dangerous or impossible.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I can never let anyone get close to me again."</p>
                      <p className="text-sm italic">"Being vulnerable means getting hurt."</p>
                      <p className="text-sm italic">"Deep connection is not possible for me."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I will be hurt, abandoned, or overwhelmed if I let others in."</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Responsibility Stuck Points</h4>
                  
                  <div>
                    <p className="mb-3">Beliefs about blame, guilt, and responsibility for traumatic events.</p>
                    
                    <div className="bg-[#f8f0e6] p-3 rounded-md mb-3">
                      <p className="text-sm italic">"I should have prevented what happened."</p>
                      <p className="text-sm italic">"It's my fault this occurred."</p>
                      <p className="text-sm italic">"I'm responsible for other people's happiness and safety."</p>
                    </div>
                    
                    <p className="text-sm mb-2">Core fear:</p>
                    <p className="text-sm italic">"I am to blame for bad things that happen to me and others."</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Evidence for and Against</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">This exercise helps you gather and evaluate evidence related to a core belief, much like a detective investigating a case. It's not about proving yourself "wrong," but about developing a more accurate and balanced perspective.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Select a Core Belief</h4>
                  <p className="mb-2">Choose one negative core belief you identified previously that you'd like to investigate:</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={2}
                    placeholder="My core belief is..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Gather Evidence Supporting the Belief</h4>
                  <p className="mb-2">List experiences, observations, or facts that seem to support this belief. Try to be specific rather than general.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="Evidence that seems to support this belief includes..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Gather Evidence Against the Belief</h4>
                  <p className="mb-2">Now challenge yourself to find evidence that contradicts or doesn't fit with this belief. Include even small contradictions.</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="Evidence that doesn't support this belief includes..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Examine for Distortions</h4>
                  <p className="mb-2">Review your supporting evidence. Are any cognitive distortions influencing how you've interpreted this evidence?</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>All-or-Nothing Thinking</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Overgeneralisation</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Mental Filtering</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Disqualifying the Positive</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Mind Reading</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Catastrophising</span>
                    </div>
                  </div>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="I notice these distortions in my thinking about this belief..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 5: Develop a Balanced Perspective</h4>
                  <p className="mb-2">Based on all the evidence, what might be a more balanced, nuanced way to view yourself, others, or the world?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="A more balanced belief might be..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Trauma and Historical Evidence</h3>
              
              <p className="mb-4">When working with trauma-related beliefs, it's important to address how these beliefs formed in the context of your history:</p>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium mb-1">Acknowledge historical truth</h4>
                      <p className="text-sm">Some core beliefs were completely true and appropriate in the past. For example, "I'm not safe" may have been absolutely accurate during trauma. Recognise that your belief developed for good reason.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium mb-1">Separate past from present</h4>
                      <p className="text-sm">A belief can be true in the past but not in the present. Ask: "Is this belief still true in my current circumstances? Does it accurately reflect my life now?" This helps create temporal boundaries around the belief.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium mb-1">Identify changes since then</h4>
                      <p className="text-sm">Reflect on how circumstances have changed: "What resources, relationships, knowledge, or capabilities do I have now that I didn't have then?" This highlights how the context has evolved.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-medium mb-1">Honour the protective function</h4>
                      <p className="text-sm">Acknowledge how the belief protected you: "This belief helped me survive by keeping me vigilant/cautious/independent." This creates compassion for why the belief exists.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-medium mb-1">Consider present costs</h4>
                      <p className="text-sm">Examine the current impact: "How is holding onto this belief affecting my life now? What opportunities or experiences might it be limiting?" This highlights why updating the belief matters.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">A Note on "Proving Yourself Wrong"</h3>
              
              <p className="mb-4">The goal of gathering evidence isn't to invalidate your experience or "prove yourself wrong." This approach often creates resistance because:</p>
              
              <ul className="space-y-3 pl-6 list-disc mb-4">
                <li>It can feel invalidating to your very real experiences of pain</li>
                <li>It may trigger defensiveness that strengthens the belief</li>
                <li>It overlooks the important protective function the belief served</li>
              </ul>
              
              <p className="mb-4">Instead, the goal is to:</p>
              
              <ul className="space-y-3 pl-6 list-disc">
                <li>Honour how the belief made sense given your history</li>
                <li>Expand your perspective to include information you may have filtered out</li>
                <li>Create space for new possibilities without forcing yourself to abandon familiar perspectives</li>
                <li>Develop more flexibility in how you interpret your experiences</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To strengthen your belief detective skills:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Evidence For and Against" exercise for one core belief</li>
                  <li>Practice noticing cognitive distortions in your daily thoughts</li>
                  <li>Keep a small notebook to jot down evidence that contradicts your negative core beliefs</li>
                  <li>When triggered, ask yourself "What historical belief might be activated right now?"</li>
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

      case 29:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">TAKING SMALL BOLD ACTIONS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Creating alternative beliefs intellectually is just the first step—the real transformation happens when these new beliefs become embodied in your nervous system and daily life.</p>
              
              <p className="mb-4">Visualisation is a powerful tool for this embodiment process. By imagining yourself living from your new beliefs, you create neural pathways that make these beliefs more accessible and natural over time.</p>
              
              <p className="mb-3">Embodying new beliefs through visualisation helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Bridge the gap between intellectual understanding and felt experience</li>
                <li>Rehearse new ways of being in a safe, controlled environment</li>
                <li>Activate the sensory and emotional dimensions of your new beliefs</li>
                <li>Create a template for how life can be different</li>
              </ul>
              
              <p className="font-medium italic">The mind doesn't always distinguish between vividly imagined experiences and real ones—both can create lasting neural changes.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">15-minute guided embodiment visualisation</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Science of Embodied Visualisation</h3>
              
              <p className="mb-4">Visualisation isn't just "positive thinking"—it creates measurable changes in your brain and body:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Neural Rehearsal</h4>
                  <p className="mb-3">When you vividly imagine an experience, your brain activates many of the same neural circuits that would fire during the actual experience.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Athletes use visualisation to improve performance</li>
                    <li>Musicians mentally rehearse difficult passages</li>
                    <li>Trauma survivors can practise new responses to triggers</li>
                    <li>Your brain strengthens the pathways you consistently activate</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Embodied Cognition</h4>
                  <p className="mb-3">Your thoughts, emotions, and physical sensations are interconnected systems that influence each other.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Changing your body posture affects your emotions</li>
                    <li>Imagining sensations can create physical responses</li>
                    <li>Beliefs are stored not just mentally but physically</li>
                    <li>Trauma is held in both mind and body</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Memory Reconsolidation</h4>
                  <p className="mb-3">When you activate an old belief while simultaneously experiencing its contradiction, you create the conditions for updating the original belief.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Memories and beliefs become temporarily malleable when activated</li>
                    <li>Introducing new information during this window can update the original</li>
                    <li>Emotional experiences create stronger reconsolidation effects</li>
                    <li>Repetition helps stabilise the updated beliefs</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">State-Dependent Learning</h4>
                  <p className="mb-3">Information learned in one state is more easily recalled when in a similar state, including emotional and physical states.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Practising new beliefs in a calm, resourced state helps them become accessible</li>
                    <li>Gradually bridging between calm states and mildly triggered states builds resilience</li>
                    <li>Creating distinct somatic "anchors" for new beliefs makes them easier to access</li>
                    <li>Regular practise creates stronger state associations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Written Embodiment Visualisation Guide</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">This written guide walks you through the embodiment visualisation process. You can use it alongside the audio recording or as a standalone practise:</p>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg mb-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Preparation</h4>
                  <p className="text-sm">Before beginning, select one alternative belief you want to embody more fully. Write it down or hold it clearly in your mind. Find a quiet, comfortable space where you won't be disturbed for about 15 minutes. Sit or lie down in a position that allows your body to fully relax.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Centering (2-3 minutes)</h4>
                  <p className="text-sm">Close your eyes or soften your gaze. Take several deep breaths, allowing your body to relax more deeply with each exhale. Feel the points of contact between your body and the surface beneath you. Notice any areas of tension and invite them to soften. Allow your awareness to rest inside your body.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Embodying Your Current Belief (3-4 minutes)</h4>
                  <p className="text-sm">Gently bring to mind the old belief you wish to transform. Notice how this belief feels in your body. Where do you feel it? What sensations arise? Perhaps tension, heaviness, constriction, or other physical responses. Don't try to change anything—simply observe with curiosity. Notice how this belief affects your posture, breathing, and energy level. Acknowledge that this belief developed for good reasons and has been trying to protect you in some way.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Transition (1-2 minutes)</h4>
                  <p className="text-sm">Now, imagine that you're ready to set down this old belief—not forcing it away, but simply creating space for something new to emerge alongside it. Take a few deep breaths, and with each exhale, imagine releasing some of the hold this belief has had on you. Feel yourself becoming lighter and more open.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Embodying Your New Belief (5-6 minutes)</h4>
                  <p className="text-sm">Bring to mind your alternative belief. Say it silently to yourself several times. Now, imagine what it would feel like in your body if this belief were completely true for you. How would you hold yourself? How would your breathing change? What sensations might you experience? Allow your body to naturally shift into this new state.</p>
                  <p className="text-sm mt-2">Imagine yourself moving through the world with this new belief fully integrated. See yourself in different situations—at home, with loved ones, at work, in challenging circumstances. How do you respond differently? How do others respond to you? Notice the emotional tone of these experiences. Allow yourself to fully feel what becomes possible when you embody this new belief.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Creating an Anchor (2-3 minutes)</h4>
                  <p className="text-sm">While experiencing the felt sense of your new belief, create a physical anchor that you can use to recall this state. This might be:</p>
                  <ul className="space-y-1 pl-5 list-disc text-sm mt-2">
                    <li>A specific hand position (lightly touching thumb and finger together)</li>
                    <li>A particular phrase paired with a deep breath</li>
                    <li>A gentle touch to your heart, shoulder, or another part of your body</li>
                    <li>A specific image or colour you associate with this new state</li>
                  </ul>
                  <p className="text-sm mt-2">Practice using this anchor while fully experiencing the embodied state of your new belief. This creates a neurological connection that will help you access this state more easily in daily life.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Integration and Closing (1-2 minutes)</h4>
                  <p className="text-sm">Remind yourself that this new belief is available to you at any time, and each time you practise accessing it, the neural pathways become stronger. Begin to bring gentle movement back to your body—perhaps wiggling your fingers and toes, taking a deeper breath, or stretching slightly. When you're ready, slowly open your eyes, carrying the embodied sense of your new belief with you as you return to your day.</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Visualisation Experience</h4>
                <p className="text-sm mb-2">After completing the visualisation, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={4}
                  placeholder="What physical sensations did you notice with your old belief versus your new belief? What images or situations arose during the visualisation? What was it like to embody your new belief? Did you encounter any resistance or challenges?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Enhancing Your Visualisation Practice</h3>
              
              <p className="mb-4">Try these approaches to deepen the impact of your visualisation practise:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Multi-Sensory Engagement</h4>
                  
                  <p className="mb-3">The more senses you engage, the more powerful your visualisation becomes.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>What would you <strong>see</strong> around you while embodying this belief?</li>
                    <li>What <strong>sounds</strong> would be present in this experience?</li>
                    <li>What <strong>physical sensations</strong> arise in different parts of your body?</li>
                    <li>Is there a <strong>taste</strong> or <strong>smell</strong> associated with this state?</li>
                    <li>What <strong>emotions</strong> flow through you in this embodied state?</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Future Self Dialogue</h4>
                  
                  <p className="mb-3">Imagine meeting a version of yourself who fully embodies this new belief.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>How does this future self hold their body, speak, and move?</li>
                    <li>What wisdom can they share about the journey to embodying this belief?</li>
                    <li>What struggles did they overcome along the way?</li>
                    <li>What support or encouragement do they offer your present self?</li>
                    <li>What question would you most like to ask them?</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Obstacle Navigation</h4>
                  
                  <p className="mb-3">Visualize successfully maintaining your new belief during challenges.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Imagine a specific situation that typically triggers your old belief</li>
                    <li>See yourself noticing the trigger and recognizing the old belief arising</li>
                    <li>Visualize yourself using your anchor to reconnect with your new belief</li>
                    <li>Picture yourself responding from this new belief despite the challenge</li>
                    <li>Feel the sense of empowerment from this new response</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Physical Embodiment</h4>
                  
                  <p className="mb-3">Combine visualisation with actual physical movement and expression.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Find a posture that physically expresses your new belief</li>
                    <li>Create a simple movement or gesture that embodies this truth</li>
                    <li>Speak your new belief aloud while embodying it physically</li>
                    <li>Dance or move freely in a way that expresses this new way of being</li>
                    <li>Notice how changing your physiology influences your emotional state</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">When Visualisation Feels Challenging</h3>
              
              <p className="mb-4">If you encounter difficulties with visualisation, you're not alone. Many trauma survivors find visualisation challenging for various reasons. Here are some common challenges and adaptations:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Difficulty Visualizing Images</h4>
                  <p className="text-sm">Some people don't naturally think in pictures or may find visualisation triggers dissociation.</p>
                  <p className="text-sm mt-2 italic"><strong>Adaptation:</strong> Focus on body sensations, emotions, or even concepts rather than visual images. The felt sense of the belief is more important than seeing clear pictures.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Persistent Intrusive Images</h4>
                  <p className="text-sm">Traumatic imagery may intrude when you try to visualize positive scenarios.</p>
                  <p className="text-sm mt-2 italic"><strong>Adaptation:</strong> Acknowledge these images without judgment, then gently redirect your focus. You might imagine placing intrusive images in a container or turning down their intensity before returning to your practise.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Physical Discomfort</h4>
                  <p className="text-sm">Embodying new beliefs may bring up physical discomfort as your system adjusts.</p>
                  <p className="text-sm mt-2 italic"><strong>Adaptation:</strong> Start with brief practices and build duration gradually. Include grounding elements like feeling your feet on the floor throughout the practise.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Emotional Resistance</h4>
                  <p className="text-sm">You might experience fear, grief, or anger when shifting beliefs that have long protected you.</p>
                  <p className="text-sm mt-2 italic"><strong>Adaptation:</strong> Honour these emotions as natural parts of the change process. Include acknowledgment of your old belief's protective function in your practise.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate embodiment visualisation into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Listen to the guided embodiment visualisation 3-4 times this week</li>
                  <li>Practice using your somatic anchor throughout the day</li>
                  <li>Notice opportunities to embody your new belief in daily situations</li>
                  <li>Journal about how your experience changes as you embody your new belief</li>
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
        
        
      case 30:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">BUILDING YOUR COMMUNITY</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Healing doesn't happen in isolation. Building a supportive community around you is essential for maintaining your progress and continuing to grow. Your community might include friends, family, therapy groups, online communities, or new connections you make along your healing journey.</p>
              
              <p className="mb-4">The people in your healing community don't all need to understand trauma or be on their own healing paths, but they should be able to offer consistent support, respect your boundaries, and celebrate your growth.</p>
              
              <p className="mb-3">A strong healing community provides:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Safe spaces to share your experiences and feelings</li>
                <li>Encouragement during difficult times</li>
                <li>Accountability for your healing practices</li>
                <li>Celebration of your progress and milestones</li>
                <li>Different perspectives and wisdom</li>
              </ul>
              
              <p className="font-medium italic">Remember: you deserve relationships that support your wellbeing and growth.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Types of Community Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Professional Support</h4>
                  <p className="mb-3">Trained professionals who can provide specialised guidance.</p>
                  <ul className="space-y-1 text-sm pl-4 list-disc">
                    <li>Therapists and counsellors</li>
                    <li>Support group facilitators</li>
                    <li>Trauma-informed coaches</li>
                    <li>Medical professionals</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Peer Support</h4>
                  <p className="mb-3">Others who understand your experience firsthand.</p>
                  <ul className="space-y-1 text-sm pl-4 list-disc">
                    <li>Support groups</li>
                    <li>Online communities</li>
                    <li>Healing partnerships</li>
                    <li>Trauma survivor networks</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Personal Relationships</h4>
                  <p className="mb-3">Trusted friends and family who support your journey.</p>
                  <ul className="space-y-1 text-sm pl-4 list-disc">
                    <li>Understanding friends</li>
                    <li>Supportive family members</li>
                    <li>Chosen family</li>
                    <li>Mentors and guides</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Community Resources</h4>
                  <p className="mb-3">Organisations and groups that provide ongoing support.</p>
                  <ul className="space-y-1 text-sm pl-4 list-disc">
                    <li>Community centres</li>
                    <li>Spiritual communities</li>
                    <li>Hobby or interest groups</li>
                    <li>Volunteer organisations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Building Your Support Network</h3>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Action Steps</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Identify one person you trust who supports your healing journey</li>
                  <li>Consider joining a support group or online community</li>
                  <li>Explore local resources for trauma survivors</li>
                  <li>Practice setting boundaries with unsupportive relationships</li>
                  <li>Celebrate your progress with someone who cares about you</li>
                </ul>
              </div>
              
              <div className="flex justify-between items-centre">
                <h4 className="font-medium">Your Commitment:</h4>
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  I Commit to Building My Community
                </button>
              </div>
            </div>
          </div>
        );

        case 31:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">INTEGRATION MEDITATION</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">This guided meditation is designed to help you connect with your inner strength and resilience. Through a combination of breathwork, visualisation, and gentle self-compassion practices, this meditation will guide you toward a deeper sense of empowerment.</p>
              
              <p className="mb-4">As you listen, allow yourself to be fully present with the experience. There's no right or wrong way to meditate—simply observe whatever arises with curiosity and kindness toward yourself.</p>
              
              <p className="mb-3">Regular practise of this meditation can help you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Develop a stronger connection to your inherent inner wisdom</li>
                <li>Cultivate resilience in the face of challenges</li>
                <li>Access a sense of groundedness during difficult moments</li>
                <li>Reconnect with your authentic self and core values</li>
              </ul>
              
              <p className="font-medium italic">For the deepest benefit, try to practise this meditation in a quiet space where you won't be disturbed for the duration of the recording.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Guided Meditation</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col items-centre">
                  <div className="w-full max-w-2xl bg-gray-100 rounded-lg p-8 flex flex-col items-centre">
                    <div className="mb-6 text-centre">
                      <h4 className="font-medium text-lg mb-2">Empowerment Meditation</h4>
                      <p className="text-gray-600 text-sm">Duration: Approx. 15-20 minutes</p>
                    </div>
                    
                    {/* Audio player will be inserted here */}
                    <div className="w-full mb-6 bg-white p-4 rounded-md border border-gray-300 flex flex-col items-centre">
                      <p className="text-gray-500 mb-3">Audio file will be uploaded here</p>
                      <div className="w-full h-24 flex items-centre justify-centre border-2 border-dashed border-gray-300 rounded-md">
                        <div className="text-centre">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-500">Upload meditation audio file</p>
                          <p className="mt-1 text-xs text-gray-400">(MP3 or MP4 format recommended)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-centre">
                      <p className="text-sm text-gray-600 mb-2">Having trouble with the audio?</p>
                      <button className="text-[#bd6334] hover:text-[#a85629] text-sm font-medium">Download the meditation</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Creating Personalised Affirmations</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">In this exercise, you'll develop personalised affirmations that address your specific healing needs and resonate with your authentic experience.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Identify Areas for Healing</h4>
                  <p className="mb-2">Select 2-3 areas where you'd like to nurture more supportive beliefs:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Safety and security</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Self-worth and self-compassion</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Trust and relationships</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Agency and empowerment</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Boundaries and self-protection</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Body connection and acceptance</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Grief and emotional processing</span>
                    </div>
                    <div className="flex items-centre">
                      <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                      <span>Other: </span>
                      <input type="text" className="ml-2 p-1 border border-gray-300 rounded-md text-sm" placeholder="Specify area..." />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Draft Initial Affirmations</h4>
                  <p className="mb-2">For each area you selected, write an affirmation that feels both meaningful and somewhat believable:</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Area 1:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My affirmation for this area is..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Area 2:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My affirmation for this area is..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Area 3 (optional):</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My affirmation for this area is..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Refine for Resonance</h4>
                  <p className="mb-2">For each affirmation, check in with your body as you say it. Does it feel true? If not, how might you modify it to feel more authentic while still supporting healing?</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Refined Affirmation 1:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My refined affirmation is..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Refined Affirmation 2:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My refined affirmation is..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Refined Affirmation 3 (optional):</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="My refined affirmation is..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 4: Add Embodiment</h4>
                  <p className="mb-2">For each affirmation, add a physical gesture, breath pattern, or sensory element that helps anchor it in your body:</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Embodied Element for Affirmation 1:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="I will embody this affirmation by... (e.g., placing a hand on my heart, taking a deep breath, etc.)"
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Embodied Element for Affirmation 2:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="I will embody this affirmation by..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Embodied Element for Affirmation 3 (optional):</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="I will embody this affirmation by..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Affirmations
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Sample Affirmations for Trauma Healing</h3>
              
              <p className="mb-4">Here are examples of trauma-informed affirmations for different healing needs. Use these as inspiration for creating your own personalised statements:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Safety & Security</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"In this moment, I can notice signs of safety around me."</li>
                    <li>"My awareness of danger served me well. Now I can also develop awareness of safety."</li>
                    <li>"I am learning to create security within myself, one breath at a time."</li>
                    <li>"My body is gradually remembering how to feel safe."</li>
                    <li>"I have resources now that I didn't have then."</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Self-Worth & Compassion</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"I am worthy of care and kindness, including from myself."</li>
                    <li>"My worth is inherent and not dependent on what happened to me."</li>
                    <li>"I am learning to speak to myself with the compassion I would offer a dear friend."</li>
                    <li>"My imperfections make me human, not unworthy."</li>
                    <li>"I honour both my wounds and my capacity to heal."</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Trust & Relationships</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"I can trust my ability to discern who is worthy of my trust."</li>
                    <li>"With each step, I'm learning what healthy connection feels like."</li>
                    <li>"I can be authentic and maintain my boundaries at the same time."</li>
                    <li>"Some people are trustworthy, and I am developing the wisdom to recognise them."</li>
                    <li>"I deserve relationships that honour my wholeness."</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Agency & Empowerment</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"I have choices now that I didn't have then."</li>
                    <li>"Each day, I reclaim more of my personal power."</li>
                    <li>"My voice matters, and I am learning to use it."</li>
                    <li>"I am the author of my story moving forward."</li>
                    <li>"I can influence how I respond to my experiences."</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Body Connection</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"My body carried me through difficult times, and I honour its wisdom."</li>
                    <li>"I am learning to listen to my body's signals with curiosity rather than fear."</li>
                    <li>"I can be present with sensations without being overwhelmed by them."</li>
                    <li>"My body deserves care and respect, including from me."</li>
                    <li>"Each day, I reconnect with my body a little more."</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">For Emotional Processing</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"My feelings are messengers, not threats."</li>
                    <li>"I can feel my emotions without being defined by them."</li>
                    <li>"I create space for all my feelings, knowing they will flow through me."</li>
                    <li>"Difficult emotions are part of healing, not evidence of failure."</li>
                    <li>"I am expanding my capacity to be with all my emotions."</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Effective Affirmation Practices</h3>
              
              <p className="mb-4">To make affirmations truly effective for trauma healing, consider these practise approaches:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Morning and Evening Bookends</h4>
                  <p className="text-sm">Practice your affirmations first thing in the morning and last thing before sleep, when your mind is more receptive to suggestion. Keep your written affirmations by your bedside as a reminder.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Mirror Work</h4>
                  <p className="text-sm">Say your affirmations whilst looking into your own eyes in a mirror. This creates a powerful self-connection and may bring up emotions that need processing. Start with just a few seconds if it feels too intense.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Written Repetition</h4>
                  <p className="text-sm">Hand-write your affirmations multiple times, allowing yourself to feel the words as you write them. This engages different neural pathways than speaking or thinking them.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Voice Recording</h4>
                  <p className="text-sm">Record yourself speaking your affirmations slowly and compassionately. Listen to the recording during activities like commuting, exercising, or household chores.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Environmental Reminders</h4>
                  <p className="text-sm">Place sticky notes with your affirmations in places you'll see throughout the day—bathroom mirror, computer monitor, car dashboard, or phone lockscreen.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Trigger Response Pairing</h4>
                  <p className="text-sm">Identify specific triggers or challenging situations, and create specific affirmations to use when they arise. Practice these proactively so they're available when needed.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To integrate affirmations into your healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Creating Personalised Affirmations" exercise</li>
                  <li>Practice your affirmations with their embodied elements each morning and evening</li>
                  <li>Place written affirmations in at least two locations you'll see daily</li>
                  <li>Notice any resistance that arises and approach it with curiosity rather than judgment</li>
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

        case 32:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">EMOTIONAL ENERGY & HOW THE BODY STORES PAIN</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Emotions are not merely psychological experiences—they are energetic phenomena that have physical components in our bodies. When we don't process emotional energy fully, it doesn't simply disappear but instead becomes stored within our physical form, often manifesting as tension, pain, or dysfunction.</p>
              
              <p className="mb-4">For decades, researchers and clinicians have observed the connection between emotional experiences and physical symptoms. From the pioneering work of trauma researchers to modern neuroscience, evidence consistently shows that our bodies become repositories for unprocessed emotional experiences.</p>
              
              <p className="mb-3">Understanding how emotional energy is stored in the body provides valuable insights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>The origin of persistent physical symptoms that lack clear medical explanation</li>
                <li>Why certain emotions trigger specific physical sensations</li>
                <li>How traumatic memories become encoded in bodily sensations</li>
                <li>Why release work often requires both somatic and emotional approaches</li>
              </ul>
              
              <p className="font-medium italic">In this lesson, we'll explore how emotions become physically stored and map the common patterns of emotional holding in the body.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Body's Emotional Storage System</h3>
              
              <p className="mb-4">Our bodies store emotional information in specific ways. Understanding these patterns can help you locate and release stored emotional energy:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Muscle Memory</h4>
                  <p className="text-sm">Muscles contract in response to emotion and can maintain these patterns long-term:</p>
                  <ul className="list-disc pl-5 pt-2 text-sm space-y-1">
                    <li>Jaw tension often relates to unexpressed anger or words held back</li>
                    <li>Shoulder and neck tension commonly stores anxiety and responsibility</li>
                    <li>Chest tightness frequently holds grief and unexpressed sadness</li>
                    <li>Lower back pain can relate to feeling unsupported or financial stress</li>
                  </ul>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Fascia and Connective Tissue</h4>
                  <p className="text-sm">The web of tissue that surrounds muscles and organs holds emotional patterns:</p>
                  <ul className="list-disc pl-5 pt-2 text-sm space-y-1">
                    <li>Stores long-term emotional patterns and memories</li>
                    <li>Creates restrictions that limit movement and energy flow</li>
                    <li>Responds to both physical and emotional trauma</li>
                    <li>Can release stored emotion through targeted bodywork</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Emotional Body Mapping</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">This exercise helps you identify where your body might be storing emotional energy through gentle awareness and inquiry.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Part 1: Body Tension Scan</h4>
                  <p className="mb-2">For each statement, rate how true it is for you on a scale from 0 (not at all true) to 5 (very true):</p>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <p className="mb-2">1. I find it difficult to say "no" when someone asks for my time or help.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q1" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">2. I tend to share personal information very quickly when meeting new people.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q2" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">3. I often feel responsible for other people's feelings and problems.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q3" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">4. I keep most people at a distance and rarely let others get close.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q4" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">5. I find it difficult to ask for help or support when I need it.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q5" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">6. I often feel resentful about how much I do for others compared to what I receive.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q6" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">7. I tend to abandon my own plans or needs when someone else has a request.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q7" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">8. I have strong opinions about what others should or shouldn't do.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q8" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">9. I find it difficult to be around people who express strong emotions.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q9" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="mb-2">10. I tend to avoid conflict, even when something important is at stake.</p>
                      <div className="flex space-x-4">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="flex items-centre">
                            <input type="radio" name="q10" value={num} className="mr-1 accent-[#bd6334]" />
                            <label>{num}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Part 2: Boundary Patterns in Different Contexts</h4>
                  <p className="mb-2">Consider how your boundaries vary across different relationships and situations:</p>
                  
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
                  <h4 className="font-medium mb-3">Part 3: Understanding Your Patterns</h4>
                  <p className="mb-2">Based on your responses above, reflect on your overall boundary patterns:</p>
                  
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
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Assessment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Boundary Patterns After Trauma</h3>
              
              <p className="mb-4">These patterns represent common adaptations to trauma. You might recognise yourself primarily in one pattern or see elements of several, depending on your experiences and context:</p>
              
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
                <p className="italic">Remember that these patterns developed for good reasons. They were adaptations that helped you survive difficult circumstances. Acknowledging them with compassion rather than judgment creates space for growth and change.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Somatic Signatures of Boundary Challenges</h3>
              
              <p className="mb-4">Your body often gives you important information about your boundaries through physical sensations. Learning to recognise these somatic cues can help you identify when your boundaries are being crossed:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Throat and Voice</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Tightening or constriction in the throat</li>
                    <li>Voice becoming softer, higher, or shaky</li>
                    <li>Difficulty speaking up or forming words</li>
                    <li>Feeling like something is stuck in your throat</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">These sensations often signal difficulty expressing boundaries verbally.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Chest and Heart</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Tightness or heaviness in the chest</li>
                    <li>Shallow or restricted breathing</li>
                    <li>Racing heart or palpitations</li>
                    <li>Feeling of pressure or anxiety in the heart area</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">These sensations often relate to emotional boundaries and feeling safe in connection.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Gut and Stomach</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>"Pit in the stomach" sensation</li>
                    <li>Nausea or queasiness</li>
                    <li>Butterflies or knots in the abdomen</li>
                    <li>Digestive discomfort or "gut feelings"</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">The gut often registers boundary violations before the conscious mind recognises them.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Limbs and Extremities</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Restlessness or fidgeting</li>
                    <li>Feeling frozen or unable to move</li>
                    <li>Tingling or numbness in hands/feet</li>
                    <li>Strong urge to physically leave</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">These sensations often relate to the fight/flight/freeze responses activated by boundary issues.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Face and Head</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Tension in jaw or facial muscles</li>
                    <li>Headache or pressure in the head</li>
                    <li>Difficulty maintaining eye contact</li>
                    <li>Flushing or heat in the face</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">These sensations often signal social discomfort related to boundary setting.</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Overall Energy</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Sudden fatigue or energy drain</li>
                    <li>Feeling spacey or dissociated</li>
                    <li>Sense of heaviness or lightness</li>
                    <li>Feeling "off" or "not right"</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">These sensations reflect how boundary issues affect your overall energetic state.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To deepen your awareness of your boundary patterns:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Boundary Pattern Assessment" exercise</li>
                  <li>Each day, notice at least one situation where your boundaries feel comfortable and one where they feel challenged</li>
                  <li>Practice tuning into your body's signals when in different relationships and contexts</li>
                  <li>Reflect on how your boundary patterns have served as adaptations to your circumstances</li>
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
        
      case 33:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">RELEASE AS A PATH TO FREEDOM AND WHOLENESS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">When we hold onto suppressed emotions, we limit our capacity for authentic living. The process of emotional release isn't simply about letting go of what doesn't serve us—it's about creating space for greater freedom, wholeness, and vitality in our lives.</p>
              
              <p className="mb-4">Release work is both a physical and psychological process. As you practise allowing emotions to move through you rather than remain stored in your body, you'll discover that emotions are meant to be in motion—they are "energy in motion"—not static states that define you or remain permanently lodged in your physical form.</p>
              
              <p className="mb-3">Embracing emotional release as a practise offers profound benefits:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Increased emotional resilience and adaptability</li>
                <li>Greater access to your authentic self and intuitive wisdom</li>
                <li>More energy available for creativity and meaningful pursuits</li>
                <li>Deeper capacity for genuine connection with others</li>
              </ul>
              
              <p className="font-medium italic">In this lesson, we'll explore how emotional release creates the foundation for greater freedom and wholeness, and how to approach this process with safety and intention.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Boundary-Setting Process</h3>
              
              <p className="mb-4">Setting and maintaining boundaries involves several distinct skills working together:</p>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6d5c1]"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">1</div>
                  <h4 className="font-medium mb-2">Recognition</h4>
                  <p className="text-sm">Identifying when a boundary is needed by tuning into your body sensations, emotions, and thoughts.</p>
                  <p className="text-sm italic mt-2">Key question: <span className="font-medium">"What am I feeling right now, and what is this telling me about my boundaries?"</span></p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">2</div>
                  <h4 className="font-medium mb-2">Clarification</h4>
                  <p className="text-sm">Getting clear about what specific boundary you need to set and why it matters to you.</p>
                  <p className="text-sm italic mt-2">Key question: <span className="font-medium">"What exactly do I need in this situation, and why is this important for my wellbeing?"</span></p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">3</div>
                  <h4 className="font-medium mb-2">Communication</h4>
                  <p className="text-sm">Expressing your boundary clearly, directly, and respectfully to the relevant person(s).</p>
                  <p className="text-sm italic mt-2">Key question: <span className="font-medium">"How can I communicate this boundary clearly and respectfully?"</span></p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">4</div>
                  <h4 className="font-medium mb-2">Consequence Consideration</h4>
                  <p className="text-sm">Determining what action you'll take if your boundary isn't respected.</p>
                  <p className="text-sm italic mt-2">Key question: <span className="font-medium">"If this boundary is crossed, what will I do to protect myself?"</span></p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">5</div>
                  <h4 className="font-medium mb-2">Consistent Maintenance</h4>
                  <p className="text-sm">Following through with appropriate responses when boundaries are tested or crossed.</p>
                  <p className="text-sm italic mt-2">Key question: <span className="font-medium">"How can I consistently honour this boundary, even when it's difficult?"</span></p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Boundary Communication Formula</h3>
              
              <p className="mb-4">When communicating boundaries, this basic formula can help you express yourself clearly and effectively:</p>
              
              <div className="bg-[#f8f0e6] p-6 rounded-lg mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Observation</h4>
                    <p className="mb-2">State the specific situation or behaviour without judgment or blame.</p>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm italic">"When you call me after 10pm..."</p>
                      <p className="text-sm italic">"When conversations turn to politics at family gatherings..."</p>
                      <p className="text-sm italic">"When someone comments on my body or appearance..."</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">2. Feeling/Impact</h4>
                    <p className="mb-2">Express how the situation affects you emotionally or practically.</p>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm italic">"...I feel anxious because it disrupts my sleep routine."</p>
                      <p className="text-sm italic">"...I feel tense and uncomfortable."</p>
                      <p className="text-sm italic">"...it makes me feel self-conscious and objectified."</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">3. Request/Boundary</h4>
                    <p className="mb-2">Clearly state what you need or what boundary you're setting.</p>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm italic">"I need to keep my evenings after 10pm phone-free. I'm happy to talk earlier in the day."</p>
                      <p className="text-sm italic">"I'd like to keep our family gatherings politics-free and focus on connecting in other ways."</p>
                      <p className="text-sm italic">"I don't want comments about my body or appearance, regardless of whether they're meant as compliments."</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">4. Consequence (when needed)</h4>
                    <p className="mb-2">State what will happen if the boundary isn't respected. This isn't a threat, but information about how you'll protect yourself.</p>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm italic">"If you call after 10pm, I won't answer and will return your call the next day."</p>
                      <p className="text-sm italic">"If the conversation turns political, I'll excuse myself until the topic changes."</p>
                      <p className="text-sm italic">"If comments about my appearance continue, I'll need to limit our interactions."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Boundary Communication Tips</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><span className="font-medium">Use "I" statements</span> that focus on your experience rather than accusing or blaming others</li>
                    <li><span className="font-medium">Be direct and specific</span> about what you need, avoiding vague hints or expectations that others should "just know"</li>
                    <li><span className="font-medium">Keep it simple</span> without over-explaining or apologising excessively for having needs</li>
                    <li><span className="font-medium">Remain calm but firm</span> in your tone, which communicates that your boundary is non-negotiable</li>
                    <li><span className="font-medium">Focus on the present and future</span> rather than rehashing past violations</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">When Someone Pushes Back</h4>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li><span className="font-medium">Expect resistance</span> as a normal response, especially if your boundaries are new</li>
                    <li><span className="font-medium">Use the broken record technique</span> by calmly restating your boundary without getting drawn into debates</li>
                    <li><span className="font-medium">Acknowledge their feelings</span> without taking responsibility for them or changing your boundary</li>
                    <li><span className="font-medium">Offer alternatives when possible</span> to show goodwill while maintaining your limits</li>
                    <li><span className="font-medium">Exit the conversation if needed</span> if it becomes disrespectful or manipulative</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Types of Boundary Responses</h3>
              
              <p className="mb-4">Different situations call for different types of boundary responses. Developing flexibility in how you respond is key to effective boundary management:</p>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#f8f0e6]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Response Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">When to Use</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Example</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Direct Statement</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">For clear communication in important relationships with reasonable people</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I'm not comfortable discussing my dating life. Let's talk about something else."</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Offering Choices</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">When you want to maintain the relationship while still upholding your boundary</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I can't help with that project now, but I could either look at it next week or suggest someone else who might help."</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Simple "No"</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">For clear refusals that don't require explanation, especially with people who debate boundaries</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"No, I won't be able to do that."</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Deferral</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">When you need time to consider or aren't ready to respond immediately</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I need to think about that. I'll let you know by Friday."</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Physical Distance</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">When verbal boundaries aren't working or in potentially unsafe situations</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">Stepping back, leaving the room, or creating physical space</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Limited Contact</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">For relationships that consistently violate boundaries but can't be completely avoided</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">Limiting interactions to specific contexts, durations, or topics</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">No Contact</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">For toxic or abusive relationships where other boundaries consistently fail</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">Ending contact completely, often without announcing it (which can provoke escalation)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Connection Between Boundaries and Values</h3>
              
              <p className="mb-4">Boundaries aren't just about saying "no"—they're expressions of your core values and what matters most to you. Connecting your boundaries to your values helps them feel more meaningful and easier to maintain:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Self-Respect</h4>
                  <p className="text-sm">Boundaries that honour your worth and dignity.</p>
                  <p className="text-sm mt-2 italic">"I don't accept disrespectful language because I value being treated with basic respect."</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Authenticity</h4>
                  <p className="text-sm">Boundaries that allow you to be true to yourself and your needs.</p>
                  <p className="text-sm mt-2 italic">"I decline invitations that don't align with my interests because I value authentic engagement over people-pleasing."</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Wellbeing</h4>
                  <p className="text-sm">Boundaries that protect your physical, emotional, and mental health.</p>
                  <p className="text-sm mt-2 italic">"I limit my working hours because I value my health and the quality of my life outside work."</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Meaningful Connection</h4>
                  <p className="text-sm">Boundaries that create space for genuine relationships to develop.</p>
                  <p className="text-sm mt-2 italic">"I share personal information gradually because I value building trust and depth in relationships over time."</p>
                </div>
              </div>
              
              <p className="mt-6 italic">When you connect your boundaries to your values, saying "no" to boundary violations becomes saying "yes" to what truly matters to you.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Boundary Considerations for Trauma Survivors</h3>
              
              <p className="mb-4">As you work on developing healthier boundaries, consider these trauma-informed approaches:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Start with Safety</h4>
                  
                  <p className="mb-3">Begin by strengthening boundaries in areas where you feel most safe and with people who are most supportive.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Practice with lower-stakes situations first</li>
                    <li>Build confidence before tackling more challenging relationships</li>
                    <li>Notice and celebrate small successes</li>
                    <li>Create a safety plan for situations that feel risky</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Expect Mixed Feelings</h4>
                  
                  <p className="mb-3">Setting boundaries often triggers complex emotions for trauma survivors.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Guilt, anxiety, and fear are normal responses</li>
                    <li>Physical discomfort may arise as you assert yourself</li>
                    <li>Old survival responses might activate temporarily</li>
                    <li>These reactions typically decrease with practise</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Use Support Systems</h4>
                  
                  <p className="mb-3">Don't navigate boundary challenges alone if possible.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Role-play difficult conversations with trusted friends</li>
                    <li>Process feelings with a therapist or support group</li>
                    <li>Have supporters check in after challenging boundary situations</li>
                    <li>Learn from others' boundary experiences</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Titrate the Process</h4>
                  
                  <p className="mb-3">Move at a pace that allows your nervous system to adjust.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Take small, manageable steps rather than dramatic changes</li>
                    <li>Allow time to integrate each new boundary practise</li>
                    <li>Balance boundary work with resourcing and self-care</li>
                    <li>Adjust your approach based on what you learn</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To develop your boundary-setting skills:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Identify one "low-risk" boundary you'd like to establish this week</li>
                  <li>Practice the boundary communication formula, writing out what you might say</li>
                  <li>Set this boundary with at least one person before the next session</li>
                  <li>Notice and journal about your emotional and physical responses to this process</li>
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
        
      case 34:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">WRITING TO RELEASE</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Writing is one of the most powerful and accessible tools for emotional release. When we put pen to paper (or fingers to keyboard) with the intention of expressing our unprocessed emotions, we create a container for them to safely move from inside us onto the external page.</p>
              
              <p className="mb-4">Writing allows us to process emotions at our own pace, without the self-consciousness or time pressure that might occur in interpersonal exchanges. It creates a bridge between our internal world and external expression, helping us make sense of feelings that might otherwise remain tangled or overwhelming.</p>
              
              <p className="mb-3">Writing as a release practise offers several benefits:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Creates emotional distance and perspective on difficult experiences</li>
                <li>Provides a safe container for expressing emotions without judgment</li>
                <li>Helps identify patterns and insights that might not be immediately apparent</li>
                <li>Reduces the physical burden of emotional suppression</li>
              </ul>
              
              <p className="font-medium italic">In this lesson, we'll explore several writing approaches specifically designed to help release stored emotions and transform your relationship with them.</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Compassionate Boundary Scripts</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">In this exercise, you'll develop personalised scripts for communicating boundaries in challenging situations, incorporating both clarity and compassion.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Identify Boundary Situations</h4>
                  <p className="mb-2">Select 2-3 real situations where you need to communicate a boundary:</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Situation 1:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Describe a specific situation where you need to set a boundary. Include who is involved and what specifically is happening..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Situation 2:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Describe another boundary situation..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Situation 3 (optional):</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Describe a third boundary situation if you wish..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 2: Clarify Your Boundary Needs</h4>
                  <p className="mb-2">For each situation, get clear about what boundary you need to set:</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Boundary for Situation 1:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="What specific boundary do you need to establish? What are you saying yes to and no to?"
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Boundary for Situation 2:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="What specific boundary do you need to establish?"
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Boundary for Situation 3 (optional):</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={2}
                        placeholder="What specific boundary do you need to establish?"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Step 3: Create Compassionate Scripts</h4>
                  <p className="mb-2">For each situation, develop a script that communicates your boundary with both clarity and compassion:</p>
                  
                  <div className="space-y-5 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium mb-3">Script for Situation 1:</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Acknowledge their perspective/needs:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you show that you understand and respect their position? (e.g., 'I understand this project is important to you...')"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">State your boundary clearly:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Express your boundary directly but respectfully (e.g., 'I need to keep my weekends free for family time...')"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Offer an alternative (if applicable):</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Is there something you can offer instead? (e.g., 'I can help you during work hours on Friday...')"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Express appreciation:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you acknowledge the relationship? (e.g., 'I value our working relationship and want to be clear about what I can commit to...')"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium mb-3">Script for Situation 2:</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Acknowledge their perspective/needs:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you show that you understand and respect their position?"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">State your boundary clearly:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Express your boundary directly but respectfully"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Offer an alternative (if applicable):</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Is there something you can offer instead?"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Express appreciation:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you acknowledge the relationship?"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-medium mb-3">Script for Situation 3 (optional):</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Acknowledge their perspective/needs:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you show that you understand and respect their position?"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">State your boundary clearly:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Express your boundary directly but respectfully"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Offer an alternative (if applicable):</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="Is there something you can offer instead?"
                          ></textarea>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Express appreciation:</p>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={2}
                            placeholder="How can you acknowledge the relationship?"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Scripts
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Elements of Compassionate Boundary Communication</h3>
              
              <p className="mb-4">Compassionate boundary communication incorporates these key elements:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Self-Compassion First</h4>
                  <p className="mb-3">Approaching boundary-setting with kindness toward yourself and your needs.</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-red-500 mb-1">Less compassionate:</p>
                      <p className="text-sm italic">"I should be able to handle this. I'm being too sensitive."</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-green-600 mb-1">More compassionate:</p>
                      <p className="text-sm italic">"My discomfort is valid and it's okay to protect my needs."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Recognition of Others' Humanity</h4>
                  <p className="mb-3">Seeing the other person's needs and feelings without taking responsibility for them.</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-red-500 mb-1">Less compassionate:</p>
                      <p className="text-sm italic">"You're so demanding and inconsiderate of my time."</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-green-600 mb-1">More compassionate:</p>
                      <p className="text-sm italic">"I understand this project is important to you, and I need to maintain my own work-life balance."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Focus on Behaviour, Not Character</h4>
                  <p className="mb-3">Addressing specific actions rather than making global judgments about the person.</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-red-500 mb-1">Less compassionate:</p>
                      <p className="text-sm italic">"You're a control freak who never respects my decisions."</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-green-600 mb-1">More compassionate:</p>
                      <p className="text-sm italic">"When you change plans without checking with me first, I feel my input isn't valued."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Offering Alternatives When Possible</h4>
                  <p className="mb-3">Providing options that respect both your boundaries and others' needs.</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-red-500 mb-1">Less compassionate:</p>
                      <p className="text-sm italic">"I'm not discussing this topic with you. End of story."</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <p className="text-sm font-medium text-green-600 mb-1">More compassionate:</p>
                      <p className="text-sm italic">"I'm not comfortable discussing my finances, but I'm happy to talk about other aspects of the decision."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Handling Common Boundary Challenges</h3>
              
              <p className="mb-4">Even with compassionate communication, you may encounter resistance. Here are strategies for common challenging responses:</p>
              
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">When They Try to Make You Feel Guilty</h4>
                  
                  <div className="mb-3">
                    <p className="italic mb-2">"After all I've done for you, you can't do this one thing for me?"</p>
                    <p className="italic">"I guess I'm just not important to you anymore."</p>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-md">
                    <p className="font-medium mb-2">Compassionate Response Strategy:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Acknowledge their disappointment without taking on guilt</li>
                      <li>Reaffirm your boundary without defensiveness</li>
                      <li>Redirect to the specific issue rather than the relationship as a whole</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-white rounded-md">
                      <p className="text-sm italic">"I understand you're disappointed, and I care about our relationship. My need for [boundary] isn't about how I value you, but about what I need for my wellbeing right now."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">When They Keep Pushing or Questioning</h4>
                  
                  <div className="mb-3">
                    <p className="italic mb-2">"But why? That doesn't make sense."</p>
                    <p className="italic">"You never had a problem with this before. What's really going on?"</p>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-md">
                    <p className="font-medium mb-2">Compassionate Response Strategy:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Use the "broken record" technique, calmly restating your boundary</li>
                      <li>Avoid over-explaining or justifying, which invites debate</li>
                      <li>Acknowledge their confusion without changing your position</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-white rounded-md">
                      <p className="text-sm italic">"I understand this seems different from before, and I've given it careful thought. This is what works for me now, and I appreciate your understanding."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">When They Get Angry or Defensive</h4>
                  
                  <div className="mb-3">
                    <p className="italic mb-2">"You're being ridiculous and selfish!"</p>
                    <p className="italic">"Fine, if that's how you want to be, don't expect anything from me either."</p>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-md">
                    <p className="font-medium mb-2">Compassionate Response Strategy:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Maintain your calm, even if they escalate emotionally</li>
                      <li>Name what's happening in a non-accusatory way</li>
                      <li>Suggest returning to the conversation when emotions cool</li>
                      <li>Disengage if the interaction becomes disrespectful</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-white rounded-md">
                      <p className="text-sm italic">"I can see you're upset, and I don't want this to damage our relationship. Let's take some time to cool down and talk about this later when we're both calmer."</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">When They Ignore Your Boundary</h4>
                  
                  <div className="mb-3">
                    <p className="italic mb-2">*Continues the behaviour you've asked them to stop*</p>
                    <p className="italic">"Oh, I forgot" (repeatedly)</p>
                  </div>
                  
                  <div className="bg-[#f8f0e6] p-4 rounded-md">
                    <p className="font-medium mb-2">Compassionate Response Strategy:</p>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li>Restate your boundary clearly and directly</li>
                      <li>Follow through with a consequence if the boundary continues to be violated</li>
                      <li>Remain matter-of-fact rather than punitive</li>
                      <li>Consider whether this relationship can support your boundaries</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-white rounded-md">
                      <p className="text-sm italic">"I've asked several times that you not comment on my eating habits. Since this continues to happen, I'm going to need to [consequence: leave the room/end the conversation/decline meals together]."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Self-Care During Boundary Conversations</h3>
              
              <p className="mb-4">Setting boundaries can be emotionally taxing, especially for trauma survivors. Here are ways to care for yourself through the process:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Before the Conversation</h4>
                  <ul className="space-y-1 pl-6 list-disc text-sm">
                    <li>Practice your boundary statement so it feels natural</li>
                    <li>Ground yourself with deep breathing or other calming techniques</li>
                    <li>Visualize yourself communicating clearly and confidently</li>
                    <li>Arrange support for after the conversation if needed</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">During the Conversation</h4>
                  <ul className="space-y-1 pl-6 list-disc text-sm">
                    <li>Check in with your body regularly and notice any tension</li>
                    <li>Take pauses to breathe when you feel activation rising</li>
                    <li>Keep your feet grounded on the floor to stay present</li>
                    <li>Remember that the other person's reaction belongs to them, not you</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">After the Conversation</h4>
                  <ul className="space-y-1 pl-6 list-disc text-sm">
                    <li>Acknowledge yourself for taking this step, regardless of the outcome</li>
                    <li>Process any difficult emotions through journaling or talking with a supportive person</li>
                    <li>Engage in physical self-care to release tension (walk, stretch, bathe)</li>
                    <li>Reflect on what you learned and how you might adjust future boundary conversations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To develop your compassionate boundary communication:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Compassionate Boundary Scripts" exercise</li>
                  <li>Practice your script out loud or with a supportive friend</li>
                  <li>Use one of your scripts in a real situation this week</li>
                  <li>Journal about both your internal experience and the other person's response</li>
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
        
      case 35:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">DRAWING YOUR EMOTIONS</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Visual expression offers a powerful pathway for emotional release, especially for feelings that are difficult to articulate in words. When we engage in drawing or other visual arts as a release practise, we access different neural pathways and parts of our brain than verbal processing allows.</p>
              
              <p className="mb-4">This approach is particularly valuable for emotions that feel preverbal, deeply somatic, or too complex to fully capture in language. The visual representation creates a container for emotions while simultaneously allowing them movement and expression.</p>
              
              <p className="mb-3">Drawing as an emotional release practise offers several benefits:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Bypasses analytical thinking that can block emotional processing</li>
                <li>Creates a tangible representation of internal experiences</li>
                <li>Allows expression of complex, layered emotions</li>
                <li>Provides distance and perspective through externalization</li>
              </ul>
              
              <p className="font-medium italic">No artistic skill is required for this practise—the focus is on authentic expression rather than creating something aesthetically pleasing.</p>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="bg-[#f8f0e6] rounded-lg flex items-centre justify-centre">
                <div className="text-centre p-8">
                  <button className="h-16 w-16 bg-[#bd6334] rounded-full flex items-centre justify-centre mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">17-minute guided boundary meditation</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Written Meditation Guide</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">This written guide walks you through the boundary meditation practise. You can use it alongside the audio recording or as a standalone practise:</p>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg mb-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Preparation (1-2 minutes)</h4>
                  <p className="text-sm">Find a comfortable seated position where you can be both relaxed and alert. Place your feet flat on the floor if seated in a chair, or sit cross-legged on a cushion. Allow your spine to be straight but not rigid. Rest your hands comfortably on your thighs or in your lap. Close your eyes or maintain a soft downward gaze.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Grounding & Centring (2-3 minutes)</h4>
                  <p className="text-sm">Begin by taking several deep breaths, allowing your body to release tension with each exhale. Feel the points of contact between your body and the surface beneath you. Sense the weight of your body being supported. Notice the natural rhythm of your breath as it flows in and out. Allow your awareness to rest in the centre of your body, in the area of your heart.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sensing Your Physical Form (3-4 minutes)</h4>
                  <p className="text-sm">Bring your attention to the physical boundary of your body—your skin. Starting from the crown of your head, slowly scan downward, noticing the sensations at the surface of your body. Feel the boundary where your body meets the external world. Notice temperature, texture, pressure, tingling, or any other sensations. Continue this scan all the way down to your feet, taking your time to really feel the physical container of your body.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Exploring Your Energetic Boundary (3-4 minutes)</h4>
                  <p className="text-sm">Now imagine that surrounding your physical body is an energetic boundary or field—like a bubble or cocoon of light that extends a few inches beyond your skin. This represents your personal space. With your attention, begin to explore the qualities of this boundary. Is it thick or thin? Rigid or flexible? Close to your body or extended outward? Consistent all around or variable in different areas? There are no right or wrong qualities—simply notice what's present for you right now.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Strengthening Your Boundary (3-4 minutes)</h4>
                  <p className="text-sm">If it feels right, imagine adjusting your energetic boundary to better serve your needs. You might visualize it becoming more defined, perhaps glowing with a colour that represents safety and strength for you. With each inhale, imagine drawing in energy that reinforces this boundary. With each exhale, release any tension within the boundary. Allow it to be both strong and flexible—able to protect you while still permitting connection.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Practicing Permeability (3-4 minutes)</h4>
                  <p className="text-sm">Now imagine that your boundary has mindful permeability—it can let in what serves you and keep out what doesn't. Picture something positive approaching your boundary—perhaps love, support, or understanding. Notice how your boundary naturally opens to welcome this in. Next, imagine something that doesn't serve you approaching—perhaps criticism, demands, or intrusive energy. Notice how your boundary naturally becomes more solid, protecting your inner space. Practice this opening and closing several times, trusting your body's wisdom.</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Closing Integration (1-2 minutes)</h4>
                  <p className="text-sm">Take a few moments to appreciate the wisdom of your body and its natural capacity for healthy boundaries. Know that this energetic boundary is always available to you, even when you're not consciously focusing on it. When you're ready, gently wiggle your fingers and toes, take a deeper breath, and slowly open your eyes, carrying this sense of healthy containment with you as you return to your day.</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Your Meditation Experience</h4>
                <p className="text-sm mb-2">After completing the meditation, reflect on your experience:</p>
                
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md mb-3"
                  rows={4}
                  placeholder="What did you notice about your current boundary? Were there particular areas that felt stronger or more vulnerable? What sensations arose in your body during the practise? How might you incorporate aspects of this meditation into daily life?"
                ></textarea>
                
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Save Reflection
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Boundary Visualizations for Different Contexts</h3>
              
              <p className="mb-4">Beyond the basic meditation, these specialised visualizations can help with specific boundary challenges:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Protective Shield for Difficult Interactions</h4>
                  
                  <p className="mb-3">This visualisation helps prepare for challenging social situations.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Before entering the situation, pause and ground yourself</li>
                    <li>Visualize a protective shield or bubble surrounding you</li>
                    <li>Infuse this shield with qualities you need (strength, clarity, calm)</li>
                    <li>Imagine negative energy bouncing off this shield</li>
                    <li>Set an intention for how you'll maintain your boundaries</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Energetic Cleansing for Empaths</h4>
                  
                  <p className="mb-3">This practise helps those who easily absorb others' emotions.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>After absorbing others' energy, find a quiet moment</li>
                    <li>Scan your body for areas holding foreign energy</li>
                    <li>Visualize this energy as a colour or texture different from your own</li>
                    <li>With each exhale, imagine releasing this energy back to the universe</li>
                    <li>Fill the cleared space with your own revitalizing energy</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Mindful Permeability Practice</h4>
                  
                  <p className="mb-3">This visualisation helps you develop selective boundaries.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Imagine your boundary as a semi-permeable membrane</li>
                    <li>Picture yourself at the centre, as the decision-maker</li>
                    <li>Visualize different influences approaching your boundary</li>
                    <li>Consciously decide what to allow in and what to keep out</li>
                    <li>Practice opening and closing your boundary intentionally</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Inner Sanctuary Visualisation</h4>
                  
                  <p className="mb-3">This practise creates internal boundaries for emotional regulation.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Visualize a sacred inner space within you</li>
                    <li>Design this space with elements that feel safe and nurturing</li>
                    <li>Create a clear boundary around this sanctuary</li>
                    <li>Practice retreating here when feeling overwhelmed</li>
                    <li>From this protected space, decide how to respond to external demands</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Integrating Boundary Awareness into Daily Life</h3>
              
              <p className="mb-4">Beyond formal meditation practise, you can cultivate boundary awareness throughout your day:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Boundary Check-Ins</h4>
                  <p className="text-sm">Set regular times during your day to pause and notice your boundary state. You might use transitions (entering a new space, starting a meeting, etc.) as reminders to check: How does my boundary feel right now? Do I need more protection or more openness in this situation?</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Boundary Breaths</h4>
                  <p className="text-sm">When you feel your boundary being challenged or crossed, take three conscious breaths. Inhale strength and clarity, exhale tension and confusion. With each breath, reconnect with your felt sense of appropriate boundaries.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Body Signals Awareness</h4>
                  <p className="text-sm">Practice noticing the subtle body signals that indicate boundary issues—tension in your shoulders, tightness in your throat, discomfort in your gut. The sooner you can recognise these signals, the more effectively you can respond.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Grounding Moments</h4>
                  <p className="text-sm">Throughout your day, take brief moments to feel your feet on the ground and your body in space. This simple practise helps maintain your sense of self and embodied presence, which strengthens natural boundary awareness.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To develop your embodied boundary awareness:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Listen to the boundary meditation recording at least 3 times this week</li>
                  <li>Practice one of the specialised visualizations before a challenging situation</li>
                  <li>Set a timer for 3 boundary check-ins throughout each day</li>
                  <li>Notice and journal about how meditation affects your real-life boundary experiences</li>
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

      case 36:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">BREATHWORK FOR EMOTIONAL CLEARING</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Your breath is one of the most powerful tools available for emotional release and clearing. Conscious breathing practices create direct access to your autonomic nervous system, allowing you to release stored tension patterns and facilitate the movement of stuck emotional energy.</p>
              
              <p className="mb-4">Breathwork offers a unique advantage for emotional release because it works directly with your physiology. When emotions are suppressed, our breathing patterns often become restricted as part of containing those feelings. By changing how we breathe, we can reverse this process and create space for emotional energy to move and release.</p>
              
              <p className="mb-3">Breathwork for emotional clearing offers several benefits:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Activates the parasympathetic nervous system for deeper relaxation</li>
                <li>Increases energy flow to areas of physical/emotional holding</li>
                <li>Creates a safe container for emotional release without needing to narrate</li>
                <li>Reduces the physical burden of emotional suppression</li>
              </ul>
              
              <p className="font-medium italic">In this lesson, we'll explore breathwork techniques specifically designed for emotional clearing, with guidance on how to practise safely and effectively.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Neuroscience of Relational Healing</h3>
              
              <p className="mb-4">Understanding how relationships affect your brain and nervous system can help you intentionally seek and create healing connections:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Co-Regulation</h4>
                  <p className="mb-3">Our nervous systems are designed to attune to and regulate with others' nervous systems.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Being in the presence of a calm, regulated person helps your system regulate</li>
                    <li>Reciprocal, attuned interactions release oxytocin and other bonding hormones</li>
                    <li>Regular co-regulation helps "retrain" a dysregulated nervous system</li>
                    <li>Over time, these experiences build your capacity for self-regulation</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Mirror Neurons</h4>
                  <p className="mb-3">Specialized brain cells activate both when we perform an action and when we see someone else perform that action.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Mirror neurons help us learn through observation and connection</li>
                    <li>Witnessing others' emotional regulation helps build our own capacity</li>
                    <li>Experiencing empathy from others activates our empathy for ourselves</li>
                    <li>Positive mirroring counters the negative mirroring of trauma</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Neural Integration</h4>
                  <p className="mb-3">Healing relationships support the integration of traumatic experiences within the brain.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Sharing your story with an attuned listener helps connect emotion with narrative</li>
                    <li>Validation from others counteracts shame and isolation</li>
                    <li>Interpersonal safety allows exploration of difficult material</li>
                    <li>Relational healing bridges right-brain emotional experience with left-brain language</li>
                  </ul>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Neuroplasticity</h4>
                  <p className="mb-3">Supportive relationships create conditions for the brain to rewire traumatic patterns.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Consistent positive interactions create new neural pathways</li>
                    <li>Neuroplasticity is enhanced in states of attunement and safety</li>
                    <li>Predictable, responsive relationships help reorganize attachment patterns</li>
                    <li>New relational experiences gradually overwrite traumatic conditioning</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Qualities of Healing Relationships</h3>
              
              <p className="mb-4">Not all relationships have the same capacity for healing. These key qualities distinguish relationships that support trauma recovery:</p>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#f8f0e6]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quality</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">How It Feels</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Safety</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">Both physical and emotional safety are consistently maintained. Boundaries are respected.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I can relax my guard. I don't need to be vigilant or protect myself in this relationship."</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Attunement</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">The other person notices and responds to your emotional state with appropriate care.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I feel seen and understood, even when I can't perfectly articulate what I'm experiencing."</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Predictability</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">The relationship has reliable patterns and reasonable expectations. Responses are consistent.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I know what to expect in this relationship. I'm not constantly bracing for unexpected reactions."</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Mutuality</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">The relationship balances giving and receiving. Both people matter and have agency.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"My needs are as important as theirs. We both contribute and benefit in our own ways."</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Repair</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">When ruptures occur, they are acknowledged and repaired rather than denied or compounded.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"Conflicts and mistakes aren't catastrophic. We can work through difficulties and find our way back to connection."</p>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium">Authentic Presence</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">Both people can be genuine and present with their real experiences, not performing or hiding.</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">"I can be myself, including my imperfections. I don't have to perform or wear a mask to be accepted."</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Types of Healing Relationships</h3>
              
              <p className="mb-4">Healing relationships can take many forms. Each offers unique opportunities for different aspects of recovery:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Therapeutic Relationships</h4>
                  
                  <p className="mb-3">Professional relationships specifically designed to support healing.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Therapist, counsellor, or trauma specialist</li>
                    <li>Somatic practitioner or bodyworker</li>
                    <li>Support group facilitator</li>
                    <li>Spiritual director or chaplain</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">Unique benefits: Professional boundaries, specialised knowledge, contained space for difficult emotions, objective perspective</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Peer Support Relationships</h4>
                  
                  <p className="mb-3">Connections with others who have similar lived experiences.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Support group members</li>
                    <li>Online community connections</li>
                    <li>Friends with shared healing journeys</li>
                    <li>Recovery partners or accountability buddies</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">Unique benefits: Deep understanding through shared experience, reduced isolation, mutual inspiration, practical coping strategies</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Intimate Relationships</h4>
                  
                  <p className="mb-3">Close personal connections with significant ongoing presence.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Romantic partners</li>
                    <li>Close friends</li>
                    <li>Family members (chosen or biological)</li>
                    <li>Mentors or elders</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">Unique benefits: Consistent presence, opportunities for deep attachment healing, emotional intimacy, practicing vulnerability</p>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Community Relationships</h4>
                  
                  <p className="mb-3">Broader connections that provide belonging and collective support.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Spiritual or religious communities</li>
                    <li>Volunteer groups or social justice circles</li>
                    <li>Activity-based communities (arts, sports, etc.)</li>
                    <li>Cultural or identity-based groups</li>
                  </ul>
                  
                  <p className="text-sm italic mt-3">Unique benefits: Sense of purpose and belonging, collective resilience, opportunities for contribution, reduced isolation</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-5 rounded-lg mt-4 border border-[#e6d5c1]">
                <p className="italic">A diverse relational ecosystem offers the most robust support for healing. No single relationship can meet all needs, and different relationships may be more healing at different stages of recovery.</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection: Your Relational Landscape</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to reflect on your current relationships and their healing qualities:</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Current Healing Relationships</h4>
                  <p className="mb-2">Which relationships in your life currently provide healing qualities? What specific qualities do they offer?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="The relationships that feel healing for me are..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Relationship Needs</h4>
                  <p className="mb-2">What qualities or types of relationships would further support your healing journey?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="The relational qualities I'm currently missing or would like more of are..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Relationship Challenges</h4>
                  <p className="mb-2">What patterns or fears make healing relationships challenging for you?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="The challenges I experience in relationships include..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Next Steps</h4>
                  <p className="mb-2">What specific action could you take to nurture existing healing relationships or cultivate new ones?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="One step I could take to enhance healing relationships in my life is..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Navigating Relationship Challenges in Trauma Recovery</h3>
              
              <p className="mb-4">Healing relationships may involve specific challenges for trauma survivors. Being aware of these common patterns can help you navigate them with greater ease:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Trust Issues</h4>
                  <p className="text-sm">Trauma often damages the capacity to trust, making it difficult to feel safe in relationships.</p>
                  <p className="text-sm mt-2 italic"><strong>Helpful approach:</strong> Start with "micro-trust" - small, low-risk opportunities to trust that can gradually build your confidence. Notice when trust is honoured, creating evidence that some people can be trustworthy.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Projection and Transference</h4>
                  <p className="text-sm">You may unconsciously project qualities of past harmful relationships onto current ones, seeing danger where none exists.</p>
                  <p className="text-sm mt-2 italic"><strong>Helpful approach:</strong> Practice the pause - when strong reactions arise, ask, "What's being triggered from my past?" Distinguish between historical feelings and current reality before responding.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Fear of Abandonment or Engulfment</h4>
                  <p className="text-sm">Trauma can create heightened sensitivity to both abandonment (being left) and engulfment (being overwhelmed by others' needs).</p>
                  <p className="text-sm mt-2 italic"><strong>Helpful approach:</strong> Develop clear agreements about connection and space in relationships. Practice communicating your needs for both closeness and distance as they fluctuate.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Shame and Vulnerability</h4>
                  <p className="text-sm">Trauma often creates deep shame that makes authentic connection feel risky or exposing.</p>
                  <p className="text-sm mt-2 italic"><strong>Helpful approach:</strong> Start with "titrated vulnerability" - sharing small pieces at a time and noticing how others respond. Build capacity gradually with people who demonstrate they can hold your story with care.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To nurture healing relationships in your life:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Your Relational Landscape" reflection</li>
                  <li>Identify one healing relationship to nurture with a specific act of connection</li>
                  <li>Notice how different relationships affect your nervous system and energy</li>
                  <li>Practice one small step toward more authenticity in a trusted relationship</li>
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

        case 37:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">GUIDED RELEASE MEDITATION</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">This guided meditation combines somatic awareness, breathwork, and visualisation to facilitate a gentle yet powerful emotional release process. It creates a safe container for allowing held emotions to move through your system, helping to free energy that has been bound in suppression.</p>
              
              <p className="mb-4">While our other release practices have focused on active expression, this meditation offers a complementary approach—creating space and safety for emotions to emerge and release naturally, with minimum guidance and maximum self-regulation.</p>
              
              <p className="mb-3">This guided release meditation helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Access emotions that may be beneath conscious awareness</li>
                <li>Release without needing to analyse or articulate your experience</li>
                <li>Build capacity for being with intense sensations safely</li>
                <li>Integrate released emotions through gentle guidance</li>
              </ul>
              
              <p className="font-medium italic">This practise is designed to work with your nervous system's natural wisdom, allowing release to unfold at the pace and intensity that's right for you.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">The Spiral Nature of Healing</h3>
              
              <p className="mb-4">Rather than a linear progression from "traumatised" to "healed," recovery typically follows a spiral pattern where you revisit similar themes at deeper levels:</p>
              
              <div className="flex justify-centre mb-6">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f7f1e9] to-white rounded-full"></div>
                  <div className="absolute inset-4 border-4 border-[#bd6334] border-dashed rounded-full"></div>
                  <div className="absolute w-full h-full">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M50,10 C70,10 80,20 80,50 C80,80 70,90 50,90 C30,90 20,80 20,50 C20,20 30,10 50,10" fill="none" stroke="#bd6334" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M50,20 C65,20 70,30 70,50 C70,70 65,80 50,80 C35,80 30,70 30,50 C30,30 35,20 50,20" fill="none" stroke="#bd6334" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M50,30 C60,30 60,40 60,50 C60,60 60,70 50,70 C40,70 40,60 40,50 C40,40 40,30 50,30" fill="none" stroke="#bd6334" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M50,40 C55,40 55,45 55,50 C55,55 55,60 50,60 C45,60 45,55 45,50 C45,45 45,40 50,40" fill="none" stroke="#bd6334" strokeWidth="2" strokeDasharray="4 2" />
                    </svg>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#bd6334] rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Revisiting with New Resources</h4>
                  <p className="mb-3">Each time you encounter a familiar challenge or trigger, you bring the resources, insights, and skills you've developed since the last encounter.</p>
                  
                  <p className="text-sm italic">"I notice I'm feeling triggered by criticism again, but this time I can recognise what's happening, use my grounding techniques, and remember this is an old pattern rather than my whole identity."</p>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Deepening Integration</h4>
                  <p className="mb-3">Healing often involves processing the same core wounds at increasingly deeper levels as your capacity expands.</p>
                  
                  <p className="text-sm italic">"I thought I'd worked through my abandonment wound, but it's arising again—this time in a more subtle way that reveals deeper aspects I couldn't access before because I wasn't ready."</p>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Expanding Window of Tolerance</h4>
                  <p className="mb-3">Your capacity to stay present with difficult emotions and sensations gradually increases, allowing deeper healing.</p>
                  
                  <p className="text-sm italic">"I used to dissociate immediately when feeling vulnerable. Now I can stay present with uncomfortable feelings for longer periods before needing to use my coping strategies."</p>
                </div>
                
                <div className="bg-[#f8f0e6] p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Life Transitions as Catalysts</h4>
                  <p className="mb-3">Major life changes often activate deeper layers of healing work as they resonate with earlier experiences.</p>
                  
                  <p className="text-sm italic">"Becoming a parent has triggered healing around my own childhood in ways I couldn't have accessed before this transition. It's challenging but also creating profound healing opportunities."</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection: Your Healing Journey</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take some time to reflect on your own healing journey and the progress you've made, both during this course and in your broader recovery process.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Looking Back: Where You Started</h4>
                  <p className="mb-2">Think back to where you were when you began this course. What were your struggles, hopes, and expectations?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="When I began this course, I was..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Growth and Change</h4>
                  <p className="mb-2">What shifts, insights, or changes have you noticed in yourself during this time?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="Some changes I've noticed include..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Resources and Tools</h4>
                  <p className="mb-2">Which practices, tools, or concepts from this course have been most helpful for you?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="The most helpful resources for me have been..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Ongoing Challenges</h4>
                  <p className="mb-2">What aspects of your healing journey still feel challenging or unresolved?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="I still find it challenging to..."
                  ></textarea>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Celebrating Progress</h4>
                  <p className="mb-2">What achievements or moments of growth, however small, can you celebrate?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={3}
                    placeholder="I'm proud of myself for..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Reflection
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Common Phases in the Recovery Journey</h3>
              
              <p className="mb-4">While everyone's healing journey is unique, many trauma survivors move through similar phases. Understanding these phases can help normalise your experience and orient you to where you might be in your process.</p>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e6d5c1]"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">1</div>
                  <h4 className="font-medium mb-2">Stabilisation & Safety</h4>
                  <p className="text-sm">The initial focus is on establishing physical and emotional safety, developing coping skills, and stabilising overwhelming symptoms.</p>
                  <p className="text-sm italic mt-2">Focus: Building resources, grounding techniques, emotional regulation, and creating external safety.</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">2</div>
                  <h4 className="font-medium mb-2">Awareness & Acknowledgment</h4>
                  <p className="text-sm">Recognising the impact of trauma, beginning to name experiences, and connecting present struggles with past events.</p>
                  <p className="text-sm italic mt-2">Focus: Education about trauma, identifying patterns, and building a narrative of what happened.</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">3</div>
                  <h4 className="font-medium mb-2">Processing & Integration</h4>
                  <p className="text-sm">Working more directly with traumatic memories and their emotional impact, making meaning, and integrating experiences into your life story.</p>
                  <p className="text-sm italic mt-2">Focus: Emotional processing, challenging beliefs, somatic release, and meaning-making.</p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">4</div>
                  <h4 className="font-medium mb-2">Reconnection & Growth</h4>
                  <p className="text-sm">Establishing new ways of relating to yourself and others, developing deeper connections, and engaging more fully with life.</p>
                  <p className="text-sm italic mt-2">Focus: Relationships, identity beyond trauma, purpose, and future orientation.</p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-1 w-6 h-6 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre">5</div>
                  <h4 className="font-medium mb-2">Post-Traumatic Growth & Contribution</h4>
                  <p className="text-sm">Finding meaning, purpose, and even gifts that have emerged through your healing journey. May include supporting others or creating positive change.</p>
                  <p className="text-sm italic mt-2">Focus: Wisdom integration, mentorship, advocacy, creative expression, and service.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-4 rounded-lg mt-6 border border-[#e6d5c1]">
                <p className="text-sm italic">Note: These phases aren't strictly linear. You might move back and forth between them or experience multiple phases simultaneously. There's no "right" timeline—your journey unfolds at its own natural pace.</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Signs of Progress in Trauma Recovery</h3>
              
              <p className="mb-4">Progress in trauma recovery isn't always obvious. Here are some subtle but meaningful signs that healing is happening:</p>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium mb-1">Quicker return to regulation</h4>
                    <p className="text-sm">When triggered, you recover your equilibrium more quickly than before. The intensity and duration of activation decreases over time.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium mb-1">Increased self-awareness</h4>
                    <p className="text-sm">You notice your reactions, triggers, and patterns more quickly, creating space for choice rather than automatic responses.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium mb-1">Greater self-compassion</h4>
                    <p className="text-sm">You respond to your struggles with more kindness and less harsh self-judgment. You can hold your pain with tenderness.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium mb-1">Expanded window of tolerance</h4>
                    <p className="text-sm">You can stay present with a wider range of emotions and sensations without becoming overwhelmed or shut down.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-medium mb-1">More authentic connections</h4>
                    <p className="text-sm">Your relationships become more genuine as you bring more of your true self forward and set healthier boundaries.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-medium mb-1">Reduced symptom interference</h4>
                    <p className="text-sm">Trauma symptoms, while perhaps still present, interfere less with your daily functioning and quality of life.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">7</div>
                  <div>
                    <h4 className="font-medium mb-1">Increased capacity for joy</h4>
                    <p className="text-sm">You experience more moments of pleasure, connection, and presence without guilt or fear that they'll be taken away.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-[#bd6334] text-white flex items-centre justify-centre flex-shrink-0">8</div>
                  <div>
                    <h4 className="font-medium mb-1">Changed relationship with the past</h4>
                    <p className="text-sm">Traumatic memories, while still important, feel less immediate and all-consuming. They become part of your story rather than your entire identity.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To honour your ongoing healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Your Healing Journey" reflection</li>
                  <li>Identify and celebrate at least one sign of progress you've noticed</li>
                  <li>Practice self-compassion when you encounter challenges or setbacks</li>
                  <li>Begin considering which practices from this course you want to continue</li>
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
        
      case 38:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">CREATING YOUR ONGOING HEALING PRACTICE</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">As you near the end of this course, it's time to create a personalised healing plan that will support your continued growth. This plan serves as a bridge between the structured learning environment of the course and your ongoing independent journey.</p>
              
              <p className="mb-4">An effective healing plan is both practical and flexible, taking into account your unique needs, resources, and circumstances. It provides direction without becoming rigid, allowing space for your healing process to unfold organically.</p>
              
              <p className="mb-3">Creating your personalised plan helps you:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Integrate the practices that have been most helpful for you</li>
                <li>Establish sustainable rhythms for ongoing healing</li>
                <li>Identify resources and support systems</li>
                <li>Navigate challenges and setbacks with greater resilience</li>
              </ul>
              
              <p className="font-medium italic">Your healing plan isn't set in stone—it's a living document that will evolve with you as you continue your journey.</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Exercise: Creating Your Healing Plan</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Take your time with this comprehensive exercise to create a healing plan that truly serves your needs. Remember that this plan belongs to you—make it something that resonates with your authentic self.</p>
              
              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-medium mb-3">Step 1: Core Practices</h4>
                  <p className="mb-2">Identify 3-5 practices from this course that have been most helpful for you and that you want to continue:</p>
                  
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
                  <h4 className="font-medium mb-3">Step 2: Realistic Integration</h4>
                  <p className="mb-2">For each practise, decide how you'll realistically integrate it into your life:</p>
                  
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
                  <h4 className="font-medium mb-3">Step 3: Support System</h4>
                  <p className="mb-2">Identify people, resources, and professional support that can help you on your journey:</p>
                  
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
                  <h4 className="font-medium mb-3">Step 4: Potential Challenges & Solutions</h4>
                  <p className="mb-2">Anticipate possible obstacles and plan how you'll address them:</p>
                  
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
                  <h4 className="font-medium mb-3">Step 5: Self-Compassion Plan</h4>
                  <p className="mb-2">How will you respond to yourself when setbacks or difficulties arise?</p>
                  
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md mb-3"
                    rows={4}
                    placeholder="When I struggle with my healing plan or experience setbacks, I will..."
                  ></textarea>
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                    Save Healing Plan
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Elements of a Sustainable Healing Plan</h3>
              
              <p className="mb-4">As you create your plan, consider these key elements that support long-term sustainability:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Balance</h4>
                  
                  <p className="mb-3">A sustainable plan balances different types of practices and needs.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Balance solo practices with relational connection</li>
                    <li>Balance emotional processing with joy and pleasure</li>
                    <li>Balance structured routines with spontaneity</li>
                    <li>Balance challenge with comfort and ease</li>
                    <li>Balance doing with being</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Realistic Scope</h4>
                  
                  <p className="mb-3">An effective plan is realistic about what you can consistently maintain.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Start small and build gradually</li>
                    <li>Consider your energy levels and other commitments</li>
                    <li>Focus on quality of practise over quantity</li>
                    <li>Plan for the life you actually have, not an ideal one</li>
                    <li>Create options for both high and low capacity days</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Meaningful Rituals</h4>
                  
                  <p className="mb-3">Creating rituals around healing practices helps them become sustaining habits.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Link practices to existing routines (e.g., morning coffee)</li>
                    <li>Create environmental cues that support practise</li>
                    <li>Include sensory elements that feel nourishing</li>
                    <li>Acknowledge beginnings and endings of practise sessions</li>
                    <li>Connect practices to your deeper values and purpose</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3 text-[#bd6334]">Flexible Adaptation</h4>
                  
                  <p className="mb-3">A resilient plan includes the ability to adapt to changing circumstances.</p>
                  
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Create "minimum viable practise" versions for low-capacity days</li>
                    <li>Schedule regular check-ins to assess what's working</li>
                    <li>Be willing to modify practices as your needs change</li>
                    <li>Have contingency plans for challenging periods</li>
                    <li>View adaptation as wisdom, not failure</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#fdf5e6] to-[#f8f0e6] p-6 rounded-lg mb-8 border border-[#e6d5c1]">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Monitoring Progress Without Judgment</h3>
              
              <p className="mb-4">An important aspect of your healing plan is having a way to track your progress without falling into self-criticism or rigid expectations. Consider these approaches:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Reflective Journaling</h4>
                  <p className="text-sm">Set aside time weekly or monthly to reflect on your journey. Rather than focusing only on what you "accomplished," notice shifts in how you feel, respond to challenges, and relate to yourself and others.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Compassionate Check-Ins</h4>
                  <p className="text-sm">Create a ritual of checking in with yourself from a place of kindness. Ask questions like "What do I need right now?" "What's been supportive lately?" and "How can I best care for myself today?"</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Milestone Celebrations</h4>
                  <p className="text-sm">Mark meaningful milestones in your healing journey with small celebrations or acknowledgments. This helps validate your progress and reinforces your commitment.</p>
                </div>
                
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Community Witnessing</h4>
                  <p className="text-sm">Share parts of your journey with trusted others who can reflect back your growth and provide encouragement. This might be friends, family, support groups, or a therapist.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">This Week's Practice</h3>
              
              <p className="mb-4">To establish your ongoing healing journey:</p>
              
              <div className="bg-[#f8f0e6] p-5 rounded-lg mb-6">
                <h4 className="font-medium mb-3">Daily Practices</h4>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Complete the "Creating Your Healing Plan" exercise</li>
                  <li>Share your plan with at least one supportive person</li>
                  <li>Schedule time in your calendar for your core practices</li>
                  <li>Begin implementing one element of your plan</li>
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

         case 39:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">VISIONING THE HEALED SELF & EMBRACING POST-TRAUMA GROWTH</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
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
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
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
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Perseverance through difficulty</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Willingness to face painful truths</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Courage to be vulnerable</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Ability to start again after setbacks</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Inner resourcefulness</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-5 rounded-lg">
                      <h5 className="font-medium mb-3">Emotional Intelligence</h5>
                      <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Self-awareness</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Empathy for others' struggles</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Ability to name and process feelings</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Emotional regulation skills</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Intuitive understanding of others</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-5 rounded-lg">
                      <h5 className="font-medium mb-3">Wisdom & Perspective</h5>
                      <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Deeper understanding of human nature</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Ability to see multiple perspectives</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Insight into what truly matters</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Capacity for meaning-making</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Discernment in relationships</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#f8f0e6] p-5 rounded-lg">
                      <h5 className="font-medium mb-3">Compassion & Connection</h5>
                      <p className="mb-2 text-sm">Select strengths you recognise in yourself:</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Self-compassion</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Ability to support others</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Capacity for authentic connection</span>
                        </div>
                        <div className="flex items-centre">
                          <input type="checkbox" className="mr-2 accent-[#bd6334]" />
                          <span className="text-sm">Willingness to be vulnerable</span>
                        </div>
                        <div className="flex items-centre">
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
                  
                  <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
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
              
              <div className="flex justify-between items-centre">
                <h4 className="font-medium">Your Commitment:</h4>
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  I Commit to This Practice
                </button>
              </div>
            </div>
          </div>
        );

        case 40:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">HEALING ACTION PLAN (WRITING PRACTICE)</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">Creating a personalised healing action plan is one of the most empowering steps you can take in your recovery journey. This isn't about having all the answers right now—it's about identifying what works for you and building a practical roadmap for moving forward.</p>
              
              <p className="mb-4">Your healing action plan will be unique to you, incorporating the tools, insights, and practices that resonate most deeply with your experience and needs.</p>
              
              <p className="font-medium italic">Remember: This plan is flexible and will evolve as you do. The goal is progress, not perfection.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 1: Reflect on Your Journey So Far</h3>
              
              <p className="mb-4">Before moving forward, take time to acknowledge how far you've come. This reflection helps you identify what's been most helpful and what you want to focus on next.</p>
              
              <div className="bg-[#f8f0e6] p-6 rounded-lg mb-6">
                <h4 className="font-medium mb-4">Writing Prompts for Reflection</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">What have been the most significant insights or realisations during this course?</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={4}
                      placeholder="Consider moments of understanding, shifts in perspective, or new awareness about yourself..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">Which tools or practices have felt most helpful and supportive?</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Think about specific exercises, meditations, concepts, or approaches that resonated..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">What patterns or triggers have you become more aware of?</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Notice without judgement - awareness is the first step to change..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">How has your relationship with your body changed?</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Consider changes in body awareness, comfort, trust, or connection..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 2: Create Your Personal Toolkit</h3>
              
              <p className="mb-4">Based on your reflections, identify the specific tools and practices you want to continue using. Your toolkit should be practical and sustainable for your daily life.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Daily Practices</h4>
                  <p className="text-sm mb-3">Tools you can use regularly for ongoing support:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    rows={4}
                    placeholder="e.g., morning grounding practice, evening body scan, breathing exercises..."
                  />
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Crisis/Difficult Moment Tools</h4>
                  <p className="text-sm mb-3">Practices for when you're struggling:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    rows={4}
                    placeholder="e.g., 5-4-3-2-1 grounding, safe space visualisation, emergency contacts..."
                  />
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Weekly/Monthly Practices</h4>
                  <p className="text-sm mb-3">Deeper work for ongoing growth:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    rows={4}
                    placeholder="e.g., journaling sessions, therapy appointments, nature time, creative expression..."
                  />
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg">
                  <h4 className="font-medium mb-3">Professional Support</h4>
                  <p className="text-sm mb-3">People and services in your support network:</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    rows={4}
                    placeholder="e.g., therapist, GP, support groups, trusted friends, family members..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Step 3: Set Gentle Goals and Intentions</h3>
              
              <p className="mb-4">Rather than rigid goals, set gentle intentions for your continued healing. These should feel supportive and achievable, not overwhelming.</p>
              
              <div className="bg-[#f8f0e6] p-6 rounded-lg mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">In the next month, I want to focus on:</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Choose 1-2 specific areas that feel most important right now..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">One new thing I'd like to explore or try:</label>
                    <input 
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="This could be a new therapy approach, hobby, support group, etc..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">How I'll know I'm making progress:</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Consider both internal shifts and external changes you might notice..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">My commitment to myself:</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="A gentle, compassionate promise about how you'll treat yourself moving forward..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <h4 className="font-medium mb-3 text-[#bd6334]">A Note on Setbacks</h4>
              <p className="mb-3">Healing isn't linear. There will be difficult days, moments when old patterns resurface, times when progress feels slow or non-existent. This is normal and doesn't mean you're failing.</p>
              <p className="mb-3">When setbacks happen:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Return to your basic tools (breathing, grounding, self-compassion)</li>
                <li>Reach out for support—you don't have to face difficulties alone</li>
                <li>Remember that setbacks often precede breakthrough moments</li>
                <li>Treat yourself with the same kindness you'd offer a dear friend</li>
              </ul>
            </div>
            
            <div className="text-centre">
              <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colors">
                Save My Healing Action Plan
              </button>
            </div>
          </div>
        );

      case 41:
        return (
          <div>
            <h1 className="text-black text-2xl mb-6">FUTURE-SELF REFLECTION (SENTENCE COMPLETION)</h1>
            
            <div className="bg-[#f7f1e9] p-6 rounded-md mb-8">
              <p className="mb-4">This powerful exercise invites you to connect with your future self—the version of you who has continued healing, growing, and thriving. Sentence completion helps your subconscious mind express truths that your analytical mind might overlook.</p>
              
              <p className="mb-4">As you complete these sentences, trust the first thoughts that come to mind. There are no right or wrong answers—only your authentic responses. This exercise creates a bridge between where you are now and where you're heading on your healing journey.</p>
              
              <p className="font-medium italic">Let your intuition guide you. Write quickly and trust whatever emerges.</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">How to Complete This Exercise</h3>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg">
                <ul className="space-y-2 text-sm">
                  <li>• Find a quiet space where you won't be interrupted</li>
                  <li>• Read each sentence stem and complete it with the first response that comes to mind</li>
                  <li>• Don't overthink—trust your intuition</li>
                  <li>• You can return to these exercises multiple times as your perspective evolves</li>
                  <li>• Keep your responses private or share them with someone you trust</li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Connecting with Your Future Self</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">Complete these sentences to connect with the version of yourself that has continued growing and healing:</p>
              
              <div className="bg-white border border-gray-200 p-5 rounded-lg mb-6 space-y-6">
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Part 1: Envisioning Your Healed Self</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">One year from now, when I think about my relationship with myself, I feel...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">The thing I'm most proud of about my healing journey is...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">When I encounter triggers now, I respond by...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">My inner voice now speaks to me with...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Part 2: Daily Life & Relationships</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">In my relationships, I now feel confident to...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">When someone crosses my boundaries, I...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">The way I take care of myself daily has changed because...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">People notice that I'm different now because...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Part 3: Growth & Transformation</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">The biggest shift I've made in my healing journey is...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">When I look back at my past self, I feel...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">My future self would advise me to...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">The trauma no longer controls me because...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Part 4: Purpose & Meaning</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">My healing journey has taught me that I am...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">The gifts that emerged from my pain are...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">I want to use my experience to...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-medium mb-2">Five years from now, when I look back on this healing work, I will feel...</p>
                      <div className="border-b border-gray-300 mt-2 pb-2">
                        <span className="text-gray-500 text-sm">Your response here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-[#bd6334]">Reflection & Integration</h3>
                <button className="h-8 px-3 rounded-full text-sm flex items-centre bg-gray-100 text-gray-600">
                  Mark Complete
                </button>
              </div>
              
              <p className="mb-4">After completing the sentence exercises, take a moment to reflect on your responses:</p>
              
              <div className="space-y-4">
                <div>
                  <label className="font-medium text-gray-800 block mb-2">What patterns or themes do you notice in your responses?</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Reflect on the common threads in your sentence completions..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="font-medium text-gray-800 block mb-2">Which response surprised you the most, and why?</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Share what felt unexpected or revealing..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="font-medium text-gray-800 block mb-2">What would you like to tell your future self about this moment in your healing journey?</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Write a message to the version of yourself that has continued growing..."
                  ></textarea>
                </div>
              </div>
                
              <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours mt-4">
                Save Reflection
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-[#bd6334] mb-4">Course Resources</h3>
              
              <div className="space-y-3">
                <div className="flex items-centre justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">Future-Self Reflection Worksheet (PDF)</span>
                  <button className="text-[#bd6334] hover:underline">Download</button>
                </div>
                
                <div className="flex items-centre justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">Sentence Completion Guide</span>
                  <button className="text-[#bd6334] hover:underline">Download</button>
                </div>
              </div>
              
              <div className="flex justify-between items-centre mt-6">
                <button className="bg-[#bd6334] hover:bg-[#a85629] text-white px-6 py-2 rounded-md font-medium transition-colours">
                  Download All Resources (ZIP)
                </button>
              </div>
            </div>
          </div>
        );

        default:
        return (
          <div>
            <h1 className="text-[#bd6334] text-2xl mb-8">{lessonContent.title}</h1>
            
            <p className="mb-6">Content for this lesson is currently being prepared. Please check back soon or navigate to another lesson.</p>
          </div>
        );

    }

  }

  
  // Get lesson icon based on type
  const getLessonIcon = (type) => {
    switch (type) {
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'exercise':
        return <File className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Loading state
  if (!module) {
    return (
      <div className="flex items-centre justify-centre h-screen bg-[#f7f1e9]">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#bd6334] rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar Navigation - Exactly matching the screenshot */}
      <div className="w-[240px] bg-white min-h-screen overflow-y-auto flex-shrink-0 border-r border-gray-200">
        {/* Progress bar */}
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-centre justify-between mb-1">
            <span className="text-xs font-medium text-gray-500">43% COMPLETE</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded">
            <div className="bg-black h-full rounded" style={{ width: '43%' }}></div>
          </div>
        </div>
        
        {/* Course intro section */}
        <div className="py-4">
        </div>
        
        {/* Module 1 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 1:
          <div className="font-normal text-black">Understanding Trauma & the Body</div>
          <div className="font-normal text-black">Why We Get Stuck in Pain – and How Awareness Sets Us Free</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(1)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">The Neuroscience: How trauma rewires the brain</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(2)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">The Nervous System & Trauma</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(3)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Trauma Responses: Fight, Flight, Freeze, Fawn – How Trauma Manifests in Behaviour</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(4)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Dissociation in PTSD: Depersonalisation, Derealisation, Dissociative Amnesia</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(5)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Personal Trauma Timeline</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(6)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Self-Assessment - Trauma Responses</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(7)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Trauma Body Map</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer bg-gray-100"
              onClick={() => setActiveLessonId(8)}
            >
              <span className="sidebar-lesson-indicator bg-black border border-black flex items-centre justify-centre">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
              </span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm font-medium">Guided Visualisation - Grounding & Nervous System Regulation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module 2 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 2:
          <div className="font-normal text-black">Reconnecting with the Body - Coming Back to Yourself – Safety, Sensation, and Presence</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(9)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Why Trauma Disconnects Us from the Body</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(10)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Felt Sense & Body Awareness: Listening to Inner Signals</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(11)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Grounding Through the Senses: Touch, Movement, Breath</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(12)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Safe Space Visualisation</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(13)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Somatic Reflection – When Do I Feel Safe?</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(14)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Mindful Movement Practice</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(15)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Body Awareness Meditation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module 3 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 3:
          <div className="font-normal text-black">Inner Child Healing</div>
          <div className="font-normal text-black">Reclaiming the Parts of You That Still Hurt</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(16)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Understanding the Inner Child and Emotional Wounds</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(17)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">How Childhood Pain Shapes Adult Patterns</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(18)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Reparenting: Offering Compassion to the Self Within</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(19)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Meet your Inner Child</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(20)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">What My Inner Child Needs to Hear</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(21)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Creating a Self-Compassion Ritual</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(22)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Letter to your Inner Child</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(23)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Inner Child Healing Meditation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module 4 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 4:
          <div className="font-normal text-black">The Inner Narrative</div>
          <div className="font-normal text-black">"I'm Not Enough," "I'm Unsafe," "I'm Alone"</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(24)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">The Inner Narrative: "I'm Not Enough," "I'm Unsafe," "I'm Alone"</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(25)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">How Trauma Shapes Beliefs About Self and Others</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(26)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Transforming Inner Dialogue with Clarity and Compassion</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(27)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Identifying Stuck Points</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(28)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Reframing Stuck Points</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(29)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Taking Small Bold Actions</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(30)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Empowerment Meditation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module 5 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 5:
          <div className="font-normal text-black">Releasing Emotional Baggage</div>
          <div className="font-normal text-black">Letting Go of What You've Been Carrying</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(31)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">The Cost of Suppressed Emotions</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(32)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Emotional Energy & How the Body Stores Pain</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(33)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Release as a Path to Freedom and Wholeness</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(34)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Writing to Release</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(35)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Drawing Your Emotions</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(36)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Breathwork for Emotional Clearing</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(37)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <Headphones size={16} />
                <span className="text-sm">Guided Release Meditation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Module 6 Section */}
        <div className="bg-gray-100 py-3 px-4 font-medium text-sm text-black">
          MODULE 6:
          <div className="font-normal text-black">Integration & Forward Momentum</div>
          <div className="font-normal text-black">Staying Connected to Growth, Resilience, and Self-Love</div>
        </div>
        
        <div className="py-2">
          <div className="space-y-1">
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(38)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Creating Your Ongoing Healing Practice</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(39)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Resilience Through Rhythm – Daily and Weekly Rituals</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(40)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Visioning the Healed Self & Embracing Post-Trauma Growth</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(41)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Healing Action Plan (Writing Practice)</span>
              </div>
            </div>
            
            <div 
              className="sidebar-lesson-item cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveLessonId(42)}
            >
              <span className="sidebar-lesson-indicator border border-gray-400"></span>
              <div className="sidebar-lesson-item-content">
                <File size={16} />
                <span className="text-sm">Future-Self Reflection (Sentence Completion)</span>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-1 px-4 my-3 text-xs text-black">
          Understanding Trauma: A 6-Week Self Paced Programme
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Navigation Bar */}
        <div className="bg-[#86553d] text-white py-3 px-6 flex justify-between">
          <button 
            onClick={goToPreviousLesson}
            className="flex items-centre text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous lecture
          </button>
          <button 
            onClick={goToNextLesson}
            className="flex items-centre text-sm font-medium"
          >
            Complete and continue
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {lessonContent ? (
            <div className="max-w-4xl mx-auto px-16 py-8 course-content font-['Marcellus']">
              <div className="course-content">
                {getLessonContent()}
              </div>
            </div>
          ) : (
            <div className="flex items-centre justify-centre h-full">
              <p className="text-lg text-gray-500">Select a lesson from the sidebar to begin your learning journey.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseContent