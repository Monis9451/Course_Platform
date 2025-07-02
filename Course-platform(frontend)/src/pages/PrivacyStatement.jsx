import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

const PrivacyStatement = () => {
  return (
    <div>
        <Header />
        {/* Privacy Statement Content Section */}
        <section className="py-20 bg-cream min-h-screen">
          <div className="container mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-light text-[#393128] mb-6">
                PRIVACY STATEMENT
              </h1>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
              
              {/* Overview Section */}
              <div>
                <h2 className="text-1xl !font-bold text-[#393128] mb-4">Overview</h2>
                <p className="text-md">
                  This Privacy Statement outlines how The Mind Planner collects, uses, and discloses your personal data when you visit or make a 
                  purchase from our website, themindplanner.com (the "Site").
                </p>
              </div>

              {/* Information We Collect Section */}
              <div>
                <h2 className="text-1xl !font-bold text-[#393128] mb-4">Information We Collect</h2>
                
                <div className="mb-6">
                  <span className="text-md !font-bold text-[#393128] mb-3">Device Data:</span>
                  <p className="text-md">
                    When you access the Site, we automatically gather information about your device. This includes details about your web
                    browser, IP address, time zone, and the cookies installed on your device. We also collect data on the specific pages you visit, the sites or
                    search terms that directed you to our Site, and how you interact with our content. This data is referred to as "Device Data."
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-md !font-bold text-[#393128] mb-3">Technologies Used:</h3>
                  <ul className="space-y-4 ml-6">
                    <li className="text-md">
                      <strong className="text-[#393128] !font-bold">Cookies:</strong> Small data files placed on your device that include a unique identifier. For more information about cookies and how to 
                      manage them, visit All About Cookies.
                    </li>
                    <li className="text-md">
                      <strong className="text-[#393128] !font-bold">Log Files:</strong> Track your activities on the Site and collect data such as IP address, browser type, Internet service provider, referring/exit 
                      pages, and time stamps.
                    </li>
                    <li className="text-md">
                      <strong className="text-[#393128] !font-bold">Web Beacons:</strong> Electronic files used to gather information about your browsing activities on the Site.
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-md !font-bold text-[#393128] mb-3">Order Data:</h3>
                  <p className="text-md">
                    When you make or attempt to make a purchase through the Site, we collect information such as your name, billing and 
                    shipping addresses, payment details (including credit card numbers), email address, and phone number. This is known as "Order Data."
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-md !font-bold text-[#393128] mb-3">How We Use Your Data</h3>
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Order Data:</span> We use this information to:</p>
                  
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li className="text-md">Process and fulfil your orders (including payment processing, shipping arrangements, and providing invoices or confirmations).</li>
                    <li className="text-md">Communicate with you regarding your orders.</li>
                    <li className="text-md">Monitor for potential fraud or risks.</li>
                    <li className="text-md">Offer information or promotions related to our products based on your preferences.</li>
                  </ul>
              </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Device Data:</span> We use this information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li className="text-md">Detect and prevent fraud or security issues (particularly through IP addresses).</li>
                    <li className="text-md">Enhance and optimise the Site (by analysing how users interact with it and evaluating the effectiveness of our marketing efforts).</li>
                  </ul>
              </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Sharing Your Data</span></p>
                  <p className="text-md">
                    We share your Personal Data with third parties to assist in using your data as described. For instance, we use Shopify to manage our online store. You can review Shopify's privacy practices here: Shopify Privacy. We also use Google Analytics to understand Site usage, and you can learn more about Google’s data practices here: Google Privacy. You can opt-out of Google Analytics here: Google Analytics Opt-Out.
                  </p>
                  <p className="text-md mt-4 md:mt-5">
                    We may also disclose your Personal Data to comply with legal requirements, respond to legal requests, or protect our rights.
                  </p>
              </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Targeted Advertising</span></p>
                  <p className="text-md">
                    We use your data to deliver targeted ads and marketing communications. For details on how targeted advertising works, visit the Network Advertising Initiative. To opt out of targeted advertising, use the following links:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-3 md:mt-4">
                    <li className="text-md">Facebook: Facebook Ad Settings</li>
                    <li className="text-md">Google: Google Ad Settings</li>
                    <li className="text-md">Bing: Bing Ads Settings</li>
                  </ul>
                  <p className='text-md mt-4 md:mt-5'>
                    You can also manage your preferences through the Digital Advertising Alliance’s Opt-Out Portal.
                  </p>
              </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Do Not Track</span></p>
                  <p className="text-md">
                    Please be aware that our Site does not alter its data collection practices in response to Do Not Track signals from your browser.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Your Rights</span></p>
                  <p className="text-md">
                    If you reside in Europe, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact us using the details below. Note that we process your information to fulfil contracts or for legitimate business interests, and your data may be transferred outside Europe, including to Canada and the United States.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Data Retention</span></p>
                  <p className="text-md">
                    We retain your Order Data as long as necessary to fulfil your orders and comply with legal requirements, unless you request its deletion.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Policy Updates</span></p>
                  <p className="text-md">
                    We may revise this privacy statement periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-md text-[#393128] mb-3"><span className="!font-bold">Contact Us</span></p>
                  <p className="text-md">
                    For more details on our privacy practices, questions, or complaints, please reach out to us at info@themindplanner.com.
                  </p>
                </div>

              </div>

              {/* Contact Information */}
              {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-[#393128] mb-4">
                  Questions About This Privacy Statement?
                </h3>
                <p className="text-[#393128] mb-4">
                  If you have any questions or concerns about how we handle your personal data, please don't hesitate to contact us.
                </p>
                <a 
                  href="/contact" 
                  className="bg-[#B45B29] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A04A24] transition-colors inline-block"
                >
                  Contact Us
                </a>
              </div> */}
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