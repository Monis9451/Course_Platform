import React, { useState } from 'react';
import Header from "../pages/Header";
import Footer from '../pages/Footer';

function Support() {
  const [openFaqId, setOpenFaqId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

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

  return (
    <div className="flex flex-col">
      <Header />
      
      {/* Support Center Header */}
      <div className="flex flex-col items-center justify-center bg-[#f7f1e9] h-[350px] text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Support Center</h1>
        <p className="text-gray-700 max-w-xl">
          We're here to help you on your journey. Get in touch with our team or
          browse our frequently asked questions.
        </p>
      </div>      {/* FAQ Section */}
      <div className="py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{faq.icon}</span>
                    <span className="text-gray-800 font-medium text-sm">{faq.question}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
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
                    openFaqId === faq.id ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <div className="px-6">
                    <p className="text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-8 md:px-12 max-w-6xl">
          
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-[#B45B29] mb-6">
              The Mind Planner - Contact Us
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At The Mind Planner, we genuinely value your thoughts and feedback. Whether you have questions, suggestions, or need assistance, we 
              are dedicated to offering the support you deserve. Below are the best ways to reach out for any specific enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Media and Collaboration Enquiries */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#B45B29] mb-4">Media and Collaboration Enquiries</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We're eager to collaborate with mental health services, media professionals and journalists. For all collaboration-related questions or 
                  opportunities, please reach out to:
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">Email:</span>
                  <a href="mailto:info@themindplanner.com" className="text-[#B45B29] hover:underline">
                    info@themindplanner.com
                  </a>
                </div>
              </div>

              {/* General Inquiries */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#B45B29] mb-4">General Inquiries</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Have questions about our products or services? We're here to help. Contact us at:
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">Email:</span>
                  <a href="mailto:info@themindplanner.com" className="text-[#B45B29] hover:underline">
                    info@themindplanner.com
                  </a>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#B45B29] mb-4">Customer Support</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Need assistance with orders, shipping, returns, or anything else? Our Customer Support team is ready to assist:
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="font-medium text-gray-800">Email:</span>
                  <a href="mailto:support@themindplanner.com" className="text-[#B45B29] hover:underline">
                    support@themindplanner.com
                  </a>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your thoughts, questions, and feedback are important to us. We're committed to providing the best support and 
                  look forward to hearing from you!
                </p>
              </div>

              {/* Company Address */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-[#B45B29] mb-4">Company Address</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">The Mind Planner Limited</p>
                  <p>128 City Road, London, United Kingdom, EC1V 2NX</p>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-[#B45B29] mb-4">CONTACT US</h2>
                <p className="text-gray-600">Send us a message and we'll get back to you soon</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#B45B29] mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-cream border-2 border-gray-300 rounded-lg focus:border-[#B45B29] focus:outline-none transition-colors text-gray-800 placeholder-gray-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#B45B29] mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-cream border-2 border-gray-300 rounded-lg focus:border-[#B45B29] focus:outline-none transition-colors text-gray-800 placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#B45B29] mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-cream border-2 border-gray-300 rounded-lg focus:border-[#B45B29] focus:outline-none transition-colors text-gray-800 placeholder-gray-500"
                    placeholder="Your phone number (optional)"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#B45B29] mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-cream border-2 border-gray-300 rounded-lg focus:border-[#B45B29] focus:outline-none transition-colors resize-vertical text-gray-800 placeholder-gray-500"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#B45B29] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#A04A24] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </div>

              </form>
            </div>

          </div>

          {/* Additional Info */}
          <div className="text-center mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[#B45B29] mb-3">
              We're Here to Help
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking for support with our products, interested in collaboration opportunities, or simply want to share your thoughts, 
              we're committed to providing you with the best possible experience. Thank you for being part of The Mind Planner community.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Support;
