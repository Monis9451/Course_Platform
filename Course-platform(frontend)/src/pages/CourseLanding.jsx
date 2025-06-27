// import React from "react";
// import { useParams } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
// import { FaCheckCircle } from "react-icons/fa";
// import { FiClock, FiUser, FiPlay } from "react-icons/fi";

// // Dummy data consistent with other pages
// const dummyCoursesData = {
// 	1: {
// 		id: 1,
// 		title: "Unburdening Trauma",
// 		subtitle: "A 6-Week Self-Paced Course",
// 		description:
// 			"A transformative journey to heal past wounds and create lasting change",
// 		fullDescription:
// 			"Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",
// 		instructor: "Dr. Samina Khatun",
// 		duration: "6 weeks",
// 		lessons: 24,
// 		level: "All levels",
// 		price: 75,
// 		featured: true,
// 		img_src: "/1.png",
// 		img_alt: "Understanding Trauma Course",
// 		modules: [
// 			{
// 				id: 1,
// 				title: "Module 1: Understanding Trauma – How It Affects the Mind & Body",
// 				description:
// 					"Unpacking the Science of Trauma, Trauma Responses, and Why We Get 'Stuck'",
// 			},
// 			{
// 				id: 2,
// 				title:
// 					"Module 2: Reconnecting with the Body – Trauma, Dissociation, and Grounding",
// 				description:
// 					"Understanding How Trauma is Stored in the Body and Learning to Safely Reconnect",
// 			},
// 			{
// 				id: 3,
// 				title:
// 					"Module 3: Inner Child Healing – Reconnecting with Your Younger Self",
// 				description:
// 					"Healing the Wounds of the Past by Nurturing the Inner Child",
// 			},
// 			{
// 				id: 4,
// 				title:
// 					"Module 4: Stuck Points – Challenging Limiting Beliefs and Cognitive Distortions",
// 				description:
// 					"Identifying and Challenging the Beliefs That Keep You Stuck in Trauma Patterns",
// 			},
// 			{
// 				id: 5,
// 				title: "Module 5: Releasing Trauma – Letting Go of Stored Emotions",
// 				description:
// 					"Learning How to Process, Release, and Move Through Stored Trauma Energy",
// 			},
// 			{
// 				id: 6,
// 				title: "Module 6: Integration & Sustainable Healing Practices",
// 				description:
// 					"Creating Lasting Change and Sustainable Practices for Trauma Recovery",
// 			},
// 		],
// 		features: [
// 			"Lifetime Access",
// 			"24 Video Lessons",
// 			"Downloadable Resources",
// 		],
// 		gains: [
// 			{
// 				title: "Release Deep-Seated Trauma Patterns",
// 				desc: "Understand and heal the emotional patterns preventing you from living fully.",
// 			},
// 			{
// 				title: "Heal Past Wounds",
// 				desc: "Address past hurts and traumas that continue to impact your daily life.",
// 			},
// 			{
// 				title: "Understand Your Triggers",
// 				desc: "Gain deeper insight into your emotional triggers and trauma responses.",
// 			},
// 			{
// 				title: "Create Lasting Change",
// 				desc: "Learn actionable tools to build resilience and sustainable healing practices.",
// 			},
// 		],
// 	},
// 	2: {
// 		id: 2,
// 		title: "Unburdening Love",
// 		subtitle: "A 6-Week Self-Paced Course",
// 		description: "Break Free from Relationship Blocks and Cultivate Healthy Love",
// 		fullDescription:
// 			"Understanding Love Blocks, Attachment Styles, and Building Secure Relationships",
// 		instructor: "Dr. Samina Khatun",
// 		duration: "6 weeks",
// 		lessons: 20,
// 		level: "All levels",
// 		price: 75,
// 		featured: true,
// 		img_src: "/love_course.png",
// 		img_alt: "Understanding Love Course",
// 		modules: [
// 			{
// 				id: 1,
// 				title: "Module 1: Understanding Love Blocks",
// 				description: "Identifying the patterns that prevent healthy relationships",
// 			},
// 			{
// 				id: 2,
// 				title: "Module 2: Attachment Styles and Relationships",
// 				description: "Understanding how your attachment style affects your relationships",
// 			},
// 			{
// 				id: 3,
// 				title: "Module 3: Healing Relationship Trauma",
// 				description: "Addressing past wounds that impact current relationships",
// 			},
// 			{
// 				id: 4,
// 				title: "Module 4: Building Secure Attachment",
// 				description: "Developing the skills for healthy, secure relationships",
// 			},
// 			{
// 				id: 5,
// 				title: "Module 5: Communication and Boundaries",
// 				description: "Essential skills for maintaining healthy relationships",
// 			},
// 			{
// 				id: 6,
// 				title: "Module 6: Creating Lasting Love",
// 				description: "Integrating all you've learned to build fulfilling relationships",
// 			},
// 		],
// 		gains: [
// 			{
// 				title: "Release Deep-Seated Love Blocks",
// 				desc: "Understand and heal the emotional patterns preventing you from experiencing healthy love.",
// 			},
// 			{
// 				title: "Heal Past Wounds",
// 				desc: "Address past hurts and traumas that continue to impact your relationships.",
// 			},
// 			{
// 				title: "Understand Yourself and Others",
// 				desc: "Gain deeper insight into your emotional triggers, attachment styles, and patterns.",
// 			},
// 			{
// 				title: "Create Healthy Relationships",
// 				desc: "Learn actionable tools to build stronger, more conscious relationships.",
// 			},
// 		],
// 	},
// };

