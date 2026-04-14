import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LetterSwapForward } from "@/components/ui/letter-swap";

const NAVBAR_OPEN_EVENT = "ikigai:openNavbarDropdown";

const CTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const [activeButton, setActiveButton] = useState<"teens" | "parents" | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const headingColor = useTransform(scrollYProgress, [0, 0.45], ["hsl(195 10% 70%)", "hsl(var(--foreground))"]);

  const openNavbarDropdown = (label: "Teen Zone" | "Parent Hub") => {
    window.dispatchEvent(new CustomEvent(NAVBAR_OPEN_EVENT, { detail: { label } }));
  };

  return (
    <section ref={ref} className="relative py-8 md:py-12 lg:py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] p-4 sm:p-6 md:p-8 lg:p-10"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.h2 style={{ color: headingColor }}>
            <LetterSwapForward
              label="Ready to Start Your Journey?"
              className="justify-center text-2xl sm:text-3xl md:text-4xl font-display font-bold text-current mb-2 md:mb-4"
            />
          </motion.h2>
          <p className="text-sm md:text-base text-muted-foreground font-body mb-6 md:mb-8 leading-relaxed">
            Whether you're a teen looking for guidance or a parent seeking support, we're here for you.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4" onMouseLeave={() => setActiveButton(null)}>
            <motion.div
              animate={{
                scale: activeButton === "teens" ? 1.03 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94, rotate: -1 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveButton("teens")}
                onClick={() => {
                  setActiveButton("teens");
                  openNavbarDropdown("Teen Zone");
                }}
                className={`inline-flex px-5 sm:px-8 py-2.5 sm:py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  activeButton === "teens" ? "ring-2 ring-primary/50" : "opacity-80"
                }`}
              >
                For Teens
              </button>
            </motion.div>
            <motion.div
              animate={{
                scale: activeButton === "parents" ? 1.03 : 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94, rotate: 1 }}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveButton("parents")}
                onClick={() => {
                  setActiveButton("parents");
                  openNavbarDropdown("Parent Hub");
                }}
                className={`inline-flex px-5 sm:px-8 py-2.5 sm:py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  activeButton === "parents" ? "ring-2 ring-primary/50" : "opacity-80"
                }`}
              >
                For Parents
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
