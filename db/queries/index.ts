export * from "./locations";
export * from "./listings";
export * from "./users";
export * from "./search";
export * from "./dashboard";
export * from "./claims";
export * from "./credits";
export * from "./leads";
export * from "./businesses";
export * from "./premium";
export * from "./reviews";
export * from "./reviewPhotos";
export * from "./dataQuality";
export * from "./refreshJobs";
export * from "./favorites";
export * from "./recentViews";
export * from "./userProfiles";
export * from "./badges";
export * from "./karma";
export * from "./messaging";
export * from "./blog";
export * from "./ads";
export * from "./map";
export * from "./statistics";
export * from "./awards";
export * from "./comparison";

// Admin queries are exported separately from "@/db/queries/admin"
// to avoid naming conflicts with getCityById, getCountryById, etc.

// Cached queries are exported separately from "@/db/queries/cached"
// PERFORMANCE: Use cached versions for page rendering to reduce DB load
// Example: import { cachedGetCountries } from "@/db/queries/cached";
