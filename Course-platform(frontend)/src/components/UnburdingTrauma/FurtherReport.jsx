import React from 'react'

const FurtherReport = () => {
    return (
        <div>
            {/* Welcome Content Section */}
            <section className="py-20 bg-cream min-h-screen px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-2xl md:text-3xl font-light text-[#393128] mb-6">
                            ONGOING SUPPORT
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-[#393128] leading-relaxed space-y-8">

                        {/* Overview Section */}
                        <div>
                            <p className="text-md">
                                Healing often continues beyond the final lesson. If you find yourself in need of continued
                                care whether practical, emotional, or therapeutic - please consider the resources below.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl !font-bold text-[#393128] mb-4">UK Crisis & Immediate Support </h2>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li className="text-md"><span className="!font-bold">Samaritans</span> – 24/7 free emotional support {<br />} 116 123 | <a href="https://www.samaritans.org/">www.samaritans.org</a></li>
                                <li className="text-md"><span className="!font-bold">Shout</span> - 24/7 crisis text line {<br />} Text SHOUT to 85258 | <a href="https://www.giveusashout.org/">www.giveusashout.org</a></li>
                                <li className="text-md"><span className="!font-bold">NHS 111</span> - Urgent mental health support {<br />} Call 111 and ask for the local crisis team </li>
                            </ul>

                        </div>

                        <div>
                            <h2 className="text-xl !font-bold text-[#393128] mb-4">Professional Therapy (UK)</h2>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li className="text-md"><span className="!font-bold">BACP</span> – British Association for Counselling and Psychotherapy {<br />} <a href="https://www.bacp.co.uk/">www.bacp.co.uk</a></li>
                                <li className="text-md"><span className="!font-bold">Counselling Directory</span> {<br />} <a href="https://www.counselling-directory.org.uk/">www.counselling-directory.org.uk</a></li>
                                <li className="text-md"><span className="!font-bold">Black Minds Matter UK</span> {<br />} <a href="https://www.blackmindsmatteruk.com/">www.blackmindsmatteruk.com</a></li>
                            </ul>

                        </div>

                        <div>
                            <h2 className="text-xl !font-bold text-[#393128] mb-4">Books on Trauma and Recovery </h2>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li className="text-md"><i>The Body Keeps the Score</i> – Bessel van der Kolk </li>
                                <li className="text-md"><i>What Happened to You?</i> – Bruce Perry & Oprah Winfrey</li>
                                <li className="text-md"><i>It Didn’t Start With You</i> – Mark Wolynn</li>
                                <li className="text-md"><i>Healing the Shame That Binds You</i> – John Bradshaw </li>
                            </ul>

                        </div>

                        <div>
                            <h2 className="text-xl !font-bold text-[#393128] mb-4">Somatic & Mindfulness Tools</h2>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li className="text-md"><span className="!font-bold">Insight Timer</span> – Free meditations and trauma-sensitive teachers </li>
                                <li className="text-md"><span className="!font-bold">Yoga with Adriene (YouTube)</span> – “Yoga for PTSD” and grounding practices </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default FurtherReport