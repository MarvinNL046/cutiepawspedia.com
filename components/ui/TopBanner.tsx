"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, MapPin, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBannerProps {
  className?: string;
}

const messages = [
  {
    icon: Sparkles,
    text: "We voegen dagelijks nieuwe locaties toe!",
    textEn: "We're adding new locations daily!",
    textDe: "Wir fügen täglich neue Standorte hinzu!",
    textFr: "Nous ajoutons de nouveaux lieux chaque jour!",
  },
  {
    icon: MapPin,
    text: "11.000+ dierenzaken in 3 landen",
    textEn: "11,000+ pet businesses in 3 countries",
    textDe: "11.000+ Tiergeschäfte in 3 Ländern",
    textFr: "11 000+ entreprises pour animaux dans 3 pays",
  },
  {
    icon: TrendingUp,
    text: "Elke dag groeit onze database",
    textEn: "Our database grows every day",
    textDe: "Unsere Datenbank wächst jeden Tag",
    textFr: "Notre base de données grandit chaque jour",
  },
];

export function TopBanner({ className }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Rotate messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem("topBannerDismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      // Show again after 24 hours
      if (Date.now() - dismissedTime < 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("topBannerDismissed", Date.now().toString());
  };

  if (!isVisible) return null;

  const currentMessage = messages[currentMessageIndex];
  const Icon = currentMessage.icon;

  return (
    <div
      className={cn(
        "relative bg-gradient-to-r from-cpCoral via-cpPeach to-cpCoral text-white overflow-hidden",
        className
      )}
    >
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-300" />
        <div className="absolute -top-0.5 left-3/4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-700" />
        <div className="absolute top-2 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
        {/* Paw print decoration - left */}
        <span className="hidden sm:inline-block text-white/30 text-lg mr-3 animate-bounce">
          🐾
        </span>

        {/* Main content */}
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-all duration-300",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="text-center">{currentMessage.text}</span>
        </div>

        {/* Paw print decoration - right */}
        <span className="hidden sm:inline-block text-white/30 text-lg ml-3 animate-bounce delay-150">
          🐾
        </span>

        {/* Progress dots */}
        <div className="hidden md:flex items-center gap-1.5 ml-4">
          {messages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                index === currentMessageIndex
                  ? "bg-white w-4"
                  : "bg-white/40"
              )}
            />
          ))}
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 sm:right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
