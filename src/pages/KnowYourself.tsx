import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import HolographicCard from "@/components/ui/holographic-card";
import { ClipPathInfoCard } from "@/components/ui/clip-path-links";

type SelfCheckPrompt = {
  label: string;
  tags: string[];
  reverse?: boolean;
};

type ResponseOption = {
  label: string;
  value: number;
};

type TestResult = {
  primary: string;
  secondary: string | null;
  summary: string;
};

const relatableQuestions = [
  "Why do I feel weird sometimes for no reason?",
  "Why do I care so much what others think?",
  "Why do I keep wasting time even when I don't want to?",
  "Why do I feel left out so easily?",
  "Why do small things affect me so much?",
  "Why do I know better but still do the wrong thing?",
];

const selfCheckPrompts: SelfCheckPrompt[] = [
  { label: "I compare myself a lot", tags: ["Confidence", "Comparison"] },
  { label: "I get distracted easily", tags: ["Distraction", "Self-Control"] },
  { label: "I care too much what others think", tags: ["Friendship Pressure", "Confidence"] },
  { label: "I feel confident in myself", tags: ["Confidence"], reverse: true },
  { label: "I often delay what I should do", tags: ["Self-Control", "Motivation"] },
  { label: "I know what kind of person I want to become", tags: ["Identity", "Direction"], reverse: true },
  { label: "My emotions affect my whole day", tags: ["Emotions", "Mood"] },
  { label: "I can stay true to myself around others", tags: ["Identity", "Friendship Pressure"], reverse: true },
];

