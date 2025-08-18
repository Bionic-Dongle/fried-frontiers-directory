// Complete business API implementation with comprehensive CRUD operations
// CURSOR EXTENSION POINT: Replace with your preferred API framework

import { getDatabase } from "@/lib/database/connection"
import { businesses, categories, analytics } from "@/lib/database/schema"
import { eq, and, or, like, gte, desc, asc, count, sql } from "drizzle-orm"
import type { Business, BusinessSearchParams, ApiResponse } from "@/types/directory"

const db = getDatabase()

// CURSOR EXTENSION POINT: Add authentication middleware
export async function authenticateRequest(request: Request): Promise<{ userId?: string; role?: string }> {
  console.log("STUB: authenticateRequest - implement JWT/session validation")
  console.log("CURSOR TODO: Add authentication logic:", {
    extractToken: "Extract JWT token from Authorization header",
    validateToken: "Validate token signature and expiration",
    getUserInfo: "Extract user ID and role from token",
    handleErrors: "Return appropriate error responses",
  })

  // Return mock user for development
  return { userId: "mock-user-id", role: "user" }
}

// Search businesses with comprehensive filtering
export async function searchBusinesses(params: BusinessSearchParams): Promise<ApiResponse<Business[]>> {
  console.log("API: searchBusinesses called with params:", params)

  try {
    let query = db
      .select({
        id: businesses.id,
        name: businesses.name,
        slug: businesses.slug,
        categoryId: businesses.categoryId,
        description: businesses.description,
        shortDescription: businesses.shortDescription,
        address: businesses.address,
        coordinates: businesses.coordinates,
        phone: businesses.phone,
        email: businesses.email,
        website: businesses.website,
        priceRange: businesses.priceRange,
        rating: businesses.rating,
        reviewCount: businesses.reviewCount,
        viewCount: businesses.viewCount,
        imageUrl: businesses.imageUrl,
        images: businesses.images,
        isActive: businesses.isActive,
        isFeatured: businesses.isFeatured,
        isVerified: businesses.isVerified,
        isPremium: businesses.isPremium,
        businessHours: businesses.businessHours,
        socialMedia: businesses.socialMedia,
        customFields: businesses.customFields,
        dateAdded: businesses.dateAdded,
        lastUpdated: businesses.lastUpdated,
        // Join category information
        category: categories.name,
      })
      .from(businesses)
      .leftJoin(categories, eq(businesses.categoryId, categories.id))
      .where(eq(businesses.isActive, true))

    // Apply filters
    const conditions = [eq(businesses.isActive, true)]

    // Text search
    if (params.query) {
      conditions.push(
        or(
          like(businesses.name, `%${params.query}%`),
          like(businesses.description, `%${params.query}%`),
          like(businesses.address, `%${params.query}%`),
        )!,
      )
    }

    // Category filter
    if (params.categoryIds && params.categoryIds.length > 0) {
      conditions.push(or(...params.categoryIds.map((id) => eq(businesses.categoryId, id)))!)
    }

    // Rating filter
    if (params.rating) {
      conditions.push(gte(businesses.rating, params.rating.toString()))
    }

    // Price range filter
    if (params.priceRanges && params.priceRanges.length > 0) {
      conditions.push(or(...params.priceRanges.map((range) => eq(businesses.priceRange, range)))!)
    }

    // Featured filter
    if (params.featured) {
      conditions.push(eq(businesses.isFeatured, true))
    }

    // Verified filter
    if (params.verified) {
      conditions.push(eq(businesses.isVerified, true))
    }

    // Apply all conditions
    if (conditions.length > 1) {
      query = query.where(and(...conditions))
    }

    // Sorting
    switch (params.sortBy) {
      case "rating":
        query = query.orderBy(desc(businesses.rating), desc(businesses.reviewCount))
        break
      case "reviews":
        query = query.orderBy(desc(businesses.reviewCount))
        break
      case "name":
        query = query.orderBy(asc(businesses.name))
        break
      case "date":
        query = query.orderBy(desc(businesses.dateAdded))
        break
      default:
        query = query.orderBy(desc(businesses.isFeatured), desc(businesses.rating))
    }

    // Pagination
    const page = params.page || 1
    const limit = params.limit || 20
    const offset = (page - 1) * limit

    query = query.limit(limit).offset(offset)

    // Execute query
    const results = await query

    // Get total count for pagination
    const totalQuery = db
      .select({ count: count() })
      .from(businesses)
      .leftJoin(categories, eq(businesses.categoryId, categories.id))

    if (conditions.length > 1) {
      totalQuery.where(and(...conditions))
    }

    const [{ count: total }] = await totalQuery

    // Transform results to match Business interface
    const transformedResults: Business[] = results.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      category: row.category || "Uncategorized",
      categoryId: row.categoryId,
      rating: Number.parseFloat(row.rating || "0"),
      reviewCount: row.reviewCount || 0,
      address: row.address,
      coordinates: row.coordinates,
      priceRange: row.priceRange || "$",
      imageUrl: row.imageUrl || "",
      images: row.images || [],
      phone: row.phone,
      email: row.email,
      website: row.website,
      description: row.description,
      shortDescription: row.shortDescription,
      isActive: row.isActive,
      isFeatured: row.isFeatured,
      isVerified: row.isVerified,
      isPremium: row.isPremium,
      dateAdded: row.dateAdded.toISOString(),
      lastUpdated: row.lastUpdated.toISOString(),
      viewCount: row.viewCount || 0,
      businessHours: row.businessHours,
      socialMedia: row.socialMedia,
      customFields: row.customFields,
    }))

    return {
      success: true,
      data: transformedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error searching businesses:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search businesses",
    }
  }
}

