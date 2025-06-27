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
      text: "I've been a member of TBM for about four years now, and I can honestly say it has been nothing short of transformational. I'm deeply grateful to this community and the TBM process. It has supported me in ways I can't fully express.",
      rating: 5
    },
    {
      id: 2,
      text: "52 years old, TBM is the most effective, life-changing thing I've ever done. I've gotten all the material items on my list and the personal growth is beyond. I'm obsessed and encourage everyone to check it out.",
      rating: 5
    },
    {
      id: 3,
      text: "TBM has literally shifted EVERYTHING! Life hasn't been the same since I joined- I know it sounds dramatic, but I literally feel like I live in an absolutely different reality and am still trying to adjust and understand. AND my manifestation came through after just 3 weeks of doing the work - I'm still mind blown. It's still all very fresh but definitely better than anything I ever could have dreamed of! THANK YOU TBM!",
      rating: 5
    },
    {
      id: 4,
      text: "This program has completely transformed my relationship with myself and others. The tools and techniques are practical and powerful.",
      rating: 5
    },
    {
      id: 5,
      text: "After years of therapy, this was the breakthrough I needed. The results speak for themselves - my life is completely different now.",
      rating: 5
    },
    {
      id: 6,
      text: "The Mind Planner approach is unlike anything I've tried before. It's backed by real science and delivers real results.",
      rating: 5
    }
  ]

  const faqs = [
    {
      id: 1,
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your membership at any time. A Pathway member who chooses the 12-month payment plan method may cancel their membership within the first 72 hours of enrollment for a $50 cancellation fee. After 72 hours the fee will be cancelled to the remaining cost of their membership agreement. All Lifetime Pathway Membership purchases are Pay in Full Pathway Memberships are final sale & there is no refund or payment plan options.",
      icon: "❌"
    },
    {
      id: 2,
      question: "What if I don't login for an entire month? Can I get a refund for that payment?",
      answer: "Unfortunately, we cannot provide refunds for months when you don't login. Your membership remains active and all content stays accessible to you. We recommend setting reminders to engage with the content regularly to get the most value from your investment.",
      icon: "💡"
    },
    {
      id: 3,
      question: "How often am I billed?",
      answer: "If you choose the monthly payment option, you will be billed automatically every 30 days from your enrollment date. For annual memberships, you'll be billed once per year. All billing is handled securely through our payment processor.",
      icon: "💳"
    },
    {
      id: 4,
      question: "Can I get an extension?",
      answer: "Extensions may be available in certain circumstances. Please contact our support team to discuss your specific situation. We evaluate extension requests on a case-by-case basis, particularly for medical or emergency situations.",
      icon: "📅"
    },
    {
      id: 5,
      question: "Does this membership renew?",
      answer: "Yes, monthly and annual memberships automatically renew unless you cancel before your next billing date. You'll receive email reminders before each renewal. Lifetime memberships do not renew as they provide permanent access.",
      icon: "🔄"
    },
    {
      id: 6,
      question: "What if I want to upgrade to lifetime access?",
      answer: "You can upgrade to lifetime access at any time during your membership. Contact our support team and they'll help you transition to a lifetime membership. Any payments you've already made will be credited toward your lifetime membership cost.",
      icon: "💡"
    }
  ]

  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  const scrollToReview = (index) => {
    if (reviewsRef.current) {
      const reviewWidth = reviewsRef.current.children[0].offsetWidth + 24 // including gap
      reviewsRef.current.scrollTo({
        left: reviewWidth * index,
        behavior: 'smooth'
      })
      setCurrentReviewIndex(index)
    }
  }

  const nextReview = () => {
    const nextIndex = currentReviewIndex === reviews.length - 1 ? 0 : currentReviewIndex + 1
    scrollToReview(nextIndex)
  }

  const prevReview = () => {
    const prevIndex = currentReviewIndex === 0 ? reviews.length - 1 : currentReviewIndex - 1
    scrollToReview(prevIndex)
  }

  const courses = [
    {
      id: 1,
      title: "Understanding Trauma",
      description: "A self-paced program",
      img_src: "/1.png",
      img_alt: "Understanding Trauma Course",
      category: "BUNDLE"
    },
    {
      id: 2,
      title: "Understanding Love",
      description: "A comprehensive guide",
      img_src: "/love_course.png",
      img_alt: "Understanding Love Course",
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
              <blockquote className="text-lg text-gray-800 italic mb-4 leading-relaxed">
                "I didn't believe in manifestation until I found this method. After years of being single and unfulfilled, I manifested my DREAM partner. We are so happy."
              </blockquote>
            </div>

            {/* Center Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="/hero-img.png" 
                  alt="Course Platform" 
                  className="w-full max-w-md h-auto object-contain"
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
              <blockquote className="text-lg text-gray-800 italic mb-4 leading-relaxed">
                "This membership gave me the power to face my fears, quit my job, and start my own business. Now I'm making 10X my old salary!!!"
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
          <p className="text-lg text-warm-gray max-w-4xl mx-auto mb-8 leading-relaxed">
            Backed by evidence-based psychology and neuroscience, these courses are designed to help you overcome challenges, rewire unhelpful patterns, and build a more empowered, fulfilling life. Whether you're working through trauma, low mood and/or anxiety, relationship blocks, or productivity struggles, you'll gain the tools to create lasting change.
          </p>          
          <button className="bg-primary hover-primary text-white px-6 py-2 md:px-8 md:py-3 rounded-4xl text-base md:text-lg font-semibold transition-colors duration-200">
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
      </section>      {/* You Will Overcome Section */}
      <section className="w-full py-16 bg-cream">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-fitzgerald mb-8 text-left">You will overcome...</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>People-pleasing patterns and codependent tendencies</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Difficulties setting healthy boundaries</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Anxiety, self-doubt and imposter syndrome</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Negative thought patterns and self-criticism</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Repeating unhealthy relationship dynamics</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Limiting beliefs that block your potential</span>
                </li>
              </ul>
              
              <h2 className="text-3xl font-fitzgerald mt-10 mb-8 text-left">You will learn...</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>How to identify and heal your core trauma patterns</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Tools to regulate your nervous system and reduce anxiety</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>Techniques to break free from people-pleasing behfaviors</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">•</div>
                  <span>How to build authentic relationships based on trust and respect</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="courses">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-fitzgerald font-light mb-6 text-black leading-tight tracking-tight uppercase">
              Our Courses
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-black/80">
              Developed by Dr. Samina Khatun based on evidence-based therapeutic approaches
            </p>
          </div>          {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {courses.map((course) => (
                <div key={course.id} className="group cursor-pointer">                  <div className="relative mb-4">
                    <div className="h-37 bg-gray-300 flex items-center justify-center overflow-hidden">
                      <img src={course.img_src} alt={course.img_alt} className="object-contain h-full w-full" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-warm-gray text-sm font-normal">{course.description}</p>
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
              
              {/* Button */}
              <button
                onClick={() => window.location.href = "/checkout/1"}
                className="w-full bg-primary text-white py-4 px-6 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                BUY THIS COURSE
              </button>
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
              
              {/* Button */}
              <button
                onClick={() => window.location.href = "/checkout/2"}
                className="w-full bg-primary text-white py-4 px-6 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                BUY THIS COURSE
              </button>
            </div>

            {/* Bundle Offer Card */}
            <div className="bg-white border-2 border-gray-300 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              {/* Crossed out price */}
              <div className="text-lg text-gray-500 line-through mb-2">£240</div>
              
              {/* Actual price */}
              <div className="text-4xl font-bold text-black mb-6">£120</div>
              
              {/* Course type */}
              <div className="text-lg font-semibold text-black mb-6">Complete Bundle</div>
              
              {/* Description */}
              <div className="text-gray-700 mb-8 leading-relaxed h-20 overflow-hidden">
                <div className="line-clamp-3">
                  Get both transformative courses together and save £120. Complete access to trauma healing and relationship transformation programs...
                </div>
              </div>
              
              {/* Button */}
              <button
                onClick={() => window.location.href = "/bundle"}
                className="w-full bg-primary text-white py-4 px-6 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                BUY THIS COURSE
              </button>
            </div>

          </div>
              </div> 
              </section>      {/* Reviews Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-fitzgerald font-light mb-6 text-black leading-tight tracking-tight">
              Let The Reviews Speak For Themselves...
            </h2>
          </div>

          {/* Reviews Container */}
          <div className="relative">
            <div 
              ref={reviewsRef}
              className="flex gap-8 overflow-x-hidden scroll-smooth pb-4  "
            >              {reviews.map((review) => (
                <div key={review.id} className="flex-none w-96 h-96 bg-white p-8 rounded-2xl shadow-lg flex flex-col">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current mx-0.5" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  
                  {/* Review Text - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-gray-800 text-center leading-relaxed text-base">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-12 gap-6">
              <button
                onClick={prevReview}
                className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextReview}
                className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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