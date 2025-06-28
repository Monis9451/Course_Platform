import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Blogs = () => {
  return (
    <div>
        <Header />
        
        {/* Blog Section */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-8 md:px-12 max-w-7xl">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-light text-[#B45B29] mb-4">
                FIND YOUR POWER
              </h1>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Blog Post 1 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-200">
                  <img 
                    src="/public/1.png" 
                    alt="Breaking the Negative Thought Cycle" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#B45B29] font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Breaking the Negative Thought Cycle: A Strategy to Reclaim Your Power
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We all, at times, find ourselves caught in patterns of negative thoughts and emotions. These responses are natural and instinctive, often triggered by...
                  </p>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-200">
                  <img 
                    src="/public/3.png" 
                    alt="Embracing Change" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#B45B29] font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Embracing Change: Unlocking Growth Through Life's Transitions
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Change is inevitable, but instead of resisting it, we can learn to embrace it as a catalyst for personal growth. Life's transitions—whether expected...
                  </p>
                </div>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-rose-100 to-pink-200">
                  <img 
                    src="/public/love_course.png" 
                    alt="Transforming Limiting Beliefs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#B45B29] font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Transforming Limiting Beliefs: A Path to Inner Strength
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Limiting beliefs are those deeply ingrained thoughts that tell us we're not good enough, capable, or deserving of success. They act as invisible...
                  </p>
                </div>
              </article>

            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-[#B45B29] text-white px-8 py-3 rounded-full font-medium hover:bg-[#A04A24] transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>
        
        {/* White space separator */}
        <div className="bg-white py-8"></div>
            
        <Footer />
    </div>
  )
}

export default Blogs