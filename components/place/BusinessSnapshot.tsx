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
import { Star, Clock, ChevronRight, Globe, Info } from "lucide-react";
import {
  formatRating,
  getRatingSource,
  getTodayStatus,
  formatOpeningHours,
  getOpeningHoursSource,
  hasOpeningHours,
  type PlaceData,
} from "@/lib/enrichment/ui";

interface BusinessSnapshotProps {
  place: PlaceData;
  locale?: string;
}

export function BusinessSnapshot({ place, locale = "en" }: BusinessSnapshotProps) {
  const [hoursOpen, setHoursOpen] = useState(false);

  const rating = formatRating(place.avgRating);
  const ratingSource = getRatingSource(place.dataQualityFlags);
  const todayStatus = getTodayStatus(place.openingHours, locale);
  const hasHours = hasOpeningHours(place.openingHours);
  const hoursSource = getOpeningHoursSource(place.dataQualityFlags);
  const allHours = formatOpeningHours(place.openingHours, locale);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {locale === "nl" ? "Bedrijfsinfo" : "Business Info"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Rating Section - only show rating if there are actual reviews */}
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase text-slate-400 tracking-wide">
            {locale === "nl" ? "Beoordeling" : "Rating"}
          </p>
          {rating.hasRating && place.reviewCount && place.reviewCount > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(rating.value)
                        ? "fill-cpYellow text-cpYellow"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-slate-900">
                {rating.display}
              </span>
              <span className="text-sm text-slate-500">
                ({place.reviewCount.toLocaleString()})
              </span>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              {locale === "nl" ? "Nog geen beoordeling" : "No rating yet"}
            </p>
          )}
          {rating.hasRating && place.reviewCount && place.reviewCount > 0 && ratingSource && (
            <p className="text-xs text-slate-400 flex items-center gap-1">
              {ratingSource.icon === "google" && <Globe className="h-3 w-3" />}
              {locale === "nl" ? "Bron" : "Source"}: {ratingSource.source}
            </p>
          )}
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase text-slate-400 tracking-wide flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {locale === "nl" ? "Openingstijden" : "Business Hours"}
          </p>

          {hasHours ? (
            <>
              {/* Today's status */}
              <div
                className={`text-sm font-medium ${
                  todayStatus.isOpen ? "text-green-600" : "text-slate-600"
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
                    className="text-cpPink hover:text-cpPink/80 hover:bg-cpPink/5 gap-1 -ml-3 h-auto py-1"
                  >
                    {locale === "nl"
                      ? "Bekijk alle openingstijden"
                      : "View all opening hours"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-cpPink" />
                      {locale === "nl" ? "Openingstijden" : "Opening Hours"}
                    </DialogTitle>
                    <DialogDescription>{place.name}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 mt-4">
                    {allHours.map((dayHours) => (
                      <div
                        key={dayHours.day}
                        className={`flex justify-between py-2 px-3 rounded-lg ${
                          dayHours.day === getCurrentDayName(locale)
                            ? "bg-cpPink/5 border border-cpPink/20"
                            : "bg-slate-50"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            dayHours.day === getCurrentDayName(locale)
                              ? "text-cpPink"
                              : "text-slate-700"
                          }`}
                        >
                          {dayHours.day}
                        </span>
                        <span
                          className={
                            dayHours.isClosed
                              ? "text-slate-400"
                              : "text-slate-600"
                          }
                        >
                          {dayHours.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  {hoursSource && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-4 pt-4 border-t">
                      <Info className="h-3 w-3" />
                      {locale === "nl" ? "Bron" : "Source"}: {hoursSource.source}
                      {hoursSource.reliability === "low" && (
                        <span className="text-yellow-600 ml-1">
                          ({locale === "nl" ? "mogelijk onnauwkeurig" : "may be inaccurate"})
                        </span>
                      )}
                    </p>
                  )}
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <p className="text-sm text-slate-500">
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
