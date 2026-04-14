"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { articles } from "@/lib/articles";

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((index) => (index + 1) % articles.length);
  const handlePrevious = () => setCurrentIndex((index) => (index - 1 + articles.length) % articles.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % articles.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentArticle = articles[currentIndex];

  const getPreviewLines = () => {
    if (!currentArticle.content || currentArticle.content.length === 0) {
      return [currentArticle.summary];
    }

    const lines: string[] = [];

    for (const block of currentArticle.content) {
      if (block.type === "raw") {
        lines.push(
          ...block.text
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        );
        continue;
      }

      if (block.type === "list") {
        lines.push(...block.items.map((item) => `- ${item}`));
        continue;
      }

      lines.push(block.text);
    }

    return lines.slice(0, 12);
  };

  const previewLines = getPreviewLines();

  return (
    <div className={cn("w-full max-w-sm h-[446px] flex flex-col", className)}>
      <div className="rounded-2xl border border-white/50 bg-white shadow-xl overflow-hidden flex-1">
        <Link to={`/resources/blog/${currentArticle.slug}`} className="block">
          <div className="relative h-48 bg-white border-b border-border/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArticle.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 p-4"
              >
                <div className="h-full rounded-lg border border-white/15 bg-[hsl(195_25%_15%)] p-3 overflow-hidden">
                  <div className="space-y-1 text-[11px] leading-snug text-white/90">
                    {previewLines.map((line, index) => (
                      <p key={`${line}-${index}`} className="line-clamp-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 min-h-[188px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentArticle.title}
                className="h-full flex flex-col"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-1.5">{currentArticle.audience}</p>
                <p className="text-sm text-[hsl(195_25%_18%)] leading-relaxed mb-4 line-clamp-4 min-h-[5rem]">{currentArticle.summary}</p>

                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold transition-all duration-300 hover:ring-2 hover:ring-primary/50 mt-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                >
                  Open Article
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Link>
      </div>

      <div className="mt-4 h-10 flex items-center justify-between shrink-0">
        <motion.button
          onClick={handlePrevious}
          aria-label="Previous article"
            className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card hover:ring-2 hover:ring-primary/40 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.08, x: -1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <div className="flex items-center gap-1.5">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to article ${index + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === currentIndex ? "w-6 bg-primary" : "w-2.5 bg-foreground/30 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          aria-label="Next article"
            className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card hover:ring-2 hover:ring-primary/40 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.08, x: 1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}
