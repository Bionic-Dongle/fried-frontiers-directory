"use client"

import { useEffect } from "react"
import { BlogSection } from "@/components/blog-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { scrollToTop } from "@/utils/scroll-utils"

const allBlogPosts = [
  {
    id: "1",
    slug: "local-bistro-story",
    title: "The Story Behind Melbourne's Most Beloved Local Bistro",
    excerpt:
      "Discover how a small family-run bistro became a cornerstone of Melbourne's dining scene through three generations of passionate cooking and community connection.",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "/images/blog/local-bistro-story.png",
    category: "Restaurant Stories",
    featured: true,
  },
  {
    id: "2",
    slug: "dragon-palace-chef",
    title: "From Street Food to Fine Dining: A Chef's Journey",
    excerpt:
      "Follow Chef Wong's incredible transformation from humble street food vendor to award-winning restaurateur at Dragon Palace.",
    author: "Michael Torres",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    image: "/images/blog/dragon-palace-chef.png",
    category: "Chef Profiles",
    featured: false,
  },
  {
    id: "3",
    slug: "green-garden-sustainability",
    title: "Sustainable Dining: How Green Garden Cafe Leads by Example",
    excerpt:
      "Learn about the innovative sustainability practices that make Green Garden Cafe a pioneer in eco-friendly dining.",
    author: "Emma Rodriguez",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "/images/blog/green-garden-sustainability.png",
    category: "Sustainability",
    featured: false,
  },
  {
    id: "4",
    slug: "rooftop-bar-mixology",
    title: "The Art of Mixology at Melbourne's Premier Rooftop Bar",
    excerpt:
      "Explore the craft cocktail culture and innovative mixology techniques that set Skyline Rooftop Bar apart from the competition.",
    author: "James Wilson",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    image: "/images/blog/rooftop-bar-mixology.png",
    category: "Bars & Nightlife",
    featured: false,
  },
  {
    id: "5",
    slug: "artisan-bakery-craft",
    title: "The Ancient Art of Bread Making in Modern Melbourne",
    excerpt:
      "Step inside Melbourne's most authentic artisan bakery and discover the time-honored techniques behind their award-winning sourdough.",
    author: "Lisa Park",
    date: "Dec 5, 2024",
    readTime: "8 min read",
    image: "/images/blog/artisan-bakery-craft.png",
    category: "Food Culture",
    featured: true,
  },
  {
    id: "6",
    slug: "mediterranean-traditions",
    title: "Preserving Mediterranean Traditions in the Heart of Melbourne",
    excerpt:
      "Discover how Olive & Vine maintains authentic Mediterranean flavors while adapting to Australian tastes and local ingredients.",
    author: "Antonio Rossi",
    date: "Dec 3, 2024",
    readTime: "6 min read",
    image: "/images/blog/mediterranean-traditions.png",
    category: "Cultural Cuisine",
    featured: false,
  },
  {
    id: "7",
    slug: "coffee-culture-evolution",
    title: "Melbourne's Coffee Culture: From Italian Immigrants to Third Wave Innovation",
    excerpt: "Trace the evolution of Melbourne's legendary coffee scene and meet the roasters pushing boundaries.",
    author: "Anna Rossi",
    date: "Dec 1, 2024",
    readTime: "9 min read",
    image: "/images/blog/coffee-culture.png",
    category: "Coffee Culture",
    featured: false,
  },
  {
    id: "8",
    slug: "food-truck-revolution",
    title: "The Food Truck Revolution: Street Food Goes Gourmet",
    excerpt: "How mobile kitchens are bringing restaurant-quality food to Melbourne's streets and events.",
    author: "Tom Wilson",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    image: "/images/blog/food-truck-revolution.png",
    category: "Street Food",
    featured: false,
  },
]

export default function BlogPage() {
  // Automatically scroll to top when page loads
  useEffect(() => {
    scrollToTop("smooth", 100)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Melbourne Food Stories</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dive deep into the stories, traditions, and innovations that make Melbourne's food scene extraordinary.
              From family recipes passed down through generations to cutting-edge culinary techniques.
            </p>
          </div>
        </section>

        {/* Blog Content - Stacked Layout */}
        <BlogSection posts={allBlogPosts} maxPosts={12} showViewAll={false} />
      </main>

      <Footer />
    </div>
  )
}
