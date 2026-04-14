import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import logo from "@/assets/ikigai logo no bg.png";
import { navItems } from "@/components/Navbar";
import { LetterSwapForward } from "@/components/ui/letter-swap";
import TiltedDock, { type TiltedDockItem } from "@/components/ui/tilted-dock";
import { ReactNode } from "react";

const SpotifyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <g transform="translate(12 12) scale(1.35) translate(-12 -12)">
      <path
        d="M6.8 8.6c3.1-1.1 7.8-.9 11.1.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M7.5 12.1c2.6-.7 6.2-.5 8.9.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.1 15.4c1.7-.3 3.7-.2 5.7.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const ApplePodcastIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
    <g transform="translate(12 12) scale(1.15) translate(-12 -12)">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="8.4" r="1.2" fill="currentColor" />
      <path
        d="M12 10.6c-.95 0-1.7.77-1.7 1.72 0 .6.28 1.02.56 1.5.33.56.64 1.12.64 2.12V18a.5.5 0 0 0 .5.5h0a.5.5 0 0 0 .5-.5v-2.06c0-1 .3-1.56.64-2.12.28-.48.56-.9.56-1.5 0-.95-.75-1.72-1.7-1.72Z"
        fill="currentColor"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const contactDockItems: TiltedDockItem[] = [
  { id: 1, icon: <Instagram size={28} />, label: "Instagram", href: "https://www.instagram.com/ikigaiteen_by_irenearathi?igsh=MWJvdGk3am42YjU3OQ==", external: true },
  { id: 2, icon: <Facebook size={28} />, label: "Facebook", href: "https://www.facebook.com/people/Ikigai-Teen/61580750702758/?mibextid=rS40aB7S9Ucbxw6v", external: true },
  { id: 3, icon: <Mail size={28} />, label: "Email", href: "mailto:ikigaiteenhub@gmail.com" },
  { id: 4, icon: <Youtube size={28} />, label: "YouTube", href: "https://youtube.com/@ikigaiteenhub?si=r09nOD2aIVp-7otA", external: true },
  { id: 5, icon: <Linkedin size={28} />, label: "LinkedIn", href: "https://www.linkedin.com/company/ikigaiteen/", external: true },
  { id: 6, icon: <SpotifyIcon />, label: "Spotify", href: "https://open.spotify.com/show/5Ujbc6JbEW9OCRwcwfqyfS?si=5ogDDYumSl6q6dLIYuS6WA", external: true },
  { id: 7, icon: <ApplePodcastIcon />, label: "Apple Podcasts", href: "https://podcasts.apple.com/in/podcast/ikigai-teen-compass-a-teen-mindset-transformation/id1846845044?utm_source=ig&utm_medium=social&utm_content=link_in_bio", external: true },
];

const renderNumberText = (text: string): ReactNode => {
  const numberPattern = /\d[\d,-]*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(numberPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={`${text}-${matchIndex}-${match[0]}`} className="number-font">
        {match[0]}
      </span>,
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
};

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getChildPath = (groupLabel: string, childLabel: string, fallbackPath: string) => {
    if (groupLabel === "About" && childLabel === "Founder & Team") {
      return "/about/founder-team";
    }

    if (groupLabel === "About" && childLabel === "Grounding Philosophy") {
      return "/about/grounding-philosophy";
    }

    if (groupLabel === "About" && childLabel === "The Journey") {
      return "/about/journey";
    }

    if (groupLabel === "About" && childLabel === "Vision, Mission & Values") {
      return "/about/values-vision-mission";
    }

    if (groupLabel === "Teen Zone" && childLabel === "Know Yourself") {
      return "/teenzone/know-yourself";
    }

    if (groupLabel === "Teen Zone" && childLabel === "Teen Toolkit") {
      return "/teenzone/teen-toolkit";
    }

    if (groupLabel === "Resources" && childLabel === "Blog/Articles") {
      return "/resources/blogs";
    }

    if (groupLabel === "Resources" && childLabel === "Video/Podcast Links") {
      return "/resources/videos";
    }

    return fallbackPath;
  };

  return (
    <footer id="contact" className="footer-theme-legacy bg-card border-t border-border py-8 md:py-12 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-[6.75rem] xl:w-[6.75rem] shrink-0 overflow-hidden rounded-lg">
                <img
                  src={logo}
                  alt="Ikigai Teen"
                  className="h-full w-full object-cover object-top scale-[1.22] origin-top drop-shadow-[0_0_14px_rgba(255,255,255,0.28)]"
                />
              </div>
            </div>

            <div className="text-xs md:text-sm text-muted-foreground font-body leading-relaxed">
              <p>Empowering teens to discover purpose.</p>
              <p>Building a meaningful future through identity.</p>
              <p>Growing with guidance, confidence, and community.</p>
            </div>

            <div className="space-y-2">
              {navItems.map((group) => (
                <div key={group.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between max-w-xs font-display text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === group.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === group.label && (
                    <div className="mt-2 pl-3 border-l border-border/70 space-y-1.5">
                      {group.children.map((child) => (
                        <Link
                          key={child}
                          to={getChildPath(group.label, child, group.path)}
                          className="block text-xs font-body text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 lg:pl-8">
            <h3>
              <LetterSwapForward label="Contact Us" className="justify-start font-display text-base md:text-lg font-semibold text-foreground" />
            </h3>
            <div className="space-y-1.5 md:space-y-2.5 text-xs md:text-sm lg:text-base font-body text-foreground/85">
              <p className="grid grid-cols-[70px_1fr] md:grid-cols-[78px_1fr] items-baseline gap-2">
                <span className="text-foreground font-semibold">Email:</span>
                <span className="text-foreground/80 break-all">ikigaiteenhub@gmail.com</span>
              </p>
              <p className="grid grid-cols-[70px_1fr] md:grid-cols-[78px_1fr] items-baseline gap-2">
                <span className="text-foreground font-semibold">Phone:</span>
                <span className="text-foreground/80">{renderNumberText("+91 89713 91101")}</span>
              </p>
            </div>
            <TiltedDock className="pt-4 md:pt-6 justify-start" items={contactDockItems} />
          </div>
        </div>

        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-border/70 flex items-center justify-center">
          <p className="text-xs md:text-sm text-muted-foreground font-body text-center">
            © {renderNumberText(String(new Date().getFullYear()))} Ikigai Teen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
