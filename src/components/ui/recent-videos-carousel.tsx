import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getYoutubeThumbnail, videos } from "@/lib/videos";

interface RecentVideosCarouselProps {
  className?: string;
}

const RecentVideosCarousel = ({ className }: RecentVideosCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % videos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const handleNext = () => setCurrentIndex((index) => (index + 1) % videos.length);
  const handlePrevious = () => setCurrentIndex((index) => (index - 1 + videos.length) % videos.length);

  const currentVideo = videos[currentIndex];
  const thumbnail = getYoutubeThumbnail(currentVideo.youtubeUrl);

  return (
    <div className={cn("w-full max-w-sm h-[446px] flex flex-col", className)}>
      <div className="rounded-2xl border border-border/60 bg-card/90 backdrop-blur-md shadow-xl overflow-hidden flex-1">
        <a href={currentVideo.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative h-48 bg-secondary/40 border-b border-border/50 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo.youtubeUrl}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {thumbnail ? (
                  <img src={thumbnail} alt={currentVideo.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="h-full w-full bg-secondary" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-6 bg-gradient-to-t from-background/90 via-background/35 to-transparent">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{currentVideo.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 min-h-[188px] flex flex-col bg-white border-t border-border/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo.title}
                className="h-full flex flex-col"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-1.5">YouTube Series</p>
                <p className="text-sm text-[hsl(195_25%_18%)] leading-relaxed mb-4 line-clamp-4 min-h-[5rem]">Click to watch this episode on YouTube.</p>

                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold transition-all duration-300 hover:ring-2 hover:ring-primary/50 mt-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                >
                  Watch Video
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </a>
      </div>

      <div className="mt-4 h-10 flex items-center justify-between shrink-0">
        <motion.button
          onClick={handlePrevious}
          aria-label="Previous video"
          className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card hover:ring-2 hover:ring-primary/40 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.08, x: -1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <div className="flex items-center gap-1.5">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to video ${index + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === currentIndex ? "w-6 bg-primary" : "w-2.5 bg-foreground/30 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          aria-label="Next video"
          className="h-10 w-10 rounded-full border border-border bg-card/80 text-foreground/80 hover:text-foreground hover:bg-card hover:ring-2 hover:ring-primary/40 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.08, x: 1 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default RecentVideosCarousel;
