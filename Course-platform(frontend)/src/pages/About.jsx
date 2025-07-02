import React from 'react'
import Header from '../pages/Header'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const About = () => {
  return (
    <div>
        <Header />
        <section className="py-20 bg-cream min-h-screen">
          <div className="container mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="mb-12">
              <h1 className=" text-center text-3xl md:text-4xl font-light text-[#393128] mb-6">
                About the Founder
              </h1>
              {/* Content */}
              <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                  <p className="text-md">
                  Dr. Samina Khatun is a highly trained Counselling Psychologist with 15 years of clinical experience in the mental health field. Registered with the Health and Care Professions Council (HCPC) and the British Psychological Society (BPS), she specialises in the assessment, diagnosis, and treatment of complex PTSD, trauma, depression, anxiety disorders, low self-esteem, self-confidence issues, and relationship difficulties. Throughout her career, Dr. Samina has worked in both the NHS and private practice settings, including at the prestigious Priory in London Harley Street, where she has developed a deep expertise in supporting individuals through their most challenging emotional experiences.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                  <p className="text-md mt-6 md:mt-8">
                  Dr. Samina holds a Professional Doctorate in Counselling Psychology and is committed to delivering high-quality, evidence-based care. With a strong ethical foundation, she ensures that her approach is always centred around the well-being and empowerment of her clients.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                  <p className="text-md mt-6 md:mt-8">
                  Her integrative approach combines an in-depth understanding of human emotions with practical, evidence-based methods. Dr. Samina works with clients to identify and address the subconscious blocks that may be limiting their potential, helping them heal and shift into a more authentic, empowered state. Her focus is on guiding individuals toward lasting personal growth, enabling them to live with greater ease, authenticity, and confidence.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                  <p className="text-md mt-6 md:mt-8">
                  Dr. Samina has developed her first resource—a journal designed with careful consideration and grounded in research. This journal provides practical tools for self-reflection, emotional resilience, and purposeful living, offering invaluable support to individuals on their journey of self-discovery, whether they are navigating personal challenges or seeking to enhance their overall well-being.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8 mb-6 md:mb-8">
                  <p className="text-md mt-6 md:mt-8">
                  Dr. Samina is honoured to offer this journal to those ready for change. She invites readers to embrace their potential and embark on a transformative journey, confident that this tool will serve as a trusted guide on the path to personal mastery, helping them navigate life with renewed confidence and purpose.
                </p>
              </div>


            </div>
          </div>
        </section>
        
              <Footer />
    </div>
  )
}

export default About