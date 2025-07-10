import React from 'react'
import Header from '../pages/Header'
import Footer from '../pages/Footer'

const Disclaimer = () => {
  return (
    <div>
            <Header />
            
            {/* Disclaimer Content Section */}
            <section className="py-16 bg-cream min-h-screen">
                <div className="container mx-auto px-8 md:px-12 max-w-4xl">
                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-light text-black mb-6">
                            Disclaimer
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-justify">
                        <p className="text-lg">
                            The Mind Planner by Dr. Samina offers a structured self-guided journey of personal growth and empowerment. While it draws upon evidence-based therapeutic principles and is designed to support you in overcoming fears, limiting beliefs, and emotional challenges, it is important to clarify that it is not a substitute for formal therapy, diagnosis, or medical treatment.
                        </p>

                        <p className="text-lg">
                            The Mind Planner products are designed to provide support similar to therapeutic practices, it does not replace the need for professional support if required. It is ideal for individuals seeking personal development, emotional resilience, and empowerment but should not be used as a replacement for professional mental health care.
                        </p>

                        <p className="text-lg">
                            For those in need of personalised, professional therapy, counselling, or medical advice, we strongly recommend consulting with a registered healthcare provider or mental health professional. The Mind Planner provides a tool for self-discovery and growth, but your well-being should always be prioritised, and professional support is essential if needed.
                        </p>

                        <p className="text-lg">
                            By using The Mind Planner products, you acknowledge and understand that it is a self-guided tool for personal development, self-help and empowerment, based on evidence-based therapeutic principles, not a registered form of therapy. If you experience emotional distress or have concerns about your mental health, it is important to seek the guidance of a registered therapist or healthcare professional.
                        </p>
                        </div>

            

          </div>
        </section>

        {/* White space separator */}
        <div className="bg-white py-8"></div>

        <Footer />
    </div>
  )
}

export default Disclaimer