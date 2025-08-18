"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Star, MapPin, DollarSign } from "lucide-react"
import type { Category } from "@/types/directory"

interface SearchFilterSidebarProps {
  categories: Category[]
  onSearch?: (query: string) => void // STUB function
  onLocationSearch?: (location: string) => void // STUB function
  onCategoryFilter?: (categoryId: string, checked: boolean) => void // STUB function
  onRatingFilter?: (rating: number) => void // STUB function
  onPriceFilter?: (priceRange: string, checked: boolean) => void // STUB function
  onRadiusFilter?: (radius: number) => void // STUB function
  onClearFilters?: () => void // STUB function
  activeFilters?: {
    categories: string[]
    rating: number
    priceRanges: string[]
    radius: number
    // CURSOR EXTENSION POINT: Add dynamic filter types
  }
}

export function SearchFilterSidebar({
  categories,
  onSearch,
  onLocationSearch,
  onCategoryFilter,
  onRatingFilter,
  onPriceFilter,
  onRadiusFilter,
  onClearFilters,
  activeFilters = {
    categories: [],
    rating: 0,
    priceRanges: [],
    radius: 10,
  },
}: SearchFilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [radiusValue, setRadiusValue] = useState([activeFilters.radius])

  const handleSearch = () => {
    // STUB: Will be replaced with real search functionality
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      console.log("STUB: Search query:", searchQuery)
    }
  }

  const handleLocationSearch = () => {
    // STUB: Will be replaced with real location search
    if (onLocationSearch) {
      onLocationSearch(locationQuery)
    } else {
      console.log("STUB: Location search:", locationQuery)
    }
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    // STUB: Will be replaced with real category filtering
    if (onCategoryFilter) {
      onCategoryFilter(categoryId, checked)
    } else {
      console.log("STUB: Category filter:", categoryId, checked)
    }
  }

  const handleRatingFilter = (rating: number) => {
    // STUB: Will be replaced with real rating filtering
    if (onRatingFilter) {
      onRatingFilter(rating)
    } else {
      console.log("STUB: Rating filter:", rating)
    }
  }

  const handlePriceFilter = (priceRange: string, checked: boolean) => {
    // STUB: Will be replaced with real price filtering
    if (onPriceFilter) {
      onPriceFilter(priceRange, checked)
    } else {
      console.log("STUB: Price filter:", priceRange, checked)
    }
  }

  const handleRadiusChange = (value: number[]) => {
    setRadiusValue(value)
    // STUB: Will be replaced with real radius filtering
    if (onRadiusFilter) {
      onRadiusFilter(value[0])
    } else {
      console.log("STUB: Radius filter:", value[0])
    }
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setLocationQuery("")
    setRadiusValue([10])
    // STUB: Will be replaced with real filter clearing
    if (onClearFilters) {
      onClearFilters()
    } else {
      console.log("STUB: Clear all filters")
    }
  }

  const priceRanges = ["$", "$$", "$$$", "$$$$"]
  const totalActiveFilters =
    activeFilters.categories.length + activeFilters.priceRanges.length + (activeFilters.rating > 0 ? 1 : 0)

  return (
    <div className="w-full space-y-6">
      {/* Search Section */}
      <Card className="ui-card card-enhanced">
        <CardHeader className="card-content-enhanced">
          <CardTitle className="flex items-center text-card-foreground font-bold">
            <Search className="h-5 w-5 mr-2" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 card-content-enhanced">
          <div>
            <Label htmlFor="search" className="text-card-foreground font-medium">
              What are you looking for?
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="search"
                placeholder="Restaurant name, cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="bg-input border-border text-card-foreground"
              />
              <Button onClick={handleSearch} size="sm" className="bg-blue-600 hover:bg-blue-700 border-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-card-foreground font-medium">
              Location
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="location"
                placeholder="City, suburb, postcode..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLocationSearch()}
                className="bg-input border-border text-card-foreground"
              />
              <Button
                onClick={handleLocationSearch}
                size="sm"
                variant="outline"
                className="interactive-element bg-transparent"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {totalActiveFilters > 0 && (
        <Card className="ui-card card-enhanced">
          <CardHeader className="card-content-enhanced">
            <div className="flex items-center justify-between">
              <CardTitle className="text-card-foreground font-bold">Active Filters ({totalActiveFilters})</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="interactive-element">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="card-content-enhanced">
            <div className="flex flex-wrap gap-2">
              {activeFilters.categories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="flex items-center gap-1 badge-enhanced">
                    {category?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryChange(categoryId, false)} />
                  </Badge>
                )
              })}
              {activeFilters.priceRanges.map((price) => (
                <Badge key={price} variant="secondary" className="flex items-center gap-1 badge-enhanced">
                  {price}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handlePriceFilter(price, false)} />
                </Badge>
              ))}
              {activeFilters.rating > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1 badge-enhanced">
                  {activeFilters.rating}+ Stars
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRatingFilter(0)} />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Filter */}
      <Card className="ui-card card-enhanced">
        <CardHeader className="card-content-enhanced">
          <CardTitle className="text-card-foreground font-bold">Categories</CardTitle>
        </CardHeader>
        <CardContent className="card-content-enhanced">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={activeFilters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label
                  htmlFor={category.id}
                  className="flex items-center cursor-pointer text-card-foreground font-medium"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <span className="ml-auto text-sm text-muted-foreground">({category.count})</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="ui-card card-enhanced">
        <CardHeader className="card-content-enhanced">
          <CardTitle className="flex items-center text-card-foreground font-bold">
            <Star className="h-5 w-5 mr-2" />
            Minimum Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content-enhanced">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                  activeFilters.rating === rating
                    ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700"
                    : "hover:bg-accent border border-border"
                }`}
                onClick={() => handleRatingFilter(rating)}
              >
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-500"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-card-foreground font-medium">& up</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card className="ui-card card-enhanced">
        <CardHeader className="card-content-enhanced">
          <CardTitle className="flex items-center text-card-foreground font-bold">
            <DollarSign className="h-5 w-5 mr-2" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content-enhanced">
          <div className="space-y-3">
            {priceRanges.map((price) => (
              <div key={price} className="flex items-center space-x-2">
                <Checkbox
                  id={price}
                  checked={activeFilters.priceRanges.includes(price)}
                  onCheckedChange={(checked) => handlePriceFilter(price, checked as boolean)}
                />
                <Label htmlFor={price} className="cursor-pointer text-card-foreground font-medium">
                  {price} {price === "$" && "(Under $20)"}
                  {price === "$$" && "($20-$50)"}
                  {price === "$$$" && "($50-$100)"}
                  {price === "$$$$" && "($100+)"}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card className="ui-card card-enhanced">
        <CardHeader className="card-content-enhanced">
          <CardTitle className="flex items-center text-card-foreground font-bold">
            <MapPin className="h-5 w-5 mr-2" />
            Distance
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content-enhanced">
          <div className="space-y-4">
            <div>
              <Label className="text-card-foreground font-medium">Within {radiusValue[0]} km</Label>
              <Slider
                value={radiusValue}
                onValueChange={handleRadiusChange}
                max={50}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
