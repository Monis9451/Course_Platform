import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

const PrivacyStatement = () => {
  return (
    <div>
        <Header />
        {/* Privacy Statement Content Section */}
        <section className="py-16 bg-cream min-h-screen">
          <div className="container mx-auto px-8 md:px-12 max-w-4xl">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-[#B45B29] mb-6">
                PRIVACY STATEMENT
              </h1>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
              
              {/* Overview Section */}
              <div>
                <h2 className="text-2xl font-semibold text-[#B45B29] mb-4">Overview</h2>
                <p className="text-lg">
                  This Privacy Statement outlines how The Mind Planner collects, uses, and discloses your personal data when you visit or make a 
                  purchase from our website, themindplanner.com (the "Site").
                </p>
              </div>

              {/* Information We Collect Section */}
              <div>
                <h2 className="text-2xl font-semibold text-[#B45B29] mb-4">Information We Collect</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Device Data:</h3>
                  <p className="text-lg">
                    When you access the Site, we automatically gather information about your device. This includes details about your web 
                    browser, IP address, time zone, and the cookies installed on your device. We also collect data on the specific pages you visit, the sites or 
                    search terms that directed you to our Site, and how you interact with our content. This data is referred to as "Device Data."
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Technologies Used:</h3>
                  <ul className="space-y-4 ml-6">
                    <li className="text-lg">
                      <strong className="text-[#B45B29]">Cookies:</strong> Small data files placed on your device that include a unique identifier. For more information about cookies and how to 
                      manage them, visit All About Cookies.
                    </li>
                    <li className="text-lg">
                      <strong className="text-[#B45B29]">Log Files:</strong> Track your activities on the Site and collect data such as IP address, browser type, Internet service provider, referring/exit 
                      pages, and time stamps.
                    </li>
                    <li className="text-lg">
                      <strong className="text-[#B45B29]">Web Beacons:</strong> Electronic files used to gather information about your browsing activities on the Site.
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Order Data:</h3>
                  <p className="text-lg">
                    When you make or attempt to make a purchase through the Site, we collect information such as your name, billing and 
                    shipping addresses, payment details (including credit card numbers), email address, and phone number. This is known as "Order Data."
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#B45B29] mb-4">
                  Questions About This Privacy Statement?
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions or concerns about how we handle your personal data, please don't hesitate to contact us.
                </p>
                <a 
                  href="/contact" 
                  className="bg-[#B45B29] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A04A24] transition-colors inline-block"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* White space separator */}
        <div className="bg-white py-8"></div>

        <Footer />
    </div>
  )
}

export default PrivacyStatement