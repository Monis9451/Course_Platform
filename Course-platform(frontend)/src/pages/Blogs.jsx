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
              <h1 className="text-4xl md:text-5xl font-light text-[#393128] mb-4">
                FIND YOUR POWER
              </h1>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Blog Post 1 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64">
                  <img 
                    src="//themindplanner.com/cdn/shop/articles/BE4CF26E-F6D3-491F-B003-15DEA88D6CB4_febd69ab-76fe-4096-bbda-4eade5b92110.jpg?v=1741698495&width=1080" 
                    alt="Breaking the Negative Thought Cycle: A Strategy to Reclaim Your Power" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Breaking the Negative Thought Cycle: A Strategy to Reclaim Your Power
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    We all, at times, find ourselves caught in patterns of negative thoughts and emotions. These responses are natural and instinctive, often triggered by...
                  </p>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64">
                  <img 
                    src="//themindplanner.com/cdn/shop/articles/pexels-andrea-kartali-704611888-18145480_f3362a79-4a8a-411a-9cc6-cdb363d74a6e.png?v=1741698536&width=1080" 
                    alt="Embracing Change: Unlocking Growth Through Life's Transitions" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Embracing Change: Unlocking Growth Through Life's Transitions
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    Change is inevitable, but instead of resisting it, we can learn to embrace it as a catalyst for personal growth. Life's transitions—whether expected...
                  </p>
                </div>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64">
                  <img 
                    src="//themindplanner.com/cdn/shop/articles/person-writing-new-year-s-resolutions-journal-with-cup-tea_948103-1231_29783082-af32-4bf4-a4eb-b8f8eb6067f0.png?v=1741698516&width=1080" 
                    alt="Transforming Limiting Beliefs: A Path to Inner Strength" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Mar 11, 2025</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                    Transforming Limiting Beliefs: A Path to Inner Strength
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <span>By Dr. Samina</span> • <span>3 min read</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    Limiting beliefs are those deeply ingrained thoughts that tell us we're not good enough, capable, or deserving of success. They act as invisible...
                  </p>
                </div>
              </article>

            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors">
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