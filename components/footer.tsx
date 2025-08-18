"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { scrollToTop } from "@/utils/scroll-utils"
import type { Category } from "@/types/directory"

const categories = [
  { name: "Fine Dining", href: "/businesses?category=fine-dining" },
  { name: "Casual Dining", href: "/businesses?category=casual-dining" },
  { name: "Cafes", href: "/businesses?category=cafes" },
  { name: "Fast Food", href: "/businesses?category=fast-food" },
  { name: "Asian Cuisine", href: "/businesses?category=asian-cuisine" },
  { name: "Bars & Pubs", href: "/businesses?category=bars-pubs" },
]

interface FooterProps {
  config?: {
    siteName: string
    categories?: Category[]
  }
  onCategoryClick?: (categoryId: string) => void
  onSocialClick?: (platform: string) => void
}

export function Footer({ config, onCategoryClick, onSocialClick }: FooterProps = {}) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    scrollToTop("smooth")
  }

  const handleCategoryClick = (href: string) => {
    // Navigate to the category page
    window.location.href = href
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{config?.siteName || "Fried Frontiers"}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Discover the best fish & chip shops and crispy fry spots in Yarra Valley. Your guide to exceptional food
              and memorable meals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  All Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/add-business"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Add Your Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {(config?.categories || categories).map((category) => {
                const categoryId = 'id' in category ? category.id : category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                const categoryHref = 'href' in category ? category.href : `/businesses?category=${categoryId}`
                
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      if (onCategoryClick) {
                        onCategoryClick(categoryId)
                      } else {
                        handleCategoryClick(categoryHref)
                      }
                    }}
                    className="text-left text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  >
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">Yarra Valley, Victoria, Australia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">+61 3 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">hello@friedfrontiers.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 {config?.siteName || "Fried Frontiers"}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  )
}
