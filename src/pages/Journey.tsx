import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "@/components/ui/morphing-popover";

type CredibilityStat = {
  value: number;
  label: string;
  suffix?: string;
};

const credibilityStats: CredibilityStat[] = [
  { value: 107893, suffix: "+", label: "Children Reached" },
  { value: 25, label: "Years Humanitarian Experience" },
  { value: 200, suffix: "+", label: "Schools Engaged" },
  { value: 63, label: "Villages Served" },
  { value: 32, label: "Countries with Footprints" },
  { value: 36, label: "Nationalities for Colleagues" },
];

type Milestone = {
  label: string;
  title: string;
  details: string[];
  bullets?: string[];
};

const milestones: Milestone[] = [
  {
    label: "1986 – 1993",
    title: "Academic Foundation in Child Development",
    details: [
      "BSc, MSc for a foundation in understanding childhood growth, behaviour, and learning.",
    ],
  },
  {
    label: "1994",
    title: "Government of India – Ministry of Personnel",
    details: [
      "Served at the office of a Cabinet Minister in New Delhi.",
    ],
  },
  {
    label: "1998 – 2001",
    title: "Private Sector Exposure",
    details: [
      "Worked across corporate roles before moving fully into humanitarian work.",
    ],
  },
  {
    label: "2002",
    title: "UN and WHO Support",
    details: [
      "Supported HIV/AIDS, Malaria, and Tuberculosis projects across Southeast Asian countries.",
    ],
  },
  {
    label: "2002 – 2012",
    title: "17 Years with the Red Cross Movement",
    details: [
      "Designed and delivered multiple children's programs across India.",
      "Reached over 107,893 children across schools and communities.",
    ],
    bullets: [
      "Youth peer education programs",
      "Disaster risk reduction training",
      "First aid and emergency preparedness",
      "School and community life-skills initiatives",
    ],
  },
  {
    label: "2012 – 2018",
    title: "International Work with Red Cross Globally",
    details: [
      "Worked in humanitarian contexts across Haiti, Iraq, Sudan, and Ethiopia.",
      "Supported programs in challenging disaster and conflict environments.",
    ],
  },
  {
    label: "2018 - 2024",
    title: "Oxfam – Iraq",
    details: [
      "Continued humanitarian leadership and program work in complex conflict contexts.",
      "Based in Iraq during the Israel-Palestine-Gaza war.",
    ],
  },
  {
    label: "2025",
    title: "Ikigai Teen Conceptualised",
    details: [
      "Drawing from decades of work with children and youth, the idea for a focused teen mindset development platform started taking shape.",
    ],
  },
  {
    label: "2026",
    title: "Ikigai Teen Launch",
    details: [
      "A structured coaching initiative helping teenagers develop clarity of identity, emotional resilience, responsible digital habits, purpose, and leadership.",
    ],
  },
];

const milestonePopoverVariants = {
  initial: {
    opacity: 0,
    scale: 0.94,
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 6,
  },
};

const whyIkigaiSummary = "Ikigai Teen was founded after Irene Arathi Pais observed dramatic changes in teen behaviour following the widespread adoption of smartphones during the COVID era. Conversations with parents, educators, and teenagers revealed rising digital dependency, declining focus, and emotional strain. Ikigai Teen helps teens develop awareness, resilience, and purpose so they can navigate the digital world wisely and grow into responsible future leaders";

const whyIkigaiExpanded = [
  "After more than two decades of working with children across schools, villages, and humanitarian programs, Irene Arathi Pais has witnessed how profoundly the teen years shape the future of individuals and societies.",
  "Her concern deepened during the COVID-19 pandemic when millions of students were required to use smartphones for online learning. While technology ensured continuity in education, it also opened unrestricted digital access for many teenagers - often without guidance or awareness from adults.",
  "In the years since, conversations with parents, educators, and teens themselves revealed worrying patterns: declining focus, weakening family connections, growing digital dependency, and increasing exposure to unsafe online behaviour.",
  "At the same time, Irene recognised that technology itself is not the enemy. When used wisely, it can be a powerful tool for learning, creativity, and opportunity.",
  "What concerned her most was the absence of guidance during a critical stage of life.",
  "As Mahatma Gandhi once said, \"Youth are the salt of the nation.\" Irene extends that thought further: \"Teens are the soil of the nation - what we sow during these years becomes the character of society tomorrow.\"",
  "Ikigai Teen was created to help young people develop awareness, emotional strength, digital discipline, and clarity of purpose so they can grow into responsible digital citizens and ethical future leaders.",
];

