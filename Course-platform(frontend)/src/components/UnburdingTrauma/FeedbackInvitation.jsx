import React from 'react'

const FeedbackInvitation = () => {
return (
    <div>
            {/* Welcome Content Section */}
            <section className="py-20 bg-cream min-h-screen">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-light text-[#393128] mb-6">
                            REFLECTING ON YOUR EXPERIENCE
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                        
                        {/* Overview Section */}
                        <div>
                            <p className="text-xl">
                             If this workshop supported you in any meaningful way, I would be grateful to hear your 
                            reflections. As the creator and clinician behind this work, your experience helps me continue 
                            to develop safe, supportive, and effective resources for those navigating trauma. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                             You're welcome to share as much or as little as you feel comfortable. All feedback is treated 
                            with care and confidentiality. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            Here are some questions to guide you, if helpful: 
                            </p>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li className="text-md">What part of the course stood out or supported you most? </li>
                                <li className="text-md">Were there moments that felt unclear, challenging, or incomplete?</li>
                                <li className="text-md">What do you feel has changed or begun to shift since starting? </li>
                            </ul>

                            <p className="text-xl">
                                You may submit anonymously if you prefer. I truly appreciate your time and trust.
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            Healing doesn’t mean the past disappears. It means that what once held power over you 
                            begins to soften. It means your nervous system learns that it’s allowed to rest. It means your 
                            story no longer has to stay frozen in the body. 
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl !font-bold text-[#393128] mb-4">With appreciation, <br></br>Dr. Samina  </h2>
                        </div>

                    </div>
                </div>
            </section>
            <div className="bg-white py-8"></div>
    </div>
)
}

export default FeedbackInvitation