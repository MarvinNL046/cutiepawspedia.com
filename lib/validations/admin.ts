import { z } from "zod";

// ============================================================================
// COUNTRY SCHEMAS
// ============================================================================

export const countrySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z
    .string()
    .length(2, "Country code must be exactly 2 characters")
    .toUpperCase(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
});

export const createCountrySchema = countrySchema;
export const updateCountrySchema = countrySchema.partial();

export type CreateCountryInput = z.infer<typeof createCountrySchema>;
export type UpdateCountryInput = z.infer<typeof updateCountrySchema>;

// ============================================================================
// CITY SCHEMAS
// ============================================================================

export const citySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  countryId: z.number().int().positive("Country is required"),
  lat: z.coerce.number().min(-90).max(90).optional().nullable(),
  lng: z.coerce.number().min(-180).max(180).optional().nullable(),
});

export const createCitySchema = citySchema;
export const updateCitySchema = citySchema.partial();

export type CreateCityInput = z.infer<typeof createCitySchema>;
export type UpdateCityInput = z.infer<typeof updateCitySchema>;

// ============================================================================
// CATEGORY SCHEMAS
// ============================================================================

export const categorySchema = z.object({
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  labelKey: z.string().min(2, "Label key is required"),
  icon: z.string().optional().nullable(),
});

export const createCategorySchema = categorySchema;
export const updateCategorySchema = categorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

// ============================================================================
// PLACE ADMIN SCHEMAS
// ============================================================================

export const placeAdminUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  description: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable().or(z.literal("")),
  email: z.string().email().optional().nullable().or(z.literal("")),
  lat: z.coerce.number().min(-90).max(90).optional().nullable(),
  lng: z.coerce.number().min(-180).max(180).optional().nullable(),
  cityId: z.number().int().positive().optional(),
  ownerId: z.number().int().positive().optional().nullable(),
  isVerified: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  premiumUntil: z.coerce.date().optional().nullable(),
});

export type PlaceAdminUpdateInput = z.infer<typeof placeAdminUpdateSchema>;

// ============================================================================
// REVIEW ADMIN SCHEMAS
// ============================================================================

export const reviewStatusSchema = z.object({
  status: z.enum(["visible", "hidden", "flagged"]),
});

export type ReviewStatusInput = z.infer<typeof reviewStatusSchema>;

// ============================================================================
// BUSINESS SCHEMAS
// ============================================================================

export const businessStatusEnum = z.enum(["active", "pending", "suspended"]);
export const businessPlanEnum = z.enum(["free", "starter", "pro", "enterprise"]);
export const billingStatusEnum = z.enum(["trial", "paid", "overdue", "cancelled"]);

export const businessSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  contactEmail: z.string().email("Invalid email address").optional().nullable().or(z.literal("")),
  contactPhone: z.string().optional().nullable(),
  status: businessStatusEnum.default("active"),
  plan: businessPlanEnum.default("free"),
  billingStatus: billingStatusEnum.default("trial"),
  leadPriceCents: z.coerce.number().int().min(0).optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const createBusinessSchema = businessSchema.extend({
  userId: z.number().int().positive("User is required"),
});

export const updateBusinessSchema = businessSchema.partial();

export const businessNotesSchema = z.object({
  notes: z.string().nullable(),
});

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;
export type UpdateBusinessInput = z.infer<typeof updateBusinessSchema>;
export type BusinessNotesInput = z.infer<typeof businessNotesSchema>;
