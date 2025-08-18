"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types/directory"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CategoriesGridProps {
  categories: Category[]
  onCategoryClick?: (categoryId: string) => void // STUB function
  config?: {
    // CURSOR EXTENSION POINT: Add dynamic category configuration
    showCounts?: boolean
    maxCategories?: number
  }
}

export function CategoriesGrid({
  categories,
  onCategoryClick,
  config = { showCounts: true, maxCategories: 6 },
}: CategoriesGridProps) {
  const router = useRouter()
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null)

  const handleCategoryClick = async (categoryId: string, categoryName: string) => {
    // Set loading state for visual feedback
    setLoadingCategory(categoryId)

    try {
      // Navigate to businesses page with category filter
      const targetUrl = `/businesses?category=${categoryId}`

      // Log for debugging
      console.log("Navigating to category:", categoryName, "URL:", targetUrl)

      // Use router navigation for seamless transition
      router.push(targetUrl)

      // Call optional callback for backward compatibility
      if (onCategoryClick) {
        onCategoryClick(categoryId)
      }

      // Clear loading state after a short delay
      setTimeout(() => setLoadingCategory(null), 1000)
    } catch (error) {
      console.error("Navigation error:", error)
      setLoadingCategory(null)
    }
  }

  const displayCategories = categories.slice(0, config.maxCategories)

  return (
    <section className="py-16 section-container categories-section transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors duration-300">
            Browse by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
            Discover the best local businesses in your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 grid-container">
          {displayCategories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ui-card card-enhanced ${
                loadingCategory === category.id ? "opacity-75 scale-95" : ""
              }`}
              onClick={() => handleCategoryClick(category.id, category.name)}
            >
              <CardContent className="p-6 text-center card-content-enhanced relative">
                {/* Loading indicator */}
                {loadingCategory === category.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card bg-opacity-50 rounded-lg">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}

                <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">{category.icon}</div>
                <h3 className="font-semibold text-card-foreground mb-2 transition-colors duration-300">
                  {category.name}
                </h3>
                {config.showCounts && (
                  <p className="text-sm text-muted-foreground transition-colors duration-300">
                    {category.count} businesses
                  </p>
                )}

                {/* Hover effect indicator */}
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 hover:bg-opacity-5 rounded-lg transition-all duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Categories Link */}
        {categories.length > (config.maxCategories || 6) && (
          <div className="text-center mt-8">
            <Link
              href="/businesses"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
            >
              View All Categories
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
