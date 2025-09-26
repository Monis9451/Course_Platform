import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourseWithFrontPageContent } from "../api/courseAPI";
import { staticCourseData, isBundleCourse } from "../data/staticCourseData";

function ThankYou() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to transform database course data for thank you page
  const transformCourseForThankYou = (dbCourse) => {
    const frontPageContent = dbCourse.frontPageContent;
    
    return {
      id: dbCourse.courseID,
      title: `${dbCourse.title}: ${frontPageContent?.course_type || "Self-Paced Workshop"}`,
      description: frontPageContent?.front_page_description || dbCourse.description || "A transformative journey of healing and growth",
      duration: frontPageContent?.duration || "6 weeks",
      image: dbCourse.imageURL || `/course-${dbCourse.courseID}.png`
    };
  };

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        console.log('=== THANK YOU PAGE INITIALIZATION ===');
        console.log('Course ID from URL:', id);
        
        setIsLoading(true);
        setError(null);
        
        let courseId;
        
        if (id) {
          courseId = parseInt(id);
          console.log('Parsed course ID:', courseId);
        } else {
          // Default to first individual course if no ID provided
          courseId = 23;
          console.log('No ID provided, defaulting to course 23');
        }
        
        if (isNaN(courseId)) {
          throw new Error('Invalid course ID');
        }

        let courseData;

        // If it's the bundle course, use static data
        if (isBundleCourse(courseId)) {
          console.log('Loading static data for bundle course');
          courseData = {
            id: staticCourseData[courseId].id,
            title: staticCourseData[courseId].title + ": " + staticCourseData[courseId].subtitle,
            description: staticCourseData[courseId].description,
            duration: staticCourseData[courseId].duration,
            image: staticCourseData[courseId].img_src
          };
          console.log('Bundle course data loaded:', courseData);
        } else {
          // For individual courses, fetch from database
          console.log('Fetching individual course data from database...');
          const dbCourse = await getCourseWithFrontPageContent(courseId);
          console.log('Database response:', dbCourse);
          
          if (!dbCourse) {
            throw new Error('Course not found');
          }

          courseData = transformCourseForThankYou(dbCourse);
          console.log('Transformed course data:', courseData);
        }

        setCourse(courseData);
        console.log('Course data set successfully for thank you page');

      } catch (err) {
        console.error('=== THANK YOU PAGE ERROR ===');
        console.error('Error type:', err.constructor.name);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
        
        if (err.message.includes('Course not found')) {
          setError('Course not found');
        } else {
          setError('Failed to load course information');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-20">
        <div className="bg-cream rounded-lg shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B45B29] mb-4 mx-auto"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-20">
        <div className="bg-cream rounded-lg shadow-lg p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-6 text-[#70533E]">
            {error === 'Course not found' ? 'Course Not Found' : 'Error Loading Course'}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {error === 'Course not found' 
              ? "The Workshop you're looking for doesn't exist."
              : "There was an error loading the course information."}
          </p>
          <Link to="/">
            <button className="bg-[#bd6334] hover:bg-[#a65525] text-white py-3 px-6 rounded">
              Return to Homepage
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20">
      <div className="bg-cream rounded-lg shadow-lg p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-cream rounded-full mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-check-big h-10 w-10 text-primary"
            data-replit-metadata="client/src/pages/ThankYou.tsx:50:12"
            data-component-name="CheckCircle"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif mb-6 text-[#70533E]">
          Thank you for your purchase!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          You now have access to {course.title}.
        </p>
        <h2 className="text-xl font-medium mb-4 text-[#70533E]">
          Your Purchase Includes:
        </h2>
        <div className="mb-12">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mr-4">
                <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
              </div>
              <div className="text-left">
                <h3 className="font-medium">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your registered email address
            with all the details.
          </p>
          <div className="space-y-4">
            <div>
              {isBundleCourse(course.id) ? (
                <Link
                  to="/courses"
                  className="text-[#bd6334] hover:text-[#a65525] inline-block mt-4"
                >
                  View All Your Courses
                </Link>
              ) : (
                <Link
                  to={`/course-content/${course.id}`}
                  className="text-[#bd6334] hover:text-[#a65525] inline-block mt-4"
                >
                  Start Your Course
                </Link>
              )}
            </div>
            <div>
              <Link
                to="/my-courses"
                className="text-[#bd6334] hover:text-[#a65525] inline-block mt-4 ml-4"
              >
                Go to My Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
