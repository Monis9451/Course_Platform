import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiUser, FiClock } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../pages/Header'

// Dummy course data - replace with actual API calls when database is ready
const dummyCoursesData = {
  1: {
    id: 1,
    title: "Understanding Trauma",
    subtitle: "A 6-Week Self-Paced Course",
    description: "Break free from trauma patterns and discover deep healing with evidence-based techniques in this comprehensive self-paced program.",
    fullDescription: "Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",    instructor: "Dr. Samina Khatun",
    duration: "6 weeks",
    lessons: 24,
    level: "ALL LEVELS",
    price: 75,
    featured: true,
    img_src: "/love_course.png",
    img_alt: "Understanding Trauma Course",
    modules: [
      {
        id: 1,
        title: "Understanding Trauma – How It Affects the Mind & Body",
        description: "Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",
        lessons: [
          {
            id: 1,
            title: "The Neuroscience of Trauma",
            description: "Explore how trauma affects your brain and nervous system, and why understanding these patterns is essential for healing.",
            duration: "18 minutes",
            completed: false
          },
          {
            id: 2,
            title: "Trauma Responses and the Window of Tolerance",
            description: "Learn to recognize your unique trauma responses and how they affect your daily life.",
            duration: "22 minutes",
            completed: false
          },
          {
            id: 3,
            title: "Action - Detach",
            description: "Practical exercise to help you create space for healing by detaching from unhelpful patterns.",
            duration: "15 minutes",
            completed: false
          },
          {
            id: 4,
            title: "Meet Your Subconscious",
            description: "Discover the deeper patterns that drive your responses to stress and emotional triggers.",
            duration: "25 minutes",
            completed: false
          },
          {
            id: 5,
            title: "Understanding Your Trauma Responses",
            description: "Learn to identify your personal trauma responses and what triggers them.",
            duration: "20 minutes",
            completed: false
          },
          {
            id: 6,
            title: "The Amygdala and Fear Response",
            description: "How your brain processes trauma and why you respond the way you do.",
            duration: "15 minutes",
            completed: false
          },
        ]
      },
      {
        id: 2,
        title: "Healing Trauma Through Self-Compassion",
        description: "Learn powerful techniques for healing trauma through self-compassion and mindful awareness.",
        lessons: [
          {
            id: 7,
            title: "Understanding Embodiment",
            description: "Learn what it means to be embodied and why trauma disconnects us from our bodies.",
            duration: "22 minutes",
            completed: false
          },
          {
            id: 8,
            title: "Grounding Techniques",
            description: "Practical tools to help you ground when feeling triggered or disconnected.",
            duration: "25 minutes",
            completed: false
          },
          {
            id: 9,
            title: "Body Scan Meditation",
            description: "A guided practice to help you reconnect with physical sensations safely.",
            duration: "18 minutes",
            completed: false
          },
          {
            id: 10,
            title: "Creating Safety in Your Body",
            description: "How to build a sense of safety that allows trauma to release.",
            duration: "24 minutes",
            completed: false
          },
        ]
      },
      {
        id: 3,
        title: "Inner Child Healing – Reconnecting with Your Younger Self",
        description: "Healing the Wounds of the Past by Nurturing the Inner Child",
        lessons: [
          {
            id: 11,
            title: "Understanding the Inner Child",
            description: "Learn what the “inner child” represents and why healing this part of yourself is essential.",
            duration: "20 minutes",
            completed: false
          },
          {
            id: 12,
            title: "Identifying Childhood Wounds",
            description: "Recognize the core wounds from childhood that are still affecting you.",
            duration: "25 minutes",
            completed: false
          },
          {
            id: 13,
            title: "Inner Child Dialogue Practice",
            description: "A guided practice to connect with and reassure your inner child.",
            duration: "30 minutes",
            completed: false
          },
          {
            id: 14,
            title: "Reparenting Yourself",
            description: "Learn to give yourself the care, validation and boundaries you needed as a child.",
            duration: "28 minutes",
            completed: false
          },
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: "Unburdening Love",
    subtitle: " A 6-Week Self-Paced Course",
    description: "Break Free from Relationship Blocks and Cultivate Healthy Love ",
    fullDescription: "Are you ready to break free from the emotional blocks holding you back in love? Whether you're single, in a relationship, or navigating a marriage, this 6-week self-paced course will help you release deep-seated barriers, heal past wounds, and cultivate healthy, lasting love. Led by an experienced psychologist, Unburdening Love is a transformative programme designed to help you uncover the roots of your relationship struggles and provide you with the tools to create healthier, more fulfilling connections with yourself and others.",
    instructor: "Dr. Samina Khatun",
    duration: "6 weeks",
    lessons: 20,
    level: "ALL LEVELS",
    price: 75,
    featured: true,
    img_src: "/love_course.png",
    img_alt: "Understanding Love Course",    modules: [
      {
        id: 1,
        title: "Healing the Roots of Attachment",
        description: "Explore how early experiences shape your approach to love and relationships.",
        lessons: [
          {
            id: 1,
            title: "Understanding Attachment Theory",
            description: "Learn the four attachment styles and discover which one shapes your relationships.",
            duration: "22 minutes",
            completed: false
          },
          {
            id: 2,
            title: "Childhood Origins of Love Patterns",
            description: "Explore how your early caregiving experiences created your blueprint for love.",
            duration: "25 minutes",
            completed: false
          },
          {
            id: 3,
            title: "Identifying Your Attachment Style",
            description: "Take a deep dive into your personal attachment patterns and behaviors.",
            duration: "20 minutes",
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: "The Hidden Wounds of Love",
        description: "Uncover emotional baggage and limiting beliefs that may be holding you back.",
        lessons: [
          {
            id: 4,
            title: "Recognizing Emotional Baggage",
            description: "Identify the unconscious beliefs and fears that sabotage your relationships.",
            duration: "23 minutes",
            completed: false
          },
          {
            id: 5,
            title: "Core Wounds and Love Blocks",
            description: "Understand the deeper wounds that create barriers to intimacy and connection.",
            duration: "27 minutes",
            completed: false
          },
          {
            id: 6,
            title: "Breaking Free from Limiting Beliefs",
            description: "Learn powerful techniques to release beliefs that no longer serve your love life.",
            duration: "24 minutes",
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: "Understanding Triggers & Nervous System Responses",
        description: "Learn how past wounds affect your emotional reactions and how to regulate them.",
        lessons: [
          {
            id: 7,
            title: "The Science of Emotional Triggers",
            description: "Understand what happens in your brain and body when you get triggered in relationships.",
            duration: "21 minutes",
            completed: false
          },
          {
            id: 8,
            title: "Nervous System Regulation Techniques",
            description: "Master practical tools to calm your nervous system during relationship stress.",
            duration: "26 minutes",
            completed: false
          },
          {
            id: 9,
            title: "Creating New Response Patterns",
            description: "Learn to respond rather than react when triggered by your partner.",
            duration: "23 minutes",
            completed: false
          }
        ]
      },
      {
        id: 4,
        title: "Honouring Your Needs",
        description: "Reclaim your voice, set boundaries, and create emotional safety in relationships.",
        lessons: [
          {
            id: 10,
            title: "Identifying Your Core Needs",
            description: "Discover what you truly need to feel loved, valued, and secure in relationships.",
            duration: "22 minutes",
            completed: false
          },
          {
            id: 11,
            title: "The Art of Healthy Boundaries",
            description: "Learn to set and maintain boundaries that protect your energy and well-being.",
            duration: "25 minutes",
            completed: false
          },
          {
            id: 12,
            title: "Communicating Your Needs with Confidence",
            description: "Master the skills to express your needs clearly and compassionately.",
            duration: "24 minutes",
            completed: false
          }
        ]
      },
      {
        id: 5,
        title: "Rewriting the Love Story",
        description: "Shift relationship patterns and choose love from a place of self-worth and wholeness.",
        lessons: [
          {
            id: 13,
            title: "Cultivating Self-Love and Worth",
            description: "Build a foundation of self-love that attracts healthy, fulfilling relationships.",
            duration: "26 minutes",
            completed: false
          },
          {
            id: 14,
            title: "Breaking Toxic Relationship Cycles",
            description: "Identify and break free from destructive patterns that keep you stuck.",
            duration: "28 minutes",
            completed: false
          },
          {
            id: 15,
            title: "Creating Your New Love Blueprint",
            description: "Design a new vision for love based on wholeness rather than neediness.",
            duration: "25 minutes",
            completed: false
          }
        ]
      },
      {
        id: 6,
        title: "Integrating Healing into Life",
        description: "Anchor your healing and sustain healthy love in your everyday interactions.",
        lessons: [
          {
            id: 16,
            title: "Daily Practices for Healthy Love",
            description: "Establish routines and habits that support your ongoing relationship growth.",
            duration: "22 minutes",
            completed: false
          },
          {
            id: 17,
            title: "Maintaining Your Progress",
            description: "Learn strategies to sustain your healing and prevent old patterns from returning.",
            duration: "24 minutes",
            completed: false
          },
          {
            id: 18,
            title: "Creating Lasting Change",
            description: "Integrate all your learnings into a sustainable approach to love and relationships.",
            duration: "27 minutes",
            completed: false
          }
        ]
      }
    ]
  }
}

const CourseDetails = () => {
  const { id } = useParams()
  // const navigate = useNavigate() // Commented out for now
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProgress] = useState([]) // Mock user progress
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  const faqs = [
    {
      id: 1,
      question: "Is there a refund policy for this course?",
      answer: "Due to the nature of the course, refunds are not available. Once you purchase, you'll have immediate access to all the course materials. We believe in the transformative power of this programme, and we're confident that if you commit to the process, you'll see lasting results.",
      icon: "💰"
    },
    {
      id: 2,
      question: "Do I need to be in therapy to do this course?",
      answer: "No, you do not need to be in therapy to take this course. It's designed for anyone looking to improve their relationships and heal emotional blocks, whether or not you're in therapy. If you're currently seeing a therapist, this course can be a great complement to that work.",
      icon: "🧠"
    },
    {
      id: 3,
      question: "Is this course for singles, people in relationships, or married couples?",
      answer: "Yes! Whether you're single, dating, or in a committed relationship, this course is designed to help you release emotional blocks that affect how you connect with yourself and others. It's valuable for anyone looking to create stronger, healthier relationships.",
      icon: "💕"
    },
    {
      id: 4,
      question: "How long do I have access to the course?",
      answer: "You get lifetime access to all course materials, so you can work through the modules at your own pace whenever it fits your schedule.",
      icon: "⏰"
    },
    {
      id: 5,
      question: "Is there support throughout the programme?",
      answer: "Yes! You'll have access to me via email to ask any programme-related questions, seek clarification, or get additional support as you work through the material. Please note that I am available for programme-related inquiries only. For any personal therapeutic needs or general psychological support, I recommend reaching out to a licensed therapist.",
      icon: "💬"
    }
  ]

  useEffect(() => {
    // Simulate API call - replace with actual API when database is ready
    const fetchCourse = () => {
      setTimeout(() => {
        const courseData = dummyCoursesData[parseInt(id)]
        setCourse(courseData)
        setLoading(false)
      }, 500)
    }

    fetchCourse()
  }, [id])
  // Calculate course progress - commented out for now
  // const calculateProgress = () => {
  //   if (!course || !userProgress.length) return 0
  //   
  //   let totalLessons = 0
  //   let completedLessons = 0
  //   
  //   course.modules.forEach(module => {
  //     totalLessons += module.lessons.length
  //     module.lessons.forEach(lesson => {
  //       if (userProgress.includes(lesson.id)) {
  //         completedLessons++
  //       }
  //     })
  //   })
  //   
  //   return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  // }
  // Commented out unused functions for now - can be enabled when needed
  // const handleStartCourse = () => {
  //   if (course && course.modules.length > 0) {
  //     const firstLesson = course.modules[0].lessons[0]
  //     if (firstLesson) {
  //       // For now, just show an alert - replace with actual lesson navigation
  //       alert(`Starting lesson: ${firstLesson.title}`)
  //       // navigate(`/lesson/${firstLesson.id}`)
  //     }
  //   }
  // }

  // const handleBuyNow = () => {
  //   // Navigate to checkout - replace with actual checkout page
  //   navigate(`/checkout/${course.id}`)
  // }

  const isLessonCompleted = (lessonId) => {
    return userProgress.includes(lessonId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-fitzgerald text-black mb-4">Course Not Found</h1>
          <p className="text-gray-600 font-fitzgerald mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="bg-primary text-white font-fitzgerald px-8 py-3 hover:bg-primary-dark transition-colors">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  // const progressPercentage = calculateProgress()

  return (
    <div className="min-h-screen bg-cream font-fitzgerald font-thin">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-white py-4 border border-gray-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm font-fitzgerald">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <span className="text-gray-400">›</span>
            <Link to="/courses" className="text-primary hover:underline">Courses</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">{course.title}: {course.subtitle}</span>
          </nav>
        </div>
      </div>      {/* Hero Section */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-fitzgerald font-medium mb-6 leading-tight text-center">
              {course.title}: {course.subtitle}
            </h1>
            <h2 className="text-xl md:text-2xl text-black mb-8 text-center font-fitzgerald">
              {course.description}
            </h2>
          </div>
        </div>
      </section>

      {/* Course Info Section */}
      <section className="bg-cream py-12 md:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left: Image + Info */}
            <div className="w-full md:w-2/3 flex flex-col items-center">
              {/* Course Image Placeholder */}
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-lg mb-6">
                <img src="/3.png" alt="course image" />
              </div>
              {/* Duration & Level */}
              <div className="flex items-center gap-6 mt-auto">
                <span className="flex items-center text-warm-gray text-base font-fitzgerald">
                  <FiClock className="mr-2" />
                  {course.duration}
                </span>
                <span className="flex items-center text-warm-gray text-base font-fitzgerald">
                  <FiUser className="mr-2" />
                  {course.level}
                </span>
              </div>
            </div>
            
            {/* Right: Price & Features */}
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-fitzgerald font-medium mb-2 text-black">Course Price</h3>
                <div className="text-3xl font-bold text-primary mb-6 font-fitzgerald">£{course.price}.00</div>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center text-black font-fitzgerald">
                    <FaCheckCircle className="text-primary mr-2" />
                    Lifetime Access
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FaCheckCircle className="text-primary mr-2" />
                    24 Video Lessons
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FaCheckCircle className="text-primary mr-2" />
                    Downloadable Resources
                  </li>
                </ul>
              </div>
              <button
                onClick={() => (window.location.href = `/checkout/${course.id}`)}
                className="bg-primary hover:bg-primary-dark text-white font-fitzgerald font-medium px-6 py-3 rounded transition-colors duration-200 w-full mb-3"
              >
                Enroll Now
              </button>
              <div className="text-center text-primary mt-2 text-sm font-fitzgerald">
                Try a free sample lesson
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Course Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-fitzgerald text-black mb-12">Course Breakdown</h2>
          
          <div className="space-y-8">
            {course.modules.map((module, moduleIndex) => (
              <ModuleSection 
                key={module.id} 
                module={module} 
                moduleNumber={moduleIndex + 1}
                userProgress={userProgress}
                isLessonCompleted={isLessonCompleted}
              />
            ))}
          </div>
        </div>
      </section>      {/* Why This Course Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-primary font-fitzgerald uppercase">
							Why This Course?
						</h2>
						<h3 className="text-xl font-medium mb-12 text-center text-black font-fitzgerald">
							Why "Unburdening Love" Is Different:
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-cream p-6 rounded-lg shadow-sm">
								<h3 className="font-medium text-lg mb-4 text-black font-fitzgerald">
									Expert-Led
								</h3>
								<p className="text-warm-gray font-fitzgerald">
									Designed by a licensed psychologist with years of
									experience in relationship therapy, this course combines science-backed methods
									for deep healing.
								</p>
							</div>

							<div className="bg-cream p-6 rounded-lg shadow-sm">
								<h3 className="font-medium text-lg mb-4 text-black font-fitzgerald">
									Affordable
								</h3>
								<p className="text-warm-gray font-fitzgerald">
									High-quality, transformative material without the hefty
									price tag of therapy or one-on-one coaching.
								</p>
							</div>

							<div className="bg-cream p-6 rounded-lg shadow-sm">
								<h3 className="font-medium text-lg mb-4 text-black font-fitzgerald">
									Self-Paced
								</h3>
								<p className="text-warm-gray font-fitzgerald">
									Complete the modules at your own pace with lifetime
									access to all materials, so you can return to them
									whenever you need.
								</p>
							</div>

							<div className="bg-cream p-6 rounded-lg shadow-sm">
								<h3 className="font-medium text-lg mb-4 text-black font-fitzgerald">
									Personal Support
								</h3>
								<p className="text-warm-gray font-fitzgerald">
									Have your questions answered and get the support you
									need via email throughout the course.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>			{/* Testimonials Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-2xl md:text-3xl font-medium mb-6 text-center font-fitzgerald uppercase">
							Testimonials
						</h2>
						<h3 className="text-xl font-medium mb-12 text-center text-black font-fitzgerald">
							Real Stories from Real Students
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							<div className="bg-white p-6 rounded-lg shadow-sm">
								<p className="text-warm-gray mb-6 italic font-fitzgerald">
									"I had no idea how much I was carrying from my childhood
									and past relationships. This course helped me see it and,
									more importantly, let it go."
								</p>
								<p className="font-medium text-black font-fitzgerald">— Sarah M.</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-sm">
								<p className="text-warm-gray mb-6 italic font-fitzgerald">
									"The exercises helped me realize my own attachment style and how it was affecting my
									relationship. I'm now communicating better and feeling more secure in love."
								</p>
								<p className="font-medium text-black font-fitzgerald">— James L.</p>
							</div>
						</div>						{/* Get Instant Access Section */}
						<div className="text-center bg-cream p-8 rounded-lg">
							<h3 className="text-2xl font-medium mb-4 text-black font-fitzgerald">
								Get Instant Access for Just £75
							</h3>
							<p className="text-warm-gray text-lg leading-relaxed font-fitzgerald">
								This course is designed to give you lifetime access to transformative materials at an
								affordable price. Whether you're looking to heal from past wounds, improve your
								current relationship, or build a foundation of self-love, this course will guide you every
								step of the way.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-white">
				<div className="max-w-4xl mx-auto px-8">
					<div className="text-center mb-12">
						<h2 className="text-2xl md:text-3xl font-medium mb-8 text-center font-fitzgerald uppercase">
							FAQ
						</h2>
						<div className="w-full h-px bg-gray-300"></div>
					</div>

					<div className="space-y-2">
						{faqs.map((faq) => (
							<div key={faq.id} className="border-b border-gray-200">
								<button
									onClick={() => toggleFaq(faq.id)}
									className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
								>
									<div className="flex items-center">
										<span className="text-lg mr-3">{faq.icon}</span>
										<span className="text-gray-800 font-medium font-fitzgerald">{faq.question}</span>
									</div>
									<svg
										className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
											openFaqId === faq.id ? 'rotate-180' : ''
										}`}
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								
								<div
									className={`overflow-hidden transition-all duration-300 ease-in-out ${
										openFaqId === faq.id ? 'max-h-96 pb-6' : 'max-h-0'
									}`}
								>
									<div className="px-8">
										<p className="text-gray-600 leading-relaxed font-fitzgerald">{faq.answer}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-16 bg-cream">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-2xl md:text-3xl font-medium mb-10 font-fitzgerald">
							Ready to Start Your Transformation?
						</h2>
						<button
							onClick={() => (window.location.href = `/checkout/${course.id}`)}
							className="bg-primary hover:bg-gray-100 text-white font-medium px-12 py-4 uppercase text-lg transition-colors duration-200 font-fitzgerald"
						>
							Enroll Now for £{course.price}
						</button>
						<a href="/courses" className="block mt-6 text-primary hover:underline font-fitzgerald">
							Or view all our corses
						</a>
					</div>
				</div>
			</section>

    </div>
  )
}

function ModuleSection({ module, moduleNumber, isLessonCompleted }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-primary text-white text-sm px-2 py-1 rounded font-medium font-fitzgerald">
              Module {moduleNumber}
            </div>
            <div>
              <h3 className="text-lg font-medium text-black mb-1 font-fitzgerald">
                {module.title}
              </h3>
              <p className="text-gray-600 text-sm font-fitzgerald">
                {module.description}
              </p>
              <p className="text-gray-500 text-xs mt-2 font-fitzgerald">
                {module.lessons.length} lessons
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>      
      {isExpanded && (
        <div className="border-t border-gray-300">
          <ul className="divide-y divide-gray-100">
            {module.lessons.map((lesson, index) => (
              <li key={lesson.id} className="hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 font-fitzgerald">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-sm font-fitzgerald">
                        {lesson.title}
                      </h4>
                      <p className="text-gray-600 text-xs mt-1 font-fitzgerald">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-fitzgerald">{lesson.duration}</span>
                    
                    {isLessonCompleted(lesson.id) ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CourseDetails