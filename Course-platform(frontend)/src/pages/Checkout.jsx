import { GoClock } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from "../pages/Header";
import StripePaymentForm from "../components/StripePaymentForm";
import { createPaymentIntent, checkCourseAccess } from "../api/paymentAPI";
import { getCourseWithFrontPageContent } from "../api/courseAPI";
import { staticCourseData, isBundleCourse, getBundleCourseIds } from "../data/staticCourseData";
import { useAuth } from "../context/authContext";
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51RsNCkGvi0rYXYeQadhLnRdb8oIuxZhlFzIBJ7KNHDBDdlvAha26Ol2ujr2aRcI51bcPvWoYdntqilRoQZeg2Zci00K7OgwCCg');

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, authToken, isAdmin } = useAuth();
  const [course, setCourse] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to transform database course data for checkout
  const transformCourseForCheckout = (dbCourse) => {
    console.log('Transforming course data:', dbCourse);
    const frontPageContent = dbCourse.frontPageContent;
    console.log('Front page content:', frontPageContent);
    
    const transformed = {
      id: dbCourse.courseID,
      title: `${dbCourse.title}: ${frontPageContent?.course_type || frontPageContent?.pricing_details?.courseDetails?.course_type || "Self-Paced Workshop"}`,
      description: dbCourse.description || frontPageContent?.front_page_description || "A transformative learning experience",
      duration: frontPageContent?.duration || frontPageContent?.pricing_details?.courseDetails?.duration || "6 weeks",
      price: frontPageContent?.price || frontPageContent?.pricing_details?.price || 75,
      image: dbCourse.imageURL || `/course-${dbCourse.courseID}.png`,
      benefits: [
        "Lifetime Access to Workshop",
        "All Workshop Materials & Resources", 
        "Email Support from Dr. Samina"
      ]
    };
    
    console.log('Transformed course data:', transformed);
    return transformed;
  };

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        console.log('=== CHECKOUT INITIALIZATION START ===');
        console.log('Course ID from URL params:', id);
        console.log('Current user:', currentUser);
        console.log('Auth token exists:', !!authToken);
        console.log('Is admin:', isAdmin);
        
        setIsLoading(true);
        setError(null);
        
        const courseId = parseInt(id);
        console.log('Parsed course ID:', courseId);
        
        if (isNaN(courseId)) {
          throw new Error('Invalid course ID');
        }
        
        let courseData;

        // If it's the bundle course (course 3), use static data
        if (isBundleCourse(courseId)) {
          console.log('Using static data for bundle course');
          courseData = {
            id: staticCourseData[courseId].id,
            title: staticCourseData[courseId].title + ": " + staticCourseData[courseId].subtitle,
            description: staticCourseData[courseId].description,
            duration: staticCourseData[courseId].duration,
            price: staticCourseData[courseId].price,
            originalPrice: staticCourseData[courseId].originalPrice,
            image: staticCourseData[courseId].img_src,
            benefits: [
              "Lifetime Access to Both Courses",
              "All Workshop Materials & Resources",
              "Email Support from Dr. Samina",
            ]
          };
          console.log('Bundle course data:', courseData);
        } else {
          // For other courses, fetch from database
          console.log('Fetching course data from database...');
          try {
            const dbCourse = await getCourseWithFrontPageContent(courseId);
            console.log('Database course response:', dbCourse);
            
            if (!dbCourse) {
              throw new Error('Course not found in database');
            }

            courseData = transformCourseForCheckout(dbCourse);
            console.log('Transformed course data:', courseData);
          } catch (apiError) {
            console.error('API Error details:', apiError);
            throw new Error(`Failed to load course data: ${apiError.message}`);
          }
        }

        setCourse(courseData);
        console.log('Course data set successfully');

        // Check if user is logged in
        if (!currentUser || !authToken) {
          console.log('User not logged in - redirecting to login');
          toast.error('Please log in to purchase a course');
          navigate('/login');
          return;
        }

        // Admin should have direct access
        if (isAdmin) {
          console.log('Admin access granted');
          toast.success('Admin access granted');
          navigate(`/course-content/${courseId}`);
          return;
        }

        // Check if user already has access to the course(s)
        console.log('Checking course access...');
        let hasAccessToCourse = false;
        
        try {
          if (isBundleCourse(courseId)) {
            // For bundle course, check access to both individual courses
            console.log('Checking bundle course access');
            const bundleCourseIds = getBundleCourseIds();
            console.log('Bundle course IDs:', bundleCourseIds);
            
            const accessChecks = await Promise.all(
              bundleCourseIds.map(id => {
                console.log(`Checking access for course ${id}`);
                return checkCourseAccess(id, authToken);
              })
            );
            console.log('Bundle access checks results:', accessChecks);
            hasAccessToCourse = accessChecks.every(check => check.hasAccess);
          } else {
            // For individual courses
            console.log(`Checking access for individual course ${courseId}`);
            const accessCheck = await checkCourseAccess(courseId, authToken);
            console.log('Individual course access check:', accessCheck);
            hasAccessToCourse = accessCheck.hasAccess;
          }
          
          console.log('User has access to course:', hasAccessToCourse);
        } catch (accessError) {
          console.error('Error checking course access:', accessError);
          // Don't fail the entire checkout if access check fails, just assume no access
          hasAccessToCourse = false;
        }

        if (hasAccessToCourse) {
          console.log('User already has access - showing access message');
          setHasAccess(true);
          setIsLoading(false);
          return;
        }

        // Create payment intent
        console.log('Creating payment intent...');
        console.log('Payment details:', {
          amount: courseData.price * 100,
          currency: 'gbp',
          title: courseData.title,
          hasAuthToken: !!authToken
        });
        
        try {
          const metadata = {};
          
          // Add course IDs to metadata for backend processing
          if (isBundleCourse(courseId)) {
            metadata.courseIds = getBundleCourseIds(); // [23, 30]
            metadata.isBundle = true;
          } else {
            metadata.courseIds = [courseId];
            metadata.isBundle = false;
          }
          
          console.log('Payment metadata:', metadata);
          
          const paymentData = await createPaymentIntent(
            courseData.price * 100, // Convert to cents
            'gbp',
            courseData.title,
            authToken,
            metadata
          );
          
          console.log('Payment intent created successfully:', paymentData);
          setClientSecret(paymentData.clientSecret);
          setShowPayment(true);
        } catch (paymentError) {
          console.error('Payment intent creation failed:', paymentError);
          throw new Error(`Payment initialization failed: ${paymentError.message}`);
        }

      } catch (err) {
        console.error('=== CHECKOUT INITIALIZATION ERROR ===');
        console.error('Error type:', err.constructor.name);
        console.error('Error message:', err.message);
        console.error('Full error:', err);
        console.error('Stack trace:', err.stack);
        
        if (err.message.includes('Failed to load course data')) {
          setError('Error loading course information');
        } else if (err.message.includes('Payment initialization failed')) {
          setError('Failed to initialize payment');
        } else if (err.message.includes('Invalid course ID')) {
          setError('Invalid course ID');
        } else {
          setError(`Checkout error: ${err.message}`);
        }
        
        toast.error(err.message || 'Failed to initialize checkout');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCheckout();
  }, [id, currentUser, authToken, isAdmin, navigate]);

  const handleCompletePurchase = async () => {
    if (!currentUser || !authToken) {
      toast.error('Please log in to continue');
      return;
    }

    try {
      setIsLoading(true);
      
      const metadata = {};
      
      if (isBundleCourse(course.id)) {
        // Bundle course payment logic - will enroll user in courses 23 and 30
        metadata.courseIds = getBundleCourseIds(); // [23, 30]
        metadata.isBundle = true;
        
        const paymentData = await createPaymentIntent(
          course.price * 100, // Convert to cents  
          'gbp',
          `Bundle: ${course.title}`,
          authToken,
          metadata
        );
        setClientSecret(paymentData.clientSecret);
      } else {
        // Individual course payment
        metadata.courseIds = [course.id];
        metadata.isBundle = false;
        
        const paymentData = await createPaymentIntent(
          course.price * 100, // Convert to cents
          'gbp', 
          course.title,
          authToken,
          metadata
        );
        setClientSecret(paymentData.clientSecret);
      }
      
      setShowPayment(true);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error(error.message || 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    toast.success('Payment successful!');
    
    // Navigate to thank you page with course ID
    navigate(`/thankyou/${course.id}`);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error('Payment failed. Please try again.');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B45B29] mb-4"></div>
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!course || error) {
    return (
      <>
        <Header />
        <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              {error === 'Course not found' ? 'Course Not Found' : 'Error Loading Course'}
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl">
              {error === 'Course not found' 
                ? "The Workshop you're looking for doesn't exist."
                : "There was an error loading the course. Please try again later."}
            </p>
            <Link to="/courses" className="mt-4 bg-[#B45B29] text-white px-6 py-3 rounded" style={{ cursor: 'pointer' }}>
              Browse All Courses
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (hasAccess) {
    return (
      <>
        <Header />
        <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              You Already Have Access!
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl mb-6">
              {isBundleCourse(course.id) 
                ? "You already have access to both courses in this bundle."
                : "You already have access to this course."}
            </p>
            {isBundleCourse(course.id) ? (
              <Link to="/courses" className="bg-[#B45B29] text-white px-6 py-3 rounded mr-4" style={{ cursor: 'pointer' }}>
                View All Courses
              </Link>
            ) : (
              <Link to={`/course-content/${course.id}`} className="bg-[#B45B29] text-white px-6 py-3 rounded mr-4" style={{ cursor: 'pointer' }}>
                Go to Course
              </Link>
            )}
            <Link to="/courses" className="bg-gray-600 text-white px-6 py-3 rounded" style={{ cursor: 'pointer' }}>
              Browse Other Courses
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">
            Invest in your personal growth and transformation
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-10 lg:mx-24 mb-10">
          <div className="bg-white p-6 sm:p-8 rounded-md flex flex-col">
            <h1 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Your Workshop
            </h1>
            <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_40px] gap-3 mt-4">
              <img
                src={course.image}
                alt="Workshop"
                className="w-full h-full object-contain bg-gray-300 rounded-md"
              />
              <div className="flex flex-col col-span-1">
                <h3 className="text-black font-semibold text-lg sm:text-xl">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {course.description}
                </p>
                <div className="flex flex-row items-center gap-2 mt-1 text-gray-700">
                  <GoClock />
                  <p className="text-sm">{course.duration}</p>
                </div>
              </div>
              <p className="hidden sm:block text-black font-semibold col-span-1 self-center">
                £{course.price}.00
              </p>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-row items-center justify-between text-lg font-bold">
              <h2>Total:</h2>
              <h2>£{course.price}.00</h2>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-col">
              <h2 className="text-black font-semibold text-xl">
                Have a Coupon?
              </h2>
              <div className="flex flex-col sm:flex-row mt-6 mb-6 gap-3">
                <input
                  className="w-full border border-gray-300 p-3 rounded sm:rounded-l"
                  placeholder="Enter a Coupon Code"
                  type="text"
                />
                <button className="bg-[#393128] text-white px-4 py-3 rounded sm:rounded-r cursor-pointer" style={{ cursor: 'pointer' }}>
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-md flex flex-col">
            <h1 className="text-black text-2xl sm:text-3xl font-bold">
              Order Summary
            </h1>
            <div className="flex flex-row items-center justify-between mt-5 text-base sm:text-lg">
              <p>Course Price</p>
              <p>£{course.price}.00</p>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-row items-center justify-between text-lg font-bold">
              <h2>Total:</h2>
              <h2>£{course.price}.00</h2>
            </div>
            <div className="flex flex-col mt-10 gap-3 text-sm sm:text-base">
              {course.benefits.map((text, idx) => (
                <div key={idx} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            {showPayment && clientSecret ? (
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  clientSecret={clientSecret}
                  courseId={course.id}
                  courseTitle={course.title}
                  amount={course.price}
                  authToken={authToken}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            ) : (
              <button 
                onClick={handleCompletePurchase}
                disabled={isLoading}
                className="w-full bg-[#B45B29] text-white cursor-pointer p-4 mt-10 mb-5 hover:bg-[#a44d1f] transition flex items-center justify-center gap-4 text-base sm:text-lg font-semibold disabled:opacity-50" 
                style={{ cursor: 'pointer' }}
              >
                {isLoading ? 'Loading...' : 'Complete Purchase'} <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Checkout;
