import React from 'react';

const FeedbackInvitation = () => {
  return (
    <div>
      {/* Welcome Content Section */}
      <section className="py-20 bg-cream min-h-screen px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-[#393128] mb-6">
              REFLECTING ON YOUR EXPERIENCE
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
            
            {/* Overview Section */}
            <div>
              <p className="text-md">
                If this workshop supported you in any meaningful way, I would be grateful to hear your 
                reflections. As the creator and clinician behind this work, your experience helps me continue 
                to develop safe, supportive, and effective resources for those navigating trauma. 
              </p>
            </div>

            <div>
              <p className="text-md">
                You're welcome to share as much or as little as you feel comfortable. All feedback is treated 
                with care and confidentiality. 
              </p>
            </div>

            <div>
              <p className="text-md">
                Here are some questions to guide you, if helpful: 
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li className="text-md">What part of the course stood out or supported you most? </li>
                <li className="text-md">Were there moments that felt unclear, challenging, or incomplete?</li>
                <li className="text-md">What do you feel has changed or begun to shift since starting? </li>
              </ul>

              <p className="text-md">
                You may submit anonymously if you prefer. I truly appreciate your time and trust.
              </p>
            </div>

            <div>
              <p className="text-md">
                Healing doesn't mean the past disappears. It means that what once held power over you 
                begins to soften. It means your nervous system learns that it's allowed to rest. It means your 
                story no longer has to stay frozen in the body. 
              </p>
            </div>

            <div>
              <h2 className="text-xl !font-bold text-[#393128] mb-4">With appreciation, <br />Dr. Samina</h2>
            </div>

            {/* Feedback Form Section */}
            <div className="mt-16 pt-12 border-t border-gray-300">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-[#393128] mb-4">Share Your Feedback</h2>
                <p className="text-lg text-[#393128]">
                  Your experience matters. Please take a moment to share your thoughts about this workshop.
                </p>
              </div>
              
              <form className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors text-[#393128] placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors text-[#393128] placeholder-gray-400"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                    OVERALL RATING
                  </label>
                  <select
                    name="rating"
                    className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors text-[#393128]"
                  >
                    <option value="">Please select a rating</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                    WHAT PART OF THE COURSE SUPPORTED YOU MOST?
                  </label>
                  <textarea
                    name="mostHelpful"
                    rows="4"
                    className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors resize-none text-[#393128] placeholder-gray-400"
                    placeholder="Share what resonated with you or helped you the most..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                    AREAS FOR IMPROVEMENT
                  </label>
                  <textarea
                    name="improvements"
                    rows="4"
                    className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors resize-none text-[#393128] placeholder-gray-400"
                    placeholder="Were there moments that felt unclear, challenging, or incomplete?"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                    PERSONAL CHANGES OR SHIFTS
                  </label>
                  <textarea
                    name="personalChanges"
                    rows="4"
                    className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors resize-none text-[#393128] placeholder-gray-400"
                    placeholder="What do you feel has changed or begun to shift since starting this workshop?"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#393128] mb-2 uppercase tracking-wider">
                    ADDITIONAL COMMENTS
                  </label>
                  <textarea
                    name="additionalComments"
                    rows="4"
                    className="w-full px-2 py-3 bg-transparent border-1 border-gray-300 focus:border-[#393128] focus:outline-none transition-colors resize-none text-[#393128] placeholder-gray-400"
                    placeholder="Any other thoughts or feedback you'd like to share..."
                  ></textarea>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    name="anonymous"
                    className="mr-3 h-4 w-4 text-[#393128] focus:ring-[#393128] border-gray-300 rounded"
                  />
                  <label className="text-sm text-[#393128]">
                    Submit this feedback anonymously
                  </label>
                </div>

                <div className="text-center pt-8">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 font-medium text-sm transition-colors duration-200 rounded-lg"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
      <div className="bg-white py-8"></div>
    </div>
  );
};

export default FeedbackInvitation;