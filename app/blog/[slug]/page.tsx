import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Tag } from "lucide-react"
import { sampleBlogPosts } from "@/data/sample-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return sampleBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = sampleBlogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Melbourne Food Directory`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = sampleBlogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = sampleBlogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={
            post.image ||
            `/placeholder.svg?height=500&width=1200&text=${encodeURIComponent(post.category)}&bg=4F46E5&color=FFFFFF`
          }
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                <Tag className="h-3 w-3 mr-1" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-2">
            {/* Article Excerpt */}
            <div className="mb-8">
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <>
                  <p>
                    Welcome to an in-depth exploration of {post.title.toLowerCase()}. This story takes you behind the
                    scenes to discover the passion, dedication, and artistry that makes Melbourne's food scene so
                    extraordinary.
                  </p>

                  <h2>The Beginning</h2>
                  <p>
                    Every great story has humble beginnings, and this one is no different. What started as a simple
                    dream has evolved into something that touches the lives of countless people in our community.
                  </p>

                  <p>
                    The journey hasn't always been easy, but it's been filled with moments of joy, discovery, and the
                    satisfaction that comes from creating something truly special. From the early morning preparations
                    to the late-night cleanup, every detail matters.
                  </p>

                  <h2>The People Behind the Story</h2>
                  <p>
                    At the heart of every great establishment are the people who pour their passion into their work.
                    These are the individuals who wake up each day excited to create, to serve, and to be part of
                    something bigger than themselves.
                  </p>

                  <blockquote>
                    <p>
                      "Food is not just about sustenance; it's about bringing people together, creating memories, and
                      celebrating the rich tapestry of flavors that make our city unique."
                    </p>
                  </blockquote>

                  <h2>The Impact on Community</h2>
                  <p>
                    Beyond the delicious food and warm atmosphere, there's a deeper story about community impact. Local
                    businesses like these form the backbone of our neighborhoods, creating jobs, supporting local
                    suppliers, and fostering connections between people.
                  </p>

                  <p>
                    The ripple effects extend far beyond the dining room. From the local farmers who supply fresh
                    ingredients to the staff who have built careers and friendships, these establishments are integral
                    threads in the fabric of our community.
                  </p>

                  <h2>Looking Forward</h2>
                  <p>
                    As we look to the future, the commitment to excellence remains unwavering. Plans for expansion, new
                    menu items, and community initiatives are always in development, ensuring that the legacy continues
                    to grow and evolve.
                  </p>

                  <p>
                    The story continues to unfold, with each day bringing new opportunities to serve, to innovate, and
                    to be part of Melbourne's vibrant culinary landscape. We invite you to be part of this ongoing
                    journey.
                  </p>
                </>
              )}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this story</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Author Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Author</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Food Writer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Passionate about Melbourne's food scene and the stories behind our favorite local establishments.
                </p>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Related Stories
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="block group">
                        <div className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                relatedPost.image ||
                                `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(relatedPost.category)}&bg=4F46E5&color=FFFFFF`
                              }
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{relatedPost.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Table of Contents */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">In This Story</h3>
                <nav className="space-y-2">
                  <a
                    href="#beginning"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    The Beginning
                  </a>
                  <a
                    href="#people"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    The People Behind the Story
                  </a>
                  <a
                    href="#community"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Community Impact
                  </a>
                  <a
                    href="#future"
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Looking Forward
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              More Stories Like This
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        relatedPost.image ||
                        `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(relatedPost.category)}&bg=4F46E5&color=FFFFFF`
                      }
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <span>{relatedPost.author}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
