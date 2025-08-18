"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, ArrowRight, ImageIcon } from "lucide-react"
import type { BlogPost } from "@/types/directory"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface BlogSectionProps {
  config?: {
    siteName?: string
    features?: {
      blogSection?: boolean
      blogTitle?: string
      blogSubtitle?: string
    }
  }
  posts: BlogPost[]
  onReadPost?: (postId: string) => void
  onViewAllPosts?: () => void
}

export function BlogSection({ config = {}, posts = [], onReadPost, onViewAllPosts }: BlogSectionProps) {
  const router = useRouter()
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [usePlaceholder, setUsePlaceholder] = useState<Record<string, boolean>>({})

  // Initialize loading states and check for missing images
  useEffect(() => {
    const initialLoadingStates: Record<string, boolean> = {}
    const initialPlaceholderStates: Record<string, boolean> = {}

    posts.forEach((post) => {
      // Set loading state for posts with images
      if (post.featuredImage && post.featuredImage.trim() !== "") {
        initialLoadingStates[post.id] = true
      } else {
        // Use placeholder for posts without images
        initialPlaceholderStates[post.id] = true
      }
    })

    setImageLoadingStates(initialLoadingStates)
    setUsePlaceholder(initialPlaceholderStates)
  }, [posts])

  // Don't render if blog section is disabled
  if (!config?.features?.blogSection) {
    return null
  }

  const blogTitle = config?.features?.blogTitle || "Featured Stories"
  const blogSubtitle = config?.features?.blogSubtitle || "Discover the stories behind your favorite local businesses"

  // Show up to 3 posts, with first post as featured if it has the featured flag
  const displayedPosts = posts.slice(0, 3).map((post, index) => ({
    ...post,
    isFeatured: index === 0, // First post is always featured in display
  }))

  // Generate placeholder URL with category-specific styling
  const generatePlaceholderUrl = (width: number, height: number, text: string, category: string) => {
    const categoryColors = {
      "Success Stories": "4F46E5", // Indigo
      "Chef Spotlight": "059669", // Emerald
      Sustainability: "DC2626", // Red
      "Behind the Scenes": "7C2D12", // Orange
      "Artisan Craft": "1D4ED8", // Blue
      "Cultural Heritage": "7C3AED", // Purple
      default: "6B7280", // Gray
    }

    const color = categoryColors[category as keyof typeof categoryColors] || categoryColors.default
    const encodedText = encodeURIComponent(text)

    return `/placeholder.svg?height=${height}&width=${width}&text=${encodedText}&bg=${color}&color=FFFFFF`
  }

  // Get appropriate image source (actual image or placeholder)
  const getImageSrc = (post: BlogPost, index: number) => {
    // If we should use placeholder or image is missing/empty
    if (usePlaceholder[post.id] || !post.featuredImage || post.featuredImage.trim() === "") {
      const isFeatured = index === 0 && post.isFeatured
      const width = isFeatured ? 600 : 400
      const height = isFeatured ? 400 : 300
      const text = post.category
      return generatePlaceholderUrl(width, height, text, post.category)
    }
    return post.featuredImage
  }

  const handleImageLoad = (postId: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [postId]: false }))
  }

  const handleImageError = (postId: string) => {
    setImageErrors((prev) => ({ ...prev, [postId]: true }))
    setImageLoadingStates((prev) => ({ ...prev, [postId]: false }))
    setUsePlaceholder((prev) => ({ ...prev, [postId]: true }))
  }

  const handleReadPost = async (postId: string, slug: string) => {
    try {
      // Scroll to top first
      window.scrollTo(0, 0)

      // Navigate to blog post
      router.push(`/blog/${slug}`)

      // Call optional callback
      if (onReadPost) {
        onReadPost(postId)
      }
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  const handleViewAllPosts = () => {
    // STUB: Navigate to blog listing page
    if (onViewAllPosts) {
      onViewAllPosts()
    } else {
      console.log("STUB: Navigate to blog listing page")
      router.push("/blog")
    }
  }

  if (displayedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 transition-colors duration-300">
            {blogTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">
            {blogSubtitle}
          </p>
        </div>

        {/* Blog Posts - Stacked Layout */}
        <div className="space-y-8 mb-12 max-w-4xl mx-auto">
          {displayedPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-700 ${
                post.isFeatured ? "ring-2 ring-yellow-500 ring-opacity-50" : ""
              }`}
              onClick={() => handleReadPost(post.id, post.slug)}
            >
              <div className={`flex flex-col ${index === 0 && post.isFeatured ? "lg:flex-row" : "md:flex-row"} gap-0`}>
                {/* Image Container */}
                <div className={`relative overflow-hidden ${index === 0 && post.isFeatured ? "lg:w-1/2" : "md:w-2/5"}`}>
                  <div
                    className={`relative ${index === 0 && post.isFeatured ? "h-64 lg:h-full min-h-[300px]" : "h-48 md:h-full min-h-[200px]"}`}
                  >
                    {/* Loading State */}
                    {imageLoadingStates[post.id] && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    )}

                    {/* Error State */}
                    {imageErrors[post.id] && !usePlaceholder[post.id] && (
                      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                        <span className="text-sm">Image unavailable</span>
                      </div>
                    )}

                    {/* Image */}
                    <Image
                      src={getImageSrc(post, index) || "/placeholder.svg"}
                      alt={`${post.title} - ${post.category} story preview`}
                      fill
                      className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                        usePlaceholder[post.id] || !post.featuredImage || post.featuredImage.trim() === ""
                          ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
                          : ""
                      }`}
                      priority={index === 0}
                      sizes={
                        index === 0 && post.isFeatured
                          ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                          : "(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 40vw"
                      }
                      onLoad={() => handleImageLoad(post.id)}
                      onError={() => handleImageError(post.id)}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Category Badge - Desktop */}
                    <div className="absolute top-4 left-4 hidden md:block">
                      <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>

                    {/* Featured Badge */}
                    {post.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500 dark:bg-yellow-600 text-gray-900 dark:text-gray-100 font-semibold">
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Placeholder Indicator */}
                    {(usePlaceholder[post.id] || !post.featuredImage || post.featuredImage.trim() === "") && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/20 backdrop-blur-sm rounded-full p-1">
                          <ImageIcon className="h-4 w-4 text-white/70" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className={`flex-1 p-6 ${index === 0 && post.isFeatured ? "lg:p-8" : "md:p-6"}`}>
                  {/* Category Badge - Mobile */}
                  <div className="md:hidden mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {post.category}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${
                      index === 0 && post.isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${
                      index === 0 && post.isFeatured ? "text-lg line-clamp-3" : "line-clamp-2"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.publishDate}</span>
                  </div>

                  {/* Business Connection */}
                  {post.businessName && (
                    <div className="mb-4">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Featured: {post.businessName}
                      </span>
                    </div>
                  )}

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group/button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReadPost(post.id, post.slug)
                    }}
                  >
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Button
            onClick={handleViewAllPosts}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3"
          >
            View All Stories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
