import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";

const philosophyParagraphs = [
  "At Ikigai Teen, our philosophy is inspired by timeless Japanese principles that emphasize purposeful living, steady growth, and mindful action. These ideas are simple yet powerful - and when applied early in life, they help young people build strong foundations for the future.",
  "We believe that adolescence is not merely a stage to get through, but a critical period where identity, habits, and character take shape. When teens are guided with the right tools and values, they can develop the clarity and resilience needed to navigate a complex world.",
  "Several Japanese concepts guide our approach. Together, these principles shape the way we design our coaching programs, tools, and learning experiences. We encourage teens to grow step by step, develop emotional strength, manage distractions, and build habits that support a meaningful life.",
  "Our goal is not to create perfection, but to help teens become self-aware, grounded, and responsible individuals who can navigate life with clarity and purpose.",
];

const principles = [
  <>
    <span className="font-semibold text-foreground">Ikigai</span> - discovering meaning and direction in life by aligning one’s strengths, interests, values, and contribution to the world.
  </>,
  <>
    <span className="font-semibold text-foreground">Kaizen</span> - the practice of small, consistent improvements that lead to lasting personal growth.
  </>,
  <>
    <span className="font-semibold text-foreground">Shoshin</span> - the beginner’s mind, encouraging curiosity, openness, and the willingness to learn without ego.
  </>,
  <>
    <span className="font-semibold text-foreground">Hansei</span> - thoughtful reflection and self-awareness, helping teens learn from experiences and make wiser decisions.
  </>,
  <>
    <span className="font-semibold text-foreground">Kintsugi</span> - the idea that imperfections and setbacks can strengthen character and become part of one’s unique story.
  </>,
];

const GroundingPhilosophy = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-12 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <h1>
              <LetterSwapForward
                label="Grounding Philosophy"
                className="justify-center text-4xl md:text-5xl font-display font-bold text-primary mb-4"
              />
            </h1>
            <p className="text-lg text-muted-foreground font-body">The ideas that shape how Ikigai Teen supports purposeful growth.</p>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary">Philosophy</h2>
                <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                  {philosophyParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-border/50 pt-6">
                {principles.map((principle, index) => (
                  <p key={index} className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                    {principle}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GroundingPhilosophy;