// const CourseLanding = () => {
// 	const { id } = useParams();
// 	const courseId = parseInt(id) || 1;
// 	const course = dummyCoursesData[courseId];

// 	if (!course) {
// 		return (
// 			<div className="min-h-screen bg-cream">
// 				<Header />
// 				<div className="container mx-auto px-4 py-20 text-center">
// 					<h1 className="text-3xl font-serif text-black mb-4">
// 						Course Not Found
// 					</h1>
// 					<p className="text-warm-gray mb-8">
// 						The course you're looking for doesn't exist.
// 					</p>
// 				</div>
// 				<Footer />
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-cream">
// 			<Header />

//             {/* Hero Section */}
//                         <section className="bg-cream py-16 md:py-24">
//                             <div className="container mx-auto px-4 lg:px-8">
//                                 <div className="max-w-5xl mx-auto">
//                                     <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6 leading-tight text-center">
//                                         {course.title}: {course.subtitle}
//                                     </h1>
//                                     <h2 className="text-xl md:text-2xl text-black mb-8 text-center font-serif">
//                                         {course.description}
//                                     </h2>

//                                     <section className="bg-cream py-12 md:py-10">
//                             <div className="container mx-auto px-4 lg:px-8">
//                                 <div className="bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch max-w-5xl mx-auto">
//                                     {/* Left: Image + Info */}
//                         <div className="w-full md:w-2xl flex flex-col items-center">
//                             {/* Course Image Placeholder */}
//                             <div className="w-full h-48 md:h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-lg mb-6">
//                                 <img src="/3.png" alt="course image" />
//                             </div>
//                             {/* Duration & Level */}
//                             <div className="flex items-center gap-6 mt-auto">
//                                 <span className="flex items-center text-warm-gray text-base">
//                                     <FiClock className="mr-2" />
//                                     {course.duration}
//                                 </span>
//                                 <span className="flex items-center text-warm-gray text-base">
//                                     <FiUser className="mr-2" />
//                                     {course.level}
//                                 </span>
//                             </div>
//                         </div>
                        
//                         {/* Right: Price & Features */}
//                         <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6 flex flex-col justify-between">
//                             <div>
//                                 <h3 className="text-xl font-serif font-medium mb-2 text-black">Course Price</h3>
//                                 <div className="text-3xl font-bold text-primary mb-6">£{course.price}.00</div>
//                                 <ul className="mb-6 space-y-3">
//                                     <li className="flex items-center text-black">
//                                         <FaCheckCircle className="text-primary mr-2" />
//                                         Lifetime Access
//                                     </li>
//                                     <li className="flex items-center text-black">
//                                         <FaCheckCircle className="text-primary mr-2" />
//                                         24 Video Lessons
//                                     </li>
//                                     <li className="flex items-center text-black">
//                                         <FaCheckCircle className="text-primary mr-2" />
//                                         Downloadable Resources
//                                     </li>
//                                 </ul>
//                             </div>
//                             <button
//                                 onClick={() => (window.location.href = `/checkout/${course.id}`)}
//                                 className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded transition-colors duration-200 w-full mb-3"
//                             >
//                                 Enroll Now
//                             </button>
//                             <div className="text-center text-primary mt-2 text-sm">
//                                 Try a free sample lesson
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

// 					</div>
// 				</div>
// 			</section>

// 			{/* Course Breakdown Section */}
// 			<section className="py-16 bg-cream">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-4xl mx-auto">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-12 text-center font-serif uppercase">
// 							Course Curriculum
// 						</h2>

