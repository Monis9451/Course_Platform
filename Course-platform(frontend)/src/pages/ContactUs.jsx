import React, { useState } from 'react';
import Header from "../pages/Header";
import Footer from '../pages/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  return (
    <div className="flex flex-col">
      <Header />
      
      {/* Main Content Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-8 md:px-12 max-w-6xl">
          
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">
              The Mind Programme – Contact Us
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
              At The Mind Planner, we genuinely value your thoughts and feedback. Whether you have questions, suggestions, or need assistance, we 
              are dedicated to offering the support you deserve. Below are the best ways to reach out for any specific enquiries:
            </p>
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            
            {/* Media and Collaboration Enquiries */}
            <div className="mb-8">
              <h3 className="text-lg !font-semibold text-gray-800 mb-3">Media and Collaboration Enquiries</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                We're eager to collaborate with mental health services, media professionals and journalists. For all collaboration-related questions or 
                opportunities, please reach out to:
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> <a href="mailto:info@themindplanner.com" className=" hover:underline">info@themindplanner.com</a>
              </p>
            </div>

            {/* General Inquiries */}
            <div className="mb-8">
              <h3 className="text-lg !font-semibold text-gray-800 mb-3">General Inquiries</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Have questions about our products or services? We're here to help. Contact us at:
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> <a href="mailto:info@themindplanner.com" className="hover:underline">info@themindplanner.com</a>
              </p>
            </div>

            {/* Customer Support */}
            <div className="mb-8">
              <h3 className="text-lg !font-semibold text-gray-800 mb-3">Customer Support</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Need assistance with orders, shipping, returns, or anything else? Our Customer Support team is ready to assist:
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Email:</span> <a href="mailto:support@themindplanner.com" className="hover:underline">support@themindplanner.com</a>
              </p>
              <p className="text-gray-600 leading-relaxed">
                Your thoughts, questions, and feedback are important to us. We're committed to providing the best support and 
                look forward to hearing from you!
              </p>
            </div>

            {/* Company Address */}
            <div className="mb-8">
              <h3 className="text-lg !font-semibold text-gray-800 mb-3">Company Address</h3>
              <div className="text-gray-700">
                <p className="font-medium">The Mind Planner Limited</p>
                <p>128 City Road, London, United Kingdom, EC1V 2NX</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-black mb-4">CONTACT US</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-gray-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-gray-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-gray-600 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">
                MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-gray-600 focus:outline-none transition-colors resize-none text-gray-800 placeholder-gray-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-left pt-8">
              <button
                type="submit"
                className="bg-[#CCBFAF] text-black px-8 py-3 font-medium text-sm hover:bg-[#E0D8CE] transition-colors duration-200"
              >
                Send
              </button>
            </div>

          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactUs;
