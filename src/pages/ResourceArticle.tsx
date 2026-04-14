import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock3, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, findArticleBySlug } from "@/lib/articles";
import PdfInlineViewer from "@/components/ui/pdf-inline-viewer";

const ResourceArticle = () => {
  const { slug } = useParams();
  const article = findArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const moreArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-16 bg-background min-h-screen">
        <section className="footer-theme-legacy py-16 md:py-20 bg-card border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>

            <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary mb-4">
              {article.audience}
            </span>

            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-primary leading-tight max-w-4xl mb-5">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.publishedOn}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            {article.content && article.content.length > 0 ? (
              <article className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-6 md:p-8 mb-14 space-y-5">
                {article.content.map((block, index) => {
                  const key = `${block.type}-${index}`;

                  if (block.type === "heading") {
                    return (
                      <h2 key={key} className="text-2xl md:text-3xl font-display font-semibold text-primary pt-2 first:pt-0">
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote key={key} className="border-l-4 border-primary/70 pl-4 py-1 text-primary italic text-xl leading-relaxed">
                        {block.text}
                      </blockquote>
                    );
                  }

                  if (block.type === "raw") {
                    return (
                      <div key={key} className="text-muted-foreground text-lg leading-loose whitespace-pre-wrap">
                        {block.text}
                      </div>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={key} className="list-disc pl-6 space-y-2 text-muted-foreground text-lg leading-loose">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={key} className="text-muted-foreground text-lg leading-loose">
                      {block.text}
                    </p>
                  );
                })}
              </article>
            ) : (
              <div className="rounded-xl border border-border/60 bg-secondary/20 p-2 md:p-3 mb-14">
                <PdfInlineViewer fileUrl={article.pdfUrl} className="w-full" />
              </div>
            )}

            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-6">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moreArticles.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/resources/blog/${item.slug}`}
                    className="rounded-xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-5 hover:border-primary/40 transition-colors"
                  >
                    <p className="text-xs font-semibold text-primary mb-1.5">{item.audience}</p>
                    <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ResourceArticle;
