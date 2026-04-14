import { useState, type CSSProperties } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";

import irenePhoto from "@/assets/Irene.jpeg";
import zubaidaPhoto from "@/assets/Zubaida.jpeg";
import barakatPhoto from "@/assets/Barakat.jpg";
import poorviPhoto from "@/assets/Poorvi.jpeg";
import jeevanPhoto from "@/assets/Jeevan.PNG";
import jiyaPhoto from "@/assets/Jiya.jpeg";

type TeamMember = {
	name: string;
	role: string;
	region?: string;
	image: string;
	imageClassName?: string;
	imageStyle?: CSSProperties;
	quote: string;
	bio: string[];
	extendedBio?: string[];
};

const teamMembers: TeamMember[] = [
	{
		name: "Irene Arathi Pais",
		role: "Founder, Ikigai Teen",
		image: irenePhoto,
		imageClassName: "object-[50%_30%]",
		quote: "When young people understand themselves early, they gain the power to shape their future with clarity and courage.",
		bio: [
			"Irene Arathi Pais is the founder of Ikigai Teen, a teen development initiative dedicated to helping teenagers build self-awareness, resilience, and purpose in a rapidly changing world. With over two decades of professional experience in human resources and humanitarian project leadership across international organisations across the globe, including work in disaster response and conflict environments, she has designed and delivered youth-focused programs that have reached over 107,893 students across India.",
			"Drawing from her background in child development, leadership, and community engagement and social sector, Irene founded Ikigai Teen to create practical tools and conversations that support teens, parents, and educators alike.",
		],
		extendedBio: [
			"Irene Arathi Pais is the founder of Ikigai Teen, a values-driven initiative dedicated to helping young people grow into self-aware, resilient and responsible individuals.",
			"With over two decades of professional experience in human resources, humanitarian operations and youth-focused initiatives, Irene has worked in some of the world's most complex environments, including India, Iraq, Sudan, Ethiopia and Haiti. Her work has included roles within the Red Cross movement, United Nations system and international organisations such as Oxfam, where she contributed to programmes in disaster response, conflict contexts and large-scale humanitarian operations.",
			"Through these experiences, Irene witnessed first-hand how resilience, character and inner strength shape the course of a young person's life. Alongside her humanitarian career, she pursued her deep interest in child development and adolescent growth, designing and delivering programmes for high school students across several Indian states that reached over 100,000 students.",
			"Irene holds a Master's degree and has been trained in child development and youth engagement practices. Over the years, she has worked closely with educators, institutions and communities to support young people in building life skills, emotional strength and a sense of purpose.",
			"Ikigai Teen was born from Irene's conviction that adolescence is a critical window in life - a time when the right guidance can help young people discover who they are, develop strong values and build the confidence to navigate an increasingly complex world.",
			"Through Ikigai Teen, Irene aims to create practical tools, coaching programmes and supportive communities that help teens, parents and educators work together to nurture the next generation of thoughtful, capable and compassionate leaders.",
		],
	},
	{
		name: "Zubaida Zuhair",
		role: "Research & Content Associate",
		region: "Iraq",
		image: zubaidaPhoto,
		imageClassName: "object-[50%_30%]",
		quote: "When knowledge is shared with sincerity, it becomes a bridge that helps others grow.",
		bio: [
			"Zubaida Zuhair is a young research and content contributor based in Erbil, Iraq, with a background in English Language and Literature and experience in student engagement and education support. In the early stages of her career, she has already worked across academic institutions, teacher training programs, and community initiatives, including exposure to humanitarian work with Oxfam.",
			"At Ikigai Teen, Zubaida contributes to research, teen profiling, and resource development. She supports the creation of blogs, podcasts, and educational articles through research-backed writing, content refinement, and audio-visual editing. Her multilingual skills and curiosity about youth experiences help translate insights into meaningful learning resources.",
		],
	},
	{
		name: "Barakat Mohammed",
		role: "Digital Media & Design Support",
		region: "Iraq",
		image: barakatPhoto,
		imageClassName: "object-[44%_50%] scale-125",
		quote: "Design has the power to turn ideas into experiences that inspire people to think differently.",
		bio: [
			"Barakat Mohammed is a digital designer based in Erbil, Iraq, with a strong interest in youth engagement, visual storytelling, and educational media. A graduate of Lebanese French University (2024), he combines creative design skills with an understanding of how digital platforms influence the way young audiences learn and interact.",
			"At Ikigai Teen, Barakat supports digital design and social media publishing across platforms such as YouTube, podcasts, and social media channels. His work includes creating branded visuals, thumbnails, and short-form media that transform insights and conversations into engaging digital content.",
		],
	},
	{
		name: "Poorvi Praveen",
		role: "Program & Operations Support",
		region: "India",
		image: poorviPhoto,
		imageClassName: "object-center",
		imageStyle: { objectPosition: "50% 50%", transform: "translateX(-22%) scale(1.45)", transformOrigin: "center center" },
		quote: "Age does not define responsibility - commitment and action do.",
		bio: [
			"Poorvi Praveen is an 18-year-old Chartered Accountancy student from Bangalore, Karnataka, and an enthusiastic young contributor to the Ikigai Teen initiative. A disciplined weightlifting enthusiast, she brings the same determination and perseverance to her work supporting youth development programs.",
			"Curious, responsible, and a natural go-getter, Poorvi volunteered to support Ikigai Teen and quickly became a dependable contributor across many areas, from program coordination to podcast production logistics, website development support, and social media content production among others. Having grown up observing her mother's enterprising spirit in launching small business initiatives, Poorvi developed an early appreciation for initiative, resilience, and learning through action.",
		],
	},
	{
		name: "Jeevan Shaji John",
		role: "Technology & Collaborations Support",
		region: "India",
		image: jeevanPhoto,
		imageStyle: { objectPosition: "50% 44%", transform: "translateX(22%) scale(1.7)", transformOrigin: "center center" },
		quote: "A willing mind and consistent action can turn small beginnings into meaningful impact.",
		bio: [
			"Jeevan Shaji John is a young technology enthusiast from Pathanamthitta, Kerala, with a Bachelor degree in Computer Applications. With a growing interest in web development, cybersecurity, and digital problem-solving, he represents a new generation of learners eager to apply technology in meaningful and socially relevant ways.",
			"At Ikigai Teen, Jeevan supports both application and website development, along with collaboration-building efforts that strengthen the initiative's digital and operational ecosystem, driving innovation and rapid evolution. His interests in tech design, systems thinking, and continuous learning make him a valuable contributor to a mission-driven platform designed for the next generation. Passionate about growth and stepping beyond his comfort zone, Jeevan embodies the curiosity, adaptability, and purpose-driven mindset that Ikigai Teen seeks to nurture in young people.",
		],
	},
	{
		name: "Jiya Giri",
		role: "Networking & Business Coordination",
		region: "India",
		image: "",
		imageClassName: "object-[68%_12%]",
		quote: "Grace, responsibility, and sincerity in small actions often build the strongest foundations.",
		bio: [
			"Jiya Giri is a young and thoughtful contributor from Dharwad with a strong interest in healthcare, emotional well-being, and meaningful human connection. Currently pursuing her studies in science, she brings a calm, responsible, and people-centred approach to the work she takes on. Known for being polished, sincere, and meticulous, Jiya has a natural ability to communicate with warmth, attentiveness, and care.",
			"At Ikigai Teen, Jiya supports networking, coordination, and relationship management across key areas of the initiative. Her role includes assisting with communication, stakeholder coordination, and operational follow-through that help keep engagements and collaborations organised and professional. With her grounded nature and strong sense of responsibility, she reflects the kind of thoughtful young leadership that helps meaningful initiatives grow with care and consistency.",
		],
	},
];

