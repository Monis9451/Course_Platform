import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiUser, FiClock, FiFileText, FiVideo, FiDownload } from 'react-icons/fi'
import { FaCheckCircle, FaHeadphones, FaPencilAlt, FaRegLightbulb } from 'react-icons/fa'
import Header from '../pages/Header'
import { getCourseWithFrontPageContent } from '../api/courseAPI'
import { staticCourseData, sharedStaticContent, isBundleCourse } from '../data/staticCourseData'

const CourseDetails = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  } 

  // Helper function to transform database data to component format
  const transformCourseData = (dbCourse) => {
    console.log('Transforming course data:', dbCourse); // Debug log
    
    if (!dbCourse) {
      console.error('No course data provided to transform');
      return null;
    }

    const frontPageContent = dbCourse.frontPageContent;
    console.log('Front page content:', frontPageContent); // Debug log
    
    // Parse lessons from pricing_details if available
    const lessons = frontPageContent?.pricing_details?.courseDetails?.lessons || dbCourse.moduleNumbers || 20;
    const duration = frontPageContent?.pricing_details?.courseDetails?.duration || frontPageContent?.duration || "6 weeks";
    const instructor = frontPageContent?.pricing_details?.courseDetails?.instructor || frontPageContent?.instructor_info?.name || sharedStaticContent.defaultInstructor;
    
    // Transform testimonials from database format
    const testimonials = (frontPageContent?.testimonials || []).map(t => ({
      text: t.content,
      author: t.name
    }));

    // Transform modules from database format
    const modules = (dbCourse.modules || []).map(module => ({
      id: module.moduleID,
      title: module.title,
      description: module.description
    }));

    console.log('Transformed modules:', modules); // Debug log

    return {
      id: dbCourse.courseID,
      title: dbCourse.title,
      subtitle: frontPageContent?.course_type || "Self-Paced Workshop",
      description: dbCourse.description,
      tagline: "Transform Your Life with Expert Guidance",
      additionalTagline: "Expert-Led Guidance to Transform Your Life",
      fullDescription: frontPageContent?.front_page_description || dbCourse.description,
      instructor: instructor,
      duration: duration,
      lessons: lessons,
      level: sharedStaticContent.defaultFeatures.level,
      price: parseFloat(frontPageContent?.price) || 75,
      featured: true,
      img_src: dbCourse.imageURL || `/course-${dbCourse.courseID}.png`,
      img_alt: `${dbCourse.title} Course`,
      benefits: frontPageContent?.benefits || [],
      modules: modules,
      whyDifferent: frontPageContent?.why_this_course || [],
      testimonials: testimonials,
      bonuses: frontPageContent?.bonuses || sharedStaticContent.defaultWhatIncluded,
      faqs: frontPageContent?.faqs || sharedStaticContent.defaultFaqs
    };
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const courseId = parseInt(id);
        console.log('Fetching course with ID:', courseId); // Debug log
        
        // If it's the bundle course (course 32), use static data
        if (isBundleCourse(courseId)) {
          console.log('Using static data for bundle course'); // Debug log
          setCourse(staticCourseData[courseId]);
          setLoading(false);
          return;
        }

        // For other courses, fetch from database
        console.log('Fetching dynamic course data from database'); // Debug log
        const courseData = await getCourseWithFrontPageContent(courseId);
        console.log('Received course data:', courseData); // Debug log
        
        if (!courseData) {
          console.error('No course data returned from API');
          setError('Course not found');
          setLoading(false);
          return;
        }

        const transformedCourse = transformCourseData(courseData);
        console.log('Transformed course data:', transformedCourse); // Debug log
        
        if (!transformedCourse) {
          setError('Failed to process course data');
          setLoading(false);
          return;
        }

        setCourse(transformedCourse);
        
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message || 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

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

  if (error || !course) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-fitzgerald text-black mb-4">
            {error === 'Course not found' ? 'Workshop Not Found' : 'Error Loading Workshop'}
          </h1>
          <p className="text-gray-600 font-fitzgerald mb-8">
            {error === 'Course not found' 
              ? "The Workshop you're looking for doesn't exist or has been removed."
              : "There was an error loading the workshop. Please try again later."}
          </p>
          <Link to="/courses" className="bg-primary text-white font-fitzgerald px-8 py-3 hover:bg-primary-dark transition-colors" style={{ cursor: 'pointer' }}>
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
            <div className="w-full md:w-2/3 flex flex-col items-center">
              <div className="w-full max-w-md md:w-108 h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img 
                  src={course.img_src} 
                  alt="course image" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-6 mt-auto flex-wrap">
                <span className="flex items-center text-warm-gray text-base font-fitzgerald">
                  <FiClock className="mr-2" />
                  {course.duration}
                </span>
                <span className="flex items-center text-warm-gray text-base font-fitzgerald">
                  <FaHeadphones className="mr-2" />
                  Audio Content
                </span>
                <span className="flex items-center text-warm-gray text-base font-fitzgerald">
                  <FaRegLightbulb className="mr-2" />
                  Exercises
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-fitzgerald font-medium mb-2 text-black">Course Price</h3>
                <div className="text-3xl font-bold text-primary mb-6 font-fitzgerald">£{course.price}.00</div>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center text-black font-fitzgerald">
                    <FiClock className="text-primary mr-2" />
                    Lifetime Access
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FiVideo className="text-primary mr-2" />
                    {course.id === 1 ? "8 Guided Meditations and Visualisations" : `${course.lessons} Guided Lessons`}
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FaHeadphones className="text-primary mr-2" />
                    Audio Meditations
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FiDownload className="text-primary mr-2" />
                    All Workshop Materials & Resources
                  </li>
                  <li className="flex items-center text-black font-fitzgerald">
                    <FiFileText className="text-primary mr-2" />
                    Practical Exercises
                  </li>
                </ul>
              </div>
              <button
                onClick={() => (window.location.href = `/checkout/${course.id}`)}
                className="bg-primary hover:bg-primary-dark text-white font-fitzgerald font-medium px-6 py-3 rounded transition-colors duration-200 w-full mb-3"
              >
                Enrol Now
              </button>
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
                This Workshop is designed to give you lifetime access to transformative materials at an
                affordable price. Whether you're looking to heal from past wounds, improve your
                current relationship, or build a foundation of self-love, this Workshop will guide you every
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
                  style={{ cursor: 'pointer' }}
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
              style={{ cursor: 'pointer' }}
            >
              Enrol Now for £{course.price}
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
