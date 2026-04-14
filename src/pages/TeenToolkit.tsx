import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

const toolkitNeedsNow = [
  "I feel distracted",
  "I'm overthinking",
  "I feel low / confused",
  "I can't stay consistent",
  "I want to feel more confident",
  "I want to fix my routine",
  "I feel stuck",
];

const quickResetTools = [
  {
    title: "Calm My Mind (2 mins)",
    steps: [
      "Breathe in for 4, hold 4, out for 6 (repeat 5 times)",
      "Look around and name 5 things you see",
      "Tell yourself: I can slow this down",
    ],
  },
  {
    title: "Stop Overthinking (3 steps)",
    steps: ["Write the problem in one line", "Write one next step", "Do only that step"],
  },
  {
    title: "Phone Reset",
    steps: ["Keep phone away for 10 minutes", "Do 1 small task fully", "Then check"],
  },
  {
    title: "Restart My Day",
    steps: ["Forget the earlier part of the day", "Pick 1 useful action", "Complete it"],
  },
];

const habitTools = [
  {
    title: "Start Small Routine",
    steps: [
      "Wake up -> no phone for first 15 mins",
      "Do 1 useful task",
      "Keep 1 promise to yourself",
    ],
  },
  {
    title: "3-Day Mini Challenge",
    steps: [
      "Day 1: Notice your distractions",
      "Day 2: Delay them by 5 mins",
      "Day 3: Do 1 hard thing first",
    ],
  },
  {
    title: "Keep One Promise",
    steps: ["Don't try to fix everything", "Just keep one promise daily"],
  },
];

const mindEmotionTools = [
  {
    title: "What Am I Feeling?",
    steps: [
      "Pick one: Angry, Confused, Left out, Pressured, Low",
      "Why might I feel this?",
      "What will help me right now?",
    ],
  },
  {
    title: "Friendship Reset",
    steps: [
      "Not everyone has to like you",
      "Choose 1 person who respects you",
      "Be real, not impressive",
    ],
  },
  {
    title: "Confidence Builder",
    steps: ["Do 1 thing you've been avoiding", "Small courage builds real confidence"],
  },
];

const bodyEnergyTools = [
  {
    title: "Why Am I So Tired?",
    steps: [
      "Check: Sleep late? Too much screen? No movement?",
      "Fix: Sleep earlier, move your body, drink water",
    ],
  },
  {
    title: "Self-Respect Basics",
    steps: ["Clean body", "Proper sleep", "Eat on time", "Keep your space decent"],
  },
];

const supportParentScripts1315 = [
  "I think this could help me focus better. Can we check this together?",
  "This looks useful, not random motivation. Can we go through it?",
  "I want to improve my habits. Can I try this program?",
];

const quickResetTools1618 = [
  {
    title: "Mental Reset (2 mins)",
    steps: ["Pause", "Breathe slow", "Ask: What actually matters right now?"],
  },
  {
    title: "Break Overthinking",
    steps: ["What's the issue? (1 line)", "What's in my control?", "What's the next action?"],
  },
  {
    title: "Digital Control Reset",
    steps: ["Put phone away", "Work in 15-min focus block", "No switching"],
  },
  {
    title: "Restart After a Bad Day",
    steps: ["Stop replaying the day", "Choose 1 meaningful action", "Execute"],
  },
];

const disciplineTools1618 = [
  {
    title: "Build a Simple Routine",
    steps: ["Fixed wake-up", "One priority task", "Limited distractions", "Wind-down before sleep"],
  },
  {
    title: "Consistency Builder",
    steps: [
      "You don't need intensity. You need repetition.",
      "Pick: 1 habit, 1 time, 1 place",
      "Repeat daily",
    ],
  },
  {
    title: "Stop Starting & Stopping",
    steps: ["Reduce goals", "Increase follow-through", "Track small wins"],
  },
];

const mindEmotionTools1618 = [
  {
    title: "Emotional Check-In",
    steps: ["What am I feeling?", "What triggered this?", "What is the best response?"],
  },
  {
    title: "Comparison Reset",
    steps: ["You are comparing your reality to someone else's highlight", "Focus on your path"],
  },
  {
    title: "Attraction / Relationship Clarity",
    steps: [
      "Are you thinking clearly or emotionally?",
      "Is this helping you grow or distracting you?",
      "Stay grounded in your values",
    ],
  },
  {
    title: "Confidence Rebuild",
    steps: ["Keep promises to yourself", "Reduce validation-seeking", "Build internal respect"],
  },
];

