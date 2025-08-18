// Complete database schema using Drizzle ORM for maximum flexibility
// CURSOR EXTENSION POINT: This schema supports multiple database providers

import { pgTable, text, integer, boolean, timestamp, decimal, jsonb, uuid, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table - Authentication and user management
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    avatar: text("avatar"),
    role: text("role", { enum: ["user", "business_owner", "admin", "moderator"] })
      .default("user")
      .notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    dateJoined: timestamp("date_joined").defaultNow().notNull(),
    lastLogin: timestamp("last_login"),
    // User preferences as JSON
    preferences: jsonb("preferences").$type<{
      notifications: boolean
      newsletter: boolean
      publicProfile: boolean
    }>(),
    // User profile information
    profile: jsonb("profile").$type<{
      bio?: string
      location?: string
      website?: string
      socialMedia?: Record<string, string>
    }>(),
    // CURSOR EXTENSION POINT: Add custom user fields
    customFields: jsonb("custom_fields").$type<Record<string, any>>(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
  }),
)

// Categories table - Business categorization
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    icon: text("icon").notNull(),
    description: text("description"),
    parentId: uuid("parent_id").references(() => categories.id),
    isActive: boolean("is_active").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    // SEO metadata
    seoMetadata: jsonb("seo_metadata").$type<{
      title?: string
      description?: string
      keywords?: string[]
    }>(),
    // CURSOR EXTENSION POINT: Add category-specific fields
    customFields: jsonb("custom_fields").$type<Record<string, any>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("categories_slug_idx").on(table.slug),
    parentIdx: index("categories_parent_idx").on(table.parentId),
    activeIdx: index("categories_active_idx").on(table.isActive),
  }),
)

// Custom fields definition table
export const customFields = pgTable(
  "custom_fields",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type", {
      enum: ["text", "select", "multiselect", "number", "boolean", "date", "url", "email", "phone", "textarea", "file"],
    }).notNull(),
    required: boolean("required").default(false).notNull(),
    options: jsonb("options").$type<string[]>(),
    validation: jsonb("validation").$type<{
      min?: number
      max?: number
      pattern?: string
      message?: string
    }>(),
    displayOrder: integer("display_order").default(0).notNull(),
    isSearchable: boolean("is_searchable").default(false).notNull(),
    isFilterable: boolean("is_filterable").default(false).notNull(),
    // Conditional logic for dynamic forms
    conditionalLogic: jsonb("conditional_logic").$type<{
      showWhen?: {
        fieldId: string
        value: any
      }
    }>(),
    entityType: text("entity_type", { enum: ["business", "user", "category"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    entityTypeIdx: index("custom_fields_entity_type_idx").on(table.entityType),
    orderIdx: index("custom_fields_order_idx").on(table.displayOrder),
  }),
)

// Businesses table - Core business listings
export const businesses = pgTable(
  "businesses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    categoryId: uuid("category_id")
      .references(() => categories.id)
      .notNull(),
    ownerId: uuid("owner_id").references(() => users.id),
    // Basic information
    description: text("description"),
    shortDescription: text("short_description"),
    address: text("address").notNull(),
    coordinates: jsonb("coordinates").$type<{ lat: number; lng: number }>(),
    phone: text("phone"),
    email: text("email"),
    website: text("website"),
    // Pricing and ratings
    priceRange: text("price_range", { enum: ["$", "$$", "$$$", "$$$$"] }),
    rating: decimal("rating", { precision: 3, scale: 2 }).default("0").notNull(),
    reviewCount: integer("review_count").default(0).notNull(),
    viewCount: integer("view_count").default(0).notNull(),
    // Images
    imageUrl: text("image_url"),
    images: jsonb("images").$type<string[]>(),
    // Business status
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    isPremium: boolean("is_premium").default(false).notNull(),
    // Business hours
    businessHours: jsonb("business_hours").$type<{
      [key: string]: {
        open: string
        close: string
        closed: boolean
      }
    }>(),
    // Social media
    socialMedia: jsonb("social_media").$type<{
      facebook?: string
      instagram?: string
      twitter?: string
      linkedin?: string
    }>(),
    // SEO metadata
    seoMetadata: jsonb("seo_metadata").$type<{
      title?: string
      description?: string
      keywords?: string[]
    }>(),
    // CURSOR EXTENSION POINT: Dynamic custom fields
    customFields: jsonb("custom_fields").$type<Record<string, any>>(),
    // Claiming information
    claimedBy: uuid("claimed_by").references(() => users.id),
    claimedAt: timestamp("claimed_at"),
    // Timestamps
    dateAdded: timestamp("date_added").defaultNow().notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("businesses_slug_idx").on(table.slug),
    categoryIdx: index("businesses_category_idx").on(table.categoryId),
    ownerIdx: index("businesses_owner_idx").on(table.ownerId),
    activeIdx: index("businesses_active_idx").on(table.isActive),
    featuredIdx: index("businesses_featured_idx").on(table.isFeatured),
    ratingIdx: index("businesses_rating_idx").on(table.rating),
    locationIdx: index("businesses_location_idx").on(table.coordinates),
  }),
)

