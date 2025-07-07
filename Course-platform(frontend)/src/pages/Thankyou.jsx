import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Course Data
const courseData = {
  1: {
    id: 1,
    title: "Unburdening Trauma: A 6-Week Self-Paced Course",
    description: "A transformative journey to heal past wounds and create lasting change",
    duration: "6 weeks",
    image: "/1.png"
  },
  2: {
    id: 2,
    title: "Unburdening Love: A 6-Week Self-Paced Course",
    description: "Break free from relationship blocks and cultivate healthy love",
    duration: "6 weeks",
    image: "/love_course.png"
  },
  3: {
    id: 3,
    title: "Unburdening Love + Trauma: The 12-Week Self-Paced Healing Bundle",
    description: "Complete healing journey combining both transformative courses",
    duration: "12 weeks",
    image: "/3.png"
  }
};

function ThankYou() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (id) {
      const courseId = parseInt(id);
      if (courseData[courseId]) {
        setCourse(courseData[courseId]);
      }
    } else {
      // Default to course 1 if no ID provided (for backward compatibility)
      setCourse(courseData[1]);
    }
  }, [id]);

  if (!course) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-20">
        <div className="bg-cream rounded-lg shadow-lg p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-6 text-[#70533E]">
            Course Not Found
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            The course you're looking for doesn't exist.
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
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
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
            class="lucide lucide-circle-check-big h-10 w-10 text-green-600"
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
            <a
              href={`/course-content/${course.id}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md bg-[#bd6334] hover:bg-[#a65525] text-white py-6 px-8"
            >
              Start Learning Now
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
                class="lucide lucide-arrow-right ml-2 h-5 w-5"
                data-replit-metadata="client/src/pages/ThankYou.tsx:99:37"
                data-component-name="ArrowRight"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <div>
              <Link to="/">
                <a
                  href="#"
                  className="text-[#bd6334] hover:text-[#a65525] inline-block mt-4"
                >
                  Return to homepage
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
