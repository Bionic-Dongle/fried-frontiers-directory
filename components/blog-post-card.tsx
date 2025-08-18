"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import type { BlogPostCardProps } from "@/types/directory"
import Image from "next/image"
import Link from "next/link"

export function BlogPostCard({ post, onRead, variant = "standard" }: BlogPostCardProps) {
  const handleReadClick = () => {
    onRead?.(post.id) || console.log("STUB: Read blog post:", post.title)
  }

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        variant === "featured" ? "border-2 border-primary/20" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Featured Image Section */}
        <div className="relative w-full md:w-1/3 lg:w-2/5">
          <div className="h-full min-h-[200px] md:min-h-[250px] relative overflow-hidden">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 40vw"
            />
            <Badge variant="secondary" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-6">
          <div className="space-y-4 h-full flex flex-col">
            <div className="flex-1">
              <h3
                className={`font-bold text-foreground group-hover:text-primary transition-colors ${
                  variant === "featured" ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                }`}
              >
                {post.title}
              </h3>
              <p
                className={`text-muted-foreground mt-2 line-clamp-3 ${variant === "featured" ? "text-base" : "text-sm md:text-base"}`}
              >
                {post.excerpt}
              </p>
            </div>

            {/* Business Connection */}
            {post.businessName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-primary">{post.businessName}</span>
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Read More Button */}
            <Link href={`/blog/${post.slug}`}>
              <Button
                variant="ghost"
                className="w-full justify-between group/btn hover:bg-primary/5 mt-auto"
                onClick={handleReadClick}
              >
                <span>Read Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
