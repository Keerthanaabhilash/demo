import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMouseGlowEnabled, setIsMouseGlowEnabled] = useState(true);
  const [showGlowTip, setShowGlowTip] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const glowXPct = useMotionValue(50);
  const glowYPct = useMotionValue(50);
  const textGlow = useMotionValue(0);
  const glowRadius = useMotionValue(140);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 28, mass: 0.3 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 28, mass: 0.3 });
  const smoothTextGlow = useSpring(textGlow, { stiffness: 170, damping: 24, mass: 0.4 });
  const glowOpacity = useTransform(smoothTextGlow, [0, 1], [0, 1]);
  const smoothGlowRadius = useSpring(glowRadius, { stiffness: 170, damping: 24, mass: 0.4 });
  const glowXCss = useMotionTemplate`${glowXPct}%`;
  const glowYCss = useMotionTemplate`${glowYPct}%`;
  const glowRadiusCss = useMotionTemplate`${smoothGlowRadius}px`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = document.querySelector("[data-home-hero]");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const moveGlowToHeroTextCenter = () => {
    const targetEl = document.querySelector("[data-hero-glow-target]") as HTMLElement | null;
    const targetRect = targetEl?.getBoundingClientRect();
    if (!targetRect) return;

    mouseX.set(targetRect.left + targetRect.width / 2);
    mouseY.set(targetRect.top + targetRect.height / 2);
    glowXPct.set(50);
    glowYPct.set(50);
  };

  const toggleGlowMode = () => {
    setIsMouseGlowEnabled((previous) => {
      const nextEnabled = !previous;

      if (!nextEnabled) {
        moveGlowToHeroTextCenter();
        textGlow.set(1);
        glowRadius.set(1200);
      } else {
        textGlow.set(0);
        glowRadius.set(140);
      }

      return nextEnabled;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    const lastTap = lastTapRef.current;

    if (lastTap) {
      const elapsed = now - lastTap.time;
      const distance = Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y);

      if (elapsed < 320 && distance < 44) {
        toggleGlowMode();
        setShowGlowTip(false);
        lastTapRef.current = null;
        return;
      }
    }

    lastTapRef.current = { time: now, x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseGlowEnabled) return;

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    const glowTarget = document.querySelector("[data-hero-glow-target]") as HTMLElement | null;
    const targetRect = glowTarget?.getBoundingClientRect();
    if (targetRect) {
      const localX = event.clientX - targetRect.left;
      const localY = event.clientY - targetRect.top;
      const xPct = Math.max(0, Math.min(100, (localX / targetRect.width) * 100));
      const yPct = Math.max(0, Math.min(100, (localY / targetRect.height) * 100));
      glowXPct.set(xPct);
      glowYPct.set(yPct);

      const nearestX = Math.max(targetRect.left, Math.min(event.clientX, targetRect.right));
      const nearestY = Math.max(targetRect.top, Math.min(event.clientY, targetRect.bottom));
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
      const touchRadius = 55;
      textGlow.set(Math.max(0, 1 - distance / touchRadius));
    } else {
      textGlow.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (!isMouseGlowEnabled) return;

    mouseX.set(-200);
    mouseY.set(-200);
    textGlow.set(0);
    glowRadius.set(140);
    glowXPct.set(50);
    glowYPct.set(50);
  };

  return (
    <motion.div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      style={{
        ["--hero-glow-x" as string]: glowXCss,
        ["--hero-glow-y" as string]: glowYCss,
        ["--hero-glow-opacity" as string]: glowOpacity,
        ["--hero-glow-radius" as string]: glowRadiusCss,
      }}
    >
      <motion.div
        className="fixed z-[30] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: smoothX, top: smoothY }}
      >
        <div className="relative w-44 h-24">
          <div className="absolute inset-0 rounded-[999px] bg-gradient-to-r from-transparent via-primary/35 to-transparent blur-2xl" />
          <div className="absolute inset-x-10 inset-y-4 rounded-[999px] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-lg" />
        </div>
      </motion.div>

      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />

      {showGlowTip && isHeroInView && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-6 z-40 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-xs font-body text-foreground/80 backdrop-blur"
        >
          Double tap anywhere to see the magic.
        </motion.div>
      )}
    </motion.div>
  );
};

export default Index;