const formatNumber = (value: number) => value.toLocaleString("en-US");

const useCountUp = (target: number, shouldAnimate: boolean) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;
    const duration = 3200;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    setCurrentValue(0);
    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [shouldAnimate, target]);

  return currentValue;
};

const CredibilityCounter = ({ value, suffix, label, shouldAnimate }: CredibilityStat & { shouldAnimate: boolean }) => {
  const currentValue = useCountUp(value, shouldAnimate);

  return (
    <div className="rounded-xl border border-border/60 bg-background/70 p-5 text-center shadow-sm">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary leading-none">
        {formatNumber(currentValue)}{suffix ?? ""}
      </div>
      <p className="mt-3 text-sm md:text-base font-body text-muted-foreground leading-snug">{label}</p>
    </div>
  );
};

const Journey = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripVisible, setStripVisible] = useState(false);
  const [activeMilestoneLabel, setActiveMilestoneLabel] = useState<string | null>(null);
  const [showWhyReadMore, setShowWhyReadMore] = useState(false);

  useEffect(() => {
    const element = stripRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStripVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.65, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="The Journey"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">
              Every teenager carries a spark of purpose – Their IKIGAI
            </p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-8">
              <div ref={stripRef} className="space-y-5 border-t border-border/50 pt-6">
                <h2>
                  <LetterSwapForward
                    label="Credibility Strip"
                    className="text-2xl md:text-3xl font-display font-semibold text-primary"
                  />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {credibilityStats.map((stat) => (
                    <CredibilityCounter
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      shouldAnimate={stripVisible}
                    />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          className="pb-16 bg-background overflow-x-clip"
          onMouseLeave={() => setActiveMilestoneLabel(null)}
        >
          <div className="px-6 md:px-10 lg:px-14">
            <h2>
              <LetterSwapForward
                label="Founder Milestones - Irene Arathi"
                className="text-2xl md:text-3xl font-display font-semibold text-primary"
              />
            </h2>
          </div>
          <div className="relative mt-6 w-full px-4 sm:px-6 md:px-10 lg:px-14">
            <div className="relative py-10">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-primary/70" aria-hidden="true" />
              <ol className="relative flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
                {milestones.map((milestone, index) => {
                  const isTop = index % 2 === 0;
                  const isActive = activeMilestoneLabel === milestone.label;
                  const isNearLeftEdge = index <= 1;
                  const isNearRightEdge = index >= milestones.length - 2;
                  const horizontalAnchorClass = isNearRightEdge
                    ? "right-0 translate-x-0"
                    : isNearLeftEdge
                      ? "left-0 translate-x-0"
                      : "left-1/2 -translate-x-1/2";

                  return (
                    <li key={milestone.label} className="relative flex-1">
                      <MorphingPopover
                        className="w-full"
                        variants={milestonePopoverVariants}
                        open={isActive}
                        onOpenChange={(nextOpen) => {
                          setActiveMilestoneLabel((current) => {
                            if (nextOpen) {
                              return milestone.label;
                            }

                            return current === milestone.label ? null : current;
                          });
                        }}
                      >
                        <MorphingPopoverTrigger asChild>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveMilestoneLabel(milestone.label)}
                            onFocus={() => setActiveMilestoneLabel(milestone.label)}
                            className="flex w-full flex-col items-center text-center"
                            aria-expanded={isActive}
                            aria-label={`Show details for ${milestone.label}`}
                          >
                            {isTop ? (
                              <span className="mb-6 whitespace-nowrap font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide text-foreground/90">{milestone.label}</span>
                            ) : (
                              <span className="mb-6 h-[1.1rem] sm:h-[1.25rem]" aria-hidden="true" />
                            )}
                            <span
                              className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-primary"
                              aria-hidden="true"
                            />
                            {isTop ? (
                              <span className="mt-6 h-[1.1rem] sm:h-[1.25rem]" aria-hidden="true" />
                            ) : (
                              <span className="mt-6 whitespace-nowrap font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide text-foreground/90">{milestone.label}</span>
                            )}
                          </button>
                        </MorphingPopoverTrigger>

                        <MorphingPopoverContent
                          className={`${horizontalAnchorClass} z-30 w-[min(24rem,calc(100vw-2rem))] rounded-lg border border-primary/40 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-4 text-left shadow-lg shadow-primary/20 ${
                            isTop ? "bottom-[calc(100%+1rem)]" : "top-[calc(100%+1rem)]"
                          }`}
                        >
                          <p className="font-display text-sm font-semibold text-primary">{milestone.label}</p>
                          <p className="mt-1 font-body text-base font-medium text-foreground">{milestone.title}</p>
                          <div className="mt-3 space-y-2">
                            {milestone.details.map((line) => (
                              <p key={line} className="font-body text-sm leading-relaxed text-muted-foreground">
                                {line}
                              </p>
                            ))}
                            {milestone.bullets ? (
                              <ul className="space-y-1">
                                {milestone.bullets.map((item) => (
                                  <li key={item} className="font-body text-sm leading-relaxed text-muted-foreground">
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </MorphingPopoverContent>
                      </MorphingPopover>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-5">
              <h2>
                <LetterSwapForward
                  label="Why Irene Started Ikigai Teen"
                  className="text-2xl md:text-3xl font-display font-semibold text-primary"
                />
              </h2>

              <div className="space-y-3">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {whyIkigaiSummary}
                  {!showWhyReadMore ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        onClick={() => setShowWhyReadMore(true)}
                        className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                      >
                        Read more
                      </button>
                    </>
                  ) : null}
                </p>

                {showWhyReadMore ? (
                  <div className="space-y-3">
                    {whyIkigaiExpanded.map((paragraph, paragraphIndex) => (
                      <p key={paragraph} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {paragraph}
                        {paragraphIndex === whyIkigaiExpanded.length - 1 ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              onClick={() => setShowWhyReadMore(false)}
                              className="ml-1 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                            >
                              Show less
                            </button>
                          </>
                        ) : null}
                      </p>
                    ))}
                  </div>
                ) : null}

                <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                  "Teen years are the foundation of a nation's future - what we guide today becomes the character of society tomorrow."
                </p>
                <p className="text-xs md:text-sm font-semibold text-primary/90">- Irene Arathi Pais</p>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-5">
              <h2>
                <LetterSwapForward
                  label="The Teen Reality Today"
                  className="text-2xl md:text-3xl font-display font-semibold text-primary"
                />
              </h2>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Global research and national data increasingly warn that adolescent well-being is being reshaped by rapid digital exposure.
              </p>

              <ul className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                <li>• Over 95% of young people aged 15-29 in India who own a mobile phone now use a smartphone, giving widespread access to the internet and social media.</li>
                <li>• Studies estimate that around 23% of Indian school children may experience mental health challenges, including anxiety, behavioural issues, or emotional distress.</li>
                <li>• The Economic Survey of India (2025-26) has flagged digital addiction and excessive screen use as a growing concern affecting youth productivity and mental health.</li>
                <li>• Global research suggests more than 1 in 10 adolescents show problematic social-media behaviour, struggling to control their usage.</li>
                <li>• Across many countries, over one-third of young people report experiencing cyberbullying online, highlighting growing safety concerns in digital spaces.</li>
              </ul>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Studies by organisations such as UNICEF, WHO, and child-development researchers increasingly warn about rising screen dependency, sleep disruption, and mental-health pressures among adolescents.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Governments are beginning to respond. Countries such as Australia have introduced social-media bans for children under 16, while nations including France, Indonesia, Spain, and others are considering similar restrictions to protect young users.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Even in India, Karnataka has proposed restricting social-media access for children under 16, reflecting growing concern about digital addiction and online risks among youth.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                These developments underline a global recognition that while technology offers immense opportunity, young people need guidance to navigate the digital world safely and wisely.
              </p>

              <p className="text-sm md:text-base italic font-semibold text-foreground/85">
                "If teenagers learn to master their minds before the digital world masters them, they become builders of the future, not victims of it."
              </p>
              <p className="text-xs md:text-sm font-semibold text-primary/90">- Irene Arathi Pais</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Journey;