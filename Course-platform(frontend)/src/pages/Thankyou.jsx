import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
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
          You now have access to Unburdening Trauma: A 6-Week Self-Paced Course.
        </p>
        <h2 className="text-xl font-medium mb-4 text-[#70533E]">
          Your Purchase Includes:
        </h2>
        <div className="mb-12">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mr-4">
                <img src="" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">
                  Unburdening Trauma: A 6-Week Self-Paced Course
                </h3>
                <p className="text-sm text-gray-600">
                  A transformative journey to heal past wounds and create
                  lasting change
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
              href="/course-content/1"
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
