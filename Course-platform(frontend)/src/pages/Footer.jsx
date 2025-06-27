import React, { useState } from 'react'
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSignup = (e) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email)
    setEmail('')
    alert('Thank you for subscribing to our newsletter!')
  }

  return (
    <div>      {/* Footer */}
      <footer className="w-full bg-cream text-gray-700">
        <div className="container px-8 md:px-12 max-w-7xl mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            {/* Left Column - Newsletter */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Let's Stay Connected</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Subscribe to our newsletter for expert tips on mental health and self empowerment, plus exclusive updates on new offers, product launches, and more!
              </p>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSignup} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B45B29]"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B45B29]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#B8A082] text-white px-6 py-3 rounded-md font-medium hover:bg-[#A68D6F] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Center Column - Services */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/global-shipping" className="text-[#B45B29] hover:underline">Global Shipping Policy</a></li>
                <li><a href="/privacy-statement" className="text-[#B45B29] hover:underline">Privacy Statement</a></li>
                <li><a href="/refund-policy" className="text-[#B45B29] hover:underline">Refund Policy</a></li>
                <li><a href="/terms" className="text-[#B45B29] hover:underline">Terms & Conditions</a></li>
                <li><a href="/mental-health" className="text-[#B45B29] hover:underline">Mental Health</a></li>
                <li><a href="/tracking" className="text-[#B45B29] hover:underline">Tracking Order</a></li>
              </ul>
            </div>            {/* Right Column - About */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">About The Mind Planner</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/about-founder" className="text-[#B45B29] hover:underline">About the Founder</a></li>
                <li><a href="/customer-reviews" className="text-[#B45B29] hover:underline">Customer Reviews</a></li>
                <li><a href="/support" className="text-[#B45B29] hover:underline">Contact Us</a></li>
                <li><a href="/blogs" className="text-[#B45B29] hover:underline">Blog</a></li>
                <li><a href="/disclaimer" className="text-[#B45B29] hover:underline">Disclaimer</a></li>
              </ul>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-600 hover:text-[#B45B29] transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#B45B29] transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#B45B29] transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div></div>

        </div>        {/* Bottom Section with Copyright */}
        <div className="border-t border-[#5D4037] bg-[#5D4037] text-white py-8">
          <div className="container px-8 md:px-12 max-w-7xl mx-auto">
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-white text-sm">
                © 2025 The Mind Planner
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default Footer