const CircleProfilePhoto = ({ src, alt, imageClassName, imageStyle }: { src: string; alt: string; imageClassName?: string; imageStyle?: CSSProperties }) => {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border/70 shrink-0">
				<div className="w-full h-full bg-secondary flex items-center justify-center text-xs font-semibold text-muted-foreground px-3 text-center">
					{alt}
				</div>
			</div>
		);
	}

	return (
		<div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border/70 shrink-0">
			<img
				src={src}
				alt={alt}
				className={`w-full h-full object-cover ${imageClassName ?? "object-center"}`}
				style={imageStyle}
				loading="lazy"
				onError={() => setFailed(true)}
			/>
		</div>
	);
};

const FounderTeam = () => {
	const [showFullFounderBio, setShowFullFounderBio] = useState(false);

	return (
		<>
			<Navbar />
			<main className="pt-16 bg-background min-h-screen">
				<section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
					<div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
						<h1>
							<LetterSwapForward
								label="Founder & Team"
								className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
							/>
						</h1>
						<p className="text-lg text-muted-foreground font-body">Meet the people shaping Ikigai Teen.</p>
					</div>
				</section>

				<section className="py-10 md:py-14 bg-background">
					<div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
						<section className="space-y-5">
							<div className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-5">
								<h2 className="text-2xl md:text-3xl font-display font-semibold text-primary">Team</h2>
								<p className="text-sm md:text-base text-muted-foreground leading-relaxed">
									Ikigai Teen is powered by a young, global team that believes meaningful change begins with awareness,
									courage, and collaboration. Together, we bring research, design, technology, and youth perspective to
									build a platform that helps teens navigate life with clarity and purpose.
								</p>
								<div className="space-y-5">
									{teamMembers.map((member) => (
										<article key={member.name} className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/40">
											<div className="mb-3">
												<header>
													<h3 className="text-xl md:text-2xl font-display font-semibold text-primary">{member.name}</h3>
													<p className="text-sm md:text-base text-primary font-semibold">{member.role}</p>
													{member.region && <p className="text-xs text-muted-foreground mt-1">{member.region}</p>}
												</header>
											</div>
											<div className="flex flex-col sm:flex-row gap-5 items-start pt-1">
												<CircleProfilePhoto src={member.image} alt={member.name} imageClassName={member.imageClassName} imageStyle={member.imageStyle} />
												<div className="space-y-3">
													{member.name === "Irene Arathi Pais" ? (
														<>
															{(showFullFounderBio ? member.extendedBio ?? member.bio : member.bio).map((paragraph, paragraphIndex) => (
																<p key={paragraph} className="text-sm md:text-base text-muted-foreground leading-relaxed">
																	{paragraph}
																	{paragraphIndex === (showFullFounderBio ? member.extendedBio ?? member.bio : member.bio).length - 1 ? (
																		<>
																			{" "}
																			<button
																				type="button"
																					onClick={() => setShowFullFounderBio((previous) => !previous)}
																					className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
																				>
																					{showFullFounderBio ? "Show less" : "Read more"}
																				</button>
																			</>
																		) : null}
																</p>
															))}
														</>
													) : (
														member.bio.map((paragraph) => (
														<p key={paragraph} className="text-sm md:text-base text-muted-foreground leading-relaxed">
															{paragraph}
														</p>
														))
													)}

													<p className="text-sm md:text-base italic font-semibold text-foreground/85">"{member.quote}"</p>
												</div>
											</div>
										</article>
									))}
								</div>
							</div>
						</section>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default FounderTeam;
