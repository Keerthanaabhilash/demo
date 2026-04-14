import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import teensCollab from "@/assets/teens-collab.jpg";
import teenPurpose from "@/assets/teen-purpose.jpg";
import teenCommunity from "@/assets/teen-community.jpg";

const images = [
  { src: teensCollab, alt: "Teens collaborating" },
  { src: teenPurpose, alt: "Finding purpose" },
  { src: teenCommunity, alt: "Teen community" },
];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <section ref={ref} className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Ikigai Teen Journey
        </motion.h2>

        <motion.div className="relative max-w-4xl mx-auto" style={{ y }}>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={prev}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2, x: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <div className="flex-1 grid grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {images.map((img, i) => {
                  const offset = (i - current + images.length) % images.length;
                  return (
                    <motion.div
                      key={`${img.alt}-${current}`}
                      className="aspect-[3/4] rounded-lg overflow-hidden"
                      layout
                      animate={{
                        scale: offset === 1 ? 1.05 : 0.95,
                        opacity: offset === 1 ? 1 : 0.7,
                        zIndex: offset === 1 ? 2 : 1,
                      }}
                      whileHover={{ scale: offset === 1 ? 1.08 : 1.0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={800}
                        height={1000}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={next}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.2, x: 4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
