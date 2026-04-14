import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LetterSwapForward } from "@/components/ui/letter-swap";

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

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingColor = useTransform(scrollYProgress, [0, 0.45], ["hsl(195 10% 70%)", "hsl(var(--foreground))"]);

  return (
    <section ref={ref} className="py-8 md:py-12 lg:py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-4 sm:p-6 md:p-8 lg:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2 style={{ color: headingColor }}>
            <LetterSwapForward
              label="Origin Of Ikigai Teen"
              className="justify-center text-2xl sm:text-3xl md:text-4xl font-display font-bold text-current mb-2 md:mb-3"
            />
          </motion.h2>
          <p className="text-base md:text-lg lg:text-xl font-display text-primary mb-4 md:mb-6">From Humanitarian Field Work to a Teen Mindset Movement</p>
          <div className="space-y-3 md:space-y-4 text-xs md:text-sm lg:text-base text-muted-foreground font-body leading-relaxed text-left md:text-center">
            <p>
              After two decades of working with children through humanitarian programs, education initiatives, and youth
              development projects across India, Irene Arathi has reached over {renderNumberText("107,893")} children through life-skills
              education, disaster preparedness training, and school-based programs.
            </p>
            <p>
              Today, that experience is being transformed into Ikigai Teen - a platform dedicated to helping teenagers develop
              clarity, resilience, character, and purpose in a rapidly changing world.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
