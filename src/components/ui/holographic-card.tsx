import React, { useRef, useState } from "react";

type HolographicCardProps = {
  index?: number;
  title?: string;
  summary?: string;
  redFlag?: string;
  growthSign?: string;
  className?: string;
};

const HolographicCard = ({
  index,
  title = "Holographic Card",
  summary = "Move your mouse over me!",
  redFlag,
  growthSign,
  className = "",
}: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    setIsHovered(false);
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 text-left transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/80 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.45),0_0_26px_hsl(var(--primary)/0.5)] ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), rgba(52, 211, 153, 0.24), rgba(16, 185, 129, 0.1) 35%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      <div className="relative z-10">
        {index !== undefined && (
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80 mb-2">{index + 1}</p>
        )}
        <h4 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{summary}</p>

        <div
          className={`mt-4 space-y-2 text-sm transition-all duration-300 ${
            isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {redFlag && (
            <p>
              <span className="font-semibold text-rose-500">Red flag:</span>{" "}
              <span className="text-muted-foreground">{redFlag}</span>
            </p>
          )}
          {growthSign && (
            <p>
              <span className="font-semibold text-emerald-600">Growth sign:</span>{" "}
              <span className="text-muted-foreground">{growthSign}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolographicCard;