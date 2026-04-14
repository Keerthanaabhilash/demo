import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const memberUnlockCards = [
  {
    id: "identity-confidence",
    title: "Identity & Confidence",
    description: "Discover who you are, build self-belief, and grow into your strongest self.",
  },
  {
    id: "events-experiences",
    title: "Events & Experiences",
    description: "Access exciting club activities, themed events, challenges, showcases, and fun growth experiences.",
  },
  {
    id: "perks-benefits",
    title: "Perks & Partner Benefits",
    description: "Enjoy special member-only offers, curated discounts, and trusted teen-friendly benefits.",
  },
  {
    id: "expert-access",
    title: "Expert Access",
    description: "Connect with credible professionals and support services when guidance is needed.",
  },
  {
    id: "creativity-skills",
    title: "Creativity, Hobbies & Skills",
    description: "Explore interests, passions, talents, and opportunities beyond academics.",
  },
  {
    id: "member-recognition",
    title: "Member Recognition",
    description: "Stand out through badges, certificates, spotlights, leadership roles, and member identity perks.",
  },
  {
    id: "wellness-support",
    title: "Wellness & Support",
    description: "Access a safe ecosystem that supports emotional wellbeing, balance, resilience, and healthy growth.",
  },
  {
    id: "community-belonging",
    title: "Community & Belonging",
    description: "Be part of a positive teen tribe where you feel seen, valued, and inspired.",
  },
  {
    id: "leadership-opportunities",
    title: "Leadership & Opportunities",
    description: "Step into responsibility, contribution, collaboration, and future-ready growth opportunities.",
  },
  {
    id: "merch-identity",
    title: "Merch, Badges & Club Identity",
    description: "Unlock cool ways to wear, share, and proudly represent your Ikigai Teen membership.",
  },
];

const detailSections = [
  {
    id: "identity-confidence",
    title: "Identity & Confidence",
    opening: "Figure yourself out. Own who you are.",
    body: "No fake confidence. No pretending. This is where you start understanding what makes you you and actually feel good about it.",
    bullets: [
      "What you are good at and what you are still building",
      "How to handle comparison and self-doubt",
      "How to speak, express, and show up with confidence",
      "How to stop shrinking yourself to fit in",
    ],
    closing: "Why it matters: You stop second-guessing yourself all the time.",
  },
  {
    id: "events-experiences",
    title: "Events & Experiences",
    opening: "Not boring. Not lectures. Actual experiences.",
    body: "You do not just attend. You experience. Every activity is designed to make growth feel energizing and social.",
    bullets: [
      "Fun challenges and themed events",
      "Games and activities that do not feel childish",
      "Open mics, showcases, and creative spaces",
      "Competitions that push you in a healthy way",
    ],
    closing: "Why it matters: You start enjoying growth instead of avoiding it.",
  },
  {
    id: "perks-benefits",
    title: "Perks & Partner Benefits",
    opening: "Being a member should come with real advantages.",
    body: "You are not just joining something. You are unlocking useful access across hobbies, learning, wellness, and teen lifestyle.",
    bullets: [
      "Exclusive offers and member-only discounts",
      "Early access to opportunities",
      "Curated recommendations that are actually useful",
      "Benefits selected for teens and families",
    ],
    closing: "Why it matters: You get benefits others do not even know exist.",
  },
  {
    id: "expert-access",
    title: "Expert Access",
    opening: "Real help when life feels heavy, messy, or unclear.",
    body: "When guidance is needed, members can connect with trusted professionals without stigma or noise.",
    bullets: [
      "Counsellors, psychologists, and mentors",
      "Wellness experts and creative therapists",
      "Focus, habits, and digital balance support",
      "Practical guidance with privacy and care",
    ],
    closing: "Why it matters: You do not have to figure everything out alone.",
  },
  {
    id: "creativity-skills",
    title: "Creativity, Hobbies & Skills",
    opening: "You are more than marks. Start acting like it.",
    body: "This is a space to create instead of only consume and to build skills that make you feel alive and capable.",
    bullets: [
      "Try new interests and practical hobbies",
      "Build communication and storytelling skills",
      "Explore design, media, coding, and projects",
      "Discover talents that do not show up in report cards",
    ],
    closing: "Why it matters: You discover sides of yourself you did not know existed.",
  },
  {
    id: "member-recognition",
    title: "Member Recognition",
    opening: "Be seen. Not just scored.",
    body: "Here, consistency, courage, and contribution are recognized in visible and motivating ways.",
    bullets: [
      "Badges, certificates, and member spotlights",
      "Shoutouts for effort and consistency",
      "Leadership tags and profile identity perks",
      "Recognition beyond just top-rank performance",
    ],
    closing: "Why it matters: You feel noticed for the right reasons.",
  },
  {
    id: "wellness-support",
    title: "Wellness & Support",
    opening: "Get stronger on the inside, not just look fine outside.",
    body: "Members get practical ways to regulate stress, improve focus, and build healthier patterns that actually stick.",
    bullets: [
      "Simple tools for stress, distraction, and overthinking",
      "Daily routines for balance and resilience",
      "Support during difficult phases",
      "Healthy growth without heavy lectures",
    ],
    closing: "Why it matters: You stop feeling all over the place.",
  },
  {
    id: "community-belonging",
    title: "Community & Belonging",
    opening: "Find your people, not just people around you.",
    body: "This community is built for authenticity, respect, and growth, so teens can belong without pretending.",
    bullets: [
      "A positive tribe with shared values",
      "Real connections without fake pressure",
      "A space where you can be yourself",
      "Peers who are also trying to grow",
    ],
    closing: "Why it matters: You feel less alone and more understood.",
  },
  {
    id: "leadership-opportunities",
    title: "Leadership & Opportunities",
    opening: "Step up. Try things. Do something that matters.",
    body: "The club creates practical opportunities to lead, collaborate, and contribute before adulthood.",
    bullets: [
      "Ambassador pathways and youth leadership roles",
      "Project collaboration and initiative building",
      "Responsibility in real club settings",
      "Future-ready confidence through action",
    ],
    closing: "Why it matters: You realize you are capable of more than you thought.",
  },
  {
    id: "merch-identity",
    title: "Merch, Badges & Club Identity",
    opening: "Be part of something you are proud to show.",
    body: "Membership here is visible and meaningful through digital identity, badges, shareable milestones, and club gear.",
    bullets: [
      "Digital member identity and profile frames",
      "Badges, stickers, journals, and gear",
      "Certificates and shareable moments",
      "Ways to wear, use, and represent club identity",
    ],
    closing: "Why it matters: You feel proud saying, I am part of this.",
  },
];

