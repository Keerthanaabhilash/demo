import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SectionPageLayoutProps {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    description: string;
    path?: string;
    id?: string;
    body?: string[];
    bullets?: string[];
  }[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const SectionPageLayout = ({ title, subtitle, sections }: SectionPageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        {/* Page Header */}
        <section className="footer-theme-legacy py-8 md:py-12 lg:py-20 bg-card border-b border-border/50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-3 md:mb-4"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-base md:text-lg text-muted-foreground font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Subsections */}
        <section className="py-8 md:py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
            >
              {sections.map((s) => (
                <motion.div key={s.title} variants={cardVariants} id={s.id} className="scroll-mt-24">
                  {s.path ? (
                    <Link to={s.path} className="block">
                      <motion.div
                        className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-4 sm:p-6 md:p-8 group cursor-pointer hover:border-primary/40 transition-colors"
                        whileHover={{
                          y: -6,
                          boxShadow: "0 20px 40px -15px hsl(152 60% 45% / 0.15)",
                          transition: { duration: 0.3 },
                        }}
                      >
                        <motion.div
                          className="w-1 h-0 bg-primary rounded-full mb-4"
                          whileInView={{ height: 24 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        />
                        <h2 className="text-xl font-display font-semibold text-primary mb-3">{s.title}</h2>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
                        {s.body?.length ? (
                          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground font-body">
                            {s.body.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        ) : null}
                        {s.bullets?.length ? (
                          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground font-body">
                            {s.bullets.map((bullet) => (
                              <p key={bullet}>{bullet}</p>
                            ))}
                          </div>
                        ) : null}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div
                      className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-4 sm:p-6 md:p-8 group"
                      whileHover={{
                        y: -6,
                        boxShadow: "0 20px 40px -15px hsl(152 60% 45% / 0.15)",
                        transition: { duration: 0.3 },
                      }}
                    >
                      <motion.div
                        className="w-1 h-0 bg-primary rounded-full mb-4"
                        whileInView={{ height: 24 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                      <h2 className="text-xl font-display font-semibold text-primary mb-3">{s.title}</h2>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
                      {s.body?.length ? (
                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground font-body">
                          {s.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}
                      {s.bullets?.length ? (
                        <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground font-body">
                          {s.bullets.map((bullet) => (
                            <p key={bullet}>{bullet}</p>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SectionPageLayout;
