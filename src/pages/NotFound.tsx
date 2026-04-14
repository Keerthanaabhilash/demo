import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-[hsl(195_25%_96%_/_0.8)] [--foreground:195_26%_16%] [--muted-foreground:195_16%_42%] [--border:152_20%_86%] p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mb-4 text-3xl md:text-4xl font-display font-bold text-foreground">Oops! Page not found</h1>
        <p className="mb-6 text-base md:text-lg text-muted-foreground">The page you are looking for does not exist.</p>
        <a href="/" className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
