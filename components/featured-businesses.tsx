"use client"

import { BusinessCard } from "./business-card"
import type { Business } from "@/types/directory"
import Link from "next/link"

interface FeaturedBusinessesProps {
  businesses: Business[]
  title?: string
  subtitle?: string
  onSave?: (businessId: string) => void // STUB function
  onShare?: (businessId: string) => void // STUB function
  onView?: (businessId: string) => void // STUB function
  onViewAll?: () => void // STUB function
  config?: {
    // CURSOR EXTENSION POINT: Add dynamic configuration
    maxBusinesses?: number
    variant?: "grid" | "carousel"
  }
}

export function FeaturedBusinesses({
  businesses,
  title = "Featured Businesses",
  subtitle = "Discover the most popular and highly-rated businesses in your area",
  onSave,
  onShare,
  onView,
  onViewAll,
  config = { maxBusinesses: 8, variant: "grid" },
}: FeaturedBusinessesProps) {
  const displayBusinesses = businesses.slice(0, config.maxBusinesses)

  return (
    <section className="py-16 section-container featured-businesses-section transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 grid-container">
          {displayBusinesses.slice(0, 4).map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              variant="featured"
              onSave={onSave}
              onShare={onShare}
              onView={onView}
            />
          ))}
        </div>

        {/* Second Row */}
        {displayBusinesses.length > 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 grid-container">
            {displayBusinesses.slice(4, 8).map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                variant="featured"
                onSave={onSave}
                onShare={onShare}
                onView={onView}
              />
            ))}
          </div>
        )}

        {/* CURSOR EXTENSION POINT: Add pagination or load more functionality */}
        <div className="text-center">
          <Link
            href="/businesses"
            className="inline-flex items-center px-6 py-3 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
          >
            View All Businesses
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
