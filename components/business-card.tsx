"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Eye, Star, MapPin } from "lucide-react"
import type { BusinessCardProps } from "@/types/directory"
import Link from "next/link"
import Image from "next/image"

export function BusinessCard({ business, variant = "grid", onSave, onShare, onView, config }: BusinessCardProps) {
  const handleSave = () => {
    // STUB: Will be replaced with real save functionality
    if (onSave) {
      onSave(business.id)
    } else {
      console.log("STUB: Save business", business.id, business.name)
    }
  }

  const handleShare = () => {
    // STUB: Will be replaced with real share functionality
    if (onShare) {
      onShare(business.id)
    } else {
      console.log("STUB: Share business", business.id, business.name)
    }
  }

  const handleView = () => {
    // STUB: Will be replaced with real navigation
    if (onView) {
      onView(business.id)
    } else {
      console.log("STUB: View business details", business.id, business.name)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300 dark:text-gray-500"
        }`}
      />
    ))
  }

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden border-2 border-blue-200 dark:border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ui-card featured-card">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={business.imageUrl || "/placeholder.png"}
            alt={business.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-blue-600 dark:bg-blue-700 text-white shadow-lg border-0 font-semibold">
            Featured
          </Badge>
        </div>
        <CardContent className="p-6 card-content-enhanced">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-card-foreground line-clamp-1">{business.name}</h3>
            <Badge
              variant="secondary"
              className="ml-2 flex-shrink-0 bg-secondary text-secondary-foreground font-semibold"
            >
              {business.priceRange}
            </Badge>
          </div>

          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">{renderStars(business.rating)}</div>
            <span className="text-sm font-medium text-card-foreground">{business.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({business.reviewCount} reviews)</span>
          </div>

          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{business.category}</p>

          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{business.address}</span>
          </div>

          {/* CURSOR EXTENSION POINT: Display custom fields */}
          {business.customFields && (
            <div className="mb-4 space-y-1">
              {business.customFields.cuisineType && (
                <Badge variant="outline" className="mr-2 mb-1 border-border bg-tertiary font-medium">
                  {business.customFields.cuisineType}
                </Badge>
              )}
              {business.customFields.dietaryOptions &&
                Array.isArray(business.customFields.dietaryOptions) &&
                business.customFields.dietaryOptions.slice(0, 2).map((option: string) => (
                  <Badge key={option} variant="outline" className="mr-2 mb-1 text-xs border-border bg-tertiary">
                    {option}
                  </Badge>
                ))}
            </div>
          )}

          <div className="flex gap-2">
            <Link href={`/business/${business.id}`} className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors border-0 font-semibold">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="hover:bg-accent transition-colors interactive-element bg-transparent"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="hover:bg-accent transition-colors interactive-element bg-transparent"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 ui-card card-enhanced">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
              <Image
                src={business.imageUrl || "/placeholder.png"}
                alt={business.name}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between min-h-[128px] card-content-enhanced">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-card-foreground line-clamp-1 flex-1 mr-2">{business.name}</h3>
                <Badge
                  variant="secondary"
                  className="flex-shrink-0 bg-secondary text-secondary-foreground font-semibold"
                >
                  {business.priceRange}
                </Badge>
              </div>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">{renderStars(business.rating)}</div>
                <span className="text-sm font-medium text-card-foreground">{business.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({business.reviewCount})</span>
                <span className="text-sm text-blue-600 dark:text-blue-400 ml-3">{business.category}</span>
              </div>

              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{business.address}</span>
              </div>

              <div className="flex gap-2">
                <Link href={`/business/${business.id}`}>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 border-0 font-semibold"
                  >
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSave} className="interactive-element bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="interactive-element bg-transparent"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default grid variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ui-card card-enhanced">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={business.imageUrl || "/placeholder.png"}
          alt={business.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <CardContent className="p-4 card-content-enhanced">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-1 flex-1 mr-2">{business.name}</h3>
          <Badge variant="secondary" className="flex-shrink-0 bg-secondary text-secondary-foreground font-semibold">
            {business.priceRange}
          </Badge>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">{renderStars(business.rating)}</div>
          <span className="text-sm font-medium text-card-foreground">{business.rating}</span>
          <span className="text-sm text-muted-foreground ml-1">({business.reviewCount})</span>
        </div>

        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{business.category}</p>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-2">{business.address}</span>
        </div>

        <div className="flex gap-2">
          <Link href={`/business/${business.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 border-0 font-semibold"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleSave} className="interactive-element bg-transparent">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="interactive-element bg-transparent">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