// Get single business by ID
export async function getBusinessById(id: string): Promise<ApiResponse<Business>> {
  console.log("API: getBusinessById called with id:", id)

  try {
    const result = await db
      .select({
        id: businesses.id,
        name: businesses.name,
        slug: businesses.slug,
        categoryId: businesses.categoryId,
        description: businesses.description,
        shortDescription: businesses.shortDescription,
        address: businesses.address,
        coordinates: businesses.coordinates,
        phone: businesses.phone,
        email: businesses.email,
        website: businesses.website,
        priceRange: businesses.priceRange,
        rating: businesses.rating,
        reviewCount: businesses.reviewCount,
        viewCount: businesses.viewCount,
        imageUrl: businesses.imageUrl,
        images: businesses.images,
        isActive: businesses.isActive,
        isFeatured: businesses.isFeatured,
        isVerified: businesses.isVerified,
        isPremium: businesses.isPremium,
        businessHours: businesses.businessHours,
        socialMedia: businesses.socialMedia,
        customFields: businesses.customFields,
        dateAdded: businesses.dateAdded,
        lastUpdated: businesses.lastUpdated,
        category: categories.name,
      })
      .from(businesses)
      .leftJoin(categories, eq(businesses.categoryId, categories.id))
      .where(and(eq(businesses.id, id), eq(businesses.isActive, true)))
      .limit(1)

    if (result.length === 0) {
      return {
        success: false,
        error: "Business not found",
      }
    }

    const business = result[0]

    // Increment view count
    await db
      .update(businesses)
      .set({ viewCount: sql`${businesses.viewCount} + 1` })
      .where(eq(businesses.id, id))

    // Track analytics event
    await trackAnalyticsEvent("business", id, "view")

    const transformedBusiness: Business = {
      id: business.id,
      name: business.name,
      slug: business.slug,
      category: business.category || "Uncategorized",
      categoryId: business.categoryId,
      rating: Number.parseFloat(business.rating || "0"),
      reviewCount: business.reviewCount || 0,
      address: business.address,
      coordinates: business.coordinates,
      priceRange: business.priceRange || "$",
      imageUrl: business.imageUrl || "",
      images: business.images || [],
      phone: business.phone,
      email: business.email,
      website: business.website,
      description: business.description,
      shortDescription: business.shortDescription,
      isActive: business.isActive,
      isFeatured: business.isFeatured,
      isVerified: business.isVerified,
      isPremium: business.isPremium,
      dateAdded: business.dateAdded.toISOString(),
      lastUpdated: business.lastUpdated.toISOString(),
      viewCount: business.viewCount || 0,
      businessHours: business.businessHours,
      socialMedia: business.socialMedia,
      customFields: business.customFields,
    }

    return {
      success: true,
      data: transformedBusiness,
    }
  } catch (error) {
    console.error("Error getting business:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get business",
    }
  }
}

// Create new business
export async function createBusiness(
  businessData: Omit<Business, "id" | "dateAdded" | "lastUpdated" | "rating" | "reviewCount" | "viewCount">,
): Promise<ApiResponse<Business>> {
  console.log("API: createBusiness called with data:", businessData)

  try {
    // CURSOR EXTENSION POINT: Add business validation
    console.log("CURSOR TODO: Add comprehensive business validation:", {
      requiredFields: ["name", "categoryId", "address"],
      emailValidation: "Validate email format if provided",
      phoneValidation: "Validate phone format if provided",
      websiteValidation: "Validate URL format if provided",
      duplicateCheck: "Check for duplicate business names/addresses",
    })

    // Generate slug from name
    const slug = businessData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const [newBusiness] = await db
      .insert(businesses)
      .values({
        name: businessData.name,
        slug,
        categoryId: businessData.categoryId,
        description: businessData.description,
        shortDescription: businessData.shortDescription,
        address: businessData.address,
        coordinates: businessData.coordinates,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        priceRange: businessData.priceRange,
        imageUrl: businessData.imageUrl,
        images: businessData.images,
        businessHours: businessData.businessHours,
        socialMedia: businessData.socialMedia,
        customFields: businessData.customFields,
        isActive: true,
        isFeatured: false,
        isVerified: false,
        isPremium: false,
        rating: "0",
        reviewCount: 0,
        viewCount: 0,
      })
      .returning()

    // Track analytics event
    await trackAnalyticsEvent("business", newBusiness.id, "create")

    const transformedBusiness: Business = {
      id: newBusiness.id,
      name: newBusiness.name,
      slug: newBusiness.slug,
      category: businessData.category,
      categoryId: newBusiness.categoryId,
      rating: 0,
      reviewCount: 0,
      address: newBusiness.address,
      coordinates: newBusiness.coordinates,
      priceRange: newBusiness.priceRange || "$",
      imageUrl: newBusiness.imageUrl || "",
      images: newBusiness.images || [],
      phone: newBusiness.phone,
      email: newBusiness.email,
      website: newBusiness.website,
      description: newBusiness.description,
      shortDescription: newBusiness.shortDescription,
      isActive: newBusiness.isActive,
      isFeatured: newBusiness.isFeatured,
      isVerified: newBusiness.isVerified,
      isPremium: newBusiness.isPremium,
      dateAdded: newBusiness.dateAdded.toISOString(),
      lastUpdated: newBusiness.lastUpdated.toISOString(),
      viewCount: 0,
      businessHours: newBusiness.businessHours,
      socialMedia: newBusiness.socialMedia,
      customFields: newBusiness.customFields,
    }

    return {
      success: true,
      data: transformedBusiness,
      message: "Business created successfully",
    }
  } catch (error) {
    console.error("Error creating business:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create business",
    }
  }
}