const responseScale: ResponseOption[] = [
  { label: "Rarely", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost always", value: 3 },
];

const resultProfiles = [
  {
    title: "Confidence + Comparison",
    tags: ["Confidence", "Comparison"],
    summary: "You may be measuring yourself against others and second-guessing your worth.",
  },
  {
    title: "Distraction + Self-Control",
    tags: ["Distraction", "Self-Control"],
    summary: "Your attention may be getting pulled around, making it harder to follow through.",
  },
  {
    title: "Friendship Pressure + Emotions",
    tags: ["Friendship Pressure", "Emotions"],
    summary: "Other people and strong feelings may be influencing your choices more than you want.",
  },
  {
    title: "Identity Confusion + Confidence",
    tags: ["Identity", "Confidence"],
    summary: "You may be building your identity while still figuring out how to trust yourself.",
  },
  {
    title: "Mood + Motivation",
    tags: ["Mood", "Motivation"],
    summary: "Your energy and emotional state may be changing how much you can get done.",
  },
] as const;

const shapingTiles = [
  {
    title: "Your Attention",
    summary: "What gets your focus gets your future.",
    redFlag: "You can't stay with one thing for long.",
    growthSign: "You can focus on purpose.",
  },
  {
    title: "Your Habits",
    summary: "Small repeated actions become your normal.",
    redFlag: "You keep doing what weakens you.",
    growthSign: "You start keeping small promises to yourself.",
  },
  {
    title: "Your Self-Image",
    summary: "How you see yourself affects how you behave.",
    redFlag: "You keep putting yourself down.",
    growthSign: "You begin respecting yourself more.",
  },
  {
    title: "Your Emotions",
    summary: "Feelings are real - but they should not run your whole life.",
    redFlag: "One mood ruins your whole day.",
    growthSign: "You can pause before reacting.",
  },
  {
    title: "Your Friendships",
    summary: "The people around you shape your choices more than you think.",
    redFlag: "You act different just to fit in.",
    growthSign: "You feel safe being yourself.",
  },
  {
    title: "Your Screen Life",
    summary: "What you watch, scroll, and consume affects your mind.",
    redFlag: "You feel worse after using your phone.",
    growthSign: "You use tech without letting it control you.",
  },
  {
    title: "Your Values",
    summary: "What matters to you shapes how you live.",
    redFlag: "You copy what others are doing without thinking.",
    growthSign: "You start choosing what is right, not just what is popular.",
  },
  {
    title: "Your Direction",
    summary: "Even at your age, it helps to know who you want to become.",
    redFlag: "You are just drifting.",
    growthSign: "You begin making more intentional choices.",
  },
];

const challengeCards = [
  ["Comparison", "You keep checking if you are enough by looking at others."],
  ["Wanting to Fit In", "You don't want to feel left out, so you sometimes ignore your own values."],
  ["Low Confidence", "You doubt yourself more than people realise."],
  ["Phone Distraction", "You waste time and then feel bad about it."],
  ["Friendship Drama", "Small social things can feel huge and exhausting."],
  ["Body Image Worries", "You become more aware of how you look and whether you measure up."],
  ["Mood Swings / Emotional Overload", "Your feelings can feel bigger than your ability to handle them."],
  ["Crushes / Attraction / Confusion", "You may feel drawn to someone and not always know what to do with those feelings."],
  ["People Pleasing", "You say yes or go along even when it doesn't feel right."],
  ["Procrastination", "You know what you should do but still don't do it."],
  ["Pressure", "From school, adults, expectations, or just trying to keep up."],
  ["Feeling Off", "Sometimes you don't know what's wrong - you just don't feel like yourself."],
] as const;

const quickTruths = [
  "You don't become who you want to be by accident.",
  "Every repeated action is training your future self.",
  "Confidence is not loudness. It grows when you keep promises to yourself.",
  "Wanting to be liked can quietly make you lose yourself.",
  "Your screen habits are also shaping your identity.",
  "Feelings are real, but they are not always wise leaders.",
  "You don't need to be perfect. You need to become more aware and intentional.",
];

const microActions = [
  {
    title: "If you feel confused",
    steps: ["What am I feeling?", "What may be causing this?", "What would help right now?"],
  },
  {
    title: "If you feel distracted",
    steps: ["Keep your phone away for 10 minutes", "Do one useful thing fully", "Then check it"],
  },
  {
    title: "If you feel left out",
    steps: ["Stop chasing every group", "Focus on one real connection", "Stay kind, but don't lose yourself"],
  },
  {
    title: "If you feel low in confidence",
    steps: ["Do one thing you've been avoiding", "Confidence grows after courage, not before it"],
  },
  {
    title: "If you feel emotionally overwhelmed",
    steps: ["Pause", "Breathe slowly", "Delay reacting", "Choose one calmer response"],
  },
];

const parentScripts = [
  "I think this could actually help me. Can I show you?",
  "This looks useful and structured. Can we go through it together?",
  "I want to improve some things about myself. Can we check this out?",
];

const relatableQuestions1618 = [
  "Why do I know better but still repeat the same patterns?",
  "Why do I feel behind even when I'm trying?",
  "Why does distraction keep winning?",
  "Why do I care so much what people think?",
  "Why do I feel emotionally messy and mentally tired?",
  "Why do I feel pressure without clarity?",
];

const selfCheckPrompts1618: SelfCheckPrompt[] = [
  { label: "I feel in control of my habits", tags: ["Consistency", "Self-Control"], reverse: true },
  { label: "I often compare my life to others", tags: ["Confidence", "Validation"] },
  { label: "I know what kind of person I want to become", tags: ["Identity", "Direction"], reverse: true },
  { label: "My emotions affect my focus and decisions", tags: ["Emotional Stability", "Clarity"] },
  { label: "I struggle to stay consistent", tags: ["Consistency", "Self-Control"] },
  { label: "I seek validation more than I want to", tags: ["Confidence", "Validation"] },
  { label: "I feel grounded in my values", tags: ["Boundaries", "Self-Respect"], reverse: true },
  { label: "I use my phone intentionally", tags: ["Focus", "Digital Balance"], reverse: true },
  { label: "I can say no when something is not right for me", tags: ["Boundaries", "Self-Respect"], reverse: true },
  { label: "I feel clear about my direction", tags: ["Identity", "Direction"], reverse: true },
];

const resultProfiles1618 = [
  {
    title: "Consistency + Self-Control",
    tags: ["Consistency", "Self-Control"],
    summary: "You may need stronger routines and follow-through to match your intentions.",
  },
  {
    title: "Confidence + Validation",
    tags: ["Confidence", "Validation"],
    summary: "External opinions may be shaping your confidence more than you want.",
  },
  {
    title: "Emotional Stability + Clarity",
    tags: ["Emotional Stability", "Clarity"],
    summary: "Emotional noise may be affecting your focus, choices, and consistency.",
  },
  {
    title: "Focus + Digital Balance",
    tags: ["Focus", "Digital Balance"],
    summary: "Your attention may be getting split, making clarity and progress harder.",
  },
  {
    title: "Boundaries + Self-Respect",
    tags: ["Boundaries", "Self-Respect"],
    summary: "You may be learning how to protect your standards and energy more clearly.",
  },
  {
    title: "Identity + Direction",
    tags: ["Identity", "Direction"],
    summary: "You may need more structure to align your choices with who you want to become.",
  },
] as const;

const shapingTiles1618 = [
  {
    title: "Attention",
    summary: "Where your mind goes, your life often follows.",
    redFlag: "You are mentally scattered most of the time.",
    growthSign: "You can direct your focus on purpose.",
  },
  {
    title: "Habits",
    summary: "Your routine reveals your real direction more than your intentions do.",
    redFlag: "You keep repeating what weakens your future.",
    growthSign: "You are building actions you can respect.",
  },
  {
    title: "Self-Respect",
    summary: "The way you treat yourself sets the tone for your whole life.",
    redFlag: "You betray your own standards too often.",
    growthSign: "You begin living in a way you trust.",
  },
  {
    title: "Emotional Regulation",
    summary: "Emotions are part of life - but they should not drive every choice.",
    redFlag: "You act from impulse, overwhelm, or emotional confusion.",
    growthSign: "You can pause and choose more wisely.",
  },
  {
    title: "Relationships",
    summary: "Who you allow close to you shapes your peace, choices, and identity.",
    redFlag: "You get pulled by attention, attachment, or unhealthy dynamics.",
    growthSign: "You choose connection without losing yourself.",
  },
  {
    title: "Screen / Digital Influence",
    summary: "Your digital life is not neutral. It affects desire, comparison, attention, and self-worth.",
    redFlag: "You feel more drained, distracted, or insecure after scrolling.",
    growthSign: "You are using tech without letting it shape you blindly.",
  },
  {
    title: "Values",
    summary: "Your values are your internal direction when external noise gets loud.",
    redFlag: "You keep acting against what you know is right.",
    growthSign: "You begin choosing based on principle, not pressure.",
  },
  {
    title: "Direction",
    summary: "You do not need your whole life figured out. But drifting without reflection has a cost.",
    redFlag: "You keep reacting to life instead of shaping it.",
    growthSign: "You are becoming more intentional.",
  },
];

const challengeCards1618 = [
  ["Validation-Seeking", "You know you shouldn't depend on attention, but part of you still does."],
  ["Comparison", "You measure your real life against edited lives, and it quietly affects your confidence."],
  ["Distraction", "You want focus, but your attention keeps getting hijacked."],
  ["Low Self-Trust", "You keep saying you'll do better - and then don't."],
  ["Emotional Highs & Lows", "Your emotions may be shaping your day more than you realise."],
  ["Body Image / Appearance Pressure", "You may feel pressure to look a certain way, be attractive, or feel enough."],
  ["Attraction / Attachment / Relationship Confusion", "Feelings and emotional entanglement can deeply affect clarity, discipline, and peace."],
  ["Friendship / Belonging Issues", "Feeling unseen, left out, used, or emotionally drained by people around you."],
  ["Identity Drift", "You are not sure who you are becoming - or whether you even like the direction."],
  ["Substance / Party / Risk Exposure", "Exposure, pressure, or image can still pull at you, even if you don't want it."],
  ["Pressure About the Future", "Marks, career, success, and expectations can feel heavy while you're still figuring yourself out."],
  ["Hidden Patterns", "Doom scrolling, avoidance, shutting down, self-sabotage, or other habits you don't feel proud of."],
] as const;

const quickTruths1618 = [
  "Identity is not found once. It is built daily.",
  "Confidence is not a vibe. It is built through self-respect and follow-through.",
  "What you repeatedly tolerate also shapes who you become.",
  "Attention is one of the most powerful forces in your life.",
  "Attraction is real. But not every feeling deserves control over your choices.",
  "Validation can feel good while quietly weakening your center.",
  "Discipline is not punishment. It is protection.",
  "You do not need to be perfect. You do need to become more honest and more intentional.",
];

const microActions1618 = [
  {
    title: "If you feel mentally scattered",
    steps: ["Put your phone away", "Sit with one task for 15 minutes", "Finish before switching"],
  },
  {
    title: "If you feel emotionally messy",
    steps: ["What am I actually feeling?", "What triggered this?", "What is the strongest response available right now?"],
  },
  {
    title: "If you feel pulled by attention / attraction / confusion",
    steps: ["Is this helping me grow or weakening my center?", "Am I thinking clearly or just reacting emotionally?"],
  },
  {
    title: "If you feel behind",
    steps: ["Stop comparing", "Pick one meaningful action", "Build from today, not from panic"],
  },
  {
    title: "If you feel low in self-respect",
    steps: ["Keep one promise to yourself today", "Small integrity rebuilds identity"],
  },
];

const parentScripts1618 = [
  "I think I need more structure and support. Can we look at this together?",
  "This seems practical and not just motivational. Can we go through it?",
  "I want to work on myself more seriously. Can we consider this?",
];

const getHumanResult = (responses: Record<string, number>): TestResult | null => {
  const answeredCount = selfCheckPrompts.filter((prompt) => responses[prompt.label] !== undefined).length;
  if (answeredCount < selfCheckPrompts.length) {
    return null;
  }

  const tagCount = new Map<string, number>();
  const tagWeights = new Map<string, number>();

  selfCheckPrompts.forEach((prompt) => {
    const responseValue = responses[prompt.label];
    if (responseValue === undefined) {
      return;
    }

    const riskValue = prompt.reverse ? 3 - responseValue : responseValue;
    prompt.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + riskValue);
      tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + 1);
    });
  });

  const scoredResults = resultProfiles
    .map((profile) => {
      const score = profile.tags.reduce((acc, tag) => {
        const total = tagCount.get(tag) ?? 0;
        const weight = tagWeights.get(tag) ?? 0;
        return weight === 0 ? acc : acc + total / weight;
      }, 0);

      return { ...profile, score };
    })
    .sort((a, b) => b.score - a.score);

  const bestResult = scoredResults[0];
  const secondaryResult = scoredResults[1];

  if (!bestResult) {
    return {
      primary: "Confidence + Comparison",
      secondary: null,
      summary: "Your answers suggest a mix of patterns, but there is not enough data to narrow it down yet.",
    };
  }

  return {
    primary: bestResult.title,
    secondary: secondaryResult && secondaryResult.score > 0 ? secondaryResult.title : null,
    summary: bestResult.summary,
  };
};

