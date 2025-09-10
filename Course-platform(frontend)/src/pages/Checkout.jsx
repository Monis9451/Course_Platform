import { GoClock } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../pages/Header";

const courseData = {
  1: {
    id: 1,
    title: "Unburdening Trauma: A 6-Week Self-Paced Workshop",
    description: "A transformative journey to heal past wounds and create lasting change",
    duration: "6 weeks",
    price: 75,
    originalPrice: 120,
    image: "/1.png",
    benefits: [
      "Lifetime Access to Workshop",
      "All Workshop Materials & Resources",
      "Email Support from Dr. Samina",
    ]
  },
  2: {
    id: 2,
    title: "Unburdening Love: A 6-Week Self-Paced Workshop",
    description: "Break free from relationship blocks and cultivate healthy love",
    duration: "6 weeks",
    price: 75,
    originalPrice: 120,
    image: "/love_course.png",
    benefits: [
      "Lifetime Access to Workshop",
      "All Workshop Materials & Resources",
      "Email Support from Dr. Samina",
    ]
  },
  3: {
    id: 3,
    title: "Unburdening Love + Trauma: The 12-Week Self-Paced Healing Bundle",
    description: "Complete healing journey combining both transformative courses",
    duration: "12 weeks",
    price: 120,
    originalPrice: 150,
    image: "/3.png",
    benefits: [
      "Lifetime Access to Both Courses",
      "All Workshop Materials & Resources",
      "Email Support from Dr. Samina",
    ]
  }
};

function Checkout() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseId = parseInt(id);
    if (courseData[courseId]) {
      setCourse(courseData[courseId]);
    }
  }, [id]);

  if (!course) {
    return (
      <>
        <Header />
        <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl">
              The Workshop you're looking for doesn't exist.
            </p>
            <Link to="/" className="mt-4 bg-[#B45B29] text-white px-6 py-3 rounded" style={{ cursor: 'pointer' }}>
              Return to Homepage
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
            <Link to={`/thankyou/${course.id}`}>
              <button className="w-full bg-[#B45B29] text-white cursor-pointer p-4 mt-10 mb-5 hover:bg-[#a44d1f] transition flex items-center justify-center gap-4 text-base sm:text-lg font-semibold" style={{ cursor: 'pointer' }}>
                Complete Purchase <FaArrowRight />
              </button>
            </Link>
            <div className="flex flex-col items-center justify-center text-center gap-2 text-sm text-gray-600">
              <p>Secure Payment Processing</p>
              <p>
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Checkout;
