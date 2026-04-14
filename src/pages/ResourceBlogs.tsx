import { Link } from "react-router-dom";
import { Calendar, Clock3, User } from "lucide-react";
import type { MouseEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import { articles } from "@/lib/articles";

const ResourceBlogs = () => {
  const handleCardMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
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

  const handleCardMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <h1>
              <LetterSwapForward
                label="Blog / Articles"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">Browse all published blogs in sequence.</p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/resources/blog/${article.slug}`}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/80 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_28px_hsl(var(--primary)/0.5)]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(52, 211, 153, 0.22), rgba(16, 185, 129, 0.1) 35%, rgba(0, 0, 0, 0) 70%)",
                    }}
                  />
                  <div className="relative z-10">
                    <p className="text-xs font-semibold text-primary mb-1.5">
                      {index + 1}. {article.audience}
                    </p>
                    <h2 className="text-xl font-display font-semibold text-primary mb-2 leading-snug">{article.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.summary}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {article.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {article.publishedOn}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourceBlogs;
