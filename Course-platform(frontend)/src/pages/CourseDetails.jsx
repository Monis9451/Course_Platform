import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiUser, FiClock } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../pages/Header'

// Course data with new content structure
const dummyCoursesData = {
  1: {
    id: 1,
    title: "Unburdening Trauma",
    subtitle: "A 6-Week Self-Paced Programme",
    description: "Break Emotional Cycles, Reclaim Peace & Rewire Your Response to Pain",
    tagline: "Transform Your Life from Within in Just 6 Weeks",
    additionalTagline: "Accessible, Expert-Led Guidance to Heal and Build Emotional Freedom",
    fullDescription: "Are you ready to stop reliving your pain and start healing from it? Whether you're struggling with anxiety, emotional overwhelm, or feeling stuck in repeating patterns, this 6-week self-paced programme will guide you through deep emotional healing, body-based regulation, and practical tools for lasting change. Led by a trauma-informed psychologist, Unburdening Trauma is a powerful journey designed to help you reconnect with your body, release emotional baggage, and transform your inner world, so you can move forward with clarity, peace, and resilience.",
    instructor: "Dr. Samina Khatun",
    duration: "6 weeks",
    lessons: 24,
    level: "ALL LEVELS",
    price: 75,
    featured: true,
    img_src: "/love_course.png",
    img_alt: "Unburdening Trauma Course",
    benefits: [
      "Understand Trauma in the Body: Learn why trauma gets stored and how to gently release it through body-based awareness.",
      "Reclaim Inner Safety: Cultivate a felt sense of safety, presence, and connection within yourself.",
      "Heal the Inner Child: Address emotional wounds rooted in childhood experiences.",
      "Transform Limiting Beliefs: Shift self-sabotaging thought patterns into supportive, empowering ones.",
      "Let Go of Emotional Baggage: Release what you've been holding onto so you can finally feel lighter.",
      "Anchor Lasting Healing: Build practices that support ongoing growth, self-love, and emotional resilience."
    ],
    modules: [
      {
        id: 1,
        title: "Understanding Trauma & the Body",
        description: "Why We Get Stuck in Pain – and How Awareness Sets Us Free"
      },
      {
        id: 2,
        title: "Reconnecting with the Body",
        description: "Coming Back to Yourself – Safety, Sensation, and Presence"
      },
      {
        id: 3,
        title: "Inner Child Healing",
        description: "Reclaiming the Parts of You That Still Hurt"
      },
      {
        id: 4,
        title: "Rewriting the Story",
        description: "Challenging Limiting Beliefs and Thought Loops"
      },
      {
        id: 5,
        title: "Releasing Emotional Baggage",
        description: "Letting Go of What You've Been Carrying"
      },
      {
        id: 6,
        title: "Integration & Forward Momentum",
        description: "Staying Connected to Growth, Resilience, and Self-Love"
      }
    ],
    whyDifferent: [
      {
        title: "Expert-Led",
        description: "Created by a trauma-informed psychologist with years of experience supporting emotional healing and nervous system regulation."
      },
      {
        title: "Affordable",
        description: "Access the depth of therapeutic techniques without the cost of private therapy sessions."
      },
      {
        title: "Self-Paced",
        description: "Go through the modules in your own time with lifetime access, so you can return whenever needed."
      },
      {
        title: "Personal Support",
        description: "Reach out via email for guidance and support throughout the course."
      }
    ],
    testimonials: [
      {
        text: "I didn't realise how disconnected I was from my body until this course. It taught me how to feel again — safely.",
        author: "Leah T."
      },
      {
        text: "The inner child work was so powerful. For the first time, I felt compassion for myself instead of shame.",
        author: "David R."
      }
    ],
    bonuses: [
      "Voice-Led Structured Programme: Be guided by Dr. Samina as she walks you through each module with clarity and compassion.",
      "Exclusive Meditations & Visualisations: Deepen your healing with supportive audio practices throughout the journey.",
      "Downloadable Materials: Access printable worksheets, reflection tools, and healing exercises to track your progress.",
      "Journal Prompts & Body-Based Practices: Build awareness and transformation with carefully designed, trauma-informed exercises."
    ],
    faqs: [
      {
        id: 1,
        question: "Is there a refund policy for this course?",
        answer: "Due to the nature of the course, refunds are not available. Once purchased, you'll receive immediate access to all content. This programme is built to create meaningful transformation — if you commit to it, the results will follow.",
        icon: "💰"
      },
      {
        id: 2,
        question: "Do I need to be in therapy to take this course?",
        answer: "Not at all. This course is designed for anyone seeking to process and heal trauma. It can also complement your work in therapy if you're currently seeing a professional.",
        icon: "🧠"
      },
      {
        id: 3,
        question: "Is this course suitable for people with no prior healing experience?",
        answer: "Yes. Whether you're just beginning your healing journey or have done work before, this course provides accessible yet powerful tools for all levels.",
        icon: "🌱"
      },
      {
        id: 4,
        question: "How long will I have access to the materials?",
        answer: "You'll have lifetime access to all modules, audio practices, and downloads.",
        icon: "⏰"
      },
      {
        id: 5,
        question: "Is there support available during the course?",
        answer: "Yes! You can contact Dr. Samina via email for any programme-related questions or clarification. Please note this is not a substitute for therapy. For clinical or personalised support, we recommend working with a licensed therapist.",
        icon: "💬"
      }
    ]
  },
  2: {
    id: 2,
    title: "Unburdening Love",
    subtitle: "A 6-Week Self-Paced Course",
    description: "Break Free from Relationship Blocks and Cultivate Healthy Love",
    tagline: "Transform Your Relationships in Just 6 Weeks",
    additionalTagline: "Affordable, Expert-Led Guidance to Heal and Thrive in Love",
    fullDescription: "Are you ready to break free from the emotional blocks holding you back in love? Whether you're single, in a relationship, or navigating a marriage, this 6-week self-paced course will help you release deep-seated barriers, heal past wounds, and cultivate healthy, lasting love. Led by an experienced psychologist, Unburdening Love is a transformative programme designed to help you uncover the roots of your relationship struggles and provide you with the tools to create healthier, more fulfilling connections with yourself and others.",
    instructor: "Dr. Samina Khatun",
    duration: "6 weeks",
    lessons: 20,
    level: "ALL LEVELS",
    price: 75,
    featured: true,
    img_src: "/love_course.png",
    img_alt: "Unburdening Love Course",
    benefits: [
      "Release Deep-Seated Love Blocks: Understand and heal the emotional patterns preventing you from experiencing healthy love.",
      "Heal Past Wounds: Address past hurts and traumas that continue to impact your relationships.",
      "Understand Yourself and Others: Gain deeper insight into your emotional triggers, attachment styles, and patterns.",
      "Create Healthy Relationships: Learn actionable tools to build stronger, more conscious relationships."
    ],
    modules: [
      {
        id: 1,
        title: "Healing the Roots of Attachment",
        description: "Explore how early experiences shape your approach to love and relationships."
      },
      {
        id: 2,
        title: "The Hidden Wounds of Love",
        description: "Uncover emotional baggage and limiting beliefs that may be holding you back."
      },
      {
        id: 3,
        title: "Understanding Triggers & Nervous System Responses",
        description: "Learn how past wounds affect your emotional reactions and how to regulate them."
      },
      {
        id: 4,
        title: "Honouring Your Needs",
        description: "Reclaim your voice, set boundaries, and create emotional safety in relationships."
      },
      {
        id: 5,
        title: "Rewriting the Love Story",
        description: "Shift relationship patterns and choose love from a place of self-worth and wholeness."
      },
      {
        id: 6,
        title: "Integrating Healing into Life",
        description: "Anchor your healing and sustain healthy love in your everyday interactions."
      }
    ],
    whyDifferent: [
      {
        title: "Expert-Led",
        description: "Designed by a licensed psychologist with years of experience in relationship therapy, this course combines science-backed methods for deep healing."
      },
      {
        title: "Affordable",
        description: "High-quality, transformative material without the hefty price tag of therapy or one-on-one coaching."
      },
      {
        title: "Self-Paced",
        description: "Complete the modules at your own pace with lifetime access to all materials, so you can return to them whenever you need."
      },
      {
        title: "Personal Support",
        description: "Have your questions answered and get the support you need via email throughout the course."
      }
    ],
    testimonials: [
      {
        text: "I had no idea how much I was carrying from my childhood and past relationships. This course helped me see it and, more importantly, let it go.",
        author: "Sarah M."
      },
      {
        text: "The exercises helped me realize my own attachment style and how it was affecting my relationship. I'm now communicating better and feeling more secure in love.",
        author: "James L."
      }
    ],
    bonuses: [
      "Voice-Led Structured Programme: Follow a guided, step-by-step journey led by Dr. Samina to help you navigate each module with ease and clarity.",
      "Visualisation & Meditations: Access exclusive visualisations and meditations led by Dr. Samina to support your healing and transformation process.",
      "Downloadable Materials: Receive printable worksheets, assessment tools, and exercises to deepen your learning and track your progress throughout the course.",
      "Exclusive Prompts & Exercises: Engage with thoughtfully designed exercises to help you reflect, heal, and create lasting change in your relationships."
    ],
    faqs: [
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
  }
}

const CourseDetails = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

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
      </div>

      {/* Hero Section */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-fitzgerald font-medium mb-6 leading-tight text-center">
              {course.title}: {course.subtitle}
            </h1>
            <h2 className="text-xl md:text-2xl text-black mb-8 text-center font-fitzgerald">
              {course.description}
            </h2>
            <p className="text-lg text-warm-gray mb-8 text-center font-fitzgerald max-w-4xl mx-auto">
              {course.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-12 text-center text-primary font-fitzgerald uppercase">
              What You'll Gain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-cream rounded-lg">
                  <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-warm-gray font-fitzgerald">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Info Section */}
      <section className="bg-cream py-12 md:py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left: Image + Info */}
            <div className="w-full md:w-2/3 flex flex-col items-center">
              {/* Course Image Container */}
              <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img 
                  src="/3.png" 
                  alt="course image" 
                  className="w-full h-full object-cover"
                />
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
                    {course.lessons} Video Lessons
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
      </section>

      {/* Course Modules */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-fitzgerald text-black mb-12 text-center">Course Modules</h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {course.modules.map((module, moduleIndex) => (
              <ModuleSection 
                key={module.id} 
                module={module} 
                moduleNumber={moduleIndex + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why This Course Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center text-primary font-fitzgerald uppercase">
              Why This Course?
            </h2>
            <h3 className="text-xl font-medium mb-12 text-center text-black font-fitzgerald">
              Why "{course.title}" Is Different:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {course.whyDifferent.map((item, index) => (
                <div key={index} className="bg-cream p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-4 text-black font-fitzgerald">
                    {item.title}
                  </h3>
                  <p className="text-warm-gray font-fitzgerald">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center font-fitzgerald uppercase">
              Testimonials
            </h2>
            <h3 className="text-xl font-medium mb-12 text-center text-black font-fitzgerald">
              Real Stories from Real Students
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {course.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-warm-gray mb-6 italic font-fitzgerald">
                    "{testimonial.text}"
                  </p>
                  <p className="font-medium text-black font-fitzgerald">— {testimonial.author}</p>
                </div>
              ))}
            </div>

            {/* Get Instant Access Section */}
            <div className="text-center bg-cream p-8 rounded-lg">
              <h3 className="text-2xl font-medium mb-4 text-black font-fitzgerald">
                Get Instant Access for Just £{course.price}
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

      {/* Bonuses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-12 text-center text-primary font-fitzgerald uppercase">
              What's Included
            </h2>
            <div className="space-y-6">
              {course.bonuses.map((bonus, index) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-cream rounded-lg">
                  <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-warm-gray font-fitzgerald">{bonus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center font-fitzgerald uppercase">
              FAQ
            </h2>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <div className="space-y-2">
            {course.faqs.map((faq) => (
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
              Or view all our courses
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

function ModuleSection({ module, moduleNumber }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-300">
      <div className="p-6">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