// Reviews table - User reviews and ratings
export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    businessId: uuid("business_id")
      .references(() => businesses.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    rating: integer("rating").notNull(),
    title: text("title"),
    content: text("content").notNull(),
    images: jsonb("images").$type<string[]>(),
    isVerified: boolean("is_verified").default(false).notNull(),
    isHelpful: integer("is_helpful").default(0).notNull(),
    // Business response
    response: jsonb("response").$type<{
      content: string
      dateCreated: string
      authorName: string
    }>(),
    // Review metadata
    metadata: jsonb("metadata").$type<{
      visitDate?: string
      recommendedFor?: string[]
      pros?: string[]
      cons?: string[]
    }>(),
    dateCreated: timestamp("date_created").defaultNow().notNull(),
    dateUpdated: timestamp("date_updated"),
  },
  (table) => ({
    businessIdx: index("reviews_business_idx").on(table.businessId),
    userIdx: index("reviews_user_idx").on(table.userId),
    ratingIdx: index("reviews_rating_idx").on(table.rating),
    dateIdx: index("reviews_date_idx").on(table.dateCreated),
  }),
)

// Blog posts table - Content management
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    featuredImage: text("featured_image"),
    images: jsonb("images").$type<string[]>(),
    authorId: uuid("author_id").references(() => users.id),
    author: text("author").notNull(),
    category: text("category").notNull(),
    tags: jsonb("tags").$type<string[]>(),
    businessId: uuid("business_id").references(() => businesses.id),
    businessName: text("business_name"),
    readTime: text("read_time").notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    viewCount: integer("view_count").default(0).notNull(),
    // SEO metadata
    seoMetadata: jsonb("seo_metadata").$type<{
      title?: string
      description?: string
      keywords?: string[]
    }>(),
    // CURSOR EXTENSION POINT: Blog-specific custom fields
    customFields: jsonb("custom_fields").$type<Record<string, any>>(),
    publishDate: timestamp("publish_date").defaultNow().notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("blog_posts_slug_idx").on(table.slug),
    authorIdx: index("blog_posts_author_idx").on(table.authorId),
    categoryIdx: index("blog_posts_category_idx").on(table.category),
    publishedIdx: index("blog_posts_published_idx").on(table.isPublished),
    featuredIdx: index("blog_posts_featured_idx").on(table.isFeatured),
    businessIdx: index("blog_posts_business_idx").on(table.businessId),
  }),
)

// Analytics table - Event tracking
export const analytics = pgTable(
  "analytics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityType: text("entity_type", { enum: ["business", "blog", "category", "user"] }).notNull(),
    entityId: uuid("entity_id").notNull(),
    eventType: text("event_type", { enum: ["view", "click", "share", "save", "search", "contact"] }).notNull(),
    userId: uuid("user_id").references(() => users.id),
    sessionId: text("session_id"),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    referrer: text("referrer"),
    // Event metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => ({
    entityIdx: index("analytics_entity_idx").on(table.entityType, table.entityId),
    eventIdx: index("analytics_event_idx").on(table.eventType),
    timestampIdx: index("analytics_timestamp_idx").on(table.timestamp),
    userIdx: index("analytics_user_idx").on(table.userId),
  }),
)

// Saved businesses table - User favorites
export const savedBusinesses = pgTable(
  "saved_businesses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    businessId: uuid("business_id")
      .references(() => businesses.id, { onDelete: "cascade" })
      .notNull(),
    dateAdded: timestamp("date_added").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("saved_businesses_user_idx").on(table.userId),
    businessIdx: index("saved_businesses_business_idx").on(table.businessId),
    uniqueUserBusiness: index("saved_businesses_unique_idx").on(table.userId, table.businessId),
  }),
)

// Database relations
export const usersRelations = relations(users, ({ many }) => ({
  businesses: many(businesses),
  reviews: many(reviews),
  blogPosts: many(blogPosts),
  savedBusinesses: many(savedBusinesses),
  analytics: many(analytics),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
  businesses: many(businesses),
}))

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  category: one(categories, {
    fields: [businesses.categoryId],
    references: [categories.id],
  }),
  owner: one(users, {
    fields: [businesses.ownerId],
    references: [users.id],
  }),
  claimedByUser: one(users, {
    fields: [businesses.claimedBy],
    references: [users.id],
  }),
  reviews: many(reviews),
  blogPosts: many(blogPosts),
  savedBy: many(savedBusinesses),
  analytics: many(analytics),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  business: one(businesses, {
    fields: [reviews.businessId],
    references: [businesses.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}))

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [blogPosts.businessId],
    references: [businesses.id],
  }),
}))

export const savedBusinessesRelations = relations(savedBusinesses, ({ one }) => ({
  user: one(users, {
    fields: [savedBusinesses.userId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [savedBusinesses.businessId],
    references: [businesses.id],
  }),
}))

export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, {
    fields: [analytics.userId],
    references: [users.id],
  }),
}))