const getHumanResult1618 = (responses: Record<string, number>): TestResult | null => {
  const answeredCount = selfCheckPrompts1618.filter((prompt) => responses[prompt.label] !== undefined).length;
  if (answeredCount < selfCheckPrompts1618.length) {
    return null;
  }

  const tagCount = new Map<string, number>();
  const tagWeights = new Map<string, number>();

  selfCheckPrompts1618.forEach((prompt) => {
    const responseValue = responses[prompt.label];
    if (responseValue === undefined) {
      return;
    }

    const riskValue = prompt.reverse ? 3 - responseValue : responseValue;
    prompt.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + riskValue);
      tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + 1);
    });
  });

  const scoredResults = resultProfiles1618
    .map((profile) => {
      const score = profile.tags.reduce((acc, tag) => {
        const total = tagCount.get(tag) ?? 0;
        const weight = tagWeights.get(tag) ?? 0;
        return weight === 0 ? acc : acc + total / weight;
      }, 0);

      return { ...profile, score };
    })
    .sort((a, b) => b.score - a.score);

  const bestResult = scoredResults[0];
  const secondaryResult = scoredResults[1];

  if (!bestResult) {
    return {
      primary: "Identity + Direction",
      secondary: null,
      summary: "Your answers suggest mixed patterns. Keep exploring your responses for clearer signals.",
    };
  }

  return {
    primary: bestResult.title,
    secondary: secondaryResult && secondaryResult.score > 0 ? secondaryResult.title : null,
    summary: bestResult.summary,
  };
};

