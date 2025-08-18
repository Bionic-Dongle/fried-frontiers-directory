"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CategoriesGrid } from "@/components/categories-grid"
import { FeaturedBusinesses } from "@/components/featured-businesses"
import { BlogSection } from "@/components/blog-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { sampleConfig, sampleBlogPosts, directoryStats } from "@/data/sample-data"
import { apiClient } from "@/src/lib/wordpress-api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [featuredBusinesses, setFeaturedBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("STUB: Page view analytics")
    
    const loadFeaturedBusinesses = async () => {
      try {
        setLoading(true)
        const businesses = await apiClient.getFeaturedBusinesses(6)
        setFeaturedBusinesses(businesses)
      } catch (err) {
        console.error('Error loading featured businesses:', err)
        setError(err instanceof Error ? err.message : 'Failed to load businesses')
      } finally {
        setLoading(false)
      }
    }
    
    loadFeaturedBusinesses()
  }, [])

  // STUB: All these handlers will be replaced with real functionality
  const handleSearch = (query: string, location?: string) => {
    const searchParams = new URLSearchParams()
    if (query) searchParams.set('q', query)
    if (location) searchParams.set('location', location)
    router.push(`/businesses?${searchParams.toString()}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to businesses page with category filter
    console.log("STUB: Category selected:", categoryId)
    router.push(`/businesses?category=${categoryId}`)
  }

  const handleBusinessSave = (businessId: string) => {
    console.log("STUB: Business saved:", businessId)
  }

  const handleBusinessShare = (businessId: string) => {
    console.log("STUB: Business shared:", businessId)
  }

  const handleBusinessView = (businessId: string) => {
    router.push(`/business/${businessId}`)
  }

  const handleLogin = () => {
    console.log("STUB: Login clicked")
  }

  const handleAddBusiness = () => {
    // This is now handled directly in the components
    console.log("STUB: Add business navigation handled by component")
  }

  const handleViewAllBusinesses = () => {
    router.push('/businesses')
  }

  const handleSocialClick = (platform: string) => {
    console.log("STUB: Social media clicked:", platform)
  }

  const handleReadBlogPost = (postId: string) => {
    console.log("STUB: Read blog post:", postId)
    // CURSOR EXTENSION POINT: Navigate to blog post page
  }

  const handleViewAllBlogPosts = () => {
    console.log("STUB: View all blog posts")
    // CURSOR EXTENSION POINT: Navigate to blog listing page
  }

  // Scroll to top when homepage loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Navigation */}
        <Navigation
          config={{ siteName: sampleConfig.siteName }}
          onSearch={handleSearch}
          onLogin={handleLogin}
          // onAddBusiness is now optional - component handles navigation internally
        />

        {/* Hero Section */}
        <HeroSection
          config={{
            siteName: sampleConfig.siteName,
            niche: sampleConfig.niche,
          }}
          onSearch={handleSearch}
          // onAddBusiness is now optional - component handles navigation internally
        />

        {/* Categories Grid with Navigation */}
        <CategoriesGrid
          categories={sampleConfig.categories}
          onCategoryClick={handleCategoryClick}
          config={{ showCounts: true, maxCategories: 6 }}
        />

        {/* Featured Businesses */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading featured businesses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading businesses: {error}</p>
          </div>
        ) : (
          <FeaturedBusinesses
            businesses={featuredBusinesses}
            onSave={handleBusinessSave}
            onShare={handleBusinessShare}
            onView={handleBusinessView}
            config={{ maxBusinesses: 8, variant: "grid" }}
          />
        )}

        {/* Blog Section - Conditional Premium Feature */}
        <BlogSection
          config={sampleConfig}
          posts={sampleBlogPosts.slice(0, 3)} // Show 3 most recent posts
          onReadPost={handleReadBlogPost}
          onViewAllPosts={handleViewAllBlogPosts}
        />

        {/* Stats Section */}
        <StatsSection stats={directoryStats} config={{ showAverageRating: true }} />

        {/* Footer */}
        <Footer
          config={{
            siteName: sampleConfig.siteName,
            categories: sampleConfig.categories?.slice(0, 4),
          }}
          onCategoryClick={handleCategoryClick}
          onSocialClick={handleSocialClick}
        />

        {/* CURSOR EXTENSION POINT: Add floating action buttons, chat widget, etc. */}
      </div>
    </ThemeProvider>
  )
}
