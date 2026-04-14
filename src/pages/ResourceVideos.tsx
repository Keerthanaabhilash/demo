import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { getYoutubeThumbnail, videos } from "@/lib/videos";

const ResourceVideos = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <h1>
              <LetterSwapForward
                label="Video / Podcast Links"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">Browse all uploaded episodes and open them directly on YouTube.</p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((video) => (
                <a
                  key={video.youtubeUrl}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-video bg-secondary/40">
                    <img
                      src={getYoutubeThumbnail(video.youtubeUrl)}
                      alt={`${video.title} thumbnail`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold text-primary mb-1.5">Episode {video.episode}</p>
                    <h2 className="text-lg font-display font-semibold text-primary leading-snug">{video.title}</h2>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      Open on YouTube
                      <ExternalLink className="h-3.5 w-3.5" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourceVideos;
