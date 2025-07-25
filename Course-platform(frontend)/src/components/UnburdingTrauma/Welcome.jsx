import React from 'react'

const Welcome = () => {
return (
    <div>
            {/* Welcome Content Section */}
            <section className="py-20 bg-cream min-h-screen">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-light text-[#393128] mb-6">
                            A NOTE BEFORE WE BEGIN
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">
                        
                        {/* Overview Section */}
                        <div>
                            <h2 className="text-2xl !font-bold text-[#393128] mb-4">Welcome</h2>
                            <p className="text-xl">
                             Beginning trauma work is not a light decision. If you’ve arrived here, it’s likely because 
                             something in your life - something felt, remembered, or not yet fully understood has asked 
                             for attention. 
                            </p>
                        </div>
                        
                        <div>
                            <p className="text-xl">
                             <i>Unburdening Trauma</i> is a structured, trauma-informed course grounded in psychological 
                             science, somatic understanding, and clinical experience. It was developed to provide you with 
                             meaningful, repeatable tools to support healing. Not to erase what has happened, but to help 
                             you relate to yourself with greater clarity, gentleness, and strength. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                             Trauma is not just about what happened to you. It’s also about what didn’t happen; what was 
                            missing when you needed safety, connection, protection, or repair. Over time, unprocessed 
                            trauma can shape your nervous system, your relationships, your self-perception. It can 
                            disconnect you from your body or make the world feel unsafe even when the threat has 
                            passed. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            This course is not a substitute for therapy, but it is a companion for those moments when 
                            you’re ready to understand more, feel more, or simply begin. The materials you’ll find here - 
                            educational insights, grounding exercises, reflective prompts, and somatic practices are 
                            designed to be returned to. They are tools for real-life healing, not just ideas. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            Healing is not a single act. It’s a devotion. A choice, made again and again, to come back to 
                            yourself with compassion. Some days that will feel possible. Other days, it may not. That’s 
                            okay. The work will wait for you. There is no perfect pace. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            You don’t have to be ready for everything. You only need to begin with what feels 
                            manageable. And when it becomes too much, it’s okay to pause. When you can, come back. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            This course was created to honour the real, often slow process of becoming whole again, not 
                            by changing who you are, but by making space for who you’ve always been underneath the 
                            survival strategies. 
                            </p>
                        </div>

                        <div>
                            <p className="text-xl">
                            Thank you for being here. 
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl !font-bold text-[#393128] mb-4">With care, <br></br>Dr. Samina  </h2>
                        </div>

                    </div>
                </div>
            </section>
            <div className="bg-white py-8"></div>
    </div>
)
}

export default Welcome