// Update business
export async function updateBusiness(id: string, updates: Partial<Business>): Promise<ApiResponse<Business>> {
  console.log("API: updateBusiness called:", { id, updates })

  try {
    // CURSOR EXTENSION POINT: Add authorization check
    console.log("CURSOR TODO: Add authorization check:", {
      checkOwnership: "Verify user owns this business or is admin",
      validateUpdates: "Validate update data",
      auditLog: "Log business changes for audit trail",
    })

    const [updatedBusiness] = await db
      .update(businesses)
      .set({
        ...updates,
        lastUpdated: new Date(),
      })
      .where(eq(businesses.id, id))
      .returning()

    if (!updatedBusiness) {
      return {
        success: false,
        error: "Business not found or update failed",
      }
    }

    // Track analytics event
    await trackAnalyticsEvent("business", id, "update")

    return {
      success: true,
      message: "Business updated successfully",
    }
  } catch (error) {
    console.error("Error updating business:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update business",
    }
  }
}

// Delete business (soft delete)
export async function deleteBusiness(id: string): Promise<ApiResponse<void>> {
  console.log("API: deleteBusiness called with id:", id)

  try {
    // CURSOR EXTENSION POINT: Add authorization and cascade handling
    console.log("CURSOR TODO: Add comprehensive deletion logic:", {
      authorization: "Check user permissions",
      softDelete: "Set isActive = false instead of hard delete",
      cascadeHandling: "Handle related reviews, analytics, etc.",
      auditLog: "Log deletion for audit trail",
    })

    await db.update(businesses).set({ isActive: false, lastUpdated: new Date() }).where(eq(businesses.id, id))

    // Track analytics event
    await trackAnalyticsEvent("business", id, "delete")

    return {
      success: true,
      message: "Business deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting business:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete business",
    }
  }
}

// Helper function to track analytics events
async function trackAnalyticsEvent(
  entityType: string,
  entityId: string,
  eventType: string,
  metadata?: Record<string, any>,
) {
  try {
    await db.insert(analytics).values({
      entityType: entityType as any,
      entityId,
      eventType: eventType as any,
      metadata,
      timestamp: new Date(),
    })
  } catch (error) {
    console.error("Error tracking analytics event:", error)
    // Don't throw error for analytics failures
  }
}

// CURSOR EXTENSION POINT: Add more business-specific endpoints
export async function getBusinessesByCategory(categoryId: string): Promise<ApiResponse<Business[]>> {
  console.log("STUB: getBusinessesByCategory called with categoryId:", categoryId)
  console.log("CURSOR TODO: Implement category-specific business fetching")

  return searchBusinesses({ categoryIds: [categoryId] })
}

export async function getFeaturedBusinesses(limit = 10): Promise<ApiResponse<Business[]>> {
  console.log("STUB: getFeaturedBusinesses called with limit:", limit)
  console.log("CURSOR TODO: Implement featured businesses fetching")

  return searchBusinesses({ featured: true, limit })
}

export async function claimBusiness(businessId: string, userId: string): Promise<ApiResponse<void>> {
  console.log("STUB: claimBusiness called:", { businessId, userId })
  console.log("CURSOR TODO: Implement business claiming logic:", {
    verification: "Send verification email/SMS",
    ownership: "Verify business ownership",
    approval: "Admin approval process if required",
  })

  try {
    await db
      .update(businesses)
      .set({
        claimedBy: userId,
        claimedAt: new Date(),
        lastUpdated: new Date(),
      })
      .where(eq(businesses.id, businessId))

    return {
      success: true,
      message: "Business claim submitted successfully",
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to claim business",
    }
  }
}
