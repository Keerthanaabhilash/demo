import { ReactNode, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LetterSwapForward } from "@/components/ui/letter-swap";

type FAQPoint = {
  title: string;
  description?: string;
};

type FAQItem = {
  question: string;
  intro?: string[];
  points: FAQPoint[];
  closing?: string[];
};

const renderNumberText = (text: string): ReactNode => {
  const numberPattern = /\d[\d,-]*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(numberPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={`${text}-${matchIndex}-${match[0]}`} className="number-font">
        {match[0]}
      </span>,
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
};

const faqItems: FAQItem[] = [
  {
    question: "What Makes Ikigai Teen Different",
    points: [
      {
        title: "Focus on the Teen Mindset, Not Just Marks",
        description:
          "Schools build academic knowledge. Ikigai Teen develops self-awareness, decision-making, emotional strength, and character.",
      },
      {
        title: "Designed for the Digital Age",
        description:
          "We address the realities of smartphones, social media, distraction, and digital influence - helping teens become responsible digital citizens.",
      },
      {
        title: "Purpose Before Profession",
        description:
          "Instead of asking what career to choose, we help teens discover who they are and what truly matters to them.",
      },
      {
        title: "Rooted in Real Field Experience",
        description:
          "Ikigai Teen draws from 25 years of humanitarian work with over 107,000 children, not just classroom theory.",
      },
      {
        title: "Builds Inner Strength",
        description:
          "Confidence, discipline, resilience, and ethical thinking are intentionally cultivated through guided reflection and practice.",
      },
      {
        title: "Teens Are Active Participants",
        description:
          "Students are not passive listeners. They contribute ideas, lead initiatives, and co-create parts of the program.",
      },
      {
        title: "Parents and Educators Are Partners",
        description:
          "Healthy teen development requires a supportive ecosystem. Ikigai Teen includes parents and educators as allies.",
      },
      {
        title: "Values and Awareness at the Core",
        description:
          "The program integrates values, cultural grounding, and responsible freedom - essential anchors in a fast-changing world.",
      },
      {
        title: "Real-Life Skills for Real-Life Situations",
        description:
          "Communication, judgment, digital discipline, and decision-making are practiced through scenarios teens actually face.",
      },
      {
        title: "Preparing Ethical Future Leaders",
        description:
          "The goal is not only successful students, but thoughtful young adults who contribute positively to society.",
      },
    ],
  },
  {
    question: "Who Ikigai Teen Is For",
    points: [
      {
        title: "Teens aged 13-18",
        description: "Young people navigating the important transition from childhood to adulthood.",
      },
      {
        title: "Teens who want to understand themselves better",
        description: "Those curious about their strengths, values, identity, and purpose.",
      },
      {
        title: "Teens struggling with focus or digital distraction",
        description: "Students who feel overwhelmed by smartphones, social media, or screen habits.",
      },
      {
        title: "Teens who want to build confidence and clarity",
        description: "Young people who want to speak up, think independently, and make better choices.",
      },
      {
        title: "Teens preparing for the future",
        description: "Those beginning to think about goals, direction, leadership, and contribution.",
      },
      {
        title: "Parents who want guidance beyond academics",
        description: "Families who believe that character, awareness, and emotional strength matter as much as marks.",
      },
    ],
  },
  {
    question: "Who Ikigai Teen Is Not For",
    points: [
      {
        title: "Teens looking for shortcuts to academic success",
        description: "Ikigai Teen is not a tuition or exam coaching program.",
      },
      {
        title: "Teens unwilling to reflect or participate",
        description: "The program works best for those open to thinking, sharing, and trying new habits.",
      },
      {
        title: "Families expecting instant transformation",
        description: "Real growth takes commitment, patience, and practice.",
      },
      {
        title: "Those seeking only motivational talks",
        description: "Ikigai Teen focuses on structured mindset development and practical life skills.",
      },
      {
        title: "Anyone expecting discipline to be imposed externally",
        description:
          "The goal is to help teens develop inner discipline and self-leadership, not forced compliance.",
      },
    ],
    closing: ["Ikigai Teen works best when teenagers, parents, and mentors grow together."],
  },
  {
    question: "The Ikigai Teen Growth Framework",
    intro: [
      "Growing into a strong, responsible, and purposeful adult does not happen by accident. It requires guidance, reflection, and practice during the formative teen years.",
      "The Ikigai Teen program is built around a structured Growth Framework that helps teenagers develop the awareness, habits, and inner strength needed to navigate modern life with clarity and confidence.",
      "This framework focuses on six key areas of development that are essential for young people growing up in today's rapidly changing digital world.",
    ],
    points: [
      {
        title: "Self-Awareness and Identity",
        description:
          "Helping teens understand who they are - their strengths, values, interests, and personal identity.",
      },
      {
        title: "Emotional Strength and Resilience",
        description:
          "Developing the ability to recognise emotions, handle stress, and respond to challenges with maturity.",
      },
      {
        title: "Digital Discipline and Responsible Technology Use",
        description:
          "Learning how to use smartphones, social media, and technology wisely without losing focus or balance.",
      },
      {
        title: "Values, Character, and Ethical Thinking",
        description:
          "Building integrity, empathy, responsibility, and respect in personal and social life.",
      },
      {
        title: "Communication and Healthy Relationships",
        description:
          "Strengthening the ability to express thoughts clearly, listen respectfully, and build meaningful connections.",
      },
      {
        title: "Purpose, Direction, and Leadership",
        description:
          "Encouraging teens to explore their potential, discover purpose, and grow into responsible contributors to society.",
      },
    ],
  },
  {
    question: "What Changes Parents Often See in Their Teen",
    points: [
      {
        title: "Improved Focus and Attention",
        description: "Teens become more mindful of how they use their time and attention.",
      },
      {
        title: "Healthier Relationship with Smartphones",
        description: "They begin to use technology more consciously instead of being controlled by it.",
      },
      {
        title: "Greater Self-Confidence",
        description: "Teens start expressing their thoughts and ideas with clarity and courage.",
      },
      {
        title: "Better Communication at Home",
        description: "Conversations with parents become calmer, more respectful, and more open.",
      },
      {
        title: "Stronger Emotional Balance",
        description: "Teens learn to recognise and manage emotions instead of reacting impulsively.",
      },
      {
        title: "Clearer Sense of Direction",
        description: "They begin thinking seriously about their interests, strengths, and future path.",
      },
      {
        title: "Improved Responsibility",
        description: "Teens show greater ownership of their choices, habits, and commitments.",
      },
      {
        title: "Healthier Peer Influence",
        description: "They become more aware of peer pressure and make more thoughtful decisions.",
      },
      {
        title: "Positive Attitude Toward Learning",
        description: "Curiosity and intrinsic motivation gradually replace resistance and apathy.",
      },
      {
        title: "Growth in Character and Values",
        description: "Parents often notice increased empathy, maturity, and ethical thinking.",
      },
    ],
  },
  {
    question: "Does Ikigai Teen avoid difficult or sensitive teen realities?",
    intro: [
      "No.",
      "Ikigai Teen does not ignore the real world teenagers are growing up in today.",
      "We understand that teens may be navigating issues such as:",
    ],
    points: [
      { title: "Identity confusion" },
      { title: "Pressure and comparison" },
      { title: "Distraction and digital overload" },
      { title: "Body image struggles" },
      { title: "Emotional ups and downs" },
      { title: "Friendship and belonging issues" },
      { title: "Attraction, attachment, and relationship confusion" },
      { title: "Validation-seeking" },
      { title: "Peer pressure" },
      { title: "Risky exposure online and offline" },
      { title: "Substance exposure" },
      { title: "Lack of direction, discipline, or self-trust" },
    ],
    closing: [
      "These realities are too important to avoid - and too sensitive to handle carelessly.",
    ],
  },
  {
    question: "What makes Ikigai Teen different in the way it speaks to teens?",
    intro: ["Ikigai Teen is designed to be:"],
    points: [
      { title: "Truthful, not dramatic" },
      { title: "Deep, not heavy" },
      { title: "Values-based, not preachy" },
      { title: "Emotionally intelligent, not over-psychologized" },
      { title: "Protective, not controlling" },
      { title: "Relevant, not shallow" },
      { title: "Growth-focused, not fear-based" },
      { title: "Respectful, not patronizing" },
    ],
    closing: [
      "We believe teens respond best to guidance that is honest, practical, age-aware, and grounded in dignity.",
    ],
  },
  {
    question: "What does Ikigai Teen avoid in its approach?",
    intro: ["Ikigai Teen does not approach teens through:"],
    points: [
      { title: "Moral panic" },
      { title: "Over-psychologizing normal developmental struggles" },
      { title: "Over-sexualizing teen realities" },
      { title: "Fear-based messaging" },
      { title: "Parent-policing language" },
      { title: "Preachy lectures" },
      { title: "Shame-based correction" },
      { title: "Over-labelling" },
      { title: "Fake forced relatability" },
      { title: "Treating teens like children" },
      { title: "Reducing every struggle to a diagnosis" },
      { title: "Glorifying emotional chaos" },
      { title: "Normalizing unhealthy behaviour simply because it is common" },
    ],
    closing: [
      "We take teen struggles seriously - without making teens feel judged, exposed, or reduced to a problem.",
    ],
  },
  {
    question: "How does Ikigai Teen handle difficult topics?",
    intro: [
      "With care, courage, and balance.",
      "We address difficult topics in ways that are:",
    ],
    points: [
      { title: "Age-appropriate" },
      { title: "Emotionally safe" },
      { title: "Non-invasive" },
      { title: "Non-sensational" },
      { title: "Practical" },
      { title: "Values-aware" },
      { title: "Growth-oriented" },
    ],
    closing: [
      "Our goal is not to create alarm.",
      "Our goal is to help teens think clearly, act wisely, and grow stronger from the inside out.",
    ],
  },
  {
    question: "Is Ikigai Teen too strict or too soft?",
    intro: [
      "Neither.",
      "Ikigai Teen does not believe in harsh control, nor in anything-goes thinking.",
      "We believe teens grow best when they are given:",
    ],
    points: [
      { title: "Understanding" },
      { title: "Structure" },
      { title: "Responsibility" },
      { title: "Self-awareness" },
      { title: "Tools" },
      { title: "Truth" },
      { title: "Hope" },
      { title: "Practice" },
    ],
    closing: ["We are not here to scare teens.", "We are here to strengthen them."],
  },
  {
    question: "Does Ikigai Teen make teens feel bad for struggling?",
    intro: [
      "No.",
      "Struggles are not the problem.",
      "Remaining stuck without awareness, tools, or support is the problem.",
      "Ikigai Teen helps teens move from:",
    ],
    points: [
      { title: "Confusion to clarity" },
      { title: "Reaction to response" },
      { title: "Drift to direction" },
      { title: "Self-doubt to self-respect" },
      { title: "Inconsistency to inner strength" },
    ],
  },
  {
    question: "Is Ikigai Teen trying to replace parents, schools, or counselling?",
    intro: [
      "No.",
      "Ikigai Teen is not a replacement for:",
    ],
    points: [
      { title: "Healthy parenting" },
      { title: "Wise mentoring" },
      { title: "Schools" },
      { title: "Professional mental health support where needed" },
    ],
    closing: [
      "Instead, it offers a growth-focused bridge that helps teens build stronger habits, steadier emotions, wiser choices, and a deeper sense of identity and purpose.",
    ],
  },
  {
    question: "What is the deeper philosophy behind Ikigai Teen?",
    intro: [
      "At the heart of Ikigai Teen is this belief:",
      "A teenager is not just someone to be corrected.",
      "A teenager is someone becoming.",
      "That means our work is not only about stopping bad habits or solving surface issues.",
      "It is about helping teens become more:",
    ],
    points: [
      { title: "Reliable" },
      { title: "Authentic" },
      { title: "Disciplined" },
      { title: "Emotionally aware" },
      { title: "Purpose-driven" },
      { title: "Grounded" },
      { title: "Considerate toward family, society, and the world" },
    ],
    closing: ["That is the spirit behind Ikigai Teen."],
  },
];

const FAQSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingColor = useTransform(scrollYProgress, [0, 0.45], ["hsl(195 10% 70%)", "hsl(var(--foreground))"]);

  return (
    <section ref={ref} className="py-8 md:py-12 lg:py-20 bg-card border-t border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-3 sm:p-4 md:p-6">
            <div className="text-center mb-6 md:mb-8">
              <motion.h2 style={{ color: headingColor }}>
                <LetterSwapForward
                  label="Frequently Asked Questions"
                  className="justify-center text-2xl sm:text-3xl md:text-4xl font-display font-bold text-current mb-2 md:mb-3"
                />
              </motion.h2>
              <p className="text-base md:text-lg lg:text-xl font-display text-primary">
                Ikigai Teen is real, safe, intelligent, and trustworthy.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full" value={openFaq} onValueChange={setOpenFaq}>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  onPointerDownCapture={(event) => {
                    const target = event.target as HTMLElement | null;
                    if (target?.closest("[data-faq-trigger='true']")) {
                      return;
                    }

                    setOpenFaq(undefined);
                  }}
                  className="border-border/60 group px-2 md:px-4 data-[state=open]:bg-[hsl(195_25%_96%_/_0.8)] data-[state=open]:rounded-xl transition-all duration-300"
                >
                  <AccordionTrigger data-faq-trigger="true" className="text-left text-sm md:text-base lg:text-lg font-display font-semibold text-foreground hover:text-[hsl(152_55%_38%)] hover:drop-shadow-[0_0_12px_hsl(152_55%_38%_/_0.45)] data-[state=open]:text-foreground hover:no-underline transition-all duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary font-body">
                    <div className="space-y-2 md:space-y-3 lg:space-y-4 pt-1">
                      {item.intro?.map((paragraph) => (
                        <p key={paragraph} className="text-xs md:text-sm lg:text-base leading-relaxed text-primary">
                          {renderNumberText(paragraph)}
                        </p>
                      ))}

                      <ol className="space-y-2 md:space-y-2.5">
                        {item.points.map((point, pointIndex) => (
                          <li key={point.title} className="text-xs md:text-sm lg:text-base leading-relaxed">
                            <span className="font-semibold text-primary">
                              {pointIndex + 1}. {renderNumberText(point.title)}
                            </span>
                            {point.description ? <span className="text-primary">: {renderNumberText(point.description)}</span> : null}
                          </li>
                        ))}
                      </ol>

                      {item.closing?.map((paragraph) => (
                        <p key={paragraph} className="text-xs md:text-sm lg:text-base leading-relaxed italic text-primary">
                          {renderNumberText(paragraph)}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
