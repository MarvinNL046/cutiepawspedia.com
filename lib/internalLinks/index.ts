/**
 * Internal Links Module
 *
 * Data-driven internal linking engine for SEO optimization.
 */

// Types
export type {
  InternalLinkType,
  InternalLinkItem,
  InternalLinkGroup,
  InternalLinkPageContext,
  InternalLinkOptions,
  InternalLinksResult,
  CategoryLinkStats,
  CityLinkStats,
  RelatedPlaceLink,
} from "./types";

// Strategies and API
export {
  getInternalLinksForPage,
  buildCategoryLinksForCity,
  buildCityLinksForCategory,
  buildRelatedPlaceLinks,
  buildPlaceContextLinks,
  buildCountryExploreLinks,
  buildCityBestLinks,
  buildCountryBestLinks,
} from "./strategies";
