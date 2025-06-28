import { GoClock } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../pages/Header";

function Checkout() {
  return (
    <>
      <Header />
      <div className="flex flex-col bg-cream min-h-screen w-full px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mt-12 mb-8 text-center">
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">
            Invest in your personal growth and transformation
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-10 lg:mx-24 mb-10">
          {/* Left Section */}
          <div className="bg-white p-6 sm:p-8 rounded-md flex flex-col">
            <h1 className="text-black text-2xl sm:text-3xl font-bold mb-4">
              Your Course
            </h1>

            {/* Course Row */}
            <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_40px] gap-3 mt-4">
              <img
                src="./1.png"
                alt="Course"
                className="w-full h-full object-contain bg-gray-300 rounded-md"
              />

              <div className="flex flex-col col-span-1">
                <h3 className="text-black font-semibold text-lg sm:text-xl">
                  Unburdening Trauma: A 6-Week Self-Paced Course
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  A transformative journey to heal past wounds and create
                  lasting change
                </p>
                <div className="flex flex-row items-center gap-2 mt-1 text-gray-700">
                  <GoClock />
                  <p className="text-sm">6 weeks</p>
                </div>
              </div>

              <p className="hidden sm:block text-black font-semibold col-span-1 self-center">
                £75.00
              </p>
            </div>

            {/* Divider */}
            <hr className="my-6 border-t border-gray-300" />

            {/* Total */}
            <div className="flex flex-row items-center justify-between text-lg font-bold">
              <h2>Total:</h2>
              <h2>£75.00</h2>
            </div>

            <hr className="my-6 border-t border-gray-300" />

            {/* Coupon */}
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
                <button className="bg-[#393128] text-white px-4 py-3 rounded sm:rounded-r cursor-pointer">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 sm:p-8 rounded-md flex flex-col">
            <h1 className="text-black text-2xl sm:text-3xl font-bold">
              Order Summary
            </h1>

            <div className="flex flex-row items-center justify-between mt-5 text-base sm:text-lg">
              <p>Course Price</p>
              <p>£75.00</p>
            </div>

            <hr className="my-6 border-t border-gray-300" />

            <div className="flex flex-row items-center justify-between text-lg font-bold">
              <h2>Total:</h2>
              <h2>£75.00</h2>
            </div>

            {/* Benefits */}
            <div className="flex flex-col mt-10 gap-3 text-sm sm:text-base">
              {[
                "Lifetime Access to Course",
                "All Course Materials & Resources",
                "Money-Back Guarantee",
              ].map((text, idx) => (
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

            {/* Button */}

            <Link to="/thankyou">
              <button className="w-full bg-[#B45B29] text-white cursor-pointer p-4 mt-10 mb-5 hover:bg-[#a44d1f] transition flex items-center justify-center gap-4 text-base sm:text-lg font-semibold">
                Complete Purchase <FaArrowRight />
              </button>
            </Link>
            {/* Footer Text */}
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
