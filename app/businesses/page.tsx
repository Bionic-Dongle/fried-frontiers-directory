"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SearchFilterSidebar } from "@/components/search-filter-sidebar"
import { BusinessCard } from "@/components/business-card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { sampleConfig, sampleBusinesses } from "@/data/sample-data"
import { Grid, List, Filter, SlidersHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BusinessesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    rating: 0,
    priceRanges: [],
    radius: 10,
  })

  // Update active filters when category parameter changes
  useEffect(() => {
    if (categoryParam) {
      setIsLoading(true)
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        categories: [categoryParam],
      }))

      // Simulate loading time for better UX
      setTimeout(() => setIsLoading(false), 500)
    } else {
      setIsLoading(false)
    }
  }, [categoryParam])

  // STUB: All these handlers will be replaced with real functionality
  const handleSearch = (query: string) => {
    console.log("STUB: Search businesses:", query)
  }

  const handleLocationSearch = (location: string) => {
    console.log("STUB: Location search:", location)
  }

  const handleCategoryFilter = (categoryId: string, checked: boolean) => {
    console.log("STUB: Category filter:", categoryId, checked)

    // Update active filters state with proper logic
    setActiveFilters((prevFilters) => {
      const updatedCategories = checked
        ? [...prevFilters.categories, categoryId]
        : prevFilters.categories.filter((id) => id !== categoryId)

      const updatedFilters = {
        ...prevFilters,
        categories: updatedCategories,
      }

      // Update URL to reflect filter changes
      const newParams = new URLSearchParams(searchParams.toString())
      if (updatedCategories.length > 0) {
        // Use the first category for URL parameter (for single category support)
        newParams.set("category", updatedCategories[0])
      } else {
        newParams.delete("category")
      }

      // Use setTimeout to avoid state update conflicts
      setTimeout(() => {
        router.push(`/businesses?${newParams.toString()}`)
      }, 0)

      return updatedFilters
    })
  }

  const handleRatingFilter = (rating: number) => {
    console.log("STUB: Rating filter:", rating)
    setActiveFilters((prevFilters) => ({ ...prevFilters, rating }))
  }

  const handlePriceFilter = (priceRange: string, checked: boolean) => {
    console.log("STUB: Price filter:", priceRange, checked)
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      priceRanges: checked
        ? [...prevFilters.priceRanges, priceRange]
        : prevFilters.priceRanges.filter((price) => price !== priceRange),
    }))
  }

  const handleRadiusFilter = (radius: number) => {
    console.log("STUB: Radius filter:", radius)
    setActiveFilters((prevFilters) => ({ ...prevFilters, radius }))
  }

  const handleClearFilters = () => {
    console.log("STUB: Clear all filters")
    setActiveFilters({
      categories: [],
      rating: 0,
      priceRanges: [],
      radius: 10,
    })
    // Clear URL parameters
    router.push("/businesses")
  }

  const handleSortChange = (value: string) => {
    console.log("STUB: Sort by:", value)
    setSortBy(value)
  }

  const handleBusinessSave = (businessId: string) => {
    console.log("STUB: Save business:", businessId)
  }

  const handleBusinessShare = (businessId: string) => {
    console.log("STUB: Share business:", businessId)
  }

  const handleBusinessView = (businessId: string) => {
    console.log("STUB: View business:", businessId)
  }

  // STUB: Filter businesses based on active filters
  let filteredBusinesses = [...sampleBusinesses] // Create a copy to avoid mutations

  // Filter by category if specified
  if (activeFilters.categories.length > 0) {
    filteredBusinesses = filteredBusinesses.filter((business) => {
      // Get the actual category names from the category IDs
      const selectedCategoryNames = activeFilters.categories
        .map((catId) => {
          const category = sampleConfig.categories.find((c) => c.id === catId)
          return category?.name
        })
        .filter(Boolean) // Remove any undefined values

      // Check if the business category matches any of the selected categories
      return selectedCategoryNames.includes(business.category)
    })
  }

  // Apply additional filters (rating, price, etc.) here if needed
  if (activeFilters.rating > 0) {
    filteredBusinesses = filteredBusinesses.filter((business) => business.rating >= activeFilters.rating)
  }

  if (activeFilters.priceRanges.length > 0) {
    filteredBusinesses = filteredBusinesses.filter((business) =>
      activeFilters.priceRanges.includes(business.priceRange),
    )
  }

  // Get category name for display
  const selectedCategory = categoryParam ? sampleConfig.categories.find((c) => c.id === categoryParam) : null
  const selectedCategoryName = selectedCategory?.name

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation config={{ siteName: sampleConfig.siteName }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Categories Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>

          {/* Page Header with Category Context */}
          <div className="mb-8">
            {selectedCategory && (
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{selectedCategory.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">
                    {selectedCategoryName} Businesses
                  </h1>
                  <p className="text-muted-foreground transition-colors duration-300">
                    Discover {filteredBusinesses.length} amazing {selectedCategoryName.toLowerCase()} businesses in your
                    area
                  </p>
                </div>
              </div>
            )}

            {!selectedCategory && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 transition-colors duration-300">
                  All Businesses
                </h1>
                <p className="text-muted-foreground transition-colors duration-300">
                  Discover {filteredBusinesses.length} amazing local businesses in your area
                </p>
              </div>
            )}

            {/* Category Badge */}
            {selectedCategoryName && (
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {selectedCategoryName}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading businesses...</p>
              </div>
            </div>
          )}

          {!isLoading && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <SearchFilterSidebar
                  categories={sampleConfig.categories}
                  onSearch={handleSearch}
                  onLocationSearch={handleLocationSearch}
                  onCategoryFilter={handleCategoryFilter}
                  onRatingFilter={handleRatingFilter}
                  onPriceFilter={handlePriceFilter}
                  onRadiusFilter={handleRadiusFilter}
                  onClearFilters={handleClearFilters}
                  activeFilters={activeFilters}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full justify-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters & Search
                    {activeFilters.categories.length +
                      activeFilters.priceRanges.length +
                      (activeFilters.rating > 0 ? 1 : 0) >
                      0 && (
                      <Badge className="ml-2" variant="secondary">
                        {activeFilters.categories.length +
                          activeFilters.priceRanges.length +
                          (activeFilters.rating > 0 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <div className="lg:hidden mb-6 p-4 bg-card rounded-lg border border-border transition-colors duration-300">
                    <SearchFilterSidebar
                      categories={sampleConfig.categories}
                      onSearch={handleSearch}
                      onLocationSearch={handleLocationSearch}
                      onCategoryFilter={handleCategoryFilter}
                      onRatingFilter={handleRatingFilter}
                      onPriceFilter={handlePriceFilter}
                      onRadiusFilter={handleRadiusFilter}
                      onClearFilters={handleClearFilters}
                      activeFilters={activeFilters}
                    />
                  </div>
                )}

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-card rounded-lg border border-border transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground transition-colors duration-300">
                      Showing {filteredBusinesses.length} businesses
                      {selectedCategoryName && ` in ${selectedCategoryName}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                      <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="reviews">Most Reviews</SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Business Grid/List */}
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {filteredBusinesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      variant={viewMode === "list" ? "list" : "grid"}
                      onSave={handleBusinessSave}
                      onShare={handleBusinessShare}
                      onView={handleBusinessView}
                    />
                  ))}
                </div>

                {/* No Results */}
                {filteredBusinesses.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">
                      No businesses found
                      {selectedCategoryName && ` in ${selectedCategoryName}`}
                    </h3>
                    <p className="text-muted-foreground mb-4 transition-colors duration-300">
                      Try adjusting your filters or search criteria.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleClearFilters} variant="outline">
                        Clear Filters
                      </Button>
                      <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700">Browse All Categories</Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {filteredBusinesses.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" disabled>
                        Previous
                      </Button>
                      <Button variant="default">1</Button>
                      <Button variant="outline">2</Button>
                      <Button variant="outline">3</Button>
                      <Button variant="outline">Next</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Footer
          config={{
            siteName: sampleConfig.siteName,
            categories: sampleConfig.categories.slice(0, 4),
          }}
        />
      </div>
    </ThemeProvider>
  )
}
