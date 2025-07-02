import React, { useState } from 'react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
import './Footer.css'

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
      <footer className="w-full bg-cream text-black">
        <hr />
        <div className="container px-1 md:px-1 max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            {/* Left Column - Newsletter */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold text-[#393128] mb-3 font-marcellus">Let's Stay Connected</h3>
              <p className="text-sm text-[#393128] leading-normal mb-4">
                Subscribe to our newsletter for expert tips on mental health and self empowerment, plus exclusive updates on new offers, product launches, and more!
              </p>
              
              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSignup} className="space-y-3 text-sm">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 border border-black bg-cream text-[#393128] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B45B29]"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-black bg-cream text-[#393128] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B45B29]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#CCBFAF] text-black px-6 py-3 font-medium text-lg hover:bg-[#E0D8CE] transition-colors"
                >
                  Subscribe
                </button>
              </form>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3 mt-5">
                <a href="#" className="text-[#393128] hover:text-gray-700 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-[#393128] hover:text-gray-700 transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-[#393128] hover:text-gray-700 transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Center Column - Services */}
            <div className="flex flex-col space-y-4 ml-38">
              <h3 className="text-lg font-bold text-[#393128] mb-5 font-marcellus">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/privacy-statement" className="text-[#393128] hover:underline">Privacy Statement</a></li>
                <li><a href="/mental-health" className="text-[#393128] hover:underline">Mental Health</a></li>
                <li><a href="/disclaimer" className="text-[#393128] hover:underline">Disclaimer</a></li>
              </ul>
            </div>            {/* Right Column - About */}
            <div className="flex flex-col space-y-4 ml-10">
              <h3 className="text-lg font-bold text-[#393128] mb-5 font-marcellus">About The Mind Planner</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="text-[#393128] hover:underline">About The Mind Planner</a></li>
                <li><a href="/support" className="text-[#393128] hover:underline">Contact Us</a></li>
                <li><a href="/blogs" className="text-[#393128] hover:underline">Blog</a></li>
              </ul>
            </div></div>

        </div>        {/* Bottom Section with Copyright */}
        <div className="border-t border-[#393128] bg-[#393128] text-white py-4">
          <div className="container px-8 md:px-12 max-w-7xl mx-auto">
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-white text-sm">
                © 2025 The Mind Pathway
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default Footer