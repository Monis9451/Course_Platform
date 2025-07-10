import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

const Home = () => {
  const navigate = useNavigate()
  const reviewsRef = useRef(null)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const reviews = [
    {
      id: 1,
      text: 'I was lucky enough to be an early user and I can confidently say it\'s not only beautiful, but the content truly resonates.',
      subtext: '"From the moment I opened this journal, I felt a sense of calm and inspiration. The thoughtful prompts guided me through my fears and helped me clarify my vision, turning vague ideas into actionable steps. Each exercise encouraged deep reflection, allowing me to confront what was holding me back and embrace my personal power. I can already tell this is going to be a transformative tool on my journey, and I\'m actually motivated to use it everyday" - Maria, T (Consultant)',
      rating: 5
    },
    {
      id: 2,
      text: 'I had the privilege of being one of the first to use The Unclaimed Power Journal, and it’s honestly been such a powerful experience.',
      subtext: '"The journal’s structure is incredibly thoughtful, helping me reflect on the fears and limiting beliefs I’ve carried for years. Each prompt felt like it was guiding me toward unlocking a part of myself I hadn’t explored before. What really stands out is how practical yet personal it is—the tools are rooted in real strategies but allow for deep, meaningful reflection. It really is more than just a journal and I\'m so grateful to have this" - Anna, P (Legal Assistant)',
      rating: 5
    },
    {
      id: 3,
      text: 'This course has completely transformed my relationship with myself and others. The tools and techniques are practical and powerful.',
      subtext: '"After struggling with anxiety and self-doubt for years, I finally found the breakthrough I needed. The modules on trauma healing opened my eyes to patterns I didn\'t even realize I had. Each lesson built upon the last, creating a comprehensive healing journey that felt both gentle and transformative. I\'m now able to set boundaries, communicate my needs, and feel genuinely confident in who I am." - Sarah, K (Marketing Manager)',
      rating: 5
    },
    {
      id: 4,
      text: 'The Mind Planner approach is unlike anything I\'ve tried before. It\'s backed by real science and delivers real results.',
      subtext: '"What sets this apart from other self-help resources is the depth of psychological insight combined with practical application. Dr. Samina\'s approach helped me understand the root causes of my relationship patterns and gave me concrete tools to create healthier connections. The nervous system regulation techniques alone have been life-changing for managing my stress and emotional responses." - David, R (Software Developer)',
      rating: 5
    },
    {
      id: 5,
      text: 'After years of therapy, this was the breakthrough I needed. The results speak for themselves - my life is completely different now.',
      subtext: '"I\'ve been in therapy for years, but this course gave me practical tools I could use immediately. The way Dr. Samina explains complex psychological concepts in simple terms made everything click. I finally understood why I kept repeating the same patterns and learned how to break free. The inner child work was particularly powerful - I feel like I\'ve reclaimed parts of myself I lost long ago." - Rachel, M (Teacher)',
      rating: 5
    },
    {
      id: 6,
      text: 'This programme has given me the confidence to create the relationships I\'ve always wanted but never thought I deserved.',
      subtext: '"The attachment style module opened my eyes to how my childhood experiences were still controlling my adult relationships. Learning about my avoidant attachment helped me understand why I always pushed people away when they got too close. Now I have tools to stay present and connected, even when my nervous system wants to flee. My relationship with my partner has completely transformed." - Michael, T (Graphic Designer)',
      rating: 5
    }
  ]

  const faqs = [
    {
      id: 1,
      question: "Can I cancel after purchasing? ",
      answer: "Due to the nature of the programme (with immediate access to all materials), cancellations or refunds are not available once your purchase is complete. Please ensure you’re ready to begin before enrolling.",
      icon: "❌"
    },
    {
      id: 2,
      question: "What if I don’t access the material right away? Can I get a refund?",
      answer: "No, refunds are not issued based on usage. You’ll have lifetime access, so you can start whenever it feels right for you.",
      icon: "💡"
    },
    {
      id: 3,
      question: "How often am I billed?",
      answer: "This is a one-time payment only. There are no recurring charges or subscriptions",
      icon: "💳"
    },
    {
      id: 4,
      question: "How much time should I dedicate each week?",
      answer: "Each week includes a core video lesson, reflection exercises, and optional guided practices. Most people spend around 1–2 hours per week, but you’re free to go at your own pace. You can spend more time on any module that resonates — there's no need to rush.",
      icon: "📅"
    },
    {
      id: 5,
      question: "Do I need to be in therapy to do this?",
      answer: "No. You do not need to be in therapy to benefit. However, if you are, this can be a powerful complement to the work you're already doing.",
      icon: "🛋️"
    },
    {
      id: 6,
      question: "Is there support available?",
      answer: "Yes. You’ll be able to email Dr. Samina with questions related to the programme content. Please note this is not a substitute for therapy.",
      icon: "⚙️"
    },
    {
      id: 7,
      question: "How long do I have access?",
      answer: "You’ll receive lifetime access to all materials, so you can revisit them as often as you like, at your own pace.",
      icon: "⏳"
    },
  ]

  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  const scrollToReview = (pageIndex) => {
    if (reviewsRef.current) {
      const container = reviewsRef.current
      const containerWidth = container.offsetWidth
      
      // Scroll to the specific page (pair of reviews)
      const scrollPosition = pageIndex * containerWidth
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentReviewIndex(pageIndex)
    }
  }

  const nextReview = () => {
    const totalPages = Math.ceil(reviews.length / 2)
    const nextIndex = currentReviewIndex === totalPages - 1 ? 0 : currentReviewIndex + 1
    scrollToReview(nextIndex)
  }

  const prevReview = () => {
    const totalPages = Math.ceil(reviews.length / 2)
    const prevIndex = currentReviewIndex === 0 ? totalPages - 1 : currentReviewIndex - 1
    scrollToReview(prevIndex)
  }

  const courses = [
    {
      id: 1,
      title: "Unburdening Trauma",
      description: "A self-paced programme",
      img_src: "/1.png",
      img_alt: "Unburdening Trauma Course",
      category: "COURSE"
    },
    {
      id: 2,
      title: "Unburdening Love",
      description: "A comprehensive guide",
      img_src: "/love_course.png",
      img_alt: "Unburdening Love Course",
      category: "COURSE"
    },
    {
      id: 3,
      title: "Unburdening Love + Trauma Bundle",
      description: "The 12-Week Self-Paced Healing Bundle",
      img_src: "/3.png",
      img_alt: "Course Bundle",
      category: "BUNDLE"
    }
  ];

  return (<div className="min-h-screen bg-cream">
      <Header />
      
      {/* Promotional Banner */}
      <section className="w-full bg-white py-3 border-b border-gray-200 -mt-40 pt-33">
        <div className="container max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-800">
            GET 10% OFF YOUR FIRST ORDER — WEL10 🎁
          </p>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="w-full py-16 bg-cream">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Testimonial */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl text-gray-800 italic mb-4 leading-relaxed">
                "I was lucky enough to be an early user and I can confidently say it’s not only beautiful, but the content truly resonates."
              </blockquote>
              <blockquote className="text-md text-gray-800 italic mb-4 leading-relaxed">
                "From the moment I opened this journal, I felt a sense of calm and inspiration. The thoughtful prompts guided me through my fears and helped me clarify my vision, turning vague ideas into actionable steps. Each exercise encouraged deep reflection, allowing me to confront what was holding me back and embrace my personal power. I can already tell this is going to be a transformative tool on my journey, and I'm actually motivated to use it everyday" - Maria, T (Consultant)
              </blockquote>
            </div>

            {/* Center Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/hero-img.png" 
                  alt="Course Platform" 
                  className="w-96 h-auto object-contain transform scale-125"
                />
              </div>
            </div>

            {/* Right Testimonial */}
            <div className="text-center lg:text-right">
              <div className="flex justify-center lg:justify-end mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl text-gray-800 italic mb-4 leading-relaxed">
                "I had the privilege of being one of the first to use The Unclaimed Power Journal, and it’s honestly been such a powerful experience."
              </blockquote>
              <blockquote className="text-md text-gray-800 italic mb-4 leading-relaxed">
                "The journal’s structure is incredibly thoughtful, helping me reflect on the fears and limiting beliefs I’ve carried for years. Each prompt felt like it was guiding me toward unlocking a part of myself I hadn’t explored before. What really stands out is how practical yet personal it is—the tools are rooted in real strategies but allow for deep, meaningful reflection. It really is more than just a journal and I'm so grateful to have this" - Anna, P (Legal Assistant)
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-4">
            THE #1 PLATFORM FOR PSYCHOLOGICAL TRANSFORMATION
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Mind, Break Barriers, and Unlock Your Full Potential – at Your Own Pace
          </h1>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto mb-8 leading-relaxed">
            Backed by evidence-based psychology and neuroscience, these courses are designed to help you overcome challenges, rewire unhelpful patterns, and build a more empowered, fulfilling life. Whether you're working through trauma, low mood and/or anxiety, relationship blocks, or productivity struggles, you'll gain the tools to create lasting change.
          </p>          
          <button
          onClick={() => window.location.href = "/courses"}
          className="bg-primary hover-primary text-white px-6 py-2 md:px-8 md:py-3 rounded-4xl text-base md:text-lg font-semibold transition-colors duration-200">
            EXPLORE COURSES
          </button>
        </div>

        
            </main>            {/* Feature Section */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Box 1 */}
            <div className="p-10 border border-gray-300 rounded-2xl bg-white shadow-sm">
              <h3 className="font-extrabold text-xl mb-6 uppercase text-black">Complete Transformation</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Access comprehensive modules covering both trauma healing and relationship patterns, designed to address core emotional blocks and create lasting change in your life.
              </p>
            </div>
            
            {/* Box 2 */}
            <div className="p-10 border border-gray-300 rounded-2xl bg-white shadow-sm">
              <h3 className="font-extrabold text-xl mb-6 uppercase text-black">Evidence-Based Approach</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Grounded in clinical psychology, neuroscience, and attachment theory, offering practical tools that blend modern therapy with accessible, everyday applications.
              </p>
            </div>
            
            {/* Box 3 */}
            <div className="p-10 border border-gray-300 rounded-2xl bg-white shadow-sm">
              <h3 className="font-extrabold text-xl mb-6 uppercase text-black">Powerful Exercises</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Discover your authentic self through targeted exercises that release limiting beliefs, heal old wounds, and help you create the life and relationships you truly desire.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* Key Practices Section */}
      <section className="w-full py-16 bg-cream">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-fitzgerald font-light mb-6 text-[#393128] leading-tight tracking-tight">
              Key Practices
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Practice 1 - Embrace Imperfection */}
            <div className="bg-[#ECE7E2] p-4 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-[#393128] mb-4">
                Embrace Imperfection
              </h3>
              <p className="text-[#393128] text-md leading-relaxed text-justify">
                Journaling is not about perfection; it is a space to explore your thoughts and emotions without judgement. The Unclaimed Power Journal helps you reconnect with your true self, embracing the beauty that lies in life's imperfections. Through this practice, you embark on a journey of self awareness and acceptance, gaining deeper insight and returning to the essence of who you are.
              </p>
            </div>

            {/* Practice 2 - Let Go of Control */}
            <div className="bg-[#ECE7E2] p-4 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-[#393128] mb-4">
                Let Go of Control
              </h3>
              <p className="text-[#393128] text-md leading-relaxed text-justify">
                Transform your journaling experience by letting go of rigid structure. Releasing control allows your thoughts and emotions to flow freely, unlocking unexpected insights and fostering self-discovery. Embrace the spontaneity of the process, letting your pen wander and revealing truths beneath the surface. This approach turns journaling into a cathartic and empowering journey.
              </p>
            </div>

            {/* Practice 3 - Commit to Yourself */}
            <div className="bg-[#ECE7E2] p-4 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-[#393128] mb-4">
                Commit to Yourself
              </h3>
              <p className="text-[#393128] text-md leading-relaxed text-justify">
                In the hustle of life, it's easy to lose sight of your own needs and dreams. Committing to yourself is a powerful act of self preservation and self-discovery. By prioritising your growth and well-being, you reclaim your place as the central figure in your own story. The Unclaimed Power Journal encourages you to set aside time for self-reflection, deepening your connection with your authentic self.
              </p>
            </div>

            {/* Practice 4 - Create Space */}
            <div className="bg-[#ECE7E2] p-4 rounded-lg shadow-sm">
              <h3 className="text-2xl font-medium text-[#393128] mb-4">
                Create Space
              </h3>
              <p className="text-[#393128] text-md leading-relaxed text-justify">
                Creating personal space amidst the daily chaos is essential. Establishing a daily journaling ritual allows you to step back and reflect, providing a sanctuary from the constant noise of obligations and daily demands. This intentional pause fosters balance and clarity, helping you reconnect with your inner thoughts and emotions. Over time, this practice cultivates deeper self-awareness and a stronger sense of inner stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="courses">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-fitzgerald font-light mb-6 text-black leading-tight tracking-tight uppercase">
              The Mind Programmes
            </h2>
            <p className="text-xl max-w-xl mx-auto text-black/80">
              Developed by Dr. Samina Khatun based on evidence-based therapeutic approaches
            </p>
          </div>          {/* Course Grid - Aligned with pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {courses.map((course) => (
                <div key={course.id} className="group cursor-pointer">                  
                  <div className="relative mb-6">
                    <div className="h-60 bg-gray-300 flex items-center justify-center overflow-hidden rounded-2xl">
                      <img src={course.img_src} alt={course.img_alt} className="object-cover h-full w-full" />
                    </div>
                    <div className="absolute top-4 right-4">
                      {/* <span className="bg-primary text-white text-sm px-3 py-1 rounded-full font-medium">
                        {course.category}
                      </span> */}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{course.title}</h3>
                    <p className="text-warm-gray text-base font-normal">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>          {/* Course Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {/* Unburdening Trauma Course Card */}
            <div className="bg-white border-2 border-gray-300 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              {/* Crossed out price */}
              <div className="text-lg text-gray-500 line-through mb-2">£120</div>
              
              {/* Actual price */}
              <div className="text-4xl font-bold text-black mb-6">£75</div>
              
              {/* Course type */}
              <div className="text-lg font-semibold text-black mb-6">Unburdening Trauma</div>
              
              {/* Description */}
              <div className="text-gray-700 mb-8 leading-relaxed h-20 overflow-hidden">
                <div className="line-clamp-3">
                  A 6-week self-paced programme designed to help you release trauma patterns, heal emotional wounds, and create lasting transformation...
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.href = "/checkout/1"}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => window.location.href = "/course/1"}
                  className="flex-1 border-2 border-primary text-primary py-3 px-4 rounded-full text-base font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Unburdening Love Course Card */}
            <div className="bg-white border-2 border-gray-300 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              {/* Crossed out price */}
              <div className="text-lg text-gray-500 line-through mb-2">£120</div>
              
              {/* Actual price */}
              <div className="text-4xl font-bold text-black mb-6">£75</div>
              
              {/* Course type */}
              <div className="text-lg font-semibold text-black mb-6">Unburdening Love</div>
              
              {/* Description */}
              <div className="text-gray-700 mb-8 leading-relaxed h-20 overflow-hidden">
                <div className="line-clamp-3">
                  A 6-week self-paced programme focused on healing relationship patterns, breaking cycles of codependency, and creating healthy connections...
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.href = "/checkout/2"}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => window.location.href = "/course/2"}
                  className="flex-1 border-2 border-primary text-primary py-3 px-4 rounded-full text-base font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Bundle Offer Card */}
            <div className="bg-white border-2 border-gray-300 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              {/* Crossed out price */}
              <div className="text-lg text-gray-500 line-through mb-2">£150</div>
              
              {/* Actual price */}
              <div className="text-4xl font-bold text-black mb-6">£120</div>
              
              {/* Course type */}
              <div className="text-lg font-semibold text-black mb-6">Complete Bundle</div>
              
              {/* Description */}
              <div className="text-gray-700 mb-8 leading-relaxed h-20 overflow-hidden">
                <div className="line-clamp-3">
                  The 12-Week Self-Paced Healing Bundle combining both Unburdening Love and Unburdening Trauma for complete transformation...
                </div>
              </div>
              
              {/* Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.href = "/checkout/3"}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => window.location.href = "/course/3"}
                  className="flex-1 border-2 border-primary text-primary py-3 px-4 rounded-full text-base font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  LEARN MORE
                </button>
              </div>
            </div>

          </div>
              </div> 
              </section>      {/* Reviews Section */}
      <section className="pt-24 pb-16" style={{ backgroundColor: '#393128' }}>
        <div className="max-w-7xl mx-auto px-1">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-fitzgerald font-light mb-6 text-white leading-tight tracking-tight">
              Your Journey, Your Words
            </h2>
          </div>

          {/* Reviews Container */}
          <div className="relative">
            <div 
              ref={reviewsRef}
              className="flex overflow-x-hidden scroll-smooth pb-4"
            >              
              {/* Group reviews in pairs and display them */}
              {Array.from({ length: Math.ceil(reviews.length / 2) }, (_, pageIndex) => (
                <div key={pageIndex} className="flex-none w-full flex gap-32 lg:gap-118">
                  {/* Left Review */}
                  {reviews[pageIndex * 2] && (
                    <div className="w-full lg:w-[calc(39%-6rem)] flex flex-col relative pl-0 lg:pl-0">
                      <div className="mb-8">
                        <p className="text-white leading-tight text-xl lg:text-2xl font-medium text-left">
                          "{reviews[pageIndex * 2].text}"
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 text-justify leading-normal text-sm lg:text-base">
                          {reviews[pageIndex * 2].subtext}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Right Review */}
                  {reviews[pageIndex * 2 + 1] && (
                    <div className="w-full lg:w-[calc(39%-6rem)] flex flex-col relative pr-0 lg:pr-0">
                      <div className="mb-8">
                        <p className="text-white text-right leading-tight text-xl lg:text-2xl font-medium">
                          "{reviews[pageIndex * 2 + 1].text}"
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 text-justify leading-normal text-sm lg:text-base">
                          {reviews[pageIndex * 2 + 1].subtext}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-12 gap-6">
              <button
                onClick={prevReview}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 group border border-white/20"
              >
                <svg className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextReview}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 group border border-white/20"
              >
                <svg className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-fitzgerald font-bold text-black mb-4">
              Before purchasing, please review our most common questions on the 12-Month Pathway Membership below...
            </h2>
            <div className="w-full h-px bg-cream mt-8"></div>
          </div>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b bordercream">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-6 flex items-center justify-between text-left hover:bg-white transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{faq.icon}</span>
                    <span className="text-gray-800 font-medium">{faq.question}</span>
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
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home