// 						<div className="space-y-6">
// 							{course.modules.map((module, index) => (
// 								<div
// 									key={module.id}
// 									className="border border-gray-200 rounded-lg p-6 bg-white"
// 								>
// 									<h3 className="font-medium text-lg mb-2 text-primary">
// 										{module.title}
// 									</h3>
// 									<p className="text-warm-gray">{module.description}</p>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* What You'll Gain Section */}
// 			<section className="py-16 bg-white">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-4xl mx-auto">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-12 text-center font-serif uppercase">
// 							What You'll Learn
// 						</h2>

// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 							{course.gains.map((gain, index) => (
// 								<div key={index} className="bg-cream p-6 rounded-lg shadow-sm">
// 									<div className="flex items-start mb-4">
// 										<FaCheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
// 										<div>
// 											<h3 className="font-medium text-lg mb-2 text-black">
// 												{gain.title}
// 											</h3>
// 											<p className="text-warm-gray">{gain.desc}</p>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Why This Course Section */}
// 			<section className="py-16 bg-white">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-4xl mx-auto">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-12 text-center text-primary font-serif uppercase">
// 							Why This Course?
// 						</h2>

// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Expert-Led
// 								</h3>
// 								<p className="text-warm-gray">
// 									Designed by a licensed psychologist with years of
// 									experience, this course combines science-backed methods
// 									for deep healing.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Affordable
// 								</h3>
// 								<p className="text-warm-gray">
// 									High-quality, transformative material without the hefty
// 									price tag of therapy or one-on-one coaching.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Self-Paced
// 								</h3>
// 								<p className="text-warm-gray">
// 									Complete the modules at your own pace with lifetime
// 									access to all materials, so you can return to them
// 									whenever you need.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Personal Support
// 								</h3>
// 								<p className="text-warm-gray">
// 									Having your questions answered and get the support you
// 									need via email throughout the course.
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Why This Course Section */}
// 			 <section className="py-16 bg-white">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-4xl mx-auto">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-12 text-center text-primary font-serif uppercase">
// 							Why This Course?
// 						</h2>

// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Expert-Led
// 								</h3>
// 								<p className="text-warm-gray">
// 									Designed by a licensed psychologist with years of
// 									experience, this course combines science-backed methods
// 									for deep healing.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Affordable
// 								</h3>
// 								<p className="text-warm-gray">
// 									High-quality, transformative material without the hefty
// 									price tag of therapy or one-on-one coaching.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Self-Paced
// 								</h3>
// 								<p className="text-warm-gray">
// 									Complete the modules at your own pace with lifetime
// 									access to all materials, so you can return to them
// 									whenever you need.
// 								</p>
// 							</div>

// 							<div className="bg-cream p-6 rounded-lg shadow-sm">
// 								<h3 className="font-medium text-lg mb-4 text-black">
// 									Personal Support
// 								</h3>
// 								<p className="text-warm-gray">
// 									Having your questions answered and get the support you
// 									need via email throughout the course.
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Testimonials Section */}
// 			<section className="py-16 bg-white">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-4xl mx-auto">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-12 text-center font-serif uppercase">
// 							What Our Students Say
// 						</h2>

// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// 							<div className="bg-white p-6 rounded-lg shadow-sm">
// 								<p className="text-warm-gray mb-6 italic">
// 									"I had no idea how much I was carrying from my childhood
// 									and past relationships. This course helped me see it and,
// 									more importantly, let it go."
// 								</p>
// 								<p className="font-medium text-black">— Sarah M.</p>
// 							</div>

// 							<div className="bg-white p-6 rounded-lg shadow-sm">
// 								<p className="text-warm-gray mb-6 italic">
// 									"The exercises helped me realize my own patterns and how
// 									they were affecting my life. I'm now feeling more confident
// 									and secure in myself."
// 								</p>
// 								<p className="font-medium text-black">— James L.</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Final CTA Section */}
// 			<section className="py-16 bg-cream">
// 				<div className="container mx-auto px-4 lg:px-8">
// 					<div className="max-w-3xl mx-auto text-center">
// 						<h2 className="text-2xl md:text-3xl font-medium mb-10 font-serif">
// 							Ready to Start Your Transformation?
// 						</h2>
// 						<button
// 							onClick={() => (window.location.href = `/checkout/${course.id}`)}
// 							className="bg-primary hover:bg-gray-100 text-white font-medium px-12 py-4 uppercase text-lg transition-colors duration-200"
// 						>
// 							Enroll Now for £{course.price}
// 						</button>
// 						<a href="/courses" className="block mt-6 text-primary hover:underline">
// 							Or view all our corses
// 						</a>
// 					</div>
// 				</div>
// 			</section>
// 		</div>
// 	);
// };

// export default CourseLanding;