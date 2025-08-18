"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { InteractiveMap } from "@/components/interactive-map"
import { ThemeProvider } from "@/components/theme-provider"
import { sampleConfig, sampleBusinesses } from "@/data/sample-data"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  DollarSign,
  Users,
  Camera,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BusinessDetailPage() {
  const params = useParams()
  const businessId = params.id as string

  // STUB: Find business by ID (will be replaced with real data fetching)
  const business = sampleBusinesses.find((b) => b.id === businessId)

  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Add scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [businessId])

  if (!business) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Navigation config={{ siteName: sampleConfig.siteName }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-300">
              Business Not Found
            </h1>
            <p className="text-muted-foreground mb-8 transition-colors duration-300">
              The business you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
          <Footer config={{ siteName: sampleConfig.siteName, categories: sampleConfig.categories.slice(0, 4) }} />
        </div>
      </ThemeProvider>
    )
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    console.log("STUB: Save business", business.id, business.name)
  }

  const handleShare = () => {
    console.log("STUB: Share business", business.id, business.name)
  }

  const handleWriteReview = () => {
    console.log("STUB: Write review for", business.id, business.name)
  }

  const handleAddPhoto = () => {
    console.log("STUB: Add photo for", business.id, business.name)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ))
  }

  // Generate contextual photo gallery based on business category
  const getPhotoGallery = () => {
    const categorySlug = business.category.toLowerCase().replace(/\s+/g, "-")
    const basePhotos = [
      {
        id: 1,
        src: business.imageUrl,
        alt: "Main Interior View",
        description: "Restaurant Interior",
      },
      {
        id: 2,
        src: `/images/${categorySlug}-food.png`,
        alt: "Signature Dishes",
        description: "Signature Dishes",
      },
      {
        id: 3,
        src: `/images/${categorySlug}-exterior.png`,
        alt: "Restaurant Exterior",
        description: "Restaurant Exterior",
      },
      {
        id: 4,
        src: `/images/${categorySlug}-atmosphere.png`,
        alt: "Dining Atmosphere",
        description: "Dining Atmosphere",
      },
      {
        id: 5,
        src: `/images/${categorySlug}-kitchen.png`,
        alt: "Professional Kitchen",
        description: "Professional Kitchen",
      },
      {
        id: 6,
        src: `/images/${categorySlug}-service.png`,
        alt: "Customer Service",
        description: "Customer Service",
      },
    ]
    return basePhotos
  }

  // Get menu image based on business category
  const getMenuImage = () => {
    const categorySlug = business.category.toLowerCase().replace(/\s+/g, "-")
    return `/images/menu-${categorySlug}.png`
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navigation config={{ siteName: sampleConfig.siteName }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Section */}
              <Card className="overflow-hidden border-border transition-colors duration-300">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={business.imageUrl || "/placeholder.png"}
                    alt={business.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white shadow-lg">Featured</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleAddPhoto}
                      className="bg-white dark:bg-gray-800 bg-opacity-90 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-colors duration-300"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Add Photo
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-foreground transition-colors duration-300">
                          {business.name}
                        </h1>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {business.priceRange}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">{renderStars(business.rating)}</div>
                        <span className="text-lg font-semibold text-foreground transition-colors duration-300">
                          {business.rating}
                        </span>
                        <span className="text-muted-foreground transition-colors duration-300">
                          ({business.reviewCount} reviews)
                        </span>
                      </div>

                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-4 transition-colors duration-300">
                        {business.category}
                      </p>

                      {business.description && (
                        <p className="text-muted-foreground text-lg leading-relaxed transition-colors duration-300">
                          {business.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant={isSaved ? "default" : "outline"}
                        onClick={handleSave}
                        className={isSaved ? "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                        {isSaved ? "Saved" : "Save"}
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Card className="border-border transition-colors duration-300">
                <CardHeader>
                  <div className="flex space-x-1 border-b border-border">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "reviews", label: "Reviews" },
                      { id: "photos", label: "Photos" },
                      { id: "menu", label: "Menu" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-600 dark:bg-blue-700 text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {/* Custom Fields */}
                      {business.customFields && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3 transition-colors duration-300">
                            Details
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {business.customFields.cuisineType && (
                              <div>
                                <span className="text-sm font-medium text-muted-foreground transition-colors duration-300">
                                  Cuisine Type
                                </span>
                                <p className="text-foreground transition-colors duration-300">
                                  {business.customFields.cuisineType}
                                </p>
                              </div>
                            )}
                            {business.customFields.averageMealPrice && (
                              <div>
                                <span className="text-sm font-medium text-muted-foreground transition-colors duration-300">
                                  Average Meal Price
                                </span>
                                <p className="text-foreground transition-colors duration-300">
                                  ${business.customFields.averageMealPrice}
                                </p>
                              </div>
                            )}
                            {business.customFields.bookingRequired !== undefined && (
                              <div>
                                <span className="text-sm font-medium text-muted-foreground transition-colors duration-300">
                                  Booking Required
                                </span>
                                <p className="text-foreground transition-colors duration-300">
                                  {business.customFields.bookingRequired ? "Yes" : "No"}
                                </p>
                              </div>
                            )}
                          </div>

                          {business.customFields.dietaryOptions && (
                            <div className="mt-4">
                              <span className="text-sm font-medium text-muted-foreground block mb-2 transition-colors duration-300">
                                Dietary Options
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {business.customFields.dietaryOptions.map((option: string) => (
                                  <Badge key={option} variant="outline">
                                    {option}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <Separator />

                      {/* Hours */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 transition-colors duration-300">
                          Hours
                        </h3>
                        <div className="space-y-2">
                          {/* STUB: Hours will be dynamic */}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Monday</span>
                            <span className="text-foreground transition-colors duration-300">9:00 AM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Tuesday</span>
                            <span className="text-foreground transition-colors duration-300">9:00 AM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Wednesday</span>
                            <span className="text-foreground transition-colors duration-300">9:00 AM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Thursday</span>
                            <span className="text-foreground transition-colors duration-300">9:00 AM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Friday</span>
                            <span className="text-foreground transition-colors duration-300">9:00 AM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Saturday</span>
                            <span className="text-foreground transition-colors duration-300">8:00 AM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground transition-colors duration-300">Sunday</span>
                            <span className="text-foreground transition-colors duration-300">8:00 AM - 9:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-foreground transition-colors duration-300">
                          Customer Reviews
                        </h3>
                        <Button onClick={handleWriteReview}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Write Review
                        </Button>
                      </div>

                      {/* STUB: Sample reviews */}
                      <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                          <Card key={review} className="p-4 border-border transition-colors duration-300">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold transition-colors duration-300">
                                U{review}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-foreground transition-colors duration-300">
                                    User {review}
                                  </span>
                                  <div className="flex">{renderStars(5)}</div>
                                </div>
                                <p className="text-muted-foreground text-sm transition-colors duration-300">
                                  Great experience! The food was delicious and the service was excellent. Highly
                                  recommend this place to anyone looking for quality dining.
                                </p>
                                <span className="text-xs text-muted-foreground mt-2 block transition-colors duration-300">
                                  2 days ago
                                </span>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "photos" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-foreground transition-colors duration-300">Photos</h3>
                        <Button variant="outline" onClick={handleAddPhoto}>
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* High-quality contextual photos */}
                        {getPhotoGallery().map((photo) => (
                          <div
                            key={photo.id}
                            className="aspect-square bg-muted rounded-lg overflow-hidden group transition-colors duration-300"
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={photo.src || "/placeholder.png"}
                                alt={photo.alt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                                <div className="p-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                  {photo.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "menu" && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 transition-colors duration-300">
                        Menu
                      </h3>
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4 transition-colors duration-300">
                        <div className="relative w-full h-full">
                          <Image
                            src={getMenuImage() || "/placeholder.svg"}
                            alt={`${business.name} Menu`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 66vw"
                          />
                        </div>
                      </div>
                      <p className="text-muted-foreground transition-colors duration-300">
                        Explore our carefully crafted menu featuring the finest{" "}
                        {business.customFields?.cuisineType || business.category.toLowerCase()} dishes.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-border transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground transition-colors duration-300">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground transition-colors duration-300">{business.address}</span>
                  </div>

                  {business.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <a
                        href={`tel:${business.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        {business.phone}
                      </a>
                    </div>
                  )}

                  {business.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <a
                        href={`mailto:${business.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        {business.email}
                      </a>
                    </div>
                  )}

                  {business.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-border transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-foreground transition-colors duration-300">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-muted-foreground transition-colors duration-300">Rating</span>
                    </div>
                    <span className="font-semibold text-foreground transition-colors duration-300">
                      {business.rating}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground transition-colors duration-300">Reviews</span>
                    </div>
                    <span className="font-semibold text-foreground transition-colors duration-300">
                      {business.reviewCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground transition-colors duration-300">Price Range</span>
                    </div>
                    <span className="font-semibold text-foreground transition-colors duration-300">
                      {business.priceRange}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Location Map */}
              <InteractiveMap address={business.address} businessName={business.name} />
            </div>
          </div>
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
