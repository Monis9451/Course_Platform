import React from 'react'
import Header from '../pages/Header'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <Header />
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-serif mb-8 text-center">About The Mind Planner</h1>
            <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="/themindplanner primary.png" 
                alt="The Mind Planner" 
                className="rounded-full aspect-square object-cover w-full max-w-xs border-4 border-[#bd6334]/20"
              />
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-serif mb-4">Meet Dr. Samina Khatun</h2>
              <p className="mb-4 text-gray-700">
                Welcome to The Mind Planner. I'm Dr. Samina Khatun, a Clinical Psychologist with over a decade of 
                experience helping people transform their mental health and relationships.
              </p>
              <p className="mb-4 text-gray-700">
                After years of working in clinical practice, I created these courses to make evidence-based 
                psychological strategies accessible to everyone, not just those who can access therapy.
              </p>
              <p className="mb-6 text-gray-700">
                My approach integrates cognitive-behavioral therapy, attachment theory, neuroscience, and mindfulness 
                practices to create comprehensive healing experiences tailored to real-life challenges.
              </p>
              
              <div className="border-l-4 border-[#bd6334] pl-4 italic text-gray-600 mb-6">
                "My mission is to empower you with the psychological tools to transform your emotional patterns, 
                heal from past wounds, and create the life and relationships you truly deserve."
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-serif mb-8 text-center">Our Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-xl mb-3 text-[#bd6334]">Evidence-Based</h3>
              <p className="text-gray-700">
                All our courses are grounded in clinical psychology research and neuroscience, bringing you strategies 
                that have been scientifically validated.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-xl mb-3 text-[#bd6334]">Accessible</h3>
              <p className="text-gray-700">
                Complex psychological concepts are translated into practical, easy-to-understand lessons that you can 
                apply immediately to your daily life.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-xl mb-3 text-[#bd6334]">Transformative</h3>
              <p className="text-gray-700">
                Our focus is on deep, lasting change—not quick fixes. We help you understand the root of your 
                challenges and create sustainable solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif mb-6">Start Your Transformation Today</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you're struggling with trauma, relationship patterns, or simply seeking personal growth, 
            our courses offer a pathway to profound psychological transformation.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-[#bd6334] hover:bg-[#a65525] text-white px-8 py-6 rounded-lg font-medium text-center transition-colors duration-200 inline-block"
            >
              Explore Our Courses
            </Link>
            <Link 
              to="/contact" 
              className="bg-white hover:bg-gray-100 text-[#bd6334] border border-[#bd6334] px-8 py-6 rounded-lg font-medium text-center transition-colors duration-200 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About