const bodyControlTools1618 = [
  {
    title: "Energy Audit",
    steps: ["Sleep", "Food", "Screen", "Movement", "Fix the weakest one"],
  },
  {
    title: "Night Routine Reset",
    steps: ["No screens 30 mins before sleep", "Slow your mind", "Plan next day"],
  },
  {
    title: "Self-Control Basics",
    steps: ["Delay impulses", "Stay with discomfort", "Choose long-term over short-term"],
  },
];

const supportParentScripts1618 = [
  "I feel like I need more structure. Can we explore this?",
  "This looks like a proper system, not just motivation. Can we review it?",
  "I want to improve seriously. Can we consider this?",
];

const TeenToolkit = () => {
  const [searchParams] = useSearchParams();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const [selectedNeed1315, setSelectedNeed1315] = useState<string | null>(null);
  const [hasContinued1315, setHasContinued1315] = useState(false);
  const [selectedNeed1618, setSelectedNeed1618] = useState<string | null>(null);
  const [hasContinued1618, setHasContinued1618] = useState(false);
  const selectedSectionRef = useRef<HTMLElement | null>(null);
  const continuedContentRef = useRef<HTMLDivElement | null>(null);
  const continuedContentRef1618 = useRef<HTMLDivElement | null>(null);

  const handleCardMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 16;
    const rotateY = (centerX - x) / 16;

    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-1px)`;
  };

  const handleCardMouseLeave = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  const ageCategories = [
    {
      id: "13-15",
      label: "13-15",
      description: "Early teen years - practical tools for identity, habits, and confidence.",
    },
    {
      id: "16-18",
      label: "16-18",
      description: "Late teen years - deeper tools for clarity, discipline, and direction.",
    },
  ];

  const getDirectionFromAge = (ageId: string) => (ageId === "13-15" ? -1 : 1);

  const selectAge = (ageId: string) => {
    setTransitionDirection(getDirectionFromAge(ageId));
    setSelectedAge(ageId);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
  };

  const returnToAgeSelection = () => {
    if (selectedAge) {
      setTransitionDirection(-getDirectionFromAge(selectedAge));
    }
    setSelectedAge(null);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const requestedAge = searchParams.get("age");
    if (requestedAge !== "13-15" && requestedAge !== "16-18") {
      return;
    }

    setTransitionDirection(getDirectionFromAge(requestedAge));
    setSelectedAge(requestedAge);
    setSelectedNeed1315(null);
    setHasContinued1315(false);
    setSelectedNeed1618(null);
    setHasContinued1618(false);
  }, [searchParams]);

  const pageTransition = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  useEffect(() => {
    if (selectedAge && selectedSectionRef.current) {
      selectedSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAge]);

  useEffect(() => {
    if (hasContinued1315 && continuedContentRef.current) {
      continuedContentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasContinued1315]);

  useEffect(() => {
    if (hasContinued1618 && continuedContentRef1618.current) {
      continuedContentRef1618.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasContinued1618]);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Teen Toolkit" />
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Practical tools to help teens build focus, confidence, emotional steadiness, and direction.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait" initial={false}>
          {selectedAge === null && (
            <motion.section
              key="choose-age"
              className="py-12 md:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary/85 mb-12 text-center">
                    <LetterSwapForward label="Choose your age" />
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ageCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        onClick={() => selectAge(category.id)}
                        className="relative p-5 sm:p-8 rounded-xl border-2 transition-[transform,border-color,box-shadow,background-color] duration-300 text-left group overflow-hidden border-border hover:border-primary/80 bg-[hsl(195_25%_96%_/_0.7)] hover:bg-[hsl(195_25%_96%_/_0.82)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_28px_hsl(var(--primary)/0.5)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(52, 211, 153, 0.24), rgba(16, 185, 129, 0.1) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-3xl md:text-4xl number-font font-bold text-primary tracking-tight">{category.label}</h3>
                            <ArrowRight className="w-6 h-6 text-primary/60" />
                          </div>
                          <p className="text-foreground/75 text-sm md:text-base leading-relaxed">{category.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {selectedAge === "13-15" && (
            <motion.section
              key="age-13-15"
              ref={selectedSectionRef}
              className="py-16 md:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 sm:px-6 space-y-16">
                <div className="max-w-5xl mx-auto">
                  <button
                    type="button"
                    onClick={returnToAgeSelection}
                    className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Choose a different age
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                {!hasContinued1315 && (
                <motion.div
                  key="toolkit-needs-selector"
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.7)] p-5 sm:p-8"
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Teen Toolkit (Age 13-15)</p>
                  <h2 className="w-full leading-tight text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                    You Don't Need Another Lecture. You Need Tools That Actually Help.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Not everything needs a big solution. Sometimes you just need the right reset at the right time.
                  </p>
                  <p className="mt-5 text-foreground font-medium mb-3">Choose what you need right now:</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {toolkitNeedsNow.map((need) => (
                      <button
                        key={need}
                        type="button"
                        onClick={() => setSelectedNeed1315(need)}
                        className={`text-left rounded-xl border p-5 transition-[transform,border-color,box-shadow,background-color,color] duration-300 ${
                          selectedNeed1315 === need
                            ? "border-primary/80 bg-[hsl(195_25%_96%_/_0.95)] text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                            : "border-border/60 bg-card text-muted-foreground hover:border-primary/60 hover:bg-[hsl(195_25%_96%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.25)]"
                        }`}
                      >
                        {need}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setHasContinued1315(true)}
                      disabled={!selectedNeed1315}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedNeed1315
                          ? "bg-primary text-primary-foreground hover:brightness-105"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
                )}

                {hasContinued1315 && (
                  <motion.div
                    key="toolkit-content-reveal"
                    ref={continuedContentRef}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-16"
                  >
                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Quick Resets (Try Now)" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickResetTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Build Better Habits" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {habitTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Mind + Emotion Tools" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mindEmotionTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Body + Energy Basics" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {bodyEnergyTools.map((tool) => (
                      <ClipPathInfoCard key={tool.title} title={tool.title}>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                          {tool.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </ClipPathInfoCard>
                    ))}
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-5">
                    <LetterSwapForward label="Get Support" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <ClipPathInfoCard title="When to Talk to Someone">
                    <p className="text-sm text-muted-foreground mb-3">If you feel stuck for many days, very low, confused, or unable to handle things.</p>
                    <p className="text-sm font-semibold text-foreground mb-2">Talk to:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>parent</li>
                      <li>teacher</li>
                      <li>trusted adult</li>
                    </ul>
                  </ClipPathInfoCard>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-3">
                    <LetterSwapForward
                      label="Quick tools help. But stronger change needs training."
                      className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                    />
                  </h3>
                  <p className="text-muted-foreground mb-5">
                    If you keep facing the same problems - distraction, inconsistency, confusion - you may need more than tips.
                  </p>
                  <p className="text-sm font-semibold text-foreground mb-3">What this is:</p>
                  <p className="text-sm text-muted-foreground mb-3">A 90-day guided challenge to help you:</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">focus better</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build discipline</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">feel more confident</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">manage emotions</li>
                    <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">become more responsible</li>
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Explore the 90-Day Challenge</button>
                    <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Share This With My Parent</button>
                  </div>
                </div>

                <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                  <h3 className="mb-4">
                    <LetterSwapForward label="How to Ask Your Parent" className="text-2xl font-display font-semibold text-primary/85" />
                  </h3>
                  <p className="text-muted-foreground mb-4">Not sure how to say it? You can try:</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {supportParentScripts1315.map((line) => (
                      <li
                        key={line}
                        className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(195_25%_96%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                      >
                        "{line}"
                      </li>
                    ))}
                  </ul>
                </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {selectedAge === "16-18" && (
            <motion.section
              key="age-16-18"
              ref={selectedSectionRef}
              className="py-16 md:py-20 bg-background"
              initial={{ opacity: 0, x: 56 * transitionDirection, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48 * transitionDirection, scale: 0.99, filter: "blur(6px)" }}
              transition={pageTransition}
            >
              <div className="container mx-auto px-4 sm:px-6 space-y-16">
                <div className="max-w-5xl mx-auto">
                  <button
                    type="button"
                    onClick={returnToAgeSelection}
                    className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs md:text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Choose a different age
                  </button>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {!hasContinued1618 && (
                    <motion.div
                      key="toolkit-needs-selector-1618"
                      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.7)] p-5 sm:p-8"
                    >
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Teen Toolkit (Age 16-18)</p>
                      <h2 className="w-full leading-tight text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                        You Don't Need Another Lecture. You Need Tools That Actually Help.
                      </h2>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Not everything needs a big solution. Sometimes you just need the right reset at the right time.
                      </p>
                      <p className="mt-5 text-foreground font-medium mb-3">Choose what you need right now:</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {toolkitNeedsNow.map((need) => (
                          <button
                            key={need}
                            type="button"
                            onClick={() => setSelectedNeed1618(need)}
                            className={`text-left rounded-xl border p-5 transition-[transform,border-color,box-shadow,background-color,color] duration-300 ${
                              selectedNeed1618 === need
                                ? "border-primary/80 bg-[hsl(195_25%_96%_/_0.95)] text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                                : "border-border/60 bg-card text-muted-foreground hover:border-primary/60 hover:bg-[hsl(195_25%_96%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_0_16px_hsl(var(--primary)/0.25)]"
                            }`}
                          >
                            {need}
                          </button>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setHasContinued1618(true)}
                          disabled={!selectedNeed1618}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedNeed1618
                              ? "bg-primary text-primary-foreground hover:brightness-105"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {hasContinued1618 && (
                    <motion.div
                      key="toolkit-content-reveal-1618"
                      ref={continuedContentRef1618}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-16"
                    >
                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Quick Resets (Try Now)" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {quickResetTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Build Discipline + Consistency" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {disciplineTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Mind + Emotion Tools" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {mindEmotionTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Body + Energy + Control" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {bodyControlTools1618.map((tool) => (
                            <ClipPathInfoCard key={tool.title} title={tool.title}>
                              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                {tool.steps.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ul>
                            </ClipPathInfoCard>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-5">
                          <LetterSwapForward label="Real-Life Support" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <ClipPathInfoCard title="When to Seek Help">
                          <p className="text-sm text-muted-foreground mb-3">If you feel constantly overwhelmed, emotionally unstable, stuck in patterns, or unable to move forward.</p>
                          <p className="text-sm font-semibold text-foreground mb-2">Talk to:</p>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>parent</li>
                            <li>mentor</li>
                            <li>counsellor</li>
                          </ul>
                        </ClipPathInfoCard>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-3">
                          <LetterSwapForward
                            label="You don't need more content. You need a system."
                            className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                          />
                        </h3>
                        <p className="text-muted-foreground mb-5">
                          If you're serious about becoming focused, disciplined, confident, and clear, structure matters.
                        </p>
                        <p className="text-sm font-semibold text-foreground mb-3">What this is:</p>
                        <p className="text-sm text-muted-foreground mb-3">A 90-day guided challenge to help you:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build consistency</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve focus</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">manage distractions</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">strengthen emotional control</li>
                          <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">move toward purpose</li>
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Explore the 90-Day Challenge</button>
                          <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Share This With My Parent</button>
                        </div>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-4">
                          <LetterSwapForward label="How to Talk at Home" className="text-2xl font-display font-semibold text-primary/85" />
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          {supportParentScripts1618.map((line) => (
                            <li
                              key={line}
                              className="rounded-lg border border-border/60 p-3 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:scale-[1.015] hover:border-primary/60 hover:bg-[hsl(195_25%_96%_/_0.95)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_0_20px_hsl(var(--primary)/0.35)]"
                            >
                              "{line}"
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                        <h3 className="mb-3">
                          <LetterSwapForward
                            label="You don't have to stay stuck in the same patterns."
                            className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                          />
                        </h3>
                        <p className="text-muted-foreground mb-2">Small tools can start change.</p>
                        <p className="text-muted-foreground mb-5">The right system can transform it.</p>
                        <div className="flex flex-wrap gap-3">
                          <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Explore the 90-Day Challenge</button>
                          <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Share This With My Parent</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default TeenToolkit;
