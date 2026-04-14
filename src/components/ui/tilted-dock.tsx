"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TiltedDockItem {
  id: number;
  icon: ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

interface TiltedDockProps {
  items: TiltedDockItem[];
  className?: string;
}

export default function TiltedDock({ items, className }: TiltedDockProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={cn("flex justify-center", className)}>
      <motion.div
        className="flex flex-wrap justify-center gap-8 px-8 py-5 rounded-3xl backdrop-blur-2xl bg-background/20 shadow-[0_15px_40px_rgba(0,0,0,0.22)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: 12,
          rotateY: mouse.x * 8,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {items.map((item) => (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="relative flex flex-col items-center justify-center"
            onHoverStart={() => setHovered(item.id)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              scale: hovered === item.id ? 1.3 : 1,
              z: hovered === item.id ? 120 : hovered ? -20 : 0,
              opacity: hovered && hovered !== item.id ? 0.55 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{
                rotateX: hovered === item.id ? -10 : 0,
                rotateY: hovered === item.id ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-foreground/90"
            >
              {item.icon}
            </motion.div>

            <motion.span
              className="absolute -bottom-8 text-xs font-medium text-foreground/80 whitespace-nowrap"
              animate={{ opacity: hovered === item.id ? 1 : 0, y: hovered === item.id ? 0 : 5 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}