const KnowYourself = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<Record<string, number>>({});
  const [selectedChecks1618, setSelectedChecks1618] = useState<Record<string, number>>({});
  const [isChallengeGridHovered, setIsChallengeGridHovered] = useState(false);
  const [isChallengeGridHovered1618, setIsChallengeGridHovered1618] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const selectedSectionRef = useRef<HTMLElement | null>(null);

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
      description: "Early teen years - discovering who you are and finding your voice.",
    },
    {
      id: "16-18",
      label: "16-18",
      description: "Late teen years - deepening self-understanding and planning your future.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const humanResult = getHumanResult(selectedChecks);
  const humanResult1618 = getHumanResult1618(selectedChecks1618);

  const updateCheckResponse = (label: string, value: number) => {
    setSelectedChecks((prev) => ({ ...prev, [label]: value }));
  };

  const updateCheckResponse1618 = (label: string, value: number) => {
    setSelectedChecks1618((prev) => ({ ...prev, [label]: value }));
  };

  const getDirectionFromAge = (ageId: string) => (ageId === "13-15" ? -1 : 1);

  const selectAge = (ageId: string) => {
    setTransitionDirection(getDirectionFromAge(ageId));
    setSelectedAge(ageId);
  };

  const returnToAgeSelection = () => {
    if (selectedAge) {
      setTransitionDirection(-getDirectionFromAge(selectedAge));
    }
    setSelectedAge(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageTransition = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  useEffect(() => {
    if (selectedAge && selectedSectionRef.current) {
      selectedSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedAge]);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div className="max-w-3xl mx-auto text-center" variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <LetterSwapForward label="Know Yourself" />
              </motion.h1>

              <motion.div className="space-y-4" variants={itemVariants}>
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                  You can't grow well if you don't understand what's going on inside you.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Your thoughts, habits, emotions, choices, friendships, screens, pressure, and patterns are all shaping who you are becoming.
                </p>
              </motion.div>
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
              <motion.div className="max-w-3xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                <motion.h2 className="text-2xl md:text-3xl font-display font-bold text-primary/85 mb-12 text-center" variants={itemVariants}>
                  <LetterSwapForward label="Choose your age" />
                </motion.h2>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
                  {ageCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      onClick={() => selectAge(category.id)}
                      className={`relative p-5 sm:p-8 rounded-xl border-2 transition-[transform,border-color,box-shadow,background-color] duration-300 text-left group overflow-hidden hover:border-primary/80 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_28px_hsl(var(--primary)/0.5)] ${
                        selectedAge === category.id
                          ? "border-primary/60 bg-[hsl(195_25%_96%_/_0.8)]"
                          : "border-border hover:border-primary/40 bg-[hsl(195_25%_96%_/_0.7)] hover:bg-[hsl(195_25%_96%_/_0.82)]"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                      }}
                    >
                      {selectedAge === category.id && <div className="absolute inset-0 opacity-20 blur-xl bg-primary pointer-events-none" />}
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
                          <motion.div
                            animate={{
                              opacity: selectedAge === category.id ? 1 : 0.3,
                              x: selectedAge === category.id ? 0 : -10,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="w-6 h-6 text-primary" />
                          </motion.div>
                        </div>
                        <p className="text-foreground/75 text-sm md:text-base leading-relaxed">{category.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
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

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.7)] p-5 sm:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Know Yourself (Age 13-15)</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                  You are not just going through stuff. You are becoming a person.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  What you repeat in your thoughts, habits, friendships, emotions, and screen life quietly shapes who you are becoming.
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="Quick relatable cards"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatableQuestions.map((question) => (
                    <ClipPathInfoCard
                      key={question}
                      body={question}
                    />
                  ))}
                </div>
                <p className="mt-5 text-foreground font-medium">
                  Do you feel like <span className="text-primary">"This is literally me."</span>
                  <br />
                  Take the small test below
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-2">
                  <LetterSwapForward
                    label="What's affecting you most right now?"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-6">Mini identity check</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {selfCheckPrompts.map((prompt) => {
                    const selectedValue = selectedChecks[prompt.label];
                    return (
                      <div
                        key={prompt.label}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="group relative overflow-hidden rounded-lg border border-border/70 p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/80 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_22px_hsl(var(--primary)/0.42)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.08) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />
                        <div className="relative z-10">
                          <p className="text-sm text-foreground mb-3">{prompt.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {responseScale.map((option) => {
                              const isActive = selectedValue === option.value;
                              return (
                                <button
                                  type="button"
                                  key={option.label}
                                  onClick={() => updateCheckResponse(prompt.label, option.value)}
                                  className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                                    isActive
                                      ? "border-primary/60 bg-primary/10 text-primary"
                                      : "border-border/70 text-muted-foreground hover:border-primary/40"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-xl border border-primary/30 bg-[hsl(195_25%_96%_/_0.85)] p-5">
                  {humanResult ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Right now, you may be dealing most with:</p>
                      <p className="text-xl font-display font-semibold text-primary">{humanResult.primary}</p>
                      {humanResult.secondary && <p className="mt-1 text-sm text-muted-foreground">Also showing up: {humanResult.secondary}</p>}
                      <p className="mt-3 text-sm text-muted-foreground">{humanResult.summary}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Answer all 8 questions to see your result.</p>
                      <p className="text-base text-foreground/80">Your result will be based on the pattern of your responses, not just one answer.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="The 8 things quietly building your identity"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {shapingTiles.map((tile) => {
                    return (
                      <HolographicCard
                        key={tile.title}
                        title={tile.title}
                        summary={tile.summary}
                        redFlag={tile.redFlag}
                        growthSign={tile.growthSign}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="What might be getting in your way"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">Common things teens this age deal with</p>
                <div
                  onMouseEnter={() => setIsChallengeGridHovered(true)}
                  onMouseLeave={() => setIsChallengeGridHovered(false)}
                  className={`grid md:grid-cols-2 lg:grid-cols-3 transition-[gap] duration-300 ${
                    isChallengeGridHovered ? "gap-2" : "gap-4"
                  }`}
                >
                  {challengeCards.map(([title, body]) => (
                    <ClipPathInfoCard
                      key={title}
                      title={title}
                      body={body}
                      className={`transition-transform duration-300 ${isChallengeGridHovered ? "scale-[1.01]" : "scale-100"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="No one told you this... but it matters"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickTruths.map((truth) => (
                    <ClipPathInfoCard
                      key={truth}
                      body={truth}
                      className="border-primary/30 bg-[hsl(195_25%_96%_/_0.8)]"
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-6">
                  <LetterSwapForward
                    label="Try this today"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {microActions.map((action) => (
                    <ClipPathInfoCard key={action.title} title={action.title}>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                        {action.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </ClipPathInfoCard>
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="Quick understanding helps. But stronger growth needs more than one page."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If you want to become more focused, confident, disciplined, emotionally steady, and more sure of yourself, you may need more than random tips.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">What Ikigai Teen offers:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">understand yourself better</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build stronger habits</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">handle emotions better</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve confidence and discipline</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">become more grounded and responsible</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">See What This Could Help With</button>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show This to My Parent</button>
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-4">
                  <LetterSwapForward
                    label="How to ask at home"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-4">Want to explore this with your parent? You can say:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {parentScripts.map((line) => (
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
                    label="Understanding yourself is the beginning. Building yourself is the next step."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If this page made you realise something about yourself, don't stop there.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">Next Step Options</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/teenzone/teen-toolkit?age=13-15"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
                  >
                    Go to Teen Toolkit
                  </Link>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">See What Ikigai Teen Offers</button>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show This to My Parent</button>
                </div>
              </div>
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

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.7)] p-5 sm:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Know Yourself (Age 16-18)</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary/85 mb-4">
                  You are not just managing school, screens, and stress. You are shaping your identity.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  The way you handle attention, emotions, attraction, friendships, self-respect, pressure, choices, and habits is shaping who you are becoming.
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward label="Quick relatable cards" className="text-2xl font-display font-semibold text-primary/85" />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatableQuestions1618.map((question) => (
                    <ClipPathInfoCard key={question} body={question} />
                  ))}
                </div>
                <p className="mt-5 text-foreground font-medium">
                  Do you feel like <span className="text-primary">"This site actually gets it."</span>
                  <br />
                  Take the small test below
                </p>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-2">
                  <LetterSwapForward
                    label="What's Quietly Affecting You Most Right Now?"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-6">Mini Identity + Challenge Check</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {selfCheckPrompts1618.map((prompt) => {
                    const selectedValue = selectedChecks1618[prompt.label];
                    return (
                      <div
                        key={prompt.label}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="group relative overflow-hidden rounded-lg border border-border/70 p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/80 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_22px_hsl(var(--primary)/0.42)]"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.08) 35%, rgba(0, 0, 0, 0) 70%)",
                          }}
                        />
                        <div className="relative z-10">
                          <p className="text-sm text-foreground mb-3">{prompt.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {responseScale.map((option) => {
                              const isActive = selectedValue === option.value;
                              return (
                                <button
                                  type="button"
                                  key={option.label}
                                  onClick={() => updateCheckResponse1618(prompt.label, option.value)}
                                  className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                                    isActive
                                      ? "border-primary/60 bg-primary/10 text-primary"
                                      : "border-border/70 text-muted-foreground hover:border-primary/40"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-xl border border-primary/30 bg-[hsl(195_25%_96%_/_0.85)] p-5">
                  {humanResult1618 ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Right now, your biggest growth areas may be:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-primary font-semibold">
                        <li>{humanResult1618.primary}</li>
                        {humanResult1618.secondary && <li>{humanResult1618.secondary}</li>}
                      </ul>
                      <p className="mt-3 text-sm text-muted-foreground">{humanResult1618.summary}</p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        This is not your final identity. It is simply a reflection of what may need strengthening right now.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Help Me Understand This Better</button>
                        <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show Me Tools That Can Help</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Answer all 10 prompts to view your growth result.</p>
                      <p className="text-base text-foreground/80">This reflection helps you notice patterns that may need strengthening right now.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="The 8 Forces Quietly Building the Person You're Becoming"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {shapingTiles1618.map((tile) => (
                    <HolographicCard
                      key={tile.title}
                      title={tile.title}
                      summary={tile.summary}
                      redFlag={tile.redFlag}
                      growthSign={tile.growthSign}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="What May Be Getting in Your Way"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">Real things many teens this age quietly struggle with</p>
                <div
                  onMouseEnter={() => setIsChallengeGridHovered1618(true)}
                  onMouseLeave={() => setIsChallengeGridHovered1618(false)}
                  className={`grid md:grid-cols-2 lg:grid-cols-3 transition-[gap] duration-300 ${
                    isChallengeGridHovered1618 ? "gap-2" : "gap-4"
                  }`}
                >
                  {challengeCards1618.map(([title, body]) => (
                    <ClipPathInfoCard
                      key={title}
                      title={title}
                      body={body}
                      className={`transition-transform duration-300 ${isChallengeGridHovered1618 ? "scale-[1.01]" : "scale-100"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-5">
                  <LetterSwapForward
                    label="Things You Need to Hear Clearly"
                    className="text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickTruths1618.map((truth) => (
                    <ClipPathInfoCard key={truth} body={truth} className="border-primary/30 bg-[hsl(195_25%_96%_/_0.8)]" />
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-6">
                  <LetterSwapForward label="Do This Today" className="text-2xl font-display font-semibold text-primary/85" />
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {microActions1618.map((action) => (
                    <ClipPathInfoCard key={action.title} title={action.title}>
                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                        {action.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ul>
                    </ClipPathInfoCard>
                  ))}
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-primary/35 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-3">
                  <LetterSwapForward
                    label="You don't need more random content. You need a stronger inner system."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If you are serious about becoming focused, emotionally steady, disciplined, self-respecting, and clear about who you are becoming, growth needs structure.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">What Ikigai Teen offers:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">understand your patterns</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">improve self-control</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">reduce distraction</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">build confidence and consistency</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">strengthen emotional steadiness</li>
                  <li className="rounded-md px-2 py-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:scale-[1.015] hover:bg-[hsl(195_25%_96%_/_0.95)] hover:text-foreground hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_0_18px_hsl(var(--primary)/0.3)]">move toward purpose and direction</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">See What This Could Help With</button>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show This to My Parent</button>
                </div>
              </div>

              <div className="max-w-5xl mx-auto rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-5 sm:p-8">
                <h3 className="mb-4">
                  <LetterSwapForward
                    label="If you want to explore this with your parent"
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-4">You can say:</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {parentScripts1618.map((line) => (
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
                    label="Understanding yourself is the beginning. Building yourself is the next step."
                    className="w-full flex-wrap justify-start items-start leading-tight text-2xl font-display font-semibold text-primary/85"
                  />
                </h3>
                <p className="text-muted-foreground mb-5">
                  If this page made you realise something about yourself, don't stop there.
                </p>
                <p className="text-sm font-semibold text-foreground mb-3">Next Step Options</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/teenzone/teen-toolkit?age=16-18"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
                  >
                    Go to Teen Toolkit
                  </Link>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">See What Ikigai Teen Offers</button>
                  <button type="button" className="px-4 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium">Show This to My Parent</button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default KnowYourself;