const IkigaiTeenClub = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const detailsById = detailSections.reduce<Record<string, (typeof detailSections)[number]>>((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-8 md:py-12 lg:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-3 md:mb-4"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Ikigai Teen Club" className="justify-center" />
              </motion.h1>
              <motion.p
                className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                A members-only world for teens becoming their best selves.
              </motion.p>
              <motion.p
                className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-muted-foreground/95 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                More than a membership. More than a club. This is a vibrant members-only space where teens can belong,
                build confidence, express themselves, unlock meaningful opportunities, and grow inside a positive,
                future-ready community.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-4 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-primary text-center mb-3 md:mb-4">
                <LetterSwapForward label="What Members Unlock" className="justify-center" />
              </h2>
              <p className="text-center text-sm md:text-base text-muted-foreground mb-6 md:mb-10 max-w-3xl mx-auto">
                Click any card to jump to a detailed section. The homepage stays breathable and the deeper content stays
                easy to explore.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                {memberUnlockCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.03 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {expandedCardId === card.id ? (
                        <motion.article
                          key={`${card.id}-expanded`}
                          className="rounded-xl border border-border/60 bg-card p-6"
                          initial={{ opacity: 0, y: 12, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.99 }}
                          transition={{ duration: 0.24 }}
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedCardId(null)}
                            className="mb-3 inline-flex items-center gap-1 rounded-md border border-primary/35 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                            aria-label={`Collapse ${card.title} details`}
                          >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Back
                          </button>
                          <h3 className="text-2xl font-display font-semibold text-primary mb-3">{detailsById[card.id]?.title ?? card.title}</h3>
                          <p className="text-foreground font-medium mb-3">{detailsById[card.id]?.opening}</p>
                          <p className="text-sm leading-relaxed text-muted-foreground mb-4">{detailsById[card.id]?.body}</p>
                          <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                            {(detailsById[card.id]?.bullets ?? []).map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm font-semibold text-primary/90">{detailsById[card.id]?.closing}</p>
                        </motion.article>
                      ) : (
                        <motion.div key={`${card.id}-collapsed`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                          <button
                            type="button"
                            onClick={() => setExpandedCardId(card.id)}
                            className="block w-full text-left"
                            aria-label={`Open ${card.title} details`}
                          >
                            <ClipPathInfoCard
                              title={card.title}
                              body={card.description}
                              className="rounded-xl bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6"
                            >
                              <p className="mt-4 text-xs uppercase tracking-wide font-semibold text-primary/90">Open details</p>
                            </ClipPathInfoCard>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <ClipPathInfoCard className="h-full rounded-xl bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-7">
                    <h2 className="text-2xl font-display font-semibold text-primary mb-3">
                      <LetterSwapForward label="Why teens love it" className="justify-start" />
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      It is not boring. Not preachy. Not fake. It is a space where you can be yourself, meet your kind of
                      people, discover your strengths, try new things, access cool opportunities, and feel supported when
                      life gets messy.
                    </p>
                    <p className="text-foreground font-medium">It helps you grow without losing your vibe.</p>
                  </ClipPathInfoCard>
                </motion.div>

                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <ClipPathInfoCard className="h-full rounded-xl bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-7">
                    <h2 className="text-2xl font-display font-semibold text-primary mb-3">
                      <LetterSwapForward label="Why parents value it" className="justify-start" />
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Ikigai Teen Club offers teens a positive, enriching, and well-curated ecosystem that supports
                      identity, confidence, emotional wellbeing, life skills, healthy engagement, and access to credible
                      guidance, all within a safe and growth-oriented framework.
                    </p>
                  </ClipPathInfoCard>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-[hsl(195_25%_96%_/_0.8)] p-4 sm:p-6 md:p-8 text-center">
              <p className="text-sm md:text-base lg:text-lg text-foreground/90 leading-relaxed mb-6 md:mb-8">
                Inside Ikigai Teen Club, growth does not feel heavy. It feels meaningful. It feels exciting. It feels
                real. Most of all, it feels like a space where teens can become more of who they are meant to be.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold"
                >
                  Join the Club
                </Link>
                <a
                  href="#identity-confidence"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/35 text-primary text-xs sm:text-sm font-semibold"
                >
                  Explore Member Benefits
                </a>
                <Link
                  to="/parent-hub"
                  className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/35 text-primary text-xs sm:text-sm font-semibold"
                >
                  For Parents
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IkigaiTeenClub;