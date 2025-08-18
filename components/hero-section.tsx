"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeroSectionProps {
  config?: {
    siteName: string
    niche: string
    // CURSOR EXTENSION POINT: Add dynamic hero content
  }
  onSearch?: (query: string, location: string) => void // STUB function
  onAddBusiness?: () => void // STUB function
}

export function HeroSection({
  config = { siteName: "Melbourne Eats", niche: "restaurants" },
  onSearch,
  onAddBusiness,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // STUB: Will be replaced with real search functionality
    if (onSearch) {
      onSearch(searchQuery, location)
    } else {
      console.log("STUB: Search - Query:", searchQuery, "Location:", location)
    }
  }

  const handleAddBusiness = () => {
    // Always navigate to the add business page
    router.push("/add-business")

    // Also call the callback if provided (for backward compatibility)
    if (onAddBusiness) {
      onAddBusiness()
    }
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white min-h-[80vh] flex items-center justify-center transition-colors duration-300">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-background.png')`,
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 dark:from-blue-950/40 dark:to-purple-950/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Find the Best{" "}
            <span className="text-yellow-400 dark:text-yellow-300">
              {/* CURSOR EXTENSION POINT: Dynamic niche from config */}
              {config.niche === "restaurants" ? "Restaurants" : "Local Businesses"}
            </span>{" "}
            Near You
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-100 dark:text-gray-200 max-w-3xl mx-auto font-medium drop-shadow-lg">
            Discover amazing local {config.niche} with reviews, photos, and recommendations from your community.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-2xl transition-colors duration-300">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12 border-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 bg-transparent"
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 h-12 border-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 bg-transparent"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold transition-colors duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddBusiness}
              className="bg-yellow-500 dark:bg-yellow-600 border-yellow-500 dark:border-yellow-600 text-gray-900 dark:text-gray-100 hover:bg-yellow-400 dark:hover:bg-yellow-500 font-semibold shadow-lg transition-colors duration-300"
            >
              Add Your Business
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
