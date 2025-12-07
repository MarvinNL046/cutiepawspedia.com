"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  locale: string;
}

export function TableOfContents({ items, locale }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="bg-card dark:bg-cpSurface/30 rounded-xl border border-border dark:border-cpAmber/10 p-4">
      <h3 className="flex items-center gap-2 font-semibold text-foreground dark:text-cpCream mb-3">
        <List className="w-4 h-4 text-cpPink" />
        {locale === "nl" ? "Inhoud" : "Contents"}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-3" : ""}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`text-left text-sm transition-colors w-full py-1 px-2 rounded-lg hover:bg-muted dark:hover:bg-cpSurface/50 ${
                activeId === item.id
                  ? "text-cpPink font-medium bg-cpPink/10"
                  : "text-muted-foreground dark:text-cpCream/70"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Extract table of contents items from markdown content
 */
export function extractTocItems(content: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      const id = `heading-${index}`;
      items.push({ id, text, level: 2 });
    } else if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      const id = `heading-${index}`;
      items.push({ id, text, level: 3 });
    }
  });

  return items;
}

export default TableOfContents;
