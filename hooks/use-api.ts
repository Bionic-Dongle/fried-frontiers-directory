"use client"

// Custom hooks for API integration with comprehensive error handling

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/src/lib/wordpress-api"
import { apiStubs } from "@/lib/api-stubs"
import type { Business, Review, ApiResponse, BusinessSearchParams } from "@/types/directory"

// Generic API hook for data fetching
export function useApi<T>(apiFunction: () => Promise<ApiResponse<T>>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunction()

      if (response.success && response.data) {
        setData(response.data)
      } else {
        setError(response.error || "An error occurred")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      console.error("API Hook Error:", err)
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Business-specific hooks
export function useBusinesses(params: BusinessSearchParams = {}) {
  console.log("useBusinesses hook called with params:", params)

  return useApi(async () => {
    const businesses = await apiClient.getBusinesses(params)
    return { success: true, data: businesses }
  }, [JSON.stringify(params)])
}

export function useBusiness(id: string) {
  console.log("useBusiness hook called with id:", id)

  return useApi(async () => {
    const business = await apiClient.getBusinessById(id)
    return { success: true, data: business }
  }, [id])
}

export function useCategories() {
  console.log("useCategories hook called")

  return useApi(async () => {
    const categories = await apiClient.getCategories()
    return { success: true, data: categories }
  }, [])
}

export function useReviews(businessId: string) {
  console.log("STUB: useReviews hook called with businessId:", businessId)
  console.log("CURSOR TODO: Implement reviews data fetching with pagination")

  return useApi(async () => {
    const reviews = await apiStubs.getReviewsByBusinessId(businessId)
    return reviews
  }, [businessId])
}

export function useBlogPosts(params: { page?: number; limit?: number; category?: string } = {}) {
  console.log("STUB: useBlogPosts hook called with params:", params)
  console.log("CURSOR TODO: Implement blog posts data fetching with pagination and filtering")

  return useApi(async () => {
    const posts = await apiStubs.getBlogPosts(params)
    return posts
  }, [JSON.stringify(params)])
}

export function useBlogPost(slug: string) {
  console.log("STUB: useBlogPost hook called with slug:", slug)
  console.log("CURSOR TODO: Implement single blog post data fetching")

  return useApi(async () => {
    const post = await apiStubs.getBlogPostBySlug(slug)
    return post
  }, [slug])
}

// Mutation hooks for data modification
export function useCreateBusiness() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBusiness = useCallback(async (businessData: Omit<Business, "id" | "dateAdded" | "lastUpdated">) => {
    console.log("STUB: useCreateBusiness mutation called")
    console.log("CURSOR TODO: Implement business creation with validation and error handling")

    try {
      setLoading(true)
      setError(null)
      const response = await apiStubs.createBusiness(businessData)

      if (response.success) {
        return response.data
      } else {
        setError(response.error || "Failed to create business")
        return null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      console.error("Create Business Error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { createBusiness, loading, error }
}

export function useCreateReview() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createReview = useCallback(async (reviewData: Omit<Review, "id" | "dateCreated">) => {
    console.log("STUB: useCreateReview mutation called")
    console.log("CURSOR TODO: Implement review creation with business rating update")

    try {
      setLoading(true)
      setError(null)
      const response = await apiStubs.createReview(reviewData)

      if (response.success) {
        return response.data
      } else {
        setError(response.error || "Failed to create review")
        return null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      console.error("Create Review Error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { createReview, loading, error }
}

// Analytics hook
export function useAnalytics(entityType: string, entityId: string, timeRange?: string) {
  console.log("STUB: useAnalytics hook called:", { entityType, entityId, timeRange })
  console.log("CURSOR TODO: Implement analytics data fetching with real-time updates")

  return useApi(async () => {
    const analytics = await apiStubs.getAnalytics(entityType, entityId, timeRange)
    return analytics
  }, [entityType, entityId, timeRange])
}

// Search hook with debouncing
export function useSearch(initialParams: BusinessSearchParams = {}) {
  const [params, setParams] = useState(initialParams)
  const [debouncedParams, setDebouncedParams] = useState(initialParams)

  // Debounce search parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(params)
    }, 300)

    return () => clearTimeout(timer)
  }, [params])

  const { data, loading, error, refetch } = useBusinesses(debouncedParams)

  const updateSearch = useCallback((newParams: Partial<BusinessSearchParams>) => {
    console.log("STUB: updateSearch called with params:", newParams)
    console.log("CURSOR TODO: Implement debounced search with URL state management")

    setParams((prev) => ({ ...prev, ...newParams }))
  }, [])

  return {
    businesses: data || [],
    loading,
    error,
    updateSearch,
    refetch,
    params: debouncedParams,
  }
}
