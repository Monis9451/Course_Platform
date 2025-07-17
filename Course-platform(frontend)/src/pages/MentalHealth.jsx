import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MentalHealth = () => {
return (
    <div>
            <Header />
            
            {/* Mental Health Content Section */}
            <section className="py-16 bg-cream min-h-screen">
                <div className="container mx-auto px-8 md:px-12 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-light text-black mb-6">
                            Mental Health
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-justify">
                        <p className="text-lg">
                            I want to acknowledge the importance of mental health and the challenges that many of us face. It's something I care deeply about and 
                            approach with the utmost respect. Please remember that while the tools provided within my resources can support your personal 
                            growth, they are not a substitute for professional therapy or medical treatment.
                        </p>

                        <p className="text-lg">
                            If you're managing a pre-existing mental health condition or currently experiencing emotional distress, I strongly recommend seeking 
                            professional guidance from a registered therapist, counsellor, or healthcare provider. Working alongside a trained professional can ensure 
                            you are supported safely through your journey.
                        </p>

                        <p className="text-lg">
                            This type of self-exploration can sometimes bring up difficult emotions or even physical sensations. While this process may be deeply 
                            insightful, it can also be triggering for some, and it's important to have the appropriate support in place. If at any point you feel 
                            overwhelmed, please do not hesitate to reach out to a healthcare professional.
                        </p>

                        <p className="text-lg">
                            For those who need immediate help, please contact the Samaritans on <span className="font-semibold text-[#B45B29]">116 123</span> or visit your nearest A&E if you are in crisis. If you feel 
                            your symptoms are mild to moderate, contacting your GP or local mental health service for advice and support would be beneficial. For 
                            more specialised support, consider reaching out to a registered psychiatrist or mental health team, who can help tailor the appropriate 
                            care for your needs.
                        </p>

                        <p className="text-lg">
                            If you are currently a student, many universities and colleges offer counselling services and can provide guidance on how to access 
                            mental health support.
                        </p>

                        <p className="text-lg">
                            Please take care of yourself and reach out for help when needed. 
                            If you’re looking for more affordable, accessible therapy options, 
                            platforms like <b>Counselling Directory</b> or <b>Psychology Today</b> provide listings of registered professionals who can offer support and guidance.
                        </p>

                        <p className="text-lg">
                            Remember, you do not have to navigate this journey alone. Take the time to care for your mental well-being, and seek the support you deserve.
                        </p>

                        <p className="text-lg">
                            With kindness and care, <br/>
                            Dr. Samina
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

export default MentalHealth