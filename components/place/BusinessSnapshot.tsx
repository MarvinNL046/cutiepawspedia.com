"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Clock, ChevronRight, Globe, Info, PawPrint } from "lucide-react";
import {
  formatRating,
  getRatingSource,
  getTodayStatus,
  formatOpeningHours,
  getOpeningHoursSource,
  hasOpeningHours,
  type PlaceData,
} from "@/lib/enrichment/ui";

interface CutieRating {
  avgRating: number | null;
  reviewCount: number;
}

interface BusinessSnapshotProps {
  place: PlaceData;
  locale?: string;
  cutieRating?: CutieRating; // Our own platform reviews
}

export function BusinessSnapshot({ place, locale = "en", cutieRating }: BusinessSnapshotProps) {
  const [hoursOpen, setHoursOpen] = useState(false);

  const rating = formatRating(place.avgRating);
  const ratingSource = getRatingSource(place.dataQualityFlags);
  const todayStatus = getTodayStatus(place.openingHours, locale);
  const hasHours = hasOpeningHours(place.openingHours);
  const hoursSource = getOpeningHoursSource(place.dataQualityFlags);
  const allHours = formatOpeningHours(place.openingHours, locale);

  // Check if we have Cutie reviews
  const hasCutieRating = cutieRating && cutieRating.reviewCount > 0 && cutieRating.avgRating;

  return (
    <Card className="bg-card dark:bg-cpSurface/50 border-border dark:border-cpAmber/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-foreground dark:text-cpCream">
          {locale === "nl" ? "Bedrijfsinfo" : "Business Info"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Rating Section - Google rating */}
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-muted-foreground dark:text-cpCream/60 tracking-wide">
            {locale === "nl" ? "Google Beoordeling" : "Google Rating"}
          </p>
          {rating.hasRating && place.reviewCount && place.reviewCount > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(rating.value)
                        ? "fill-cpAmber text-cpAmber"
                        : "text-muted dark:text-cpCream/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-base font-semibold text-foreground dark:text-cpCream">
                {rating.display}
              </span>
              <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                ({place.reviewCount.toLocaleString()})
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground dark:text-cpCream/60">
              {locale === "nl" ? "Nog geen beoordeling" : "No rating yet"}
            </p>
          )}
          {rating.hasRating && place.reviewCount && place.reviewCount > 0 && ratingSource && (
            <p className="text-xs text-muted-foreground dark:text-cpCream/60 flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Google
            </p>
          )}
        </div>

        {/* Cutie Rating Section - Our platform reviews */}
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-muted-foreground dark:text-cpCream/60 tracking-wide flex items-center gap-1">
            <PawPrint className="h-3 w-3 text-cpCoral" />
            {locale === "nl" ? "Cutie Beoordeling" : "Cutie Rating"}
          </p>
          {hasCutieRating ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(cutieRating.avgRating!)
                        ? "fill-cpCoral text-cpCoral"
                        : "text-muted dark:text-cpCream/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-base font-semibold text-foreground dark:text-cpCream">
                {cutieRating.avgRating!.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground dark:text-cpCream/60">
                ({cutieRating.reviewCount.toLocaleString()})
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground dark:text-cpCream/60">
              {locale === "nl" ? "Nog geen reviews - wees de eerste! 🐾" : "No reviews yet - be the first! 🐾"}
            </p>
          )}
          {hasCutieRating && (
            <p className="text-xs text-muted-foreground dark:text-cpCream/60 flex items-center gap-1">
              <PawPrint className="h-3 w-3 text-cpCoral" />
              CutiePawsPedia
            </p>
          )}
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase text-muted-foreground dark:text-cpCream/60 tracking-wide flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {locale === "nl" ? "Openingstijden" : "Business Hours"}
          </p>

          {hasHours ? (
            <>
              {/* Today's status */}
              <div
                className={`text-sm font-medium ${
                  todayStatus.isOpen ? "text-green-600 dark:text-green-400" : "text-muted-foreground dark:text-cpCream/70"
                }`}
              >
                {todayStatus.text}
              </div>

              {/* View all hours dialog */}
              <Dialog open={hoursOpen} onOpenChange={setHoursOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cpCoral hover:text-cpCoral/80 hover:bg-cpCoral/5 dark:hover:bg-cpCoral/10 gap-1 -ml-3 h-auto py-1"
                  >
                    {locale === "nl"
                      ? "Bekijk alle openingstijden"
                      : "View all opening hours"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card dark:bg-cpSurface border-border dark:border-cpAmber/20">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-foreground dark:text-cpCream">
                      <Clock className="h-5 w-5 text-cpCoral" />
                      {locale === "nl" ? "Openingstijden" : "Opening Hours"}
                    </DialogTitle>
                    <DialogDescription className="dark:text-cpCream/70">{place.name}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 mt-4">
                    {allHours.map((dayHours) => (
                      <div
                        key={dayHours.day}
                        className={`flex justify-between py-2 px-3 rounded-lg ${
                          dayHours.day === getCurrentDayName(locale)
                            ? "bg-cpCoral/5 dark:bg-cpCoral/10 border border-cpCoral/20 dark:border-cpCoral/30"
                            : "bg-muted dark:bg-cpSurface/50"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            dayHours.day === getCurrentDayName(locale)
                              ? "text-cpCoral"
                              : "text-foreground dark:text-cpCream"
                          }`}
                        >
                          {dayHours.day}
                        </span>
                        <span
                          className={
                            dayHours.isClosed
                              ? "text-muted-foreground dark:text-cpCream/50"
                              : "text-muted-foreground dark:text-cpCream/70"
                          }
                        >
                          {dayHours.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  {hoursSource && (
                    <p className="text-xs text-muted-foreground dark:text-cpCream/60 flex items-center gap-1 mt-4 pt-4 border-t border-border dark:border-cpAmber/20">
                      <Info className="h-3 w-3" />
                      {locale === "nl" ? "Bron" : "Source"}: {hoursSource.source}
                      {hoursSource.reliability === "low" && (
                        <span className="text-yellow-600 dark:text-yellow-400 ml-1">
                          ({locale === "nl" ? "mogelijk onnauwkeurig" : "may be inaccurate"})
                        </span>
                      )}
                    </p>
                  )}
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <p className="text-sm text-muted-foreground dark:text-cpCream/60">
              {locale === "nl"
                ? "Neem contact op met het bedrijf voor openingstijden."
                : "Contact the business for opening hours."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getCurrentDayName(locale: string): string {
  const days: Record<string, string[]> = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    nl: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
  };
  const dayNames = days[locale] || days.en;
  return dayNames[new Date().getDay()];
}
